
import type { Producto, ProductoDatos } from '../types/producto';

const API_URL = 'http://localhost:3000/productos';

// Clase para identificar errores HTTP
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Función general para realizar solicitudes HTTP
async function solicitud<T>(
  url: string,
  opciones?: RequestInit,
): Promise<T> {
  let respuesta: Response;

  try {
    respuesta = await fetch(url, {
      ...opciones,
      headers: {
        'Content-Type': 'application/json',
        ...opciones?.headers,
      },
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor NestJS.',
    );
  }

  // DELETE devuelve 204 sin contenido
  if (respuesta.status === 204) {
    return undefined as T;
  }

  const datos: unknown = await respuesta.json();

  // Comprobar si el servidor devolvió un error
  if (!respuesta.ok) {
    const error = datos as {
      message?: string | string[];
    };

    const mensaje = Array.isArray(error.message)
      ? error.message.join(', ')
      : error.message ?? 'Ocurrió un error inesperado';

    throw new ApiError(respuesta.status, mensaje);
  }

  return datos as T;
}

// Métodos disponibles para consumir nuestra API
export const productosApi = {
  obtenerTodos: () =>
    solicitud<Producto[]>(API_URL),

  crear: (producto: ProductoDatos) =>
    solicitud<Producto>(API_URL, {
      method: 'POST',
      body: JSON.stringify(producto),
    }),

  actualizar: (id: number, producto: ProductoDatos) =>
    solicitud<Producto>(`${API_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(producto),
    }),

  eliminar: (id: number) =>
    solicitud<void>(`${API_URL}/${id}`, {
      method: 'DELETE',
    }),
};
