import { IsNotEmpty, IsString, MinLength, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../enums/categoria.enum';
import { Prioridad } from '../enums/prioridad.enum';

export class CreateSolicitudDto {
  @ApiProperty({
    description: 'Título descriptivo de la solicitud (mínimo 5 caracteres)',
    example: 'Falla de conexión en switch principal',
  })
  @IsString()
  @MinLength(5, { message: 'RN01: El título debe tener al menos 5 caracteres' })
  titulo: string;

  @ApiProperty({
    description: 'Nombre del cliente asociado a la solicitud',
    example: 'Distribuidora Ñuble SpA',
  })
  @IsNotEmpty({ message: 'RN02: El cliente es obligatorio y no puede quedar vacío' })
  @IsString()
  cliente: string;

  @ApiProperty({
    enum: Categoria,
    description: 'Categoría del servicio técnico',
    example: Categoria.REDES,
  })
  @IsEnum(Categoria, { message: 'RN03: La categoría debe ser Hardware, Software, Redes, Seguridad o Soporte Usuario' })
  categoria: Categoria;

  @ApiProperty({
    enum: Prioridad,
    description: 'Nivel de prioridad de la atención',
    example: Prioridad.ALTA,
  })
  @IsEnum(Prioridad, { message: 'RN04: La prioridad debe ser Baja, Media, Alta o Crítica' })
  prioridad: Prioridad;

  @ApiProperty({
    description: 'Detalle extendido del problema (mínimo 15 caracteres)',
    example: 'El área de ventas reporta pérdida total de acceso a la red local desde las 09:00 hrs.',
  })
  @IsString()
  @MinLength(15, { message: 'RN06: La descripción debe contener al menos 15 caracteres' })
  descripcion: string;

  @ApiProperty({
    description: 'Fecha de ingreso de la solicitud (Formato YYYY-MM-DD, no posterior a hoy)',
    example: '2026-09-11',
  })
  @IsNotEmpty({ message: 'RN07: La fecha de solicitud es obligatoria' })
  @IsDateString({}, { message: 'RN07: La fecha debe tener un formato válido (YYYY-MM-DD)' })
  fechaSolicitud: string;
}