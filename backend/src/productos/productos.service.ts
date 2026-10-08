
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

@Injectable()
export class ProductosService {
  private productos: Producto[] = [];
  private siguienteId = 1;

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    const producto = this.productos.find(
      (item) => item.id === id,
    );

    if (!producto) {
      throw new NotFoundException(
        `El producto con ID ${id} no existe`,
      );
    }

    return producto;
  }

  create(datos: CreateProductoDto): Producto {
    const existe = this.productos.some(
      (item) =>
        item.nombre.toLowerCase() ===
        datos.nombre.toLowerCase(),
    );

    if (existe) {
      throw new ConflictException(
        'Ya existe un producto con ese nombre',
      );
    }

    const producto: Producto = {
      id: this.siguienteId++,
      ...datos,
    };

    this.productos.push(producto);
    return producto;
  }

  update(id: number, datos: UpdateProductoDto): Producto {
    const producto = this.findOne(id);

    if (datos.nombre !== undefined) {
      const duplicado = this.productos.some(
        (item) =>
          item.id !== id &&
          item.nombre.toLowerCase() ===
            datos.nombre!.toLowerCase(),
      );

      if (duplicado) {
        throw new ConflictException(
          'Ya existe otro producto con ese nombre',
        );
      }
    }

    Object.assign(producto, datos);
    return producto;
  }

  remove(id: number): void {
    this.findOne(id);

    this.productos = this.productos.filter(
      (item) => item.id !== id,
    );
  }
}
