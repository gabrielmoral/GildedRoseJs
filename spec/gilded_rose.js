var path = require('path');
var expect = require('chai').expect;

var GildedRose = require('../gilded_rose.js'),
  Item = GildedRose.Item,
  Process = GildedRose.Process;
  
describe('gilded_rose_should', function () {
  'use strict';

  it('exists', function () {
    expect(Item).to.be.a('function');

  });

  it('decrease_sell_in_and_quality_at_the_end_of_a_day', function () {

    var quality, sell_in = 4;
    var decreased_quality, decreased_sell_in = 3;
    var item = new Item("Some", sell_in, quality);
    
    Process([item]);
    
    expect(item.sell_in).to.be.equals(decreased_sell_in);
    expect(item.quality).to.be.equals(decreased_quality);
  });

});
