import { type List } from '../../../../store/lists.api';
import { type Task } from '../../../../store/tasks.api';

export const moveList = (
  listOrder: List[],
  dragIndex: number,
  hoverIndex: number
): List[] => {
  const updated = [...listOrder];
  const [selected] = updated.splice(dragIndex, 1);
  updated.splice(hoverIndex, 0, selected);

  const positioned = updated.map((list, i) => ({ ...list, position: i }));
  return positioned;
};

export const reorderTasksInList = (
  tasks: Task[],
  dragIndex: number,
  hoverIndex: number
): Task[] => {
  const copy = [...tasks];
  const [moved] = copy.splice(dragIndex, 1);
  copy.splice(hoverIndex, 0, moved);
  return copy.map((task, i) => ({ ...task, position: i }));
};

export const moveTasksToAnotherList = (
  fromTasks: Task[],
  toTasks: Task[],
  dragIndex: number,
  hoverIndex: number,
  toListId: string
) => {
  const newFromTasks = [...fromTasks];
  newFromTasks.splice(dragIndex, 1);

  const dragged = { ...fromTasks[dragIndex] };

  const newToTasks = [...toTasks];
  newToTasks.splice(hoverIndex, 0, { ...dragged, listId: toListId });

  return { newFromTasks, newToTasks, dragged };
};
