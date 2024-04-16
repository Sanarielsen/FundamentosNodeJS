import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buff = Buffer.from(`${i}\n`);
        this.push(buff);
      }
    }, 1000)
  }
}

class MultiplyByTenStream extends Writable {

  _write(chunk, enconding, callback) {
    console.log(chunk.toString() * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1);
    callback(null, Buffer.from(String(transformed)));
  }
}

//Apenas Streams de leitura
//new OneToHundredStream().pipe(process.stdout);

//Apenas Streams de escrita
//new OneToHundredStream().pipe(new MultiplyByTenStream());

//Todas as três Streams
new OneToHundredStream() //Stream de leitura
  .pipe(new InverseNumberStream()) //Stream de transformação
  .pipe(new MultiplyByTenStream()); //Stream de escrita