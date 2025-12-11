//import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/Header/index'

import TaskManager from './components/TaskManasger'

import { ThemeProvider } from './components/ThemeContext'
const App = () => {

  return(
    <ThemeProvider>
    <Header />
    <TaskManager />
    </ThemeProvider>
  )
  
}

export default App
