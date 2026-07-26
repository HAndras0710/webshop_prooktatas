import { Product } from './Product';
import { Order } from './Order';
import { Inventory } from './Inventory';
import { IIdentifiable } from './IIdentifiable';

export class User implements IIdentifiable {
  private id: string;
  private name: string;
  private email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public placeOrder(orderId: string, productIds: string[], inventory: Inventory): Order | null {
    const availableProducts: Product[] = [];

    for (const productId of productIds) {
      if (inventory.hasProduct(productId)) {
        const product = inventory.findProduct(productId);
        if (product) {
          availableProducts.push(product);
        }
      } else {
        console.warn(`Hiba: A(z) ${productId} ID-jú termék nem található a raktárban!`);
      }
    }

    if (availableProducts.length === 0) {
      console.error(`Sikertelen rendelés (${this.name}): Egyik megadott termék sem érhető el.`);
      return null;
    }

    const newOrder = new Order(orderId, availableProducts);
    console.log(`Rendelés sikeresen leadva a következő felhasználónak: ${this.name}!`);
    return newOrder;
  }
}