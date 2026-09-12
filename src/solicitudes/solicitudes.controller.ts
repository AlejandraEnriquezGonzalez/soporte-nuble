import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SolicitudService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Estado } from './enums/estado.enum';
import { Prioridad } from './enums/prioridad.enum';
import { Categoria } from './enums/categoria.enum';

@ApiTags('solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una nueva solicitud de soporte' })
  @ApiResponse({ status: 201, description: 'Solicitud creada con éxito en estado Pendiente.' })
  @ApiResponse({ status: 400, description: 'Error de validación o violaciones de reglas de negocio.' })
  create(@Body() dto: CreateSolicitudDto) {
    return this.solicitudesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes registradas' })
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get('buscar')
  @ApiOperation({ summary: 'Buscar solicitudes por estado, prioridad y/o categoría' })
  @ApiQuery({ name: 'estado', enum: Estado, required: false })
  @ApiQuery({ name: 'prioridad', enum: Prioridad, required: false })
  @ApiQuery({ name: 'categoria', enum: Categoria, required: false })
  buscar(
    @Query('estado') estado?: Estado,
    @Query('prioridad') prioridad?: Prioridad,
    @Query('categoria') categoria?: Categoria,
  ) {
    return this.solicitudesService.buscar(estado, prioridad, categoria);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una solicitud por su ID' })
  @ApiResponse({ status: 404, description: 'RN10: Recurso no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud existente por ID' })
  @ApiResponse({ status: 400, description: 'Transición de estado o fecha inválida.' })
  @ApiResponse({ status: 404, description: 'RN10: Recurso no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSolicitudDto) {
    return this.solicitudesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una solicitud por ID (Solo si está Finalizada)' })
  @ApiResponse({ status: 400, description: 'RN08: Intento de eliminar una solicitud no finalizada.' })
  @ApiResponse({ status: 404, description: 'RN10: Recurso no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudesService.remove(id);
  }
}