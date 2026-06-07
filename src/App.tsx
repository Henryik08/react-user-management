
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import UserForm from './components/UserForm'

function App() {
  return (
    <Routes>
      {/* Redirect root to /users */}
      <Route path="/" element={<Navigate to="/users" replace />} />
 
      {/* Show list of all users */}
      <Route path="/users" element={<UserList />} />
 
      {/* Show a single user's details */}
      <Route path="/users/:id" element={<UserDetail />} />
 
      {/* Form to add a new user */}
      <Route path="/add-user" element={<UserForm />} />
 
      {/* Form to edit an existing user */}
      <Route path="/edit-user/:id" element={<UserForm />} />
    </Routes>
  )
}
 
export default App
 
