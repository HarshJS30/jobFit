import { NextRequest, NextResponse } from 'next/server';
import { LlamaParseReader } from 'llama-cloud-services';
import { prisma } from '@/prisma/client';

export async function POST(request: NextRequest) {

  const userId = "test-user-id"

  try {
    // STEP 1: Receive uploaded formData from frontend
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // If no file was provided, return an error
    if (!file) {
      return NextResponse.json(
        { status: 'error', message: 'No file provided' },
        { status: 400 }
      );
    }

    // Only allow PDFs for now
    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { status: 'error', message: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    console.log('Processing file:', file.name);

    // STEP 2: Convert uploaded File → Node Buffer
    // LlamaParseReader in this package needs an actual file path, not raw buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // STEP 3: Create a temporary folder to store the uploaded PDF
    // We save the file briefly because LlamaParse wants a path on disk
    const fs = require('fs');
    const path = require('path');
    const tmpDir = path.join(process.cwd(), 'tmp');

    // Create /tmp directory if it doesn't exist
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Generate random filename to avoid conflicts
    const tmpFilePath = path.join(tmpDir, `${Date.now()}-${file.name}`);

    // Write the file buffer to the temp file
    fs.writeFileSync(tmpFilePath, buffer);

    // STEP 4: Initialize the LlamaParseReader
    // - apiKey: from your .env
    // - resultType: "text" means we want pure text only
    const reader = new LlamaParseReader({
      apiKey: process.env.LLAMA_CLOUD_API_KEY || '',
      resultType: 'text'
    });

    console.log('Parsing PDF...');

    // STEP 5: Parse the PDF using the file path
    // LlamaParse will return an array of "documents" (usually 1 document for PDFs)
    const documents = await reader.loadData(tmpFilePath);

    // STEP 6: Cleanup — delete the temp file to avoid clutter
    fs.unlinkSync(tmpFilePath);

    // STEP 7: Combine all page text into a single string
    const text = documents.map((doc: any) => doc.text).join('\n\n');

    let saved;
    try {
      saved = await prisma.resume.create({
        data:{
          userId: userId,
          filename : file.name,
          fileSize : file.size,
          rawText : text
        }
      })
      console.log('Saved to database:', saved.id);
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { status: 'error', message: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

    console.log('Extraction complete. Text length:', text.length);

    // STEP 8: Return the extracted text to the frontend
    return NextResponse.json({
      status: 'success',
      text: text,
      pages: documents.length,
      fileName: file.name,
      fileSize: file.size,
      resumeId : saved.id,
      saved
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}