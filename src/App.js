// App.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppContent from './AppContent';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
