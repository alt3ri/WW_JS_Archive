"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueEventViewData = exports.RogueTokenViewData = void 0);
class RogueTokenViewData {
  constructor(e) {
    this.v5c = e;
  }
  SetTokenViewInfo(e) {
    this.v5c = e;
  }
  GetTokenViewInfo() {
    return this.v5c;
  }
  GetConfigId() {
    return this.v5c.ConfigId;
  }
  GetCollectionIndex() {
    return this.v5c.CollectionIndex;
  }
  SetSelectOn(e) {
    this.v5c.IsSelectOn = e;
  }
}
exports.RogueTokenViewData = RogueTokenViewData;
class RogueEventViewData {
  constructor(e) {
    this.v5c = e;
  }
  SetTokenViewInfo(e) {
    this.v5c = e;
  }
  GetTokenViewInfo() {
    return this.v5c;
  }
  SetIsLock(e) {
    this.v5c.IsLock = e;
  }
  GetConfigId() {
    return this.v5c.ConfigId;
  }
  SetSelectOn(e) {
    this.v5c.IsSelectOn = e;
  }
  GetSelectOn() {
    return this.v5c.IsSelectOn;
  }
}
exports.RogueEventViewData = RogueEventViewData;
//# sourceMappingURL=RogueIllustratedTokenData.js.map
