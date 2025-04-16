"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckItems = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbItemConfig_1 = require("./FbItemConfig");
class FbCheckItems {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.tuh = !1),
      (this.iuh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckItems(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get Items() {
    if (!this.tuh) {
      (this.tuh = !0), (this.iuh = new Array());
      var i = this.FbDataInternal.itemsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.items(t, new fb_condition_1.ItemConfig());
          this.iuh.push(FbItemConfig_1.FbItemConfig.Create(s));
        }
    }
    return this.iuh;
  }
}
exports.FbCheckItems = FbCheckItems;
//# sourceMappingURL=FbCheckItems.js.map
