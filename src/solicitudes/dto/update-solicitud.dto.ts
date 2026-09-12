import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudDto } from './create-solicitud.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Estado } from '../enums/estado.enum';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {
  @IsOptional()
  @IsEnum(Estado, { message: 'El estado no es válido' })
  estado?: Estado;
}