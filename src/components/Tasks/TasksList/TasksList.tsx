import { TaskItem } from '../TasksItem/TasksItem';
import { useCreateTaskMutation, type Task } from '../../../store/tasks.api';
import { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { addList } from './styles.css';

interface TasksListProps {
  listId: string;
  tasks: Task[];
  moveTask: (
    dragIndex: number,
    hoverIndex: number,
    fromListId: string,
    toListId: string
  ) => void;
}

export const TasksList = ({ listId, tasks, moveTask }: TasksListProps) => {
  const [newTitle, setNewTitle] = useState('');

  const [createTask] = useCreateTaskMutation();

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'TASK',
    drop(item: { id: string; index: number; listId: string }) {
      if (!ref.current) return;

      if (tasks.length === 0) {
        moveTask(item.index, 0, item.listId, listId);
      }
    },
  });

  drop(ref);

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    await createTask({ listId, title: newTitle });
    setNewTitle('');
  };

  return (
    <div ref={ref}>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          listId={listId}
          moveTask={moveTask}
        />
      ))}

      <div className={addList}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
};
