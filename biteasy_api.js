/*
 * Biteasy API
 *   grab block data
 *   grab transaction data
 *
 * URL
 *   tests
 *     https://api.biteasy.com/testnet/v1
 *   blockchain
 *     https://api.biteasy.com/blockchain/v1
 */

var fs = require('fs');
var request = require('superagent');
var async = require('async');

var testnet = 'https://api.biteasy.com/testnet/v1';
var blocks;
var per_page = 20;

var writeBlocks = function(blocks) {
  console.log('number of blocks:', blocks.length);
  async.each(
    blocks,
    function writeBlockToFile(block, next) {
      var blockHeight = block.height;
      var tx = JSON.stringify(block);
      fs.writeFile('./dat/block_' + blockHeight, tx, {flags: 'w', encoding: 'utf8'}, function(err) {
        if (err) throw err;

        // console.log('block_' + blockHeight + ' written');
        next();
      });
    },
    function finalFunctionToCall(err) {
      if (err) throw err;

      console.log('done writing blocks');
    });
};

var grabBlocks = function(page, per_page) {
  request
  .get(testnet + '/blocks?page='+page+'&per_page='+per_page)
  .set('Content-Type', 'application/json')
  .end(function(err, res) {
    if (err) {
      throw err;
    }

    blocks = res.body.data.blocks;
    // console.log('blocks\n', blocks);
    writeBlocks(blocks);
  });
};

// TODO
var grabTransactions = function() {
  /*
   * [1] read in the blockfile
   * [2] extract the block_hash
   * [3] grabTransactions in that block_hash
   * [4] save transactions into their files
   */
};

var page = 1;
var total_pages = 10; //set the total number of pages to pull
while (page <= total_pages) {

  setTimeout(function() {
    grabBlocks(page, per_page);
  }, 5000);

  page++;
}
