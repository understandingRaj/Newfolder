export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function normalizeBaseUrl(url) {
  if (!url) return ''
  return url.endsWith('/') ? url.slice(0, -1) : url
}

function normalizePath(path) {
  if (!path) return ''
  return path.startsWith('/') ? path : `/${path}`
}

const baseUrl = normalizeBaseUrl(API_BASE_URL)

export function apiFetch(path, options) {
  const url = baseUrl ? `${baseUrl}${normalizePath(path)}` : normalizePath(path)
  return fetch(url, options)
}

export function apiUrl(path) {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return baseUrl ? `${baseUrl}${normalizePath(path)}` : normalizePath(path)
}
