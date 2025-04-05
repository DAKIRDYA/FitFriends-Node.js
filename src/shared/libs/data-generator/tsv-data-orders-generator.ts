import dayjs from 'dayjs';
import { FIRST_WEEK_DAY, LAST_WEEK_DAY } from '../../../common.const.js';
import { generateRandomValue, getRandomItem} from '../../helpers/common.js';
import { MockDataOrders } from '../../types/index.js';

import { DataGenerator } from './data-generator.interface.js';

export class TSVDataOrdersGenerator implements DataGenerator {
  constructor(private readonly mockData: MockDataOrders) {}

  public generate(): string {
    const type = getRandomItem<string>(this.mockData.types);
    const price = getRandomItem<number>(this.mockData.prices);
    const count = getRandomItem<number>(this.mockData.counts);
    const sum = price * count;
    const payWay = getRandomItem<string>(this.mockData.payways);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      type,price,count,sum,payWay,createdDate
    ].join('\t');
  }
}
