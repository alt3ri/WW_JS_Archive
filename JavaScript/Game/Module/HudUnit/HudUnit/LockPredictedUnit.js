"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockPredictedUnit = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 200;
class LockPredictedUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this._at = void 0),
      (this.uat = void 0),
      (this.dat = () => {
        (this._at = void 0), this.uat.SetResult(), (this.uat = void 0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.InitTweenAnim(2), this.InitTweenAnim(3);
  }
  OnAfterShow() {
    this.hga();
  }
  async OnBeforeHideAsync() {
    CLOSE_ANIM_TIME <= 0 ||
      (this.Wti(),
      (this.uat = new CustomPromise_1.CustomPromise()),
      (this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME)),
      await this.uat.Promise);
  }
  OnBeforeDestroy() {
    this._at &&
      (TimerSystem_1.TimerSystem.Remove(this._at),
      (this._at = void 0),
      this.uat.SetResult(),
      (this.uat = void 0));
  }
  Activate() {
    this.SetVisible(!0, 0);
  }
  Deactivate() {
    this.SetVisible(!1, 0);
  }
  hga() {
    this.StopTweenAnim(3), this.PlayTweenAnim(2);
  }
  Wti() {
    this.StopTweenAnim(2), this.PlayTweenAnim(3);
  }
}
exports.LockPredictedUnit = LockPredictedUnit;
//# sourceMappingURL=LockPredictedUnit.js.map
