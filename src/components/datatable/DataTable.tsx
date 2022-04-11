import { css } from '@emotion/react'
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import * as Styled from './style'

const DataTable: React.FC<{
  data: any
  tableset: { id: string; title: string; content: string[] }[]
  setTableset: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        title: string
        content: string[]
      }[]
    >
  >
}> = ({ data, tableset, setTableset }) => {
  function handleDragEnd(result: any) {
    if (!result.destination) return

    const items = Array.from(tableset)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTableset(items)
  }

  return (
    <Styled.DataTable>
      <div className="datatable-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos" direction="horizontal" type="column">
            {(provided: any) => (
              <div
                className="tableset"
                {...provided.droppableProps}
                ref={provided.innerRef}
                css={css`
                  display: flex;
                `}
              >
                {tableset.map(
                  (
                    {
                      id,
                      title,
                      content,
                    }: { id: string; title: string; content: string[] },
                    index: number
                  ) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided: any) => (
                        <div
                          className="table-column"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <strong>{title} </strong>
                          {content.map((data: string, index: number) =>
                            data ? (
                              <div key={index}>{data}</div>
                            ) : (
                              <div>&nbsp;</div>
                            )
                          )}
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Styled.DataTable>
  )
}

export default DataTable
