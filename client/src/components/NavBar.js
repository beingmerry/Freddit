import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: inline-block;
  margin-left: 2rem;
`;

export default function NavBar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('/api/topics')
      .then(r => {
        if (r.ok) {
          r.json().then(data => setTopics(data.map(t => t.name)));
        } else {
          r.json().then(console.log);
        }
      })
  }, []);
  return (
    <Nav>
      {topics.map((n, i) =>
        <span key={i}>
          {i > 0 ? <span> | </span> : ''}
          <NavLink to={`/fr/${n}`}>{n}</NavLink>
        </span>
      )}
    </Nav>
  );
}