import {
  container,
  boardContainer,
  board,
  imageContainer,
  boardActions,
  boardWrapper,
} from './BoardsContainer.css';
import rocksImage from '../../assets/pictures/rocks.jpg';
import { Link } from 'react-router-dom';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useFetchBoardsQuery,
  useUpdateBoardMutation,
} from '../../store/boardsSlice';
import { useState } from 'react';
import { CreateBoardModal } from '../Modals/CreateBoardModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const BoardsContainer = () => {
  const [createBoard] = useCreateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const { data: boards } = useFetchBoardsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;

    if (selectedBoardId) {
      await updateBoard({ id: selectedBoardId, title: newTitle });
      setSelectedBoardId(null);
    } else {
      await createBoard({ title: newTitle });
    }

    setNewTitle('');
    setIsModalOpen(false);
  };

  const handleEditClick = (id: string, title: string) => {
    setSelectedBoardId(id);
    setNewTitle(title);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    deleteBoard(id);
  };

  return (
    <div className={container}>
      <h1>All Boards</h1>

      <div className={boardContainer}>
        {boards?.map((item) => {
          return (
            <Link to={`/${item.id}`} key={item.id}>
              <div className={boardWrapper}>
                <div className={imageContainer}>
                  <img src={rocksImage} />
                </div>
                <p>{item.title}</p>
                <div className={boardActions}>
                  <EditIcon
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleEditClick(item.id, item.title);
                    }}
                  />
                  <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteClick(item.id);
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}

        <button className={board} onClick={() => setIsModalOpen(true)}>
          Create board
        </button>
      </div>

      <CreateBoardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        handleCreate={handleCreate}
      />
    </div>
  );
};
