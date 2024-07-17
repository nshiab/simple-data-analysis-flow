const ids: string[] = []

export default function getId(idLength: number = 6) {
  let i = 0
  while (true) {
    i += 1
    if (i > 10) {
      console.warn(`getId.ts attempt ${i}! Increase the idLength.`)
    }
    const id = createId(idLength)
    if (!ids.includes(id)) {
      ids.push(id)
      return id
    }
  }
}

function createId(idLength: number) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  let id = ""
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * (characters.length - 1))
    id += characters[randomIndex]
  }
  return id
}
