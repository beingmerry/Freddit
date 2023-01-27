import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from "../features/loginModal/loginModalSlice";
import { useNavigate, useParams } from 'react-router-dom';

import PostForm from "./PostForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function EditPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [postData, setPostData] = useState({});
  const { post_id: postId } = useParams();

  const fetchPost = useCallback(() => {
    fetch(`/api/posts/${postId}`)
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            console.log(data);
            setPostData({
              topic: data.topic.name,
              title: data.title,
              img: data.thumbnail_url,
              content: data.content
            });
          })
        } else {
          r.json().then(console.log);
        }
      })
  }, [postId]);

  useEffect(() => {
    if (!user.id) {
      dispatch(showLoginModal());
      navigate('/');
    } else {
      fetchPost();
    }
  }, [user, navigate, dispatch, fetchPost]);

  return (
    <Container>
      <h2>Edit this post</h2>
      {postData.topic ? <PostForm startData={postData} editForm={true} postId={postId} /> : null}
    </Container>
  );
}