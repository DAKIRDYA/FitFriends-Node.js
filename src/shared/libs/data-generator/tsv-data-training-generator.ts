
import { MAX_WORKOUTS_FOR_USER } from '../../../common.const.js';
import { getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockDataTrainings } from '../../types/index.js';
import { UserGender } from '../../types/user/user-gender.enum.js';
import { DataGenerator } from './data-generator.interface.js';

export class TSVDataTrainingsGenerator implements DataGenerator {
  constructor(private readonly mockData: MockDataTrainings) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const background = getRandomItem<string>(this.mockData.backgrounds);
    const level = getRandomItem<string>(this.mockData.levels);
    const workout = getRandomItems<string>(this.mockData.workouts,MAX_WORKOUTS_FOR_USER).join(';');
    const time = getRandomItem<string>(this.mockData.times);
    const price = getRandomItem<number>(this.mockData.prices);
    const calories = getRandomItem<number>(this.mockData.calories);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const gender = this.mockData.genders[this.mockData.names.indexOf(name)] ?? UserGender.UNIMPORTANT;
    const video = getRandomItem<string>(this.mockData.videos);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const trainer = getRandomItem<string>(this.mockData.trainers);
    const special = getRandomItem<boolean>(this.mockData.specials);

    return [
      name,background,level,workout,time,price,calories,description,gender,video,rating,trainer,special
    ].join('\t');
  }
}
