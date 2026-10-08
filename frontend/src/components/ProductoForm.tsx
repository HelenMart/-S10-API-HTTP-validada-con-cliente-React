
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ProductoDatos } from '../types/producto';

interface Props {
  inicial?: ProductoDatos;
  guardando: boolean;
  onGuardar: (datos: ProductoDatos) => Promise<boolean>;
  onCancelar: () => void;
}

export default function ProductoForm({
  inicial,
  guardando,
  onGuardar,
  onCancelar,
}: Props) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '');
  const [categoria, setCategoria] = useState(
    inicial?.categoria ?? '',
  );
  const [precio, setPrecio] = useState(
    inicial?.precio.toString() ?? '',
  );
  const [stock, setStock] = useState(
    inicial?.stock.toString() ?? '',
  );

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    await onGuardar({
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: Number(precio),
      stock: Number(stock),
    });
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <label>
        Nombre del producto
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          minLength={3}
          maxLength={80}
          required
          placeholder="Ej. Teclado Logitech"
          disabled={guardando}
        />
      </label>

      <label>
        Categoría
        <input
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          minLength={3}
          maxLength={50}
          required
          placeholder="Ej. Accesorios"
          disabled={guardando}
        />
      </label>

      <label>
        Precio (Q)
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0.01"
          step="0.01"
          required
          disabled={guardando}
        />
      </label>

      <label>
        Stock disponible
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          step="1"
          required
          disabled={guardando}
        />
      </label>

      <div className="acciones-formulario">
        <button
          type="button"
          className="btn-secundario"
          onClick={onCancelar}
          disabled={guardando}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn-principal"
          disabled={guardando}
        >
          {guardando
            ? 'Guardando...'
            : inicial
              ? 'Guardar cambios'
              : 'Registrar producto'}
        </button>
      </div>
    </form>
  );
}
