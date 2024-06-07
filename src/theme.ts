'use client';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
      fontFamily: [
        'Google Sans',
        'Google Sans Text',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
      h1: {
        fontFamily: 'Google Sans',
        fontWeight: 700,
      },
      h2: {
        fontFamily: 'Google Sans',
        fontWeight: 600,
      },
      h3: {
        fontFamily: 'Google Sans',
        fontWeight: 500,
      },
      body1: {
        lineHeight: 1.6,
      },
    },
  });