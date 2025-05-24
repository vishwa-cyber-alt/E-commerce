import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-products'), 
    ProductsModule,
  ],
})
export class AppModule {}
