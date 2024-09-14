"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ImmutableArray = void 0);
const Log_1 = require("../Common/Log");
class ImmutableArray extends Array {
  constructor() {
    super(...arguments), (this.D$a = void 0);
  }
  get PKa() {
    return this.D$a || (this.D$a = Array.from(this)), this.D$a;
  }
  push() {
    return this.wKa("push"), NaN;
  }
  pop() {
    this.wKa("pop");
  }
  shift() {
    this.wKa("shift");
  }
  unshift() {
    return this.wKa("unshift"), NaN;
  }
  splice(t, r) {
    return this.wKa("splice"), new Array();
  }
  sort(t) {
    return this.wKa("sort"), this;
  }
  reverse() {
    return this.wKa("reverse"), this;
  }
  fill(t, r, e) {
    return this.wKa("fill"), this;
  }
  copyWithin(t, r, e) {
    return this.wKa("copyWithin"), this;
  }
  set length(t) {
    this.wKa("set length");
  }
  get length() {
    return super.length;
  }
  concat(...t) {
    return this.PKa.concat(...t);
  }
  map(t, r) {
    return this.PKa.map(t, r);
  }
  slice(t, r) {
    return this.PKa.slice(t, r);
  }
  filter(t, r) {
    return this.PKa.filter(t, r);
  }
  wKa(t) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Core", 63, "ImmutableArray 不允许修改", ["函数名", t]);
  }
}
exports.ImmutableArray = ImmutableArray;
//# sourceMappingURL=ImmutableArray.js.map
