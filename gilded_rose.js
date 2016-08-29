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

  for (var i = 0; i < items.length; i++) {
    if (items[i].name != aged_brie && items[i].name != backstage_passes) {
      if (items[i].quality > 0 && items[i].name != sulfuras) {
        items[i].quality = items[i].quality - 1
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == backstage_passes && items[i].sell_in < 11 && items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
          if (items[i].sell_in < 6 && items[i].quality < 50) {
            items[i].quality = items[i].quality + 1
          }
        }
      }
    }
    if (items[i].name != sulfuras) {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != aged_brie) {
        if (items[i].name != backstage_passes) {
          if (items[i].quality > 0 && items[i].name != sulfuras) {
              items[i].quality = items[i].quality - 1
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}