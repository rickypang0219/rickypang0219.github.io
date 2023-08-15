// import React from 'react';
import { Grid, Box, Typography, Paper } from "@mui/material"
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, atomDark, oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from "react-router-dom"


const BlogPost = ({ post }) => {
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <Grid container>
                <Grid item md={2} xs={0} >
                    <Box sx={{
                        display: { md: 'flex', xs: 'none' }
                    }}></Box>
                </Grid>

                <Grid item md={8} xs={12} >
                    <Box sx={{ justifyContent: 'center', padding: 3 }} >
                        <Typography variant="body1" justifyContent='center' justifyItems='center' style={{ textAlign: 'justify', display: 'block' }}>
                            <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                style={oneDark} // use the style you imported
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={2} xs={0} >
                    <Box sx={{
                        display: { md: 'flex', xs: 'none' }
                    }}></Box>
                </Grid>
            </Grid>
        </div >
    );
};

export default BlogPost;

