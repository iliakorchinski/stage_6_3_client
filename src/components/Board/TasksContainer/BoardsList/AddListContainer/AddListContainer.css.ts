import { style, globalStyle } from '@vanilla-extract/css';

export const addListContainer = style({
  flex: '0 0 200px',

  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  padding: 10,
});

export const addButton = style({
  backgroundColor: 'transparent',
  color: 'black',
  border: 'none',
  cursor: 'pointer',
});

globalStyle(`${addListContainer} input`, {
  width: '100%',
  height: 36,
  padding: 10,
  backgroundColor: 'rgb(34, 39, 43)',
  border: '1px solid rgb(182, 194, 207)',
  borderRadius: 8,
  color: '#fff',
});
export const saveButton = style({
  backgroundColor: 'rgb(87, 157, 255)',
  border: '1px solid rgb(87, 157, 255)',
  borderRadius: 8,
  color: '#fff',
  height: 24,
  padding: '0 10px',
});

export const addListActions = style({
  display: 'flex',
  gap: 10,
  padding: 10,
  cursor: 'pointer',
  justifyContent: 'space-between',
});
