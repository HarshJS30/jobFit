import styles from '../styles/hero.module.css';
import { BsFillLightningChargeFill } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import Demo  from '../components/Avatargroup'
import Navbar from './navbar';

export function Hero(){
    return(
        <div className={styles.hero}>
            <Navbar />
            <div className={styles.headings}>
                <div className={styles.head1}>
                    <h3>You don't need <span>Luck.</span></h3>
                </div>
                <div className={styles.head2}>
                    <h1>You need a <BsFillLightningChargeFill className={styles.ic1}/> <span className={styles.powerful}>powerful</span> <br /> <CiGlobe className={styles.ic2}/><span className={styles.resume}> resume</span> that gets read.</h1>
                </div>
                <div className={styles.head3}>
                    <p>Stop getting auto-rejected by ATS systems. JobFit optimizes your resume for every job—powered by AI.
                    </p>
                    <div className={styles.rev}>
                        <Demo />
                        <p>Loved by our users.</p>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.bts}>
                        <span className={styles.btnText}>Try it for free!</span>
                    </button>

                    <button className={styles.bts}>
                        <span className={styles.btnText}>Learn More..</span>
                    </button>
                </div>
            </div>
        </div>
    )
}