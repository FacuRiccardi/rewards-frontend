export const getItem = (key: string) => {
  const savedItem = localStorage.getItem(key)
  return savedItem ? JSON.parse(savedItem) : null
}

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}
