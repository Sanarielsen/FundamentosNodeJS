//Armazena as informações "ok" e "hello world!" em buffers 
//e exibe o resultado em próprio formato Buffer e JSON.

const buff = Buffer.from("ok");
console.log(buff);

const buffSecond = Buffer.from("hello world!");
console.log(buffSecond.toJSON());