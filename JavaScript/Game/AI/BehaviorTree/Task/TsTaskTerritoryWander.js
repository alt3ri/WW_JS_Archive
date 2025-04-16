"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  PI = 3.14,
  NAVIGATION_END_TIME = 5e3,
  NAVIGATION_COMPLETE_DISTANCE = 20;
class TsTaskTerritoryWander extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.RangeCenterKey = ""),
      (this.RangeCenter = void 0),
      (this.RangeRadius = 0),
      (this.Angle = 0),
      (this.InnerDiameter = 0),
      (this.OuterDiameter = 0),
      (this.ForceNavigation = !1),
      (this.TargetLocation = void 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.UnifiedStateComp = void 0),
      (this.CacheVector = void 0),
      (this.TurnSpeed = 0),
      (this.NavigationEndTime = -0),
      (this.DebugMode = !1),
      (this.IsInitTsVariables = !1),
      (this.TsRangeCenterKey = ""),
      (this.TsRangeRadius = 0),
      (this.TsAngle = 0),
      (this.TsInnerDiameter = 0),
      (this.TsOuterDiameter = 0),
      (this.TsForceNavigation = !1),
      (this.TsTurnSpeed = 0),
      (this.TsDebugMode = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.RangeCenter = void 0),
      (this.TargetLocation = void 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.UnifiedStateComp = void 0),
      (this.CacheVector = void 0),
      (this.NavigationEndTime = -0),
      (this.IsInitTsVariables = !1),
      (this.TsRangeCenterKey = ""),
      (this.TsRangeRadius = 0),
      (this.TsAngle = 0),
      (this.TsInnerDiameter = 0),
      (this.TsOuterDiameter = 0),
      (this.TsForceNavigation = !1),
      (this.TsTurnSpeed = 0),
      (this.TsDebugMode = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsRangeCenterKey = this.RangeCenterKey),
      (this.TsRangeRadius = this.RangeRadius),
      (this.TsAngle = this.Angle),
      (this.TsInnerDiameter = this.InnerDiameter),
      (this.TsOuterDiameter = this.OuterDiameter),
      (this.TsForceNavigation = this.ForceNavigation),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsDebugMode = this.DebugMode));
  }
  ReceiveExecuteAI(i, t) {
    this.InitTsVariables();
    var s = i.AiController;
    if (s)
      if (((this.ActorComp = s.CharActorComp), this.ActorComp?.Valid)) {
        var s = this.ActorComp.Entity,
          h = s.GetComponent(0);
        if (
          ((this.MoveComp = s.GetComponent(176)),
          (this.UnifiedStateComp = s.GetComponent(99)),
          !this.RangeCenter)
        )
          if (this.TsRangeCenterKey) {
            (s = s.Id),
              (s =
                ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
                  s,
                  this.TsRangeCenterKey,
                ));
            if (!s)
              return (
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "BehaviorTree",
                    29,
                    "不存在Blackboard Value",
                    ["Key", this.TsRangeCenterKey],
                  ),
                void this.Finish(!1)
              );
            this.RangeCenter = Vector_1.Vector.Create(s);
          } else {
            s = h.GetInitLocation();
            this.RangeCenter = Vector_1.Vector.Create(s.X, s.Y, s.Z);
          }
        this.CacheVector || (this.CacheVector = Vector_1.Vector.Create()),
          this.FindWanderLocation(),
          this.FindWanderPath(),
          (this.NavigationEndTime =
            Time_1.Time.WorldTime + NAVIGATION_END_TIME),
          (this.CurrentNavigationIndex = 1);
      } else this.Finish(!1);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          i.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  ReceiveTickAI(i, t, s) {
    i instanceof TsAiController_1.default &&
    (!this.TsForceNavigation || this.FoundPath) &&
    this.MoveComp?.CanMove()
      ? Time_1.Time.WorldTime > this.NavigationEndTime ||
        (this.UnifiedStateComp?.Valid &&
          this.UnifiedStateComp.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
          ),
        (i = this.NavigationPath[this.CurrentNavigationIndex]),
        this.CacheVector.FromUeVector(i),
        this.CacheVector.Subtraction(
          this.ActorComp.ActorLocationProxy,
          this.CacheVector,
        ),
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(
          this.ActorComp,
          this.CacheVector,
        ),
        (i = this.CacheVector.Size()),
        this.CacheVector.Normalize(),
        this.CurrentNavigationIndex === this.NavigationPath.length - 1 &&
          i < NAVIGATION_COMPLETE_DISTANCE)
        ? this.Finish(!0)
        : (i < NAVIGATION_COMPLETE_DISTANCE && this.CurrentNavigationIndex++,
          this.ActorComp.SetInputDirect(this.CacheVector),
          AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
            this.ActorComp,
            this.CacheVector,
            this.TsTurnSpeed,
          ))
      : this.Finish(!1);
  }
  RandomPointInFanRing(i, t, s, h) {
    return h < s || t < i || i < 0
      ? { X: 0, Y: 0 }
      : ((i = MathUtils_1.MathUtils.GetRandomRange(i * i, t * t)),
        (t = MathUtils_1.MathUtils.GetRandomRange(s, h)),
        { X: (s = Math.sqrt(i)) * Math.cos(t), Y: s * Math.sin(t) });
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.UnifiedStateComp?.SetMoveState(
        CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
      ),
      (this.ActorComp = void 0),
      (this.MoveComp = void 0),
      (this.UnifiedStateComp = void 0);
  }
  FindWanderLocation() {
    this.TargetLocation || (this.TargetLocation = Vector_1.Vector.Create());
    var i = this.ActorComp.ActorLocationProxy,
      t = this.RandomPointInFanRing(
        this.TsInnerDiameter,
        this.TsOuterDiameter,
        ((this.ActorComp.ActorRotationProxy.Yaw - this.TsAngle / 2) / 180) * PI,
        ((this.ActorComp.ActorRotationProxy.Yaw + this.TsAngle / 2) / 180) * PI,
      );
    (this.TargetLocation.X = i.X + t.X),
      (this.TargetLocation.Y = i.Y + t.Y),
      (this.TargetLocation.Z = i.Z),
      Vector_1.Vector.DistSquared2D(this.TargetLocation, this.RangeCenter) >=
        this.TsRangeRadius * this.TsRangeRadius &&
        ((this.TargetLocation.X = i.X - t.X),
        (this.TargetLocation.Y = i.Y - t.Y),
        Vector_1.Vector.DistSquared2D(this.TargetLocation, this.RangeCenter) >=
          this.TsRangeRadius * this.TsRangeRadius &&
          ((this.TargetLocation.X = this.RangeCenter.X),
          (this.TargetLocation.Y = this.RangeCenter.Y)),
        (this.TargetLocation.Z = i.Z)),
      this.DebugDraw();
  }
  FindWanderPath() {
    this.NavigationPath || (this.NavigationPath = new Array()),
      (this.FoundPath =
        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
          this,
          this.ActorComp.ActorLocation,
          this.TargetLocation.ToUeVector(),
          this.NavigationPath,
        )),
      this.FoundPath ||
        ((this.NavigationPath.length = 2),
        (this.NavigationPath[0] = this.ActorComp.ActorLocationProxy),
        (this.NavigationPath[1] = this.TargetLocation));
  }
  DebugDraw() {
    this.TsDebugMode &&
      GlobalData_1.GlobalData.IsPlayInEditor &&
      (UE.KismetSystemLibrary.D_DrawDebugCone(
        this,
        this.ActorComp.ActorLocation,
        this.ActorComp.ActorForward,
        this.TsOuterDiameter,
        (this.TsAngle / 360) * PI,
        0,
        12,
        ColorUtils_1.ColorUtils.LinearGreen,
        3,
      ),
      UE.KismetSystemLibrary.D_DrawDebugCone(
        this,
        this.ActorComp.ActorLocation,
        this.ActorComp.ActorForward,
        this.TsInnerDiameter,
        (this.TsAngle / 360) * PI,
        0,
        12,
        ColorUtils_1.ColorUtils.LinearRed,
        3,
      ),
      UE.KismetSystemLibrary.D_DrawDebugCircle(
        this,
        this.RangeCenter.ToUeVector(),
        this.TsRangeRadius,
        24,
        ColorUtils_1.ColorUtils.LinearYellow,
        3,
        0,
        Vector_1.Vector.Create(1, 0, 0).ToUeVector(),
        Vector_1.Vector.Create(0, 1, 0).ToUeVector(),
        !0,
      ),
      UE.KismetSystemLibrary.D_DrawDebugSphere(
        this,
        this.TargetLocation.ToUeVector(),
        30,
        10,
        ColorUtils_1.ColorUtils.LinearRed,
        3,
      ));
  }
}
exports.default = TsTaskTerritoryWander;
//# sourceMappingURL=TsTaskTerritoryWander.js.map
