var path = require('path');
var chai = require("chai");
var expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

var GildedRose = require('../gilded_rose.js'),
  Item = GildedRose.Item,
  Process = GildedRose.Process;

describe('gilded_rose_should', function () {
  'use strict';

  it('exists', function () {
    expect(Item).to.be.a('function');

  });

  it('decrease_sell_in_at_the_end_of_a_day', function () {
    var decreased_sell_in = 3;
    var items = new ItemsBuilder()
      .add_normal_item()
      .add_aged_brie()
      .add_backstage_passes()
      .with_quality(4)
      .with_sell_in(4)
      .get_items();

    Process(items);

    items.should.all.have.property('sell_in', decreased_sell_in);
  });

  it('decrease_quality_at_the_end_of_a_day', function () {

    var decreased_quality = 3;

    var items = new ItemsBuilder()
      .add_normal_item()
      .with_quality(4)
      .with_sell_in(4)
      .get_items();

    Process(items);

    items.should.all.have.property('quality', decreased_quality);
  });

  it('quality_of_an_item_is_never_negative', function () {

    var positive_numbers_edge = 0;
    var items = new ItemsBuilder()
      .add_normal_item()
      .with_quality(0)
      .get_items();

    Process(items);

    items.should.all.have.property('quality', positive_numbers_edge);
  });

  it('quality_decrease_twice_when_sell_by_date_has_passed', function () {

    var decreased_quality_twice_faster = 18;
    var items = new ItemsBuilder()
      .add_normal_item()
      .with_quality(20)
      .with_sell_in(0)
      .get_items();

    Process(items);

    items.should.all.have.property('quality', decreased_quality_twice_faster);
  });

  it('aged_brie_increases_in_quality_the_older_it_gets', function () {

    var increased_quality = 21;
    var aged_brie = new ItemsBuilder()
      .add_aged_brie()
      .with_quality(20)
      .with_sell_in(30)
      .get_items()[0];

    Process([aged_brie]);

    expect(aged_brie.quality).to.be.equals(increased_quality);
  });

  it('the_quality_of_an_item_is_never_more_than_50', function () {

    var quality = 50;
    var items = new ItemsBuilder()
      .add_aged_brie()
      .add_backstage_passes()
      .with_quality(50)
      .with_sell_in(30)
      .get_items();

    Process(items);

     items.should.all.have.property('quality', quality);
  });

  it('legendary_items_are_not_sold_or_decreased_quality', function () {

    var quality = 50;
    var sell_in = 30;

    var sulfuras = new ItemsBuilder()
      .add_sulfuras()
      .with_quality(50)
      .with_sell_in(30)
      .get_items()[0];

    Process([sulfuras]);

    expect(sulfuras.quality).to.be.equals(quality);
    expect(sulfuras.sell_in).to.be.equals(sell_in);
  });

  it('backstage_passes_increase_quality_by_2_when_there_are_10_or_less_sell_in_days', function () {

    var increased_quality = 22;
    var backstage_pass = new ItemsBuilder()
      .add_backstage_passes()
      .with_quality(20)
      .with_sell_in(10)
      .get_items()[0];

    Process([backstage_pass]);

    expect(backstage_pass.quality).to.be.equals(increased_quality);
  });

  it('backstage_passes_increase_quality_by_3_when_there_are_5_or_less_sell_in_days', function () {

    var increased_quality = 23;
    var backstage_pass = new ItemsBuilder()
      .add_backstage_passes()
      .with_quality(20)
      .with_sell_in(5)
      .get_items()[0];

    Process([backstage_pass]);

    expect(backstage_pass.quality).to.be.equals(increased_quality);
  });

  it('backstage_passes_drops_quality_to_0_after_the_concert', function () {

    var quality = 0;
    var backstage_pass = new ItemsBuilder()
      .add_backstage_passes()
      .with_quality(20)
      .with_sell_in(0)
      .get_items()[0];

    Process([backstage_pass]);

    expect(backstage_pass.quality).to.be.equals(quality);
  });
});

function ItemsBuilder() {

  var items = [];

  this.add_normal_item = function () {
    items.push(new Item("Some item", 20, 20));
    return this;
  }

  this.add_aged_brie = function () {
    items.push(new Item("Aged Brie", 20, 20));
    return this;
  }

  this.add_backstage_passes = function () {
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20));
    return this;
  }

  this.add_sulfuras = function () {
    items.push(new Item("Sulfuras, Hand of Ragnaros", 20, 20));
    return this;
  }

  this.with_quality = function (quality) {
    items.forEach(item => item.quality = quality);
    return this;
  }

  this.with_sell_in = function (sell_in) {
    items.forEach(item => item.sell_in = sell_in);
    return this;
  }

  this.get_items = function () {
    return items;
  }
}
