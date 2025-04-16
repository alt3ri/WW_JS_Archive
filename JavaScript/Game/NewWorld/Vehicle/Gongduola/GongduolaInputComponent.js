"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? i
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(i, e))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, i, e, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(i, e, n) : s(i, e)) || n);
    return 3 < r && n && Object.defineProperty(i, e, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GongduolaInputComponent = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  InputEnums_1 = require("../../../Input/InputEnums"),
  PhotographController_1 = require("../../../Module/Photograph/PhotographController"),
  ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  VehicleInputComponent_1 = require("../Common/VehicleInputComponent"),
  SKILL_ID_RIDER_SHARING = 100034;
let GongduolaInputComponent = class GongduolaInputComponent extends VehicleInputComponent_1.VehicleInputComponent {
  constructor() {
    super(...arguments),
      (this.TurningForceInputFactor = 0),
      (this.TurnForwardInputMinX = 0),
      (this.TurnBackwardInputMaxX = 0),
      (this.MaxForwardThreshold = 1),
      (this.MaxRightThreshold = 1),
      (this.LastInput = Vector_1.Vector.Create()),
      (this.TmpVector1 = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TagEventSprint = void 0);
  }
  UpdateVehicleInputDirectAndFacing() {
    this.UpdateMoveCache(),
      this.InputAdjusted(this.TmpVector1),
      this.ActorComp.SetInputDirect(this.TmpVector1, !0),
      this.SetInputFacingFromInputDirect();
  }
  SetInputFacingFromInputDirect(t = !0) {
    this.MoveDirectionCache.X < 0
      ? (this.MoveDirectionCache.UnaryNegation(this.TempVector),
        this.TempRotator.DeepCopy(this.ActorComp.ActorRotationProxy),
        GravityUtils_1.GravityUtils.GetQuatFromRotatorAndGravityForActor(
          this.ActorComp,
          this.TempRotator,
          this.TempQuat,
        ),
        this.TempQuat.RotateVector(this.TempVector, this.TmpVector1),
        this.ActorComp.SetInputFacing(this.TmpVector1))
      : GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
            this.ActorComp,
            this.ActorComp.InputDirectProxy,
          ) > MathUtils_1.MathUtils.SmallNumber
        ? this.ActorComp.SetInputFacing(this.GetWorldMoveDirectionCache())
        : t && this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
  }
  InputAdjusted(i) {
    i.DeepCopy(this.MoveVectorCache);
    var e = Math.abs(this.MoveVectorCache.X),
      t = this.MoveVectorCache.X < 0 ? -1 : 1,
      o = Math.abs(this.MoveVectorCache.Y),
      s = this.MoveVectorCache.Y < 0 ? -1 : 1;
    if (this.TurningForceInputFactor && 0 !== o) {
      var r =
          0 <=
          Vector_1.Vector.DotProduct(
            this.ActorComp.ActorVelocityProxy,
            this.ActorComp.ActorForwardProxy,
          ),
        n = r ? 1 : this.TurnBackwardInputMaxX,
        h = r ? this.TurnForwardInputMinX : -1;
      let t = r ? 1 : -1;
      i.X < h ? (t = -1) : i.X > n && (t = 1),
        (i.X = t * Math.max(e, o * this.TurningForceInputFactor));
    }
    e >= this.MaxForwardThreshold && (i.X = t),
      o >= this.MaxRightThreshold && (i.Y = s),
      Info_1.Info.IsInGamepad() && i.Y * this.LastInput.Y < 0 && (i.Y = 0),
      this.LastInput.DeepCopy(i);
  }
  ExecuteSprint(t) {
    this.Entity.GetComponent(242)?.TryEnterSprint();
  }
  ExecuteSkill(t) {
    t = t.IntValue;
    210012 === t
      ? PhotographController_1.PhotographController.PhotographFastScreenShot()
      : t === SKILL_ID_RIDER_SHARING &&
        (this.Entity.GetComponent(242)?.CheckIfCanRiderSharing()
          ? this.Entity.GetComponent(233)?.IsMoving
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "ShipTogetherViewCanNotOpenWhenMoving",
              )
            : UiManager_1.UiManager.OpenView("ShipTogetherView")
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Text_GongDuoLaCarpoolingForbid_Text",
            ));
  }
  AddBlockEvents() {
    super.AddBlockEvents(),
      (this.TagEventSprint = this.AddBlockActionEvent(
        -1347413397,
        InputEnums_1.EInputAction.闪避,
      ));
  }
  RemoveBlockActionEvents() {
    super.RemoveBlockActionEvents(), this.TagEventSprint?.EndTask();
  }
};
(GongduolaInputComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(243)],
  GongduolaInputComponent,
)),
  (exports.GongduolaInputComponent = GongduolaInputComponent);
//# sourceMappingURL=GongduolaInputComponent.js.map
