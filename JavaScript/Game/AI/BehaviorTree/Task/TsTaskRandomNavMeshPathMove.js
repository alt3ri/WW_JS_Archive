"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  WorldGlobal_1 = require("../../../World/WorldGlobal"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskRandomNavMeshPathMove extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveState = 0),
      (this.BlackboardLocation = ""),
      (this.Sampling = 0),
      (this.RandomRange = 0),
      (this.EndDistance = 0),
      (this.TurnSpeed = 0),
      (this.OpenDebugNode = !1),
      (this.SelectedTargetLocation = void 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.IsEditor = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMoveState = 0),
      (this.TsBlackboardLocation = ""),
      (this.TsSampling = 0),
      (this.TsRandomRange = 0),
      (this.TsEndDistance = 0),
      (this.TsTurnSpeed = 0),
      (this.TsOpenDebugNode = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.SelectedTargetLocation = void 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.IsInitTsVariables = !1),
      (this.TsMoveState = 0),
      (this.TsBlackboardLocation = ""),
      (this.TsSampling = 0),
      (this.TsRandomRange = 0),
      (this.TsEndDistance = 0),
      (this.TsTurnSpeed = 0),
      (this.TsOpenDebugNode = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMoveState = this.MoveState),
      (this.TsBlackboardLocation = this.BlackboardLocation),
      (this.TsSampling = this.Sampling),
      (this.TsRandomRange = this.RandomRange),
      (this.TsEndDistance = this.EndDistance),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsOpenDebugNode = this.OpenDebugNode));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      var e = s.CharActorComp,
        r =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
            s.CharAiDesignComp.Entity.Id,
            this.TsBlackboardLocation,
          );
      if (r) {
        (this.SelectedTargetLocation = WorldGlobal_1.WorldGlobal.ToUeVector(r)),
          this.FindRandomPath(t, e.ActorLocation, this.SelectedTargetLocation),
          (this.FoundPath = 0 < this.NavigationPath.length),
          (this.CurrentNavigationIndex = 1);
        var o = s.CharAiDesignComp?.Entity.GetComponent(173);
        if (o?.Valid)
          switch (this.TsMoveState) {
            case 1:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
              break;
            case 2:
              o.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
              break;
            case 3:
              o.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
              );
          }
        this.IsEditor = GlobalData_1.GlobalData.IsPlayInEditor;
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "TsTaskMoveToLocation没有获取到目标坐标",
            ["BehaviorTree", this.TreeAsset.GetName()],
            ["BlackboardLocation", this.TsBlackboardLocation],
          ),
          (this.FoundPath = !1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  FindRandomPath(e, r, t) {
    this.NavigationPath || (this.NavigationPath = new Array());
    var i = Vector_1.Vector.Create(r),
      o = Vector_1.Vector.Create(t),
      h = Vector_1.Vector.Create(t),
      i = (h.Subtraction(i, h), Vector_1.Vector.Dist(i, o));
    if (i < this.TsRandomRange || this.TsSampling < 1)
      this.FoundPath =
        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
          e,
          r,
          t,
          this.NavigationPath,
        );
    else {
      let s = r;
      var a = i / (this.TsSampling + 1);
      for (let i = 0; i < this.TsSampling; i++) {
        let t = Vector_1.Vector.Create();
        h.Multiply((i + 1) * a, t),
          t.Addition(Vector_1.Vector.Create(r), t),
          (t = this.CalculateRandomPosition(t));
        var l = new Array();
        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
          e,
          s,
          t.ToUeVector(),
          l,
        ) && this.NavigationPath.concat(l),
          (s = t.ToUeVector());
      }
      o = new Array();
      AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(e, s, t, o) &&
        this.NavigationPath.concat(o);
    }
  }
  CalculateRandomPosition(t) {
    var i = MathUtils_1.MathUtils.GetRandomFloatNumber(
        0,
        MathUtils_1.PI_DEG_DOUBLE,
      ),
      s = Vector_1.Vector.Create(Vector_1.Vector.ForwardVector),
      i =
        (s.RotateAngleAxis(i, Vector_1.Vector.UpVectorProxy, s),
        MathUtils_1.MathUtils.GetRandomFloatNumber(0, this.TsRandomRange));
    return s.Multiply(i, s).Addition(t, s), s;
  }
  ReceiveTickAI(t, i, s) {
    var e, r;
    this.FoundPath && t instanceof TsAiController_1.default
      ? ((t = t.AiController.CharActorComp),
        (e = this.NavigationPath[this.CurrentNavigationIndex]),
        this.TsOpenDebugNode &&
          this.IsEditor &&
          UE.KismetSystemLibrary.D_DrawDebugSphere(
            this,
            e.ToUeVector(),
            30,
            10,
            ColorUtils_1.ColorUtils.LinearRed,
          ),
        (e = Vector_1.Vector.Create(e)).Subtraction(t.ActorLocationProxy, e),
        (e.Z = 0),
        (r = e.Size()),
        this.CurrentNavigationIndex === this.NavigationPath.length - 1 &&
        r < this.TsEndDistance
          ? this.Finish(!0)
          : (r < NAVIGATION_COMPLETE_DISTANCE && this.CurrentNavigationIndex++,
            e.DivisionEqual(r),
            t.SetInputDirect(e, !0),
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
              t,
              e,
              this.TsTurnSpeed,
            )))
      : this.Finish(!1);
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner);
  }
}
exports.default = TsTaskRandomNavMeshPathMove;
//# sourceMappingURL=TsTaskRandomNavMeshPathMove.js.map
