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

var decoratedItem = function (item) {
  var _item = item;

  function has_max_quality () {
    var max_item_quality = 50;
    return _item.quality === max_item_quality;
  }

  return {
    increase_quality: function () {
      if (has_max_quality()) return;
      _item.quality += 1;
    },

    decrease_sell_in: function () {
      _item.sell_in -= 1;
    },

    sell_in_lower_than: function (days) {
      return _item.sell_in < days;
    }
  };
}

function AgedBrie(item) {
  var _item = decoratedItem(item);

  return {
    update_quality: function () {
      _item.increase_quality();
      _item.decrease_sell_in();
    }
  };
}

function RegularItem(item) {
  var decorated_item = decoratedItem(item);

  var decrease_quality = function () {
    if (!has_quality()) return;
    item.quality -= 1;
  }

  function has_quality() {
    var minimum_item_quality = 0;
    return item.quality > minimum_item_quality;
  }

  return {
    update_quality: function () {
      decrease_quality();

      decorated_item.decrease_sell_in();

      if (decorated_item.sell_in_lower_than(0)) {
        decrease_quality();
      }
    },

    decrease_quality: decrease_quality
  };
}

function ConjuredItem(item) {
  return {
    update_quality: function () {
      var regular_item = RegularItem(item);

      regular_item.update_quality();
      regular_item.decrease_quality();
    }
  };
}

function BackstagePass(item) {
  var decorated_item = decoratedItem(item);

  function remove_quality() {
    item.quality = 0;
  }

  return {
    update_quality: function () {

      if (decorated_item.sell_in_lower_than(11)) {
        decorated_item.increase_quality();
      }

      if (decorated_item.sell_in_lower_than(6)) {
        decorated_item.increase_quality();
      }
      decorated_item.increase_quality();
      decorated_item.decrease_sell_in();

      if (decorated_item.sell_in_lower_than(0)) {
        remove_quality();
      }
    }
  };
}


function update_quality(items) {

  items.map(map_item)
    .forEach(item => item.update_quality());
}

function map_item(item) {
  var items = {
    'Sulfuras, Hand of Ragnaros': { update_quality: () => { } },
    'Aged Brie': AgedBrie(item),
    'Backstage passes to a TAFKAL80ETC concert': BackstagePass(item),
    'Conjured': ConjuredItem(item)
  };

  var no_regular_item = items[item.name];

  if (no_regular_item !== undefined) {
    return no_regular_item;
  }

  return RegularItem(item);
}