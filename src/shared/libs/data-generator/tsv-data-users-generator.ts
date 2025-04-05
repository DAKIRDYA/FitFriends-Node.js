import dayjs from 'dayjs';

import { DataGenerator } from './data-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockDataUsers } from '../../types/index.js';
import { FIRST_WEEK_DAY, LAST_WEEK_DAY, MAX_WORKOUTS_FOR_USER, NO_NAME_AVATAR, NO_NAME_EMAIL } from '../../../common.const.js';
import { UserGender } from '../../types/user/user-gender.enum.js';


export class TSVDataUsersGenerator implements DataGenerator {
  constructor(private readonly mockData: MockDataUsers) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const email = this.mockData.emails[this.mockData.names.indexOf(name)] ?? NO_NAME_EMAIL;
    const avatar = this.mockData.avatars[this.mockData.names.indexOf(name)] ?? NO_NAME_AVATAR;
    const gender = this.mockData.genders[this.mockData.names.indexOf(name)] ?? UserGender.UNIMPORTANT;
    const birthday = getRandomItem<Date>(this.mockData.birthdays);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const location = getRandomItem<string>(this.mockData.locations);
    const background = getRandomItem<string>(this.mockData.backgrounds);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const level = getRandomItem<string>(this.mockData.levels);
    const workout = getRandomItems<string>(this.mockData.workouts,MAX_WORKOUTS_FOR_USER).join(';');
    const time = getRandomItem<string>(this.mockData.times);
    const calories = getRandomItem<number>(this.mockData.calories);
    const caloriesPerDay = getRandomItem<number>(this.mockData.caloriesPerDay);
    const isReady = getRandomItem<boolean>(this.mockData.isReadys);
    const role = getRandomItem<string>(this.mockData.roles);


    return [
      name,email,avatar,gender,birthday.toString(),description,location,background,createdDate,level,workout,time,calories,caloriesPerDay,isReady,role
    ].join('\t');
  }
}
