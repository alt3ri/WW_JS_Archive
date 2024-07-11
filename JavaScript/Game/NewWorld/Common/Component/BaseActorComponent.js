"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let o;
    const h = arguments.length;
    let r =
      h < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, i, e, s);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (o = t[n]) && (r = (h < 3 ? o(r) : h > 3 ? o(i, e, r) : o(i, e)) || r);
    return h > 3 && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseActorComponent = exports.DisableEntityHandle = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Entity_1 = require("../../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const CycleCounter_1 = require("../../../../Core/Performance/CycleCounter");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
class DisableEntityHandle {
  constructor(t) {
    (this.S9 = t), (this.vW = 0), (this.DW = new Map());
  }
  get Empty() {
    return this.DW.size === 0;
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
            ["Type", this.S9],
            ["ConstructorName", i],
            ["handle", t],
          ),
        !1);
  }
  Clear() {
    this.DW.clear();
  }
  DumpDisableInfo() {
    let t;
    let i;
    const e = new Array();
    let s = "";
    for ([t, i] of this.DW)
      e.push(`${s}{Type:${this.S9},Handle:${t},Reason:${i}}`), (s = " ");
    return e.join("");
  }
}
exports.DisableEntityHandle = DisableEntityHandle;
let BaseActorComponent = class BaseActorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorInternal = void 0),
      (this.CachedActorTransform = void 0),
      (this.CachedActorLocation = Vector_1.Vector.Create()),
      (this.CachedActorRotation = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.CachedActorScale = Vector_1.Vector.Create()),
      (this.CachedActorQuat = Quat_1.Quat.Create(0, 0, 0, 1)),
      (this.CachedActorForward = Vector_1.Vector.Create(1, 0, 0)),
      (this.CachedActorRight = Vector_1.Vector.Create(0, 1, 0)),
      (this.CachedActorUp = Vector_1.Vector.Create(0, 0, 1)),
      (this.CachedLocationTime = -1),
      (this.CachedForwardTime = -1),
      (this.CachedScaleTime = -1),
      (this.CachedRotationTime = -1),
      (this.CachedTransformTime = -1),
      (this.CachedRightTime = -1),
      (this.CachedUpTime = -1),
      (this.CachedDesiredActorLocation = Vector_1.Vector.Create()),
      (this.IsChangingLocation = !1),
      (this.CreatureDataInternal = void 0),
      (this.DebugMovementComp = void 0),
      (this.onn = !0),
      (this.rnn = !0),
      (this.IsInSequenceBinding = !1),
      (this.DisableActorHandle = void 0),
      (this.DisableCollisionHandle = void 0),
      (this.DisableTickHandle = void 0),
      (this.nnn = void 0),
      (this.snn = void 0),
      (this.ann = void 0),
      (this.hnn = void 0),
      (this.lnn = void 0),
      (this._nn = void 0),
      (this.LastActorLocation = Vector_1.Vector.Create());
  }
  get IsAutonomousProxy() {
    return this.onn;
  }
  get IsMoveAutonomousProxy() {
    return this.rnn;
  }
  OnCreate() {
    return (
      (this.DisableActorHandle = new DisableEntityHandle(
        "SetActorHiddenInGame",
      )),
      (this.DisableCollisionHandle = new DisableEntityHandle(
        "SetActorEnableCollision",
      )),
      (this.DisableTickHandle = new DisableEntityHandle("SetActorTickEnabled")),
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
  OnActivate() {
    this.ActorInternal.Kuro_SetRole(this.rnn ? 2 : 1),
      this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
  }
  OnAfterTick(t) {
    this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
  }
  SetAutonomous(t, i = void 0) {
    (this.onn = t),
      this.SetMoveAutonomous(void 0 === i ? t : i, "切换逻辑主控");
  }
  SetMoveAutonomous(t, i = 0) {
    (this.rnn = t), this.ActorInternal?.Kuro_SetRole(this.rnn ? 2 : 1);
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
          this.ActorInternal.GetActorScale3D(),
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
        (this.CachedActorTransform = this.ActorInternal.GetTransform())),
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
          this.unn(!0),
          this.CachedActorLocation.FromUeVector(
            this.ActorInternal.K2_GetActorLocation(),
          ),
          this.unn(!1)),
        this.CachedActorLocation);
  }
  unn(t) {
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
    if (
      (CycleCounter_1.CycleCounter.Start("TS_SetActorLocation"),
      !MathUtils_1.MathUtils.IsValidVector(t))
    )
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
        (s = this.ActorInternal.K2_SetActorLocation(t, e, void 0, !0)),
        (this.IsChangingLocation = !1),
        this.DebugMovementComp) &&
        this.DebugMovementComp.MarkDebugRecord(i + ".SetActorLocation", 1),
      this.ResetLocationCachedTime(),
      this.OnTeleport(),
      CycleCounter_1.CycleCounter.Stop("TS_SetActorLocation"),
      this.ActorInternal?.IsValid() &&
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          58,
          "[SetActorLocation]",
          ["location:", t],
          ["owner", this?.Owner.GetName()],
        ),
      s
    );
  }
  TeleportTo(t, i, e = "unknown") {
    if (
      (CycleCounter_1.CycleCounter.Start("TS_TeleportTo"),
      !MathUtils_1.MathUtils.IsValidVector(t) ||
        !MathUtils_1.MathUtils.IsValidRotator(i))
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
        (s = this.ActorInternal.K2_KuroTeleportTo(t, i)),
        (this.IsChangingLocation = !1),
        this.DebugMovementComp) &&
        this.DebugMovementComp.MarkDebugRecord(e + ".TeleportTo", 1),
      this.ResetLocationCachedTime(),
      this.OnTeleport(),
      CycleCounter_1.CycleCounter.Stop("TS_TeleportTo"),
      this.ActorInternal?.IsValid() &&
        ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Test",
          58,
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
    CycleCounter_1.CycleCounter.Start("TS_SetActorRotation");
    let s = !1;
    return (
      this.ActorInternal?.IsValid() &&
        ((s = this.ActorInternal.K2_KuroSetActorRotation(t, e, !1)),
        this.DebugMovementComp) &&
        this.DebugMovementComp.MarkDebugRecord(i + ".SetActorRotation", 1),
      this.cnn(),
      CycleCounter_1.CycleCounter.Stop("TS_SetActorRotation"),
      s
    );
  }
  cnn() {
    (this.CachedTransformTime = 0),
      (this.CachedRotationTime = 0),
      (this.CachedUpTime = 0),
      (this.CachedRightTime = 0),
      (this.CachedForwardTime = 0);
  }
  SetActorLocationAndRotation(t, i, e = "unknown", s = !1) {
    let o;
    return (
      CycleCounter_1.CycleCounter.Start("TS_SetActorLocationAndRotation"),
      MathUtils_1.MathUtils.IsValidVector(t)
        ? ((o = !1),
          this.CachedDesiredActorLocation.FromUeVector(t),
          (this.IsChangingLocation = !0),
          (o = this.ActorInternal.K2_SetActorLocationAndRotation(
            t,
            i,
            s,
            void 0,
            !0,
          )),
          (this.IsChangingLocation = !1),
          this.ResetTransformCachedTime(),
          this.OnTeleport(),
          this.DebugMovementComp &&
            this.DebugMovementComp.MarkDebugRecord(
              e + ".SetActorLocationAndRotation",
              1,
            ),
          CycleCounter_1.CycleCounter.Stop("TS_SetActorLocationAndRotation"),
          ModelManager_1.ModelManager.SundryModel.SceneCheckOn &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Test",
              58,
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
          !1)
    );
  }
  SetActorTransform(t, i = "unknown", e = !0) {
    let s = !1;
    const o = t.GetLocation();
    return MathUtils_1.MathUtils.IsValidVector(o)
      ? (this.CachedDesiredActorLocation.FromUeVector(t.GetLocation()),
        this.ActorLocationProxy.Equals(this.CachedDesiredActorLocation)
          ? (s = this.SetActorRotation(t.GetRotation().Rotator()))
          : ((this.IsChangingLocation = !0),
            (s = this.ActorInternal.K2_SetActorTransform(t, e, void 0, !0)),
            (this.IsChangingLocation = !1)),
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
    this.ActorInternal.K2_AddActorWorldOffset(t, e, void 0, !1),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorWorldOffset", 1),
      this.ResetLocationCachedTime();
  }
  AddActorLocalOffset(t, i = "unknown", e = !0) {
    this.ActorInternal.K2_AddActorLocalOffset(t, e, void 0, !1),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorLocalOffset", 1),
      this.ResetLocationCachedTime();
  }
  AddActorWorldRotation(t, i = "unknown", e = !1) {
    this.ActorInternal.K2_AddActorWorldRotation(t, e, void 0, !1),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorWorldRotation", 1),
      this.cnn();
  }
  AddActorLocalRotation(t, i = "unknown", e = !1) {
    this.ActorInternal.K2_AddActorLocalRotation(t, e, void 0, !1),
      this.DebugMovementComp &&
        this.DebugMovementComp.MarkDebugRecord(i + ".AddActorLocalRotation", 1),
      this.cnn();
  }
  ResetTransformCachedTime() {
    (this.CachedTransformTime = 0),
      (this.CachedLocationTime = 0),
      (this.CachedRotationTime = 0),
      (this.CachedUpTime = 0),
      (this.CachedRightTime = 0),
      (this.CachedForwardTime = 0);
  }
  ResetAllCachedTime() {
    (this.CachedTransformTime = -1),
      (this.CachedLocationTime = -1),
      (this.CachedRotationTime = -1),
      (this.CachedUpTime = -1),
      (this.CachedRightTime = -1),
      (this.CachedForwardTime = -1);
  }
  OnSetActorActive(t, i) {
    t
      ? (this.EnableActor(this.hnn),
        this.EnableCollision(this.lnn),
        this.EnableTick(this._nn),
        (this.hnn = void 0),
        (this.lnn = void 0),
        (this._nn = void 0))
      : ((this.hnn = this.DisableActor(i)),
        (this.lnn = this.DisableCollision(i)),
        (this._nn = this.DisableTick(i)));
  }
  SetSequenceBinding(t) {
    this.IsInSequenceBinding = t;
  }
  GetSequenceBinding() {
    return this.IsInSequenceBinding;
  }
  DisableActor(t) {
    const i = this.DisableActorHandle.Disable(t, this.constructor.name);
    return (
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
        )),
      i
    );
  }
  DisableCollision(t) {
    const i = this.DisableCollisionHandle.Disable(t, this.constructor.name);
    return (
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
  DisableTick(t) {
    t = this.DisableTickHandle.Disable(t, this.constructor.name);
    return (
      this.ActorInternal?.IsValid() &&
        this.ActorInternal.IsActorTickEnabled() &&
        this.ActorInternal.SetActorTickEnabled(!1),
      t
    );
  }
  EnableActor(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Entity",
        3,
        "EnableActor",
        ["CreatureDataId", this.CreatureData?.GetCreatureDataId()],
        ["PbDataId", this.CreatureData?.GetPbDataId()],
        ["Handle", t],
      );
    t = this.DisableActorHandle.Enable(t, this.constructor.name);
    if (
      t &&
      this.ActorInternal?.IsValid() &&
      this.ActorInternal.bHidden !== !this.DisableActorHandle.Empty
    ) {
      const i = () => {
        const t = this.DisableActorHandle.Empty;
        this.ActorInternal.SetActorHiddenInGame(!t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSetActorHidden,
            this.Entity.Id,
            t,
          );
      };
      this.Entity.GetComponent(99)
        ? TimerSystem_1.TimerSystem.Next(() => {
            this.ActorInternal?.IsValid() && i();
          })
        : i();
    }
    return t;
  }
  EnableCollision(t) {
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
  EnableTick(t) {
    t = this.DisableTickHandle.Enable(t, this.constructor.name);
    return (
      t &&
        this.ActorInternal?.IsValid() &&
        this.ActorInternal.IsActorTickEnabled() !==
          this.DisableTickHandle.Empty &&
        this.ActorInternal.SetActorTickEnabled(this.DisableTickHandle.Empty),
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
    return this.DisableTickHandle.DumpDisableInfo();
  }
  SetActorVisible(t, i) {
    t
      ? this.nnn && (this.EnableActor(this.nnn), (this.nnn = void 0))
      : this.nnn || (this.nnn = this.DisableActor(i));
  }
  SetCollisionEnable(t, i) {
    t
      ? this.snn && (this.EnableCollision(this.snn), (this.snn = void 0))
      : this.snn || (this.snn = this.DisableCollision(i));
  }
  SetTickEnable(t, i) {
    t
      ? this.ann && (this.EnableTick(this.ann), (this.ann = void 0))
      : this.ann || (this.ann = this.DisableTick(i));
  }
  OnClear() {
    return (
      this.unn(!0),
      this.CreatureDataInternal &&
        (this.CreatureDataInternal.Reset(),
        (this.CreatureDataInternal = void 0)),
      this.DisableActorHandle.Clear(),
      this.DisableCollisionHandle.Clear(),
      this.DisableTickHandle.Clear(),
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
};
(BaseActorComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(1)],
  BaseActorComponent,
)),
  (exports.BaseActorComponent = BaseActorComponent);
// # sourceMappingURL=BaseActorComponent.js.map
