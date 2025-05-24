import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductGateway } from './product.gateway';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly productGateway: ProductGateway,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async search(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') {
      return [];
    }
    return this.productModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).exec();
  }

  async create(productDto: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(productDto);
    const saved = await createdProduct.save();
    this.productGateway.broadcastProductAdded(saved);
    return saved;
  }

  async update(id: string, updateDto: Partial<Product>): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    }).exec();

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.productGateway.broadcastProductUpdated(product);
    return product;
  }
}
