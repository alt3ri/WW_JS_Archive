"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetHeadIconVisible = void 0);
const UnionHeadStyleHelper_1 = require("./UnionHeadStyleHelper");
class FbSetHeadIconVisible {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.Rmh = !1),
      (this.wmh = void 0),
      (this.Amh = !1),
      (this.xmh = !1);
  }
  static Create(e) {
    if (e) return new FbSetHeadIconVisible(e);
  }
  get HeadStyleConfig() {
    var e, t;
    return (
      !this.Rmh &&
        ((this.Rmh = !0),
        (e = this.FbDataInternal.headStyleConfigType()),
        (t =
          UnionHeadStyleHelper_1.UnionHeadStyleHelper.GetUnionHeadStyleObject(
            e,
          ))) &&
        (this.wmh =
          UnionHeadStyleHelper_1.UnionHeadStyleHelper.ReadUnionHeadStyle(
            e,
            this.FbDataInternal.headStyleConfig(t),
          )),
      this.wmh
    );
  }
  get Visible() {
    return (
      this.Amh || ((this.Amh = !0), (this.xmh = this.FbDataInternal.visible())),
      this.xmh
    );
  }
}
exports.FbSetHeadIconVisible = FbSetHeadIconVisible;
//# sourceMappingURL=FbSetHeadIconVisible.js.map
