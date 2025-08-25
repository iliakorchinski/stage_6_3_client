import { useParams } from 'react-router';
import {
  useUpdateListMutation,
  useDeleteListMutation,
  type List,
  useReorderListsMutation,
  useGetListsQuery,
  useCreateListMutation,
} from '../../../../store/lists.api';
import {
  useGetTasksByBoardQuery,
  useMoveTaskMutation,
  useReorderTasksMutation,
} from '../../../../store/tasks.api';
import { container, deleteIcon } from './styles.css';
import { useState, useEffect } from 'react';
import { ListItemWrapper } from './ListItemWrapper/ListItemWrapper';
import { TasksList } from '../../../Tasks/TasksList/TasksList';
import { type Task } from '../../../../store/tasks.api';
import {
  moveList,
  moveTasksToAnotherList,
  reorderTasksInList,
} from './BoardsList.utils';
import { AddListContainer } from './AddListContainer/AddListContainer';
import { ListItem } from './ListItem/ListItem';

export const BoardsList = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAddingList, setIsAddingList] = useState(false);
  const { data: lists } = useGetListsQuery([id as string]);
  const { data: tasks } = useGetTasksByBoardQuery(id as string);
  const [updateList] = useUpdateListMutation();
  const [createList] = useCreateListMutation();
  const [deleteList] = useDeleteListMutation();
  const [reorderLists] = useReorderListsMutation();
  const [moveTaskApi] = useMoveTaskMutation();
  const [reorderTasks] = useReorderTasksMutation();

  const [updatedItem, setUpdatedItem] = useState<List | null>(null);
  const [newListTitle, setNewListTitle] = useState<string>('');

  const [listOrder, setListOrder] = useState<List[]>([]);
  const [allTasks, setAllTasks] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    if (lists) setListOrder(lists[0].lists);
  }, [lists]);

  useEffect(() => {
    if (tasks) {
      const grouped: Record<string, Task[]> = {};
      tasks.forEach((task) => {
        if (!grouped[task.listId]) grouped[task.listId] = [];
        grouped[task.listId].push(task);
      });
      setAllTasks(grouped);
    }
  }, [tasks]);

  const handleMoveList = async (dragIndex: number, hoverIndex: number) => {
    const positioned = moveList(listOrder, dragIndex, hoverIndex);
    setListOrder(positioned);
    await reorderLists({
      boardId: id as string,
      listOrder: positioned,
    });
  };

  const handleDeleteList = async (id: string) => {
    await deleteList(id);
  };

  const moveTask = async (
    dragIndex: number,
    hoverIndex: number,
    fromListId: string,
    toListId: string
  ) => {
    const fromTasks = allTasks[fromListId] || [];
    const toTasks = allTasks[toListId] || [];
    const dropped = { ...toTasks[hoverIndex] };

    if (toListId === fromListId) {
      const positioned = reorderTasksInList(fromTasks, dragIndex, hoverIndex);
      setAllTasks((prev) => ({
        ...prev,
        [fromListId]: positioned,
      }));
      await reorderTasks({
        taskOrder: positioned,
      });
    } else {
      const { newFromTasks, newToTasks, dragged } = moveTasksToAnotherList(
        fromTasks,
        toTasks,
        dragIndex,
        hoverIndex,
        toListId
      );
      setAllTasks((prev) => ({
        ...prev,
        [fromListId]: newFromTasks,
        [toListId]: newToTasks,
      }));

      await moveTaskApi({
        id: dragged.id,
        listId: toListId,
        position: hoverIndex,
      });
      await moveTaskApi({
        id: dropped.id,
        listId: toListId,
        position: dragIndex,
      });
    }
  };

  const handleUpdateList = (listId: string, title: string) => {
    const selectedList = lists?.[0].lists?.find((list) => list.id === listId);
    if (selectedList) {
      setUpdatedItem({ ...selectedList, title });
    }
  };

  const handleSave = async () => {
    if (updatedItem) {
      await updateList({
        id: updatedItem.id,
        title: updatedItem.title,
        position: updatedItem.position,
      });
      setIsEditing(null);
      setUpdatedItem(null);
    }
    if (isAddingList && newListTitle.trim()) {
      await createList({ boardId: id as string, title: newListTitle.trim() });
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  return (
    <div className={container}>
      {listOrder?.map((list, index) => (
        <ListItemWrapper
          key={list.id}
          list={list}
          index={index}
          moveList={handleMoveList}
        >
          <ListItem
            list={list}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setIsAddingList={setIsAddingList}
            setUpdatedItem={setUpdatedItem}
            updatedItem={updatedItem}
            handleUpdateList={handleUpdateList}
            handleSave={handleSave}
            className={deleteIcon}
            handleDeleteList={() => handleDeleteList(list.id)}
          />

          <div style={{ marginTop: '8px' }}>
            <TasksList
              listId={list.id}
              tasks={allTasks[list.id] || []}
              moveTask={moveTask}
            />
          </div>
        </ListItemWrapper>
      ))}

      <AddListContainer
        isAddingList={isAddingList}
        newListTitle={newListTitle}
        setNewListTitle={setNewListTitle}
        handleSave={handleSave}
        setIsAddingList={setIsAddingList}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};
