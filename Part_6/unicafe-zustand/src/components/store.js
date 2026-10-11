import { create } from 'zustand'

const useReviewStore = create(set => ({
  data: {
    good: 0,
    neutral: 0,
    bad: 0
  },
  actions: {
    addGood: () => set(state => ({ data: { ...state.data, good: state.data.good + 1 } })),
    addNeutral: () => set(state => ({ data: { ...state.data, neutral: state.data.neutral + 1 } })),
    addBad: () => set(state => ({ data: { ...state.data, bad: state.data.bad + 1 } })),
  }
}))

// the hook functions that are used elsewhere in app
export const useReviewData = () => useReviewStore(state => state.data)
export const useReviewControls = () => useReviewStore(state => state.actions)