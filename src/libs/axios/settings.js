const isDevMode = process.env.NODE_ENV === 'development'
export const apiBaseUrl = isDevMode ? 'http://localhost:20320' : 'http://localhost:20320'
