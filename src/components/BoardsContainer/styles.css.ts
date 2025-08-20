import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  paddingTop: 16,
  paddingLeft: 32,
  backgroundColor: '#1D2125',
  width: '100%',
  height: '100vh',
});

globalStyle(`${container} h1`, {
  color: '#B6C2CF',
});

export const boardContainer = style({
  display: 'flex',
  gap: 10,
});

globalStyle(`${boardContainer} a`, {
  textDecoration: 'none',
  color: '#B6C2CF',
});

export const board = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  cursor: 'pointer',
  border: '1px solid black',
  gap: 8,
  borderRadius: 16,
  overflow: 'hidden',
});

globalStyle(`${board} p`, {
  display: 'inline-block',
  paddingBottom: 8,
  color: '#B6C2CF',
});

export const imageContainer = style({
  width: 200,
  height: 80,
});

globalStyle(`${imageContainer} img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const createBoardButton = style({
  color: '#B6C2CF',
  width: 200,
  height: '100%',
  border: '1px solid black',
  borderRadius: 16,
  overflow: 'hidden',
});
export const boardActions = style({
  position: 'absolute',
  top: 5,
  right: 5,
  display: 'flex',
  gap: 5,
  opacity: 0,
  transition: 'opacity 0.2s',
});

export const boardWrapper = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  cursor: 'pointer',
  border: '1px solid black',
  gap: 8,
  borderRadius: 16,
  overflow: 'hidden',
});

globalStyle(`${boardWrapper} p`, {
  display: 'inline-block',
  paddingBottom: 8,
  color: '#B6C2CF',
});

globalStyle(`${boardWrapper}:hover ${boardActions}`, {
  opacity: 1,
});
