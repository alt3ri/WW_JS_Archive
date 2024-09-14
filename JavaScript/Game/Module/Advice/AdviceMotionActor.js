"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceMotionActor = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelUtil_1 = require("../../../Core/Utils/ModelUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  REVERTIME = 3e3;
class AdviceMotionActor {
  constructor() {
    (this.c9e = void 0),
      (this.ActorInternal = void 0),
      (this.SkeletalMeshInternal = void 0),
      (this.l9e = void 0),
      (this._9e = 0),
      (this.X9e = 0),
      (this.Td = !1),
      (this.g9e = () => {
        this.f9e(),
          this.SkeletalMeshInternal.SetHiddenInGame(!0),
          (this.c9e = void 0),
          ModelManager_1.ModelManager.AdviceModel.RecycleMotionActor(this),
          ModelManager_1.ModelManager.AdviceModel.RemovePlayingMotionEntity(
            this.X9e,
          );
      }),
      (this.OnActorDestroy = () => {
        this.jm(),
          this.ActorInternal?.IsValid() &&
            (ActorSystem_1.ActorSystem.Put(this.ActorInternal),
            (this.ActorInternal = void 0)),
          ModelManager_1.ModelManager.AdviceModel.RemovePlayingMotionEntity(
            this.X9e,
          ),
          ModelManager_1.ModelManager.AdviceModel.RemoveMotionActor(this);
      });
  }
  PlayMotion(t) {
    (this.X9e = t),
      this.M9e(t, () => {
        this.$9e(t);
      });
  }
  M9e(t, s) {
    var t = EntitySystem_1.EntitySystem.Get(t),
      i = t.GetComponent(187),
      t = t.GetComponent(0).GetAdviceInfo().GetAdviceData().GetAdviceMotionId();
    0 !== t &&
      (this.ActorInternal ||
        ((this.ActorInternal = ActorSystem_1.ActorSystem.Get(
          UE.Actor.StaticClass(),
          i.ActorTransform,
        )),
        (this.SkeletalMeshInternal = this.ActorInternal.AddComponentByClass(
          UE.SkeletalMeshComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
        (this.l9e = this.ActorInternal.AddComponentByClass(
          UE.CharRenderingComponent_C.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
        this.SkeletalMeshInternal.SetEnableGravity(!1),
        this.SkeletalMeshInternal.SetCollisionEnabled(0),
        this.SkeletalMeshInternal.SetSimulatePhysics(!1),
        this.l9e.Init(0)),
      this.ActorInternal.K2_SetActorRelativeLocation(
        i.ActorLocationProxy.ToUeVector(),
        !1,
        void 0,
        !0,
      ),
      this.ActorInternal.K2_SetActorRotation(
        i.ActorRotationProxy.ToUeRotator(),
        !1,
      ),
      (i = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(t)),
      (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)),
      (i = ModelUtil_1.ModelUtil.GetModelConfig(t.MeshId)),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        i.网格体.ToAssetPathName(),
        UE.SkeletalMesh,
        (t, i) => {
          this.SkeletalMeshInternal?.SetSkeletalMesh(t),
            this.SkeletalMeshInternal?.SetHiddenInGame(!0),
            s();
        },
      ),
      this.ActorInternal.OnDestroyed.Add(this.OnActorDestroy));
  }
  $9e(t) {
    this.jm(), (this.Td = !0), this.f9e();
    t = EntitySystem_1.EntitySystem.Get(t)
      .GetComponent(0)
      .GetAdviceInfo()
      .GetAdviceData()
      .GetAdviceMotionId();
    if (0 !== t) {
      this.f9e();
      const s = this.SkeletalMeshInternal;
      var t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionAnimation(t);
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.AnimationAsset,
        (t, i) => {
          this.Td && s.PlayAnimation(t, !1), this.Y9e();
        },
      ),
        s.SetPlayRate(1),
        s.SetPosition(1),
        this.l9e.AddComponentByCase(0, this.SkeletalMeshInternal),
        this.l9e &&
          ((t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceModelMat()),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.PD_CharacterControllerData_C,
            (t, i) => {
              this.Td && (this._9e = this.l9e.AddMaterialControllerData(t)),
                this.Y9e();
            },
          )),
        ModelManager_1.ModelManager.AdviceModel.AddPlayingMotionEntity(
          this.X9e,
          this,
        );
    }
  }
  Y9e() {
    const t = this.SkeletalMeshInternal;
    t &&
      this.Td &&
      0 < this._9e &&
      TimerSystem_1.TimerSystem.Delay(() => {
        t &&
          this.Td &&
          0 < this._9e &&
          (t.SetHiddenInGame(!1),
          (this.c9e = TimerSystem_1.TimerSystem.Delay(this.g9e, REVERTIME)));
      }, TimerSystem_1.MIN_TIME);
  }
  jm() {
    (this.Td = !1),
      void 0 !== this.c9e &&
        (TimerSystem_1.TimerSystem.Remove(this.c9e), (this.c9e = void 0));
  }
  f9e() {
    this.l9e &&
      0 < this._9e &&
      (this.l9e.RemoveMaterialControllerDataWithEnding(this._9e),
      (this._9e = 0));
  }
}
exports.AdviceMotionActor = AdviceMotionActor;
//# sourceMappingURL=AdviceMotionActor.js.map
