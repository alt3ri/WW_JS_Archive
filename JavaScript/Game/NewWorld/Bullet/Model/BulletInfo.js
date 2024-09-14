"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletInfo = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletConstant_1 = require("../../Bullet/BulletConstant"),
  BulletController_1 = require("../BulletController"),
  BulletCollisionInfo_1 = require("./BulletCollisionInfo"),
  BulletEffectInfo_1 = require("./BulletEffectInfo"),
  BulletMoveInfo_1 = require("./BulletMoveInfo"),
  BulletRayInfo_1 = require("./BulletRayInfo");
class BulletInfo {
  constructor() {
    (this.xe = 0),
      (this.Entity = void 0),
      (this.EHo = !1),
      (this.SHo = void 0),
      (this.Lo = void 0),
      (this.ActionInfoList = []),
      (this.NextActionInfoList = []),
      (this.PersistentActionList = []),
      (this.Actor = void 0),
      (this.ActorComponent = void 0),
      (this.ActionLogicComponent = void 0),
      (this.IsInit = !1),
      (this.NeedDestroy = !1),
      (this.IsDestroyByCharSkillEnd = !1),
      (this.GenerateTime = -0),
      (this.BulletCamp = 0),
      (this.ShakeNumbers = 0),
      (this.IsFrozen = !1),
      (this.FrozenTime = void 0),
      (this.yHo = void 0),
      (this.Fyn = !1),
      (this.RandomPosOffset = Vector_1.Vector.Create()),
      (this.RandomInitSpeedOffset = Vector_1.Vector.Create()),
      (this.IHo = !1),
      (this.THo = !1),
      (this.LHo = Vector_1.Vector.Create()),
      (this.gii = Rotator_1.Rotator.Create()),
      (this.InitPosition = Vector_1.Vector.Create()),
      (this.DHo = new Array()),
      (this.CreateFrame = 0),
      (this.LiveTimeAddDelta = 0),
      (this.LiveTime = 0),
      (this.LiveTimeCurHit = 0),
      (this.IsTimeNotEnough = !1),
      (this.Size = Vector_1.Vector.Create()),
      (this.RHo = Vector_1.Vector.Create()),
      (this.UHo = void 0),
      (this.CloseCollision = !1),
      (this.CollisionInfo = new BulletCollisionInfo_1.BulletCollisionInfo()),
      (this.AHo = Vector_1.Vector.Create()),
      (this.GetCollisionLocationFrame = 0),
      (this.IsCollisionRelativeLocationZero = !1),
      (this.IsCollisionRelativeRotationModify = !1),
      (this.MoveInfo = new BulletMoveInfo_1.BulletMoveInfo()),
      (this.EffectInfo = new BulletEffectInfo_1.BulletEffectInfo()),
      (this.PHo = 0),
      (this.xHo = void 0),
      (this.wHo = void 0),
      (this.eVo = void 0),
      (this.BHo = void 0),
      (this.bHo = void 0),
      (this.qHo = void 0),
      (this.GHo = void 0),
      (this.IsAutonomousProxy = !1),
      (this.AttackerCamp = 0),
      (this.AttackerPlayerId = 0),
      (this.SkillBoneName = void 0),
      (this.SkillLevel = 0),
      (this.TargetId = 0),
      (this.TargetIdLast = 0),
      (this.NHo = void 0),
      (this.OHo = void 0),
      (this.ParentBulletInfo = void 0),
      (this.ChildEntityIds = void 0),
      (this.ChildInfo = void 0),
      (this.ParentEffect = 0),
      (this.NeedNotifyChildrenWhenDestroy = !1),
      (this.HitNumberAll = 0),
      (this.EntityHitCount = new Map()),
      (this.CountByParent = !1),
      (this.TimeScaleList = void 0),
      (this.TimeScaleMap = void 0),
      (this.TimeScaleId = 0),
      (this.SummonSkillId = 0),
      (this.SummonAttackerId = 0),
      (this.SummonServerEntityId = 0),
      (this.BornFrameCount = void 0),
      (this.PreContextId = void 0),
      (this.ContextId = void 0),
      (this.HHo = () => {
        this.ClearAttacker(),
          BulletController_1.BulletController.DestroyBullet(
            this.BulletEntityId,
            !1,
          );
      }),
      (this.jHo = () => {
        this.ClearTarget();
      }),
      (this.BornLocationOffset = Vector_1.Vector.Create());
  }
  get BulletEntityId() {
    return this.xe;
  }
  get HasCheckedPosition() {
    return this.EHo;
  }
  CheckedPosition() {
    this.EHo = !0;
  }
  get BulletInitParams() {
    return this.SHo;
  }
  get TransformCreate() {
    return this.SHo.InitialTransform;
  }
  get BaseVelocityEntityId() {
    return this.SHo.BaseVelocityId;
  }
  get BulletRowName() {
    return this.SHo.BulletRowName;
  }
  GetBaseVelocityTarget() {
    return EntitySystem_1.EntitySystem.Get(
      this.SHo.BaseVelocityId,
    )?.GetComponent(1);
  }
  get BulletDataMain() {
    return this.Lo;
  }
  get IsTensile() {
    return 2 === this.BulletDataMain.Move.FollowType;
  }
  get BaseTransformEntity() {
    var t;
    return (
      this.Fyn ||
        this.yHo ||
        ((t = ModelManager_1.ModelManager.CharacterModel.GetHandle(
          this.SHo.BaseTransformId,
        ))?.Valid && (this.yHo = t),
        (this.Fyn = !0)),
      this.yHo
    );
  }
  SetActorLocation(t) {
    isNaN(t.X) || isNaN(t.Y) || isNaN(t.Z)
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "设置子弹坐标为Nan,直接销毁",
            ["location", t],
            ["BulletEntityId", this.BulletEntityId],
            ["BulletRowName", this.BulletRowName],
          ),
        BulletController_1.BulletController.DestroyBullet(
          this.BulletEntityId,
          !1,
        ))
      : (this.LHo.FromUeVector(t), (this.IHo = !0));
  }
  SetActorRotation(t) {
    isNaN(t.Pitch) || isNaN(t.Yaw) || isNaN(t.Roll)
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "设置子弹朝向为Nan,直接销毁",
            ["rotation", t],
            ["BulletEntityId", this.BulletEntityId],
            ["BulletRowName", this.BulletRowName],
          ),
        BulletController_1.BulletController.DestroyBullet(
          this.BulletEntityId,
          !1,
        ))
      : (this.gii.FromUeRotator(t), (this.THo = !0));
  }
  GetActorLocation() {
    return this.IHo ? this.LHo : this.ActorComponent.ActorLocationProxy;
  }
  GetActorRotation() {
    return this.THo ? this.gii : this.ActorComponent.ActorRotationProxy;
  }
  GetActorForward(t) {
    this.THo
      ? this.gii.Vector(t)
      : t.FromUeVector(this.ActorComponent.ActorForwardProxy);
  }
  ActorRotateVector(t, i) {
    (this.THo ? this.gii : this.ActorComponent.ActorRotationProxy)
      .Quaternion()
      .RotateVector(t, i);
  }
  AddBulletLocalRotator(t) {
    this.ApplyCacheLocationAndRotation(),
      this.ActorComponent.AddBulletLocalRotator(t);
  }
  ApplyCacheLocationAndRotation() {
    if (this.IHo)
      return this.THo
        ? (this.ActorComponent.SetActorLocationAndRotation(
            this.LHo.ToUeVector(),
            this.gii.ToUeRotator(),
            this.constructor.name,
            !1,
          ),
          (this.IHo = !1),
          void (this.THo = !1))
        : (this.ActorComponent.SetActorLocation(
            this.LHo.ToUeVector(),
            this.constructor.name,
            !1,
          ),
          void (this.IHo = !1));
    this.THo &&
      (this.ActorComponent.SetActorRotation(
        this.gii.ToUeRotator(),
        this.constructor.name,
        !1,
      ),
      (this.THo = !1));
  }
  ClearCacheLocationAndRotation() {
    (this.IHo = !1), (this.THo = !1);
  }
  get Tags() {
    return this.DHo;
  }
  AddTag(t) {
    this.DHo.push(t.TagId);
  }
  AddTagId(t) {
    this.DHo.push(t);
  }
  HasTag(t) {
    if (this.DHo && 0 < this.DHo.length)
      for (const i of this.DHo) if (i === t.TagId) return !0;
    return !1;
  }
  HasTagId(t) {
    return !!this.DHo && this.DHo.includes(t);
  }
  get CenterLocation() {
    return (
      this.ActorComponent.ActorQuatProxy.RotateVector(
        this.CollisionInfo.CenterLocalLocation,
        this.RHo,
      ),
      this.RHo.AdditionEqual(this.ActorComponent.ActorLocationProxy),
      this.RHo
    );
  }
  get RayInfo() {
    return (
      this.UHo || (this.UHo = new BulletRayInfo_1.BulletRayInfo()), this.UHo
    );
  }
  get CollisionRotator() {
    return this.CollisionInfo.CollisionComponent
      ? this.CollisionInfo.CollisionComponent.K2_GetComponentRotation()
      : this.ActorComponent.ActorRotation;
  }
  get CollisionLocation() {
    return (
      this.GetCollisionLocationFrame < Time_1.Time.Frame &&
        ((this.GetCollisionLocationFrame = Time_1.Time.Frame),
        !this.IsCollisionRelativeLocationZero &&
        this.CollisionInfo.CollisionComponent
          ? this.AHo.FromUeVector(
              this.CollisionInfo.CollisionComponent.K2_GetComponentLocation(),
            )
          : this.AHo.FromUeVector(this.ActorComponent.ActorLocationProxy)),
      this.AHo
    );
  }
  get AttackerId() {
    return this.PHo;
  }
  get AttackerHandle() {
    return this.xHo;
  }
  get Attacker() {
    return this.xHo?.Entity;
  }
  ClearAttacker() {
    this.KHo(),
      (this.xHo = void 0),
      (this.wHo = void 0),
      (this.eVo = void 0),
      (this.BHo = void 0),
      (this.bHo = void 0),
      (this.qHo = void 0),
      (this.GHo = void 0);
  }
  get AttackerCreatureDataComp() {
    return this.wHo || (this.wHo = this.Attacker?.GetComponent(0)), this.wHo;
  }
  get AttackerActorComp() {
    return this.eVo || (this.eVo = this.Attacker?.GetComponent(3)), this.eVo;
  }
  get AttackerSkillComp() {
    return this.BHo || (this.BHo = this.Attacker?.GetComponent(34)), this.BHo;
  }
  get AttackerBuffComp() {
    return this.bHo || (this.bHo = this.Attacker?.GetComponent(160)), this.bHo;
  }
  get AttackerMoveComp() {
    return this.qHo || (this.qHo = this.Attacker?.GetComponent(164)), this.qHo;
  }
  get AttackerAudioComponent() {
    return this.GHo || (this.GHo = this.Attacker?.GetComponent(44)), this.GHo;
  }
  get Target() {
    if (this.NHo) return this.NHo?.Entity;
  }
  SetTargetById(t) {
    t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
    t?.Valid
      ? (this.QHo(), (this.NHo = t), (this.OHo = void 0), this.XHo())
      : this.ClearTarget();
  }
  ClearTarget() {
    this.QHo(), (this.NHo = void 0), (this.TargetId = 0), (this.OHo = void 0);
  }
  get TargetActorComp() {
    return this.OHo || (this.OHo = this.Target?.GetComponent(1)), this.OHo;
  }
  GetLockOnTargetDynamic() {
    return this.xHo?.Entity?.GetComponent(29)
      ?.GetCurrentTarget()
      ?.Entity?.GetComponent(1);
  }
  get ParentEntityId() {
    return this.SHo.ParentId;
  }
  Init(t, i) {
    (this.SHo = t),
      (this.Lo = i),
      (this.ActionInfoList.length = 0),
      (this.NextActionInfoList.length = 0),
      (this.PersistentActionList.length = 0),
      (this.PHo = this.SHo.Owner?.Id),
      (this.xHo = ModelManager_1.ModelManager.CharacterModel.GetHandle(
        this.PHo,
      )),
      (this.IsInit = !1),
      (this.NeedDestroy = !1),
      (this.ShakeNumbers = 0),
      (this.HitNumberAll = 0),
      (this.GetCollisionLocationFrame = 0),
      (this.SkillBoneName = BulletConstant_1.BulletConstant.HitCase),
      (this.PreContextId = void 0),
      (this.ContextId = void 0),
      t.LocationOffset
        ? (this.BornLocationOffset.FromUeVector(t.LocationOffset),
          this.BornLocationOffset.AdditionEqual(i.Base.BornPosition))
        : this.BornLocationOffset.FromUeVector(i.Base.BornPosition),
      this.JHo(),
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (this.BornFrameCount = UE.KismetSystemLibrary.GetFrameCount());
  }
  InitEntity(t) {
    (this.Entity = t), (this.xe = t.Id);
  }
  Clear() {
    (this.xe = 0),
      (this.Entity = void 0),
      (this.SHo = void 0),
      (this.Lo = void 0);
    var t = BulletController_1.BulletController.GetActionCenter();
    for (const i of this.ActionInfoList) t.RecycleBulletActionInfo(i);
    for (const s of this.NextActionInfoList) t.RecycleBulletActionInfo(s);
    for (const e of this.PersistentActionList) t.RecycleBulletAction(e);
    (this.ActionInfoList.length = 0),
      (this.NextActionInfoList.length = 0),
      (this.PersistentActionList.length = 0),
      (this.Actor = void 0),
      (this.ActorComponent = void 0),
      (this.ActionLogicComponent = void 0),
      (this.IsInit = !1),
      (this.EHo = !1),
      (this.NeedDestroy = !1),
      (this.IsDestroyByCharSkillEnd = !1),
      (this.GenerateTime = 0),
      (this.BulletCamp = 0),
      (this.yHo = void 0),
      (this.IHo = !1),
      (this.THo = !1),
      this.LHo.Reset(),
      this.gii.Reset(),
      this.RandomInitSpeedOffset.Reset(),
      this.RandomPosOffset.Reset(),
      (this.ShakeNumbers = 0),
      (this.IsFrozen = !1),
      (this.FrozenTime = void 0),
      this.InitPosition.Reset(),
      (this.DHo.length = 0),
      (this.CreateFrame = 0),
      (this.LiveTimeAddDelta = 0),
      (this.LiveTime = 0),
      (this.IsTimeNotEnough = !1),
      this.Size.Reset(),
      this.RHo.Reset(),
      (this.CloseCollision = !1),
      this.AHo.Reset(),
      (this.GetCollisionLocationFrame = 0),
      (this.IsCollisionRelativeLocationZero = !1),
      (this.IsCollisionRelativeRotationModify = !1),
      (this.PHo = 0),
      this.ClearAttacker(),
      (this.IsAutonomousProxy = !1),
      (this.AttackerCamp = 0),
      (this.AttackerPlayerId = 0),
      (this.SkillBoneName = void 0),
      (this.SkillLevel = 0),
      this.ClearTarget(),
      (this.TargetIdLast = 0),
      (this.ParentBulletInfo = void 0),
      (this.ChildEntityIds = void 0),
      (this.ParentEffect = 0),
      (this.NeedNotifyChildrenWhenDestroy = !1),
      (this.HitNumberAll = 0),
      this.EntityHitCount.clear(),
      (this.CountByParent = !1),
      (this.TimeScaleList = void 0),
      (this.TimeScaleMap = void 0),
      (this.TimeScaleId = 0),
      (this.SummonSkillId = 0),
      (this.SummonAttackerId = 0),
      (this.SummonServerEntityId = 0),
      this.CollisionInfo.Clear(),
      this.MoveInfo.Clear(),
      this.EffectInfo.Clear(),
      (this.ChildInfo = void 0),
      (this.UHo = void 0),
      this.BornLocationOffset.Reset(),
      (this.ContextId = void 0),
      (this.PreContextId = void 0),
      (this.Fyn = !1),
      BulletConstant_1.BulletConstant.OpenClearCheck && BulletInfo.zHo(this);
  }
  SwapActionInfoList() {
    var t;
    (this.ActionInfoList.length = 0) < this.NextActionInfoList.length &&
      ((t = this.ActionInfoList),
      (this.ActionInfoList = this.NextActionInfoList),
      (this.NextActionInfoList = t));
  }
  JHo() {
    this.AttackerHandle &&
      EventSystem_1.EventSystem.AddWithTarget(
        this.AttackerHandle,
        EventDefine_1.EEventName.RemoveEntity,
        this.HHo,
      );
  }
  KHo() {
    this.AttackerHandle &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.AttackerHandle,
        EventDefine_1.EEventName.RemoveEntity,
        this.HHo,
      );
  }
  XHo() {
    this.NHo &&
      EventSystem_1.EventSystem.AddWithTarget(
        this.NHo,
        EventDefine_1.EEventName.RemoveEntity,
        this.jHo,
      );
  }
  QHo() {
    this.NHo &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.NHo,
        EventDefine_1.EEventName.RemoveEntity,
        this.jHo,
      );
  }
  static zHo(t) {
    for (const e in t) {
      var i = t[e],
        s = typeof i;
      void 0 === i ||
        "function" == s ||
        ("number" == s && 0 === i) ||
        ("boolean" == s && !1 === i) ||
        (i instanceof BulletCollisionInfo_1.BulletCollisionInfo ||
        i instanceof BulletMoveInfo_1.BulletMoveInfo ||
        i instanceof BulletEffectInfo_1.BulletEffectInfo
          ? this.zHo(i)
          : i instanceof Vector_1.Vector
            ? i.IsZero() ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Bullet",
                  18,
                  "BulletInfo回收时，Vector没重置",
                  ["key", e],
                ))
            : i instanceof Rotator_1.Rotator
              ? i.IsNearlyZero() ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Bullet",
                    18,
                    "BulletInfo回收时，Rotator没重置",
                    ["key", e],
                  ))
              : i instanceof Transform_1.Transform
                ? (i.GetLocation().IsZero() &&
                    i.GetScale3D().IsZero() &&
                    0 === i.GetRotation().X &&
                    0 === i.GetRotation().Y &&
                    0 === i.GetRotation().Z &&
                    1 === i.GetRotation().W) ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Bullet",
                      18,
                      "BulletInfo回收时，Transform没重置",
                      ["key", e],
                    ))
                : i instanceof Array
                  ? 0 !== i.length &&
                    Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Bullet",
                      18,
                      "BulletInfo回收时，Array没清空",
                      ["key", e],
                    )
                  : i instanceof Map
                    ? 0 !== i.size &&
                      Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "Bullet",
                        18,
                        "BulletInfo回收时，Map没清空",
                        ["key", e],
                      )
                    : i instanceof Set
                      ? 0 !== i.size &&
                        Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Bullet",
                          18,
                          "BulletInfo回收时，Set没清空",
                          ["key", e],
                        )
                      : Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Bullet",
                          18,
                          "BulletInfo回收时，该变量不为undefined",
                          ["type", s],
                          ["key", e],
                        ));
    }
  }
  OnTargetInValid() {
    switch (this.BulletDataMain.Move.TrackTarget) {
      case 6:
      case 2:
      case 7:
      case 8:
      case 5:
      case 9:
      case 4:
        this.SetTargetById(0);
    }
  }
}
exports.BulletInfo = BulletInfo;
//# sourceMappingURL=BulletInfo.js.map
