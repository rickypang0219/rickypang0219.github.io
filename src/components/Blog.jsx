import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Typography, Grid, Box, Stack, Paper } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import Profile from "./Profile";
import { useTransform, motion, useScroll } from "framer-motion";
import { indigo, grey, red } from "@mui/material/colors";


const BlogPostList = ({ blogPosts, theme }) => {
  const MotionBox = motion(Box);
  return (
    <Stack spacing={3}>
      {blogPosts.map((blogPost) => (
        <>
          <MotionBox
            whileHover={{ scale: [null, 1.2, 1.1] }}
            transition={{ duration: 0.3 }}
            border={2}
            borderRadius={5}
            p={2}
            sx={{
              boxShadow: 3,
              display: "flex",
              flexWrap: "wrap",
              textDecoration: "none",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? grey[900]
                  : "background.paper",
            }} >
            <Paper />
            <Grid container>
              <Grid item md={12} xs={12}>
                <Stack spacing={2}>
                  <Link to={`/blog/${blogPost.slug}`} style={{ color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000' }}>
                    <Typography fontWeight={'bold'} fontSize={25}> {blogPost.title} </Typography>
                  </Link>
                  <Typography> Author: Ricky Pang </Typography>
                  <Typography> Created on: {blogPost.created_on} </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    justifyContent: "center",
                    backgroundImage:
                      "linear-gradient(to right, #3f51b5, #2196f3)",
                    padding: "10px 15px",
                    borderRadius: 10,
                    textAlign: "center",
                    display: "inline-flex",
                    height: 7,
                  }}
                  p={1}
                >
                  <Typography sx={{ fontSize: 15, alignSelf: "center" }}>
                    <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                      {blogPost.category}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </MotionBox>
        </>
      ))
      }
    </Stack >
  );
};

const Blog = ({ theme }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blog/")
      .then((response) => {
        setBlogPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
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
          }}>
            <Stack spacing={1}>
              <Typography style={{ fontSize: 30 }}>Recent Posts</Typography>
              <BlogPostList blogPosts={blogPosts} theme={theme} />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={0} md={1}>
          <Box sx={{
            display: { md: 'flex', xs: 'none' }
          }}></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Blog;
