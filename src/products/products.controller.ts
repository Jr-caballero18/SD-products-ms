import { Controller} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'createProduct' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

 @MessagePattern({ cmd: 'findallProduct' })
  findAll(@Payload() PaginationDto: PaginationDto) {
    return this.productsService.findAll(PaginationDto);
  }

  @MessagePattern({ cmd: 'findOneProduct' })
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'updateProduct' })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: 'deleteProduct' })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}
