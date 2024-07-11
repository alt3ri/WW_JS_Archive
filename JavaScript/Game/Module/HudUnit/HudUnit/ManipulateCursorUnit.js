"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateCursorUnit = void 0);
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 300;
const RAD_2_DEG = 180 / Math.PI;
class ManipulateCursorUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.zei = new UE.Rotator()),
      (this.Cct = void 0),
      (this.Zei = void 0),
      (this.eti = void 0),
      (this.xet = void 0),
      (this.J_t = void 0),
      (this.tti = void 0),
      (this.znt = void 0),
      (this.$ei = void 0),
      (this.dce = !1),
      (this.iti = 0),
      (this.oti = 0),
      (this.rti = !1),
      (this.nti = () => {
        (this.znt = TimerSystem_1.TimerSystem.Delay(this.ist, CLOSE_ANIM_TIME)),
          this.J_t?.SetUIActive(!1),
          this.PlayTweenAnim(12);
      }),
      (this.ist = () => {
        (this.znt = void 0), this.$ei?.();
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
      ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
        this.ComponentRegisterInfos.push([13, UE.UIItem]);
  }
  OnStart() {}
  async OnBeforeStartAsync() {
    let i;
    (this.eti = this.GetItem(2)),
      (this.J_t = this.GetItem(3)),
      (this.tti = this.GetSprite(4)),
      ModelManager_1.ModelManager.PlatformModel.IsMobile()
        ? ((this.Cct = this.GetSprite(0)),
          (this.Zei = this.GetSprite(1)),
          this.Cct.SetUIActive(!0),
          this.Zei.SetUIActive(!1))
        : (i = this.GetItem(13)) &&
          ((this.xet = new CombineKeyItem_1.CombineKeyItem()),
          await this.xet.CreateByActorAsync(i.GetOwner()),
          this.RefreshKeyVisible(),
          this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1)),
      this.Brt(),
      this.Appear(),
      this.iti > 0 && this.J_t?.SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.Jei(),
      (this.Cct = void 0),
      (this.Zei = void 0),
      (this.eti = void 0),
      (this.xet = void 0),
      (this.J_t = void 0),
      (this.tti = void 0),
      (this.$ei = void 0),
      super.OnBeforeDestroy();
  }
  Refresh(i, t, s) {
    this.sti(),
      (this.zei.Yaw = Math.atan2(t.Y, t.X) * RAD_2_DEG - 90),
      (this.zei.Roll = 0),
      (this.zei.Pitch = 0);
    i = !i;
    this.eti.IsUIActiveInHierarchy() !== i && this.eti.SetUIActive(i),
      i && this.eti.SetUIRelativeRotation(this.zei),
      this.SetAnchorOffset(t.X, t.Y),
      this.ati(s);
  }
  ati(i) {
    this.rti !== i &&
      ((this.rti = i),
      ModelManager_1.ModelManager.PlatformModel.OperationType === 2
        ? i
          ? this.SetKeyAction(InputMappingsDefine_1.actionMappings.攻击)
          : this.SetKeyAction(InputMappingsDefine_1.actionMappings.幻象1)
        : (this.Cct.SetUIActive(!i), this.Zei.SetUIActive(i)));
  }
  SetKeyAction(i) {
    this.xet?.RefreshAction(i);
  }
  RefreshKeyVisible() {
    this.xet &&
      (ModelManager_1.ModelManager.PlatformModel.OperationType !== 2
        ? this.xet.SetActive(!1)
        : this.xet.SetActive(!0));
  }
  StartProcess(i) {
    this.J_t?.SetUIActive(!0),
      this.hti(0),
      (this.iti = i > 0 ? 1 / (i * TimeUtil_1.TimeUtil.InverseMillisecond) : 0),
      (this.oti = Time_1.Time.WorldTime);
  }
  EndProcess(i) {
    this.StopProcessAnim(), (this.iti = 0), i && this.hti(0);
  }
  sti() {
    let i;
    this.iti <= 0 ||
      ((i = Time_1.Time.WorldTime),
      (i = Math.min((i - this.oti) * this.iti, 1)),
      this.hti(i));
  }
  hti(i) {
    this.tti?.SetFillAmount(i);
  }
  PlayActivateEffect() {
    const i = this.GetUiNiagara(6);
    i.SetUIActive(!0), i.ActivateSystem(!0);
  }
  Brt() {
    this.InitTweenAnim(7),
      this.InitTweenAnim(8),
      this.InitTweenAnim(9),
      this.InitTweenAnim(10),
      this.InitTweenAnim(12);
  }
  Appear() {
    (this.dce = !0),
      this.Jei(),
      this.InAsyncLoading() ||
        (this.Cct?.SetAlpha(1), this.Zei?.SetAlpha(1), this.eti?.SetAlpha(1));
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
      this.Jei(),
      this.InAsyncLoading()
        ? this.$ei?.()
        : i > TimerSystem_1.MIN_TIME
          ? (this.znt = TimerSystem_1.TimerSystem.Delay(this.nti, i))
          : this.ist());
  }
  StopCloseAnim() {
    this.Jei(), this.J_t?.SetUIActive(!1), this.StopTweenAnim(12);
  }
  Jei() {
    this.znt &&
      (TimerSystem_1.TimerSystem.Remove(this.znt), (this.znt = void 0));
  }
  SetCloseAnimCallback(i) {
    this.$ei = i;
  }
}
exports.ManipulateCursorUnit = ManipulateCursorUnit;
// # sourceMappingURL=ManipulateCursorUnit.js.map
