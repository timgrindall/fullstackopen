const Header = ({name}) => {

  return (
    <h1>{name}</h1>
  )
}

/*
const Part = (props) => {
  const title = props.title
  const exercises = props.exercises

  return (
    <>
      <p>{title} {exercises}</p>
    </>
  )
}
  */

const Content = ({course}) => {

  const exercises = course.parts.map(part => part.exercises)

  const total = exercises.reduce((sum, n) => sum + n, 0)

  return (
    <>
      <ul style={{paddingInlineStart: 0}}>
      {course.parts.map((part) => <li key={part.id} style={{listStyleType: "none"}}>
          <p>{part.name} {part.exercises}</p>
        </li>)}
      </ul>
      <p><strong>Total of {total} exercises</strong></p>
    </>
  )

}

const Course = ({course}) => {
  console.log("Hello Course!")
  // console.log("<Course>: ", course)
  return (
    <div>
      <Header name={course.name} key={course.id}/>
      <Content course={course} />
    </div>
  )
}

export default Course