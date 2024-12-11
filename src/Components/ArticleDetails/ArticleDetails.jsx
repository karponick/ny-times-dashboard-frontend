import React, { useState } from "react";
import styles from "./ArticleDetails.module.css";
import { useNavigate } from "react-router-dom";
const ArticleDetails = ({ article }) => {
    let navigate = useNavigate();
    let date = new Date(article.pub_date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let shortDate = `${month}-${day}-${year}`;

    function goHome() {
        navigate("/");
    }
    return (
        <div>
            <div className={styles.ArticleDetails}>
                <h1>{article.headline.main}</h1>
                <h2>{article.source}</h2>
                <div className={styles.table}>
                    <p className={styles.tableL}>Publication Date:</p>
                    <p className={styles.tableR}>{shortDate}</p>
                    <p className={styles.tableL}>Abstract: </p>
                    <p className={styles.tableR}>{article.abstract}</p>
                    <p className={styles.tableL}>Lead Paragraph: </p>
                    <p className={styles.tableR}>{article.lead_paragraph}</p>
                </div>
                <a
                    href={article.web_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.webUrl}>
                    View on NYT
                </a>
                <a
                    href="https://developer.nytimes.com/"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.brand}>
                    <img
                        src="https://developer.nytimes.com/files/poweredby_nytimes_150b.png?v=1583354208366"
                        alt="Data provided by The New York Times"
                    />
                </a>
            </div>
            <button className={styles.home} onClick={goHome}>
                Home
            </button>
        </div>
    );
};
export default ArticleDetails;
