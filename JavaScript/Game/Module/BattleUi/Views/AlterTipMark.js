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
      (this.lXe = void 0),
      (this.mXe = Vector_1.Vector.Create()),
      (this._Xe = (0, puerts_1.$ref)(void 0)),
      (this.yB = Vector_1.Vector.Create()),
      (this.d$e = Vector_1.Vector.Create()),
      (this.C$e = Vector_1.Vector.Create()),
      (this.g$e = (0, puerts_1.$ref)(0)),
      (this.f$e = (0, puerts_1.$ref)(0)),
      (this.p$e = Vector2D_1.Vector2D.Create()),
      (this.v$e = Vector2D_1.Vector2D.Create()),
      (this.pXe = Vector2D_1.Vector2D.Create(1, -1)),
      (this.EXe = 0),
      (this.M$e = void 0),
      (this.S$e = void 0),
      (this.E$e = !1),
      (this.y$e = (t) => 6e-5 * t * t - 0.2 * t + 275),
      GlobalData_1.GlobalData.World &&
        (this.CreateThenShowByResourceIdAsync("UiItem_SneakTip", t),
        (this.lXe = i),
        (this.E$e = e));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.S$e = this.GetItem(0)),
      (this.M$e = this.GetItem(1)),
      this.GetItem(0).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1);
  }
  Update() {
    GlobalData_1.GlobalData.World &&
      this.RootItem &&
      (this.I$e(), this.E$e || this.LXe());
  }
  I$e() {
    var t = UiLayer_1.UiLayer.UiRootItem,
      i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
      e = Global_1.Global.CharacterController,
      s =
        ((this.mXe = Vector_1.Vector.Create(this.lXe.K2_GetActorLocation())),
        UE.GameplayStatics.ProjectWorldToScreen(
          e,
          this.mXe.ToUeVector(),
          this._Xe,
        )),
      s =
        (s ||
          (this.mXe.Subtraction(i, this.yB),
          (s = Global_1.Global.CharacterCameraManager),
          Rotator_1.Rotator.Create(s.GetCameraRotation()).Vector(this.d$e),
          (s = UE.KismetMathLibrary.ProjectVectorOnToVector(
            this.yB.ToUeVector(),
            this.d$e.ToUeVector(),
          ).op_Multiply(2)),
          this.C$e.Set(s.X, s.Y, s.Z),
          this.yB.SubtractionEqual(this.C$e),
          i.Addition(this.yB, this.mXe),
          UE.GameplayStatics.ProjectWorldToScreen(
            e,
            this.mXe.ToUeVector(),
            this._Xe,
          )),
        (0, puerts_1.$unref)(this._Xe)),
      e =
        (e.GetViewportSize(this.g$e, this.f$e), (0, puerts_1.$unref)(this.g$e)),
      s =
        (this.p$e.Set(s.X, s.Y),
        this.v$e.Set(0.5 * t.GetWidth(), 0.5 * t.GetHeight()),
        this.p$e
          .MultiplyEqual(t.GetWidth() / e)
          .SubtractionEqual(this.v$e)
          .MultiplyEqual(this.pXe),
        this.p$e.AdditionEqual(center)),
      t = Vector_1.Vector.Distance(i, this.mXe);
    s.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.y$e(t))),
      this.RootItem.SetAnchorOffset(s.ToUeVector2D());
  }
  LXe() {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(
      this.lXe,
    ).Entity.GetComponent(38).AiController.AiAlert.AlertValue;
    if (0 < t) {
      if (0 < this.EXe) return;
      this.S$e.SetUIActive(!0);
    } else this.S$e.SetUIActive(!1);
    this.M$e.SetUIActive(!1), (this.EXe = t);
  }
  ChangeToError() {
    this.S$e?.SetUIActive(!1), this.M$e?.SetUIActive(!0);
  }
}
exports.AlterTipMark = AlterTipMark;
//# sourceMappingURL=AlterTipMark.js.map
