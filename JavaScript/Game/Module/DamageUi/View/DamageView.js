"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  CameraController_1 = require("../../../Camera/CameraController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BattleUiControl_1 = require("../../BattleUi/BattleUiControl"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DamageUiManager_1 = require("../DamageUiManager"),
  ANIM_TIME = 1200,
  MOBLIE_FONT_SIZE_SCALE = 1.5,
  CRITICAL_OFFSET_SCALE = 3;
class DamageView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uFt = Vector_1.Vector.Create()),
      (this.cFt = 0),
      (this.mFt = 0),
      (this.dFt = void 0),
      (this.CFt = void 0),
      (this._Ft = void 0),
      (this.FUn = void 0),
      (this.gFt = void 0),
      (this.fFt = void 0),
      (this.pFt = -0),
      (this.ejs = void 0),
      (this.vFt = 0);
  }
  Init() {
    var i = BattleUiControl_1.BattleUiControl.Pool.GetDamageView();
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
    (this.dFt = this.GetText(0)),
      (this.CFt = this.GetText(2)),
      (this.vFt = this.dFt.GetSize()),
      Info_1.Info.IsInTouch() && this.RefreshFontSize();
  }
  RefreshFontSize() {
    var i;
    Info_1.Info.IsInTouch()
      ? ((i = Math.floor(this.vFt * MOBLIE_FONT_SIZE_SCALE)),
        this.dFt.SetFontSize(i),
        this.CFt.SetFontSize(i))
      : (this.dFt.SetFontSize(this.vFt), this.CFt.SetFontSize(this.vFt));
  }
  DestroyOverride() {
    return (
      BattleUiControl_1.BattleUiControl.Pool.RecycleDamageView(this.RootActor),
      !0
    );
  }
  InitializeData(e, s, a, r, h = !1, o = !1, _ = !1, n = "") {
    if (r) {
      (this.gFt = r), this.uFt.DeepCopy(s), (this.fFt = a);
      let i = r.GetRandomOffsetX(),
        t = r.GetRandomOffsetY();
      h && ((i *= CRITICAL_OFFSET_SCALE), (t *= CRITICAL_OFFSET_SCALE));
      (s = CameraController_1.CameraController.CameraLocation),
        (a = Vector_1.Vector.DistSquared(s, this.uFt)),
        (r = MathUtils_1.MathUtils.RangeClamp(
          a,
          DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance,
          DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance,
          DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale,
          DamageUiManager_1.DamageUiManager.MinDamageOffsetScale,
        )),
        (s =
          ((this.cFt = i * r),
          (this.mFt = t * r),
          !StringUtils_1.StringUtils.IsEmpty(n))),
        (a = s ? n : o ? "+" + e : e.toString());
      this.EFt(this.fFt),
        this.SFt(_, h, s),
        this.yFt(h),
        this.IFt(a, h, s),
        this.TFt(),
        this.SetActive(!0),
        this.dFt.SetAlpha(0);
    }
  }
  ClearData() {
    (this.gFt = void 0),
      this.tjs(),
      this.SetActive(!1),
      this.SetCriticalNiagaraVisible(!1);
  }
  SFt(i, t, e) {
    this.pFt = Time_1.Time.Now + ANIM_TIME;
    (i = this.gFt.GetSequencePath(i, t, e)), (t = DamageView.LFt.get(i));
    if (void 0 === t)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 18, "缺少伤害数字动画", ["sequencePath", i]);
    else {
      this.ejs = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      var s = this.ejs.Num();
      for (let i = 0; i < s; i++) this.ejs.Get(i).Play();
    }
  }
  tjs() {
    if (this.ejs) {
      var t = this.ejs.Num();
      for (let i = 0; i < t; i++) this.ejs.Get(i).Stop();
      this.ejs = void 0;
    }
  }
  Tick(i) {
    var t;
    this.RootItem &&
      (this.FUn &&
        ((t = this.GetUiNiagara(3)).SetNiagaraSystem(this.FUn),
        t.ActivateSystem(!0),
        (this.FUn = void 0)),
      Time_1.Time.Now > this.pFt
        ? DamageUiManager_1.DamageUiManager.RemoveDamageView(this)
        : ((t =
            DamageUiManager_1.DamageUiManager.ProjectWorldLocationToScreenPosition(
              this.uFt.ToUeVector(),
            )),
          this.EFt(t)));
  }
  EFt(i) {
    i = this.DFt(i);
    i && this.RFt(i);
  }
  TFt() {
    var i = DamageUiManager_1.DamageUiManager.TotalDamageViewNum - 1;
    this.RootItem.SetHierarchyIndex(i);
  }
  UFt(i) {
    if (this._Ft !== i) {
      const t = this.GetUiNiagara(3);
      StringUtils_1.StringUtils.IsEmpty(i)
        ? ((this._Ft = void 0),
          t.DeactivateSystem(),
          t.SetNiagaraSystem(void 0))
        : ((this._Ft = i),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.NiagaraSystem,
            (i) => {
              i?.IsValid() && t && (this.FUn = i);
            },
          ));
    }
  }
  AFt(i) {
    var t = this.GetItem(4);
    t.IsUIActiveSelf() !== i && t.SetUIActive(i);
  }
  SetCriticalNiagaraVisible(i) {
    var t = this.GetUiNiagara(3);
    t.IsUIActiveSelf() !== i && t.SetUIActive(i);
  }
  IFt(i, t, e) {
    e
      ? (this.PFt(this.dFt, t),
        this.CFt.GetText() !== i &&
          LguiUtil_1.LguiUtil.SetLocalText(this.CFt, i),
        this.dFt.IsUIActiveSelf() && this.dFt.SetUIActive(!1),
        this.CFt.IsUIActiveSelf() || this.CFt.SetUIActive(!0))
      : (this.PFt(this.dFt, t),
        this.dFt.GetText() !== i && this.dFt.SetText(i),
        this.dFt.IsUIActiveSelf() || this.dFt.SetUIActive(!0),
        this.CFt.IsUIActiveSelf() && this.CFt.SetUIActive(!1));
  }
  yFt(i) {
    i
      ? (this.AFt(!0), this.UFt(this.gFt.GetCriticalNiagaraPath()))
      : this.AFt(!1);
  }
  PFt(i, t) {
    var e = i.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
    let s = this.gFt.GetTextColor(),
      a = this.gFt.GetStrokeColor();
    t &&
      ((s = this.gFt.GetCriticalTextColor()),
      (a = this.gFt.GetCriticalStrokeColor())),
      i.GetColor().op_Equality(s) || i.SetColor(s),
      e.GetOutlineColor().op_Equality(a) || e.SetOutlineColor(a);
  }
  RFt(i) {
    this.RootItem.SetAnchorOffset(i);
  }
  DFt(i) {
    i = DamageUiManager_1.DamageUiManager.ScreenPositionToLguiPosition(i);
    if (i) return (i.X = i.X + this.cFt), (i.Y = i.Y + this.mFt), i;
  }
}
((exports.DamageView = DamageView).LFt = new Map([
  ["Ani_OwnDamageSequence", 5],
  ["Ani_OwnCriticalDamageSequence", 6],
  ["Ani_MonsterDamageSequence", 7],
  ["Ani_MonsterCriticalDamageSequence", 8],
  ["Ani_BuffSequence", 9],
  ["Ani_SpecialDamage", 10],
  ["Ani_SpecialCriticalDamage", 11],
])),
  (DamageView.MFt = void 0);
//# sourceMappingURL=DamageView.js.map
