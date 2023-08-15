import React from 'react'
import Profile from './Profile'
import ReactMarkdown from 'react-markdown';
import { Grid, Box, Typography } from '@mui/material'
import rehypeRaw from "rehype-raw";

// Try to render Markdown 


const Interests = ({ theme }) => {
    const [markdownContent, setMarkdownContent] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/markdowns/interests.md'); // Replace with the correct file path
                const markdownText = await response.text();
                setMarkdownContent(markdownText);
            } catch (error) {
                console.error('Error fetching Markdown:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <Grid container>
                <Grid item xs={0} md={3}>
                    <Box sx={{
                        display: { md: 'flex', xs: 'none' }
                    }}>  <Profile theme={theme} /> </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{
                        padding: 5,
                        justifyContent: 'center'
                    }}><Typography>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}  >{markdownContent}</ReactMarkdown>
                        </Typography>

                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Interests