import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotification from './useNotification'

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false, // Prevents long delays by turning off automatic retry attempts
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (_, variables) => {
      // Invalidate the 'anecdotes' query key so TanStack Query automatically refetches the updated list
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      showNotification(`anecdote '${variables.content}' added.`, 5)
    },
    onError: (error) => {
      showNotification(error.message, 5)
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (_, variables) => {
      // Invalidate the 'anecdotes' query key so TanStack Query automatically refetches the updated list from the server
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      showNotification(`voted on '${variables.content}'`, 5)
    },
    onError: (error) => {
      showNotification(error.message, 5)
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}