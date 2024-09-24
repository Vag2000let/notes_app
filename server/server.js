import express from 'express'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'path'

const app = express()
app.use(express.json())
const PORT = 4000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const notesFilePath = path.join(__dirname, '/data/notes.json')

/**
 * Reads the notes from the file.
 *
 * @returns {Promise<Buffer>} The contents of the file as a Buffer.
 */
async function readNotesFromFile() {
  return fs
    .readFile(notesFilePath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err))
}

const notes = await readNotesFromFile()

// console.log('notes', notes)

/**
 * Writes the notes to the file.
 *
 * @param {any} notes - The notes to write to the file.
 *
 * @returns {Promise<void>} The result of writing the file.
 */
async function writeNotesToFile(notes) {
  return await fs.writeFile(notesFilePath, JSON.stringify(notes))
}

app.use((req, res, next) => {
  const originHost = req.headers.origin

  res.setHeader('Access-Control-Allow-Origin', originHost)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/notes', (req, res, next) => {
  res.json(notes)
})

app.post('/create', async (req, res, next) => {
  const fineByIndex = notes.findIndex((note) => note.id === req.body.id)

  if (fineByIndex !== -1) {
    const updatedNotes = notes.map((note, noteIdx) => {
      if (noteIdx === req.body.id) {
        note = req.body
        return note
      }

      return note
    })
    console.log('updatedNotes', updatedNotes)

    await writeNotesToFile(updatedNotes)
    res.json(updatedNotes)
  } else {
    const newNotes = [...notes, req.body]
    console.log('newNotes', newNotes)

    await writeNotesToFile(newNotes)
    res.json(newNotes)
  }
})

app.delete('/delete/:id', async (req, res, next) => {
  const notesFiltred = notes.filter((note, noteIdx) => noteIdx !== parseInt(req.params.id))
  await writeNotesToFile(notesFiltred)
  res.json(notesFiltred)
})

app.listen(PORT, () => {
  console.log(`Сервер слушает порт ${PORT}...`)
})
