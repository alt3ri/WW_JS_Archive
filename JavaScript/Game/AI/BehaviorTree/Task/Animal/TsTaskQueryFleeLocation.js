"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const BlackboardController_1 = require("../../../../World/Controller/BlackboardController");
const AiContollerLibrary_1 = require("../../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const BLACKBOARD_KEY_FLEE_LOCATION = "FleeLocation";
const ANGLE_INTERVAL = 30;
const RADIUS = 300;
const TURN_COST_WEIGHT = 0.25;
const TURN_COST_WEIGHT_2 = 0.75;
const TURN_COST_WEIGHT_3 = 1;
const TURN_COST_DIVIDING_LINE_2 = 0;
const TURN_COST_DIVIDING_LINE_3 = 0.707;
const TEST_MODE = !1;
const QUERY_LOCATION_CD = 0.5;
const Z_ALLOWABLE_DIFFERENCE = 45;
class QuatNode {
  constructor(t, i) {
    (this.Quaternion = Quat_1.Quat.Create(t)),
      (this.CostBase = i),
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
    const i = MathUtils_1.PI_DEG / ANGLE_INTERVAL;
    for (let t = 1; t < i; ++t) {
      const s = t * ANGLE_INTERVAL * 0.5 * MathUtils_1.MathUtils.DegToRad;
      var e = Quat_1.Quat.Create(0, 0, Math.sin(s), Math.cos(s));
      var e =
        (TsTaskQueryFleeLocation.QuaternionQueue.push(e),
        Quat_1.Quat.Create(0, 0, Math.sin(-s), Math.cos(-s)));
      TsTaskQueryFleeLocation.QuaternionQueue.push(e);
    }
  }
  InitTsVariables(t) {
    if (!this.IsInitTsVariables) {
      (this.TsTargetKey = this.TargetKey),
        (this.VectorCache1 = Vector_1.Vector.Create()),
        (this.VectorCache2 = Vector_1.Vector.Create()),
        (this.VectorCache3 = Vector_1.Vector.Create()),
        (this.QuatNodeQueue = new Array());
      for (const s of TsTaskQueryFleeLocation.QuaternionQueue) {
        const i = new QuatNode(s, Math.abs(s.Z));
        this.QuatNodeQueue.push(i);
      }
      (this.NavigationPath = new Array()),
        (this.CdInternal = -1),
        (this.IsInitTsVariables = !0);
    }
  }
  ReceiveExecuteAI(t, i) {
    TsTaskQueryFleeLocation.StaticVariablesInited ||
      (TsTaskQueryFleeLocation.InitStaticVariables(),
      (TsTaskQueryFleeLocation.StaticVariablesInited = !0));
    let s = t.AiController;
    s
      ? (this.InitTsVariables(s),
        !(Time_1.Time.WorldTimeSeconds < this.CdInternal) &&
        ((this.CdInternal = Time_1.Time.WorldTimeSeconds + QUERY_LOCATION_CD),
        (this.Character = s.CharActorComp),
        this.FindTarget()) &&
        this.QueryFleeLocation()
          ? ((s = this.NavigationPath.length),
            (s = this.NavigationPath[s - 1]),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              this.Character.Entity.Id,
              BLACKBOARD_KEY_FLEE_LOCATION,
              s.X,
              s.Y,
              s.Z,
            ),
            this.Finish(!0))
          : this.Finish(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  FindTarget() {
    if (this.TsTargetKey) {
      let t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
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
    const t = this.Character.ActorLocationProxy;
    const i =
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
    for (const h of this.QuatNodeQueue)
      h.Quaternion.RotateVector(this.VectorCache1, this.VectorCache2),
        h.VectorCache.DeepCopy(this.VectorCache2),
        (this.VectorCache2.Z = 0),
        this.VectorCache2.Normalize(),
        (h.Cost = 0.5 * (1 - i.DotProduct(this.VectorCache2))),
        h.VectorCache.AdditionEqual(t);
    let s = TURN_COST_WEIGHT;
    const e = this.VectorCache3.DotProduct(i);
    e > TURN_COST_DIVIDING_LINE_3
      ? (s = TURN_COST_WEIGHT_3)
      : e > TURN_COST_DIVIDING_LINE_2 && (s = TURN_COST_WEIGHT_2),
      this.QuatNodeQueue.sort(
        (t, i) => s * (t.Cost - i.Cost) + (1 - s) * (t.CostBase - i.CostBase),
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
        var o;
        var r = Vector_1.Vector.Create((0, puerts_1.$unref)(r));
        const a = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
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
  CheckLegalZ(t, i) {
    return Math.abs(t.Z - i.Z) <= Z_ALLOWABLE_DIFFERENCE;
  }
  DebugDraw(t, i) {
    UE.KismetSystemLibrary.DrawDebugSphere(this, t, 20, 10, i, 0.25);
  }
  DebugDraw2() {
    if (GlobalData_1.GlobalData.IsPlayInEditor && TEST_MODE) {
      const i = 0.02;
      const s = 10;
      const e = 30;
      let t = 0;
      for (const r of this.QuatNodeQueue) {
        switch (t) {
          case 0:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              e,
              s,
              ColorUtils_1.ColorUtils.LinearGreen,
              i,
            );
            break;
          case 1:
          case 2:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              e,
              s,
              ColorUtils_1.ColorUtils.LinearYellow,
              i,
            );
            break;
          case 3:
          case 4:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              e,
              s,
              ColorUtils_1.ColorUtils.LinearBlue,
              i,
            );
            break;
          case 5:
          case 6:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              e,
              s,
              ColorUtils_1.ColorUtils.LinearRed,
              i,
            );
            break;
          case 7:
          case 8:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              e,
              s,
              ColorUtils_1.ColorUtils.LinearCyan,
              i,
            );
            break;
          case 9:
          case 10:
            UE.KismetSystemLibrary.DrawDebugSphere(
              this,
              r.VectorCache.ToUeVector(),
              e,
              s,
              ColorUtils_1.ColorUtils.LinearWhite,
              i,
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
// # sourceMappingURL=TsTaskQueryFleeLocation.js.map
