import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  padding: '4px',
  backgroundColor: 'rgb(34, 39, 43)',
  borderRadius: 8,
  margin: 8,
});

export const deleteIcon = style({
  position: 'absolute',
  right: 4,
  top: 4,
});

export const spanTitle = style({
  color: '#fff',
  fontSize: 16,
  fontWeight: 500,
});
