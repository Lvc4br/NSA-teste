// Ponto único para a futura API.
// Exemplo futuro: const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}