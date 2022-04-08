import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useFileDispatch, useFileState } from '../../context/file'
import { Link } from 'react-router-dom'
import Layout from '../../components/layout'
import { FileTextContainer } from './style'

const FileView: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const folderRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useFileDispatch()

  // const setFiles = (files: File[]) => dispatch({ type: 'SET_FILES', files })
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    if (folderRef.current !== null) {
      folderRef.current.setAttribute('directory', '')
      folderRef.current.setAttribute('webkitdirectory', '')
    }
  }, [folderRef])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    // setFiles(e.target.files!)
    const selected = Array.from(e.target.files!)
    setFiles(selected)
    dispatch({ type: 'SET_FILES', files: selected })
  }

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    const selected = Array.from(e.target.files!)
    setFiles(selected)
    dispatch({ type: 'SET_FILES', files: selected })
  }

  const handleFileButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('file')
    if (fileRef.current !== null) {
      fileRef.current.click()
    }
  }
  const handleFolderButtonClicked = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (folderRef.current !== null) {
      folderRef.current.click()
    }
  }

  return (
    <Layout>
      <div
        css={css`
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {/** file selector */}
        <div
          css={css`
            display: none;
          `}
        >
          <input
            ref={fileRef}
            onChange={handleFileChange}
            type="file"
            id="file_directory"
            name="file_directory"
            multiple
          />
          <input
            ref={folderRef}
            onChange={handleFolderChange}
            type="file"
            id="folder_directory"
            name="folder_directory"
          />
        </div>

        <FileTextContainer>
          <h1
            css={css`
              font-size: 4.25rem;
              font-weight: 900;
            `}
          >
            Get DICOM Information
          </h1>
          <span>
            Fastest online DICOM information, and publish to .csv file start by
            choosing{' '}
            <button onClick={handleFileButtonClicked}>multiple files</button> or
            a <button onClick={handleFolderButtonClicked}>folder</button>
          </span>
          <div>
            {files.length > 1 ? (
              <Link role="button" to="/info">
                Continue
              </Link>
            ) : (
              <a href={'#'}>Continue</a>
            )}
          </div>
        </FileTextContainer>

        <img
          src="img/dicom-logo.png"
          alt="main-image"
          css={css`
            padding-left: 50px;
            max-width: 100%;
          `}
        />
      </div>
    </Layout>
  )
}

export default FileView
