import { signIn } from "@/auth";
import styles from '../styles/signin.module.css'
import Navbar from "./navbar";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import img from '../../public/logoo.png'

export default function SignIn(){
    return(
        <div className={styles.auth}>
            <Navbar />
            <div className={styles.authbox}>
                <Image src={img} alt="img" width={100} height={100} className={styles.img}/>
                <h2>Welcome to JobFit</h2>
                <h6>Get your resume tailor-ready.</h6>
                <form className={styles.form}
                action={async()=>{
                    "use server"
                    await signIn("google")
                }}
                >
                    <button type="submit" className={styles.bt1}><FaGoogle className={styles.ic}/>Continue With Google</button>
                </form>
                <hr className={styles.line}/>
                <h3>OR</h3>
                <hr className={styles.line1}/>
                <form className={styles.form}
                action={async()=>{
                    "use server"
                    await signIn("github")
                }}
                >
                    <button type="submit" className={styles.bt1}><FaGithub className={styles.ic}/> Continue With Github</button>
                </form>
            </div>
        </div>
    )
}