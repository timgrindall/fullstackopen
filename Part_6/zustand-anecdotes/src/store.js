
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async id => {
      const record = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(id, { ...record, votes: record.votes + 1 })
      set(state => ({ 
        anecdotes: state.anecdotes.map(anecdote => 
          anecdote.id === id ? updated : anecdote
        ) 
      }))
    },
    deleteAnecdote: async id => {
      await anecdoteService.deleteOne(id);
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }))
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: (value) => set(() => ({filter: value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }))
    }
  },
}))

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    setMessage: (text) => set({ message: text}),
    clearMessage: () => set({ message: '' })
  }
}))

// export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useAnecdotes = () => {
    const filter = useFilter();
    const anecdotes = useAnecdoteStore((state) => state.anecdotes);
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

    if (filter !== '') {
        return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
    } else {
        return sortedAnecdotes;
    }
  }

export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export const useNotification = () => useNotificationStore((state) => state.message)
export default useAnecdoteStore