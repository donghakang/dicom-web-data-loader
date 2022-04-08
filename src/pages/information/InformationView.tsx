import React, { useState } from 'react'
import StyledInformationView from './style'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { css } from '@emotion/react'
import {
  useInformationDispatch,
  useInformationState,
} from '../../context/information'
import { Link } from 'react-router-dom'

export interface InfoInterface {
  id: string
  title: string
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
    </label>
  )
}

const InformationView: React.FC = () => {
  const state = useInformationState()
  const dispatch = useInformationDispatch()
  const [list, setList] = useState<Array<InfoInterface>>(state)

  function handleDragEnd(result: any) {
    if (!result.destination) return

    const items = Array.from(list)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    console.log(items)
    setList(items)
  }

  function finalizeInformatics() {
    dispatch({ type: 'SET_INFO', info: list })
  }

  return (
    <StyledInformationView>
      <ul>
        {list.map(({ id, title, checked }, index) => (
          <li key={index}>
            <Checkbox
              id={id}
              title={title}
              checked={checked}
              list={list}
              setList={setList}
            />
          </li>
        ))}
      </ul>
      <Link to="/result" onClick={finalizeInformatics}>
        Submit
      </Link>
    </StyledInformationView>
  )
}

export default InformationView
