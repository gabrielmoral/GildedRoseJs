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


function update_quality(items) {

  var aged_brie = 'Aged Brie';
  var backstage_passes = 'Backstage passes to a TAFKAL80ETC concert';
  var sulfuras = 'Sulfuras, Hand of Ragnaros';

  var items_to_be_processed = items.filter(item => item.name !== sulfuras);

  for (var i = 0; i < items_to_be_processed.length; i++) {
    var item = items_to_be_processed[i];

    if (item.name != aged_brie && item.name != backstage_passes) {
      if (item.quality > 0) {
        decrease_quality(item);
      }
    } else {
      increase_quality(item);
      if (item.name == backstage_passes && item.sell_in < 11) {
        increase_quality(item);
        if (item.sell_in < 6) {
          increase_quality(item);
        }
      }
    }
    
    decrease_sell_in(item);
    
    if (item.sell_in < 0) {
      if (item.name != aged_brie) {
        if (item.name != backstage_passes) {
          if (item.quality > 0) {
            decrease_quality(item);
          }
        } else {
          remove_quality(item);
        }
      } else {
        increase_quality(item);
      }
    }
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
}