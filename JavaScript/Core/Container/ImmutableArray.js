"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImmutableArray = void 0);
const Log_1 = require("../Common/Log");
class ImmutableArray extends Array {
  constructor() {
    super(...arguments), (this.cJa = void 0);
  }
  get JYa() {
    return this.cJa || (this.cJa = Array.from(this)), this.cJa;
  }
  push() {
    return this.ZYa("push"), NaN;
  }
  pop() {
    this.ZYa("pop");
  }
  shift() {
    this.ZYa("shift");
  }
  unshift() {
    return this.ZYa("unshift"), NaN;
  }
  splice(t, r) {
    return this.ZYa("splice"), new Array();
  }
  sort(t) {
    return this.ZYa("sort"), this;
  }
  reverse() {
    return this.ZYa("reverse"), this;
  }
  fill(t, r, e) {
    return this.ZYa("fill"), this;
  }
  copyWithin(t, r, e) {
    return this.ZYa("copyWithin"), this;
  }
  set length(t) {
    this.ZYa("set length");
  }
  get length() {
    return super.length;
  }
  concat(...t) {
    return this.JYa.concat(...t);
  }
  map(t, r) {
    return this.JYa.map(t, r);
  }
  slice(t, r) {
    return this.JYa.slice(t, r);
  }
  filter(t, r) {
    return this.JYa.filter(t, r);
  }
  ZYa(t) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Core", 62, "ImmutableArray 不允许修改", ["函数名", t]);
  }
}
exports.ImmutableArray = ImmutableArray;
//# sourceMappingURL=ImmutableArray.js.map
