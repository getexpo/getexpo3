import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

export async function ensureUploadDir(subdir = '') {
  const dir = subdir ? path.join(UPLOAD_DIR, subdir) : UPLOAD_DIR
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true })
  }
  return dir
}

export function validateFile(file) {
  if (!file) {
    throw new Error('No file provided')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit')
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only images are allowed.')
  }

  return true
}

export function generateUniqueFilename(originalFilename) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const ext = path.extname(originalFilename)
  const nameWithoutExt = path.basename(originalFilename, ext)
  const sanitized = nameWithoutExt.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  return `${sanitized}-${timestamp}-${random}${ext}`
}

export async function saveFile(file, subdir = '') {
  validateFile(file)
  
  const dir = await ensureUploadDir(subdir)
  const filename = generateUniqueFilename(file.name)
  const filepath = path.join(dir, filename)
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  await writeFile(filepath, buffer)
  
  // Return relative path from public directory
  const relativePath = `/uploads${subdir ? '/' + subdir : ''}/${filename}`
  
  return {
    filename,
    path: relativePath,
    size: file.size,
    mimeType: file.type,
  }
}

export async function saveMultipleFiles(files, subdir = '') {
  const results = []
  for (const file of files) {
    try {
      const result = await saveFile(file, subdir)
      results.push(result)
    } catch (error) {
      console.error(`Error saving file ${file.name}:`, error)
      results.push({ error: error.message, filename: file.name })
    }
  }
  return results
}

