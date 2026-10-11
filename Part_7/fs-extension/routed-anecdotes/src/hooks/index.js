import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    console.log(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => {
      console.log(data)
      setAnecdotes(data)
    })
  }, [])

  const addAnecdote = async (anecdote) => {
    console.log('New anecdote created:', anecdote.content)
    await anecdoteService.createNew(anecdote)
    await anecdoteService.getAll().then(data => {
      console.log(data)
      setAnecdotes(data)
    })
  }

  const deleteAnecdote = async (id) => {
    const anecdote = anecdotes.find(item => item.id === id)

    if (!anecdote) return

    const confirmed = window.confirm(
      `Delete anecdote "${anecdote.content}"?`
    )

    if (!confirmed) return

    console.log('Deleting:', anecdote.content)
    await anecdoteService.deleteOne(id)
    await anecdoteService.getAll().then(data => {
      console.log(data)
      setAnecdotes(data)
    })
  }

  return { anecdotes, addAnecdote, deleteAnecdote }
}