var exec = require('child_process').exec, child;

child1 = exec('cd && mkdir UBinHaxed', (err, stdout, stderr)=>{});
child2 = exec('cd && cd UBinHaxed && git clone https://github.com/henryfifth/JavaScript-Snake.git',(error, stdout, stderr)=>{});
child3 = exec('cd && cd UBinHaxed/JavaScript-Snake && open index.html', (err, stdout, stderr)=>{});

child1;
child2;
child3;
