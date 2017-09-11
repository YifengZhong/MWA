
const fs = require('fs');
process.on('message',(arg) => {
      console.log(process.argv[2]);
      const src = fs.readFileSync('./' + process.argv[2]).toString();
      process.send(src);
});