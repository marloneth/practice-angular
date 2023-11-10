const { faker } = require('@faker-js/faker')

const database = { products: [] }

for (let i = 1; i <= 300; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.product(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
    quantity: faker.number.int(1000),
  })
}

console.log(JSON.stringify(database))
