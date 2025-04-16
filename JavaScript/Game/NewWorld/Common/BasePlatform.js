"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BasePlatformController =
    exports.VehicleBasePlatform =
    exports.SceneItemBasePlatform =
    exports.CharacterBasePlatform =
    exports.BasePlatform =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ActorUtils_1 = require("../../Utils/ActorUtils");
class BasePlatform {
  constructor(t) {
    (this.EntityHandle = void 0),
      (this.CreatureDataId = 0),
      (this.IsDeltaBaseSpeedNeedZ = !1),
      (this.EntityHandle = t);
  }
  GetTransform() {}
  TransformFromRelativeSpace(t, e, r, s) {
    var a = this.GetTransform();
    (0, puerts_1.$set)(r, UE.KismetMathLibrary.D_TransformLocation(a, t)),
      (0, puerts_1.$set)(s, UE.KismetMathLibrary.D_TransformRotation(a, e));
  }
  TransformToRelativeSpace(t, e, r, s) {
    var a = this.GetTransform();
    (0, puerts_1.$set)(
      r,
      UE.KismetMathLibrary.D_InverseTransformLocation(a, t),
    ),
      (0, puerts_1.$set)(
        s,
        UE.KismetMathLibrary.D_InverseTransformRotation(a, e),
      );
  }
  CheckLeave(t) {
    return !1;
  }
  OnCharacterEnter(t) {}
}
class CharacterBasePlatform extends (exports.BasePlatform = BasePlatform) {
  constructor(t) {
    super(t),
      (this.LeaveSphereCenter = void 0),
      (this.LeaveSphereRadiusSq = 0),
      (this.CacheLocation = Vector_1.Vector.Create()),
      (this.IsDeltaBaseSpeedNeedZ = !1);
    t = t.Entity.GetComponent(3).Actor.BasePlatform;
    t?.IsValid() &&
      ((this.LeaveSphereCenter = UE.KismetMathLibrary.Conv_VectorToVectorDouble(
        t.LeaveSphereCenter,
      )),
      (this.LeaveSphereRadiusSq = t.LeaveSphereRadius * t.LeaveSphereRadius));
  }
  GetTransform() {
    if (this.EntityHandle.Valid) {
      var t = this.EntityHandle.Entity.GetComponent(3),
        e = t.Actor.BasePlatform;
      if (e?.IsValid())
        return t.Actor.Mesh.D_GetSocketTransform(
          e.RootComponent.AttachSocketName,
        );
    }
  }
  CheckLeave(t) {
    var e;
    return (
      !this.EntityHandle?.Valid ||
      ((e = this.GetTransform()),
      (e = UE.KismetMathLibrary.D_TransformLocation(e, this.LeaveSphereCenter)),
      this.CacheLocation.DeepCopy(e),
      Vector_1.Vector.DistSquared(t, this.CacheLocation) >
        this.LeaveSphereRadiusSq)
    );
  }
}
exports.CharacterBasePlatform = CharacterBasePlatform;
class SceneItemBasePlatform extends BasePlatform {
  constructor(e) {
    super(e),
      (this.LeaveSphereRadiusSq = 0),
      (this.CacheLocation = Vector_1.Vector.Create()),
      (this.IsDeltaBaseSpeedNeedZ = !0);
    e = this.EntityHandle?.Entity.GetComponent(200)?.GetInteractionMainActor();
    if (e) {
      var r = e.GetAttachParentActor();
      if (r) {
        let t = void 0;
        t =
          (t =
            e.CollisionActors && 0 < e.CollisionActors.Num()
              ? e.CollisionActors?.Get(0)
              : t) || r;
        (e = (0, puerts_1.$ref)(void 0)),
          (r = (t.GetActorBounds(!0, void 0, e, !0), (0, puerts_1.$unref)(e))),
          (e = Math.max(r.X, r.Y, r.Z));
        this.LeaveSphereRadiusSq = (e += 50) * e;
      }
    }
  }
  GetTransform() {
    return this.EntityHandle?.Entity.GetComponent(1).ActorTransform;
  }
  CheckLeave(t) {
    var e;
    return (
      !this.EntityHandle?.Valid ||
      ((e = this.EntityHandle.Entity.GetComponent(200)),
      this.CacheLocation.DeepCopy(e.ActorLocationProxy),
      Vector_1.Vector.DistSquared(t, this.CacheLocation) >
        this.LeaveSphereRadiusSq)
    );
  }
}
exports.SceneItemBasePlatform = SceneItemBasePlatform;
class VehicleBasePlatform extends BasePlatform {
  constructor(e) {
    super(e),
      (this.LeaveSphereRadiusSq = 0),
      (this.BoneName = new UE.FName("Bone_Prop001")),
      (this.CacheLocation = Vector_1.Vector.Create()),
      (this.IsDeltaBaseSpeedNeedZ = !0);
    e = this.EntityHandle?.Entity.GetComponent(200)?.GetInteractionMainActor();
    if (e) {
      var r = e.GetAttachParentActor();
      if (r) {
        let t = void 0;
        t =
          (t =
            e.CollisionActors && 0 < e.CollisionActors.Num()
              ? e.CollisionActors?.Get(0)
              : t) || r;
        (e = (0, puerts_1.$ref)(void 0)),
          (r = (t.GetActorBounds(!0, void 0, e, !0), (0, puerts_1.$unref)(e))),
          (e = Math.max(r.X, r.Y, r.Z));
        this.LeaveSphereRadiusSq = (e += 50) * e;
      }
    }
  }
  TransformFromRelativeSpace(t, e, r, s) {
    this.EntityHandle?.Entity.GetComponent(
      231,
    ).SkeletalMesh.D_TransformFromBoneSpace(this.BoneName, t, e, r, s);
  }
  TransformToRelativeSpace(t, e, r, s) {
    this.EntityHandle?.Entity.GetComponent(
      231,
    ).SkeletalMesh.D_TransformToBoneSpace(this.BoneName, t, e, r, s);
  }
  GetTransform() {
    return this.EntityHandle?.Entity.GetComponent(1).ActorTransform;
  }
  CheckLeave(t) {
    var e;
    return (
      !this.EntityHandle?.Valid ||
      ((e = this.EntityHandle.Entity.GetComponent(231)),
      this.CacheLocation.DeepCopy(e.ActorLocationProxy),
      Vector_1.Vector.DistSquared(t, this.CacheLocation) >
        this.LeaveSphereRadiusSq)
    );
  }
  OnCharacterEnter(t) {
    this.EntityHandle.Valid &&
      this.EntityHandle.Entity.GetComponent(112)?.SetTakeOverTick(!0);
  }
}
exports.VehicleBasePlatform = VehicleBasePlatform;
class BasePlatformController {
  static GetBasePlatformByBasedMovementInfo(t) {
    var t = t.MovementBase?.GetOwner()?.GetAttachRootParentActor();
    if (t?.IsValid())
      return (
        (t = ActorUtils_1.ActorUtils.GetEntityByActor(t, !1)),
        BasePlatformController.GetBasePlatformByEntity(t)
      );
  }
  static GetBasePlatformByEntity(e) {
    if (e?.Valid) {
      var r = e.Entity.GetComponent(1);
      if (r.OwnedBasePlatform) return r.OwnedBasePlatform;
      let t = void 0;
      return (
        e.Entity.GetComponent(200)
          ? (t = new SceneItemBasePlatform(e))
          : e.Entity.GetComponent(3)
            ? (t = new CharacterBasePlatform(e))
            : e.Entity.GetComponent(231) && (t = new VehicleBasePlatform(e)),
        (r.OwnedBasePlatform = t)
      );
    }
  }
}
exports.BasePlatformController = BasePlatformController;
//# sourceMappingURL=BasePlatform.js.map
