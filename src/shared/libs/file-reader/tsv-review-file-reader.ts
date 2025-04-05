import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Review } from '../../types/review/review.interface.js';

export class TSVReviewFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();

  }


  private parseLineToReview(line: string): Review {
    const [
      grade, message, createdAt
    ] = line.split('\t');

    return {
      grade : Number.parseInt(grade, 2),
      message,
      createdAt : new Date(createdAt),
    };
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

        const parsedReview = this.parseLineToReview(completeRow);
        this.emit('line', parsedReview);
      }

    }
    return this.emit('end', importedRowCount);
  }
}
