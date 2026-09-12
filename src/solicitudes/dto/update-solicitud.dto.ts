import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSolicitudDto } from './create-solicitud.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Estado } from '../enums/estado.enum';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {
  @ApiPropertyOptional({
    enum: Estado,
    description: 'Estado de la solicitud para actualización',
    example: Estado.EN_PROCESO,
  })
  @IsOptional()
  @IsEnum(Estado, { message: 'El estado ingresado no es válido' })
  estado?: Estado;
}