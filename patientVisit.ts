import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import Papa from "papaparse";
import fs from "fs";

const numberOfRows = 1000000;

const run = async () => {
  const randomSample = (sampleRate: number) => {
    return Math.random() < sampleRate;
  };

  const rows: any[] = [];
  for (let i = 0; i < numberOfRows; i++) {
    const row = {
      visitId: randomUUID(),
      patientId: faker.random.numeric(10),
      doctorId: faker.random.numeric(10),
      doctorLocation: faker.address.city(),
      visitDate: faker.date.past().toISOString().split("T")[0],
      copay: faker.commerce.price(100, 100, 2, "$"),
      insurandCovered: randomSample(50).toString().toLowerCase(),
      trialsRecommended: JSON.stringify(
        faker.helpers.uniqueArray(() => faker.random.numeric(10), 5)
      ),
    };
    rows.push(row);
  }
  fs.writeFileSync("patient-visits-large.csv", Papa.unparse(rows));
};

run();
