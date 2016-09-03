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



function BackstagePass(item) {

  BackstagePass.prototype.update_quality = () => {

    if (sell_in_lower_than(11)) {
      increase_quality();
    }

    if (sell_in_lower_than(6)) {
      increase_quality();
    }
    increase_quality();
    decrease_sell_in();

    if (sell_in_lower_than(0)) {
      remove_quality();
    }
  }

  function increase_quality() {
    if (has_max_quality()) return;
    item.quality = item.quality + 1;
  }

  function decrease_sell_in() {
    item.sell_in = item.sell_in - 1;
  }

  function remove_quality() {
    item.quality = 0;
  }

  function sell_in_lower_than(days) {
    return item.sell_in < days;
  }
  function has_max_quality() {
    var max_item_quality = 50;
    return item.quality === max_item_quality;
  }
}

function update_quality(items) {

  var aged_brie = 'Aged Brie';
  var backstage_passes = 'Backstage passes to a TAFKAL80ETC concert';
  var sulfuras = 'Sulfuras, Hand of Ragnaros';

  var items_to_be_processed = items.filter(item => item.name !== sulfuras);

  items_to_be_processed.filter(item => item.name == backstage_passes)
    .map(item => new BackstagePass(item))
    .forEach(backstage_pass => backstage_pass.update_quality());



  for (var i = 0; i < items_to_be_processed.length; i++) {
    var item = items_to_be_processed[i];
    var is_aged_brie = item.name == aged_brie;
    var is_backstage_passes = item.name == backstage_passes;

    if (is_backstage_passes) {
      continue;
    }

    if (!is_aged_brie &&
      has_some_quality(item)) {
      decrease_quality(item);
    } else {
      increase_quality(item);
    }

    decrease_sell_in(item);

    if (sell_in_lower_than(item, 0)) {
      if (!is_aged_brie) {
          if (has_some_quality(item)) {
            decrease_quality(item);
          }
      } else {
        increase_quality(item);
      }
    }
  }

  function sell_in_lower_than(item, days) {
    return item.sell_in < days;
  }

  function decrease_sell_in(item) {
    item.sell_in = item.sell_in - 1;
  }

  function decrease_quality(item) {
    item.quality = item.quality - 1;
  }

  function remove_quality(item) {
    item.quality = 0;
  }

  function increase_quality(item) {
    if (has_max_quality(item)) return;

    item.quality = item.quality + 1;
  }

  function has_max_quality(item) {
    var max_item_quality = 50;
    return item.quality === max_item_quality;
  }

  function has_some_quality(item) {
    var minimum_item_quality = 0;
    return item.quality > minimum_item_quality;
  }
}