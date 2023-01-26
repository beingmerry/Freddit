import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FormInput } from '../styled-components/FormInput';
import { PostButton } from '../styled-components/Button';
import AutosizeTextarea from './AutosizeTextarea';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 50%;
  min-width: 200px;
`;

const ImgPreview = styled.img`
  display: block;
  width: 80%;
  min-width: 150px;
`;

const DEFAULT_FORM_DATA = {
  topic: '',
  title: '',
  img: '',
  content: '',
}

export default function PostForm() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const user = useSelector(state => state.user);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(f => ({...f, topic: params['topic_name'] || ''}));
  }, [params]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/users/${user.id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: formData.title,
        thumbnail_url: formData.img,
        content: formData.content,
        topic_name: formData.topic
      })
    })
      .then(r => {
        if (r.ok) {
          r.json().then(data => {
            navigate(`/fr/${data.topic.name}/${data.id}`);
          });
        } else {
          r.json().then(data => {
            console.log(data);
          });
        }
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor='topic-name'>Topic Name</label>
      <FormInput
        type="text"
        name="topic"
        id="topic-name"
        placeholder="i.e. duck_pictures"
        value={formData.topic}
        onChange={handleChange}
        required
      />
      <label htmlFor='title'>Title</label>
      <FormInput
        type="text"
        name="title"
        id="title"
        placeholder="Best Duck Picture Ever."
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label htmlFor='img-url'>Image URL</label>
      <FormInput
        type="text"
        name="img"
        id="img-url"
        placeholder="example.com/images/duck.png"
        value={formData.img}
        onChange={handleChange}
      />
      <figure>
        <ImgPreview src={formData.img} alt="Image Preview" />
        <figcaption>Preview of Image</figcaption>
      </figure>
      <label htmlFor='textarea'>Post Body</label>
      <AutosizeTextarea
        id="textarea"
        name="content"
        minRows={5}
        maxRows={15}
        value={formData.content}
        onChange={handleChange}
      />
      <PostButton as="input" type="submit" value="Publish" />
    </Form>
  );
}