import { type List } from '../../../../../store/lists.api';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import { input } from './styles.css';
import { useState } from 'react';
import { useGetHistoryByBoardQuery } from '../../../../../store/history.api';
import { HistoryBoardModal } from '../../../../Modals/HistoryBoardModal';
import { useParams } from 'react-router';

interface ListItemProps {
  list: List;
  isEditing: string | null;
  setIsEditing: (isEditing: string | null) => void;
  setIsAddingList: (isAddingList: boolean) => void;
  setUpdatedItem: (updatedItem: List) => void;
  updatedItem: List | null;
  handleUpdateList: (listId: string, title: string) => void;
  handleSave: () => void;
  className: string;
  handleDeleteList: () => void;
}

export const ListItem = ({
  list,
  isEditing,
  setIsEditing,
  setIsAddingList,
  setUpdatedItem,
  updatedItem,
  handleUpdateList,
  handleSave,
  className,
  handleDeleteList,
}: ListItemProps) => {
  const { id } = useParams();

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { data } = useGetHistoryByBoardQuery(id as string, {
    skip: !isHistoryModalOpen,
  });
  const history = data?.filter((item) => item.entityId === list.id);
  return (
    <>
      <h3
        onClick={() => {
          setIsEditing(list.id);
          setIsAddingList(false);
          setUpdatedItem(list);
        }}
      >
        {isEditing === list.id ? (
          <input
            className={input}
            type="text"
            value={updatedItem?.title}
            onChange={(e) => {
              handleUpdateList(list.id, e.target.value);
            }}
            onBlur={handleSave}
          />
        ) : (
          list.title
        )}
      </h3>

      <div className={className}>
        <DeleteIcon color="error" onClick={handleDeleteList} />
        <HistoryIcon
          color="primary"
          onClick={() => setIsHistoryModalOpen(true)}
        />
      </div>

      <HistoryBoardModal
        isModalOpen={isHistoryModalOpen}
        setIsModalOpen={setIsHistoryModalOpen}
        history={history}
        allowedEntityTypes={['List', 'Task']}
      />
    </>
  );
};
