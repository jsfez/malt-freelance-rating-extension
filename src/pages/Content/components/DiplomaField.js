import { Skill, SkillDescription, SkillTitle } from './SkillField'

export function DiplomaField({ educationYears = [] }) {
  if (educationYears.length === 0) return null

  if (educationYears.find((year) => isNaN(year))) {
    return (
      <Skill>
        <SkillTitle>Diplome</SkillTitle>
        <SkillDescription>en cours</SkillDescription>
      </Skill>
    )
  }

  return (
    <Skill>
      <SkillTitle>Diplomé en</SkillTitle>
      <SkillDescription>{Math.max(...educationYears)}</SkillDescription>
    </Skill>
  )
}
