"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableSplineMoveModel = void 0);
const UnionSplineMoveModelHelper_1 = require("./UnionSplineMoveModelHelper");
class FbEnableSplineMoveModel {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbEnableSplineMoveModel(e);
  }
  get Config() {
    var e, o;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (o =
          UnionSplineMoveModelHelper_1.UnionSplineMoveModelHelper.GetUnionSplineMoveModelObject(
            e,
          ))) &&
        (this.TAe =
          UnionSplineMoveModelHelper_1.UnionSplineMoveModelHelper.ReadUnionSplineMoveModel(
            e,
            this.FbDataInternal.config(o),
          )),
      this.TAe
    );
  }
}
exports.FbEnableSplineMoveModel = FbEnableSplineMoveModel;
//# sourceMappingURL=FbEnableSplineMoveModel.js.map
