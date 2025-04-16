"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  RenderDataManager_1 = require("../../Data/RenderDataManager"),
  SceneCharacterWaterEffect_1 = require("./SceneCharacterWaterEffect"),
  PROFILE_KEY = "SceneCharacterInteraction_CheckInWater";
class SceneCharacterInteraction {
  constructor() {
    (this.OwnerCharacter = void 0),
      (this.SwimComponent = void 0),
      (this.ActorLocation = void 0),
      (this.TsActorLocation = void 0),
      (this.TsPreviousActorLocation = void 0),
      (this.ActorSpeed = void 0),
      (this.Config = void 0),
      (this.WaterEffect = void 0),
      (this.CapsuleHalfHeight = 0),
      (this.IsEnable = !1),
      (this.IsInWaterOrOnMaterial = !1),
      (this.PhysicalMaterial = void 0),
      (this.WaterHeight = 0),
      (this.WaterNormal = void 0),
      (this.UpdateWaterStateInternal = 0.3),
      (this.UpdateWaterStateInternalPc = 0.15),
      (this.UpdateWaterStateInternalScale = 1),
      (this.UpdateWaterStateCounter = 0),
      (this.TempVector = void 0);
  }
  SetInWater() {
    (this.IsInWaterOrOnMaterial = !0), (this.PhysicalMaterial = void 0);
  }
  SetOnMaterial(t) {
    (this.IsInWaterOrOnMaterial = !0), (this.PhysicalMaterial = t);
  }
  GetInWater() {
    return this.IsInWaterOrOnMaterial && void 0 === this.PhysicalMaterial;
  }
  GetWaterHeight() {
    return this.WaterHeight;
  }
  GetWaterDepth() {
    return this.WaterHeight - (this.TsActorLocation.Z - this.CapsuleHalfHeight);
  }
  Start(t, e, i = 1) {
    (this.OwnerCharacter = t),
      (this.UpdateWaterStateInternalScale = i),
      e
        ? ((this.Config = e), this.Init(), this.Enable())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 25, ": 创建了没有配置的交互控制", [
            "this.OwnerCharacter.GetName()",
            this.OwnerCharacter.GetName(),
          ]);
  }
  Update(e) {
    if (this.IsEnable && UE.KismetSystemLibrary.IsValid(this.OwnerCharacter)) {
      (this.ActorLocation = this.OwnerCharacter.D_K2_GetActorLocation()),
        this.TsPreviousActorLocation.DeepCopy(this.TsActorLocation),
        this.TsActorLocation.FromUeVector(this.ActorLocation),
        this.TsActorLocation.Subtraction(
          this.TsPreviousActorLocation,
          this.TempVector,
        ),
        this.TempVector.Division(e, this.ActorSpeed);
      let t = !0;
      (this.UpdateWaterStateCounter -= e),
        0 < this.UpdateWaterStateCounter
          ? (t = !1)
          : (this.UpdateWaterStateCounter = this.UpdateWaterStateInternal),
        this.WaterEffect &&
          (t &&
            (this.CheckInWater(e),
            (e = this.TsActorLocation.Z - this.CapsuleHalfHeight),
            this.IsInWaterOrOnMaterial
              ? this.PhysicalMaterial
                ? this.WaterEffect.SetStateOnMaterial(
                    this.PhysicalMaterial,
                    this.WaterHeight - e,
                    this.WaterNormal,
                    this.ActorSpeed,
                    this.TsActorLocation,
                    this.WaterHeight,
                  )
                : this.WaterEffect.SetStateInWater(
                    this.WaterHeight - e,
                    this.WaterNormal,
                    this.ActorSpeed,
                    this.TsActorLocation,
                    this.WaterHeight,
                  )
              : this.WaterEffect.SetStateNone(this.ActorSpeed)),
          this.WaterEffect.Tick());
    }
  }
  Init() {
    this.OwnerCharacter?.CapsuleComponent &&
      ((this.CapsuleHalfHeight =
        this.OwnerCharacter.CapsuleComponent.CapsuleHalfHeight),
      (this.WaterEffect =
        new SceneCharacterWaterEffect_1.SceneCharacterWaterEffect()),
      (this.WaterEffect.Config = this.Config.水特效),
      this.WaterEffect.Start(this.OwnerCharacter),
      this.WaterEffect.Enable());
    var t =
      1 ===
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
        this.OwnerCharacter,
      );
    (this.IsEnable = !1),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.ActorSpeed = Vector_1.Vector.Create()),
      this.OwnerCharacter &&
        ((this.ActorLocation = this.OwnerCharacter.D_K2_GetActorLocation()),
        (this.TsActorLocation = Vector_1.Vector.Create(this.ActorLocation)),
        (this.TsPreviousActorLocation = Vector_1.Vector.Create(
          this.ActorLocation,
        ))),
      t && (this.UpdateWaterStateInternal = this.UpdateWaterStateInternalPc),
      (this.UpdateWaterStateInternal *= this.UpdateWaterStateInternalScale);
  }
  Enable() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 25, "交互配置启用", [
        "Actor",
        this.OwnerCharacter?.GetName(),
      ]),
      SceneCharacterInteraction.koe(),
      (this.IsEnable = !0),
      (this.SwimComponent =
        this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(76)),
      this.OwnerCharacter.CapsuleComponent && this.CheckInWater(0);
  }
  Disable() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 25, "交互配置禁用", [
        "Actor",
        this.OwnerCharacter?.GetName(),
      ]),
      (this.IsEnable = !1),
      this.ClearInWaterOrOnMaterialState(),
      this.WaterEffect && this.WaterEffect.Disable();
  }
  GetEnabled() {
    return this.IsEnable;
  }
  Destroy() {
    this.Disable();
  }
  ClearInWaterOrOnMaterialState() {
    (this.IsInWaterOrOnMaterial = !1), (this.PhysicalMaterial = void 0);
  }
  static koe() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass()),
      e =
        ((t.WorldContextObject = GlobalData_1.GlobalData.World),
        (t.bIsSingle = !1),
        (t.bIgnoreSelf = !0),
        (t.Radius = 1),
        UE.NewArray(UE.BuiltinByte)),
      e =
        (e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.KuroWater),
        (0, puerts_1.$ref)(e));
    t.SetObjectTypesQuery(e),
      (t.DrawTime = 10),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        t,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        t,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      t.SetDrawDebugTrace(this.Z1r ? 2 : 0),
      (SceneCharacterInteraction.bsr = t);
  }
  static SetTraceDebug(t) {
    SceneCharacterInteraction.bsr.SetDrawDebugTrace(t ? 2 : 0);
  }
  CheckInWater(t) {
    if (this.Config?.启用水面交互) {
      SceneCharacterInteraction.bsr || SceneCharacterInteraction.koe();
      var i = this.OwnerCharacter.CapsuleComponent,
        s = i.D_K2_GetComponentLocation(),
        h =
          this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(
            176,
          );
      let t = new UE.VectorDouble(0, 0, i.CapsuleHalfHeight),
        e = new UE.VectorDouble(
          0,
          0,
          -i.CapsuleHalfHeight - this.Config.射线向下延长,
        );
      h &&
        ((h = h.GravityDirect.ToUeVector().GetSafeNormal(
          MathCommon_1.MathCommon.SmallNumber,
        )),
        (t = h.op_Multiply(-i.CapsuleHalfHeight)),
        (e = h.op_Multiply(i.CapsuleHalfHeight + this.Config.射线向下延长)));
      (h = s.op_Addition(t)),
        (i = s.op_Addition(e)),
        (s = SceneCharacterInteraction.bsr),
        (h =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, h),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, i),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(s, PROFILE_KEY))),
        (i = s.HitResult);
      if (h && i.bBlockingHit) {
        var r = s.HitResult,
          a = r.GetHitCount(),
          o =
            RenderDataManager_1.RenderDataManager.Get().GetGlobalFootstepMaterial();
        for (let e = 0; e < a; ++e) {
          if (
            2 ===
            r.Components.Get(e).BodyInstance.CollisionResponses
              .ResponseToChannels.GameTraceChannel2
          )
            return (
              (this.WaterHeight = r.LocationZ_Array.Get(e)),
              (this.WaterNormal = Vector_1.Vector.Create(
                r.ImpactNormalX_Array.Get(e),
                r.ImpactNormalY_Array.Get(e),
                r.ImpactNormalZ_Array.Get(e),
              )),
              void this.SetInWater()
            );
          var n = r.Components.Get(e);
          let t = void 0;
          if (
            (n instanceof UE.LandscapeHeightfieldCollisionComponent
              ? ((t = r.PhysMaterials.Get(e)) &&
                  this.WaterEffect.IsMaterialInUse(t)) ||
                (t = o)
              : 2 !==
                  n.BodyInstance.CollisionResponses.ResponseToChannels
                    .WorldStatic ||
                ((t =
                  UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(
                    n,
                  )) &&
                  this.WaterEffect.IsMaterialInUse(t)) ||
                (t = o),
            t && this.WaterEffect.IsMaterialInUse(t))
          )
            return (
              (this.WaterHeight = r.LocationZ_Array.Get(e)),
              (this.WaterNormal = Vector_1.Vector.Create(
                r.ImpactNormalX_Array.Get(e),
                r.ImpactNormalY_Array.Get(e),
                r.ImpactNormalZ_Array.Get(e),
              )),
              void this.SetOnMaterial(t)
            );
          if (
            2 ===
            r.Components.Get(e).BodyInstance.CollisionResponses
              .ResponseToChannels.WorldStatic
          )
            break;
        }
      }
      this.ClearInWaterOrOnMaterialState();
    } else
      this.Config?.启用简易水面交互 &&
        this.SwimComponent &&
        ((h = this.SwimComponent.GetAboveFootWaterSurfaceInfo())
          ? ((this.WaterHeight = h.WaterHeight + h.Location.Z),
            (this.WaterNormal = h.SurfaceNormal),
            this.SetInWater())
          : this.ClearInWaterOrOnMaterialState());
  }
}
(SceneCharacterInteraction.bsr = void 0),
  (SceneCharacterInteraction.Z1r = !1),
  (exports.default = SceneCharacterInteraction);
//# sourceMappingURL=SceneCharacterInteraction.js.map
