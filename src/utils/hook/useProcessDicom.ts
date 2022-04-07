import React, { useEffect, useState } from 'react'
import { useFileState } from '../../context/file'
import { useInformationState } from '../../context/information'
import {
  DICOMDatasetInterface,
  filterDicom,
  finalizeDicomData,
  generateDicomData,
  generateImageId,
  groupByPatientIDSeriesID,
  loadFile,
  SortedDICOMInterface,
} from '../helper/dicomHelper'

interface DCMProcessInterface {
  loading: boolean
  status: string
  data: any
}

const useProcessDicom = () => {
  const [result, setResult] = useState<DCMProcessInterface>({
    loading: false,
    status: 'ok',
    data: [],
  })
  const [data, setData] = useState<any[]>([])

  const { files } = useFileState()
  const informationState = useInformationState()

  const resetState = () => {
    //
  }

  /**
   * 파일 데이터를 이용하여 dicom 이미지 데이터를 가지고 온다
   */
  const fetchData = async () => {
    try {
      Promise.all(
        files.map(async (file: File) => {
          const fileImageId = await generateImageId(file)
          const fileImage = await loadFile(fileImageId)
          const fileDataset = await generateDicomData(fileImage)

          return fileDataset
        })
      )
        .then((result: DICOMDatasetInterface[]) => filterDicom(result))
        .then((result: DICOMDatasetInterface[]) =>
          groupByPatientIDSeriesID(result)
        )
        .then((result: SortedDICOMInterface) =>
          finalizeDicomData(result, informationState)
        )
    } catch {
      throw new Error('😖 useProcessDicom.tsx: data processing failed')
    }
  }

  useEffect(() => {
    fetchData()
  }, [files])

  return result
}

export default useProcessDicom
