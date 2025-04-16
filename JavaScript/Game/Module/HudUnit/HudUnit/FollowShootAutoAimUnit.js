"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShootAutoAimUnit = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 200;
class FollowShootAutoAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Kti = void 0),
      (this.xii = void 0),
      (this.uAl = void 0),
      (this.dce = !1),
      (this.Yti = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Kti = this.GetItem(0)),
      (this.Yti = !1),
      this.Kti.SetUIActive(!1),
      this.Qnt(),
      (this.dce = !0);
  }
  OnAfterShow() {
    this.StopTweenAnim(2),
      this.PlayTweenAnim(1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAimUnit AnimStart");
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(1),
      this.PlayTweenAnim(2),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAimUnit AnimClose"),
      this.uAl
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("HudUnit", 17, "重复隐藏FollowShootAutoAimUnit")
        : (this.Gii(),
          (this.uAl = new CustomPromise_1.CustomPromise()),
          (this.xii = TimerSystem_1.TimerSystem.Delay(() => {
            (this.xii = void 0),
              this.uAl && (this.uAl.SetResult(), (this.uAl = void 0));
          }, CLOSE_ANIM_TIME)),
          await this.uAl.Promise);
  }
  OnBeforeDestroy() {
    (this.Kti = void 0), this.Gii(), super.OnBeforeDestroy();
  }
  SetTargetItemOffset(i, t) {
    this.Kti && (this.Kti.SetAnchorOffsetX(i), this.Kti.SetAnchorOffsetY(t));
  }
  SetTargetAimVisible(i, t) {
    this.Kti &&
      this.Yti !== i &&
      ((this.Yti = i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "HudUnit",
          17,
          "FollowShootAutoAim设置目标准心是否可见",
          ["", i],
        ),
      this.Kti.SetUIActive(i),
      i
        ? (this.Kti.SetUIActive(i),
          this.PlayStartAimAnim(),
          this.PlayLoopAimAnim())
        : (this.StopLoopAimAnim(), this.PlayCloseAimAnim()));
  }
  Gii() {
    this.xii &&
      (TimerSystem_1.TimerSystem.Remove(this.xii), (this.xii = void 0)),
      this.uAl && (this.uAl.SetResult(), (this.uAl = void 0));
  }
  Qnt() {
    this.InitTweenAnim(1),
      this.InitTweenAnim(2),
      this.InitTweenAnim(3),
      this.InitTweenAnim(4),
      this.InitTweenAnim(5);
  }
  PlayStartAimAnim() {
    this.dce && this.PlayTweenAnim(3);
  }
  PlayCloseAimAnim() {
    this.dce && this.PlayTweenAnim(4);
  }
  PlayLoopAimAnim() {
    this.dce && this.PlayTweenAnim(5);
  }
  StopLoopAimAnim() {
    this.dce && this.StopTweenAnim(5);
  }
}
exports.FollowShootAutoAimUnit = FollowShootAutoAimUnit;
//# sourceMappingURL=FollowShootAutoAimUnit.js.map
