import local from './local-data.json'

type Skills = {
  programming_languages: string[]
  frontend_development: string[]
  backend_development: string[]
  database_and_storage: string[]
  cloud_and_devops: string[]
  tools_and_services: string[]
}

type PersonalInfo = Record<string, unknown>
type WorkExperience = Record<string, unknown>[]
type Education = Record<string, unknown>[]
type Project = Record<string, unknown>[]
type Award = Record<string, unknown>[]

export const personalInfo = (local as any).personalInfo as PersonalInfo
export const workExperience = ([...((local as any).workExperience ?? [])]
  .sort((a: any, b: any) => (Number(b?.id ?? 0)) - (Number(a?.id ?? 0)))) as WorkExperience
export const education = (local as any).education as Education
export const skills = ((local as any).skills ?? {
  programming_languages: [],
  frontend_development: [],
  backend_development: [],
  database_and_storage: [],
  cloud_and_devops: [],
  tools_and_services: []
}) as Skills
export const projects = (local as any).projects as Project
export const awards = (local as any).awards as Award