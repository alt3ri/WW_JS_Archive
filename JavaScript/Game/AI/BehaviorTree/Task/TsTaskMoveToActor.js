"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const NAVIGATION_COMPLETE_DISTANCE = 10;
class TsTaskMoveToActor extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveState = 0),
      (this.NavigationOn = !1),
      (this.BlackboardKeyActor = ""),
      (this.EndDistance = 0),
      (this.TurnSpeed = 0),
      (this.FixPeriod = 0),
      (this.WalkOff = !1),
      (this.IsInitTsVariables = !1),
      (this.TsMoveState = 0),
      (this.TsNavigationOn = !1),
      (this.TsBlackboardKeyActor = ""),
      (this.TsEndDistance = 0),
      (this.TsTurnSpeed = 0),
      (this.TsFixPeriod = 0),
      (this.TsWalkOff = !1),
      (this.SelectedTargetLocation = void 0),
      (this.FoundPath = !1),
      (this.NavigationPath = void 0),
      (this.CurrentNavigationIndex = 0),
      (this.NextCheckTime = -0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMoveState = this.MoveState),
      (this.TsNavigationOn = this.NavigationOn),
      (this.TsBlackboardKeyActor = this.BlackboardKeyActor),
      (this.TsEndDistance = this.EndDistance),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsFixPeriod = this.FixPeriod),
      (this.TsWalkOff = this.WalkOff));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    const e = t.AiController;
    if (e) {
      const s = e.CharActorComp;
      const r =
        (this.TsWalkOff || s.Entity.GetComponent(36)?.SetWalkOffLedgeRecord(!1),
        BlackboardController_1.BlackboardController.GetEntityIdByEntity(
          e.CharAiDesignComp.Entity.Id,
          this.TsBlackboardKeyActor,
        ));
      const h = EntitySystem_1.EntitySystem.Get(r);
      if (r && h?.Valid) {
        this.SelectedTargetLocation =
          AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(h);
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
        (this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod),
          this.FindNewPath(t, s.ActorLocation);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "BehaviorTree",
            6,
            "TsTaskMoveToEntity没有获取到目标EntityId",
            ["BehaviorTree", this.TreeAsset.GetName()],
            ["TargetKey", this.TsBlackboardKeyActor],
          ),
          (this.FoundPath = !1);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  ReceiveTickAI(t, i, e) {
    if (t instanceof TsAiController_1.default) {
      const s = t.AiController;
      const r = s.CharActorComp;
      const h = r.ActorLocationProxy;
      if (Time_1.Time.WorldTime > this.NextCheckTime) {
        var o = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
          s.CharAiDesignComp.Entity.Id,
          this.TsBlackboardKeyActor,
        );
        var a = EntitySystem_1.EntitySystem.Get(o);
        if (!o || !a?.Valid) return void this.Finish(!1);
        o = AiContollerLibrary_1.AiControllerLibrary.GetLocationFromEntity(a);
        (this.NextCheckTime = Time_1.Time.WorldTime + this.TsFixPeriod),
          Vector_1.Vector.Dist(o, this.SelectedTargetLocation) >
            NAVIGATION_COMPLETE_DISTANCE &&
            ((this.SelectedTargetLocation = o),
            this.FindNewPath(t, h.ToUeVector()));
      }
      if (this.FoundPath) {
        (a = this.TsNavigationOn
          ? Vector_1.Vector.Create(
              this.NavigationPath[this.CurrentNavigationIndex],
            )
          : this.SelectedTargetLocation),
          (o = Vector_1.Vector.Create(a)),
          (t = (o.Subtraction(h, o), (o.Z = 0), o.Size()));
        if (
          (!this.TsNavigationOn ||
            this.CurrentNavigationIndex === this.NavigationPath.length - 1) &&
          t < this.TsEndDistance
        )
          this.Finish(!0);
        else {
          t < NAVIGATION_COMPLETE_DISTANCE && this.CurrentNavigationIndex++,
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
              r,
              a,
              this.TsTurnSpeed,
            ),
            (o.Z = 0),
            (o.X /= t),
            (o.Y /= t),
            r.SetInputDirect(o);
          const l = s.CharAiDesignComp?.Entity.GetComponent(158);
          if (l?.Valid)
            switch (this.TsMoveState) {
              case 1:
                l.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
                );
                break;
              case 2:
                l.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
                break;
              case 3:
                l.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
                );
            }
        }
      } else this.Finish(!1);
    } else this.Finish(!1);
  }
  FindNewPath(t, i) {
    this.TsNavigationOn
      ? (this.NavigationPath || (this.NavigationPath = new Array()),
        (this.FoundPath =
          AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
            t,
            i,
            this.SelectedTargetLocation.ToUeVector(),
            this.NavigationPath,
          )),
        (this.CurrentNavigationIndex = 1))
      : (this.FoundPath = !0);
  }
  OnClear() {
    this.AIOwner instanceof TsAiController_1.default &&
      (AiContollerLibrary_1.AiControllerLibrary.ClearInput(this.AIOwner),
      this.TsWalkOff ||
        this.AIOwner.AiController.CharActorComp.Entity.GetComponent(
          36,
        )?.SetWalkOffLedgeRecord(!0));
  }
}
exports.default = TsTaskMoveToActor;
// # sourceMappingURL=TsTaskMoveToActor.js.map
