"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    var o,
      h = arguments.length,
      r =
        h < 3
          ? i
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, i, e, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : 3 < h ? o(i, e, r) : o(i, e)) || r);
    return 3 < h && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseActorComponent = exports.DisableEntityHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Entity_1 = require("../../../../Core/Entity/Entity"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BaseActorForbidSettingLocAndRotConfig_1 = require("../../Setting/BaseActorForbidSettingLocAndRotConfig");
class DisableEntityHandle {
  constructor(t) {
    (this.E9 = t), (this.vW = 0), (this.DW = new Map());
  }
  get Empty() {
    return 0 === this.DW.size;
  }
  Disable(t, i) {
    t
      ? t.length < Entity_1.DISABLE_REASON_LENGTH_LIMIT &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "Disable的Reason字符串长度必须大于等于限制字符数量",
          ["ConstructorName", i],
          ["Reason", t],
          ["限制的字符数量", Entity_1.DISABLE_REASON_LENGTH_LIMIT],
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", [
          "ConstructorName",
          i,
        ]);
    i = ++this.vW;
    return this.DW.set(i, t), i;
  }
  Enable(t, i) {
    return this.DW.get(t)
      ? this.DW.delete(t)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            1,
            "激活句柄不存在",
            ["Type", this.E9],
            ["ConstructorName", i],
            ["handle", t],
          ),
        !1);
  }
  Clear() {
    this.DW.clear();
  }
  DumpDisableInfo() {
    var t,
      i,
      e = new Array();
    let s = "";
    for ([t, i] of this.DW)
      e.push(`${s}{Type:${this.E9},Handle:${t},Reason:${i}}`), (s = " ");
    return e.join("");
  }
}
exports.DisableEntityHandle = DisableEntityHandle;
let BaseActorComponent = class BaseActorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.MoveComp = void 0),
      (this.VehicleMoveComp = void 0),
      (this.ActorInternal = void 0),
      (this.CachedActorTransform = void 0),
      (this.CachedActorLocation = Vector_1.Vector.Create()),
      (this.CachedActorRotation = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.CachedActorScale = Vector_1.Vector.Create()),
      (this.CachedActorQuat = Quat_1.Quat.Create(0, 0, 0, 1)),
      (this.CachedActorForward = Vector_1.Vector.Create(1, 0, 0)),
      (this.CachedActorRight = Vector_1.Vector.Create(0, 1, 0)),
      (this.CachedActorUp = Vector_1.Vector.Create(0, 0, 1)),
      (this.CachedActorGravityDirect = Vector_1.Vector.Create(0, 0, -1)),
      (this.CachedActorInitNotStandardGravity = void 0),
      (this.CachedActorInitGravityRotation = void 0),
      (this.CachedLocationTime = -1),
      (this.CachedForwardTime = -1),
      (this.CachedScaleTime = -1),
      (this.CachedRotationTime = -1),
      (this.CachedTransformTime = -1),
      (this.CachedRightTime = -1),
      (this.CachedUpTime = -1),
      (this.CachedVelocityTime = -1),
      (this.CachedGravityDirectTime = -1),
      (this.CachedDesiredActorLocation = Vector_1.Vector.Create()),
      (this.IsChangingLocation = !1),
      (this.CreatureDataInternal = void 0),
      (this.DebugMovementComp = void 0),
      (this.Nrn = !0),
      (this.Orn = !0),
      (this.IsInSequenceBinding = !1),
      (this.DisableActorHandle = void 0),
      (this.DisableCollisionHandle = void 0),
      (this.krn = void 0),
      (this.Frn = void 0),
      (this.Vrn = void 0),
      (this.Hrn = void 0),
      (this.jrn = void 0),
      (this.LastActorLocation = Vector_1.Vector.Create()),
      (this.vJ = void 0),
      (this.I3c = new Set()),
      (this.T3c = new Set()),
      (this.OwnedBasePlatform = void 0);
  }
  get IsAutonomousProxy() {
    return this.Nrn;
  }
  get IsMoveAutonomousProxy() {
    return this.Orn;
  }
  OnCreate() {
    return (
      (this.DisableActorHandle = new DisableEntityHandle(
        "SetActorHiddenInGame",
      )),
      (this.DisableCollisionHandle = new DisableEntityHandle(
        "SetActorEnableCollision",
      )),
      this.AddUnResetProperty(
        "DisableActorHandle",
        "DisableCollisionHandle",
        "DisableTickHandle",
      ),
      !0
    );
  }
  OnInitData(t) {
    return (
      this.CachedActorForward.Set(1, 0, 0),
      this.CachedActorRight.Set(0, 1, 0),
      this.CachedActorUp.Set(0, 0, 1),
      !0
    );
  }
  OnStart() {
    return (
      (this.MoveComp = this.Entity.GetComponent(44)),
      (this.VehicleMoveComp = this.Entity.GetComponent(233)),
      (this.vJ = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
        this.Entity.Id,
      )),
      !0
    );
  }
  OnActivate() {
    this.ActorInternal.Kuro_SetRole(this.Orn ? 2 : 1),
      this.LastActorLocation.DeepCopy(this.ActorLocationProxy),
      this.ActorInternal.SetActorHiddenInGame(!this.DisableActorHandle.Empty),
      this.ActorInternal.SetActorEnableCollision(
        this.DisableCollisionHandle.Empty,
      );
  }
  SetAutonomous(t, i = void 0) {
    (this.Nrn = t),
      this.SetMoveAutonomous(void 0 === i ? t : i, "切换逻辑主控");
  }
  SetMoveAutonomous(t, i = 0) {
    (this.Orn = t), this.ActorInternal?.Kuro_SetRole(this.Orn ? 2 : 1);
  }
  SetMoveControlled(t, i = 0, e = "") {
    this.SetMoveAutonomous(t, e);
  }
  ResetMoveControlled(t = "") {
    this.SetMoveAutonomous(this.IsAutonomousProxy, t);
  }
  InitCreatureData() {
    return (
      (this.CreatureDataInternal = this.Entity.GetComponent(0)),
      !!this.CreatureDataInternal?.Valid ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "creature数据加载失败。"),
        !1)
    );
  }
  get CreatureData() {
    return this.CreatureDataInternal;
  }
  get ActorQuat() {
    return this.ActorQuatProxy.ToUeQuat();
  }
  get ActorQuatProxy() {
    return (
      this.CachedRotationTime < Time_1.Time.Frame &&
        this.ActorInternal?.IsValid() &&
        ((this.CachedRotationTime = Time_1.Time.Frame),
        this.CachedActorRotation.DeepCopy(
          this.ActorInternal.K2_GetActorRotation(),
        ),
        this.CachedActorRotation.Quaternion(this.CachedActorQuat)),
      this.CachedActorQuat
    );
  }
  get ActorRotationProxy() {
    return (
      this.CachedRotationTime < Time_1.Time.Frame &&
        this.ActorInternal?.IsValid() &&
        ((this.CachedRotationTime = Time_1.Time.Frame),
        this.CachedActorRotation.DeepCopy(
          this.ActorInternal.K2_GetActorRotation(),
        ),
        this.CachedActorRotation.Quaternion(this.CachedActorQuat)),
      this.CachedActorRotation
    );
  }
  get ActorRotation() {
    return this.ActorRotationProxy.ToUeRotator();
  }
  get ActorScaleProxy() {
    return (
      this.CachedScaleTime <= 0 &&
        this.ActorInternal?.IsValid() &&
        ((this.CachedScaleTime = 1),
        this.CachedActorScale.FromUeVector(
          this.ActorInternal.D_GetActorScale3D(),
        )),
      this.CachedActorScale
    );
  }
  get ActorScale() {
    return this.ActorScaleProxy.ToUeVector();
  }
  get ActorTransform() {
    return (
      this.CachedTransformTime < Time_1.Time.Frame &&
        this.ActorInternal?.IsValid() &&
        ((this.CachedTransformTime = Time_1.Time.Frame),
        (this.CachedActorTransform = this.ActorInternal.D_GetTransform())),
      this.CachedActorTransform
    );
  }
  get ActorLocation() {
    return this.ActorLocationProxy.ToUeVector();
  }
  get ActorLocationProxy() {
    return this.IsChangingLocation
      ? this.CachedDesiredActorLocation
      : (this.CachedLocationTime < Time_1.Time.Frame &&
          this.ActorInternal?.IsValid() &&
          ((this.CachedLocationTime = Time_1.Time.Frame),
          this.Krn(!0),
          this.CachedActorLocation.FromUeVector(
            this.ActorInternal.D_K2_GetActorLocation(),
          ),
          this.Krn(!1)),
        this.CachedActorLocation);
  }
  Krn(t) {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      (Object.defineProperty(this.CachedActorLocation.Tuple, "0", {
        writable: t,
      }),
      Object.defineProperty(this.CachedActorLocation.Tuple, "1", {
        writable: t,
      }),
      Object.defineProperty(this.CachedActorLocation.Tuple, "2", {
        writable: t,
      }));
  }
  get ActorLocationProxyNoUpdate() {
    return this.CachedLocationTime <= 0
      ? this.ActorLocationProxy
      : this.CachedActorLocation;
  }
  get ActorForwardProxy() {
    return (
      this.CachedForwardTime < Time_1.Time.Frame &&
        ((this.CachedForwardTime = Time_1.Time.Frame),
        this.ActorQuatProxy.RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          this.CachedActorForward,
        )),
      this.CachedActorForward
    );
  }
  get ActorRight() {
    return this.ActorRightProxy.ToUeVector();
  }
  get ActorRightProxy() {
    return (
      this.CachedRightTime < Time_1.Time.Frame &&
        ((this.CachedRightTime = Time_1.Time.Frame),
        this.ActorQuatProxy.RotateVector(
          Vector_1.Vector.RightVectorProxy,
          this.CachedActorRight,
        )),
      this.CachedActorRight
    );
  }
  get ActorForward() {
    return this.ActorForwardProxy.ToUeVector();
  }
  get ActorUpProxy() {
    return (
      this.CachedUpTime < Time_1.Time.Frame &&
        ((this.CachedUpTime = Time_1.Time.Frame),
        this.ActorQuatProxy.RotateVector(
          Vector_1.Vector.UpVectorProxy,
          this.CachedActorUp,
        )),
      this.CachedActorUp
    );
  }
  get ActorUp() {
    return this.ActorUpProxy.ToUeVector();
  }
  get ActorGravityDirectProxy() {
    var t;
    return (
      this.CachedGravityDirectTime < Time_1.Time.Frame &&
        ((this.CachedGravityDirectTime = Time_1.Time.Frame),
        this.MoveComp
          ? this.CachedActorGravityDirect.DeepCopy(this.MoveComp.GravityDirect)
          : (t = this.CreatureData.GetInitGravityDirection()) &&
            this.CachedActorGravityDirect.FromConfigVector(t)),
      this.CachedActorGravityDirect
    );
  }
  get ActorGravityDirection() {
    return this.ActorGravityDirectProxy.ToUeVector();
  }
  get ActorInitNotStandardGravity() {
    return (
      void 0 === this.CachedActorInitNotStandardGravity && this.kec(),
      this.CachedActorInitNotStandardGravity
    );
  }
  get ActorInitGravityRotationProxy() {
    return (
      void 0 === this.CachedActorInitGravityRotation && this.kec(),
      this.CachedActorInitGravityRotation
    );
  }
  get ActorInitGravityRotation() {
    return (
      void 0 === this.CachedActorInitGravityRotation && this.kec(),
      this.CachedActorInitGravityRotation.ToUeRotator()
    );
  }
  kec() {
    var t = this.CreatureData.GetInitGravityDirection();
    if (t) {
      var i,
        e = Vector_1.Vector.Create();
      if (
        (e.FromConfigVector(t),
        e.Normalize() && !MathUtils_1.MathUtils.IsNearlyEqual(t.Z, -1))
      )
        return (
          (t = Vector_1.Vector.Create()),
          (i = Quat_1.Quat.Create()),
          e.UnaryNegation(t),
          Math.abs(t.DotProduct(Vector_1.Vector.ForwardVectorProxy)) <
          1 - MathUtils_1.MathUtils.KindaSmallNumber
            ? MathUtils_1.MathUtils.LookRotationUpFirst(
                Vector_1.Vector.ForwardVectorProxy,
                t,
                i,
              )
            : MathUtils_1.MathUtils.LookRotationUpFirst(
                Vector_1.Vector.UpVectorProxy,
                t,
                i,
              ),
          (this.CachedActorInitNotStandardGravity = !0),
          void (this.CachedActorInitGravityRotation = i.Rotator())
        );
    }
    (this.CachedActorInitNotStandardGravity = !1),
      (this.CachedActorInitGravityRotation = Rotator_1.Rotator.Create(0, 0, 0));
  }
  GetRadius() {
    return 0;
  }
  get Owner() {
    if (this.ActorInternal?.IsValid()) return this.ActorInternal;
  }
  get SkeletalMesh() {}
  HasMesh() {
    return !1;
  }
  OnTeleport() {
    this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
  }
  SetActorLocation(t, i = "unknown", e = !0) {
    if (!MathUtils_1.MathUtils.IsValidVector(t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "SetActorLocation的value无效",
            ["value", t],
            ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
          ),
        !1
      );
    let s = !1;
    return (
      this.ActorInternal?.IsValid() &&
        (this.CachedDesiredActorLocation.FromUeVector(t),
        (this.IsChangingLocation = !0),
        (s = this.ActorInternal.D_K2_SetActorLocation(t, e, void 0, !0)),
        (this.IsChangingLocation = !1),
        this.CheckIsForbidSettingLocAndRot(!0),
        this.DebugMovementComp) &&
        this.DebugMovementComp.MarkDebugRecord(i + ".SetActorLocation", 1),
      this.ResetLocationCachedTime(),
      this.OnTeleport(),
      this.ActorInternal?.IsValid() &&
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          57,
          "[SetActorLocation]",
          ["location:", t],
          ["owner", this?.Owner.GetName()],
        ),
      s
    );
  }
  TeleportTo(t, i, e = "unknown") {
    if (
      !MathUtils_1.MathUtils.IsValidVector(t) ||
      !MathUtils_1.MathUtils.IsValidRotator(i)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "TeleportTo的location无效",
            ["location", t],
            ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
          ),
        !1
      );
    let s = !1;
    return (
      this.ActorInternal?.IsValid() &&
        (this.CachedDesiredActorLocation.FromUeVector(t),
        (this.IsChangingLocation = !0),
        (s = this.ActorInternal.D_K2_KuroTeleportTo(t, i)),
        (this.IsChangingLocation = !1),
        this.CheckIsForbidSettingLocAndRot(!0, !0),
        this.DebugMovementComp) &&
        this.DebugMovementComp.MarkDebugRecord(e + ".TeleportTo", 1, !0),
      this.ResetLocationCachedTime(),
      this.OnTeleport(),
      this.ActorInternal?.IsValid() &&
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          57,
          "[TeleportTo]",
          ["location:", t],
          ["owner", this?.Owner],
        ),
      s
    );
  }
  ResetLocationCachedTime() {
    (this.CachedTransformTime = -1), (this.CachedLocationTime = -1);
  }
  SetActorRotation(t, i = "unknown", e = !0) {
    let s = !1;
    return (
      this.ActorInternal?.IsValid() &&
        ((s = this.ActorInternal.K2_KuroSetActorRotation(t, e, !1)),
        this.CheckIsForbidSettingLocAndRot(!1, !0),
        this.DebugMovementComp) &&
        this.DebugMovementComp.MarkDebugRecord(i + ".SetActorRotation", 1),
      this.Qrn(),
      s
    );
  }
  Qrn() {
    (this.CachedTransformTime = 0),
      (this.CachedRotationTime = 0),
      (this.CachedUpTime = 0),
      (this.CachedRightTime = 0),
      (this.CachedForwardTime = 0);
  }
  SetActorLocationAndRotation(t, i, e = "unknown", s = !1) {
    var o;
    return MathUtils_1.MathUtils.IsValidVector(t)
      ? ((o = !1),
        this.CachedDesiredActorLocation.FromUeVector(t),
        (this.IsChangingLocation = !0),
        (o = this.ActorInternal.D_K2_SetActorLocationAndRotation(
          t,
          i,
          s,
          void 0,
          !0,
        )),
        (this.IsChangingLocation = !1),
        this.ResetTransformCachedTime(),
        this.OnTeleport(),
        this.CheckIsForbidSettingLocAndRot(!0, !0),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(
            e + ".SetActorLocationAndRotation",
            1,
          ),
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Test",
            57,
            "[SetActorLocationAndRotation]",
            ["location:", t],
            ["rotation:", i],
            ["owner", this?.Owner],
          ),
        o)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "SetActorLocationAndRotation的location无效",
            ["location", t],
            ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
          ),
        !1);
  }
  SetActorTransform(t, i = "unknown", e = !0) {
    let s = !1;
    var o = t.GetLocation();
    return MathUtils_1.MathUtils.IsValidVector(o)
      ? (this.CachedDesiredActorLocation.FromUeVector(t.GetLocation()),
        this.ActorLocationProxy.Equals(this.CachedDesiredActorLocation)
          ? (s = this.SetActorRotation(t.GetRotation().Rotator(), i, e))
          : ((this.IsChangingLocation = !0),
            (s = this.ActorInternal.D_K2_SetActorTransform(t, e, void 0, !0)),
            (this.IsChangingLocation = !1)),
        this.CheckIsForbidSettingLocAndRot(!0, !0),
        this.DebugMovementComp &&
          this.DebugMovementComp.MarkDebugRecord(i + ".SetActorTransform", 1),
        this.ResetTransformCachedTime(),
        this.OnTeleport(),
        s)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "SetActorTransform的value参数",
            ["value", t],
            ["Location", o],
            ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
          ),
        !1);
  }
  AddActorWorldOffset(t, i = "unknown", e = !0) {
    this.ActorInternal.D_K2_AddActorWorldOffset(t, e, void 0, !1),
      this.CheckIsForbidSettingLocAndRot(!0),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorWorldOffset", 1),
      this.ResetLocationCachedTime();
  }
  AddActorLocalOffset(t, i = "unknown", e = !0) {
    this.ActorInternal.D_K2_AddActorLocalOffset(t, e, void 0, !1),
      this.CheckIsForbidSettingLocAndRot(!0),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorLocalOffset", 1),
      this.ResetLocationCachedTime();
  }
  AddActorWorldRotation(t, i = "unknown", e = !1) {
    this.ActorInternal.K2_AddActorWorldRotation(t, e, void 0, !1),
      this.CheckIsForbidSettingLocAndRot(!1, !0),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorWorldRotation", 1),
      this.Qrn();
  }
  AddActorLocalRotation(t, i = "unknown", e = !1) {
    this.ActorInternal.K2_AddActorLocalRotation(t, e, void 0, !1),
      this.CheckIsForbidSettingLocAndRot(!1, !0),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorLocalRotation", 1),
      this.Qrn();
  }
  ResetTransformCachedTime() {
    (this.CachedTransformTime = 0),
      (this.CachedLocationTime = 0),
      (this.CachedRotationTime = 0),
      (this.CachedUpTime = 0),
      (this.CachedRightTime = 0),
      (this.CachedForwardTime = 0),
      (this.CachedGravityDirectTime = 0);
  }
  ResetAllCachedTime() {
    (this.CachedTransformTime = -1),
      (this.CachedLocationTime = -1),
      (this.CachedRotationTime = -1),
      (this.CachedUpTime = -1),
      (this.CachedRightTime = -1),
      (this.CachedForwardTime = -1),
      (this.CachedVelocityTime = -1),
      (this.CachedGravityDirectTime = -1);
  }
  ResetCachedVelocityTime() {
    this.CachedVelocityTime = -1;
  }
  ResetGravityRelatedCachedTime() {
    this.CachedGravityDirectTime = -1;
  }
  b3c(t, i, e) {
    t ? e.add(i) : e.delete(i);
  }
  SetForbidSettingLocAndRot(t, i) {
    switch (
      BaseActorForbidSettingLocAndRotConfig_1.ForbidSettingLocAndRotTypeDefines[
        i
      ]
    ) {
      case 1:
        this.b3c(t, i, this.I3c);
        break;
      case 2:
        this.b3c(t, i, this.T3c);
        break;
      case 4:
        this.b3c(t, i, this.I3c), this.b3c(t, i, this.T3c);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Test",
        50,
        "[BaseActorComp] SetForbidSettingLocation",
        ["PbDataId", this.CreatureData.GetPbDataId()],
        ["CreatureId", this.CreatureData.GetCreatureDataId()],
        ["Forbid", t],
        ["Reason", i],
      );
  }
  CheckIsForbidSettingLocAndRot(t = !1, i = !1) {
    (i = !!this.T3c.size && i), (t = !!this.I3c.size && t);
    (i || t) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Test",
        50,
        "[BaseActorComp] 检测到异常的设置位置或旋转行为",
        ["PbDataId", this.CreatureData.GetPbDataId()],
        ["CreatureId", this.CreatureData.GetCreatureDataId()],
        ["TargetLoc", this.ActorLocationProxy],
        ["TargetRot", this.ActorRotationProxy],
      );
  }
  OnSetActorActive(t, i) {
    t
      ? (this.EnableActor(this.Hrn),
        this.EnableCollision(this.jrn),
        (this.Hrn = void 0),
        (this.jrn = void 0))
      : ((this.Hrn = this.DisableActor(i)),
        (this.jrn = this.DisableCollision(i)));
  }
  SetSequenceBinding(t) {
    this.IsInSequenceBinding = t;
  }
  GetSequenceBinding() {
    return this.IsInSequenceBinding;
  }
  DisableActor(t) {
    var i = this.DisableActorHandle.Disable(t, this.constructor.name);
    return (
      ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(
        this.CreatureData?.GetEntityType(),
      ) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "DisableActor",
          ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
          ["PbDataId", this.CreatureData?.GetPbDataId()],
          ["Handle", i],
          ["Reason", t],
        ),
      this.ActorInternal?.IsValid() &&
        !this.ActorInternal.bHidden &&
        (this.ActorInternal.SetActorHiddenInGame(!0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSetActorHidden,
          this.Entity.Id,
          !1,
        ),
        this.vJ) &&
        EventSystem_1.EventSystem.EmitWithTarget(
          this.vJ,
          EventDefine_1.EEventName.OnSetActorHidden,
          this.Entity.Id,
          !1,
        ),
      i
    );
  }
  DisableCollision(t) {
    var i = this.DisableCollisionHandle.Disable(t, this.constructor.name);
    return (
      ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(
        this.CreatureData?.GetEntityType(),
      ) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "DisableCollision",
          ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
          ["PbDataId", this.CreatureData?.GetPbDataId()],
          ["Handle", i],
          ["Reason", t],
        ),
      this.ActorInternal?.IsValid() &&
        this.ActorInternal.bActorEnableCollision &&
        this.ActorInternal.SetActorEnableCollision(!1),
      i
    );
  }
  EnableActor(t) {
    ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(
      this.CreatureData?.GetEntityType(),
    ) &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Entity",
        3,
        "EnableActor",
        ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
        ["PbDataId", this.CreatureData?.GetPbDataId()],
        ["Handle", t],
      );
    var i,
      t = this.DisableActorHandle.Enable(t, this.constructor.name);
    return (
      t &&
        this.ActorInternal?.IsValid() &&
        this.ActorInternal.bHidden !== !this.DisableActorHandle.Empty &&
        ((i = this.DisableActorHandle.Empty),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSetActorHidden,
          this.Entity.Id,
          i,
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          ModelManager_1.ModelManager.CreatureModel.GetEntityById(
            this.Entity.Id,
          ),
          EventDefine_1.EEventName.OnSetActorHidden,
          this.Entity.Id,
          i,
        ),
        this.Entity.GetComponent(112)
          ? TimerSystem_1.TimerSystem.Next(() => {
              this.ActorInternal?.IsValid() &&
                this.ActorInternal.SetActorHiddenInGame(
                  !this.DisableActorHandle.Empty,
                );
            })
          : this.ActorInternal.SetActorHiddenInGame(!i)),
      t
    );
  }
  EnableCollision(t) {
    ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(
      this.CreatureData?.GetEntityType(),
    ) &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Entity",
        3,
        "EnableCollision",
        ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
        ["PbDataId", this.CreatureData?.GetPbDataId()],
        ["Handle", t],
      );
    t = this.DisableCollisionHandle.Enable(t, this.constructor.name);
    return (
      t &&
        this.ActorInternal?.IsValid() &&
        this.ActorInternal.bActorEnableCollision !==
          this.DisableCollisionHandle.Empty &&
        this.ActorInternal.SetActorEnableCollision(
          this.DisableCollisionHandle.Empty,
        ),
      t
    );
  }
  DumpDisableActorInfo() {
    return this.DisableActorHandle.DumpDisableInfo();
  }
  DumpDisableCollisionInfo() {
    return this.DisableCollisionHandle.DumpDisableInfo();
  }
  DumpDisableTickInfo() {
    var t = this.Entity.GetComponent(109);
    return t ? t.DumpDisableTickInfo() : "";
  }
  SetActorVisible(t, i) {
    t
      ? this.krn && (this.EnableActor(this.krn), (this.krn = void 0))
      : this.krn || (this.krn = this.DisableActor(i));
  }
  SetCollisionEnable(t, i) {
    t
      ? this.Frn && (this.EnableCollision(this.Frn), (this.Frn = void 0))
      : this.Frn || (this.Frn = this.DisableCollision(i));
  }
  SetTickEnable(t, i) {
    t
      ? this.Vrn &&
        (this.Entity.GetComponent(109)?.EnableTickWithLog(this.Vrn, i),
        (this.Vrn = void 0))
      : this.Vrn ||
        (this.Vrn = this.Entity.GetComponent(109)?.DisableTickWithLog(i));
  }
  OnClear() {
    return (
      this.Krn(!0),
      this.CreatureDataInternal &&
        (this.CreatureDataInternal.Reset(),
        (this.CreatureDataInternal = void 0)),
      this.DisableActorHandle.Clear(),
      this.DisableCollisionHandle.Clear(),
      this.ResetAllCachedTime(),
      !0
    );
  }
  GetSocketTransform(t) {
    return this.ActorTransform;
  }
  GetSocketLocation(t) {
    return this.ActorLocation;
  }
  GetWatchedPoint() {
    return this.ActorLocationProxy;
  }
};
(BaseActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(1)],
  BaseActorComponent,
)),
  (exports.BaseActorComponent = BaseActorComponent);
//# sourceMappingURL=BaseActorComponent.js.map
