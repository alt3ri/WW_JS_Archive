"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  SceneCharacterWaterEffect_1 = require("./SceneCharacterWaterEffect"),
  PROFILE_KEY = "SceneCharacterInteraction_CheckInWater";
class SceneCharacterInteraction {
  constructor() {
    (this.OwnerCharacter = void 0),
      (this.SwimComponent = void 0),
      (this.GrassInteractionStrength = 0),
      (this.ActorLocation = void 0),
      (this.TsActorLocation = void 0),
      (this.TsPreviousActorLocation = void 0),
      (this.ActorSpeed = void 0),
      (this.Config = void 0),
      (this.WaterEffect = void 0),
      (this.GrassInteractionActor = void 0),
      (this.GrassInteractionComponent = void 0),
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
  Start(t, i, e = 1) {
    (this.OwnerCharacter = t),
      (this.UpdateWaterStateInternalScale = e),
      i
        ? ((this.Config = i), this.Init(), this.Enable())
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Render", 26, ": 创建了没有配置的交互控制", [
            "this.OwnerCharacter.GetName()",
            this.OwnerCharacter.GetName(),
          ]);
  }
  Update(i) {
    if (this.IsEnable && UE.KismetSystemLibrary.IsValid(this.OwnerCharacter)) {
      (this.ActorLocation = this.OwnerCharacter.K2_GetActorLocation()),
        this.TsPreviousActorLocation.DeepCopy(this.TsActorLocation),
        this.TsActorLocation.FromUeVector(this.ActorLocation),
        this.TsActorLocation.Subtraction(
          this.TsPreviousActorLocation,
          this.TempVector,
        ),
        this.TempVector.Division(i, this.ActorSpeed);
      let t = !0;
      (this.UpdateWaterStateCounter -= i),
        0 < this.UpdateWaterStateCounter
          ? (t = !1)
          : (this.UpdateWaterStateCounter = this.UpdateWaterStateInternal),
        this.WaterEffect &&
          (t &&
            (this.CheckInWater(i),
            (i = this.TsActorLocation.Z - this.CapsuleHalfHeight),
            this.IsInWaterOrOnMaterial
              ? this.PhysicalMaterial
                ? this.WaterEffect.SetStateOnMaterial(
                    this.PhysicalMaterial,
                    this.WaterHeight - i,
                    this.WaterNormal,
                    this.ActorSpeed,
                    this.TsActorLocation,
                    this.WaterHeight,
                  )
                : this.WaterEffect.SetStateInWater(
                    this.WaterHeight - i,
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
        ),
      i =
        ((this.GrassInteractionStrength = 0),
        (this.IsEnable = !1),
        (this.TempVector = Vector_1.Vector.Create()),
        (this.ActorSpeed = Vector_1.Vector.Create()),
        this.OwnerCharacter &&
          ((this.ActorLocation = this.OwnerCharacter.K2_GetActorLocation()),
          (this.TsActorLocation = Vector_1.Vector.Create(this.ActorLocation)),
          (this.TsPreviousActorLocation = Vector_1.Vector.Create(
            this.ActorLocation,
          ))),
        this.Config.植被交互相对位置);
    (i.Z = i.Z - this.CapsuleHalfHeight),
      this.OwnerCharacter &&
        t &&
        this.Config.启用植被交互 &&
        ((this.GrassInteractionActor = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          void 0,
        )),
        (this.GrassInteractionComponent =
          this.GrassInteractionActor.AddComponentByClass(
            UE.KuroGrassInteractionSphereComponent.StaticClass(),
            !1,
            new UE.Transform(i),
            !1,
          )),
        this.GrassInteractionActor.K2_AttachToActor(
          this.OwnerCharacter,
          void 0,
          0,
          0,
          0,
          !1,
        ),
        (this.GrassInteractionComponent.Radius = this.Config.植被交互半径)),
      t && (this.UpdateWaterStateInternal = this.UpdateWaterStateInternalPc),
      (this.UpdateWaterStateInternal *= this.UpdateWaterStateInternalScale);
  }
  Enable() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 26, "交互配置启用", [
        "Actor",
        this.OwnerCharacter?.GetName(),
      ]),
      SceneCharacterInteraction.koe(),
      (this.IsEnable = !0),
      (this.SwimComponent =
        this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(68)),
      this.OwnerCharacter.CapsuleComponent && this.CheckInWater(0),
      this.GrassInteractionComponent &&
        (this.GrassInteractionComponent.bEnabled = !0);
  }
  Disable() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 26, "交互配置禁用", [
        "Actor",
        this.OwnerCharacter?.GetName(),
      ]),
      (this.IsEnable = !1),
      this.ClearInWaterOrOnMaterialState(),
      this.WaterEffect && this.WaterEffect.Disable(),
      this.GrassInteractionComponent &&
        (this.GrassInteractionComponent.bEnabled = !1);
  }
  GetEnabled() {
    return this.IsEnable;
  }
  Destroy() {
    this.Disable(),
      this.GrassInteractionActor &&
        ((this.GrassInteractionComponent = void 0),
        ActorSystem_1.ActorSystem.Put(this.GrassInteractionActor),
        (this.GrassInteractionActor = void 0));
  }
  ClearInWaterOrOnMaterialState() {
    (this.IsInWaterOrOnMaterial = !1), (this.PhysicalMaterial = void 0);
  }
  static koe() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass()),
      i =
        ((t.WorldContextObject = GlobalData_1.GlobalData.World),
        (t.bIsSingle = !1),
        (t.bIgnoreSelf = !0),
        (t.Radius = 1),
        UE.NewArray(UE.BuiltinByte)),
      i =
        (i.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
        (0, puerts_1.$ref)(i));
    t.SetObjectTypesQuery(i),
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
        e = i.K2_GetComponentLocation(),
        s = e.op_Addition(new UE.Vector(0, 0, i.CapsuleHalfHeight)),
        e = e.op_Addition(
          new UE.Vector(0, 0, -i.CapsuleHalfHeight - this.Config.射线向下延长),
        ),
        i = SceneCharacterInteraction.bsr,
        s =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, s),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(i, PROFILE_KEY)),
        e = i.HitResult;
      if (s && e.bBlockingHit) {
        var h = i.HitResult,
          r = h.GetHitCount();
        for (let i = 0; i < r; ++i) {
          if (
            2 ===
            h.Components.Get(i).BodyInstance.CollisionResponses
              .ResponseToChannels.GameTraceChannel2
          )
            return (
              (this.WaterHeight = h.LocationZ_Array.Get(i)),
              (this.WaterNormal = Vector_1.Vector.Create(
                h.ImpactNormalX_Array.Get(i),
                h.ImpactNormalY_Array.Get(i),
                h.ImpactNormalZ_Array.Get(i),
              )),
              void this.SetInWater()
            );
          var o = h.Components.Get(i);
          let t = void 0;
          if (
            (t =
              o instanceof UE.LandscapeHeightfieldCollisionComponent
                ? h.PhysMaterials.Get(i)
                : UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(
                    o,
                  )) &&
            this.WaterEffect.IsMaterialInUse(t)
          )
            return (
              (this.WaterHeight = h.LocationZ_Array.Get(i)),
              (this.WaterNormal = Vector_1.Vector.Create(
                h.ImpactNormalX_Array.Get(i),
                h.ImpactNormalY_Array.Get(i),
                h.ImpactNormalZ_Array.Get(i),
              )),
              void this.SetOnMaterial(t)
            );
        }
      }
      this.ClearInWaterOrOnMaterialState();
    } else
      this.Config?.启用简易水面交互 &&
        this.SwimComponent &&
        ((s = this.SwimComponent.GetAboveFootWaterSurfaceInfo())
          ? ((this.WaterHeight = s.WaterHeight + s.Location.Z),
            (this.WaterNormal = s.SurfaceNormal),
            this.SetInWater())
          : this.ClearInWaterOrOnMaterialState());
  }
}
(SceneCharacterInteraction.bsr = void 0),
  (SceneCharacterInteraction.Z1r = !1),
  (exports.default = SceneCharacterInteraction);
//# sourceMappingURL=SceneCharacterInteraction.js.map
