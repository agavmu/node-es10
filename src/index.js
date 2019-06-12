import '@babel/polyfill';

import app from './server'

// website
async function main() {
    await app.listen(3000);
    console.log('server on port', app.get('port'));
}

main();