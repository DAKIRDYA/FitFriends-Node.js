import got from 'got';
import { Command } from './command.interface.js';
import { MockDataOrders, MockDataReviews, MockDataTrainings, MockDataUsers } from '../../shared/types/index.js';
import { TSVDataUsersGenerator } from '../../shared/libs/data-generator/tsv-data-users-generator.js';
import { DataGenerator, TSVDataOrdersGenerator, TSVDataReviewsGenerator, TSVDataTrainingsGenerator } from '../../shared/libs/data-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';


export class GenerateCommand implements Command {
  private initialDataUsers: MockDataUsers;
  private initialDataTrainings: MockDataTrainings;
  private initialDataReviews: MockDataReviews;
  private initialDataOrders: MockDataOrders;

  private async load<T>(url: string, initialData:T): Promise<T> {
    try {
      initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
    return initialData;
  }


  public getName(): string {
    return '--generate';
  }

  private async write<T extends DataGenerator>(filepath: string, count: number,tsvGenerator:T) {
    const tsvFileWriter = new TSVFileWriter(filepath);
    for (let i = 0; i < count; i++) {
      await tsvFileWriter.write(tsvGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [countParameter = '0', type, filePath, url] = parameters;
    const count = Number.parseInt(countParameter, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
    try {
      switch (type) {
        case 'users':{
          this.initialDataUsers = await this.load(`${url}/${type}`, this.initialDataUsers);
          const tsvUsersGenerator = new TSVDataUsersGenerator(this.initialDataUsers);
          await this.write(filePath, count,tsvUsersGenerator);
          break;
        }
        case 'trainings':{
          this.initialDataTrainings = await this.load(`${url}/${type}`, this.initialDataTrainings);
          const tsvTrainingsGenerator = new TSVDataTrainingsGenerator(this.initialDataTrainings);
          await this.write(filePath, count,tsvTrainingsGenerator);
          break;
        }
        case 'reviews':{
          this.initialDataReviews = await this.load(`${url}/${type}`, this.initialDataReviews);
          const tsvReviewsGenerator = new TSVDataReviewsGenerator(this.initialDataReviews);
          await this.write(filePath, count,tsvReviewsGenerator);
          break;
        }
        case 'orders':{
          this.initialDataOrders = await this.load(`${url}/${type}`, this.initialDataOrders);
          const tsvOrdersGenerator = new TSVDataOrdersGenerator(this.initialDataOrders);
          await this.write(filePath, count,tsvOrdersGenerator);
          break;
        }
        default:break;
      }
      console.info(`File ${filePath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }

  }
}
