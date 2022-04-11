import React, { useState } from 'react'
import StyledInformationView from './style'
import {
  useInformationDispatch,
  useInformationState,
} from '../../context/information'
import { Link } from 'react-router-dom'

export interface InfoInterface {
  id: string
  title: string
  placeholder: string
  checked: boolean
}

interface ListInterface {
  list: InfoInterface[]
  setList: React.Dispatch<React.SetStateAction<InfoInterface[]>>
}

const Checkbox: React.FC<InfoInterface & ListInterface> = ({
  id,
  title,
  checked,
  placeholder,
  list,
  setList,
}) => {
  function handleChangeCheckbox() {
    const cloneList = [...list]
    cloneList[cloneList.findIndex((element) => element.id === id)].checked =
      !cloneList[cloneList.findIndex((element) => element.id === id)].checked

    setList(cloneList)
  }

  return (
    <label>
      <input
        type="checkbox"
        name="checkbox"
        id="patient"
        checked={checked}
        onChange={handleChangeCheckbox}
      />
      <span className="info">{title}</span>
      {placeholder.length > 0 && (
        <span className="info-eg">e.g. {placeholder}</span>
      )}
    </label>
  )
}

const InformationView: React.FC = () => {
  const state = useInformationState()
  const dispatch = useInformationDispatch()
  const [list, setList] = useState<Array<InfoInterface>>(state)

  function finalizeInformatics() {
    dispatch({ type: 'SET_INFO', info: list })
  }

  return (
    <StyledInformationView>
      <div className="information-container">
        <h1>Select DICOM Data</h1>
        <ul>
          {list.map(({ id, title, placeholder, checked }, index) => (
            <li key={index}>
              <Checkbox
                id={id}
                title={title}
                checked={checked}
                placeholder={placeholder}
                list={list}
                setList={setList}
              />
            </li>
          ))}
        </ul>
        <div>
          <Link
            className="button-container"
            to="/result"
            onClick={finalizeInformatics}
          >
            Submit
          </Link>
        </div>
      </div>
    </StyledInformationView>
  )
}

export default InformationView
