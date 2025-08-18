import { style, globalStyle } from '@vanilla-extract/css';

export const addList = style({
  marginTop: 32,
  padding: '0 10px',
  paddingBottom: 10,
  display: 'flex',
  gap: 10,
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${addList} input`, {
  width: '100%',
  height: 24,
  padding: 10,
  backgroundColor: 'rgb(34, 39, 43)',
  border: '1px solid rgb(182, 194, 207)',
  borderRadius: 8,
  color: '#fff',
});

globalStyle(`${addList} button`, {
  backgroundColor: 'rgb(87, 157, 255)',
  border: '1px solid rgb(87, 157, 255)',
  borderRadius: 8,
  color: '#fff',
  height: 24,
  padding: '0 10px',
  cursor: 'pointer',
});
