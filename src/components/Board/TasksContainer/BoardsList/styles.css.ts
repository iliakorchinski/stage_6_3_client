import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  height: '100%',
  gap: 10,
  padding: 20,
  flexWrap: 'nowrap',
  overflowX: 'auto',
  alignItems: 'flex-start',
});

export const boardListContainer = style({
  maxWidth: 200,
  flex: '0 0 200px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#101204',
  borderRadius: 12,
});

globalStyle(`${boardListContainer} h3`, {
  color: '#B6C2CF',
  fontWeight: 500,
  fontSize: 16,
  padding: 10,
});

globalStyle(`${boardListContainer} input`, {
  color: '#fff',
  border: '1px solid rgb(182, 194, 207)',
  width: '100%',
  height: 24,
  backgroundColor: 'rgb(34, 39, 43)',
});

export const deleteIcon = style({
  position: 'absolute',
  top: 5,
  right: 5,
  display: 'flex',
  gap: 5,
  opacity: 0,
  transition: 'opacity 0.2s',
});

globalStyle(`${boardListContainer}:hover ${deleteIcon}`, {
  opacity: 1,
});

export const addListContainer = style({
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  padding: 10,
  width: '20%',
});

export const addButton = style({
  backgroundColor: 'transparent',
  color: 'black',
  border: 'none',
  cursor: 'pointer',
});

globalStyle(`${addListContainer} input`, {
  width: '100%',
  backgroundColor: 'rgb(34, 39, 43)',
  border: '1px solid rgb(182, 194, 207)',
  color: '#fff',
});
export const saveButton = style({
  backgroundColor: 'rgb(87, 157, 255)',
  border: '1px solid rgb(87, 157, 255)',
});

export const addListActions = style({
  display: 'flex',
  gap: 10,
  padding: 10,
  cursor: 'pointer',
});
