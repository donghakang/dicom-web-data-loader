import React, { createContext, Dispatch, useContext, useReducer } from 'react'

type State = { files: File[] }
type Action = { type: 'SET_FILES'; files: File[] } | { type: 'RESET_FILES' }

type FileDispatch = Dispatch<Action>

const FileStateContext = createContext<State | null>(null)
const FileDispatchContext = createContext<FileDispatch | null>(null)

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_FILES':
      return {
        ...state,
        files: action.files,
      }
    case 'RESET_FILES':
      return {
        ...state,
        files: [],
      }
    default:
      throw new Error('😖 FileProvider.tsx: Something went wrong in Context')
  }
}

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    files: [],
  })

  return (
    <FileStateContext.Provider value={state}>
      <FileDispatchContext.Provider value={dispatch}>
        {children}
      </FileDispatchContext.Provider>
    </FileStateContext.Provider>
  )
}

// call files
export function useFileState() {
  const state = useContext(FileStateContext)
  if (!state)
    throw new Error(
      '😖 FileProvider.tsx: Cannot call FileProvider in useFileState()'
    )

  return state
}

// call setFiles
export function useFileDispatch() {
  const dispatch = useContext(FileDispatchContext)
  if (!dispatch)
    throw new Error(
      '😖 FileProvider.tsx: Cannot call FileProvider in useFileDispatch()'
    )

  return dispatch
}
