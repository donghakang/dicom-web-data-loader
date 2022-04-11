import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { InfoInterface } from '../../pages/information/InformationView'

type State = InfoInterface[]
type Action =
  | { type: 'SET_INFO'; info: InfoInterface[] }
  | { type: 'HANDLE_INFO_BY_ID'; id: string }
  | { type: 'RESET_INFO' }

type InfoDispatch = Dispatch<Action>

const sampleState = [
  { id: '1', title: 'Patient Name', placeholder: '', checked: false },
  { id: '2', title: 'Patient ID', placeholder: '', checked: false },
  { id: '3', title: 'Study ID', placeholder: '', checked: false },
  { id: '4', title: 'Series ID', placeholder: '', checked: false },
  { id: '5', title: 'Series Number', placeholder: '', checked: false },
  { id: '6', title: 'Series Count', placeholder: '', checked: false },
  { id: '7', title: 'Dimension', placeholder: '250x250x250', checked: false },
  { id: '8', title: 'Accession Number', placeholder: '', checked: false },
  { id: '9', title: 'Series Description', placeholder: '', checked: false },
  { id: '10', title: 'Convolution Kernel', placeholder: '', checked: false },
  { id: '11', title: 'Acquisition Date', placeholder: '', checked: false },
  { id: '13', title: 'Slice Thickness', placeholder: '', checked: false },
  { id: '14', title: 'Filepath', placeholder: '', checked: false },
]

// context
const InfoStateContext = createContext<State | null>(sampleState)
const InfoDispatchContext = createContext<InfoDispatch | null>(null)

// reducer
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_INFO':
      return action.info

    case 'RESET_INFO':
      return sampleState

    default:
      throw new Error(
        '😖 InformationProvider.tsx: Something went wrong in Context'
      )
  }
}

export function InformationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, sampleState)

  return (
    <InfoStateContext.Provider value={state}>
      <InfoDispatchContext.Provider value={dispatch}>
        {children}
      </InfoDispatchContext.Provider>
    </InfoStateContext.Provider>
  )
}

// call information
export function useInformationState() {
  const state = useContext(InfoStateContext)
  if (!state)
    throw new Error(
      '😖 InformationProvider.tsx: Cannot call InformationProvider in useInformationState()'
    )

  return state
}

// call setInformation
export function useInformationDispatch() {
  const dispatch = useContext(InfoDispatchContext)
  if (!dispatch)
    throw new Error(
      '😖 InformationProvider.tsx: Cannot call InformationProvider in useInformationDispatch()'
    )

  return dispatch
}
