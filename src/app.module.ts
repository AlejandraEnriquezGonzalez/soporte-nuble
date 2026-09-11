import { Module } from '@nestjs/common';
import { SolicitudesModule } from './solicitudes/solicitudes.module';


@Module({
  imports: [SolicitudesModule  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
