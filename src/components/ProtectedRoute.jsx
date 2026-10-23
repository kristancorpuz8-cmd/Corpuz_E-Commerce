import { Navigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export default function ProtectedRoute({ role, children }) {
  const { user } = useStore()
  if (!user) return <Navigate to="/" replace />
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'seller' ? '/seller' : '/shop'} replace />
  }
  return children
}
