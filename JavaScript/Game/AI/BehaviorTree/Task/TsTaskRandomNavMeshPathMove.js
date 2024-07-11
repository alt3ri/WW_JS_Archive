"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const WorldGlobal_1 = require("../../../World/WorldGlobal");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NAVIGATION_COMPLETE_DISTANCE = 10;
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
    const e = t.AiController;
    if (e) {
      const r = e.CharActorComp;
      const s =
        BlackboardController_1.BlackboardController.GetVectorValueByEntity(
          e.CharAiDesignComp.Entity.Id,
          this.TsBlackboardLocation,
        );
      if (s) {
        (this.SelectedTargetLocation = WorldGlobal_1.WorldGlobal.ToUeVector(s)),
          this.FindRandomPath(t, r.ActorLocation, this.SelectedTargetLocation),
          (this.FoundPath = this.NavigationPath.length > 0),
          (this.CurrentNavigationIndex = 1);
        const o = e.CharAiDesignComp?.Entity.GetComponent(158);
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
  FindRandomPath(r, s, t) {
    this.NavigationPath || (this.NavigationPath = new Array());
    var i = Vector_1.Vector.Create(s);
    let o = Vector_1.Vector.Create(t);
    const a = Vector_1.Vector.Create(t);
    var i = (a.Subtraction(i, a), Vector_1.Vector.Dist(i, o));
    if (i < this.TsRandomRange || this.TsSampling < 1)
      this.FoundPath =
        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
          r,
          s,
          t,
          this.NavigationPath,
        );
    else {
      let e = s;
      const h = i / (this.TsSampling + 1);
      for (let i = 0; i < this.TsSampling; i++) {
        let t = Vector_1.Vector.Create();
        a.Multiply((i + 1) * h, t),
          t.Addition(Vector_1.Vector.Create(s), t),
          (t = this.CalculateRandomPosition(t));
        const l = new Array();
        AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
          r,
          e,
          t.ToUeVector(),
          l,
        ) && this.NavigationPath.concat(l),
          (e = t.ToUeVector());
      }
      o = new Array();
      AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(r, e, t, o) &&
        this.NavigationPath.concat(o);
    }
  }
  CalculateRandomPosition(t) {
    var i = MathUtils_1.MathUtils.GetRandomFloatNumber(
      0,
      MathUtils_1.PI_DEG_DOUBLE,
    );
    const e = Vector_1.Vector.Create(Vector_1.Vector.ForwardVector);
    var i =
      (e.RotateAngleAxis(i, Vector_1.Vector.UpVectorProxy, e),
      MathUtils_1.MathUtils.GetRandomFloatNumber(0, this.TsRandomRange));
    return e.Multiply(i, e).Addition(t, e), e;
  }
  ReceiveTickAI(t, i, e) {
    let r, s;
    this.FoundPath && t instanceof TsAiController_1.default
      ? ((t = t.AiController.CharActorComp),
        (r = this.NavigationPath[this.CurrentNavigationIndex]),
        this.TsOpenDebugNode &&
          this.IsEditor &&
          UE.KismetSystemLibrary.DrawDebugSphere(
            this,
            r.ToUeVector(),
            30,
            10,
            ColorUtils_1.ColorUtils.LinearRed,
          ),
        (r = Vector_1.Vector.Create(r)).Subtraction(t.ActorLocationProxy, r),
        (r.Z = 0),
        (s = r.Size()),
        this.CurrentNavigationIndex === this.NavigationPath.length - 1 &&
        s < this.TsEndDistance
          ? this.Finish(!0)
          : (s < NAVIGATION_COMPLETE_DISTANCE && this.CurrentNavigationIndex++,
            (r.Z = 0),
            (r.X /= s),
            (r.Y /= s),
            t.SetInputDirect(r),
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
              t,
              r,
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
// # sourceMappingURL=TsTaskRandomNavMeshPathMove.js.map
