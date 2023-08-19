import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipe, UseInterceptors, Res } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto, CreateVideoWithUploadDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoFileValidator } from './video-file-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { VideoSerializer } from './videos.serializer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) { }

  @ApiConsumes('multipart/form-data') // informa que o endpoint consome multipart/form-data para o swagger
  @ApiBody({
    type: CreateVideoWithUploadDto,
  }) // informa que o endpoint recebe um body do tipo CreateVideoWithUploadDto para o swagger
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new VideoFileValidator({
            maxSize: 1024 * 1024 * 100, // 100MB
            mimeType: 'video/mp4'
          })
        ],
        errorHttpStatusCode: 422, // se for invalido retorna 422
      }),
    )
    file: Express.Multer.File, // Express.Multer.File é o tipo do arquivo que o multer retorna 
  ) {
    return this.videosService.create({
      ...createVideoDto,
      file, // file: file
    });
  }

  @Get()
  async findAll() {
    const videos = await this.videosService.findAll();
    return videos.map((video) => new VideoSerializer(video));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  @Get('file/:file')
  file(@Param('file') file: string, @Res() res: Response) {
    const fileStream = createReadStream(join(process.cwd(), 'uploads', file));
    fileStream.pipe(res);
  } // Um stream que lê o arquivo e retorna para o cliente
}
