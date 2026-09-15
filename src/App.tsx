import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Sidebar } from './components/Sidebar';
import { BoostPage } from './pages/BoostPage';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, minWidth: 0 }}>
          <BoostPage />
        </main>
      </div>
    </ChakraProvider>
  );
}

export default App;