import { IsNotEmpty, IsString, MinLength, IsEnum, IsDateString } from 'class-validator';
import { Categoria } from '../enums/categoria.enum';
import { Prioridad } from '../enums/prioridad.enum';

export class CreateSolicitudDto {
  @IsString()
  @MinLength(5, { message: 'RN01: El título debe tener al menos 5 caracteres' })
  titulo: string;

  @IsNotEmpty({ message: 'RN02: El cliente es obligatorio' })
  @IsString()
  cliente: string;

  @IsEnum(Categoria, { message: 'RN03: Categoría inválida' })
  categoria: Categoria;

  @IsEnum(Prioridad, { message: 'RN04: Prioridad inválida' })
  prioridad: Prioridad;

  @IsString()
  @MinLength(15, { message: 'RN06: La descripción debe tener al menos 15 caracteres' })
  descripcion: string;

  @IsNotEmpty({ message: 'RN07: La fecha de solicitud es obligatoria' })
  @IsDateString({}, { message: 'RN07: Formato de fecha inválido (YYYY-MM-DD)' })
  fechaSolicitud: string;
}