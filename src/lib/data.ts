import { supabase } from "./supabase"



async function fetchDBInfo(table: string, first: boolean = true) {
  const { data, error } = await supabase.from(table).select("*");
  
  if (error) {
    console.error("Ошибка при получении ", table, ":", error);
    return null;
  }
  
  return first ? data?.[0] ?? null : data;
}

async function fetchSkills() {
  const { data, error } = await supabase.from('skills').select("*");
  
  if (error) {
    console.error("Ошибка при загрузке навыков:", error);
    return {
      programming_languages: [],
      frontend_development: [],
      backend_development: [],
      database_and_storage: [],
      cloud_and_devops: [],
      tools_and_services: []
    };
  }
  
  return data?.[0] || {
    programming_languages: [],
    frontend_development: [],
    backend_development: [],
    database_and_storage: [],
    cloud_and_devops: [],
    tools_and_services: []
  };
}



const awards_get = await fetchDBInfo('awards', false)

export const personalInfo = await fetchDBInfo('personalinfo');
export const workExperience = await fetchDBInfo('work_experience', false)
export const education = await fetchDBInfo('education', false)
export const skills = await fetchSkills()
export const projects = await fetchDBInfo('projects', false)
export const awards = awards_get