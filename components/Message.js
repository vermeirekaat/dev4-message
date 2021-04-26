import styles from "./Message.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function Message ({ onSubmit }) {

        const [language, setLanguage] = useState("en-US");
        const { transcript, resetTranscript } = useSpeechRecognition();

        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            return null
        }

        const startListening = () => {
            SpeechRecognition.startListening({
                continuous: true,
                language: language})
        }

        const transformProps = {
            hidden: {
                opacity: 0,
                y: "25vh"
            },
            visible: {
                opacity: 1,
                y: 0,
            }
        }

        const saveMessage = (e) => {
            e.preventDefault();
            const data = {
                message: transcript, 
            }; 
            console.log(data);
            onSubmit(data);
        }

    return (
        
        <motion.div className={styles.container}
                variants={transformProps}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 3, ease: "easeOut", staggerChildren: 1 }}
                >
            <div className={styles.languages}>
                <input type="button" className={styles.button} onClick={()=> setLanguage("en-US")} value="EN"/>
                <input type="button" className={styles.button} onClick={()=> setLanguage("nl-NL")} value="NL"/>
            </div>
            <div className={styles.intro}>
                <h2 className={styles.title}>Your Toast</h2>
                <p className={styles.description}>Let's toast to a better future where we can actually drink cocktails in real life.</p>
                <input type="button" className={styles.submitButton} onClick={(e) => saveMessage(e)} value="Save my toast"/>
            </div>

            <div className={styles.speech}>
                <div className={styles.transcript}>
                    <p className={styles.info}>Your language is set to <span>{language}.</span></p>
                    <p className={styles.message}>{transcript}</p>
                </div>
                <div className={styles.controls}>
                    <button className={styles.button} onClick={()=> startListening()}>Start</button>
                    <button className={styles.button} onClick={() => SpeechRecognition.stopListening}>Stop</button>
                    <button className={styles.button} onClick={resetTranscript}>Reset</button>
            </div>
            </div>
        </motion.div>
    )
}