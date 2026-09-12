import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { SolicitudService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Estado } from './enums/estado.enum';
import { Prioridad } from './enums/prioridad.enum';
import { Categoria } from './enums/categoria.enum';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudService) {}

  @Post()
  create(@Body() dto: CreateSolicitudDto) {
    return this.solicitudesService.create(dto);
  }

  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get('buscar')
  buscar(
    @Query('estado') estado?: Estado,
    @Query('prioridad') prioridad?: Prioridad,
    @Query('categoria') categoria?: Categoria,
  ) {
    return this.solicitudesService.buscar(estado, prioridad, categoria);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSolicitudDto) {
    return this.solicitudesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudesService.remove(id);
  }
}