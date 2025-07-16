import { newsFeed } from "../../services/apiClient";
import { useState } from 'react'

export default function NewsFeed() {
    const [news, setNews] = useState([]);

    const handleCategory = async (category) => {
        const data = await newsFeed(category);
        console.log(data[0])
        setNews(data[0])
    }

    return (
        <div>
            <div>
                <button onClick={() => handleCategory("science")}>Science</button>
                <button onClick={() => handleCategory("tech")}>Technology</button>
                <button onClick={() => handleCategory("business")}>Business</button>
                <button onClick={() => handleCategory("politics")}>Politics</button>
            </div>
            <div>
                <img src={news.image_url} />
                <h2>{news.title}</h2>
                <p>{news.description}</p>
                <p>{news.url}</p>
            </div>
        </div>
    )
}