"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRemovePreloadResourceAction = void 0);
const UnionRemovePreloadResourceConfigHelper_1 = require("./UnionRemovePreloadResourceConfigHelper");
class FbRemovePreloadResourceAction {
  constructor(e) {
    (this.FbDataInternal = e), (this.kSh = !1), (this.GSh = void 0);
  }
  static Create(e) {
    if (e) return new FbRemovePreloadResourceAction(e);
  }
  get RemovePreloadResourceObjectType() {
    var e, o;
    return (
      !this.kSh &&
        ((this.kSh = !0),
        (e = this.FbDataInternal.removePreloadResourceObjectTypeType()),
        (o =
          UnionRemovePreloadResourceConfigHelper_1.UnionRemovePreloadResourceConfigHelper.GetUnionRemovePreloadResourceConfigObject(
            e,
          ))) &&
        (this.GSh =
          UnionRemovePreloadResourceConfigHelper_1.UnionRemovePreloadResourceConfigHelper.ReadUnionRemovePreloadResourceConfig(
            e,
            this.FbDataInternal.removePreloadResourceObjectType(o),
          )),
      this.GSh
    );
  }
}
exports.FbRemovePreloadResourceAction = FbRemovePreloadResourceAction;
//# sourceMappingURL=FbRemovePreloadResourceAction.js.map
