"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Cache {
  // eslint-disable-next-line no-unused-vars
  constructor(compilation, ignored) {
    this.cache = compilation.getCache('TerserWebpackPlugin');
  } // eslint-disable-next-line class-methods-use-this


  isEnabled() {
    return true;
  }

  async get(task) {
    // eslint-disable-next-line no-param-reassign
    task.cacheIdent = task.cacheIdent || `${task.name}`; // eslint-disable-next-line no-param-reassign

    task.cacheETag = task.cacheETag || this.cache.getLazyHashedEtag(task.assetSource);
    return this.cache.getPromise(task.cacheIdent, task.cacheETag);
  }

  async store(task, data) {
    return this.cache.storePromise(task.cacheIdent, task.cacheETag, data);
  }

}

exports.default = Cache;