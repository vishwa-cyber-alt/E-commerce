import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { Product } from '../schemas/product.schema';
  
  @WebSocketGateway({
    cors: {
      origin: '*', 
    },
  })
  export class ProductGateway {
    @WebSocketServer()
    server: Server;
  
    broadcastProductAdded(product: Product) {
      this.server.emit('product-added', product);
    }
  
    broadcastProductUpdated(product: Product) {
      this.server.emit('product-updated', product);
    }
  }
  