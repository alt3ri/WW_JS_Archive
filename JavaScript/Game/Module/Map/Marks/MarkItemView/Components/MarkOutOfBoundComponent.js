"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkOutOfBoundComponent = void 0);
const UE = require("ue"),
  MarkPanelBase_1 = require("../MarkPanelBase"),
  RAD_2_DEG = 180 / Math.PI,
  DEG_PI_4 = 90;
class MarkOutOfBoundComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments), (this.cie = new UE.Rotator(0));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnBeforeShow() {
    this.T_e();
  }
  SetOutOfBoundDirection(e) {
    e = Math.atan2(e.Y, e.X) * RAD_2_DEG - DEG_PI_4;
    (this.cie.Yaw = e), this.IsShowOrShowing && this.T_e();
  }
  T_e() {
    this.GetItem(0).SetUIRelativeRotation(this.cie);
  }
}
exports.MarkOutOfBoundComponent = MarkOutOfBoundComponent;
//# sourceMappingURL=MarkOutOfBoundComponent.js.map
