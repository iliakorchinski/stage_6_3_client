import CloseIcon from '@mui/icons-material/Close';
import {
  addListContainer,
  addButton,
  addListActions,
  saveButton,
} from './AddListContainer.css';

interface AddListContainerProps {
  isAddingList: boolean;
  newListTitle: string;
  setNewListTitle: (title: string) => void;
  handleSave: () => void;
  setIsAddingList: (isAddingList: boolean) => void;
  setIsEditing: (isEditing: string | null) => void;
}

export const AddListContainer = ({
  isAddingList,
  newListTitle,
  setNewListTitle,
  handleSave,
  setIsAddingList,
  setIsEditing,
}: AddListContainerProps) => {
  return (
    <div className={addListContainer}>
      {isAddingList ? (
        <div>
          <input
            value={newListTitle}
            placeholder="New list..."
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <div className={addListActions}>
            <button onClick={handleSave} className={saveButton}>
              Save
            </button>
            <CloseIcon
              onClick={() => {
                setIsAddingList(false);
                setNewListTitle('');
              }}
              color="primary"
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsAddingList(true);
            setIsEditing(null);
          }}
          className={addButton}
        >
          Add List
        </button>
      )}
    </div>
  );
};
