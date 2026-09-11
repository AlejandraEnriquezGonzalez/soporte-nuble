import { Controller, Get } from '@nestjs/common';
import { SolicitudService } from './solicitudes.service';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudService) {}

  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }
}