import React, { useEffect, useState } from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';

import { fetchNewsApiData } from '../../api';
import styles from './News.module.css';

const News = () => {
    const [newsData, setNewsData] = useState([]);
    useEffect(() => {
        const fetchNewsApi = async () => {
            setNewsData(await fetchNewsApiData());
        }
        fetchNewsApi();
    }, []);

    return (
        <div>
            {newsData.map((article)=>(
                <div className={styles.container}>
                    <Grid item xs={12} md={12} component={Card} className={styles.card}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom ><a href={article.name}><p>{article.title}</p></a></Typography>
                            <Typography color="textSecondary"><p>{article.publishedAt}</p></Typography>
                            <Typography variant="body2" component="p"><p>{article.description}</p></Typography>
                            <Typography variant="body2" component="p"><p>{article.content}</p></Typography>
                        </CardContent>
                    </Grid>
                </div>
            ))}
        </div>
    )
}

export default News;