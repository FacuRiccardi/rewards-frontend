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
    try {
      const { error, errors } = await response.json()

      if (!error && !errors) throw new Error('Error fetching data')

      return {
        error: error ? error : errors.length ? errors[0] : 'Error fetching data'
      }
    } catch(error) {
      throw new Error('Error fetching data')
    }
  }

  return await response.json()
}
