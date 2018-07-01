'use strict';

import React from 'react';
import {use, spy, expect} from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import GalleryDriver from '../../../test/drivers/reactDriver';
import {testImages} from '../../../test/images-mock';
import ItemHover from './itemHover';
import utils from '../../utils/index.js';

use(spies);

describe('ItemHover', () => {

  let driver;
  let sampleItem;
  let sampleItemViewProps;
  let stub;

  function itemHoverHasClass(driver, className) {
    return expect(driver.find.hook('item-hover-1').hasClass(className));
  }

  beforeEach(() => {
    driver = new GalleryDriver();
    sampleItem = testImages[0];
    sampleItemViewProps = driver.props.itemView(sampleItem);
    Object.assign(sampleItemViewProps, {
      idx: 1,
      shouldHover: true,
      isMultisharing: true,
      imageDimensions: {
        height: `calc(100% - 80px)`,
        marginTop: 10
      },
      actions: {
        toggleMultishareSelection: () => {},
        handleItemMouseDown: () => {},
        handleItemMouseUp: () => {}
      },
      forceShowHover: true,
      itemType: 'image'
    });
  });

  it('should rendered or not according to "shouldHover" prop', () => {
    Object.assign(sampleItemViewProps, {
      shouldHover: false
    });
    driver.mount(ItemHover, sampleItemViewProps);
    expect(driver.find.hook('item-hover-1').length).to.equal(0);

    Object.assign(sampleItemViewProps, {
      shouldHover: true
    });
    driver.mount(ItemHover, sampleItemViewProps);
    expect(driver.find.hook('item-hover-1').length).to.equal(1);
  });

  it('className should be correct', () => {

    //-------| item type |-------

    Object.assign(sampleItemViewProps, {
      itemType: 'video'
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'gallery-item-hover-video').to.equal(true);

    Object.assign(sampleItemViewProps, {
      itemType: 'image'
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'gallery-item-hover').to.equal(true);

    //-------| vertical align |-------

    Object.assign(sampleItemViewProps.styleParams, {
      isSlider: false,
      isSlideshow: false,
      hasThumbnails: false,
      galleryVerticalAlign: 'center'
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'center').to.equal(false);

    Object.assign(sampleItemViewProps.styleParams, {
      isSlider: true,
      isSlideshow: false,
      hasThumbnails: false,
      galleryVerticalAlign: 'center'
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'center').to.equal(true);

    Object.assign(sampleItemViewProps.styleParams, {
      isSlider: false,
      isSlideshow: true,
      hasThumbnails: false,
      galleryVerticalAlign: 'center'
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'center').to.equal(true);

    Object.assign(sampleItemViewProps.styleParams, {
      isSlider: false,
      isSlideshow: false,
      hasThumbnails: true,
      galleryVerticalAlign: 'center'
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'center').to.equal(true);

    //-------| fullscreen |-------

    Object.assign(sampleItemViewProps.styleParams, {
      fullscreen: true
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'fullscreen-enabled').to.equal(true);

    Object.assign(sampleItemViewProps.styleParams, {
      fullscreen: false
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'fullscreen-disabled').to.equal(true);

    //-------| opacity |-------

    //styleParams.itemOpacity is undefined
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'default').to.equal(true);

    Object.assign(sampleItemViewProps.styleParams, {
      itemOpacity: 0
    });
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'default').to.equal(false);

    //-------| forceShowHover & isMobile |-------

    Object.assign(sampleItemViewProps, {
      forceShowHover: true,
      isMultisharing: false
    });
    stub = sinon.stub(utils, 'isMobile').returns(true);
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'hovered').to.equal(true);
    itemHoverHasClass(driver, 'hide-hover').to.equal(false);
    stub.restore();

    Object.assign(sampleItemViewProps, {
      forceShowHover: false,
      isMultisharing: false
    });
    stub = sinon.stub(utils, 'isMobile').returns(true);
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'hovered').to.equal(false);
    itemHoverHasClass(driver, 'hide-hover').to.equal(true);
    stub.restore();

    Object.assign(sampleItemViewProps, {
      forceShowHover: false,
      isMultisharing: false
    });
    stub = sinon.stub(utils, 'isMobile').returns(false);
    driver.mount(ItemHover, sampleItemViewProps);
    itemHoverHasClass(driver, 'hovered').to.equal(false);
    itemHoverHasClass(driver, 'hide-hover').to.equal(false);
    stub.restore();
  });
});


