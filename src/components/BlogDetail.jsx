import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPost from './BlogLayout';
import { useParams, Link } from 'react-router-dom';
import BlogLayout from './BlogLayout'
import { Typography, Grid, Box } from '@mui/material';


const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blog/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]); // Only re-run the effect if slug changes

  if (!post) {
    return (
    <Grid container>
      <Typography style={{ textAlign: 'justify' }} > Loading  </Typography>
    </Grid>
    );
  }

  return (
    <>
      <BlogLayout post={post} />
    </>
  );
};

export default BlogDetail;

