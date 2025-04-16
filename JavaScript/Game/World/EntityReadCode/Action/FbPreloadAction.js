"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPreloadAction = void 0);
const UnionPreloadObjectTypeConfigHelper_1 = require("./UnionPreloadObjectTypeConfigHelper");
class FbPreloadAction {
  constructor(e) {
    (this.FbDataInternal = e), (this.xSh = !1), (this.RSh = void 0);
  }
  static Create(e) {
    if (e) return new FbPreloadAction(e);
  }
  get PreloadObjectType() {
    var e, t;
    return (
      !this.xSh &&
        ((this.xSh = !0),
        (e = this.FbDataInternal.preloadObjectTypeType()),
        (t =
          UnionPreloadObjectTypeConfigHelper_1.UnionPreloadObjectTypeConfigHelper.GetUnionPreloadObjectTypeConfigObject(
            e,
          ))) &&
        (this.RSh =
          UnionPreloadObjectTypeConfigHelper_1.UnionPreloadObjectTypeConfigHelper.ReadUnionPreloadObjectTypeConfig(
            e,
            this.FbDataInternal.preloadObjectType(t),
          )),
      this.RSh
    );
  }
}
exports.FbPreloadAction = FbPreloadAction;
//# sourceMappingURL=FbPreloadAction.js.map
