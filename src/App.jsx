import { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import ArticleDetails from "./Components/ArticleDetails/ArticleDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [article, setArticle] = useState(null);
    const handleArticleSelect = async (article) => {
        setArticle(article);
    };
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchBar onArticleClick={handleArticleSelect} />} />
                    <Route
                        path="/article-details"
                        element={article && <ArticleDetails article={article} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
