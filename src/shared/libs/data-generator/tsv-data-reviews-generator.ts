import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem} from '../../helpers/index.js';
import { MockDataReviews } from '../../types/index.js';
import { DataGenerator } from './data-generator.interface.js';
import { FIRST_WEEK_DAY, LAST_WEEK_DAY } from '../../../common.const.js';

export class TSVDataReviewsGenerator implements DataGenerator {
  constructor(private readonly mockData: MockDataReviews) {}

  public generate(): string {
    const grade = getRandomItem<number>(this.mockData.grades);
    const message = getRandomItem<string>(this.mockData.messages);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();


    return [ grade.toString(), message, createdDate ].join('\t');
  }
}
