import {
  useDeleteListMutation,
  type List,
} from '../../../../../store/lists.api';
import DeleteIcon from '@mui/icons-material/Delete';
import { input } from './styles.css';

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
  deleteList: (listId: string) => void;
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
}: ListItemProps) => {
  const [deleteList] = useDeleteListMutation();
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
            onChange={(e) => handleUpdateList(list.id, e.target.value)}
            onBlur={handleSave}
          />
        ) : (
          list.title
        )}
      </h3>
      <div className={className}>
        <DeleteIcon color="error" onClick={() => deleteList(list.id)} />
      </div>
    </>
  );
};
