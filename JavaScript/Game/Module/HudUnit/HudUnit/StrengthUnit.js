"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StrengthUnit = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  HudUnitBase_1 = require("../HudUnitBase"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 5,
  PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT = 1,
  MAX_DELTA_TIME = 200,
  MIN_DELTA_OFFSET = 0.5,
  MAX_POS_OFFSET = 500,
  TEMPORARY_STRENGTH_LERP_TIME = 300,
  CLOSE_ANIM_TIME = 250,
  FULL_ANIM_TIME = 300,
  TEMP_CLOSE_ANIM_TIME = 330;
class StrengthUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Nma = new Vector2D_1.Vector2D()),
      (this.mii = !0),
      (this.BuffType = 0),
      (this.dii = []),
      (this.Cii = []),
      (this.gii = new UE.Rotator(0, 0, 0)),
      (this.EntityHandle = void 0),
      (this.ActorComponent = void 0),
      (this.vii = 0),
      (this.Mii = 0),
      (this.Xte = void 0),
      (this.Eii = 0),
      (this.Sii = 1),
      (this.yii = 0),
      (this.Iii = 0),
      (this.Tii = 0),
      (this.Lii = 0),
      (this.Dii = !1),
      (this.IsStarted = !1),
      (this.Rii = 0),
      (this.Uii = 0),
      (this.Aii = 0),
      (this.Pii = 0),
      (this.xii = void 0),
      (this.wii = void 0),
      (this.Bii = void 0);
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
    this.RootItem.SetAnchorAlign(2, 2);
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++)
      this.bii(0 === t);
    for (let t = 0; t < PRELOAD_SINGLE_TEMPORARY_STRENGTH_ITEM_COUNT; t++)
      this.qii(0 === t);
    (this.Eii = CommonParamById_1.configCommonParamById.GetIntConfig(
      "SingleStrengthValue",
    )),
      (this.Sii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MaxSingleStrengthItemCount",
      )),
      (this.yii = CommonParamById_1.configCommonParamById.GetIntConfig(
        "SingleTemporaryStrengthValue",
      )),
      (this.Tii = 0),
      (this.Lii = 0),
      this.SetVisible(!1),
      this.Qnt();
  }
  OnBeforeDestroy() {
    (this.EntityHandle = void 0),
      (this.ActorComponent = void 0),
      (this.Xte = void 0),
      (this.Dii = !1),
      (this.IsStarted = !1),
      this.Gii(),
      this.Nii(),
      this.Oii(),
      super.OnBeforeDestroy();
  }
  SetNormal(t) {
    var i, s;
    this.mii !== t &&
      ((this.mii = t),
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
    this.vii !== t &&
      ((this.vii = t),
      this.GetSprite(8).SetFillAmount(t / i),
      this.GetSprite(7).SetFillAmount(t / i),
      this.kii(i));
  }
  RefreshSingleStrengthItemRotation(t) {
    let s = Math.floor(t / this.Eii);
    var h = 360 / (s = s > this.Sii ? this.Sii : s);
    let e = 0;
    for (let i = 0; i < s; i++) {
      let t = this.Fii(i);
      (t = t || this.bii()),
        (this.gii.Yaw = e),
        t.SetUIRelativeRotation(this.gii),
        (e += h);
    }
  }
  kii(t) {
    let i = Math.floor(t / this.Eii);
    i > this.Sii && (i = this.Sii);
    for (let t = 0; t < this.dii.length; t++) {
      var s = this.dii[t],
        h = t < i;
      s.IsUIActiveSelf() !== h && s.SetUIActive(h);
    }
  }
  bii(t = !1) {
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
      this.dii.push(h),
      h
    );
  }
  Fii(t) {
    return this.dii[t];
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
    this.Dii !== t &&
      ((this.Dii = t)
        ? (this.StopTemporaryCloseAnim(), this.PlayTemporaryStartAnim())
        : (this.StopTemporaryStartAnim(), this.PlayTemporaryCloseAnim()));
  }
  SetTemporaryStrengthPercent(t, i) {
    this.Mii !== t &&
      ((this.Lii = t / i),
      (this.Mii = t),
      this.RefreshSingleTemporaryStrengthItemVisible(i));
  }
  RefreshSingleTemporaryStrengthItemRotation(t) {
    let s = Math.floor(t / this.yii);
    var h = 360 / (s = s > this.Sii ? this.Sii : s);
    let e = 0;
    for (let i = 0; i < s; i++) {
      let t = this.Vii(i);
      (t = t || this.qii()),
        (this.gii.Yaw = e),
        t.SetUIRelativeRotation(this.gii),
        (e += h);
    }
  }
  RefreshSingleTemporaryStrengthItemVisible(t) {
    let i = Math.floor(t / this.yii);
    i > this.Sii && (i = this.Sii);
    for (let t = 0; t < this.Cii.length; t++) {
      var s = this.Cii[t],
        h = t < i;
      s.IsUIActiveSelf() !== h && s.SetUIActive(h);
    }
  }
  qii(t = !1) {
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
      this.Cii.push(h),
      h
    );
  }
  Hii(t) {
    var i;
    this.GetActive() &&
      this.Tii !== this.Lii &&
      ((i = this.GetSprite(9)),
      (this.Iii += t),
      (this.Tii = MathUtils_1.MathUtils.Lerp(
        this.Tii,
        this.Lii,
        this.Iii / TEMPORARY_STRENGTH_LERP_TIME,
      )),
      i.SetFillAmount(this.Tii),
      this.Iii >= TEMPORARY_STRENGTH_LERP_TIME) &&
      (this.Iii = 0);
  }
  Vii(t) {
    return this.Cii[t];
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
    this.RefreshTargetPosition(t), this.Hii(t);
  }
  RefreshTargetPosition(t) {
    var i, s;
    this.GetActive() &&
      this.ActorComponent &&
      this.ActorComponent.Actor?.IsValid() &&
      ((i = this.ActorComponent.ActorLocation),
      HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(
        i,
        this.Nma,
      )) &&
      ((i = this.Nma.X),
      (s = this.Nma.Y),
      Math.abs(i - this.Rii) > MAX_POS_OFFSET ||
      Math.abs(s - this.Uii) > MAX_POS_OFFSET
        ? ((this.Rii = i),
          (this.Uii = s),
          this.SetAnchorOffset(this.Rii, this.Uii))
        : ((this.Aii = this.jii(t, i, this.Rii, this.Aii)),
          (this.Pii = this.jii(t, s, this.Uii, this.Pii)),
          (i = this.Aii * t),
          (s = this.Pii * t),
          (i < MIN_DELTA_OFFSET &&
            i > -MIN_DELTA_OFFSET &&
            s < MIN_DELTA_OFFSET &&
            s > -MIN_DELTA_OFFSET) ||
            ((this.Rii += i),
            (this.Uii += s),
            this.SetAnchorOffset(this.Rii, this.Uii))));
  }
  jii(t, i, s, h) {
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
  Qnt() {
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
      this.Nii(),
      (this.wii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.wii = void 0),
            this.PlayCloseAnim(),
            this.GetItem(3).IsUIActiveSelf() && this.PlayTemporaryCloseAnim();
        },
        FULL_ANIM_TIME,
        StrengthUnit.Wii,
      )),
      (this.Dii = !1),
      (this.IsStarted = !1);
  }
  Kii() {
    this.Nii(), this.StopTweenAnim(16);
  }
  Nii() {
    this.wii &&
      (TimerSystem_1.TimerSystem.Remove(this.wii), (this.wii = void 0));
  }
  PlayStartAnim() {
    this.IsStarted ||
      (this.Kii(), this.Qii(), this.PlayTweenAnim(14), (this.IsStarted = !0));
  }
  PlayNoneAnim() {
    this.PlayTweenAnim(17);
  }
  StopNoneAnim() {
    this.StopTweenAnim(17);
  }
  PlayCloseAnim() {
    this.PlayTweenAnim(15),
      this.Gii(),
      (this.xii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.xii = void 0), this.SetVisible(!1);
        },
        CLOSE_ANIM_TIME,
        StrengthUnit.Xii,
      )),
      (this.IsStarted = !1);
  }
  Qii() {
    this.Gii(), this.StopTweenAnim(15);
  }
  Gii() {
    this.xii &&
      (TimerSystem_1.TimerSystem.Remove(this.xii), (this.xii = void 0));
  }
  PlayTemporaryStartAnim() {
    this.PlayTweenAnim(19);
  }
  StopTemporaryStartAnim() {
    this.StopTweenAnim(19);
  }
  PlayTemporaryCloseAnim() {
    this.PlayTweenAnim(20),
      this.Oii(),
      (this.Bii = TimerSystem_1.TimerSystem.Delay(
        () => {
          (this.Bii = void 0), this.SetTemporaryVisible(!1), (this.Dii = !1);
        },
        TEMP_CLOSE_ANIM_TIME,
        StrengthUnit.$ii,
      ));
  }
  StopTemporaryCloseAnim() {
    this.Oii(), this.StopTweenAnim(20);
  }
  Oii() {
    this.Bii &&
      (TimerSystem_1.TimerSystem.Remove(this.Bii), (this.Bii = void 0));
  }
  PlayPickUpAnim() {
    this.PlayTweenAnim(18);
  }
}
((exports.StrengthUnit = StrengthUnit).Xii =
  Stats_1.Stat.Create("StrengthCloseAnim")),
  (StrengthUnit.Wii = Stats_1.Stat.Create("StrengthFullAnim")),
  (StrengthUnit.$ii = Stats_1.Stat.Create("StrengthTempCloseAnim"));
//# sourceMappingURL=StrengthUnit.js.map
