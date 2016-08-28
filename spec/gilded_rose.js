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

    var decreased_quality = 3;
    var decreased_sell_in = 3;
    var item = new ItemBuilder().with_quality(4)
                                .with_sell_in(4)
                                .build();
    
    Process([item]);
    
    expect(item.sell_in).to.be.equals(decreased_sell_in);
    expect(item.quality).to.be.equals(decreased_quality);
  });

   it('quality_of_an_item_is_never_negative', function () {
     
     var positive_numbers_edge = 0;
     var item = new ItemBuilder().with_quality(0)
                                 .build();

     Process([item]);

     expect(item.quality).to.not.be.below(positive_numbers_edge);
  });

  it('quality_decrease_twice_when_sell_by_date_has_passed', function () {
     
      var decreased_quality_twice_faster = 18;
      var item = new ItemBuilder().with_quality(20)
                                  .with_sell_in(0)
                                  .build();

      Process([item]);

      expect(item.quality).to.be.equals(decreased_quality_twice_faster);
  });

   it('aged_brie_increases_in_quality_the_older_it_gets', function () {

      var increased_quality = 21;
      var aged_brie = new ItemBuilder().aged_brie()
                                       .with_quality(20)
                                       .with_sell_in(30)
                                       .build();

      Process([aged_brie]);

      expect(aged_brie.quality).to.be.equals(increased_quality);
  });
});

function ItemBuilder(){
  var item = new Item("Some item", 20, 20);

  this.aged_brie = function(){
    item.name = "Aged Brie";
    return this;
  }

  this.with_quality = function(quality){
    item.quality = quality;
    return this;
  }

  this.with_sell_in = function(sell_in){
    item.sell_in = sell_in;
    return this;
  }

  this.build = function(){
    return item;
  }
}
