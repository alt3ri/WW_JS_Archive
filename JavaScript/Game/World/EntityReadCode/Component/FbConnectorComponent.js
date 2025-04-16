"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbConnectorComponent = void 0);
const UnionConnectorLogicHelper_1 = require("./UnionConnectorLogicHelper");
class FbConnectorComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.h$h = !1),
      (this.l$h = void 0);
  }
  static Create(t) {
    if (t) return new FbConnectorComponent(t);
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
          UnionConnectorLogicHelper_1.UnionConnectorLogicHelper.GetUnionConnectorLogicObject(
            t,
          ))) &&
        (this.l$h =
          UnionConnectorLogicHelper_1.UnionConnectorLogicHelper.ReadUnionConnectorLogic(
            t,
            this.FbDataInternal.logicType(e),
          )),
      this.l$h
    );
  }
}
exports.FbConnectorComponent = FbConnectorComponent;
//# sourceMappingURL=FbConnectorComponent.js.map
