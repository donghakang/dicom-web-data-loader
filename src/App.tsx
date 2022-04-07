import React from 'react'
import FileSelector from './pages/main'
import InformationSelector from './pages/information'
import ResultPage from './pages/result'
import initCornerstone from './utils/helper/initCornerstone'

const App: React.FC = () => {
  initCornerstone()

  return (
    <div>
      <FileSelector />
      <InformationSelector />
      <ResultPage />
    </div>
  )
}

export default App
