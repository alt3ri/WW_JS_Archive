"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbItemConfig = void 0);
class FbItemConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.auh = !1),
      (this.huh = 0),
      (this.luh = !1),
      (this.v4i = 0);
  }
  static Create(t) {
    if (t) return new FbItemConfig(t);
  }
  get ItemId() {
    return (
      this.auh || ((this.auh = !0), (this.huh = this.FbDataInternal.itemId())),
      this.huh
    );
  }
  get Count() {
    return (
      this.luh || ((this.luh = !0), (this.v4i = this.FbDataInternal.count())),
      this.v4i
    );
  }
}
exports.FbItemConfig = FbItemConfig;
//# sourceMappingURL=FbItemConfig.js.map
