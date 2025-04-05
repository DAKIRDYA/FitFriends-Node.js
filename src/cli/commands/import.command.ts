import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVOrderFileReader, TSVReviewFileReader, TSVTrainingFileReader, TSVUserFileReader } from '../../shared/libs/file-reader/index.js';

import { Command } from './command.interface.js';


export class ImportCommand implements Command {
  private onImportedObject<T>(object: T): void {
    console.info(object);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    // Чтение файла c пользователями
    const [type,filename] = parameters; //type : users,trainings,reviews,orders
    let fileReader;
    switch(type){
      case 'users':
        fileReader = new TSVUserFileReader(filename.trim());
        fileReader.on('line', this.onImportedObject.bind(this));
        fileReader.on('end', this.onCompleteImport);
        break;
      case 'trainings':
        fileReader = new TSVTrainingFileReader(filename.trim());
        fileReader.on('line', this.onImportedObject.bind(this));
        fileReader.on('end', this.onCompleteImport);
        break;
      case 'reviews':
        fileReader = new TSVReviewFileReader(filename.trim());
        fileReader.on('line', this.onImportedObject.bind(this));
        fileReader.on('end', this.onCompleteImport);
        break;
      case 'orders':
        fileReader = new TSVOrderFileReader(filename.trim());
        fileReader.on('line', this.onImportedObject.bind(this));
        fileReader.on('end', this.onCompleteImport);
        break;
      default:
        console.error('Can\'t import data from file: type parameter invalid');
        return;
    }


    try {
      fileReader.read();
    } catch(error){
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
