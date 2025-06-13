import { Outlet } from 'react-router-dom'
import { DataContextProvider } from '../contexts/DataContext'

const ProtectedLayout = () => {
  return (
    <DataContextProvider>
      <Outlet />
    </DataContextProvider>
  )
}

export default ProtectedLayout
