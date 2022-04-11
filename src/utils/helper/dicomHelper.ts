import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import dcmjs from 'dcmjs'
import { InfoInterface } from '../../pages/information/InformationView'

export type DICOMDatasetInterface = any
export type SortedDICOMInterface = any
export async function generateImageId(file: File) {
  return cornerstoneWADOImageLoader.wadouri.fileManager.add(file)
}

export async function loadFile(imageId: string) {
  return cornerstoneWADOImageLoader.wadouri.loadFileRequest(imageId)
}

export function generateDicomData(image: DICOMDatasetInterface) {
  let dataset: any = {}
  try {
    const dicomData = dcmjs.data.DicomMessage.readFile(image)

    dataset = dcmjs.data.DicomMetaDictionary.naturalizeDataset(dicomData.dict)
    dataset = {
      ...dataset,
      _meta: dcmjs.data.DicomMetaDictionary.namifyDataset(dicomData.meta),
    }
  } catch (e) {
    //NOTE: Skip file which is not DICOM
  }

  return dataset['PatientID'] ? dataset : {}
}

/**
 * dicom데이터가 아닌 파일들은 걷어낸다.
 */
export const filterDicom = (fileDataset: DICOMDatasetInterface[]) => {
  return fileDataset.filter(
    (dataset: DICOMDatasetInterface) => Object.keys(dataset).length
  )
}

export const groupByPatientIDSeriesID = (
  fileDataset: DICOMDatasetInterface[]
) => {
  const result: SortedDICOMInterface = {}
  fileDataset.forEach((dataset: DICOMDatasetInterface) => {
    if (result[dataset['PatientID']]) {
      // 동일한 PatientID 가 존재한다.
      if (result[dataset['PatientID']][dataset['SeriesInstanceUID']]) {
        // 동일한 Series ID
        result[dataset['PatientID']][dataset['SeriesInstanceUID']] = [
          ...result[dataset['PatientID']][dataset['SeriesInstanceUID']],
          dataset,
        ]
      } else {
        // 같은 Patient ID, 새로운 Series UID
        result[dataset['PatientID']][dataset['SeriesInstanceUID']] = [dataset]
      }
    } else {
      // 새로운 Patient ID
      result[dataset['PatientID']] = {}
      result[dataset['PatientID']][dataset['SeriesInstanceUID']] = [dataset]
    }
  })

  return result
}

// Sorting 이 된 데이터를 csv로 변환할 수 있게끔 재개발한다.
export const finalizeDicomData = (
  sorted: SortedDICOMInterface,
  information: InfoInterface[]
) => {
  // sort only checked information
  const result: any = [] // Patient ID, Series UID, Series Count, ...information
  const info: string[] = information
    .filter((info: InfoInterface) => info.checked)
    .map((info: InfoInterface) => info.title.replace(/\s/g, ''))
  Object.keys(sorted).forEach((patient_id: string) => {
    Object.keys(sorted[patient_id]).forEach((series_uid: string) => {
      const dicomDataBySeriesUID = sorted[patient_id][series_uid]

      console.log('✨', info, dicomDataBySeriesUID)

      const metadata = info.reduce((arr, value) => {
        if (value === 'SeriesCount') {
          return { ...arr, [value]: dicomDataBySeriesUID.length }
        }
        if (value === 'SeriesID') {
          return {
            ...arr,
            [value]: dicomDataBySeriesUID[0]['SeriesInstanceUID'],
          }
        }
        if (value === 'Filepath') {
          return { ...arr, [value]: 'File path ...' }
        }
        if (value === 'Dimension') {
          return {
            ...arr,
            [value]: `${dicomDataBySeriesUID[0]['Rows']}x${dicomDataBySeriesUID[0]['Columns']}x${dicomDataBySeriesUID.length}`,
          }
        }
        return { ...arr, [value]: dicomDataBySeriesUID[0][value] }
      }, {})

      //TODO: without directly calling selectedInfoDicomData, create another
      // loop that will make another row
      result.push({
        ...metadata,
        // selectedInfoDicomData,
      })
    })
  })

  return result
}
