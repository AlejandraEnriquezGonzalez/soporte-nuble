import { Injectable } from '@nestjs/common';

@Injectable()
export class SolicitudService {
  findAll() {
    return 'Listado inicial de solicitudes';
  }
}
