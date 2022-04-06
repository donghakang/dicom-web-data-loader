import React, { useState } from 'react'
import StyledInformationView from './style'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { css } from '@emotion/react'

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
    // console.log('title', title, list)

    console.log(
      '///',
      list.find((element) => element.id === id)
    )
    const cloneList = [...list]
    cloneList[cloneList.findIndex((element) => element.id === id)].checked =
      !cloneList[cloneList.findIndex((element) => element.id === id)].checked

    setList(cloneList)
  }

  return (
    <div
      onClick={handleChangeCheckbox}
      css={css`
        display: flex;
      `}
    >
      <input
        type="checkbox"
        name="checkbox"
        id="patient"
        checked={checked}
        onChange={handleChangeCheckbox}
      />
      <span className="info">{title}</span>
    </div>
  )
}

function InformationSelector() {
  const [list, setList] = useState<Array<InfoInterface>>([
    { id: '1', title: 'Patient Name', checked: false },
    { id: '2', title: 'Patient ID', checked: false },
    { id: '3', title: 'Study ID', checked: false },
    { id: '4', title: 'Series Number', checked: false },
    { id: '5', title: 'Dimension', checked: false },
    { id: '6', title: 'Series Description', checked: false },
  ])

  function handleDragEnd(result: any) {
    if (!result.destination) return

    const items = Array.from(list)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setList(items)
    console.log('drag ended', items)
  }

  function finalizeInformatics() {
    console.log(list)
  }

  return (
    <StyledInformationView>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided: any) => (
            <ul
              className="todos"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map(({ id, title, checked }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided: any) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {/* {title} */}
                      <Checkbox
                        id={id}
                        title={title}
                        checked={checked}
                        list={list}
                        setList={setList}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={finalizeInformatics}>Submit</button>
    </StyledInformationView>
  )
}

export default InformationSelector
