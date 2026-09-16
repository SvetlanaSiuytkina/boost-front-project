import { Sidebar } from './components/Sidebar';
import { BoostPage } from './pages/BoostPage';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, minWidth: 0 }}>
        <BoostPage />
      </main>
    </div>
  );
}

export default App;