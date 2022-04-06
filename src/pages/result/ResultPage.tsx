import React from 'react'
import { useFileState } from '../../context/file'

function ResultPage() {
  const state = useFileState()

  return <div>{state.files.length}</div>
}

export default ResultPage
