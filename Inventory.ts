import { Product } from './Product';

export class Inventory {
  private products: Product[] = [];

  public addProduct(product: Product): void {
    this.products.push(product);
  }

  public removeProduct(id: string): boolean {
    const initialLength = this.products.length;
    this.products = this.products.filter(product => product.getId() !== id);
    return this.products.length < initialLength;
  }

  public findProduct(query: string): Product | undefined {
    const lowerQuery = query.toLowerCase();
    return this.products.find(
      product => product.getId() === query || product.getName().toLowerCase().includes(lowerQuery)
    );
  }

  public getAllProducts(): Product[] {
    return [...this.products]; 
  }

  public hasProduct(id: string): boolean {
    return this.products.some(product => product.getId() === id);
  }
}