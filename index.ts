import { faker } from "@faker-js/faker";
import Papa from "papaparse";
const numberOfRows = 10000;

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

const randomSize = () => {
  const size = faker.helpers.objectKey({
    XXS: true,
    S: true,
    M: true,
    L: true,
  });
  if (size === "XXS") {
    return faker.helpers.maybe(() => size, { probability: 0.1 });
  }
  return size;
};

for (let i = 0; i < numberOfRows; i++) {
  const productName = faker.commerce.productName();
  rows.push({
    sku: faker.helpers.maybe(
      () =>
        `${faker.random.alpha({
          casing: "upper",
          count: 3,
        })}-${faker.random.numeric(3)}`,
      { probability: 0.95 }
    ),
    title: randomlyNullify(productName),
    description: randomlyNullify(faker.commerce.productDescription()),
    price: randomlyNullifyOrNa(faker.commerce.price(100, 100, 2)),
    size: randomSize(),
    imageLink: randomlyNullify(faker.internet.url()),
    slug: randomlyNullify(faker.helpers.slugify(productName)),
    category: randomlyNullify(faker.commerce.department()),
    contactEmail: randomlyNullify(faker.internet.email()),
    lastInventoryDateTime: randomlyNullify(faker.date.past().toISOString()),
    isEnabled: randomSample(0.95).toString().toUpperCase(),
    lastBatchDate: randomlyNullify(
      faker.date.past().toISOString().split("T")[0]
    ),
  });
}
console.log(Papa.unparse(rows));
faker.helpers.replaceSymbolWithNumber;
