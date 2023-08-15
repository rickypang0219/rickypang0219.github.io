import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Grid, Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import rehypeRaw from "rehype-raw";
import MdLayout from './MdLayout'
// Try to render Markdown 


const MdDetail = () => {
    const { id } = useParams('');
    const [markdownContent, setMarkdownContent] = React.useState('');

    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`/src/markdowns/${id}.md`);
    //             const markdownText = await response.text();
    //             setMarkdownContent(markdownText);
    //         } catch (error) {
    //             console.error('Error fetching Markdown:', error);
    //         }
    //     };

    //     fetchData();
    // }, [id]);


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/markdowns/${id}.md`);
                const markdownText = await response.text();
                setMarkdownContent(markdownText);
            } catch (error) {
                console.error('Error fetching Markdown:', error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <>

            <MdLayout post={markdownContent} />

        </>
    )
}

export default MdDetail