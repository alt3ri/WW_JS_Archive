"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../../../UniverseEditor/Interface/IEntity"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils"),
  BlackboardController_1 = require("../../../../World/Controller/BlackboardController"),
  TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase"),
  DISTANCE_FROM_WATER_SURFACE = 200,
  SAFE_RANGE = 20,
  BLACKBOARD_KEY_SWIM_LOCATION = "SwimLocation",
  PROFILE_KEY = "TsTaskQuerySwimLocation";
class TsTaskQuerySwimLocation extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Angle = 0),
      (this.InnerDiameter = 0),
      (this.OuterDiameter = 0),
      (this.DebugMode = !1),
      (this.IsInitTsVariables = !1),
      (this.TsAngle = 0),
      (this.TsInnerDiameter = 0),
      (this.TsOuterDiameter = 0),
      (this.TsDebugMode = !1),
      (this.HaveRangeConfig = !1),
      (this.RangeInited = !1),
      (this.Center = void 0),
      (this.Size = void 0),
      (this.Rotator = void 0),
      (this.VectorCache2 = void 0),
      (this.TargetVector = void 0),
      (this.VectorCache = void 0),
      (this.TraceElement = void 0),
      (this.ShallowTraceElement = void 0),
      (this.InitZ = -0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsAngle = this.Angle),
      (this.TsInnerDiameter = this.InnerDiameter),
      (this.TsOuterDiameter = this.OuterDiameter),
      (this.TsDebugMode = this.DebugMode),
      (this.HaveRangeConfig = !1),
      (this.RangeInited = !1),
      (this.Center = Vector_1.Vector.Create()),
      (this.Size = Vector_1.Vector.Create()),
      (this.Rotator = Rotator_1.Rotator.Create()),
      (this.TargetVector = Vector_1.Vector.Create()),
      (this.VectorCache = Vector_1.Vector.Create()),
      (this.VectorCache2 = Vector_1.Vector.Create()));
  }
  ReceiveExecuteAI(t, i) {
    var s = t.AiController;
    if (s) {
      this.InitTsVariables(), this.InitTraceElement();
      var e,
        s = s.CharActorComp;
      const h = s.CreatureData;
      if (((this.HaveRangeConfig = this.InitRange(h)), !this.InitZ)) {
        const h = s.CreatureData;
        this.InitZ = h.GetInitLocation().Z ?? s.ActorLocationProxy.Z;
      }
      this.ShallowTraceElement.SetBoxHalfSize(
        s.Radius + SAFE_RANGE,
        s.Radius + SAFE_RANGE,
        s.HalfHeight + SAFE_RANGE,
      ),
        this.HaveRangeConfig
          ? ((e = TsTaskQuerySwimLocation.RandomPointInBoxRange2D(
              this.Size.X,
              this.Size.Y,
              this.Rotator.Yaw,
            )),
            (this.TargetVector.X = this.Center.X + e.X),
            (this.TargetVector.Y = this.Center.Y + e.Y))
          : ((e = TsTaskQuerySwimLocation.RandomPointInFanRing(
              this.TsInnerDiameter,
              this.TsOuterDiameter,
              ((s.ActorRotationProxy.Yaw - this.TsAngle / 2) / 180) * Math.PI,
              ((s.ActorRotationProxy.Yaw + this.TsAngle / 2) / 180) * Math.PI,
            )),
            (this.TargetVector.X = s.ActorLocationProxy.X + e.X),
            (this.TargetVector.Y = s.ActorLocationProxy.Y + e.Y)),
        (this.TargetVector.Z = this.InitZ),
        !this.CheckInWater(this.TargetVector) ||
        !this.CheckReachable(s.ActorLocationProxy, this.TargetVector) ||
        (this.DebugDrawRange(),
        this.HaveRangeConfig && !this.IsInBoxRange2D(this.TargetVector))
          ? (this.DebugDraw(
              this.TargetVector,
              ColorUtils_1.ColorUtils.LinearRed,
            ),
            this.Finish(!1))
          : (this.DebugDraw(
              this.TargetVector,
              ColorUtils_1.ColorUtils.LinearGreen,
            ),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              s.Entity.Id,
              BLACKBOARD_KEY_SWIM_LOCATION,
              this.TargetVector.X,
              this.TargetVector.Y,
              this.TargetVector.Z,
            ),
            this.Finish(!0));
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  InitRange(t) {
    if (!this.RangeInited) {
      var i = t.GetPbEntityInitData().ComponentsData,
        i = (0, IComponent_1.getComponent)(i, "AnimalComponent");
      if (!i || void 0 === i.MoveRange) return !1;
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
          i.MoveRange,
        ),
        s = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
          i.BlueprintType,
        ),
        i = (0, IEntity_1.decompressEntityData)(i, s),
        s = (0, IComponent_1.getComponent)(
          i.ComponentsData,
          "RangeComponent",
        ).Shape;
      if ("Box" !== s.Type) return !1;
      i = i.Transform;
      this.InitCenter(i, s),
        this.InitSize(i, s),
        this.InitRotator(i, s),
        (0 === this.Rotator.Pitch && 0 === this.Rotator.Roll) ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("BehaviorTree", 30, "池塘范围不支持Roll和Pitch", [
              "EntityConfigId",
              t.GetPbDataId(),
            ]),
          (this.Rotator.Pitch = 0),
          (this.Rotator.Roll = 0)),
        (this.RangeInited = !0);
    }
    return !0;
  }
  InitCenter(t, i) {
    this.Center || (this.Center = Vector_1.Vector.Create()),
      (this.Center.X = t?.Pos.X ?? 0),
      (this.Center.X += i.Center.X ?? 0),
      (this.Center.Y = t?.Pos.Y ?? 0),
      (this.Center.Y += i.Center.Y ?? 0),
      (this.Center.Z = t?.Pos.Z ?? 0),
      (this.Center.Z += i.Center.Z ?? 0);
  }
  InitSize(t, i) {
    this.Size || (this.Size = Vector_1.Vector.Create()),
      (this.Size.X = i.Size.X ?? 0),
      (this.Size.X *= t?.Scale?.X ?? 1),
      (this.Size.Y = i.Size.Y ?? 0),
      (this.Size.Y *= t?.Scale?.Y ?? 1),
      (this.Size.Z = i.Size.Z ?? 0),
      (this.Size.Z *= t?.Scale?.Z ?? 1);
  }
  InitRotator(t, i) {
    this.Rotator || (this.Rotator = Rotator_1.Rotator.Create()),
      (this.Rotator.Pitch = i.Rotator?.Y ?? 0),
      (this.Rotator.Pitch += t?.Rot?.Y ?? 0),
      (this.Rotator.Yaw = i.Rotator?.Z ?? 0),
      (this.Rotator.Yaw += t?.Rot?.Z ?? 0),
      (this.Rotator.Roll = i.Rotator?.X ?? 0),
      (this.Rotator.Roll += t?.Rot?.X ?? 0);
  }
  static RandomPointInBoxRange2D(t, i, s) {
    var t = MathUtils_1.MathUtils.GetRandomRange(-t, t),
      i = MathUtils_1.MathUtils.GetRandomRange(-i, i),
      s = s * MathUtils_1.MathUtils.DegToRad,
      e = Math.cos(s),
      s = Math.sin(s);
    return { X: t * e - i * s, Y: t * s + i * e };
  }
  static RandomPointInFanRing(t, i, s, e) {
    return e < s || i < t || t < 0
      ? { X: 0, Y: 0 }
      : ((t = MathUtils_1.MathUtils.GetRandomRange(t * t, i * i)),
        (i = MathUtils_1.MathUtils.GetRandomRange(s, e)),
        { X: (s = Math.sqrt(t)) * Math.cos(i), Y: s * Math.sin(i) });
  }
  IsInBoxRange2D(t) {
    this.VectorCache2.DeepCopy(t),
      this.VectorCache2.SubtractionEqual(this.Center);
    var t = this.VectorCache2.X,
      i = this.VectorCache2.Y,
      s = -this.Rotator.Yaw * MathUtils_1.MathUtils.DegToRad,
      e = Math.cos(s),
      s = Math.sin(s);
    return (
      (this.VectorCache2.X = e * t - s * i),
      (this.VectorCache2.Y = s * t + e * i),
      this.VectorCache2.X > -this.Size.X &&
        this.VectorCache2.X < +this.Size.X &&
        this.VectorCache2.Y > -this.Size.Y &&
        this.VectorCache2.Y < +this.Size.Y
    );
  }
  InitTraceElement() {
    this.TraceElement ||
      ((this.TraceElement = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.TraceElement.bIsSingle = !0),
      (this.TraceElement.bIgnoreSelf = !0),
      this.TraceElement.SetTraceTypeQuery(
        QueryTypeDefine_1.KuroTraceTypeQuery.Water,
      ),
      this.TraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.TraceElement,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.TraceElement,
        ColorUtils_1.ColorUtils.LinearRed,
      )),
      this.ShallowTraceElement ||
        ((this.ShallowTraceElement = UE.NewObject(
          UE.TraceBoxElement.StaticClass(),
        )),
        (this.ShallowTraceElement.bIsSingle = !1),
        (this.ShallowTraceElement.bIgnoreSelf = !0),
        this.ShallowTraceElement.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
        ),
        this.ShallowTraceElement.SetDrawDebugTrace(this.TsDebugMode ? 2 : 0),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.ShallowTraceElement,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.ShallowTraceElement,
          ColorUtils_1.ColorUtils.LinearRed,
        )),
      (this.TraceElement.WorldContextObject = this.GetWorld()),
      (this.ShallowTraceElement.WorldContextObject = this.GetWorld());
  }
  CheckInWater(t) {
    return (
      this.VectorCache.DeepCopy(t),
      (this.VectorCache.Z = t.Z + DISTANCE_FROM_WATER_SURFACE),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.TraceElement,
        this.VectorCache,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.TraceElement,
        t,
      ),
      !!TraceElementCommon_1.TraceElementCommon.LineTrace(
        this.TraceElement,
        PROFILE_KEY,
      )
    );
  }
  CheckReachable(t, i) {
    var s = RenderConfig_1.RenderConfig.WaterCollisionProfileName,
      t =
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.ShallowTraceElement,
          t,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.ShallowTraceElement,
          i,
        ),
        TraceElementCommon_1.TraceElementCommon.BoxTrace(
          this.ShallowTraceElement,
          PROFILE_KEY,
        ));
    if (t && this.ShallowTraceElement.HitResult.bBlockingHit) {
      var e = this.ShallowTraceElement.HitResult.Actors,
        h = this.ShallowTraceElement.HitResult.Components;
      for (let t = 0; t < e.Num(); t++) {
        var o = e.Get(t);
        if (void 0 !== o) {
          o = h.Get(t);
          if (o && !s.op_Equality(o.GetCollisionProfileName())) return !1;
        }
      }
    }
    return !0;
  }
  DebugDraw(t, i) {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      this.TsDebugMode &&
      UE.KismetSystemLibrary.DrawDebugSphere(
        this,
        t.ToUeVector(),
        30,
        10,
        i,
        1.5,
      );
  }
  DebugDrawRange() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      this.TsDebugMode &&
      this.HaveRangeConfig &&
      UE.KismetSystemLibrary.DrawDebugBox(
        this,
        this.Center.ToUeVector(),
        this.Size.ToUeVector(),
        ColorUtils_1.ColorUtils.LinearGreen,
        this.Rotator.ToUeRotator(),
        1.5,
      );
  }
}
exports.default = TsTaskQuerySwimLocation;
//# sourceMappingURL=TsTaskQuerySwimLocation.js.map
