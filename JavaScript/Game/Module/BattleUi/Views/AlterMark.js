"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlterMark = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  CENTER_Y = 62.5,
  MAX_A = 1176,
  MARGIN_A = 1008,
  MAX_B = 712.5,
  MARGIN_B = 495,
  center = Vector2D_1.Vector2D.Create(0, CENTER_Y),
  RAD_2_DEG = 180 / Math.PI,
  MAX_ALERT = 100,
  START_FILL_AMOUNT = 0.5,
  NORMAL_COLOR = "B7E6E7FF",
  WARNING_COLOR = "EDDC4DFF",
  ERROR_COLOR = "F01D1BFF";
class AlterMark extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super(),
      (this.hXe = void 0),
      (this.lXe = void 0),
      (this._Xe = (0, puerts_1.$ref)(void 0)),
      (this.uXe = 0),
      (this.cXe = 0),
      (this.mXe = Vector_1.Vector.Create()),
      (this.dXe = void 0),
      (this.CXe = void 0),
      (this.$Pe = void 0),
      (this.gXe = void 0),
      (this.fXe = new UE.Vector2D(0, 0)),
      (this.pXe = new UE.Vector2D(1, -1)),
      (this.CQe = (0, puerts_1.$ref)(0)),
      (this.Due = Vector_1.Vector.Create()),
      (this.Nme = Vector_1.Vector.Create()),
      (this.vXe = Vector_1.Vector.Create()),
      (this.MXe = void 0),
      (this.SXe = Vector_1.Vector.Create()),
      (this.EXe = 0),
      GlobalData_1.GlobalData.World &&
        (this.CreateThenShowByResourceIdAsync("UiItem_SneakItem_Prefab", t),
        (this.hXe = i ? i.ToUeVector() : new UE.Vector()),
        (this.lXe = s),
        (t = UiLayer_1.UiLayer.UiRootItem),
        (this.uXe = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2)),
        (this.cXe = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2)),
        (this.gXe = Global_1.Global.CharacterController),
        (this.MXe = Global_1.Global.CharacterCameraManager));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    (this.$Pe = this.GetItem(0)),
      (this.dXe = this.GetSprite(1)),
      (this.CXe = this.GetSprite(2)),
      this.CXe.SetFillAmount(0),
      this.dXe.SetFillAmount(0),
      this.CXe.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
      this.dXe.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
      this.GetItem(0).SetUIActive(!1),
      this.GetSprite(1).SetUIActive(!1),
      this.GetSprite(2).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.hXe = void 0),
      (this.lXe = void 0),
      (this._Xe = void 0),
      (this.mXe = void 0),
      (this.dXe = void 0),
      (this.CXe = void 0),
      (this.$Pe = void 0),
      (this.gXe = void 0),
      (this.fXe = void 0),
      (this.pXe = void 0),
      (this.CQe = void 0),
      (this.Due = void 0),
      (this.Nme = void 0),
      (this.vXe = void 0),
      (this.MXe = void 0),
      (this.SXe = void 0);
  }
  Update() {
    var t;
    GlobalData_1.GlobalData.World &&
      this.RootItem &&
      (GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ||
        this.RootItem.SetUIActive(!1),
      (t = this.yXe()),
      this.mXe.Set(t.X, t.Y, t.Z),
      this.RootItem.SetUIActive(!0),
      this.$Pe.SetUIActive(!0),
      this.dXe.SetUIActive(!0),
      this.CXe.SetUIActive(!0),
      (t = this.IXe(this.lXe)),
      (t = this.TXe(t)),
      this.RootItem.SetUIRelativeRotation(
        new UE.Rotator(0, Math.atan2(t.Y, t.X) * RAD_2_DEG - 90, 0),
      ),
      this.LXe());
  }
  yXe() {
    return ObjectUtils_1.ObjectUtils.IsValid(this.lXe)
      ? this.lXe.K2_GetActorLocation()
      : this.hXe;
  }
  IXe(t) {
    return t.K2_GetActorLocation();
  }
  TXe(t) {
    if (UE.GameplayStatics.ProjectWorldToScreen(this.gXe, t, this._Xe)) {
      const i = (0, puerts_1.$unref)(this._Xe);
      return this.DXe(i, !0);
    }
    t = this.RXe(t);
    UE.GameplayStatics.ProjectWorldToScreen(this.gXe, t.ToUeVector(), this._Xe);
    const i = (0, puerts_1.$unref)(this._Xe);
    return this.DXe(i, !1);
  }
  DXe(t, i) {
    var s = this.UXe(),
      e = this.AXe(),
      t = t
        .op_Multiply(e.X / s)
        .op_Subtraction(e.op_Multiply(0.5))
        .op_Multiply(this.pXe);
    return this.PXe(t, this.uXe, this.cXe, i).op_Addition(
      center.ToUeVector2D(),
    );
  }
  UXe() {
    return (
      this.gXe.GetViewportSize(this.CQe, void 0), (0, puerts_1.$unref)(this.CQe)
    );
  }
  AXe() {
    var t = UiLayer_1.UiLayer.UiRootItem;
    return (this.fXe.X = t.GetWidth()), (this.fXe.Y = t.GetHeight()), this.fXe;
  }
  PXe(t, i, s, e) {
    var r = t.X,
      h = t.Y;
    return e && (r * r) / (i * i) + (h * h) / (s * s) <= 1
      ? t
      : ((e = (i * s) / Math.sqrt(s * s * r * r + i * i * h * h)),
        t.op_Multiply(e));
  }
  RXe(t) {
    this.Due.Set(t.X, t.Y, t.Z);
    var t = this.xXe(),
      i = this.wXe(this.Due),
      s = this.BXe(),
      s = UE.KismetMathLibrary.ProjectVectorOnToVector(
        i.ToUeVector(),
        s,
      ).op_Multiply(2);
    return (
      this.SXe.Set(s.X, s.Y, s.Z),
      i.SubtractionEqual(this.SXe),
      t.Addition(i, this.Due),
      this.Due
    );
  }
  xXe() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        1,
      ).ActorLocation;
    return this.Nme.Set(t.X, t.Y, t.Z), this.Nme;
  }
  wXe(t) {
    var i = this.xXe();
    return t.Subtraction(i, this.vXe), this.vXe;
  }
  BXe() {
    return this.MXe.GetCameraRotation().Vector();
  }
  LXe() {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(
      this.lXe,
    ).Entity.GetComponent(38).AiController.AiAlert.AlertValue;
    this.CXe.SetFillAmount(START_FILL_AMOUNT + t / MAX_ALERT / 2),
      this.dXe.SetFillAmount(START_FILL_AMOUNT + t / MAX_ALERT / 2),
      t < 50
        ? 0 !== this.EXe &&
          ((this.EXe = 0),
          this.CXe.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
          this.dXe.SetColor(UE.Color.FromHex(NORMAL_COLOR)))
        : t < 80
          ? 50 !== this.EXe &&
            ((this.EXe = 50),
            this.CXe.SetColor(UE.Color.FromHex(WARNING_COLOR)),
            this.dXe.SetColor(UE.Color.FromHex(WARNING_COLOR)))
          : 80 !== this.EXe &&
            ((this.EXe = 80),
            this.CXe.SetColor(UE.Color.FromHex(ERROR_COLOR)),
            this.dXe.SetColor(UE.Color.FromHex(ERROR_COLOR)));
  }
}
exports.AlterMark = AlterMark;
//# sourceMappingURL=AlterMark.js.map
