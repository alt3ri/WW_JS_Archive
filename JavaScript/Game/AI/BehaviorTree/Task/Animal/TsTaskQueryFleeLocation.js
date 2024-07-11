"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../GlobalData"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  ServerGmController_1 = require("../../../../World/Controller/ServerGmController"),
  AiContollerLibrary_1 = require("../../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
  BLACKBOARD_KEY_FLEE_LOCATION = "FleeLocation",
  ANGLE_INTERVAL = 30,
  RADIUS = 300,
  TURN_COST_WEIGHT = 0.25,
  TURN_COST_WEIGHT_2 = 0.75,
  TURN_COST_WEIGHT_3 = 1,
  TURN_COST_DIVIDING_LINE_2 = 0,
  TURN_COST_DIVIDING_LINE_3 = 0.707,
  TEST_MODE = !1,
  QUERY_LOCATION_CD = 0.5,
  Z_ALLOWABLE_DIFFERENCE = 45;
class QuatNode {
  constructor(t, e) {
    (this.Quaternion = Quat_1.Quat.Create(t)),
      (this.CostBase = e),
      (this.Cost = 0),
      (this.VectorCache = Vector_1.Vector.Create());
  }
}
class TsTaskQueryFleeLocation extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.TargetKey = ""),
      (this.DebugMode = !1),
      (this.Character = void 0),
      (this.TargetCharacter = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsTargetKey = ""),
      (this.VectorCache1 = void 0),
      (this.VectorCache2 = void 0),
      (this.VectorCache3 = void 0),
      (this.QuatNodeQueue = void 0),
      (this.NavigationPath = void 0),
      (this.FoundPath = !1),
      (this.CdInternal = -0);
  }
  static InitStaticVariables() {
    (TsTaskQueryFleeLocation.QuaternionQueue = new Array()),
      TsTaskQueryFleeLocation.QuaternionQueue.push(
        Quat_1.Quat.Create(0, 0, 0, 1),
      );
    var e = MathUtils_1.PI_DEG / ANGLE_INTERVAL;
    for (let t = 1; t < e; ++t) {
      var i = t * ANGLE_INTERVAL * 0.5 * MathUtils_1.MathUtils.DegToRad,
        s = Quat_1.Quat.Create(0, 0, Math.sin(i), Math.cos(i)),
        s =
          (TsTaskQueryFleeLocation.QuaternionQueue.push(s),
          Quat_1.Quat.Create(0, 0, Math.sin(-i), Math.cos(-i)));
      TsTaskQueryFleeLocation.QuaternionQueue.push(s);
    }
  }
  InitTsVariables(t) {
    if (!this.IsInitTsVariables) {
      (this.TsTargetKey = this.TargetKey),
        (this.VectorCache1 = Vector_1.Vector.Create()),
        (this.VectorCache2 = Vector_1.Vector.Create()),
        (this.VectorCache3 = Vector_1.Vector.Create()),
        (this.QuatNodeQueue = new Array());
      for (const i of TsTaskQueryFleeLocation.QuaternionQueue) {
        var e = new QuatNode(i, Math.abs(i.Z));
        this.QuatNodeQueue.push(e);
      }
      (this.NavigationPath = new Array()),
        (this.CdInternal = -1),
        (this.IsInitTsVariables = !0);
    }
  }
  ReceiveExecuteAI(t, e) {
    TsTaskQueryFleeLocation.StaticVariablesInited ||
      (TsTaskQueryFleeLocation.InitStaticVariables(),
      (TsTaskQueryFleeLocation.StaticVariablesInited = !0));
    var i = t.AiController;
    if (i) {
      this.InitTsVariables(i);
      const s = ServerGmController_1.ServerGmController.AnimalDebug;
      if (
        (s &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            6,
            "AnimalDebug SwitchAnimalState2",
            ["Tree", this.TreeAsset?.GetName()],
            ["WorldTimeSeconds", Time_1.Time.WorldTimeSeconds],
            ["CdInternal", this.CdInternal],
          ),
        Time_1.Time.WorldTimeSeconds < this.CdInternal)
      )
        this.Finish(!1);
      else if (
        ((this.CdInternal = Time_1.Time.WorldTimeSeconds + QUERY_LOCATION_CD),
        (this.Character = i.CharActorComp),
        this.FindTarget())
      )
        this.QueryFleeLocation()
          ? ((i = this.NavigationPath.length),
            (i = this.NavigationPath[i - 1]),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              this.Character.Entity.Id,
              BLACKBOARD_KEY_FLEE_LOCATION,
              i.X,
              i.Y,
              i.Z,
            ),
            s &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "AnimalDebug QueryFlee4", [
                "FleeLocation",
                i,
              ]),
            this.Finish(!0))
          : (s &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                6,
                "AnimalDebug QueryFlee3 QueryFleeLocation Failed",
              ),
            this.Finish(!1));
      else {
        const s = ServerGmController_1.ServerGmController.AnimalDebug;
        s &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AI", 6, "AnimalDebug QueryFlee2 FindTarget Failed"),
          void this.Finish(!1);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  FindTarget() {
    if (this.TsTargetKey) {
      var t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        this.Character.Entity.Id,
        this.TsTargetKey,
      );
      if (t) {
        t = EntitySystem_1.EntitySystem.Get(t);
        if (t) return (this.TargetCharacter = t.GetComponent(3)), !0;
      }
    }
    return !1;
  }
  QueryFleeLocation() {
    var t = this.Character.ActorLocationProxy,
      e =
        (t.Subtraction(
          this.TargetCharacter.ActorLocationProxy,
          this.VectorCache1,
        ),
        (this.VectorCache1.Z = 0),
        this.VectorCache1.Normalize(),
        this.VectorCache3.DeepCopy(this.VectorCache1),
        this.VectorCache1.MultiplyEqual(RADIUS),
        (this.FoundPath = !1),
        this.Character.ActorForwardProxy);
    for (const l of this.QuatNodeQueue)
      l.Quaternion.RotateVector(this.VectorCache1, this.VectorCache2),
        l.VectorCache.DeepCopy(this.VectorCache2),
        (this.VectorCache2.Z = 0),
        this.VectorCache2.Normalize(),
        (l.Cost = 0.5 * (1 - e.DotProduct(this.VectorCache2))),
        l.VectorCache.AdditionEqual(t);
    let i = TURN_COST_WEIGHT;
    var s = this.VectorCache3.DotProduct(e);
    s > TURN_COST_DIVIDING_LINE_3
      ? (i = TURN_COST_WEIGHT_3)
      : s > TURN_COST_DIVIDING_LINE_2 && (i = TURN_COST_WEIGHT_2),
      this.QuatNodeQueue.sort(
        (t, e) => i * (t.Cost - e.Cost) + (1 - i) * (t.CostBase - e.CostBase),
      ),
      this.DebugDraw2();
    for (const _ of this.QuatNodeQueue) {
      var r = (0, puerts_1.$ref)(void 0);
      if (
        UE.NavigationSystemV1.K2_ProjectPointToNavigation(
          GlobalData_1.GlobalData.World,
          _.VectorCache.ToUeVector(),
          r,
          void 0,
          void 0,
        )
      ) {
        var o,
          r = Vector_1.Vector.Create((0, puerts_1.$unref)(r)),
          a = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
            GlobalData_1.GlobalData.World,
            t.ToUeVector(),
            r.ToUeVector(),
            this.NavigationPath,
          );
        if (
          (a &&
            ((o = this.CheckLegalZ(r, this.Character.FloorLocation)),
            (this.FoundPath = a && o)),
          this.FoundPath)
        ) {
          GlobalData_1.GlobalData.IsPlayInEditor &&
            this.DebugMode &&
            this.DebugDraw(r.ToUeVector(), ColorUtils_1.ColorUtils.LinearGreen);
          break;
        }
      }
      GlobalData_1.GlobalData.IsPlayInEditor &&
        this.DebugMode &&
        this.DebugDraw(
          _.VectorCache.ToUeVector(),
          ColorUtils_1.ColorUtils.LinearRed,
        );
    }
    return this.FoundPath;
  }
  CheckLegalZ(t, e) {
    return Math.abs(t.Z - e.Z) <= Z_ALLOWABLE_DIFFERENCE;
  }
  DebugDraw(t, e) {
    UE.KismetSystemLibrary.DrawDebugSphere(this, t, 20, 10, e, 0.25);
  }
  DebugDraw2() {
    if (GlobalData_1.GlobalData.IsPlayInEditor && TEST_MODE) {
      var e = 0.02,
        i = 10,
        s = 30;
      let t = 0;
      for (const r of this.QuatNodeQueue) {
        switch (t) {
          case 0:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              s,
              i,
              ColorUtils_1.ColorUtils.LinearGreen,
              e,
            );
            break;
          case 1:
          case 2:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              s,
              i,
              ColorUtils_1.ColorUtils.LinearYellow,
              e,
            );
            break;
          case 3:
          case 4:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              s,
              i,
              ColorUtils_1.ColorUtils.LinearBlue,
              e,
            );
            break;
          case 5:
          case 6:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              s,
              i,
              ColorUtils_1.ColorUtils.LinearRed,
              e,
            );
            break;
          case 7:
          case 8:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              s,
              i,
              ColorUtils_1.ColorUtils.LinearCyan,
              e,
            );
            break;
          case 9:
          case 10:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              s,
              i,
              ColorUtils_1.ColorUtils.LinearWhite,
              e,
            );
        }
        t += 1;
      }
    }
  }
  OnClear() {
    (this.Character = void 0), (this.TargetCharacter = void 0);
  }
}
(TsTaskQueryFleeLocation.StaticVariablesInited = !1),
  (TsTaskQueryFleeLocation.QuaternionQueue = void 0),
  (exports.default = TsTaskQueryFleeLocation);
//# sourceMappingURL=TsTaskQueryFleeLocation.js.map
