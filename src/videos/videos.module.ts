import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) { // req = request, file = arquivo, cb = callback
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Math.random().toString(36).substring(7) + path.extname(file.originalname)); // path.extname(file.originalname) retorna a extensão do arquivo exp: .mp4
  }
})

@Module({
  imports: [
    MulterModule.register({
      storage,
    })
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule { }
