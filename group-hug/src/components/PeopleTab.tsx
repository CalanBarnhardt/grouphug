import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddPersonButton from './AddPersonButton';

interface Person {
  name: string;
  description: string;
}

const PeopleTab: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const [people, setPeople] = useState<Person[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const initialized = useRef(false);

  const fetchPeople = async () => {
    try {
        console.log("fetching people")
      const response = await fetch(`${API_URL}/get_all_people?skip=${page * 20}&limit=20`);
      const data = await response.json();
      
      setHasMore(false);
      
      // setPeople(prevPeople => [...prevPeople, ...data.people]);
      setPeople(data.people);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };
  

  useEffect(() => {
    if (!initialized.current) {
      fetchPeople();
      initialized.current = true;
    }
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <AddPersonButton />
      </Box>
      <InfiniteScroll
        dataLength={people.length}
        next={fetchPeople}
        hasMore={hasMore}
        loader={<Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>}
      >
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: 2,
          p: 2
        }}>
          {people.map((person, index) => (
            <Card key={index}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <PersonIcon />
                  <Typography variant="h6">{person.name}</Typography>
                </Box>
                <Typography variant="body1">{person.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default PeopleTab; 