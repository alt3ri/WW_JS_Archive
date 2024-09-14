"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      r = arguments.length,
      h =
        r < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, o);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (h = (r < 3 ? s(h) : 3 < r ? s(e, i, h) : s(e, i)) || h);
    return 3 < r && h && Object.defineProperty(e, i, h), h;
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
  WorldController_1 = require("../../../../World/Controller/WorldController"),
  CharacterController_1 = require("../../CharacterController"),
  CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  PROFILE_KEY = "SafetyTrace",
  PLANAR_LIMIT = 32e5,
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
  ClearObject() {
    return !(this.IsSafety = !1);
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
  ClearObject() {
    return this.SafetyLocationConfigMap.clear(), !0;
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
      (this.Rya = LOW_FREQ_MAX_NOT_SAFETY_COUNT),
      (this.Aya = LOW_FREQ_TEST_INTERNAL),
      (this.Uya = new CachedSafetyLocationRecorder()),
      (this.xya = new ConfigSafetyLocationRecorder()),
      (this.lon = 0),
      (this.j3 = void 0),
      (this._ae = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this._on = !1),
      (this.uon = 0),
      (this.Qia = Vector_1.Vector.Create()),
      (this.Kia = Rotator_1.Rotator.Create()),
      (this.Fya = void 0),
      (this.Vya = void 0),
      (this.I3r = (t) => {
        var e,
          i = t.GetComponent(88);
        i &&
          (MathUtils_1.MathUtils.IsValidVector(i.Qia)
            ? this.Qia.DeepCopy(i.Qia)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "Safety Inherit: Invalid Location",
                ["Char", t.GetComponent(3)?.Actor.GetName()],
                ["Location", i.Qia],
              ),
          MathUtils_1.MathUtils.IsValidRotator(i.Kia)
            ? this.Kia.DeepCopy(i.Kia)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "Safety Inherit: Invalid Rotator",
                ["Char", t.GetComponent(3)?.Actor.GetName()],
                ["Rotator", i.Kia],
              ),
          this.Hte.IsRoleAndCtrlByMe) &&
          (this.xya.SafetyLocationConfigMap.clear(),
          i.xya.SafetyLocationConfigMap.forEach((t, e) => {
            this.xya.SafetyLocationConfigMap.set(e, t);
          }),
          i.xya.SafetyLocationConfigMap.clear(),
          this.Pya(),
          (this.Uya.IsSafety = !1),
          i.Uya.IsSafety) &&
          ((t = t.GetComponent(3)).DefaultHalfHeight ===
            this.Hte.DefaultHalfHeight &&
          t.DefaultRadius === this.Hte.DefaultRadius
            ? ((this.Uya.IsSafety = !0),
              this.Uya.SafetyLocation.DeepCopy(i.Uya.SafetyLocation))
            : (((e = Vector_1.Vector.Create(i.Uya.SafetyLocation)).Z +=
                this.Hte.DefaultHalfHeight - t.DefaultHalfHeight),
              (this.Uya.IsSafety = this.con(e)),
              this.Uya.IsSafety && this.Uya.SafetyLocation.DeepCopy(e)),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Movement",
            6,
            "Inherit LastSafety",
            ["IsSafety", this.Uya.IsSafety],
            ["OldLocation", i.Uya.SafetyLocation],
            ["NewLocation", this.Uya.SafetyLocation],
          );
      }),
      (this.bpr = () => {
        this._on = !0;
      }),
      (this.Ilt = () => {
        (this._on = !1), (this.Uya.IsSafety = !1), (this.lon = 0);
      }),
      (this.Oma = () => {
        (this.Uya.IsSafety = !1), (this.lon = 0);
      }),
      (this.mon = () => {
        (this.Uya.IsSafety = !1), (this.lon = 0);
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
              ((this.Uya.IsSafety = !1),
              this.Enable(
                this.sxr,
                "[RoleLocationSafetyComponent.OnDisableTagsChanged] 不含坐下Tag",
              )));
      });
  }
  static get Dependencies() {
    return [3, 161];
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(3)),
      (this.rJo = this.Entity.GetComponent(161)),
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
        this.Oma,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharGravityDirectChanged,
        this.mon,
      ),
      (this.son = 0);
    var t = this.Entity.GetComponent(190);
    if (t)
      for (const e of disableTag)
        t.HasTag(e) && ++this.son,
          this.vri.push(t.ListenForTagAddOrRemove(e, this.don));
    return (
      MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)
        ? this.Qia.DeepCopy(this.Hte.ActorLocationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety Init: InValid Location",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorLocation", this.Hte?.ActorLocationProxy],
            ),
          this.Qia.Set(0, 0, 0)),
      MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)
        ? this.Kia.DeepCopy(this.Hte.ActorRotationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety Init: InValid Rotator",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorRotator", this.Hte?.ActorRotationProxy],
            ),
          this.Kia.Set(0, 0, 0)),
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
        this.Oma,
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
    this.Uya.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy),
      (this.Uya.IsSafety = !1);
  }
  OnEnable() {
    return (
      this.Hte &&
        !this.Uya.IsSafety &&
        ((this.Uya.IsSafety = this.con(this.Hte.ActorLocationProxy)),
        this.Uya.IsSafety) &&
        this.Uya.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy),
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
            (this.Fya = e.HitResult?.Actors.Get(t)),
            (this.Vya = e.HitResult?.Components.Get(t)),
            o > 1 - MathUtils_1.MathUtils.SmallNumber
          );
      }
    }
    return !0;
  }
  OnTick(t) {
    this.uon > Time_1.Time.WorldTime ||
      ((this.uon = Time_1.Time.WorldTime + this.Aya), !this.Active) ||
      !this.Valid ||
      this._on ||
      (this.Hte.IsRoleAndCtrlByMe &&
        !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
        this.Hte.IsDefaultCapsule &&
        this.rJo.MoveState !==
          CharacterUnifiedStateTypes_1.ECharMoveState.Swing &&
        this.Entity.Id ===
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id &&
        this.kma());
  }
  kma() {
    this.rJo.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground ||
    this.Con(this.Hte.ActorLocationProxy)
      ? this.con(this.Hte.ActorLocationProxy)
        ? this.Entity.GetComponent(160)?.GetBuffById(
            CharacterBuffIds_1.buffId.ElevatorBuff,
          ) ||
          (this.rJo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
            ((this.Uya.IsSafety = !0),
            this.Uya.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy)),
          (this.lon = 0))
        : ++this.lon >= this.Rya && ((this.lon = 0), this.BackToSafetyPlace())
      : WorldController_1.WorldController.RequestToNearestTeleport();
  }
  OnAfterTick(t) {
    MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)
      ? this.Qia.DeepCopy(this.Hte.ActorLocationProxy)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "Safety: InValid Location",
            ["Character", this.Hte?.Actor.GetName()],
            ["ErrorLocation", this.Hte?.ActorLocationProxy],
          ),
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
          this.Qia.ToUeVector(),
          void 0,
          "RoleLocationSafetyComponent.OnAfterTick",
        ).finally(void 0)),
      MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)
        ? this.Kia.DeepCopy(this.Hte.ActorRotationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety: InValid Rotator",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorRotator", this.Hte?.ActorRotationProxy],
            ),
          this.Hte.SetActorRotation(
            this.Kia.ToUeRotator(),
            "RoleSafetyNotValid",
            !1,
          ));
  }
  Con(t) {
    return (
      !(
        Math.abs(t.X) > PLANAR_LIMIT ||
        Math.abs(t.Y) > PLANAR_LIMIT ||
        t.Z < HIGHT_LIMIT
      ) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Role", 7, "超过极限区间", ["location", t]),
      !1)
    );
  }
  Pya() {
    let t = IComponent_1.EDetectionFrequency.Low;
    for (const e of this.xya.SafetyLocationConfigMap.values())
      (freqEnumToLevelNum.get(e.DetectionFrequency) ?? 0) >
        (freqEnumToLevelNum.get(t) ?? 0) && (t = e.DetectionFrequency);
    switch (t) {
      case IComponent_1.EDetectionFrequency.Low:
        (this.Aya = LOW_FREQ_TEST_INTERNAL),
          (this.Rya = LOW_FREQ_MAX_NOT_SAFETY_COUNT);
        break;
      case IComponent_1.EDetectionFrequency.Medium:
        (this.Aya = MID_FREQ_TEST_INTERNAL),
          (this.Rya = MID_FREQ_MAX_NOT_SAFETY_COUNT);
        break;
      case IComponent_1.EDetectionFrequency.High:
        (this.Aya = HIGH_FREQ_TEST_INTERNAL),
          (this.Rya = HIGH_FREQ_MAX_NOT_SAFETY_COUNT);
        break;
      case IComponent_1.EDetectionFrequency.SuperHigh:
        (this.Aya = SUPER_HIGH_FREQ_TEST_INTERNAL),
          (this.Rya = SUPER_HIGH_FREQ_MAX_NOT_SAFETY_COUNT);
    }
  }
  AddSafetyLocationConfig(t, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Role", 40, "场景实体向玩家注册安全位置信息", [
        "SceneItemId",
        t.Id,
      ]),
      this.xya.SafetyLocationConfigMap.set(t.Id, e),
      this.Pya();
  }
  RemoveSafetyLocationConfig(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Role", 40, "场景实体向玩家注册安全位置信息", [
        "SceneItemId",
        t.Id,
      ]),
      this.xya.SafetyLocationConfigMap.delete(t.Id),
      this.Pya();
  }
  BackToSafetyPlace() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Movement",
        6,
        "BackToSafetyPlace",
        ["From", this.Hte.ActorLocationProxy],
        ["HitActor", this.Fya?.GetName()],
        ["HitComp", this.Vya?.GetName()],
        ["Transform", this.Fya?.GetTransform()],
      );
    let t = void 0;
    (t = this.xya.GetSafetyLocation())
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
            Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Space", [
              "To",
              this.Lz,
            ]),
          this.Hte.SetActorLocation(
            this.Lz.ToUeVector(),
            "BackToSafetyPlace.Space",
            !1,
          ))
        : (t = this.Uya.GetSafetyLocation()) &&
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
  [(0, RegisterComponent_1.RegisterComponent)(88)],
  RoleLocationSafetyComponent,
)),
  (exports.RoleLocationSafetyComponent = RoleLocationSafetyComponent);
//# sourceMappingURL=RoleLocationSafetyComponent.js.map
