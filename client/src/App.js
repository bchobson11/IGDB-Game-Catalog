import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GameInfo from './pages/GameInfo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import styles from './App.module.css';

export default function App() { 

  return (
    <div className={styles.background}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/game/:id' element={<GameInfo/>} />
      </Routes>
      <Footer />
    </div>
  )
}