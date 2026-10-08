
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista obtenida' })
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Nombre duplicado' })
  create(@Body() datos: CreateProductoDto) {
    return this.productosService.create(datos);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 409, description: 'Nombre duplicado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdateProductoDto,
  ) {
    return this.productosService.update(id, datos);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.productosService.remove(id);
  }
}
