import { Box, Button, List, ListItem, Modal, Typography } from '@mui/material';
import { type History } from '../../store/boards.api';

type EntityType = 'Board' | 'List' | 'Task';
type EntityPair = [EntityType, EntityType];

interface HistoryBoardModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void;
  history?: History[];
  allowedEntityTypes: EntityPair;
}

export const HistoryBoardModal = ({
  isModalOpen,
  setIsModalOpen,
  history,
  allowedEntityTypes,
}: HistoryBoardModalProps) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflowY: 'scroll',
          maxHeight: '60vh',
        }}
      >
        <Box>
          <Typography variant="h5">History</Typography>
        </Box>
        <List>
          {history
            ?.filter((item) => allowedEntityTypes.includes(item.entityType))
            .map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Typography>💥{item.operation}:</Typography>
                <Typography>
                  {item.operation === 'UPDATE' && (
                    <>
                      Updated {item.entityType} title from{' '}
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {item.oldValue?.title}
                      </Typography>{' '}
                      to{' '}
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {item.newValue?.title}
                      </Typography>
                    </>
                  )}
                </Typography>
                <Typography>
                  {item.operation === 'DELETE' && (
                    <>
                      Deleted {item.entityType}{' '}
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {item.oldValue?.title}
                      </Typography>
                    </>
                  )}
                </Typography>
                <Typography>
                  {item.operation === 'CREATE' && (
                    <>
                      Created {item.entityType}{' '}
                      <Typography component="span" sx={{ fontWeight: 'bold' }}>
                        {item.newValue?.title}
                      </Typography>
                    </>
                  )}
                </Typography>
                <Typography>
                  {item.operation === 'REORDER' &&
                    item.oldValue?.position !== item.newValue?.position &&
                    `Reordered in board ${item.oldValue?.title} list ${item.newValue?.title} to position ${item.newValue?.position}`}
                </Typography>
                <Typography>
                  {item.operation === 'MOVE' &&
                    `Moved task ${item.oldValue?.title} to list ${item.newValue?.title}`}
                </Typography>
              </ListItem>
            ))}
        </List>
        <Button variant="contained" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
