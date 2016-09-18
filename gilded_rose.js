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

  sell_in_lower_than: function (days) {
    return this.item.sell_in < days;
  }
}

function AgedBrie(item) {
  this.item = item;

  var update_quality = () => {
    this.increase_quality();
    this.decrease_sell_in();
  }

  return {
    update_quality : update_quality
  };
}

function RegularItem(item) {
  this.item = item;

  var update_quality = () => {
    decrease_quality();

    this.decrease_sell_in();

    if (this.sell_in_lower_than(0)) {
      decrease_quality();
    }
  }

  var decrease_quality = () => {
    if (!has_quality()) return;
    item.quality = item.quality - 1;
  }

  function has_quality() {
    var minimum_item_quality = 0;
    return item.quality > minimum_item_quality;
  }

  return {
    update_quality : update_quality,
    decrease_quality : decrease_quality
  };
}

function ConjuredItem(item) {
  var update_quality = () => {
    var regular_item = new RegularItem(item);
    regular_item.update_quality();
    regular_item.decrease_quality();
  }

  return {
    update_quality : update_quality
  };
}

function BackstagePass(item) {
  this.item = item;

  var update_quality = () => {

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

  return {
    update_quality : update_quality
  };
}

BackstagePass.prototype = itemPrototype;
AgedBrie.prototype = itemPrototype;
RegularItem.prototype = itemPrototype;

function update_quality(items) {

  items.map(map_item)
    .forEach(item => item.update_quality());
}

function map_item(item) {
  var items = {
    'Sulfuras, Hand of Ragnaros' : { update_quality: () => { } },
    'Aged Brie' : new AgedBrie(item),
    'Backstage passes to a TAFKAL80ETC concert' : new BackstagePass(item),
    'Conjured' : new ConjuredItem(item)
  };

  var no_regular_item = items[item.name];

  if (no_regular_item !== undefined) {
    return no_regular_item;
  }

  return new RegularItem(item);
}