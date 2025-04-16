"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCharacterConnectorComponent = void 0);
const UnionCharacterConnectorLogicHelper_1 = require("./UnionCharacterConnectorLogicHelper");
class FbCharacterConnectorComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.h$h = !1),
      (this.l$h = void 0);
  }
  static Create(t) {
    if (t) return new FbCharacterConnectorComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get LogicType() {
    var t, e;
    return (
      !this.h$h &&
        ((this.h$h = !0),
        (t = this.FbDataInternal.logicTypeType()),
        (e =
          UnionCharacterConnectorLogicHelper_1.UnionCharacterConnectorLogicHelper.GetUnionCharacterConnectorLogicObject(
            t,
          ))) &&
        (this.l$h =
          UnionCharacterConnectorLogicHelper_1.UnionCharacterConnectorLogicHelper.ReadUnionCharacterConnectorLogic(
            t,
            this.FbDataInternal.logicType(e),
          )),
      this.l$h
    );
  }
}
exports.FbCharacterConnectorComponent = FbCharacterConnectorComponent;
//# sourceMappingURL=FbCharacterConnectorComponent.js.map
