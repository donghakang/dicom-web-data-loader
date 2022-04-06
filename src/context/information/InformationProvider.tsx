import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { InfoInterface } from '../../pages/information/InformationSelector'

type State = InfoInterface[]
type Action =
  | { type: 'SET_INFO'; info: InfoInterface[] }
  | { type: 'RESET_INFO' }

type InfoDispatch = Dispatch<Action>

const sampleState = [
  { id: '1', title: 'Patient Name', checked: false },
  { id: '2', title: 'Patient ID', checked: false },
  { id: '3', title: 'Study ID', checked: false },
  { id: '4', title: 'Series Number', checked: false },
  { id: '5', title: 'Dimension', checked: false },
  { id: '6', title: 'Series Description', checked: false },
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
