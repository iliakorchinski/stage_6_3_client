import { boardContainer } from './Board.css';
import { InboxContainer } from './InboxContainer/InboxContainer';
import { TasksContainer } from './TasksContainer/TasksContainer';

export const Board = () => {
  return (
    <div className={boardContainer}>
      <InboxContainer />
      <TasksContainer />
    </div>
  );
};
