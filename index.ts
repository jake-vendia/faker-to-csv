import { faker } from "@faker-js/faker";
import Papa from "papaparse";
const numberOfRows = 100;

const rows: any[] = [];

const randomSample = (sampleRate: number) => {
  return Math.random() < sampleRate;
};

const randomlyNullify = (value: any) => {
  return randomSample(0.95) ? value : undefined;
};

const randomlyNullifyOrNa = (value: any) => {
  return randomSample(0.9) ? value : randomSample(0.5) ? undefined : "N/A";
};

for (let i = 0; i < numberOfRows; i++) {
  const productName = faker.commerce.productName();
  rows.push({
    _id: undefined,
    title: randomlyNullify(productName),
    description: randomlyNullify(faker.commerce.productDescription()),
    sku: randomlyNullify(
      `${faker.random.alpha({
        casing: "upper",
        count: 3,
      })}-${faker.random.numeric(3)}`
    ),
    price: randomlyNullifyOrNa(faker.commerce.price()),
    size: randomlyNullify(faker.random.alpha({ casing: "upper", count: 1 })),
    imageLink: randomlyNullify(faker.internet.url()),
    slug: randomlyNullify(productName.toLowerCase().split(" ").join("-")),
    category: randomlyNullify(faker.commerce.department()),
  });
}
console.log(Papa.unparse(rows));
