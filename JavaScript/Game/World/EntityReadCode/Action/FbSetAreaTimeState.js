"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetAreaTimeState = void 0);
const UnionSetAreaTimeTypeHelper_1 = require("./UnionSetAreaTimeTypeHelper");
class FbSetAreaTimeState {
  constructor(e) {
    (this.FbDataInternal = e), (this.IEc = !1), (this.TEc = void 0);
  }
  static Create(e) {
    if (e) return new FbSetAreaTimeState(e);
  }
  get SetAreaTimeConfig() {
    var e, t;
    return (
      !this.IEc &&
        ((this.IEc = !0),
        (e = this.FbDataInternal.setAreaTimeConfigType()),
        (t =
          UnionSetAreaTimeTypeHelper_1.UnionSetAreaTimeTypeHelper.GetUnionSetAreaTimeTypeObject(
            e,
          ))) &&
        (this.TEc =
          UnionSetAreaTimeTypeHelper_1.UnionSetAreaTimeTypeHelper.ReadUnionSetAreaTimeType(
            e,
            this.FbDataInternal.setAreaTimeConfig(t),
          )),
      this.TEc
    );
  }
}
exports.FbSetAreaTimeState = FbSetAreaTimeState;
//# sourceMappingURL=FbSetAreaTimeState.js.map
