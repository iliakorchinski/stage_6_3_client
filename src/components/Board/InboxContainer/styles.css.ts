import { style, globalStyle } from '@vanilla-extract/css';

export const inboxContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  height: '100vh',
  backgroundColor: '#172f53',

  border: '1px solid #a6c5e2',
  borderRadius: 16,
  overflow: 'hidden',
});

export const inboxHeader = style({
  backgroundColor: '#172b4d',

  width: '100%',
  height: 56,
});

export const inboxHeaderTitle = style({
  padding: 16,
  fontSize: 16,
  fontWeight: 600,
  color: '#fff',
});

export const inboxHeaderMainContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${inboxHeaderMainContent} h5`, {
  width: '60%',
  textAlign: 'center',
  fontSize: 16,
  color: '#fff',
});
globalStyle(`${inboxHeaderMainContent} p`, {
  width: '80%',
  textAlign: 'center',
  fontSize: 16,
  color: '#fff',
});
