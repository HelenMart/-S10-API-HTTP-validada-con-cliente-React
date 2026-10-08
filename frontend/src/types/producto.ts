
export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export type ProductoDatos = Omit<Producto, 'id'>;
