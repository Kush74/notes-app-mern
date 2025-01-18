
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './components/MainLayout'
import { Home } from './components/Home'
import { NewNote } from './components/NewNote'

function App() {


  return (
 
      <Routes>
        <Route element={<MainLayout />}>

          <Route path='/' element={<Home />}/>
          <Route path='/new' element={<NewNote />}/>
        </Route>
 
      </Routes>

  )
}

export default App
