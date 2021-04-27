import Layout from "../../components/Layout";
import Email from "../../components/Email";
import styles from "./Success.module.css";

export default function Success({ onSubmit }) {

    const handleSubmitEmail = data => {
       console.log(data);
    }

    return (
        <Layout>
            <Email onSubmit={handleSubmitEmail}/>
        </Layout>
    )
}