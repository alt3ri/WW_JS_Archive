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
      (this.M$e = void 0),
      (this.E$e = void 0),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.y$e = 0),
      (this.I$e = 0),
      (this.T$e = Vector_1.Vector.Create()),
      (this.L$e = void 0),
      (this.D$e = void 0),
      (this.$Pe = void 0),
      (this.R$e = void 0),
      (this.U$e = new UE.Vector2D(0, 0)),
      (this.A$e = new UE.Vector2D(1, -1)),
      (this.DXe = (0, puerts_1.$ref)(0)),
      (this.Due = Vector_1.Vector.Create()),
      (this.Nme = Vector_1.Vector.Create()),
      (this.P$e = Vector_1.Vector.Create()),
      (this.x$e = void 0),
      (this.w$e = Vector_1.Vector.Create()),
      (this.B$e = 0),
      GlobalData_1.GlobalData.World &&
        (this.CreateThenShowByResourceIdAsync("UiItem_SneakItem_Prefab", t),
        (this.M$e = i ? i.ToUeVector() : new UE.Vector()),
        (this.E$e = s),
        (t = UiLayer_1.UiLayer.UiRootItem),
        (this.y$e = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2)),
        (this.I$e = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2)),
        (this.R$e = Global_1.Global.CharacterController),
        (this.x$e = Global_1.Global.CharacterCameraManager));
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
      (this.L$e = this.GetSprite(1)),
      (this.D$e = this.GetSprite(2)),
      this.D$e.SetFillAmount(0),
      this.L$e.SetFillAmount(0),
      this.D$e.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
      this.L$e.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
      this.GetItem(0).SetUIActive(!1),
      this.GetSprite(1).SetUIActive(!1),
      this.GetSprite(2).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    (this.M$e = void 0),
      (this.E$e = void 0),
      (this.S$e = void 0),
      (this.T$e = void 0),
      (this.L$e = void 0),
      (this.D$e = void 0),
      (this.$Pe = void 0),
      (this.R$e = void 0),
      (this.U$e = void 0),
      (this.A$e = void 0),
      (this.DXe = void 0),
      (this.Due = void 0),
      (this.Nme = void 0),
      (this.P$e = void 0),
      (this.x$e = void 0),
      (this.w$e = void 0);
  }
  Update() {
    var t;
    GlobalData_1.GlobalData.World &&
      this.RootItem &&
      (GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ||
        this.RootItem.SetUIActive(!1),
      (t = this.b$e()),
      this.T$e.Set(t.X, t.Y, t.Z),
      this.RootItem.SetUIActive(!0),
      this.$Pe.SetUIActive(!0),
      this.L$e.SetUIActive(!0),
      this.D$e.SetUIActive(!0),
      (t = this.q$e(this.E$e)),
      (t = this.G$e(t)),
      this.RootItem.SetUIRelativeRotation(
        new UE.Rotator(0, Math.atan2(t.Y, t.X) * RAD_2_DEG - 90, 0),
      ),
      this.N$e());
  }
  b$e() {
    return ObjectUtils_1.ObjectUtils.IsValid(this.E$e)
      ? this.E$e.K2_GetActorLocation()
      : this.M$e;
  }
  q$e(t) {
    return t.K2_GetActorLocation();
  }
  G$e(t) {
    if (UE.GameplayStatics.ProjectWorldToScreen(this.R$e, t, this.S$e)) {
      const i = (0, puerts_1.$unref)(this.S$e);
      return this.O$e(i, !0);
    }
    t = this.k$e(t);
    UE.GameplayStatics.ProjectWorldToScreen(this.R$e, t.ToUeVector(), this.S$e);
    const i = (0, puerts_1.$unref)(this.S$e);
    return this.O$e(i, !1);
  }
  O$e(t, i) {
    var s = this.F$e(),
      e = this.V$e(),
      t = t
        .op_Multiply(e.X / s)
        .op_Subtraction(e.op_Multiply(0.5))
        .op_Multiply(this.A$e);
    return this.H$e(t, this.y$e, this.I$e, i).op_Addition(
      center.ToUeVector2D(),
    );
  }
  F$e() {
    return (
      this.R$e.GetViewportSize(this.DXe, void 0), (0, puerts_1.$unref)(this.DXe)
    );
  }
  V$e() {
    var t = UiLayer_1.UiLayer.UiRootItem;
    return (this.U$e.X = t.GetWidth()), (this.U$e.Y = t.GetHeight()), this.U$e;
  }
  H$e(t, i, s, e) {
    var r = t.X,
      h = t.Y;
    return e && (r * r) / (i * i) + (h * h) / (s * s) <= 1
      ? t
      : ((e = (i * s) / Math.sqrt(s * s * r * r + i * i * h * h)),
        t.op_Multiply(e));
  }
  k$e(t) {
    this.Due.Set(t.X, t.Y, t.Z);
    var t = this.j$e(),
      i = this.W$e(this.Due),
      s = this.K$e(),
      s = UE.KismetMathLibrary.ProjectVectorOnToVector(
        i.ToUeVector(),
        s,
      ).op_Multiply(2);
    return (
      this.w$e.Set(s.X, s.Y, s.Z),
      i.SubtractionEqual(this.w$e),
      t.Addition(i, this.Due),
      this.Due
    );
  }
  j$e() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        1,
      ).ActorLocation;
    return this.Nme.Set(t.X, t.Y, t.Z), this.Nme;
  }
  W$e(t) {
    var i = this.j$e();
    return t.Subtraction(i, this.P$e), this.P$e;
  }
  K$e() {
    return this.x$e.GetCameraRotation().Vector();
  }
  N$e() {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(
      this.E$e,
    ).Entity.GetComponent(39).AiController.AiAlert.AlertValue;
    this.D$e.SetFillAmount(START_FILL_AMOUNT + t / MAX_ALERT / 2),
      this.L$e.SetFillAmount(START_FILL_AMOUNT + t / MAX_ALERT / 2),
      t < 50
        ? 0 !== this.B$e &&
          ((this.B$e = 0),
          this.D$e.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
          this.L$e.SetColor(UE.Color.FromHex(NORMAL_COLOR)))
        : t < 80
          ? 50 !== this.B$e &&
            ((this.B$e = 50),
            this.D$e.SetColor(UE.Color.FromHex(WARNING_COLOR)),
            this.L$e.SetColor(UE.Color.FromHex(WARNING_COLOR)))
          : 80 !== this.B$e &&
            ((this.B$e = 80),
            this.D$e.SetColor(UE.Color.FromHex(ERROR_COLOR)),
            this.L$e.SetColor(UE.Color.FromHex(ERROR_COLOR)));
  }
}
exports.AlterMark = AlterMark;
//# sourceMappingURL=AlterMark.js.map
