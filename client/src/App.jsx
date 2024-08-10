import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// The ApolloClient instance is created and exported from the client/src/App.jsx file. The uri property is set to /graphql, which is the endpoint that the Apollo Client will use to make requests to the server. The cache property is set to a new instance of InMemoryCache, which will store the data returned from the server in memory.
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


// The ApolloClient instance is created and exported from the client/src/App.jsx file. The uri property is set to /graphql, which is the endpoint that the Apollo Client will use to make requests to the server. The cache property is set to a new instance of InMemoryCache, which will store the data returned from the server in memory.
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});


// The App component is the root of the application. It uses the ApolloProvider component to provide the Apollo Client instance to the entire application. The Navbar component is rendered at the top of the page, and the Outlet component is used to render the appropriate page based on the current route.
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
