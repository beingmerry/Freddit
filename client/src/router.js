import { createBrowserRouter } from 'react-router-dom';
import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Post from './components/Post';
import Topic from './components/Topic';
import NewPost from './components/NewPost';
import Profile from './components/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'new-post',
        element: <NewPost />,
      },
      {
        path: 'users/:id',
        element: <Profile />,
      },
      {
        path: 'fr/:topic_name',
        element: <Topic />
      },
      {
        path: 'fr/:topic_name/new-post',
        element: <NewPost />
      },
      {
        path: 'fr/:topic_name/:post_id',
        element: <Post />
      },
    ]
  }
]);

export default router;