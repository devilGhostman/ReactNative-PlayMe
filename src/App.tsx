import {AuthProvider} from './context/AuthContext';
import AppNavigation from './navigation/AppNavigation';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

export default App;
