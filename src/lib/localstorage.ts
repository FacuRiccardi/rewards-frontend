export const getItem = (key: string) => {
  try {
    const savedItem = localStorage.getItem(key)
    return savedItem ? JSON.parse(savedItem) : null
  } catch (e) {
    console.error('Error getting item from localStorage:', e)
    removeItem(key)
    return null
  }

}

export const setItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Error setting item in localStorage:', e)
    removeItem(key)
  }
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}
