import { Controller, Get, Post, Put, Param, Query, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../schemas/product.schema';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Get('search/by-name')
  async search(@Query('q') q: string): Promise<Product[]> {
    return this.productsService.search(q);
  }

  @Post()
  async create(@Body() productDto: Partial<Product>): Promise<Product> {
    return this.productsService.create(productDto);
  }

  @Put(':id')  
  async update(
    @Param('id') id: string,
    @Body() productDto: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(id, productDto);
  }
}
