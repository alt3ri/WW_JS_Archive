"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BattleUiControl_1 = require("../../BattleUi/BattleUiControl");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DamageUiManager_1 = require("../DamageUiManager");
const ANIM_TIME = 1200;
const MOBLIE_FONT_SIZE_SCALE = 1.5;
const CRITICAL_OFFSET_SCALE = 3;
class DamageView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._2t = Vector_1.Vector.Create()),
      (this.u2t = 0),
      (this.c2t = 0),
      (this.m2t = void 0),
      (this.d2t = void 0),
      (this.l2t = void 0),
      (this.BDn = void 0),
      (this.C2t = void 0),
      (this.g2t = void 0),
      (this.f2t = -0),
      (this.X4s = void 0),
      (this.p2t = 0);
  }
  Init() {
    const i = BattleUiControl_1.BattleUiControl.Pool.GetDamageView();
    this.CreateByActor(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UINiagara],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ];
  }
  OnStart() {
    (this.m2t = this.GetText(0)),
      (this.d2t = this.GetText(2)),
      (this.p2t = this.m2t.GetSize()),
      ModelManager_1.ModelManager.PlatformModel.IsMobile() &&
        this.RefreshFontSize();
  }
  RefreshFontSize() {
    let i;
    ModelManager_1.ModelManager.PlatformModel.IsMobile()
      ? ((i = Math.floor(this.p2t * MOBLIE_FONT_SIZE_SCALE)),
        this.m2t.SetFontSize(i),
        this.d2t.SetFontSize(i))
      : (this.m2t.SetFontSize(this.p2t), this.d2t.SetFontSize(this.p2t));
  }
  DestroyOverride() {
    return (
      BattleUiControl_1.BattleUiControl.Pool.RecycleDamageView(this.RootActor),
      !0
    );
  }
  InitializeData(e, a, s, r, h = !1, _ = !1, o = !1, n = "") {
    if (r) {
      (this.C2t = r), this._2t.DeepCopy(a), (this.g2t = s);
      let i = r.GetRandomOffsetX();
      let t = r.GetRandomOffsetY();
      h && ((i *= CRITICAL_OFFSET_SCALE), (t *= CRITICAL_OFFSET_SCALE));
      (a = CameraController_1.CameraController.CameraLocation),
        (s = Vector_1.Vector.DistSquared(a, this._2t)),
        (r = MathUtils_1.MathUtils.RangeClamp(
          s,
          DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance,
          DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance,
          DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale,
          DamageUiManager_1.DamageUiManager.MinDamageOffsetScale,
        )),
        (a =
          ((this.u2t = i * r),
          (this.c2t = t * r),
          !StringUtils_1.StringUtils.IsEmpty(n))),
        (s = a ? n : _ ? "+" + e : e.toString());
      this.M2t(this.g2t),
        this.S2t(o, h, a),
        this.E2t(h),
        this.y2t(s, h, a),
        this.I2t(),
        this.SetActive(!0),
        this.m2t.SetAlpha(0);
    }
  }
  ClearData() {
    (this.C2t = void 0),
      this.Y4s(),
      this.SetActive(!1),
      this.SetCriticalNiagaraVisible(!1);
  }
  S2t(i, t, e) {
    this.f2t = Time_1.Time.Now + ANIM_TIME;
    (i = this.C2t.GetSequencePath(i, t, e)), (t = DamageView.T2t.get(i));
    if (void 0 === t)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 18, "缺少伤害数字动画", ["sequencePath", i]);
    else {
      this.X4s = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      const a = this.X4s.Num();
      for (let i = 0; i < a; i++) this.X4s.Get(i).Play();
    }
  }
  Y4s() {
    if (this.X4s) {
      const t = this.X4s.Num();
      for (let i = 0; i < t; i++) this.X4s.Get(i).Stop();
      this.X4s = void 0;
    }
  }
  Tick(i) {
    let t;
    this.RootItem &&
      (this.BDn &&
        ((t = this.GetUiNiagara(3)).SetNiagaraSystem(this.BDn),
        t.ActivateSystem(!0),
        (this.BDn = void 0)),
      Time_1.Time.Now > this.f2t
        ? DamageUiManager_1.DamageUiManager.RemoveDamageView(this)
        : ((t =
            DamageUiManager_1.DamageUiManager.ProjectWorldLocationToScreenPosition(
              this._2t.ToUeVector(),
            )),
          this.M2t(t)));
  }
  M2t(i) {
    i = this.L2t(i);
    i && this.D2t(i);
  }
  I2t() {
    const i = DamageUiManager_1.DamageUiManager.TotalDamageViewNum - 1;
    this.RootItem.SetHierarchyIndex(i);
  }
  R2t(i) {
    if (this.l2t !== i) {
      const t = this.GetUiNiagara(3);
      StringUtils_1.StringUtils.IsEmpty(i)
        ? ((this.l2t = void 0),
          t.DeactivateSystem(),
          t.SetNiagaraSystem(void 0))
        : ((this.l2t = i),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.NiagaraSystem,
            (i) => {
              i?.IsValid() && t && (this.BDn = i);
            },
          ));
    }
  }
  U2t(i) {
    const t = this.GetItem(4);
    t.IsUIActiveSelf() !== i && t.SetUIActive(i);
  }
  SetCriticalNiagaraVisible(i) {
    const t = this.GetUiNiagara(3);
    t.IsUIActiveSelf() !== i && t.SetUIActive(i);
  }
  y2t(i, t, e) {
    e
      ? (this.A2t(this.m2t, t),
        this.d2t.GetText() !== i &&
          LguiUtil_1.LguiUtil.SetLocalText(this.d2t, i),
        this.m2t.IsUIActiveSelf() && this.m2t.SetUIActive(!1),
        this.d2t.IsUIActiveSelf() || this.d2t.SetUIActive(!0))
      : (this.A2t(this.m2t, t),
        this.m2t.GetText() !== i && this.m2t.SetText(i),
        this.m2t.IsUIActiveSelf() || this.m2t.SetUIActive(!0),
        this.d2t.IsUIActiveSelf() && this.d2t.SetUIActive(!1));
  }
  E2t(i) {
    i
      ? (this.U2t(!0), this.R2t(this.C2t.GetCriticalNiagaraPath()))
      : this.U2t(!1);
  }
  A2t(i, t) {
    const e = i
      .GetOwner()
      .GetComponentByClass(UE.UIEffectOutline.StaticClass());
    let a = this.C2t.GetTextColor();
    let s = this.C2t.GetStrokeColor();
    t &&
      ((a = this.C2t.GetCriticalTextColor()),
      (s = this.C2t.GetCriticalStrokeColor())),
      i.GetColor().op_Equality(a) || i.SetColor(a),
      e.GetOutlineColor().op_Equality(s) || e.SetOutlineColor(s);
  }
  D2t(i) {
    this.RootItem.SetAnchorOffset(i);
  }
  L2t(i) {
    i = DamageUiManager_1.DamageUiManager.ScreenPositionToLguiPosition(i);
    if (i) return (i.X = i.X + this.u2t), (i.Y = i.Y + this.c2t), i;
  }
}
((exports.DamageView = DamageView).T2t = new Map([
  ["Ani_OwnDamageSequence", 5],
  ["Ani_OwnCriticalDamageSequence", 6],
  ["Ani_MonsterDamageSequence", 7],
  ["Ani_MonsterCriticalDamageSequence", 8],
  ["Ani_BuffSequence", 9],
  ["Ani_SpecialDamage", 10],
  ["Ani_SpecialCriticalDamage", 11],
])),
  (DamageView.v2t = void 0);
// # sourceMappingURL=DamageView.js.map
