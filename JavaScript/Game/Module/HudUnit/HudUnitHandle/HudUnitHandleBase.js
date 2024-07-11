"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitHandleBase = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../Global");
const UiLayer_1 = require("../../../Ui/UiLayer");
const HudEntitySet_1 = require("../HudUnitEntity/HudEntitySet");
const CENTER_Y = 62.5;
class HudUnitHandleBase {
  constructor() {
    (this.Iii = new Set()),
      (this.HudEntitySet = void 0),
      (this.gXe = void 0),
      (this.MXe = void 0),
      (this._Xe = (0, puerts_1.$ref)(void 0)),
      (this.Tii = void 0),
      (this.Due = Vector_1.Vector.Create()),
      (this.CQe = (0, puerts_1.$ref)(0)),
      (this.fXe = new UE.Vector2D(0, 0)),
      (this.pXe = new UE.Vector2D(1, -1)),
      (this.Lii = -0),
      (this.Dii = -0),
      (this.bG = new UE.Vector2D(0, CENTER_Y)),
      (this.Rii = Vector_1.Vector.Create()),
      (this.SXe = Vector_1.Vector.Create()),
      (this.IsHudVisible = !1),
      (this.IsDestroyed = !1);
  }
  Initialize() {
    (this.gXe = Global_1.Global.CharacterController),
      (this.MXe = Global_1.Global.CharacterCameraManager),
      (this.Tii = UiLayer_1.UiLayer.GetBattleViewUnit(1));
    const t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorWidthToScreenPercent",
      ) / CommonDefine_1.PERCENTAGE_FACTOR;
    const i =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "MonsterCursorHeightToScreenPercent",
      ) / CommonDefine_1.PERCENTAGE_FACTOR;
    (this.Lii = this.Tii.GetWidth() * t),
      (this.Dii = this.Tii.GetHeight() * i),
      this.OnAddEvents(),
      this.OnInitialize();
  }
  Destroy() {
    this.OnDestroyed(),
      this.OnRemoveEvents(),
      this.DestroyAllHudUnit(),
      (this.IsDestroyed = !0),
      this.HudEntitySet?.Clear(),
      (this.HudEntitySet = void 0);
  }
  Tick(t) {
    this.OnTick(t);
    for (const i of this.Iii) i.Tick(t);
  }
  AfterTick(t) {
    this.OnAfterTick(t);
    for (const i of this.Iii) i.AfterTick(t);
  }
  OnInitialize() {}
  OnDestroyed() {}
  OnTick(t) {}
  OnAfterTick(t) {}
  OnShowHud() {
    this.IsHudVisible = !0;
  }
  OnHideHud() {
    this.IsHudVisible = !1;
  }
  async NewHudUnit(t, i, e = !0) {
    t = new t();
    if ((await t.Initialize(i, e), !this.IsDestroyed))
      return this.Iii.add(t), t;
    t.Destroy();
  }
  NewHudUnitWithReturn(t, i, e = !0, s) {
    t = new t();
    const r = t;
    return (
      t.Initialize(i, e).then(
        () => {
          s && s(r);
        },
        () => {},
      ),
      this.Iii.add(t),
      r
    );
  }
  DestroyHudUnit(t) {
    t && (t.Destroy(), this.Iii.delete(t));
  }
  DestroyAllHudUnit() {
    for (const t of this.Iii) t.Destroy();
    this.Iii.clear();
  }
  NewHudEntitySet() {
    (this.HudEntitySet = new HudEntitySet_1.HudEntitySet()),
      this.HudEntitySet.Initialize();
  }
  UXe() {
    return (
      this.gXe.GetViewportSize(this.CQe, void 0), (0, puerts_1.$unref)(this.CQe)
    );
  }
  AXe() {
    return (
      (this.fXe.X = this.Tii.GetWidth()),
      (this.fXe.Y = this.Tii.GetHeight()),
      this.fXe
    );
  }
  PXe(t, i, e, s) {
    const r = t.X;
    const o = t.Y;
    return s && (r * r) / (i * i) + (o * o) / (e * e) <= 1
      ? t
      : ((s = (i * e) / Math.sqrt(e * e * r * r + i * i * o * o)),
        t.op_Multiply(s));
  }
  ScreenPositionToEllipsePosition(t, i) {
    const e = this.UXe();
    const s = this.AXe();
    var t = t
      .op_Multiply(s.X / e)
      .op_Subtraction(s.op_Multiply(0.5))
      .op_Multiply(this.pXe);
    return this.PXe(t, this.Lii, this.Dii, i).op_Addition(this.bG);
  }
  Uii(t, i) {
    return i.Subtraction(t, this.Rii), this.Rii;
  }
  BXe() {
    return this.MXe.GetCameraRotation().Vector();
  }
  GetProjectionToFrontPosition(t, i) {
    this.Due.Set(i.X, i.Y, i.Z);
    var i = this.Uii(t, this.Due);
    var e = this.BXe();
    var e = UE.KismetMathLibrary.ProjectVectorOnToVector(
      i.ToUeVector(),
      e,
    ).op_Multiply(2);
    return (
      this.SXe.Set(e.X, e.Y, e.Z),
      i.SubtractionEqual(this.SXe),
      t.Addition(i, this.Due),
      this.Due
    );
  }
  ProjectWorldToScreen(t) {
    if (UE.GameplayStatics.ProjectWorldToScreen(this.gXe, t, this._Xe))
      return (
        (t = (0, puerts_1.$unref)(this._Xe)),
        this.Tii.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t)
      );
  }
  GetInEllipsePosition(t, i) {
    let e = UE.GameplayStatics.ProjectWorldToScreen(this.gXe, i, this._Xe);
    const s = (0, puerts_1.$unref)(this._Xe);
    return e
      ? [this.ScreenPositionToEllipsePosition(s, !0), s]
      : ((e = this.GetProjectionToFrontPosition(t, i)),
        UE.GameplayStatics.ProjectWorldToScreen(
          this.gXe,
          e.ToUeVector(),
          this._Xe,
        ),
        [this.ScreenPositionToEllipsePosition(s, !1), void 0]);
  }
}
exports.HudUnitHandleBase = HudUnitHandleBase;
// # sourceMappingURL=HudUnitHandleBase.js.map
