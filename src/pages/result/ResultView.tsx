import React from 'react'
import { useFileState } from '../../context/file'
import { useInformationState } from '../../context/information'
import useProcessDicom from '../../utils/hook/useProcessDicom'

const ResultView: React.FC = () => {
  const fileState = useFileState()
  const informationState = useInformationState()

  console.log(informationState)
  const data = useProcessDicom()

  console.log('data', data)
  return <div>{fileState.files.length}</div>
}

export default ResultView
