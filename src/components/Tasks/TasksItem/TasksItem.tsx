import { useRef, useState } from 'react';
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from '../../../store/tasks.api';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Task } from '../../../store/tasks.api';
import { useDrag, useDrop } from 'react-dnd';
import { UpdateTaskModal } from '../../Modals/UpdateTaskModal';
import { container, deleteIcon, spanTitle } from './styles.css';
import { useParams } from 'react-router-dom';
import { useGetHistoryByBoardQuery } from '../../../store/history.api';

interface TaskItemProps {
  task: Task;
  index: number;
  listId: string;
  moveTask: (
    dragIndex: number,
    hoverIndex: number,
    fromListId: string,
    toListId: string
  ) => void;
}

export const TaskItem = ({ task, index, listId, moveTask }: TaskItemProps) => {
  const { id } = useParams();
  const { refetch } = useGetHistoryByBoardQuery(id as string);
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'TASK',
    drop(item: { id: string; index: number; listId: string }) {
      if (!ref.current || item.id === task.id) return;

      moveTask(item.index, index, item.listId, listId);
    },
  });

  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index, listId },
  });

  drag(drop(ref));
  const handleSave = async () => {
    await updateTask({ id: task.id, title, description });
    setIsEditing(false);
    refetch();
  };

  const handleDeleteTask = async () => {
    await deleteTask(task.id);
    refetch();
  };

  return (
    <div ref={ref} className={container}>
      <span onClick={() => setIsEditing(true)} className={spanTitle}>
        {task.title}
      </span>

      <p style={{ color: 'grey' }}>{task?.description}</p>
      <DeleteIcon
        fontSize="small"
        color="error"
        className={deleteIcon}
        onClick={handleDeleteTask}
      />
      <UpdateTaskModal
        isModalOpen={isEditing}
        setIsModalOpen={setIsEditing}
        newTitle={title}
        setNewTitle={setTitle}
        newDescription={description}
        setNewDescription={setDescription}
        handleUpdate={handleSave}
      />
    </div>
  );
};
