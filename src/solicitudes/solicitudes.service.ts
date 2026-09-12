import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Estado } from './enums/estado.enum';
import { Categoria } from './enums/categoria.enum';
import { Prioridad } from './enums/prioridad.enum';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
  ) {}

  // POST /solicitudes
  async create(dto: CreateSolicitudDto): Promise<Solicitud> {
    // RN07: Fecha obligatoria y no posterior a la fecha actual
    const fechaIngresada = new Date(dto.fechaSolicitud);
    const hoy = new Date();
    hoy.setHours(23, 59, 59, 999);

    if (fechaIngresada > hoy) {
      throw new BadRequestException('RN07: La fecha de solicitud no puede ser posterior a la fecha actual');
    }

    // RN05: Toda nueva solicitud se crea automáticamente en estado Pendiente
    const nueva = this.solicitudRepository.create({
      ...dto,
      estado: Estado.PENDIENTE,
    });

    return await this.solicitudRepository.save(nueva);
  }

  // GET /solicitudes
  async findAll(): Promise<Solicitud[]> {
    return await this.solicitudRepository.find();
  }

  // GET /solicitudes/:id
  async findOne(id: number): Promise<Solicitud> {
    const solicitud = await this.solicitudRepository.findOneBy({ id });
    // RN10: Error adecuado y código HTTP coherente (404 NotFound) para ID inexistente
    if (!solicitud) {
      throw new NotFoundException(`RN10: No se encontró la solicitud con el ID ${id}`);
    }
    return solicitud;
  }

  // GET /solicitudes/buscar?estado=&prioridad=&categoria=
  async buscar(estado?: Estado, prioridad?: Prioridad, categoria?: Categoria): Promise<Solicitud[]> {
    const query = this.solicitudRepository.createQueryBuilder('solicitud');

    if (estado) query.andWhere('solicitud.estado = :estado', { estado });
    if (prioridad) query.andWhere('solicitud.prioridad = :prioridad', { prioridad });
    if (categoria) query.andWhere('solicitud.categoria = :categoria', { categoria });

    return await query.getMany();
  }

  // PUT /solicitudes/:id
  async update(id: number, dto: UpdateSolicitudDto): Promise<Solicitud> {
    const solicitud = await this.findOne(id); // Evalúa RN10 (Si no existe, retorna 404)

    if (dto.fechaSolicitud) {
      const fechaIngresada = new Date(dto.fechaSolicitud);
      const hoy = new Date();
      hoy.setHours(23, 59, 59, 999);
      if (fechaIngresada > hoy) {
        throw new BadRequestException('RN07: La fecha de solicitud no puede ser posterior a la fecha actual');
      }
    }

    // RN09: Transición de estado - Una solicitud Finalizada no puede volver a Pendiente
    if (solicitud.estado === Estado.FINALIZADA && dto.estado === Estado.PENDIENTE) {
      throw new BadRequestException('RN09: Una solicitud Finalizada no puede volver al estado Pendiente');
    }

    Object.assign(solicitud, dto);
    return await this.solicitudRepository.save(solicitud);
  }

  // DELETE /solicitudes/:id
  async remove(id: number): Promise<void> {
    const solicitud = await this.findOne(id); // Evalúa RN10

    // RN08: Restricción de eliminación - Si está En Proceso o Pendiente, no se puede eliminar
    if (solicitud.estado !== Estado.FINALIZADA) {
      throw new BadRequestException(
        `RN08: No se puede eliminar una solicitud en estado '${solicitud.estado}'. Debe encontrarse en estado Finalizada.`,
      );
    }

    await this.solicitudRepository.remove(solicitud);
  }
}
