"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const AnimalMoveToController_1 = require("../../../../NewWorld/Character/Animal/Controller/AnimalMoveToController");
const CharacterUnifiedStateTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const DEFAULT_DISTANCE_ERROR_THRESHOLD = 100;
class TsTaskAnimalMoveTo extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveState = 2),
      (this.NavigationOn = !1),
      (this.TargetLocation = ""),
      (this.TurnSpeed = 0),
      (this.LimitTime = 0),
      (this.RootMotion = !0),
      (this.DistanceErrorThreshold = 0),
      (this.IsInitTsVariables = !1),
      (this.TsLimitTime = -0),
      (this.TsTurnSpeed = 0),
      (this.TsMoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
      (this.TsNavigationOn = !1),
      (this.TsTargetLocation = ""),
      (this.TsRootMotion = !1),
      (this.TsDistanceErrorThreshold = 0),
      (this.AnimalMoveToController = void 0),
      (this.TargetCache = void 0),
      (this.EndTime = -0);
  }
  static InitStaticVariables() {
    (TsTaskAnimalMoveTo.AnimalValidMoveState = new Set()),
      TsTaskAnimalMoveTo.AnimalValidMoveState.add(
        CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
      ),
      TsTaskAnimalMoveTo.AnimalValidMoveState.add(
        CharacterUnifiedStateTypes_1.ECharMoveState.Run,
      ),
      TsTaskAnimalMoveTo.AnimalValidMoveState.add(
        CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim,
      ),
      (TsTaskAnimalMoveTo.StaticVariablesInited = !0);
  }
  InitTsVariables(i) {
    this.IsInitTsVariables ||
      ((this.TsMoveState = this.MoveState),
      (this.TsNavigationOn = this.NavigationOn),
      (this.TsTargetLocation = this.TargetLocation),
      (this.TsLimitTime =
        this.LimitTime * TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TargetCache = Vector_1.Vector.Create()),
      (this.TsRootMotion = this.RootMotion),
      (this.TsDistanceErrorThreshold =
        this.TsMoveState ===
        CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
          ? this.DistanceErrorThreshold
          : Math.max(
              DEFAULT_DISTANCE_ERROR_THRESHOLD,
              this.DistanceErrorThreshold,
            )),
      (this.IsInitTsVariables = !0));
  }
  ReceiveExecuteAI(i, e) {
    TsTaskAnimalMoveTo.StaticVariablesInited ||
      TsTaskAnimalMoveTo.InitStaticVariables();
    let t;
    let s = i.AiController;
    s
      ? (s = s.CharActorComp?.Entity)?.Valid
        ? (this.InitTsVariables(s),
          TsTaskAnimalMoveTo.AnimalValidMoveState.has(this.TsMoveState)
            ? ((t =
                BlackboardController_1.BlackboardController.GetVectorValueByEntity(
                  s.Id,
                  this.TsTargetLocation,
                )),
              this.TargetCache.DeepCopy(t),
              (this.AnimalMoveToController =
                new AnimalMoveToController_1.AnimalMoveToController(s)),
              this.AnimalMoveToController.Init(
                this.TsMoveState,
                this.TsRootMotion,
              ),
              this.AnimalMoveToController.Start(
                this.TargetCache,
                this.TsNavigationOn,
                this.TsTurnSpeed,
                this.TsDistanceErrorThreshold,
              ),
              (this.EndTime = Number.MAX_VALUE),
              this.TsLimitTime > 0 &&
                (this.EndTime = Time_1.Time.WorldTime + this.TsLimitTime))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error("BehaviorTree", 30, "错误的移动状态", [
                  "Type",
                  i.GetClass().GetName(),
                ]),
              this.FinishExecute(!1)))
        : this.FinishExecute(!1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            i.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  ReceiveTickAI(i, e, t) {
    if (this.TsLimitTime > 0 && this.EndTime < Time_1.Time.WorldTime)
      this.AnimalMoveToController.Stop(), this.Finish(!0);
    else
      switch (this.AnimalMoveToController.Update(t)) {
        case 1:
          this.Finish(!0);
          break;
        case 2:
          this.Finish(!1);
      }
  }
  OnClear() {
    this.AnimalMoveToController?.Finish(),
      (this.AnimalMoveToController = void 0);
  }
}
(TsTaskAnimalMoveTo.StaticVariablesInited = !1),
  (TsTaskAnimalMoveTo.AnimalValidMoveState = new Set()),
  (exports.default = TsTaskAnimalMoveTo);
// # sourceMappingURL=TsTaskAnimalMoveTo.js.map
