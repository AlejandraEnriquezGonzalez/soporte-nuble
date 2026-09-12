import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Categoria } from '../enums/categoria.enum';
import { Prioridad } from '../enums/prioridad.enum';
import { Estado } from '../enums/estado.enum';

@Entity('solicitudes')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 255 })
  cliente: string;

  @Column({ type: 'enum', enum: Categoria })
  categoria: Categoria;

  @Column({ type: 'enum', enum: Prioridad })
  prioridad: Prioridad;

  @Column({ type: 'enum', enum: Estado, default: Estado.PENDIENTE })
  estado: Estado;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'date' })
  fechaSolicitud: string;
}