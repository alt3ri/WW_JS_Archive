"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitHandleBase = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../../Global"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  HudEntitySet_1 = require("../HudUnitEntity/HudEntitySet"),
  CENTER_Y = 62.5;
class HudUnitHandleBase {
  constructor() {
    (this.Ioi = new Set()),
      (this.HudEntitySet = void 0),
      (this.R$e = void 0),
      (this.x$e = void 0),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.Toi = void 0),
      (this.Due = Vector_1.Vector.Create()),
      (this.DXe = (0, puerts_1.$ref)(0)),
      (this.U$e = new UE.Vector2D(0, 0)),
      (this.A$e = new UE.Vector2D(1, -1)),
      (this.Loi = -0),
      (this.Doi = -0),
      (this.bG = new UE.Vector2D(0, CENTER_Y)),
      (this.Roi = Vector_1.Vector.Create()),
      (this.w$e = Vector_1.Vector.Create()),
      (this.IsHudVisible = !1),
      (this.IsDestroyed = !1);
  }
  Initialize() {
    (this.R$e = Global_1.Global.CharacterController),
      (this.x$e = Global_1.Global.CharacterCameraManager),
      (this.Toi = UiLayer_1.UiLayer.GetBattleViewUnit(1)),
      this.OnAddEvents(),
      this.OnInitialize();
  }
  InitCursorAxis() {
    var t =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MonsterCursorWidthToScreenPercent",
        ) / CommonDefine_1.PERCENTAGE_FACTOR,
      i =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MonsterCursorHeightToScreenPercent",
        ) / CommonDefine_1.PERCENTAGE_FACTOR;
    (this.Loi = this.Toi.GetWidth() * t), (this.Doi = this.Toi.GetHeight() * i);
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
    for (const i of this.Ioi) i.Tick(t);
  }
  AfterTick(t) {
    this.OnAfterTick(t);
    for (const i of this.Ioi) i.AfterTick(t);
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
  OnInputControllerChanged(t, i) {}
  async NewHudUnit(t, i, e = !0, s = !1) {
    t = new t();
    if ((await t.Initialize(i, e, s), !this.IsDestroyed))
      return this.Ioi.add(t), t;
    t.Destroy();
  }
  NewHudUnitWithReturn(t, i, e = !0, s, r = !1) {
    t = new t();
    const o = t;
    return (
      t.Initialize(i, e, r).then(
        () => {
          s && s(o);
        },
        () => {},
      ),
      this.Ioi.add(t),
      o
    );
  }
  DestroyHudUnit(t) {
    t && (t.Destroy(), this.Ioi.delete(t));
  }
  DestroyAllHudUnit() {
    for (const t of this.Ioi) t.Destroy();
    this.Ioi.clear();
  }
  NewHudEntitySet() {
    (this.HudEntitySet = new HudEntitySet_1.HudEntitySet()),
      this.HudEntitySet.Initialize();
  }
  F$e() {
    return (
      this.R$e.GetViewportSize(this.DXe, void 0), (0, puerts_1.$unref)(this.DXe)
    );
  }
  V$e() {
    return (
      (this.U$e.X = this.Toi.GetWidth()),
      (this.U$e.Y = this.Toi.GetHeight()),
      this.U$e
    );
  }
  H$e(t, i, e, s) {
    var r = t.X,
      o = t.Y;
    return s && (r * r) / (i * i) + (o * o) / (e * e) <= 1
      ? t
      : ((s = (i * e) / Math.sqrt(e * e * r * r + i * i * o * o)),
        t.op_Multiply(s));
  }
  ScreenPositionToEllipsePosition(t, i) {
    var e = this.F$e(),
      s = this.V$e(),
      t = t
        .op_Multiply(s.X / e)
        .op_Subtraction(s.op_Multiply(0.5))
        .op_Multiply(this.A$e);
    return this.H$e(t, this.Loi, this.Doi, i).op_Addition(this.bG);
  }
  Uoi(t, i) {
    return i.Subtraction(t, this.Roi), this.Roi;
  }
  K$e() {
    return this.x$e.GetCameraRotation().Vector();
  }
  GetProjectionToFrontPosition(t, i) {
    this.Due.Set(i.X, i.Y, i.Z);
    var i = this.Uoi(t, this.Due),
      e = this.K$e(),
      e = UE.KismetMathLibrary.ProjectVectorOnToVector(
        i.ToUeVector(),
        e,
      ).op_Multiply(2);
    return (
      this.w$e.Set(e.X, e.Y, e.Z),
      i.SubtractionEqual(this.w$e),
      t.Addition(i, this.Due),
      this.Due
    );
  }
  ProjectWorldToScreen(t) {
    if (UE.GameplayStatics.ProjectWorldToScreen(this.R$e, t, this.S$e))
      return (
        (t = (0, puerts_1.$unref)(this.S$e)),
        this.Toi.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t)
      );
  }
  GetInEllipsePosition(t, i) {
    var e = UE.GameplayStatics.ProjectWorldToScreen(this.R$e, i, this.S$e),
      s = (0, puerts_1.$unref)(this.S$e);
    return e
      ? [this.ScreenPositionToEllipsePosition(s, !0), s]
      : ((e = this.GetProjectionToFrontPosition(t, i)),
        UE.GameplayStatics.ProjectWorldToScreen(
          this.R$e,
          e.ToUeVector(),
          this.S$e,
        ),
        [this.ScreenPositionToEllipsePosition(s, !1), void 0]);
  }
}
exports.HudUnitHandleBase = HudUnitHandleBase;
//# sourceMappingURL=HudUnitHandleBase.js.map
