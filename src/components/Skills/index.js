import './index.css'

const Skills = props => {
  const {skillList} = props

  const change = skillsList => ({
    name: skillsList.name,
    imageUrl: skillList.image_url,
  })

  const getChange = change(skillList)
  const {name, imageUrl} = getChange

  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
