"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTextStyle = void 0);
const UnionCenterTextShowAnimHelper_1 = require("./UnionCenterTextShowAnimHelper");
class FbTextStyle {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.wCh = !1),
      (this.PCh = void 0),
      (this.UCh = !1),
      (this.DCh = void 0),
      (this.BCh = !1),
      (this.qCh = void 0),
      (this.kCh = !1),
      (this.GCh = void 0);
  }
  static Create(t) {
    if (t) return new FbTextStyle(t);
  }
  get ShowAnim() {
    var t, e;
    return (
      !this.wCh &&
        ((this.wCh = !0),
        (t = this.FbDataInternal.showAnimType()),
        (e =
          UnionCenterTextShowAnimHelper_1.UnionCenterTextShowAnimHelper.GetUnionCenterTextShowAnimObject(
            t,
          ))) &&
        (this.PCh =
          UnionCenterTextShowAnimHelper_1.UnionCenterTextShowAnimHelper.ReadUnionCenterTextShowAnim(
            t,
            this.FbDataInternal.showAnim(e),
          )),
      this.PCh
    );
  }
  get FontSize() {
    return (
      this.UCh ||
        ((this.UCh = !0), (this.DCh = this.FbDataInternal.fontSize())),
      this.DCh
    );
  }
  get TextAlign() {
    return (
      this.BCh ||
        ((this.BCh = !0), (this.qCh = this.FbDataInternal.textAlign())),
      this.qCh
    );
  }
  get TextHorizontal() {
    return (
      this.kCh ||
        ((this.kCh = !0), (this.GCh = this.FbDataInternal.textHorizontal())),
      this.GCh
    );
  }
}
exports.FbTextStyle = FbTextStyle;
//# sourceMappingURL=FbTextStyle.js.map
