var path = require('path');
var expect = require('chai').expect;

var GildedRose = require('../gilded_rose.js'),
  Item = GildedRose.Item;

describe('gilded_rose()', function () {
  'use strict';

  it('exists', function () {
    expect(Item).to.be.a('function');

  });

  // Add more assertions here
});
