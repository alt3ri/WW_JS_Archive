"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthUnit = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../Global"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  HudUnitBase_1 = require("../HudUnitBase"),
  PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 5,
  PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT = 1,
  MAX_DELTA_TIME = 200,
  MIN_DELTA_OFFSET = 0.5,
  TEMPORARY_STRENGTH_LERP_TIME = 300,
  CLOSE_ANIM_TIME = 250,
  FULL_ANIM_TIME = 300,
  TEMP_CLOSE_ANIM_TIME = 330;
class StrengthUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.mti = !0),
      (this.BuffType = 0),
      (this.dti = []),
      (this.Cti = []),
      (this.gti = new UE.Rotator(0, 0, 0)),
      (this.EntityHandle = void 0),
      (this.ActorComponent = void 0),
      (this.gXe = void 0),
      (this.fti = (0, puerts_1.$ref)(void 0)),
      (this.pti = void 0),
      (this.vti = 0),
      (this.Mti = 0),
      (this.Xte = void 0),
      (this.Sti = 0),
      (this.Eti = 1),
      (this.yti = 0),
      (this.Iti = 0),
      (this.Tti = 0),
      (this.Lti = 0),
      (this.Dti = !1),
      (this.IsStarted = !1),
      (this.Rti = 0),
      (this.Uti = 0),
      (this.Ati = 0),
      (this.Pti = 0),
      (this.xti = void 0),
      (this.wti = void 0),
      (this.Bti = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
    ];
  }
  OnStart() {
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++)
      this.bti(0 === t);
    for (let t = 0; t < PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT; t++)
      this.qti(0 === t);
    (this.gXe = Global_1.Global.CharacterController),
      (this.pti = UiLayer_1.UiLayer.UiRootItem),
      (this.Sti = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SingleStrengthValue",
      )),
      (this.Eti = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MaxSingleStrengthItemCount",
      )),
      (this.yti = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SingleTemporaryStrengthValue",
      )),
      (this.Tti = 0),
      (this.Lti = 0),
      this.SetVisible(!1),
      this.Brt();
  }
  OnBeforeDestroy() {
    (this.EntityHandle = void 0),
      (this.ActorComponent = void 0),
      (this.Xte = void 0),
      (this.gXe = void 0),
      (this.Dti = !1),
      (this.IsStarted = !1),
      this.Gti(),
      this.Nti(),
      this.Oti(),
      super.OnBeforeDestroy();
  }
  SetNormal(t) {
    var i, s;
    this.mti !== t &&
      ((this.mti = t),
      (i = this.GetItem(0)),
      (s = this.GetItem(1)),
      i.IsUIActiveSelf() === t && i.SetUIActive(!t),
      i.IsUIActiveSelf() !== t) &&
      s.SetUIActive(t);
  }
  SetBuff(t) {
    if (this.BuffType !== t) {
      this.BuffType = t;
      var i = this.GetItem(4),
        s = this.GetItem(5);
      switch (t) {
        case 0:
          i.IsUIActiveSelf() && i.SetUIActive(!1),
            s.IsUIActiveSelf() && s.SetUIActive(!1);
          break;
        case 1:
          i.IsUIActiveSelf() || i.SetUIActive(!0),
            s.IsUIActiveSelf() && s.SetUIActive(!1);
          break;
        case 2:
          i.IsUIActiveSelf() && i.SetUIActive(!1),
            s.IsUIActiveSelf() || s.SetUIActive(!0);
      }
    }
  }
  SetEnable(t) {
    var i = this.GetItem(6);
    i.IsUIActiveSelf() === t && i.SetUIActive(!t);
  }
  SetNone(t) {
    var i = this.GetItem(2);
    i.IsUIActiveSelf() !== t && i.SetUIActive(t);
  }
  SetStrengthPercent(t, i) {
    this.vti !== t &&
      ((this.vti = t),
      this.GetSprite(8).SetFillAmount(t / i),
      this.GetSprite(7).SetFillAmount(t / i),
      this.kti(i));
  }
  RefreshSingleStrengthItemRotation(t) {
    let s = Math.floor(t / this.Sti);
    var h = 360 / (s = s > this.Eti ? this.Eti : s);
    let e = 0;
    for (let i = 0; i < s; i++) {
      let t = this.Fti(i);
      (t = t || this.bti()),
        (this.gti.Yaw = e),
        t.SetUIRelativeRotation(this.gti),
        (e += h);
    }
  }
  kti(t) {
    let i = Math.floor(t / this.Sti);
    i > this.Eti && (i = this.Eti);
    for (let t = 0; t < this.dti.length; t++) {
      var s = this.dti[t],
        h = t < i;
      s.IsUIActiveSelf() !== h && s.SetUIActive(h);
    }
  }
  bti(t = !1) {
    var i = this.GetItem(11),
      s = this.GetItem(10);
    let h = void 0;
    return (
      (h = t
        ? s
        : LguiUtil_1.LguiUtil.DuplicateActor(
            s.GetOwner(),
            i,
          ).GetComponentByClass(UE.UIItem.StaticClass())),
      this.dti.push(h),
      h
    );
  }
  Fti(t) {
    return this.dti[t];
  }
  RefreshBuffState() {
    this.Xte.HasTag(334800376)
      ? this.SetBuff(1)
      : this.Xte.HasTag(-951946659) && this.SetBuff(2);
  }
  RefreshEnableState() {
    var t = this.Xte.HasTag(64400505);
    this.SetEnable(!t);
  }
  SetTemporaryVisible(t) {
    var i = this.GetItem(3);
    i.IsUIActiveSelf() !== t && i.SetUIActive(t);
  }
  PlayTemporaryAnim(t) {
    this.Dti !== t &&
      ((this.Dti = t)
        ? (this.StopTemporaryCloseAnim(), this.PlayTemporaryStartAnim())
        : (this.StopTemporaryStartAnim(), this.PlayTemporaryCloseAnim()));
  }
  SetTemporaryStrengthPercent(t, i) {
    this.Mti !== t &&
      ((this.Lti = t / i),
      (this.Mti = t),
      this.RefreshSingleTemporaryStrengthItemVisible(i));
  }
  RefreshSingleTemporaryStrengthItemRotation(t) {
    let s = Math.floor(t / this.yti);
    var h = 360 / (s = s > this.Eti ? this.Eti : s);
    let e = 0;
    for (let i = 0; i < s; i++) {
      let t = this.Vti(i);
      (t = t || this.qti()),
        (this.gti.Yaw = e),
        t.SetUIRelativeRotation(this.gti),
        (e += h);
    }
  }
  RefreshSingleTemporaryStrengthItemVisible(t) {
    let i = Math.floor(t / this.yti);
    i > this.Eti && (i = this.Eti);
    for (let t = 0; t < this.Cti.length; t++) {
      var s = this.Cti[t],
        h = t < i;
      s.IsUIActiveSelf() !== h && s.SetUIActive(h);
    }
  }
  qti(t = !1) {
    var i = this.GetItem(13),
      s = this.GetItem(12);
    let h = void 0;
    return (
      (h = t
        ? s
        : LguiUtil_1.LguiUtil.DuplicateActor(
            s.GetOwner(),
            i,
          ).GetComponentByClass(UE.UIItem.StaticClass())),
      this.Cti.push(h),
      h
    );
  }
  Hti(t) {
    var i;
    this.GetActive() &&
      this.Tti !== this.Lti &&
      ((i = this.GetSprite(9)),
      (this.Iti += t),
      (this.Tti = MathUtils_1.MathUtils.Lerp(
        this.Tti,
        this.Lti,
        this.Iti / TEMPORARY_STRENGTH_LERP_TIME,
      )),
      i.SetFillAmount(this.Tti),
      this.Iti >= TEMPORARY_STRENGTH_LERP_TIME) &&
      (this.Iti = 0);
  }
  Vti(t) {
    return this.Cti[t];
  }
  RefreshEntity(t) {
    t
      ? ((this.EntityHandle = t.EntityHandle),
        (this.ActorComponent = t.EntityHandle.Entity.GetComponent(3)),
        (this.Xte = t.GameplayTagComponent))
      : ((this.EntityHandle = void 0),
        (this.ActorComponent = void 0),
        (this.Xte = void 0));
  }
  Tick(t) {
    this.RefreshTargetPosition(t), this.Hti(t);
  }
  RefreshTargetPosition(t) {
    var i, s;
    this.GetActive() &&
      this.ActorComponent &&
      this.ActorComponent.Actor?.IsValid() &&
      ((s = this.ActorComponent.ActorLocation),
      UE.GameplayStatics.ProjectWorldToScreen(this.gXe, s, this.fti, !0),
      (s = (0, puerts_1.$unref)(this.fti)),
      (i = (s = this.pti
        .GetCanvasScaler()
        .ConvertPositionFromViewportToLGUICanvas(s)).X),
      (s = s.Y),
      (this.Ati = this.jti(t, i, this.Rti, this.Ati)),
      (this.Pti = this.jti(t, s, this.Uti, this.Pti)),
      (i = this.Ati * t),
      (s = this.Pti * t),
      (i < MIN_DELTA_OFFSET &&
        i > -MIN_DELTA_OFFSET &&
        s < MIN_DELTA_OFFSET &&
        s > -MIN_DELTA_OFFSET) ||
        ((this.Rti += i),
        (this.Uti += s),
        this.SetAnchorOffset(this.Rti, this.Uti)));
  }
  jti(t, i, s, h) {
    let e = i - s,
      r = !1;
    if ((e < 0 && ((e = -e), (r = !0)), e < 1)) return 0;
    let _ = 0;
    return (
      (_ = t >= MAX_DELTA_TIME ? e / t : e / MAX_DELTA_TIME),
      r && (_ = -_),
      MathUtils_1.MathUtils.Lerp(h, _, 0.5)
    );
  }
  Brt() {
    this.InitTweenAnim(14),
      this.InitTweenAnim(15),
      this.InitTweenAnim(16),
      this.InitTweenAnim(17),
      this.InitTweenAnim(18),
      this.InitTweenAnim(19),
      this.InitTweenAnim(20);
  }
  PlayFullAnim() {
    this.PlayTweenAnim(16),
      this.Nti(),
      (this.wti = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.wti = void 0),
            this.PlayCloseAnim(),
            this.GetItem(3).IsUIActiveSelf() && this.PlayTemporaryCloseAnim();
        },
        FULL_ANIM_TIME,
        StrengthUnit.Wti,
      )),
      (this.Dti = !1),
      (this.IsStarted = !1);
  }
  Kti() {
    this.Nti(), this.StopTweenAnim(16);
  }
  Nti() {
    this.wti &&
      (TimerSystem_1.TimerSystem.Remove(this.wti), (this.wti = void 0));
  }
  PlayStartAnim() {
    this.IsStarted ||
      (this.Kti(), this.Qti(), this.PlayTweenAnim(14), (this.IsStarted = !0));
  }
  PlayNoneAnim() {
    this.PlayTweenAnim(17);
  }
  StopNoneAnim() {
    this.StopTweenAnim(17);
  }
  PlayCloseAnim() {
    this.PlayTweenAnim(15),
      this.Gti(),
      (this.xti = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.xti = void 0), this.SetVisible(!1);
        },
        CLOSE_ANIM_TIME,
        StrengthUnit.Xti,
      )),
      (this.IsStarted = !1);
  }
  Qti() {
    this.Gti(), this.StopTweenAnim(15);
  }
  Gti() {
    this.xti &&
      (TimerSystem_1.TimerSystem.Remove(this.xti), (this.xti = void 0));
  }
  PlayTemporaryStartAnim() {
    this.PlayTweenAnim(19);
  }
  StopTemporaryStartAnim() {
    this.StopTweenAnim(19);
  }
  PlayTemporaryCloseAnim() {
    this.PlayTweenAnim(20),
      this.Oti(),
      (this.Bti = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.Bti = void 0), this.SetTemporaryVisible(!1), (this.Dti = !1);
        },
        TEMP_CLOSE_ANIM_TIME,
        StrengthUnit.$ti,
      ));
  }
  StopTemporaryCloseAnim() {
    this.Oti(), this.StopTweenAnim(20);
  }
  Oti() {
    this.Bti &&
      (TimerSystem_1.TimerSystem.Remove(this.Bti), (this.Bti = void 0));
  }
  PlayPickUpAnim() {
    this.PlayTweenAnim(18);
  }
}
((exports.StrengthUnit = StrengthUnit).Xti = void 0),
  (StrengthUnit.Wti = void 0),
  (StrengthUnit.$ti = void 0);
//# sourceMappingURL=StrengthUnit.js.map
