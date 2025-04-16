"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetJigsawItem = void 0);
const UnionSetJigsawItemHelper_1 = require("./UnionSetJigsawItemHelper");
class FbSetJigsawItem {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbSetJigsawItem(e);
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionSetJigsawItemHelper_1.UnionSetJigsawItemHelper.GetUnionSetJigsawItemObject(
            e,
          ))) &&
        (this.TAe =
          UnionSetJigsawItemHelper_1.UnionSetJigsawItemHelper.ReadUnionSetJigsawItem(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbSetJigsawItem = FbSetJigsawItem;
//# sourceMappingURL=FbSetJigsawItem.js.map
