import React, { useEffect } from "react";
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { showLoginModal } from "../features/loginModal/loginModalSlice";
import { useNavigate } from 'react-router-dom';

import PostForm from "./PostForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function NewPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user.id) {
      dispatch(showLoginModal());
      navigate('/');
    }
  }, [user, navigate, dispatch]);

  return (
    <Container>
      <h2>Create a new Post</h2>
      <PostForm />
    </Container>
  );
}