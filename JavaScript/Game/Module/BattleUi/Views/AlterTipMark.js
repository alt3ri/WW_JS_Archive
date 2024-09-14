"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlterTipMark = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  CENTER_Y = 62.5,
  center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
class AlterTipMark extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, e) {
    super(),
      (this.E$e = void 0),
      (this.T$e = Vector_1.Vector.Create()),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.yB = Vector_1.Vector.Create()),
      (this.LYe = Vector_1.Vector.Create()),
      (this.DYe = Vector_1.Vector.Create()),
      (this.RYe = (0, puerts_1.$ref)(0)),
      (this.UYe = (0, puerts_1.$ref)(0)),
      (this.AYe = Vector2D_1.Vector2D.Create()),
      (this.PYe = Vector2D_1.Vector2D.Create()),
      (this.A$e = Vector2D_1.Vector2D.Create(1, -1)),
      (this.B$e = 0),
      (this.xYe = void 0),
      (this.wYe = void 0),
      (this.BYe = !1),
      (this.bYe = (t) => 6e-5 * t * t - 0.2 * t + 275),
      GlobalData_1.GlobalData.World &&
        (this.CreateThenShowByResourceIdAsync("UiItem_SneakTip", t),
        (this.E$e = i),
        (this.BYe = e));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.wYe = this.GetItem(0)),
      (this.xYe = this.GetItem(1)),
      this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1);
  }
  Update() {
    GlobalData_1.GlobalData.World &&
      this.RootItem &&
      (this.qYe(), this.BYe || this.N$e());
  }
  qYe() {
    var t = UiLayer_1.UiLayer.UiRootItem,
      i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
      e = Global_1.Global.CharacterController,
      s =
        ((this.T$e = Vector_1.Vector.Create(this.E$e.K2_GetActorLocation())),
        UE.GameplayStatics.ProjectWorldToScreen(
          e,
          this.T$e.ToUeVector(),
          this.S$e,
        )),
      s =
        (s ||
          (this.T$e.Subtraction(i, this.yB),
          (s = Global_1.Global.CharacterCameraManager),
          Rotator_1.Rotator.Create(s.GetCameraRotation()).Vector(this.LYe),
          (s = UE.KismetMathLibrary.ProjectVectorOnToVector(
            this.yB.ToUeVector(),
            this.LYe.ToUeVector(),
          ).op_Multiply(2)),
          this.DYe.Set(s.X, s.Y, s.Z),
          this.yB.SubtractionEqual(this.DYe),
          i.Addition(this.yB, this.T$e),
          UE.GameplayStatics.ProjectWorldToScreen(
            e,
            this.T$e.ToUeVector(),
            this.S$e,
          )),
        (0, puerts_1.$unref)(this.S$e)),
      e =
        (e.GetViewportSize(this.RYe, this.UYe), (0, puerts_1.$unref)(this.RYe)),
      s =
        (this.AYe.Set(s.X, s.Y),
        this.PYe.Set(0.5 * t.GetWidth(), 0.5 * t.GetHeight()),
        this.AYe.MultiplyEqual(t.GetWidth() / e)
          .SubtractionEqual(this.PYe)
          .MultiplyEqual(this.A$e),
        this.AYe.AdditionEqual(center)),
      t = Vector_1.Vector.Distance(i, this.T$e);
    s.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.bYe(t))),
      this.RootItem.SetAnchorOffset(s.ToUeVector2D());
  }
  N$e() {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(
      this.E$e,
    ).Entity.GetComponent(40).AiController.AiAlert.AlertValue;
    if (0 < t) {
      if (0 < this.B$e) return;
      this.wYe.SetUIActive(!0);
    } else this.wYe.SetUIActive(!1);
    this.xYe.SetUIActive(!1), (this.B$e = t);
  }
  ChangeToError() {
    this.wYe?.SetUIActive(!1), this.xYe?.SetUIActive(!0);
  }
}
exports.AlterTipMark = AlterTipMark;
//# sourceMappingURL=AlterTipMark.js.map
