import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import type { FC } from 'react';

interface CreateBoardModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  newTitle: string;
  setNewTitle: (value: React.SetStateAction<string>) => void;
  handleCreate: () => Promise<void>;
}

export const CreateBoardModal: FC<CreateBoardModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  newTitle,
  setNewTitle,
  handleCreate,
}) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Create Board
        </Typography>
        <TextField
          fullWidth
          label="Board title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
