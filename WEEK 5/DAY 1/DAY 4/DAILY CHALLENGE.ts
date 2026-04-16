type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

// Define a Union Type for the array
type DataItem = User | Product | Order;

function handleData(data: DataItem[]): string[] {
  return data.map((item) => {
    switch (item.type) {
      case 'user':
        // TypeScript knows 'item' is a User here
        return `Hello, ${item.name}! You are ${item.age} years old.`;

      case 'product':
        // TypeScript knows 'item' is a Product here
        return `Product ID: ${item.id} is priced at $${item.price}.`;

      case 'order':
        // TypeScript knows 'item' is an Order here
        return `Order ${item.orderId} total: $${item.amount}.`;

      default:
        // 3. Graceful handling of unexpected cases
        return "Unknown data type encountered.";
    }
  });
}