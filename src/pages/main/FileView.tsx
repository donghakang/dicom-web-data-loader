import React, { useRef } from 'react'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useFileDispatch } from '../../context/file'

const FileView: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const folderRef = useRef<HTMLInputElement | null>(null)

  const dispatch = useFileDispatch()

  const setFiles = (files: File[]) => dispatch({ type: 'SET_FILES', files })

  useEffect(() => {
    if (folderRef.current !== null) {
      folderRef.current.setAttribute('directory', '')
      folderRef.current.setAttribute('webkitdirectory', '')
    }
  }, [folderRef])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    // setFiles(e.target.files!)
    setFiles(Array.from(e.target.files!))
  }

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    setFiles(Array.from(e.target.files!))
  }

  return (
    <div>
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
      <a onClick={(e) => fileRef.current!.click()} href={'#'}>
        file
      </a>
      <a onClick={(e) => folderRef.current!.click()} href={'#'}>
        folder
      </a>
      select file/folder to continue
    </div>
  )
}

export default FileView
