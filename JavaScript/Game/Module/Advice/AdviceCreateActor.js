"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceCreateActor = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  REVERTIME = 3e3;
class AdviceCreateActor {
  constructor() {
    (this.ActorInternal = void 0),
      (this.SkeletalMeshInternal = void 0),
      (this.$6e = void 0),
      (this.Y6e = 0),
      (this.Td = !1),
      (this.J6e = 0),
      (this.z6e = void 0),
      (this.Z6e = !1),
      (this.e8e = !1),
      (this.t8e = !1),
      (this.i8e = () => {
        this.o8e(),
          this.SkeletalMeshInternal.SetHiddenInGame(!0),
          this.SkeletalMeshInternal.Stop(),
          this.jm(),
          this.r8e(!0);
      }),
      (this.n8e = () => {
        this.jm(),
          this.ActorInternal?.IsValid() &&
            (ActorSystem_1.ActorSystem.Put(this.ActorInternal),
            (this.ActorInternal = void 0)),
          ModelManager_1.ModelManager.AdviceModel.OnAdviceCreateActorDestroy();
      });
  }
  Init() {
    this.s8e(), this.a8e();
  }
  PlayAnimation(t) {
    this.r8e(!1), this.h8e(t);
  }
  r8e(i) {
    var e =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
          this.J6e,
        ),
      s = e.Num();
    for (let t = 0; t < s; t++) e.Get(t).SetActorHiddenInGame(!i);
  }
  HideAnimation() {
    this.jm(),
      this.o8e(),
      this.SkeletalMeshInternal.SetHiddenInGame(!0),
      this.SkeletalMeshInternal.Stop(),
      this.r8e(!0);
  }
  a8e() {
    var t,
      i,
      e,
      s =
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceDefaultModelConfig(),
      s = ModelUtil_1.ModelUtil.GetModelConfig(s);
    s &&
      (s = s.场景交互物) &&
      ((t = Vector_1.Vector.Create()),
      (i = Rotator_1.Rotator.Create()),
      t.DeepCopy(
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy,
      ),
      (t.Z =
        t.Z -
        Global_1.Global.BaseCharacter.CharacterActorComponent.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
      i.DeepCopy(
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorRotationProxy,
      ),
      (e = ModelManager_1.ModelManager.CameraModel.CurrentCameraActor),
      (i.Yaw = e.GetTransform().Rotator().Yaw + 90),
      (this.J6e =
        SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(
          s.AssetPathName?.toString(),
          0,
          t.ToUeVector(),
          i.ToUeRotator(),
          () => {},
        )));
  }
  s8e() {
    this.ActorInternal ||
      ((this.ActorInternal = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        MathUtils_1.MathUtils.DefaultTransform,
        void 0,
      )),
      (this.SkeletalMeshInternal = this.ActorInternal.AddComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      (this.$6e = this.ActorInternal.AddComponentByClass(
        UE.CharRenderingComponent_C.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      this.SkeletalMeshInternal.SetEnableGravity(!1),
      this.SkeletalMeshInternal.SetCollisionEnabled(0),
      this.SkeletalMeshInternal.SetSimulatePhysics(!1),
      this.$6e.Init(0)),
      this.SkeletalMeshInternal.SetHiddenInGame(!0),
      this.SkeletalMeshInternal.Stop(),
      this.RefreshPosition(),
      this.ActorInternal.OnDestroyed.Add(this.n8e);
  }
  RefreshPosition() {
    var t = Vector_1.Vector.Create(),
      i = Rotator_1.Rotator.Create(),
      e =
        (t.DeepCopy(
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorLocationProxy,
        ),
        (t.Z =
          t.Z -
          Global_1.Global.BaseCharacter.CharacterActorComponent.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()),
        i.DeepCopy(
          Global_1.Global.BaseCharacter.CharacterActorComponent
            .ActorRotationProxy,
        ),
        ModelManager_1.ModelManager.CameraModel.CurrentCameraActor);
    (i.Yaw = e.GetTransform().Rotator().Yaw + 90),
      this.ActorInternal.K2_SetActorLocation(t.ToUeVector(), !1, void 0, !0),
      this.ActorInternal.K2_SetActorRotation(i.ToUeRotator(), !1);
  }
  h8e(t) {
    (this.Td = !0), this.jm(), this.o8e();
    const e = this.SkeletalMeshInternal;
    this.SkeletalMeshInternal.SetHiddenInGame(!0),
      this.SkeletalMeshInternal.Stop();
    var i = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(t),
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    const s = ModelUtil_1.ModelUtil.GetModelConfig(i.MeshId),
      o =
        ((this.Z6e = !1),
        (this.e8e = !1),
        (this.t8e = !1),
        (this.l8e = void 0),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          s.网格体.ToAssetPathName(),
          UE.SkeletalMesh,
          (t, i) => {
            e.SetSkeletalMesh(t),
              (this.e8e = !0),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Advice",
                  28,
                  "modelConfig.网格体.ToAssetPathName()读取",
                  ["mesh", s.网格体.ToAssetPathName()],
                ),
              this._8e();
          },
        ),
        ConfigManager_1.ConfigManager.MotionConfig.GetMotionAnimation(t));
    if (
      (ResourceSystem_1.ResourceSystem.LoadAsync(
        o,
        UE.AnimationAsset,
        (t, i) => {
          (this.Z6e = !0),
            (this.l8e = t),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Advice", 28, "动画读取", ["animation", o]),
            this._8e();
        },
      ),
      e.SetPlayRate(1),
      e.SetPosition(1),
      this.$6e)
    ) {
      this.$6e.AddComponentByCase(0, this.SkeletalMeshInternal);
      const r = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceModelMat();
      ResourceSystem_1.ResourceSystem.LoadAsync(
        r,
        UE.PD_CharacterControllerData_C,
        (t, i) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Advice", 28, "溯言特效读取", ["effectPath", r]),
            (this.t8e = !0),
            this.Td && (this.Y6e = this.$6e.AddMaterialControllerData(t)),
            this._8e();
        },
      );
    }
    this.z6e = TimerSystem_1.TimerSystem.Delay(this.i8e, REVERTIME);
  }
  _8e() {
    this.t8e &&
      this.e8e &&
      this.Z6e &&
      this.Td &&
      this.SkeletalMeshInternal &&
      (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Advice", 28, "显示Mesh"),
      this.SkeletalMeshInternal.SetHiddenInGame(!1),
      this.SkeletalMeshInternal.Play(!0),
      this.l8e) &&
      this.SkeletalMeshInternal.PlayAnimation(this.l8e, !1);
  }
  o8e() {
    this.$6e &&
      0 < this.Y6e &&
      (this.$6e.RemoveMaterialControllerDataWithEnding(this.Y6e),
      (this.Y6e = 0));
  }
  Destroy() {
    this.jm(),
      SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(
        this.J6e,
      ),
      ActorSystem_1.ActorSystem.Put(this.ActorInternal),
      (this.ActorInternal = void 0),
      ModelManager_1.ModelManager.AdviceModel.OnAdviceCreateActorDestroy();
  }
  jm() {
    void 0 !== this.z6e &&
      (TimerSystem_1.TimerSystem.Remove(this.z6e), (this.z6e = void 0));
  }
}
exports.AdviceCreateActor = AdviceCreateActor;
//# sourceMappingURL=AdviceCreateActor.js.map
