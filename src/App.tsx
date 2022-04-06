import React from 'react'
import FileSelector from './pages/main'
import InformationSelector from './pages/information'
import ResultPage from './pages/result'

const App: React.FC = () => {
  return (
    <div>
      <FileSelector />
      <InformationSelector />
      <ResultPage />
    </div>
  )
}

export default App
