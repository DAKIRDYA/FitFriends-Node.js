import EventEmitter from 'node:events';
import { FileReader } from './file-reader.interface.js';
import { Order } from '../../types/order/order.interface.js';
import { PayWay } from '../../types/order/payway.enum.js';
import { createReadStream } from 'node:fs';

export class TSVOrderFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();

  }


  private parseLineToOrder(line: string): Order {
    const [
      type,price,count,sum,payWay,createdDate
    ] = line.split('\t');

    return {
      type,
      price:Number.parseInt(price,10),
      count:Number.parseInt(count,4),
      sum:Number.parseInt(sum,10),
      payWay: payWay as PayWay,
      createdAt : new Date(createdDate),
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

        const parsedReview = this.parseLineToOrder(completeRow);
        this.emit('line', parsedReview);
      }

    }
    return this.emit('end', importedRowCount);
  }
}
