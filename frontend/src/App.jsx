import { Route, Routes } from 'react-router'
import Navbar from './Layouts/Navbar'
import ConstructionPage from './Pages/ConstructionPage'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import Todo from './Pages/Todo'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />


        <Route path='/habits' element={<ConstructionPage featureName='The Habit' />} />
        <Route path='/journal' element={<ConstructionPage featureName='The Journal ' />} />
        <Route path='/diary' element={<ConstructionPage featureName='The Diary ' />} />


      </Routes>
    </>
  )
}

export default App