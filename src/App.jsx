import './App.css'
import { AuthProvider } from './context/AuthContext'
import MainNavigator from './MainNavigator'

function App() {

  return (
    <AuthProvider >
      <MainNavigator />
    </AuthProvider>
  )
}

export default App
