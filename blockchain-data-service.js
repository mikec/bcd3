/* 

    run this node service to generate some data.

    it's dummy data right now, but could be implemented to pull
    from biteasy API
    
    after running, browse to a block:

        http://localhost:9494/blocks/1DKWD5VVDH

        or with address data included:

        http://localhost:9494/blocks/1DKWD5VVDH?include=addresses

    or browse to an address:
    
        http://localhost:9494/addresses/SHdiDf7Gja

        or with address data included:

        http://localhost:9494/addresses/SHdiDf7Gja?include=blocks

*/

var request = require('superagent');

var env = process.env;
console.log('uri', env.SERVICE_URI);

// create some dummy data...

// block ids
b1Id = '1DKWD5VVDH';
b2Id = 'nMzZuxAHJC';
// address ids
a1Id = 'SHdiDf7Gja';
a2Id = 'DMYTYGszym';
a3Id = '6VPiK35ToP';
a4Id = 'UAIA6Gy6wT';
a5Id = 'uwFTJ3NpaB';
a6Id = 'ayrEdi0CGY';
a7Id = 'N4RXx29TPV';

createBlock({ id: b1Id });
createBlock({ id: b2Id });

createAddress({ id: a1Id });
createAddress({ id: a2Id });
createAddress({ id: a3Id });
createAddress({ id: a4Id });
createAddress({ id: a5Id });
createAddress({ id: a6Id });
createAddress({ id: a7Id });

addAddressToBlock(b1Id, a1Id);
addAddressToBlock(b1Id, a2Id);
addAddressToBlock(b1Id, a3Id);
addAddressToBlock(b2Id, a4Id);
addAddressToBlock(b2Id, a5Id);
addAddressToBlock(b2Id, a6Id);
addAddressToBlock(b2Id, a7Id);

function createBlock(data) {
    post('/blocks', data);
}

function createAddress(data) {
    post('/addresses', data);
}

function addAddressToBlock(blockId, addressId) {
    post(
        '/blocks/' + blockId + '/addresses', 
        { id: addressId }
    );
}

function post(path, data) {
    request
        .post(env.SERVICE_URI + path)
        .set('Content-Type', 'application/json')
        .send(data)
        .end(function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });
}

process.on('uncaughtException', function (err) {
    console.log(err);
});     