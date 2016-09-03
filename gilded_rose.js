/*! gilded_rose v0.0.0 - MIT license */
'use strict';

module.exports = {
  Item: Item,
  Process: update_quality
};


function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var itemPrototype = {
  increase_quality: function () {
    if (this.has_max_quality()) return;
    this.item.quality = this.item.quality + 1;
  },

  decrease_sell_in: function () {
    this.item.sell_in = this.item.sell_in - 1;
  },

  has_max_quality: function () {
    var max_item_quality = 50;
    return this.item.quality === max_item_quality;
  },

  sell_in_lower_than : function(days) {
    return this.item.sell_in < days;
  }
}

function AgedBrie(item) {
  this.item = item;

  AgedBrie.prototype.update_quality = () => {
    this.increase_quality();
    this.decrease_sell_in(item);
  }
}

function RegularItem(item) {
  this.item = item;

  RegularItem.prototype.update_quality = () => {
    if (has_some_quality()) {
      decrease_quality();
    }

    this.decrease_sell_in();

    if (this.sell_in_lower_than(0)) {
      if (has_some_quality()) {
        decrease_quality();
      }
    }
  }

  function has_some_quality() {
    var minimum_item_quality = 0;
    return item.quality > minimum_item_quality;
  }

  function decrease_quality() {
    item.quality = item.quality - 1;
  }
}

function BackstagePass(item) {
  this.item = item;

  BackstagePass.prototype.update_quality = () => {

    if (this.sell_in_lower_than(11)) {
      this.increase_quality();
    }

    if (this.sell_in_lower_than(6)) {
      this.increase_quality();
    }
    this.increase_quality();
    this.decrease_sell_in();

    if (this.sell_in_lower_than(0)) {
      remove_quality();
    }
  }

  function remove_quality() {
    item.quality = 0;
  }
}

BackstagePass.prototype = itemPrototype;
AgedBrie.prototype = itemPrototype;
RegularItem.prototype = itemPrototype;

function update_quality(items) {

  var aged_brie = 'Aged Brie';
  var backstage_passes = 'Backstage passes to a TAFKAL80ETC concert';
  var sulfuras = 'Sulfuras, Hand of Ragnaros';

  var items_to_be_processed = items.filter(item => item.name !== sulfuras);

  items_to_be_processed.filter(item => item.name == backstage_passes)
    .map(item => new BackstagePass(item))
    .forEach(backstage_pass => backstage_pass.update_quality());

  items_to_be_processed.filter(item => item.name == aged_brie)
    .map(item => new AgedBrie(item))
    .forEach(aged_brie => aged_brie.update_quality());

  items_to_be_processed.filter(item => item.name != aged_brie && item.name != backstage_passes)
    .map(item => new RegularItem(item))
    .forEach(regular_item => regular_item.update_quality());
}