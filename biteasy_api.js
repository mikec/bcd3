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
var per_page = 39;

var writeBlocks = function(page, blocks) {
  console.log(blocks.length + ' blocks on page ' + page);
  var block_to = blocks[0].height;
  var block_from = blocks[blocks.length - 1].height;
  var tx = JSON.stringify(blocks);

  fs.writeFile('./dat/blocks_' + block_to + '_' + block_from,
    tx,
    function(err) {
      if (err) throw err;

      console.log('done writing blocks');
    });
};

var grabBlocks = function(page, per_page) {
  // console.log('requesting page', page);
  request
  .get(testnet + '/blocks?page='+page+'&per_page='+per_page)
  .set('Content-Type', 'application/json')
  .end(function(err, res) {
    if (err) {
      throw err;
    }

    blocks = res.body.data.blocks;
    writeBlocks(page, blocks);
  });
};

// TODO
var grabTransactions = function() {
  /*
   * [1] read in the blockfile
   * [2] extract the block_hash
   * [3] grabTransactions in that block_hash
   * [4] save transactions into their files
   *
   * TOTAL ESTIMATED BLOCKS
   * 39*10 = 390 blocks
   */
};

var page = 1;
var total_pages = 10; //set the total number of pages to pull
var delay;
while (page <= total_pages) {
  delay = page * 1000;

  (function(page, abc) {
    setTimeout(function(hello) {
      grabBlocks(page, per_page);
    }, abc);
  })(page, delay);

  page++;
}
