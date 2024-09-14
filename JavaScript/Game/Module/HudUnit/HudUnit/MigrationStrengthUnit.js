"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MigrationStrengthUnit = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  HudUnitBase_1 = require("../HudUnitBase"),
  HudUnitUtils_1 = require("../Utils/HudUnitUtils"),
  NORMAL_PERCENT = 0.2,
  PRELOAD_SINGLE_STRENGTH_ITEM_COUNT = 4,
  MAX_DELTA_TIME = 200,
  MIN_DELTA_OFFSET = 0.5,
  RECOVER_ANIM_TIME = 250,
  RECOVER_STAY_TIME = 1400,
  CLOSE_ANIM_TIME = 250;
class MigrationStrengthUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments),
      (this.Nma = new Vector2D_1.Vector2D()),
      (this.dii = []),
      (this.b2a = []),
      (this.gii = new UE.Rotator(0, 0, 0)),
      (this.q2a = [UE.Color.FromHex("#3db9cb"), UE.Color.FromHex("#cb3d55")]),
      (this.O2a = [UE.Color.FromHex("#234063"), UE.Color.FromHex("#633323")]),
      (this.EntityHandle = void 0),
      (this.ActorComponent = void 0),
      (this.rNa = -1),
      (this.oNa = 0),
      (this.nNa = !1),
      (this.HFa = 0),
      (this.jFa = 0),
      (this.sNa = 0),
      (this.VOa = 0),
      (this.k2a = 1),
      (this.mii = !1),
      (this.Rii = 0),
      (this.Uii = 0),
      (this.Aii = 0),
      (this.Pii = 0),
      (this.xii = void 0);
  }
  InitData(t) {
    (this.k2a = t), this.qni(this.k2a), this.kii(this.k2a);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ];
  }
  OnStart() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "洄游鱼玩法充能条Start"),
      this.RootItem.SetAnchorAlign(2, 2);
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++)
      this.bii(0 === t);
    this.GetTexture(2).SetUIActive(!1), this.SetNormal(!0), this.Qnt();
  }
  OnAfterShow() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "洄游鱼玩法充能条显示"),
      this.hga();
  }
  async OnBeforeHideAsync() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "洄游鱼玩法充能条隐藏"),
      await this.Wti();
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "洄游鱼玩法充能条Destroy"),
      this.RefreshEntity(void 0),
      this.Gii(),
      super.OnBeforeDestroy();
  }
  SetNormal(t) {
    if (this.mii !== t) {
      (this.mii = t),
        this.GetTexture(0).SetUIActive(t),
        this.GetTexture(1).SetUIActive(!t);
      var i = this.mii ? 0 : 1;
      this.GetTexture(3).SetColor(this.q2a[i]);
      for (const s of this.b2a) s.SetColor(this.O2a[i]);
    }
  }
  qni(t) {
    var s = 360 / t;
    let h = 0;
    for (let i = 0; i < t; i++) {
      let t = this.Fii(i);
      (t = t || this.bii()),
        (this.gii.Yaw = h),
        t.SetUIRelativeRotation(this.gii),
        (h += s);
    }
  }
  kii(i) {
    for (let t = 0; t < this.dii.length; t++) {
      var s = this.dii[t],
        h = t < i;
      s.IsUIActiveSelf() !== h && s.SetUIActive(h);
    }
  }
  bii(t = !1) {
    var i = this.GetItem(4),
      s = this.GetItem(5);
    let h = void 0;
    t = (h = t
      ? s
      : LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), i).GetComponentByClass(
          UE.UIItem.StaticClass(),
        ))
      .GetAttachUIChild(0)
      .GetOwner()
      .GetComponentByClass(UE.UISprite.StaticClass());
    return this.dii.push(h), this.b2a.push(t), h;
  }
  Fii(t) {
    return this.dii[t];
  }
  RefreshEntity(t) {
    t
      ? ((this.EntityHandle = t.EntityHandle),
        (this.ActorComponent = t.EntityHandle.Entity.GetComponent(3)))
      : ((this.EntityHandle = void 0), (this.ActorComponent = void 0));
  }
  SetStrengthPercent(t, i) {
    t = i <= 0 ? 0 : t / i;
    this.rNa !== t &&
      (this.oNa < t && -1 !== this.rNa
        ? (this.sNa = (t - this.oNa) / RECOVER_ANIM_TIME)
        : ((this.oNa = t),
          (this.sNa = 0),
          this.GetTexture(3).SetFillAmount(this.oNa),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 18, "洄游鱼玩法充能条设置百分比", [
              "",
              t,
            ])),
      (this.rNa = t),
      this.SetNormal(t >= NORMAL_PERCENT));
  }
  SetRecoverState(t) {
    var i;
    this.nNa !== t &&
      ((this.nNa = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "洄游鱼玩法充能条不衰减", ["enable", t]),
      (i = this.GetTexture(2)),
      t
        ? ((this.HFa = 1),
          this.HOa(),
          (this.VOa = this.oNa),
          (this.gii.Yaw = 360 * this.VOa),
          i.SetUIRelativeRotation(this.gii),
          this.GetTexture(6).SetUIRelativeRotation(this.gii),
          i.SetUIActive(!0))
        : ((this.HFa = 0), this.jOa(), i.SetUIActive(!1)));
  }
  TickRecoverAnim(t) {
    var i, s;
    this.rNa > this.oNa &&
      ((this.oNa += t * this.sNa),
      (this.oNa = Math.min(this.oNa, this.rNa)),
      this.GetTexture(3).SetFillAmount(this.oNa),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Battle",
        18,
        "洄游鱼玩法充能条设置百分比",
        ["目标", this.rNa],
        ["当前", this.oNa],
      ),
      1 === this.HFa
        ? ((i = this.oNa - this.VOa),
          this.GetTexture(6).SetFillAmount(i),
          this.GetTexture(2).SetFillAmount(i),
          this.oNa === this.rNa &&
            ((this.HFa = 2), (this.jFa = RECOVER_STAY_TIME)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              18,
              "洄游鱼玩法充能条设置高亮进入动画",
              ["上限", this.oNa],
              ["下限", this.VOa],
            ))
        : 2 === this.HFa
          ? ((this.jFa -= t), this.jFa <= 0 && (this.HFa = 3))
          : 3 === this.HFa &&
            ((this.VOa += t * this.sNa),
            this.VOa >= this.oNa && ((this.VOa = this.oNa), (this.HFa = 0)),
            (this.gii.Yaw = 360 * this.VOa),
            (i = this.oNa - this.VOa),
            (t = this.GetTexture(2)),
            (s = this.GetTexture(6)),
            t.SetUIRelativeRotation(this.gii),
            s.SetUIRelativeRotation(this.gii),
            t.SetFillAmount(i),
            s.SetFillAmount(i),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Battle",
              18,
              "洄游鱼玩法充能条设置高亮退出",
              ["上限", this.oNa],
              ["下限", this.VOa],
            );
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
      0 === this.Rii && 0 === this.Uii
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
    this.InitTweenAnim(7),
      this.InitTweenAnim(8),
      this.InitTweenAnim(9),
      this.InitTweenAnim(10);
  }
  hga() {
    this.PlayTweenAnim(7);
  }
  async Wti() {
    const t = new CustomPromise_1.CustomPromise();
    this.PlayTweenAnim(8),
      this.Gii(),
      (this.xii = TimerSystem_1.TimerSystem.Delay(() => {
        (this.xii = void 0), this.SetVisible(!1), t.SetResult();
      }, CLOSE_ANIM_TIME)),
      await t.Promise;
  }
  Gii() {
    this.xii &&
      (TimerSystem_1.TimerSystem.Remove(this.xii), (this.xii = void 0));
  }
  HOa() {
    this.StopTweenAnim(10), this.PlayTweenAnim(9);
  }
  jOa() {
    this.StopTweenAnim(9), this.PlayTweenAnim(10);
  }
}
exports.MigrationStrengthUnit = MigrationStrengthUnit;
//# sourceMappingURL=MigrationStrengthUnit.js.map
