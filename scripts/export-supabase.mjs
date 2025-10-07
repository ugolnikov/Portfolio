import 'dotenv/config'
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outPath = resolve(__dirname, '../src/lib/local-data.json')

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.PUBLIC_SUPABASE_KEY || process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('ENV: Не заданы PUBLIC_SUPABASE_URL и/или PUBLIC_SUPABASE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function fetchAll(table, first = false) {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw new Error(`Ошибка запроса ${table}: ${error.message}`)
  return first ? (data?.[0] ?? null) : (data ?? [])
}

async function main() {
  const payload = {
    personalInfo: await fetchAll('personalinfo', true),
    workExperience: await fetchAll('work_experience', false),
    education: await fetchAll('education', false),
    skills: (await (async () => {
      const { data, error } = await supabase.from('skills').select('*')
      if (error) throw new Error(`Ошибка запроса skills: ${error.message}`)
      return data?.[0] ?? {
        programming_languages: [],
        frontend_development: [],
        backend_development: [],
        database_and_storage: [],
        cloud_and_devops: [],
        tools_and_services: []
      }
    })()),
    projects: await fetchAll('projects', false),
    awards: await fetchAll('awards', false)
  }

  const json = JSON.stringify(payload, null, 2)
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, json, 'utf8')
  console.log(`Данные сохранены: ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


