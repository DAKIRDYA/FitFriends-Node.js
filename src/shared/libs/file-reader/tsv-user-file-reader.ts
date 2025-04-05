import { createReadStream} from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { User, UserGender, UserLevel, UserLocation, UserRole, UserTime } from '../../types/user/index.js';
import { UserWorkout } from '../../types/user/user-workout.enum.js';
import EventEmitter from 'node:events';

export class TSVUserFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();

  }


  private parseLineToUser(line: string): User {
    const [
      name,
      email,
      avatar,
      gender,
      birthday,
      description,
      location,
      background,
      createdAt,
      level,
      workouts,
      time,
      calories,
      caloriesPerDay,
      isReady,
      role
    ] = line.split('\t');

    return {
      name,
      email,
      avatar,
      gender : gender as UserGender,
      birthday :new Date(birthday),
      description,
      location: location as UserLocation,
      background,
      createdAt : new Date(createdAt),
      level : level as UserLevel,
      workout : this.parseWorkouts(workouts),
      time : time as UserTime,
      calories : Number.parseInt(calories, 4),
      caloriesPerDay : Number.parseInt(caloriesPerDay, 4),
      isReady: isReady as unknown as boolean,
      role: role as UserRole,

    };
  }

  private parseWorkouts(workoutsString: string): UserWorkout[] {
    return workoutsString.split(';').map((name) => name as UserWorkout);
  }


  public async read(): Promise<boolean> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedUser = this.parseLineToUser(completeRow);
        this.emit('line', parsedUser);
      }

    }
    return this.emit('end', importedRowCount);
  }
}
