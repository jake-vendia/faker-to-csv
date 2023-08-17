import { faker } from "@faker-js/faker";
import parquet from "parquetjs-lite";
const numberOfRows = 10000;

const run = async () => {
  const schema = new parquet.ParquetSchema({
    patientId: { type: "INT64" },
    doctorId: { type: "INT64" },
    doctorLocation: { type: "UTF8" },
    visitDate: { type: "UTF8" },
    copay: { type: "DOUBLE" },
    insurandCovered: { type: "BOOLEAN" },
    trialsRecommended: { type: "UTF8" },
  });

  const randomSample = (sampleRate: number) => {
    return Math.random() < sampleRate;
  };

  const writer = await parquet.ParquetWriter.openFile(
    schema,
    "patient-visits-small.parquet"
  );
  for (let i = 0; i < numberOfRows; i++) {
    await writer.appendRow({
      patientId: faker.random.numeric(10),
      doctorId: faker.random.numeric(10),
      doctorLocation: faker.address.city(),
      visitDate: faker.date.past().toISOString().split("T")[0],
      copay: faker.commerce.price(100, 100, 2),
      insurandCovered: randomSample(50),
      trialsRecommended: JSON.stringify(
        faker.helpers.uniqueArray(faker.random.numeric, 5)
      ),
    });
  }
};

run();
