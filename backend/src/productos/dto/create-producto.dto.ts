
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ example: 'Teclado Logitech' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  nombre: string;

  @ApiProperty({ example: 'Accesorios' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  categoria: string;

  @ApiProperty({ example: 150.50 })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0.01)
  precio: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number;
}
