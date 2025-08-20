import {
  tasksContainer,
  tasksHeader,
  tasksContent,
  boardTitle,
} from './styles.css';
import rocksImage from '../../../assets/pictures/rocks.jpg';
import { BoardsList } from './BoardsList/BoardsList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useFetchBoardsQuery } from '../../../store/boards.api';
import { useParams } from 'react-router-dom';

export const TasksContainer = () => {
  const { id } = useParams();
  const { data } = useFetchBoardsQuery();

  const boardName = data?.find((board) => board.id === id);

  return (
    <div className={tasksContainer}>
      <div className={tasksHeader}>
        <h1 className={boardTitle}>{boardName?.title.toUpperCase()}</h1>
      </div>
      <div
        className={tasksContent}
        style={{ backgroundImage: `url(${rocksImage})` }}
      >
        <DndProvider backend={HTML5Backend}>
          <BoardsList />
        </DndProvider>
      </div>
    </div>
  );
};
