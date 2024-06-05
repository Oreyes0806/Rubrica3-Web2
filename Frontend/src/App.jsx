import './App.css'
import {ConfigRoutes} from './ConfigRoutes'
import { HostalProvider } from './context/Hostal/HostalProvider'
import { UserProvider } from './context/users/UserProvider'
function App() {
  return (
    <>
    <UserProvider>
      <HostalProvider>
        <ConfigRoutes/>
        </HostalProvider>
      </UserProvider>
    </>
  )
}

export default App
