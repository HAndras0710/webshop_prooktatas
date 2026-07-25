import { Product } from './Product';
import { OrderStatus } from './OrderStatus';
import { IIdentifiable } from './IIdentifiable';

export class Order implements IIdentifiable {
  private id: string;
  private products: Product[];
  private status: OrderStatus;

  constructor(id: string, products: Product[]) {
    this.id = id;
    this.products = products;
    this.status = OrderStatus.NEW;
  }

  public getId(): string {
    return this.id;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }

  public getTotal(): number {
    return this.products.reduce((sum, product) => sum + product.getPrice(), 0);
  }

  public getSummary(): string {
    const productNames = this.products.map(p => p.getName()).join(', ');
    return `Rendelés [${this.id}] | Állapot: ${this.status} | Tételek: ${productNames} | Végösszeg: ${this.getTotal()} Ft`;
  }
}