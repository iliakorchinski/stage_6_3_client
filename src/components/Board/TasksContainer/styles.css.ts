import { style } from '@vanilla-extract/css';

export const tasksContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  height: '100vh',
  border: '1px solid #a6c5e2',
  borderRadius: 16,
  overflow: 'hidden',
});

export const tasksHeader = style({
  width: '100%',
  height: 56,
  backgroundColor: '#fff',
});

export const tasksContent = style({
  width: '100%',
  height: '100%',
});

export const boardTitle = style({
  color: '#000',
  padding: 16,
  fontWeight: 500,
  fontSize: 24,
});
