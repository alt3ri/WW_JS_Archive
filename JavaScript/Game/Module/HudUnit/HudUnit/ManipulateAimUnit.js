"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateAimUnit = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 200;
class ManipulateAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Kti = void 0),
      (this.Qti = void 0),
      (this.Xti = !1),
      (this._at = void 0),
      (this.$ti = void 0),
      (this.dce = !1),
      (this.Yti = !1),
      (this.dat = () => {
        (this._at = void 0), this.$ti?.();
      });
  }
  OnRegisterComponent() {
    "UiView_Sight" === this.ResourceId && (this.Xti = !0),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIItem],
      ]),
      this.Xti
        ? (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
            [2, UE.UIItem],
            [3, UE.UIItem],
            [4, UE.UIItem],
            [5, UE.UIItem],
            [6, UE.UIItem],
          ])
        : (this.ComponentRegisterInfos = [
            [0, UE.UIItem],
            [1, UE.UIItem],
          ]);
  }
  OnStart() {
    (this.Kti = this.GetItem(0)),
      (this.Qti = this.GetItem(1)),
      (this.Yti = !1),
      this.Kti.SetUIActive(!1),
      this.Qnt(),
      this.PlayStartAnim();
  }
  OnBeforeDestroy() {
    (this.Kti = void 0),
      (this.Qti = void 0),
      (this.$ti = void 0),
      super.OnBeforeDestroy();
  }
  SetTargetItemOffset(i, t) {
    this.Kti && (this.Kti.SetAnchorOffsetX(i), this.Kti.SetAnchorOffsetY(t));
  }
  SetTargetAimVisible(i) {
    this.Kti &&
      this.Yti !== i &&
      ((this.Yti = i),
      this.Xti
        ? i
          ? (this.Kti.SetUIActive(i),
            this.PlayStartAimAnim(),
            this.PlayLoopAimAnim())
          : (this.StopLoopAimAnim(), this.PlayCloseAimAnim())
        : this.Kti.SetUIActive(i));
  }
  SetIsWeakness(i) {
    this.Qti && this.Qti.IsUIActiveSelf() !== i && this.Qti.SetUIActive(i);
  }
  Qnt() {
    this.Xti &&
      (this.InitTweenAnim(2),
      this.InitTweenAnim(3),
      this.InitTweenAnim(4),
      this.InitTweenAnim(5),
      this.InitTweenAnim(6));
  }
  PlayStartAnim() {
    (this.dce = !0), this.StopCloseAnim(), this.PlayTweenAnim(2);
  }
  PlayCloseAnim() {
    this.dce &&
      ((this.dce = !1),
      this.Jti(),
      this.InAsyncLoading()
        ? this.$ti?.()
        : ((this._at = TimerSystem_1.TimerSystem.Delay(
            this.dat,
            CLOSE_ANIM_TIME,
          )),
          this.PlayTweenAnim(3)));
  }
  StopCloseAnim() {
    this.Jti(), this.StopTweenAnim(3);
  }
  Jti() {
    this._at &&
      (TimerSystem_1.TimerSystem.Remove(this._at), (this._at = void 0));
  }
  SetCloseAnimCallback(i) {
    this.$ti = i;
  }
  PlayStartAimAnim() {
    this.dce && this.PlayTweenAnim(4);
  }
  PlayCloseAimAnim() {
    this.dce && this.PlayTweenAnim(5);
  }
  PlayLoopAimAnim() {
    this.dce && this.PlayTweenAnim(6);
  }
  StopLoopAimAnim() {
    this.dce && this.StopTweenAnim(6);
  }
  PlayTweenAnim(i) {
    this.Xti && super.PlayTweenAnim(i);
  }
  StopTweenAnim(i) {
    this.Xti && super.StopTweenAnim(i);
  }
}
exports.ManipulateAimUnit = ManipulateAimUnit;
//# sourceMappingURL=ManipulateAimUnit.js.map
