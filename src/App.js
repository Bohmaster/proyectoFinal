import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/temaConfig';
import Container from './components/Container';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );
}

export default App;
