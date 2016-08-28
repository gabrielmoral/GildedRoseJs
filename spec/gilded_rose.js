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

   it('quality_of_an_item_is_never_negative', function () {
     
     var quality, sell_in = 0;
     var positive_numbers_edge = 0;
     var item = new Item("Some", sell_in, quality);

     Process([item]);

     expect(item.quality).to.not.be.below(positive_numbers_edge);
  });

  it('quality_decrease_twice_when_sell_by_date_has_passed', function () {

      var quality = 20;
      var sell_in = 0;
      var decreased_quality_twice_faster = 18;
      var item = new Item("Some", sell_in, quality);

      Process([item]);

      expect(item.quality).to.be.equals(decreased_quality_twice_faster);
  });

   it('aged_brie_increases_in_quality_the_older_it_gets', function () {

      var quality = 20;
      var sell_in = 30;
      var increased_quality = 21;
      var aged_brie = new Item("Aged Brie", sell_in, quality);

      Process([aged_brie]);

      expect(aged_brie.quality).to.be.equals(increased_quality);
  });

});
