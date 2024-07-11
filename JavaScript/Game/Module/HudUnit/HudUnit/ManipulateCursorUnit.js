"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateCursorUnit = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Time_1 = require("../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 300,
  RAD_2_DEG = 180 / Math.PI;
class ManipulateCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.zti = new UE.Rotator()),
      (this.Dmt = void 0),
      (this.Zti = void 0),
      (this.eii = void 0),
      (this.Qtt = void 0),
      (this.mct = void 0),
      (this.tii = void 0),
      (this._at = void 0),
      (this.$ti = void 0),
      (this.dce = !1),
      (this.iii = 0),
      (this.oii = 0),
      (this.rii = !1),
      (this.nii = () => {
        (this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME)),
          this.mct?.SetUIActive(!1),
          this.PlayTweenAnim(12);
      }),
      (this.dat = () => {
        (this._at = void 0), this.$ti?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UINiagara],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      Info_1.Info.IsInTouch() ||
        this.ComponentRegisterInfos.push([13, UE.UIItem]);
  }
  OnStart() {}
  async OnBeforeStartAsync() {
    var i;
    (this.eii = this.GetItem(2)),
      (this.mct = this.GetItem(3)),
      (this.tii = this.GetSprite(4)),
      Info_1.Info.IsInTouch()
        ? ((this.Dmt = this.GetSprite(0)),
          (this.Zti = this.GetSprite(1)),
          this.Dmt.SetUIActive(!0),
          this.Zti.SetUIActive(!1))
        : (i = this.GetItem(13)) &&
          ((this.Qtt = new CombineKeyItem_1.CombineKeyItem()),
          await this.Qtt.CreateByActorAsync(i.GetOwner()),
          this.RefreshKeyVisible(),
          this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1)),
      this.Qnt(),
      this.Appear(),
      0 < this.iii && this.mct?.SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.Jti(),
      (this.Dmt = void 0),
      (this.Zti = void 0),
      (this.eii = void 0),
      (this.Qtt = void 0),
      (this.mct = void 0),
      (this.tii = void 0),
      (this.$ti = void 0),
      super.OnBeforeDestroy();
  }
  Refresh(i, t, s) {
    this.sii(),
      (this.zti.Yaw = Math.atan2(t.Y, t.X) * RAD_2_DEG - 90),
      (this.zti.Roll = 0),
      (this.zti.Pitch = 0);
    i = !i;
    this.eii.IsUIActiveInHierarchy() !== i && this.eii.SetUIActive(i),
      i && this.eii.SetUIRelativeRotation(this.zti),
      this.SetAnchorOffset(t.X, t.Y),
      this.aii(s);
  }
  aii(i) {
    this.rii !== i &&
      ((this.rii = i),
      2 === Info_1.Info.OperationType
        ? i
          ? this.SetKeyAction(InputMappingsDefine_1.actionMappings.攻击)
          : this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1)
        : (this.Dmt.SetUIActive(!i), this.Zti.SetUIActive(i)));
  }
  SetKeyAction(i) {
    this.Qtt?.RefreshAction(i);
  }
  RefreshKeyVisible() {
    this.Qtt &&
      (2 !== Info_1.Info.OperationType
        ? this.Qtt.SetActive(!1)
        : this.Qtt.SetActive(!0));
  }
  StartProcess(i) {
    this.mct?.SetUIActive(!0),
      this.hii(0),
      (this.iii = 0 < i ? 1 / (i * TimeUtil_1.TimeUtil.InverseMillisecond) : 0),
      (this.oii = Time_1.Time.WorldTime);
  }
  EndProcess(i) {
    this.StopProcessAnim(), (this.iii = 0), i && this.hii(0);
  }
  sii() {
    var i;
    this.iii <= 0 ||
      ((i = Time_1.Time.WorldTime),
      (i = Math.min((i - this.oii) * this.iii, 1)),
      this.hii(i));
  }
  hii(i) {
    this.tii?.SetFillAmount(i);
  }
  PlayActivateEffect() {
    var i = this.GetUiNiagara(6);
    i.SetUIActive(!0), i.ActivateSystem(!0);
  }
  Qnt() {
    this.InitTweenAnim(7),
      this.InitTweenAnim(8),
      this.InitTweenAnim(9),
      this.InitTweenAnim(10),
      this.InitTweenAnim(12);
  }
  Appear() {
    (this.dce = !0),
      this.Jti(),
      this.InAsyncLoading() ||
        (this.Dmt?.SetAlpha(1), this.Zti?.SetAlpha(1), this.eii?.SetAlpha(1));
  }
  PlayStartAnim() {
    this.dce && this.PlayTweenAnim(7);
  }
  PlayCompleteAnim() {
    this.dce && this.PlayTweenAnim(9);
  }
  PlayInterruptedAnim() {
    this.dce && this.PlayTweenAnim(10);
  }
  PlayProcessAnim() {
    this.dce && this.PlayTweenAnim(8);
  }
  StopProcessAnim() {
    this.dce && this.StopTweenAnim(8);
  }
  PlayCloseAnim(i) {
    this.dce &&
      ((this.dce = !1),
      this.Jti(),
      this.InAsyncLoading()
        ? this.$ti?.()
        : i > TimerSystem_1.MIN_TIME
          ? (this._at = TimerSystem_1.TimerSystem.Delay(this.nii, i))
          : this.dat());
  }
  StopCloseAnim() {
    this.Jti(), this.mct?.SetUIActive(!1), this.StopTweenAnim(12);
  }
  Jti() {
    this._at &&
      (TimerSystem_1.TimerSystem.Remove(this._at), (this._at = void 0));
  }
  SetCloseAnimCallback(i) {
    this.$ti = i;
  }
}
exports.ManipulateCursorUnit = ManipulateCursorUnit;
//# sourceMappingURL=ManipulateCursorUnit.js.map
