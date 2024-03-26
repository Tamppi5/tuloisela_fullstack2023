    const Header = (props) => {
        return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
        )
    }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    const { course } = props
    const parts = course.parts
    return (
      <div>
        {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }
  
  const Total = (props) => {
    const { course } = props
    const parts = course.parts
    return (
      <div>
        <h4>Number of exercises {parts.map(part => part.exercises).reduce((s,p) => (s+p))}</h4>
      </div>
    )
  }
  
const Course = ({ course }) => {
  return (
    <div>
      <Header course = {course}/>
      <Content course = {course}/>
      <Total course = {course}/>
    </div>
  )
}

export default Course