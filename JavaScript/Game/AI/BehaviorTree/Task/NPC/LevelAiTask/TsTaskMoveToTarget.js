"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase"),
  MIN_MOVE_SPEED = 20,
  MOVE_FAILED_TIME = 5,
  MIN_ARRIVE_DISTANCE_TOLERANCE = 30;
class TsTaskMoveToTarget extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.MoveMode = 0),
      (this.MoveState = 0),
      (this.IsFollow = !1),
      (this.TargetEntityId = 0),
      (this.TargetPos = new UE.Vector()),
      (this.IsFly = !1),
      (this.Distance = MIN_ARRIVE_DISTANCE_TOLERANCE),
      (this.IsInitTsVariables = !1),
      (this.TsMoveMode = 0),
      (this.TsMoveState = 0),
      (this.TsIsFollow = !1),
      (this.TsIsFly = !1),
      (this.TsTargetEntityId = 0),
      (this.TsTargetPos = void 0),
      (this.TsDistance = 0),
      (this.MoveComp = void 0),
      (this.LastLocation = void 0),
      (this.TargetLocation = void 0),
      (this.TmpVector = void 0),
      (this.LastTime = 0),
      (this.MoveFailedCountDown = 0);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsMoveMode = 0),
      (this.TsMoveState = 0),
      (this.TsIsFollow = !1),
      (this.TsIsFly = !1),
      (this.TsTargetEntityId = 0),
      (this.TsTargetPos = void 0),
      (this.TsDistance = 0),
      (this.MoveComp = void 0),
      (this.LastLocation = void 0),
      (this.TargetLocation = void 0),
      (this.TmpVector = void 0),
      (this.LastTime = 0),
      (this.MoveFailedCountDown = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsMoveMode = this.MoveMode),
      (this.TsMoveState = this.MoveState),
      (this.TsIsFollow = this.IsFollow),
      (this.TsIsFly = this.IsFly),
      (this.TsDistance = this.Distance),
      (this.TsTargetEntityId = this.TargetEntityId),
      (this.TsTargetPos = Vector_1.Vector.Create(
        this.TargetPos.X,
        this.TargetPos.Y,
        this.TargetPos.Z,
      )),
      (this.LastLocation = Vector_1.Vector.Create()),
      (this.TargetLocation = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s,
      e = t.AiController;
    e
      ? ((s = (e = e.CharActorComp).Entity),
        (this.MoveComp = s.GetComponent(44)),
        this.GetMoveToTargetPosition(this.TargetLocation)
          ? this.TryFindPathToTarget(this.TargetLocation)
            ? ((this.LastTime = Time_1.Time.WorldTime),
              this.LastLocation?.Reset(),
              this.LastLocation?.DeepCopy(e.ActorLocationProxy))
            : this.Finish(!0)
          : this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!0));
  }
  ReceiveTickAI(t, i, s) {
    var t = t.AiController;
    !t || ((t = t.CharActorComp), this.CheckMoveFailed(t, s))
      ? this.Finish(!0)
      : this.TsIsFollow &&
        (this.GetMoveToTargetPosition(this.TmpVector)
          ? Vector_1.Vector.DistSquared(this.TmpVector, this.TargetLocation) >
              this.TsDistance * this.TsDistance &&
            (this.TryFindPathToTarget(this.TmpVector)
              ? this.TargetLocation.DeepCopy(this.TmpVector)
              : this.Finish(!0))
          : this.Finish(!0));
  }
  OnClear() {
    this.MoveComp && (this.MoveComp.StopMove(!0), (this.MoveComp = void 0)),
      (this.LastTime = 0),
      (this.MoveFailedCountDown = 0),
      this.LastLocation?.Reset(),
      this.TargetLocation?.Reset();
  }
  CheckMoveFailed(t, i) {
    var s = Vector_1.Vector.Dist(t.ActorLocationProxy, this.LastLocation);
    if (
      (Time_1.Time.WorldTime - this.LastTime) *
        MathUtils_1.MathUtils.MillisecondToSecond *
        MIN_MOVE_SPEED >=
      s
    ) {
      if (
        ((this.MoveFailedCountDown += i),
        this.MoveFailedCountDown >= MOVE_FAILED_TIME)
      )
        return (
          t.SetActorLocation(
            this.TargetLocation.ToUeVector(),
            "[TsTaskMoveToLocation]长时间处于某点",
            !1,
          ),
          !0
        );
    } else this.MoveFailedCountDown = 0;
    return (
      (this.LastTime = Time_1.Time.WorldTime),
      this.LastLocation.DeepCopy(t.ActorLocationProxy),
      !1
    );
  }
  TryFindPathToTarget(t) {
    return (
      !!this.MoveComp &&
      this.MoveComp.MoveController.NavigateMoveToLocation(
        {
          Position: t,
          MoveState: this.ConvertToCharMoveState(this.TsMoveState),
          IsFly: this.TsIsFly,
          Distance: this.TsDistance,
          UseNearestDirection: !1,
          CallbackList: [
            () => {
              this.Finish(!0);
            },
          ],
          ResetCondition: () => !1,
        },
        !0,
        !1,
      )
    );
  }
  ConvertToCharMoveState(t) {
    switch (t) {
      case 1:
        return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
      case 2:
        return CharacterUnifiedStateTypes_1.ECharMoveState.Run;
    }
    return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
  }
  GetMoveToTargetPosition(t) {
    switch (this.TsMoveMode) {
      case 1:
        t.DeepCopy(this.TsTargetPos);
        break;
      case 2:
        var i = Global_1.Global.BaseCharacter;
        if (!i?.IsValid()) return !1;
        t.DeepCopy(i.CharacterActorComponent.ActorLocationProxy);
        break;
      case 3:
        i = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.TsTargetEntityId,
        );
        if (!i?.Valid) return !1;
        i = i.Entity.GetComponent(1);
        t.DeepCopy(i.ActorLocationProxy);
        break;
      default:
        return !1;
    }
    return !0;
  }
}
exports.default = TsTaskMoveToTarget;
//# sourceMappingURL=TsTaskMoveToTarget.js.map
