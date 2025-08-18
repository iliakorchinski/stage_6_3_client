import { createBrowserRouter } from 'react-router-dom';
import { BoardsContainer } from '../components/BoardsContainer/BoardsContainer';
import { Board } from '../components/Board/Board';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardsContainer />,
  },
  {
    path: '/:id',
    element: <Board />,
  },
]);
