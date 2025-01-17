import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QueryInput from './components/QueryInput';
import ResponseCard from './components/ResponseCard';
import AddPersonButton from './components/AddPersonButton';
import AddProjectButton from './components/AddProjectButton';
import logo from './logo.webp';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6b6b',
    },
    secondary: {
      main: '#feca57',
    },
    background: {
      default: '#fff9f9',
    },
  },
});

interface QueryResponse {
  query: string;
  response: string;
  sources: { title: string; description: string }[];
}

function App() {
  const [responses, setResponses] = useState<QueryResponse[]>([]);

  const handleQuery = async (query: string) => {
    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: query }),
      });
      const data: QueryResponse = await response.json();
      console.log(data.sources);
      setResponses([...responses, data]);
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Box 
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: -1, // Ensure it stays on top but doesn't interfere with other components
      borderRadius: '16px', // Rounded corners
      overflow: 'hidden', // Ensure the corners are rounded for the image
    }}
  >
    <img 
      src={logo} 
      alt="Logo" 
      style={{ 
        width: '50%',  // Half the size of the original
        height: 'auto', 
        borderRadius: '16px', // Curved corners
      }} 
    />
  </Box> */}
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Group Hug
          </Typography>
          <Box sx={{ mb: 2 }}>
            {responses.map((response, index) => (
              <ResponseCard key={index} response={response} />
            ))}
          </Box>
          <QueryInput onSubmit={handleQuery} />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <AddPersonButton />
            <AddProjectButton />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

