import styles from "./Message.module.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function Message ({ onSubmit }) {

    /* const { transcript, resetTranscript } = useSpeechRecognition("");

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: "en-US"
        })
    } */

    const [information, setInformation] = useState(false);
    const [transcript, setTranscript] = useState("");

    const transformProps = {
        hidden: {
            opacity: 0,
            y: "25vh"
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    const saveMessage = (e) => {
        e.preventDefault();

        setTranscript(e.target.message.value);
        e.target.reset();
        setInformation(!information);
    }

    const sendMessage = (e) => {
        e.preventDefault();

        const data = {
            message: transcript, 
            sender: e.target.sender.value,
            receiver: e.target.receiver.value,
        };

        onSubmit(data);
    }

    if (information === true) {
        return (
        <AnimatePresence>
            <motion.div className={styles.container}
                variants={transformProps}
                initial="hidden"
                animate="visible"
                exit={{y: "50vw", opacity: 0}}
                transition={{ type: "tween", duration: 3, ease: "easeOut" }}>
                <form className={styles.mail} onSubmit={(e) => sendMessage(e)} >
                    <label className={styles.information}>From:
                        <input className={styles.input} name="sender" type="text" placeholder="Your Name"/>
                    </label>
                    <label className={styles.information}>To:
                        <input className={styles.input} name="receiver" type="text" placeholder="Your Friend's Name"/>
                    </label>

                    <motion.input type="submit" className={styles.submitButton} value="Send my Toast"
                        initial={{ y: "-2vw", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition= {{duration: 2, delay: 2}}
                    />
                </form>
            </motion.div>
        </AnimatePresence>
        )
    }

    return (
        <AnimatePresence>
            <motion.div className={styles.container}
                variants={transformProps}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 3, ease: "easeOut" }}
                >

            <form className={styles.mail} onSubmit={(e) => saveMessage(e)} >
                <label className={styles.information}>Your Toast
                    <textarea className={styles.input} name="message" type="textarea" rows="20" cols="10" placeholder="Write down your message"></textarea>
                </label>

                <motion.input type="submit" className={styles.submitButton} value="Save my Toast"
                    initial={{ y: "-2vw", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition= {{duration: 2, delay: 3}}/>
            </form>
            
            {/* <div className={styles.intro}>
                <h2 className={styles.title}>Your Toast</h2>
                <p className={styles.description}>Let's toast to a better future where we can actually drink cocktails in real life.</p>
                <input type="button" className={styles.submitButton} onClick={() => setInformation(!information)} value="Save my toast"/>
            </div>

            <div className={styles.speech}>
                <div className={styles.transcript}>
                    <p className={styles.message}>{transcript === "" ? "Click start to record your toast" : transcript}</p>
                </div>
                <div className={styles.controls}>
                    <button className={styles.button} onClick={()=> startListening()}>Start</button>
                    <button className={styles.button} onClick={() => SpeechRecognition.stopListening}>Stop</button>
                    <button className={styles.button} onClick={resetTranscript}>Reset</button>
                </div>
            </div>*/}

        </motion.div>
        </AnimatePresence>
    )
}