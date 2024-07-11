"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LockExecutionUnit = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 200;
class LockExecutionUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this._at = void 0),
      (this.Wti = !1),
      (this.uat = void 0),
      (this.dat = () => {
        (this._at = void 0), this.uat.SetResult(), (this.uat = void 0);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.RootItem.SetAnchorAlign(2, 2),
      this.InitTweenAnim(0),
      this.InitTweenAnim(1),
      this.InitTweenAnim(2);
  }
  TryShow() {
    this.IsShowOrShowing || this.Show();
  }
  OnAfterShow() {
    this.StopTweenAnim(2), this.PlayTweenAnim(0), this.PlayTweenAnim(1);
  }
  TryHide(t) {
    (this.Wti = t), this.IsHideOrHiding || this.Hide();
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(0),
      this.StopTweenAnim(1),
      this.Wti &&
        (this.uat &&
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 18, "重复调用隐藏"),
          this.uat.SetResult()),
        (this.uat = new CustomPromise_1.CustomPromise()),
        (this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME)),
        this.PlayTweenAnim(2),
        await this.uat.Promise);
  }
  OnBeforeDestroy() {
    this._at &&
      (TimerSystem_1.TimerSystem.Remove(this._at),
      (this._at = void 0),
      this.uat.SetResult());
  }
}
exports.LockExecutionUnit = LockExecutionUnit;
//# sourceMappingURL=LockExecutionUnit.js.map
