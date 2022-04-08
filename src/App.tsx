import React from 'react'
import FileView from './pages/main'
import InformationView from './pages/information'
import ResultView from './pages/result'
import initCornerstone from './utils/helper/initCornerstone'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useFileState } from './context/file'
const App: React.FC = () => {
  initCornerstone()

  const { files } = useFileState()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileView />} />
        <Route
          path="/info"
          element={files.length ? <InformationView /> : <Navigate to="/" />}
        />
        <Route
          path="/result"
          element={files.length ? <ResultView /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  )
}

export default App
