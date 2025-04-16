"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbItemFoundation2 = void 0);
const UnionItemFoundationHelper_1 = require("./UnionItemFoundationHelper");
class FbItemFoundation2 {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbItemFoundation2(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    var t, i;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (i =
          UnionItemFoundationHelper_1.UnionItemFoundationHelper.GetUnionItemFoundationObject(
            t,
          ))) &&
        (this.TAe =
          UnionItemFoundationHelper_1.UnionItemFoundationHelper.ReadUnionItemFoundation(
            t,
            this.FbDataInternal.config(i),
          )),
      this.TAe
    );
  }
}
exports.FbItemFoundation2 = FbItemFoundation2;
//# sourceMappingURL=FbItemFoundation2.js.map
