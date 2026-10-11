import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    deleteOne: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  const mockAnecdotes = [
    { id: 1, content: 'Murphys Law: Anything that can go wrong will go wrong.', votes: 1 },
    { id: 2, content: 'The best way to get a project done faster is to start sooner.', votes: 5 },
    { id: 3, content: 'The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 10 }
  ]

  it('initialize loads anecdotes from service', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const sortedAnecdotes = [...mockAnecdotes].sort((a, b) => b.votes - a.votes)
    expect(anecdotesResult.current).toEqual(sortedAnecdotes)
    expect(anecdoteService.getAll).toHaveBeenCalledOnce()
  })

  // Write a test that verifies the component displaying anecdotes receives the anecdotes from the store sorted by votes.
  it('sorts anecdotes by votes', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    const sortedAnecdotes = [...mockAnecdotes].sort((a, b) => b.votes - a.votes)
    expect(anecdotesResult.current).toEqual(sortedAnecdotes)
    expect(anecdoteService.getAll).toHaveBeenCalledOnce()
  })

  // Write a test that verifies the correct React component receives a properly filtered list of anecdotes.
  it('component receives a filtered list of anecdotes', () => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 'murphy' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toEqual([mockAnecdotes[0]])
  })

  // Write a test that verifies that voting increases the number of votes for an anecdote.
  it('votes in store are changed by voting function', async () => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })
    const updatedAnecdote = { ...mockAnecdotes[0], votes: 2 }
    anecdoteService.update.mockResolvedValue(updatedAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    const expected = [...mockAnecdotes]
      .map(a => a.id === 1 ? { ...a, votes: a.votes + 1 } : a)
      .sort((a, b) => b.votes - a.votes)

    expect(anecdotesResult.current).toEqual(expected)
  })
})