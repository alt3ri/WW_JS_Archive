"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCurveControlConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbChargeSlashControl_1 = require("./FbChargeSlashControl");
class UnionCurveControlConfigHelper {
  static GetUnionCurveControlConfigObject(o) {
    if (o === fb_component_1.UnionCurveControlConfig.ChargeSlashControl)
      return new fb_component_1.ChargeSlashControl();
  }
  static ReadUnionCurveControlConfig(o, e) {
    return void 0 !== e &&
      o === fb_component_1.UnionCurveControlConfig.ChargeSlashControl
      ? FbChargeSlashControl_1.FbChargeSlashControl.Create(e)
      : void 0;
  }
}
exports.UnionCurveControlConfigHelper = UnionCurveControlConfigHelper;
//# sourceMappingURL=UnionCurveControlConfigHelper.js.map
