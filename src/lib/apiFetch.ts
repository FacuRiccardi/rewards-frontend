const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
