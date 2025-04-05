import EventEmitter from 'node:events';
import { FileReader } from './file-reader.interface.js';
import { Training } from '../../types/training/training.interface.js';
import { UserWorkout } from '../../types/user/user-workout.enum.js';
import { createReadStream } from 'node:fs';
import { UserGender, UserLevel, UserTime } from '../../types/user/index.js';

export class TSVTrainingFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();

  }


  private parseLineToTraining(line: string): Training {
    const [
      name,background,level,workout,time,price,calories,description,gender,video,rating,trainer,special
    ] = line.split('\t');

    return {
      name,
      background,
      level : level as UserLevel,
      workout : this.parseWorkouts(workout),
      time : time as UserTime,
      price : Number.parseInt(price, 4),
      calories : Number.parseInt(calories, 4),
      description,
      gender : gender as UserGender,
      video,
      rating : Number.parseInt(rating, 2),
      trainer,
      special: special as unknown as boolean,
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

        const parsedTraining = this.parseLineToTraining(completeRow);
        this.emit('line', parsedTraining);
      }

    }
    return this.emit('end', importedRowCount);
  }
}
