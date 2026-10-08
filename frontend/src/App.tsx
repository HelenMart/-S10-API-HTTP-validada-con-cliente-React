
import { useCallback, useEffect, useState } from 'react';
import ProductoForm from './components/ProductoForm';
import { productosApi, ApiError } from './services/productosApi';
import type { Producto, ProductoDatos } from './types/producto';
import './App.css';

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  
const cargarProductos = useCallback(async () => {
  setCargando(true);
  setError('');

  try {
    const datos = await productosApi.obtenerTodos();
    setProductos(datos);
  } catch (err) {
    setError(obtenerMensaje(err));
  } finally {
    setCargando(false);
  }
}, []);

useEffect(() => {
  let activo = true;

  async function obtenerProductos() {
    try {
      const datos = await productosApi.obtenerTodos();

      if (activo) {
        setProductos(datos);
      }
    } catch (err) {
      if (activo) {
        setError(obtenerMensaje(err));
      }
    } finally {
      if (activo) {
        setCargando(false);
      }
    }
  }

  void obtenerProductos();

  return () => {
    activo = false;
  };
}, []);


  function obtenerMensaje(err: unknown): string {
    if (err instanceof ApiError) {
      return `Error ${err.status}: ${err.message}`;
    }

    if (err instanceof Error) {
      return err.message;
    }

    return 'Ocurrió un error inesperado.';
  }

  function nuevoProducto() {
    setEditando(null);
    setMostrarFormulario(true);
    setError('');
    setMensaje('');
  }

  function editarProducto(producto: Producto) {
    setEditando(producto);
    setMostrarFormulario(true);
    setError('');
    setMensaje('');
  }

  async function guardarProducto(
    datos: ProductoDatos,
  ): Promise<boolean> {
    setGuardando(true);
    setError('');
    setMensaje('');

    try {
      if (editando) {
        const actualizado = await productosApi.actualizar(
          editando.id,
          datos,
        );

        setProductos((anteriores) =>
          anteriores.map((producto) =>
            producto.id === actualizado.id
              ? actualizado
              : producto,
          ),
        );

        setMensaje('Producto actualizado correctamente.');
      } else {
        const creado = await productosApi.crear(datos);

        setProductos((anteriores) => [...anteriores, creado]);
        setMensaje('Producto registrado correctamente.');
      }

      setMostrarFormulario(false);
      setEditando(null);
      return true;
    } catch (err) {
      setError(obtenerMensaje(err));
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function eliminarProducto(id: number) {
    const confirmar = window.confirm(
      '¿Deseas eliminar este producto?',
    );

    if (!confirmar) return;

    setEliminando(id);
    setError('');
    setMensaje('');

    try {
      await productosApi.eliminar(id);

      setProductos((anteriores) =>
        anteriores.filter((producto) => producto.id !== id),
      );

      setMensaje('Producto eliminado correctamente.');
    } catch (err) {
      setError(obtenerMensaje(err));
    } finally {
      setEliminando(null);
    }
  }

  const formatoPrecio = (precio: number) =>
    new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
    }).format(precio);

  return (
    <div className="aplicacion">
      <header className="encabezado">
        <div className="contenedor">
          <div className="marca">
            <div className="logo">I</div>
            <div>
              <h1>Inventario</h1>
              <p>Sistema de gestión de productos</p>
            </div>
          </div>
          <span className="etiqueta">React + NestJS</span>
        </div>
      </header>

      <main className="contenedor principal">
        <div className="titulo-seccion">
          <div>
            <p className="subtitulo">PANEL ADMINISTRATIVO</p>
            <h2>Gestión de inventario</h2>
            <p>Administra los productos registrados.</p>
          </div>

          <button
            className="btn-principal"
            onClick={nuevoProducto}
            disabled={guardando || eliminando !== null}
          >
            + Nuevo producto
          </button>
        </div>

        <section className="resumen">
          <div className="resumen-icono">▣</div>
          <div>
            <span>Total de productos registrados</span>
            <strong>{productos.length}</strong>
          </div>
        </section>

        {mensaje && (
          <div className="alerta exito" role="status">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="alerta error" role="alert">
            {error}
          </div>
        )}

        {mostrarFormulario && (
          <section className="tarjeta formulario-tarjeta">
            <h3>
              {editando ? 'Editar producto' : 'Registrar producto'}
            </h3>
            <p>Completa los campos del formulario.</p>

            <ProductoForm
              key={editando?.id ?? 'nuevo'}
              inicial={
                editando
                  ? {
                      nombre: editando.nombre,
                      categoria: editando.categoria,
                      precio: editando.precio,
                      stock: editando.stock,
                    }
                  : undefined
              }
              guardando={guardando}
              onGuardar={guardarProducto}
              onCancelar={() => {
                setMostrarFormulario(false);
                setEditando(null);
              }}
            />
          </section>
        )}

        <section className="tarjeta">
          <div className="cabecera-tabla">
            <div>
              <h3>Productos registrados</h3>
              <p>Información obtenida desde nuestra API.</p>
            </div>
            <button
              className="btn-secundario"
              onClick={() => void cargarProductos()}
              disabled={cargando || guardando || eliminando !== null}
            >
              Actualizar
            </button>
          </div>

          {cargando ? (
            <div className="estado" role="status">
              Cargando productos...
            </div>
          ) : productos.length === 0 ? (
            <div className="estado">
              No hay productos registrados.
            </div>
          ) : (
            <div className="tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>#{producto.id}</td>
                      <td className="nombre-producto">
                        {producto.nombre}
                      </td>
                      <td>{producto.categoria}</td>
                      <td>{formatoPrecio(producto.precio)}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <div className="acciones">
                          <button
                            className="btn-editar"
                            onClick={() => editarProducto(producto)}
                            disabled={guardando || eliminando !== null}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-eliminar"
                            onClick={() =>
                              void eliminarProducto(producto.id)
                            }
                            disabled={guardando || eliminando !== null}
                          >
                            {eliminando === producto.id
                              ? 'Eliminando...'
                              : 'Eliminar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer>
          Sistema de Inventario | API REST con NestJS y React
        </footer>
      </main>
    </div>
  );
}
