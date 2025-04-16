"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWindSourceComponent = void 0);
const UnionWindSourceHelper_1 = require("./UnionWindSourceHelper");
class FbWindSourceComponent {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.lkc = !1),
      (this._kc = void 0);
  }
  static Create(e) {
    if (e) return new FbWindSourceComponent(e);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get WindSource() {
    var e, t;
    return (
      !this.lkc &&
        ((this.lkc = !0),
        (e = this.FbDataInternal.windSourceType()),
        (t =
          UnionWindSourceHelper_1.UnionWindSourceHelper.GetUnionWindSourceObject(
            e,
          ))) &&
        (this._kc =
          UnionWindSourceHelper_1.UnionWindSourceHelper.ReadUnionWindSource(
            e,
            this.FbDataInternal.windSource(t),
          )),
      this._kc
    );
  }
}
exports.FbWindSourceComponent = FbWindSourceComponent;
//# sourceMappingURL=FbWindSourceComponent.js.map
