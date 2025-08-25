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
import { useFetchBoardQuery } from '../../../store/boards.api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { HistoryBoardModal } from '../../Modals/HistoryBoardModal';

export const TasksContainer = () => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { id } = useParams();

  const { data: board } = useFetchBoardQuery(
    {
      id: id as string,
      includeParams: ['history'],
    },
    { skip: !isHistoryModalOpen, refetchOnMountOrArgChange: true }
  );
  const { data: title } = useFetchBoardQuery({
    id: id as string,
    includeParams: null,
  });

  const history = board?.history;

  return (
    <div className={tasksContainer}>
      <div className={tasksHeader}>
        <h1 className={boardTitle}>{title?.title.toUpperCase()}</h1>
        <Button onClick={() => setIsHistoryModalOpen(true)}>History</Button>
      </div>
      <div
        className={tasksContent}
        style={{ backgroundImage: `url(${rocksImage})` }}
      >
        <DndProvider backend={HTML5Backend}>
          <BoardsList />
        </DndProvider>
      </div>
      <HistoryBoardModal
        isModalOpen={isHistoryModalOpen}
        setIsModalOpen={setIsHistoryModalOpen}
        history={history}
        allowedEntityTypes={['Board', 'List']}
      />
    </div>
  );
};
