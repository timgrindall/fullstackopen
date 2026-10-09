import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteList, setVotes] = useState(Array(8).fill(0))
  const [mostPopular, setPopular] = useState(0)

  const genNumber = () => {
    let randomNum = Math.floor(Math.random() * 8);
    setSelected(randomNum)
    console.log("selected: ", randomNum)
  }

  const findMostPopular = () => {
    
    let highestValue = 0
    let highestIndex = 0

    console.log('highestIndex: ', highestIndex);

    for (let index = 0; index < 8; index++) {
      // console.log(voteList[index])
      if (voteList[index] > highestValue) {
        highestValue = voteList[index]
        highestIndex = index;
      }
    }

    console.log("highestIndex: ", highestIndex)
    setPopular(highestIndex)
  }

  const addVote = () => {
    setVotes(voteList.map((item, i) => i === selected ? item + 1 : item))
    // console.log("votes on selected: ", voteList[selected])
  }

  const clearVotes = () => {
    setVotes(Array(8).fill(0))
    // console.log(voteList)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {voteList[selected]} votes</div>
      <button onClick={addVote}>vote</button>
      <button onClick={() => { genNumber(); findMostPopular()}}>next anecdote</button>
      <button onClick={clearVotes}>clear votes</button>
      <h1>Most Popular</h1>
      <div>{anecdotes[mostPopular]}</div>
    </div>
  )
}

export default App