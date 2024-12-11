import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onArticleClick }) => {
    const [filter, setFilter] = useState("");
    const [results, setResults] = useState([]);
    let navigate = useNavigate();

    // set keyword search
    const handleInput = (event) => {
        setFilter(event.target.value);
    };

    // event to handle clicking on an article
    const handleArticleClick = (event) => {
        const clickedDiv = event.target;
        // console.log("Clicked div:", clickedDiv);
        var selectedIndex = clickedDiv.attributes["name"].value;
        // console.log(results[selectedIndex]);
        onArticleClick(results[selectedIndex]);
        navigate("/article-details");
    };

    // event to send request through proxy server
    const fetchArticles = (event) => {
        if (event) {
            event.preventDefault();
        }
        fetch(`${process.env.REACT_APP_API_URL}?filter=${filter}`)
            .then((response) => {
                if (!response.ok) throw new Error("Error fetching data");
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.cod) {
                    setResults([]);
                    throw new Error("No data");
                } else {
                    setResults(data.response.docs);
                }
            })
            .catch((error) => {
                console.error(error.message);
            });
    };
    return (
        <div className={styles.searchBar}>
            <h1>New York Times Dashboard</h1>
            <form>
                <input
                    className={styles.input}
                    type="text"
                    name="filter"
                    id="filter"
                    placeholder="Search keywords..."
                    onChange={handleInput}
                />
                <button onClick={fetchArticles}>Search</button>
                {results.length === 0 ? <p className={styles.noResults}>No results</p> : null}
            </form>
            {results && (
                <div className={styles.resultsContainer}>
                    {results.map((results, index) => (
                        <div key={index}>
                            <div
                                id={"article" + index}
                                name={index}
                                className={styles.article}
                                onClick={handleArticleClick}>
                                {results.headline.main}
                            </div>
                        </div>
                    ))}
                </div>
            )}

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
    );
};
export default SearchBar;
