"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      h = arguments.length,
      n =
        h < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (s = t[r]) && (n = (h < 3 ? s(n) : 3 < h ? s(e, i, n) : s(e, i)) || n);
    return 3 < h && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLocationSafetyComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TeleportController_1 = require("../../../../Module/Teleport/TeleportController"),
  CharacterController_1 = require("../../CharacterController"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  PROFILE_KEY = "SafetyTrace",
  HIGHT_LIMIT = -2e5,
  disableTag = [-1446183172],
  TELEPORT_THREHOLD = 1e3,
  TELEPORT_THREHOLD_SQUARED = TELEPORT_THREHOLD * TELEPORT_THREHOLD,
  LOW_FREQ_TEST_INTERNAL = 1e3,
  LOW_FREQ_MAX_NOT_SAFETY_COUNT = 3,
  MID_FREQ_TEST_INTERNAL = 1e3,
  MID_FREQ_MAX_NOT_SAFETY_COUNT = 2,
  HIGH_FREQ_TEST_INTERNAL = 500,
  HIGH_FREQ_MAX_NOT_SAFETY_COUNT = 2,
  SUPER_HIGH_FREQ_TEST_INTERNAL = 250,
  SUPER_HIGH_FREQ_MAX_NOT_SAFETY_COUNT = 2,
  freqEnumToLevelNum = new Map([
    [IComponent_1.EDetectionFrequency.Low, 0],
    [IComponent_1.EDetectionFrequency.Medium, 1],
    [IComponent_1.EDetectionFrequency.High, 2],
    [IComponent_1.EDetectionFrequency.SuperHigh, 3],
  ]);
class CachedSafetyLocationRecorder {
  constructor() {
    (this.SafetyLocation = Vector_1.Vector.Create()), (this.IsSafety = !1);
  }
  GetSafetyLocation() {
    return this.IsSafety ? this.SafetyLocation : void 0;
  }
}
class ConfigSafetyLocationRecorder {
  constructor() {
    (this.SafetyLocationConfigMap = new Map()),
      (this.LHo = Vector_1.Vector.Create());
  }
  GetSafetyLocation() {
    let e = void 0;
    if (
      (this.SafetyLocationConfigMap.forEach((t) => {
        e = t.SafeLocation;
      }),
      e)
    )
      return this.LHo.FromConfigVector(e), this.LHo;
  }
}
let RoleLocationSafetyComponent = class RoleLocationSafetyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.rJo = void 0),
      (this.vri = new Array()),
      (this.son = 0),
      (this.sxr = 0),
      (this.xpa = LOW_FREQ_MAX_NOT_SAFETY_COUNT),
      (this.Ppa = LOW_FREQ_TEST_INTERNAL),
      (this.wpa = new CachedSafetyLocationRecorder()),
      (this.Bpa = new ConfigSafetyLocationRecorder()),
      (this.lon = 0),
      (this.j3 = void 0),
      (this._ae = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this._on = !1),
      (this.uon = 0),
      (this.Fea = Vector_1.Vector.Create()),
      (this.Vea = Rotator_1.Rotator.Create()),
      (this.tva = void 0),
      (this.iva = void 0),
      (this.I3r = (t) => {
        var e = t.GetComponent(87);
        e &&
          (MathUtils_1.MathUtils.IsValidVector(e.Fea)
            ? this.Fea.DeepCopy(e.Fea)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "Safety Inherit: Invalid Location",
                ["Char", t.GetComponent(3)?.Actor.GetName()],
                ["Location", e.Fea],
              ),
          MathUtils_1.MathUtils.IsValidRotator(e.Vea)
            ? this.Vea.DeepCopy(e.Vea)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "Safety Inherit: Invalid Rotator",
                ["Char", t.GetComponent(3)?.Actor.GetName()],
                ["Rotator", e.Vea],
              ),
          this.Hte.IsRoleAndCtrlByMe) &&
          (this.Bpa.SafetyLocationConfigMap.clear(),
          e.Bpa.SafetyLocationConfigMap.forEach((t, e) => {
            this.Bpa.SafetyLocationConfigMap.set(e, t);
          }),
          e.Bpa.SafetyLocationConfigMap.clear(),
          this.bpa(),
          (this.wpa.IsSafety = !1),
          e.wpa.IsSafety) &&
          ((t = t.GetComponent(3)).DefaultHalfHeight ===
            this.Hte.DefaultHalfHeight &&
          t.DefaultRadius === this.Hte.DefaultRadius
            ? ((this.wpa.IsSafety = !0),
              this.wpa.SafetyLocation.DeepCopy(e.wpa.SafetyLocation))
            : (this.Lz.DeepCopy(e.wpa.SafetyLocation),
              (this.Lz.Z += this.Hte.DefaultHalfHeight - t.DefaultHalfHeight),
              (this.wpa.IsSafety = this.con(this.Lz)),
              this.wpa.IsSafety && this.wpa.SafetyLocation.DeepCopy(this.Lz)),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Movement",
            6,
            "Inherit LastSafety",
            ["IsSafety", this.wpa.IsSafety],
            ["OldLocation", e.wpa.SafetyLocation],
            ["NewLocation", this.wpa.SafetyLocation],
          );
      }),
      (this.bpr = () => {
        this._on = !0;
      }),
      (this.Ilt = () => {
        (this._on = !1), (this.wpa.IsSafety = !1), (this.lon = 0);
      }),
      (this.Aua = () => {
        (this.wpa.IsSafety = !1), (this.lon = 0);
      }),
      (this.mon = () => {
        (this.wpa.IsSafety = !1), (this.lon = 0);
      }),
      (this.don = (t, e) => {
        e
          ? (0 === this.son &&
              (this.sxr = this.Disable(
                "[RoleLocationSafetyComponent.OnDisableTagsChanged] 包含坐下Tag",
              )),
            ++this.son)
          : (--this.son,
            0 === this.son &&
              ((this.wpa.IsSafety = !1),
              this.Enable(
                this.sxr,
                "[RoleLocationSafetyComponent.OnDisableTagsChanged] 不含坐下Tag",
              )));
      });
  }
  static get Dependencies() {
    return [3, 160];
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(3)),
      (this.rJo = this.Entity.GetComponent(160)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.I3r,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.ElevatorMove,
        this.Aua,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharGravityDirectChanged,
        this.mon,
      ),
      (this.son = 0);
    var t = this.Entity.GetComponent(188);
    if (t)
      for (const e of disableTag)
        t.HasTag(e) && ++this.son,
          this.vri.push(t.ListenForTagAddOrRemove(e, this.don));
    return (
      MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)
        ? this.Fea.DeepCopy(this.Hte.ActorLocationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety Init: InValid Location",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorLocation", this.Hte?.ActorLocationProxy],
            ),
          this.Fea.Set(0, 0, 0)),
      MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)
        ? this.Vea.DeepCopy(this.Hte.ActorRotationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety Init: InValid Rotator",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorRotator", this.Hte?.ActorRotationProxy],
            ),
          this.Vea.Set(0, 0, 0)),
      !0
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.RoleOnStateInherit,
      this.I3r,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.bpr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.ElevatorMove,
        this.Aua,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharGravityDirectChanged,
        this.mon,
      ),
      this.j3 &&
        (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
    for (const t of this.vri) t.EndTask();
    return !(this.vri.length = 0);
  }
  OnActivate() {
    this.wpa.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy),
      (this.wpa.IsSafety = !1);
  }
  OnEnable() {
    return (
      this.Hte &&
        !this.wpa.IsSafety &&
        ((this.wpa.IsSafety = this.con(this.Hte.ActorLocationProxy)),
        this.wpa.IsSafety) &&
        this.wpa.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy),
      !0
    );
  }
  con(t) {
    if (!MathUtils_1.MathUtils.IsValidVector(t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 32, "当前角色坐标包含NaN", [
            "location",
            t,
          ]),
        !1
      );
    this._ae.DeepCopy(t),
      this.Hte.ActorUpProxy.Multiply(
        this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius,
        this.Lz,
      ),
      t.Addition(this.Lz, this._ae),
      t.Subtraction(this.Lz, this.uae);
    var e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace(),
      t =
        ((e.WorldContextObject = this.Hte.Actor),
        (e.Radius = this.Hte.DefaultRadius),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, this._ae),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, this.uae),
        e.ActorsToIgnore.Empty(),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          this.Hte.Actor.CapsuleComponent,
          e,
          PROFILE_KEY,
          PROFILE_KEY,
        ));
    if (t) {
      var i = e.HitResult.GetHitCount();
      for (let t = 0; t < i; ++t) {
        var o = e.HitResult.Actors.Get(t);
        if (!(o instanceof TsBaseCharacter_1.default))
          return (
            (o = e.HitResult.TimeArray.Get(t)),
            (this.tva = e.HitResult?.Actors.Get(t)),
            (this.iva = e.HitResult?.Components.Get(t)),
            o > 1 - MathUtils_1.MathUtils.SmallNumber
          );
      }
    }
    return !0;
  }
  OnTick(t) {
    this.uon > Time_1.Time.WorldTime ||
      ((this.uon = Time_1.Time.WorldTime + this.Ppa), !this.Active) ||
      !this.Valid ||
      this._on ||
      (this.Hte.IsRoleAndCtrlByMe &&
        !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
        this.Hte.IsDefaultCapsule &&
        this.rJo.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.Swing &&
        this.Entity.Id ===
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id &&
        this.Rua());
  }
  Rua() {
    let t = !1;
    var e;
    this.rJo.PositionState !==
    CharacterUnifiedStateTypes_1.ECharPositionState.Ground
      ? ((t = this.con(this.Hte.ActorLocationProxy)),
        (e = this.Con(this.Hte.ActorLocationProxy)),
        t && e
          ? (this.lon = 0)
          : ++this.lon >= this.xpa &&
            ((this.lon = 0), this.BackToSafetyPlace()))
      : (t = this.con(this.Hte.ActorLocationProxy))
        ? this.Entity.GetComponent(159)?.GetBuffById(
            CharacterBuffIds_1.buffId.ElevatorBuff,
          ) ||
          ((this.wpa.IsSafety = !0),
          this.wpa.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy),
          (this.lon = 0))
        : ((this.lon = 0), this.BackToSafetyPlace());
  }
  OnAfterTick(t) {
    MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)
      ? this.Fea.DeepCopy(this.Hte.ActorLocationProxy)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "Safety: InValid Location",
            ["Character", this.Hte?.Actor.GetName()],
            ["ErrorLocation", this.Hte?.ActorLocationProxy],
          ),
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
          this.Fea.ToUeVector(),
          void 0,
          "RoleLocationSafetyComponent.OnAfterTick",
        ).finally(void 0)),
      MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)
        ? this.Vea.DeepCopy(this.Hte.ActorRotationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety: InValid Rotator",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorRotator", this.Hte?.ActorRotationProxy],
            ),
          this.Hte.SetActorRotation(
            this.Vea.ToUeRotator(),
            "RoleSafetyNotValid",
            !1,
          ));
  }
  Con(t) {
    return !(
      t.Z < HIGHT_LIMIT &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Role", 7, "玩家超过最低高度，强制拉回安全位置"),
      (this.lon = this.xpa),
      1)
    );
  }
  bpa() {
    let t = IComponent_1.EDetectionFrequency.Low;
    for (const e of this.Bpa.SafetyLocationConfigMap.values())
      (freqEnumToLevelNum.get(e.DetectionFrequency) ?? 0) >
        (freqEnumToLevelNum.get(t) ?? 0) && (t = e.DetectionFrequency);
    switch (t) {
      case IComponent_1.EDetectionFrequency.Low:
        (this.Ppa = LOW_FREQ_TEST_INTERNAL),
          (this.xpa = LOW_FREQ_MAX_NOT_SAFETY_COUNT);
        break;
      case IComponent_1.EDetectionFrequency.Medium:
        (this.Ppa = MID_FREQ_TEST_INTERNAL),
          (this.xpa = MID_FREQ_MAX_NOT_SAFETY_COUNT);
        break;
      case IComponent_1.EDetectionFrequency.High:
        (this.Ppa = HIGH_FREQ_TEST_INTERNAL),
          (this.xpa = HIGH_FREQ_MAX_NOT_SAFETY_COUNT);
        break;
      case IComponent_1.EDetectionFrequency.SuperHigh:
        (this.Ppa = SUPER_HIGH_FREQ_TEST_INTERNAL),
          (this.xpa = SUPER_HIGH_FREQ_MAX_NOT_SAFETY_COUNT);
    }
  }
  AddSafetyLocationConfig(t, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Role", 40, "场景实体向玩家注册安全位置信息", [
        "SceneItemId",
        t.Id,
      ]),
      this.Bpa.SafetyLocationConfigMap.set(t.Id, e),
      this.bpa();
  }
  RemoveSafetyLocationConfig(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Role", 40, "场景实体向玩家注册安全位置信息", [
        "SceneItemId",
        t.Id,
      ]),
      this.Bpa.SafetyLocationConfigMap.delete(t.Id),
      this.bpa();
  }
  BackToSafetyPlace() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Movement",
        6,
        "BackToSafetyPlace",
        ["From", this.Hte.ActorLocationProxy],
        ["HitActor", this.tva?.GetName()],
        ["HitComp", this.iva?.GetName()],
        ["Transform", this.tva?.GetTransform()],
      );
    let t = void 0;
    (t = this.Bpa.GetSafetyLocation())
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Scene", ["To", t]),
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
          t.ToUeVector(),
          void 0,
          "BackToSafetyPlace.Scene",
        ).finally(void 0))
      : CharacterController_1.CharacterController.FindSpaceForSafety(
            this.Hte,
            this.Hte.ScaledHalfHeight,
            this.Hte.ScaledRadius,
            this.Lz,
          )
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Space", ["To", t]),
          this.Hte.SetActorLocation(
            this.Lz.ToUeVector(),
            "BackToSafetyPlace.Space",
            !1,
          ))
        : (t = this.wpa.GetSafetyLocation()) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Last", ["To", t]),
          Vector_1.Vector.DistSquared(this.Hte.ActorLocationProxy, t) >
          TELEPORT_THREHOLD_SQUARED
            ? TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                t.ToUeVector(),
                void 0,
                "BackToSafetyPlace.Last",
              ).finally(void 0)
            : this.Hte.SetActorLocation(
                t.ToUeVector(),
                "BackToSafetyPlace.Last",
                !1,
              ));
  }
};
(RoleLocationSafetyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(87)],
  RoleLocationSafetyComponent,
)),
  (exports.RoleLocationSafetyComponent = RoleLocationSafetyComponent);
//# sourceMappingURL=RoleLocationSafetyComponent.js.map
