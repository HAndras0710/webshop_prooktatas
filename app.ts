import { Product } from './Product';
import { Inventory } from './Inventory';
import { User } from './User';
import { OrderStatus } from './OrderStatus';

// 1. Készlet (Inventory) inicializálása
const inventory = new Inventory();

// 2. Termékek hozzáadása
const p1 = new Product('p1', 'Gaming Egér', 15000, 'Ergonomikus RGB egér');
const p2 = new Product('p2', 'Mechanikus Billentyűzet', 35000, 'Red switch-es billentyűzet');
const p3 = new Product('p3', '27" Monitor', 85000);

inventory.addProduct(p1);
inventory.addProduct(p2);
inventory.addProduct(p3);

console.log('--- Jelenlegi Készlet ---');
inventory.getAllProducts().forEach(p => console.log(p.getInfo()));

// 3. Felhasználó létrehozása
const user = new User('u1', 'Kovács Péter', 'peter.kovacs@example.com');

// 4. Rendelés leadása (érvényes és érvénytelen termék ID-val tesztelve)
console.log('\n--- Rendelés Leadása ---');
const order1 = user.placeOrder('ord-101', ['p1', 'p3', 'p999'], inventory);

if (order1) {
  console.log('\n--- Rendelés Részletei ---');
  console.log(order1.getSummary());

  // Állapot frissítése
  order1.updateStatus(OrderStatus.IN_PROGRESS);
  console.log(`Új állapot: ${order1.getStatus()}`);

  order1.updateStatus(OrderStatus.DELIVERED);
  console.log(`Új állapot: ${order1.getStatus()}`);
}

// 5. Készlet módosítása és keresés tesztelése
console.log('\n--- Keresés és Törlés Teszt ---');
const found = inventory.findProduct('Billentyűzet');
console.log('Talált termék:', found ? found.getInfo() : 'Nincs találat');

inventory.removeProduct('p1');
console.log('Készlet a "p1" törlése után:', inventory.getAllProducts().length, 'termék maradt.');