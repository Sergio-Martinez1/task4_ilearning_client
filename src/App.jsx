import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AdminPage from './pages/AminPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='w-full h-screen relative flex flex-col'>
          <NavBar />
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={<AdminPage></AdminPage>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
