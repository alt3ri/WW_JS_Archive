"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GrapplingHookTracked = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleUiControl_1 = require("../../BattleUiControl"),
  RAD_2_DEG = 180 / Math.PI;
class GrapplingHookTracked extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.tlt = !1),
      (this.hwe = new UE.Rotator()),
      (this.Due = void 0),
      (this.ilt = () => {
        this.Due &&
          BattleUiControl_1.BattleUiControl.FocusToTargetLocation(this.Due);
      }),
      this.CreateThenShowByResourceIdAsync("UiItem_GsTracked", t, !0).then(
        () => {
          this.tlt = !0;
        },
        () => {},
      );
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.ilt]]);
  }
  Refresh(t, e) {
    var s;
    this.tlt &&
      ((s = this.GetItem(0)),
      (this.hwe.Pitch = 0),
      (this.hwe.Yaw = Math.atan2(t.Y, t.X) * RAD_2_DEG - 90),
      (this.hwe.Roll = 0),
      s.SetUIRelativeRotation(this.hwe),
      this.RootItem.SetAnchorOffset(t),
      (this.Due = e));
  }
  GetIsTrackedActivated() {
    return this.tlt;
  }
  OnBeforeDestroy() {
    (this.tlt = !1), (this.Due = void 0);
  }
}
exports.GrapplingHookTracked = GrapplingHookTracked;
//# sourceMappingURL=GrapplingHookTracked.js.map
