import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './components/temaConfig';
import Main from './components/Main';

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Main />
      </ThemeProvider>
   );
}

export default App;
