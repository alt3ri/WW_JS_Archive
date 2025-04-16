"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetJigsawFoundation = void 0);
const UnionSetJigsawFoundationHelper_1 = require("./UnionSetJigsawFoundationHelper");
class FbSetJigsawFoundation {
  constructor(t) {
    (this.FbDataInternal = t), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbSetJigsawFoundation(t);
  }
  get Config() {
    var t, i;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (i =
          UnionSetJigsawFoundationHelper_1.UnionSetJigsawFoundationHelper.GetUnionSetJigsawFoundationObject(
            t,
          ))) &&
        (this.TAe =
          UnionSetJigsawFoundationHelper_1.UnionSetJigsawFoundationHelper.ReadUnionSetJigsawFoundation(
            t,
            this.FbDataInternal.config(i),
          )),
      this.TAe
    );
  }
}
exports.FbSetJigsawFoundation = FbSetJigsawFoundation;
//# sourceMappingURL=FbSetJigsawFoundation.js.map
