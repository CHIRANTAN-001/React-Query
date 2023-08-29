import React, { useState,useEffect } from 'react';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios';


const queryClient = new QueryClient();

const ReactQueryComponent = () => { 
  // console.log('ReactQueryComponent');
  const { data, isLoading, error } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => 
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => {
          console.log(res.data);
          console.log('hello')
          console.log('hello')
          return res.data;
        }),

  });
  
  if(isLoading) { 
    return <h1>Loading...</h1>
  }

  if(error) { 
    return <h1>Error: {error.message}</h1>
  }

  return (
    // <>
      <div>
        <h2>React Query Data Fetching</h2>
        <ul>
          {data.map((item) => (
            <div key={item.id}>
              <li>{item.title}</li>
            </div>
          ))}
        </ul>
      </div>
    // </>
  );
}

const UseEffectComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      console.log(response.data);
      console.log('hello')
      console.log('hello')

      setData(response.data); // Use response.data to access the fetched data
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <h2>useEffect Data Fetching</h2>
      <ul>
        {data.map((item) => (
          <div key={item.id}>
            <li>{item.title}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ReactQueryComponent />
      </div>
    </QueryClientProvider>
    
  )
}

export default App;
