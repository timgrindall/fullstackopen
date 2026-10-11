const baseUrl = 'http://localhost:3001/anecdotes'

const genID = () => Number((100000 * Math.random()).toFixed(0))

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({content, id: genID(), votes: 0})
  }

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error('Failed to create record')
  }

  return await response.json()
}

const update = async (id, anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(anecdote)
  };

  const response = await fetch(`${baseUrl}/${id}`, options);

  if (!response.ok) {
    throw new Error('Failed to update record');
  }

  return await response.json()
}

const deleteOne = async (id) => {
  const options = {
    method: 'DELETE'
  };

  const response = await fetch(`${baseUrl}/${id}`, options);

  if (!response.ok) {
    throw new Error('Failed to delete record');
  }

  return await response.json()
}

export default { getAll, createNew, update, deleteOne }