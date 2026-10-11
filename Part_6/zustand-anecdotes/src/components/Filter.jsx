import { useFilter } from '../store'
import { useAnecdoteActions } from '../store'

const Filter = () => {
  const { setFilter } = useAnecdoteActions();
  const filter = useFilter();

  const handleChange = (event) => {
    // the value of the input field is in event.target.value
    const value = event.target.value;
    setFilter(value);
    console.log('Filter value:', value); // Log the filter value to the console
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter