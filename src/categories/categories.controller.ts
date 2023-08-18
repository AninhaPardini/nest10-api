import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) { // DTO: Data Transfer Object - Objeto de transferencia de dados ou seja, o @Body() está recebendo o objeto do corpo da requisição e mudando para um javascript
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id') // /categories/1
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @HttpCode(204) //NoContent
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
