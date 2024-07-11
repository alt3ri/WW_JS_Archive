"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  FRONT_RANDOM_RAD = 0.26,
  HALF_PI_DEG = 90,
  DOUBLE_PI_DEG = 360,
  INSPECTION_INTERVAL = 200,
  DEBUG_SEGMENTS = 10,
  DEBUG_RADIUS = 30,
  DEBUG_TIME = 2.5,
  TURN_COMPLETE_DEG = 30,
  NAVIGATION_COMPLETE_DISTANCE = 2500,
  DEBUG_MODE = !0;
class TsTaskBigAnimalEscape extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.EnemyKey = ""),
      (this.TurnSpeed = 0),
      (this.IsInitTsVariables = !1),
      (this.TsEnemyKey = ""),
      (this.TsTurnSpeed = 0),
      (this.ActorComp = void 0),
      (this.TargetActorComp = void 0),
      (this.Initialized = !1),
      (this.AngleMin = 0),
      (this.AngleMax = 0),
      (this.InnerDiameter = 0),
      (this.OuterDiameter = 0),
      (this.EscapeEndTime = 0),
      (this.FoundLocation = !1),
      (this.EscapeLocation = void 0),
      (this.OptimalDirections = void 0),
      (this.FoundPath = !1),
      (this.MovePath = void 0),
      (this.CurrentMoveIndex = 0),
      (this.NeedTurn = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsEnemyKey = this.EnemyKey),
      (this.TsTurnSpeed = this.TurnSpeed));
  }
  ReceiveExecuteAI(t, i) {
    var s, e;
    t instanceof TsAiController_1.default
      ? ((s = t.AiController),
        this.InitConfig(s)
          ? (this.InitTsVariables(),
            (this.ActorComp = s.CharActorComp),
            this.TsEnemyKey &&
              (e =
                BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                  this.ActorComp.Entity.Id,
                  this.TsEnemyKey,
                )) &&
              (e = EntitySystem_1.EntitySystem.Get(e)) &&
              (this.TargetActorComp = e.GetComponent(3)),
            this.TargetActorComp ||
              (this.TargetActorComp =
                Global_1.Global.BaseCharacter.CharacterActorComponent),
            this.InitData(),
            (e = Vector_1.Vector.Create()),
            this.ActorComp.ActorLocationProxy.Subtraction(
              this.TargetActorComp.ActorLocationProxy,
              e,
            ),
            (e.Z = 0),
            e.Normalize(),
            this.FindOptimalDirections(e),
            0 === this.OptimalDirections.length
              ? (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "BehaviorTree",
                    30,
                    "无可行方向，请检查逻辑和配置",
                    ["EntityId: ", this.ActorComp.Entity.Id],
                  ),
                this.Finish(!0))
              : (this.FindEscapeLocation(),
                this.FindMovePath(),
                (this.EscapeEndTime =
                  Time_1.Time.WorldTime + s.AiFlee.TimeMilliseconds)))
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  InitConfig(t) {
    if (!this.Initialized) {
      var i = t.AiFlee;
      if (!i)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 30, "没有配置逃跑", [
              "AiBaseId",
              t.AiBase.Id,
            ]),
          !1
        );
      (this.AngleMin = i.FleeAngle.Min),
        (this.AngleMax = i.FleeAngle.Max),
        (this.InnerDiameter = i.FleeDistance.Min),
        (this.OuterDiameter = i.FleeDistance.Max),
        (this.Initialized = !0);
    }
    return !0;
  }
  InitData() {
    this.OptimalDirections || (this.OptimalDirections = new Array()),
      this.EscapeLocation || (this.EscapeLocation = new UE.Vector()),
      this.MovePath || (this.MovePath = new Array()),
      (this.CurrentMoveIndex = 1);
  }
  FindOptimalDirections(i) {
    var s = this.ActorComp.ActorForwardProxy,
      e = Math.max(this.AngleMax - this.AngleMin, HALF_PI_DEG),
      r = Vector_1.Vector.Create(),
      h = (i.Multiply(-1, r), DOUBLE_PI_DEG / HALF_PI_DEG),
      o = new Array();
    for (let t = 0; t < h; t++) {
      var a = t * HALF_PI_DEG,
        _ = Vector_1.Vector.Create(),
        a =
          (s.RotateAngleAxis(a, this.ActorComp.ActorUpProxy, _),
          MathUtils_1.MathUtils.GetAngleByVectorDot(r, _));
      a < HALF_PI_DEG ||
        e < (a = MathUtils_1.MathUtils.GetAngleByVectorDot(i, _)) ||
        o.push([_, a]);
    }
    o.sort((t, i) => t[1] - i[1]);
    for (const t of o) this.OptimalDirections.push(t[0]);
  }
  FindEscapeLocation() {
    var i = Vector_1.Vector.Create(),
      s = (0, puerts_1.$ref)(void 0);
    for (const h of this.OptimalDirections) {
      for (
        let t = this.OuterDiameter;
        t >= this.InnerDiameter;
        t -= INSPECTION_INTERVAL
      ) {
        h.Multiply(t, i), i.AdditionEqual(this.ActorComp.ActorLocationProxy);
        var e = t * Math.sin(FRONT_RANDOM_RAD);
        if (
          ((this.FoundLocation =
            UE.NavigationSystemV1.K2_GetRandomLocationInNavigableRadius(
              GlobalData_1.GlobalData.World,
              i.ToUeVector(),
              s,
              e,
            )),
          this.FoundLocation)
        )
          break;
      }
      if (this.FoundLocation) {
        (this.EscapeLocation.X = (0, puerts_1.$unref)(s).X),
          (this.EscapeLocation.Y = (0, puerts_1.$unref)(s).Y),
          (this.EscapeLocation.Z = (0, puerts_1.$unref)(s).Z);
        break;
      }
    }
    if (!this.FoundLocation) {
      var r = this.OptimalDirections[0];
      for (let t = this.InnerDiameter; 0 < t; t -= INSPECTION_INTERVAL)
        if (
          (r.Multiply(t, i),
          i.AdditionEqual(this.ActorComp.ActorLocationProxy),
          (this.FoundLocation =
            UE.NavigationSystemV1.K2_ProjectPointToNavigation(
              GlobalData_1.GlobalData.World,
              i.ToUeVector(),
              s,
              void 0,
              void 0,
            )),
          this.FoundLocation)
        ) {
          (this.EscapeLocation.X = (0, puerts_1.$unref)(s).X),
            (this.EscapeLocation.Y = (0, puerts_1.$unref)(s).Y),
            (this.EscapeLocation.Z = (0, puerts_1.$unref)(s).Z);
          break;
        }
    }
  }
  FindMovePath() {
    if (this.FoundLocation) {
      if (
        ((this.FoundPath =
          AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
            GlobalData_1.GlobalData.World,
            this.ActorComp.ActorLocation,
            this.EscapeLocation,
            this.MovePath,
          )),
        DEBUG_MODE && GlobalData_1.GlobalData.IsPlayInEditor && this.FoundPath)
      )
        for (let t = 0, i = this.MovePath.length; t < i; ++t)
          UE.KismetSystemLibrary.DrawDebugSphere(
            this,
            this.MovePath[t].ToUeVector(),
            DEBUG_RADIUS,
            DEBUG_SEGMENTS,
            ColorUtils_1.ColorUtils.LinearGreen,
            DEBUG_TIME,
          );
      this.FoundPath || this.GenerateFailurePath();
    } else this.GenerateFailurePath();
  }
  GenerateFailurePath() {
    var t = Vector_1.Vector.Create(),
      i =
        (this.OptimalDirections[0].Multiply(INSPECTION_INTERVAL, t),
        t.AdditionEqual(this.ActorComp.ActorLocationProxy),
        Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy));
    this.MovePath.splice(0, this.MovePath.length),
      this.MovePath.push(i),
      this.MovePath.push(t),
      (this.FoundPath = !0),
      DEBUG_MODE &&
        GlobalData_1.GlobalData.IsPlayInEditor &&
        UE.KismetSystemLibrary.DrawDebugSphere(
          this,
          this.EscapeLocation,
          DEBUG_RADIUS,
          DEBUG_SEGMENTS,
          ColorUtils_1.ColorUtils.LinearRed,
          DEBUG_TIME,
        );
  }
  ReceiveTickAI(t, i, s) {
    var e, r, h;
    t.AiController && this.ActorComp?.Valid
      ? Time_1.Time.WorldTime > this.EscapeEndTime
        ? this.Finish(!0)
        : ((t = this.ActorComp.Entity.GetComponent(91)),
          (e = Vector_1.Vector.Create(
            this.MovePath[this.CurrentMoveIndex],
          )).SubtractionEqual(this.ActorComp.ActorLocationProxy),
          GravityUtils_1.GravityUtils.ConvertToPlanarVector(this.ActorComp, e),
          (r = e.SizeSquared()),
          e.Normalize(),
          (h = MathUtils_1.MathUtils.GetAngleByVectorDot(
            this.ActorComp.ActorForwardProxy,
            e,
          )),
          (this.NeedTurn = h > TURN_COMPLETE_DEG),
          1 === this.CurrentMoveIndex && this.NeedTurn
            ? (t?.Valid &&
                t.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Stand,
                ),
              this.ActorComp.ClearInput(),
              AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                this.ActorComp,
                e,
                this.TsTurnSpeed,
              ))
            : (t?.Valid &&
                t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run),
              r < NAVIGATION_COMPLETE_DISTANCE &&
              (this.CurrentMoveIndex++,
              this.CurrentMoveIndex === this.MovePath.length)
                ? this.Finish(!0)
                : (this.ActorComp.SetInputDirect(e),
                  AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                    this.ActorComp,
                    e,
                    this.TsTurnSpeed,
                  ))))
      : this.Finish(!1);
  }
  OnClear() {
    (this.OptimalDirections.length = 0),
      (this.FoundLocation = !1),
      (this.FoundPath = !1),
      (this.MovePath.length = 0);
  }
}
exports.default = TsTaskBigAnimalEscape;
//# sourceMappingURL=TsTaskBigAnimalEscape.js.map
