
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { NewNote } from './components/NewNote'

function App() {


  return (
    <Layout >
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/new' element={<NewNote />}/>
 
      </Routes>
    </Layout>
  )
}

export default App
