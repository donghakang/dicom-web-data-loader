import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../../components/datatable'
import { useFileDispatch, useFileState } from '../../context/file'
import {
  useInformationDispatch,
  useInformationState,
} from '../../context/information'
import {
  toCSV,
  downloadCSV,
  row2col,
  col2row,
} from '../../utils/helper/csvHelper'
import useProcessDicom from '../../utils/hook/useProcessDicom'
import * as Styled from './style'

const ResultView: React.FC = () => {
  const fileState = useFileState()
  const informationState = useInformationState()

  // Dispatch
  const fileDispatch = useFileDispatch()
  const infoDispatch = useInformationDispatch()

  const { loading, status, data } = useProcessDicom()

  const [tableset, setTableset] = useState<
    { id: string; title: string; content: string[] }[]
  >([])

  useEffect(() => {
    if (!loading && status === 'ok' && data.length > 0) {
      setTableset(row2col(data))
    }
  }, [status])

  return (
    <Styled.ResultView>
      <div className="result-container">
        <h1>Result</h1>
        <h3>Switch columns by drag & drop</h3>
      </div>
      {tableset.length > 0 && (
        <>
          <DataTable
            data={data}
            tableset={tableset}
            setTableset={setTableset}
          />
          <div className="result-container result-button-container">
            <Link
              className="button-container cancel"
              to="/"
              onClick={() => {
                fileDispatch({ type: 'RESET_FILES' })
                infoDispatch({ type: 'RESET_INFO' })
              }}
            >
              Reset
            </Link>
            <a
              href={downloadCSV(toCSV(col2row(tableset)))}
              download=""
              className="button-container"
            >
              Click to pusblish
            </a>
          </div>
        </>
      )}
    </Styled.ResultView>
  )
}

export default ResultView
