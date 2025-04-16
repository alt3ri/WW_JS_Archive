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
      (this.jma = new Vector2D_1.Vector2D()),
      (this.dii = []),
      (this.BGa = []),
      (this.gii = new UE.Rotator(0, 0, 0)),
      (this.bGa = [UE.Color.FromHex("#3db9cb"), UE.Color.FromHex("#cb3d55")]),
      (this.qGa = [UE.Color.FromHex("#234063"), UE.Color.FromHex("#633323")]),
      (this.EntityHandle = void 0),
      (this.ActorComponent = void 0),
      (this.s3a = -1),
      (this.a3a = 0),
      (this.h3a = !1),
      (this.h5a = 0),
      (this.l5a = 0),
      (this.l3a = 0),
      (this.jka = 0),
      (this.GGa = 1),
      (this.mii = !1),
      (this.Rii = 0),
      (this.Uii = 0),
      (this.Aii = 0),
      (this.Pii = 0),
      (this.xii = void 0);
  }
  InitData(t) {
    (this.GGa = t), this.qni(this.GGa), this.kii(this.GGa);
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
      Log_1.Log.Debug("Battle", 17, "洄游鱼玩法充能条Start"),
      this.RootItem.SetAnchorAlign(2, 2);
    for (let t = 0; t < PRELOAD_SINGLE_STRENGTH_ITEM_COUNT; t++)
      this.bii(0 === t);
    this.GetTexture(2).SetUIActive(!1), this.SetNormal(!0), this.Qnt();
  }
  OnAfterShow() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "洄游鱼玩法充能条显示"),
      this.hga();
  }
  async OnBeforeHideAsync() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "洄游鱼玩法充能条隐藏"),
      await this.Wti();
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "洄游鱼玩法充能条Destroy"),
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
      this.GetTexture(3).SetColor(this.bGa[i]);
      for (const s of this.BGa) s.SetColor(this.qGa[i]);
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
    return this.dii.push(h), this.BGa.push(t), h;
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
    this.s3a !== t &&
      (this.a3a < t && -1 !== this.s3a
        ? (this.l3a = (t - this.a3a) / RECOVER_ANIM_TIME)
        : ((this.a3a = t),
          (this.l3a = 0),
          this.GetTexture(3).SetFillAmount(this.a3a),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 17, "洄游鱼玩法充能条设置百分比", [
              "",
              t,
            ])),
      (this.s3a = t),
      this.SetNormal(t >= NORMAL_PERCENT));
  }
  SetRecoverState(t) {
    var i;
    this.h3a !== t &&
      ((this.h3a = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "洄游鱼玩法充能条不衰减", ["enable", t]),
      (i = this.GetTexture(2)),
      t
        ? ((this.h5a = 1),
          this.Wka(),
          (this.jka = this.a3a),
          (this.gii.Yaw = 360 * this.jka),
          i.SetUIRelativeRotation(this.gii),
          this.GetTexture(6).SetUIRelativeRotation(this.gii),
          i.SetUIActive(!0))
        : ((this.h5a = 0), this.Qka(), i.SetUIActive(!1)));
  }
  TickRecoverAnim(t) {
    var i, s;
    this.s3a > this.a3a &&
      ((this.a3a += t * this.l3a),
      (this.a3a = Math.min(this.a3a, this.s3a)),
      this.GetTexture(3).SetFillAmount(this.a3a),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Battle",
        17,
        "洄游鱼玩法充能条设置百分比",
        ["目标", this.s3a],
        ["当前", this.a3a],
      ),
      1 === this.h5a
        ? ((i = this.a3a - this.jka),
          this.GetTexture(6).SetFillAmount(i),
          this.GetTexture(2).SetFillAmount(i),
          this.a3a === this.s3a &&
            ((this.h5a = 2), (this.l5a = RECOVER_STAY_TIME)),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              17,
              "洄游鱼玩法充能条设置高亮进入动画",
              ["上限", this.a3a],
              ["下限", this.jka],
            ))
        : 2 === this.h5a
          ? ((this.l5a -= t), this.l5a <= 0 && (this.h5a = 3))
          : 3 === this.h5a &&
            ((this.jka += t * this.l3a),
            this.jka >= this.a3a && ((this.jka = this.a3a), (this.h5a = 0)),
            (this.gii.Yaw = 360 * this.jka),
            (i = this.a3a - this.jka),
            (t = this.GetTexture(2)),
            (s = this.GetTexture(6)),
            t.SetUIRelativeRotation(this.gii),
            s.SetUIRelativeRotation(this.gii),
            t.SetFillAmount(i),
            s.SetFillAmount(i),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Battle",
              17,
              "洄游鱼玩法充能条设置高亮退出",
              ["上限", this.a3a],
              ["下限", this.jka],
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
        this.jma,
      )) &&
      ((i = this.jma.X),
      (s = this.jma.Y),
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
  Wka() {
    this.StopTweenAnim(10), this.PlayTweenAnim(9);
  }
  Qka() {
    this.StopTweenAnim(9), this.PlayTweenAnim(10);
  }
}
exports.MigrationStrengthUnit = MigrationStrengthUnit;
//# sourceMappingURL=MigrationStrengthUnit.js.map
