"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      h = arguments.length,
      r =
        h < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, i, o);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (r = (h < 3 ? s(r) : 3 < h ? s(e, i, r) : s(e, i)) || r);
    return 3 < h && r && Object.defineProperty(e, i, r), r;
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
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TeleportController_1 = require("../../../../Module/Teleport/TeleportController"),
  CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  INTERNAL_TIME = 1e3,
  PROFILE_KEY = "SafetyTrace",
  MAX_NOT_SAFETY_COUNT = 3,
  HIGHT_LIMIT = -2e5,
  disableTag = [-1446183172],
  TELEPORT_THREHOLD = 1e3,
  TELEPORT_THREHOLD_SQUARED = TELEPORT_THREHOLD * TELEPORT_THREHOLD;
let RoleLocationSafetyComponent = class RoleLocationSafetyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.aYo = void 0),
      (this.foi = new Array()),
      (this.Lon = 0),
      (this.Uxr = 0),
      (this.Don = Vector_1.Vector.Create()),
      (this.Ron = !1),
      (this.Aon = 0),
      (this.j3 = void 0),
      (this._ae = Vector_1.Vector.Create()),
      (this.uae = Vector_1.Vector.Create()),
      (this.Lz = Vector_1.Vector.Create()),
      (this.Uon = !1),
      (this.Pon = 0),
      (this.WVs = Vector_1.Vector.Create()),
      (this.QVs = Rotator_1.Rotator.Create()),
      (this.W3r = (t, e) => {
        var i = t.GetComponent(85);
        i &&
          (MathUtils_1.MathUtils.IsValidVector(i.WVs)
            ? this.WVs.DeepCopy(i.WVs)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "Safety Inherit: Invalid Location",
                ["Char", t.GetComponent(3)?.Actor.GetName()],
                ["Location", i.WVs],
              ),
          MathUtils_1.MathUtils.IsValidRotator(i.QVs)
            ? this.QVs.DeepCopy(i.QVs)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Movement",
                6,
                "Safety Inherit: Invalid Rotator",
                ["Char", t.GetComponent(3)?.Actor.GetName()],
                ["Rotator", i.QVs],
              ),
          this.Hte.IsRoleAndCtrlByMe) &&
          ((this.Ron = !1), i.Ron) &&
          ((t = t.GetComponent(3)).DefaultHalfHeight ===
            this.Hte.DefaultHalfHeight &&
          t.DefaultRadius === this.Hte.DefaultRadius
            ? ((this.Ron = !0), this.Don.DeepCopy(i.Don))
            : (this.Lz.DeepCopy(i.Don),
              (this.Lz.Z += this.Hte.DefaultHalfHeight - t.DefaultHalfHeight),
              ([this.Ron] = this.xon(this.Lz)),
              this.Ron && this.Don.DeepCopy(this.Lz)),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Movement",
            6,
            "Inherit Safety",
            ["IsSafety", this.Ron],
            ["OldLocation", i.Don],
            ["NewLocation", this.Don],
          );
      }),
      (this.Gfr = () => {
        this.Uon = !0;
      }),
      (this.uht = () => {
        (this.Uon = !1), (this.Ron = !1), (this.Aon = 0);
      }),
      (this.won = (t, e) => {
        e
          ? (0 === this.Lon &&
              (this.Uxr = this.Disable(
                "[RoleLocationSafetyComponent.OnDisableTagsChanged] 包含坐下Tag",
              )),
            ++this.Lon)
          : (--this.Lon,
            0 === this.Lon &&
              ((this.Ron = !1),
              this.Enable(
                this.Uxr,
                "[RoleLocationSafetyComponent.OnDisableTagsChanged] 不含坐下Tag",
              )));
      });
  }
  static get Dependencies() {
    return [3, 158];
  }
  OnStart() {
    (this.Hte = this.Entity.GetComponent(3)),
      (this.aYo = this.Entity.GetComponent(158)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.W3r,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportStart,
        this.Gfr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      ),
      (this.Lon = 0);
    var t = this.Entity.GetComponent(185);
    if (t)
      for (const e of disableTag)
        t.HasTag(e) && ++this.Lon,
          this.foi.push(t.ListenForTagAddOrRemove(e, this.won));
    return (
      MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)
        ? this.WVs.DeepCopy(this.Hte.ActorLocationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety Init: InValid Location",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorLocation", this.Hte?.ActorLocationProxy],
            ),
          this.WVs.Set(0, 0, 0)),
      MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)
        ? this.QVs.DeepCopy(this.Hte.ActorRotationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety Init: InValid Rotator",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorRotator", this.Hte?.ActorRotationProxy],
            ),
          this.QVs.Set(0, 0, 0)),
      !0
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Entity,
      EventDefine_1.EEventName.RoleOnStateInherit,
      this.W3r,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportStart,
        this.Gfr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.uht,
      ),
      this.j3 &&
        (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
    for (const t of this.foi) t.EndTask();
    return !(this.foi.length = 0);
  }
  OnActivate() {
    this.Don.DeepCopy(this.Hte.ActorLocationProxy), (this.Ron = !1);
  }
  OnEnable() {
    return (
      this.Hte &&
        !this.Ron &&
        (([this.Ron] = this.xon(this.Hte.ActorLocationProxy)), this.Ron) &&
        this.Don.DeepCopy(this.Hte.ActorLocationProxy),
      !0
    );
  }
  xon(t) {
    if (!MathUtils_1.MathUtils.IsValidVector(t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 32, "当前角色坐标包含NaN", [
            "location",
            t,
          ]),
        [!1, void 0]
      );
    this._ae.DeepCopy(t),
      (this._ae.Z += this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius),
      this.uae.DeepCopy(t),
      (this.uae.Z -= this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius);
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
          return [
            e.HitResult.TimeArray.Get(t) >
              1 - MathUtils_1.MathUtils.SmallNumber,
            e.HitResult.Actors.Get(t),
          ];
      }
    }
    return [!0, void 0];
  }
  OnTick(t) {
    if (
      !(this.Pon > Time_1.Time.WorldTime) &&
      this.Active &&
      this.Valid &&
      !this.Uon &&
      this.Hte.IsRoleAndCtrlByMe &&
      !ModelManager_1.ModelManager.PlotModel.IsInPlot &&
      this.Hte.IsDefaultCapsule &&
      this.aYo.MoveState !==
        CharacterUnifiedStateTypes_1.ECharMoveState.Swing &&
      this.Entity.Id ===
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id
    ) {
      this.Pon = Time_1.Time.WorldTime + INTERNAL_TIME;
      let t = !1,
        e = void 0;
      var i;
      this.aYo.PositionState !==
      CharacterUnifiedStateTypes_1.ECharPositionState.Ground
        ? this.Ron &&
          (([t, e] = this.xon(this.Hte.ActorLocationProxy)),
          (i = this.Bon(this.Hte.ActorLocationProxy)),
          t && i
            ? (this.Aon = 0)
            : ++this.Aon >= MAX_NOT_SAFETY_COUNT &&
              ((this.Aon = 0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Movement",
                  6,
                  "Back to Safety Place 2",
                  ["From", this.Hte.ActorLocationProxy],
                  ["To", this.Don],
                  ["PlaceSafety", t],
                  ["HeightSafety", i],
                  ["HitActor", e?.GetName()],
                ),
              Vector_1.Vector.DistSquared(
                this.Hte.ActorLocationProxy,
                this.Don,
              ) > TELEPORT_THREHOLD_SQUARED
                ? TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                    this.Don.ToUeVector(),
                    void 0,
                    "RoleLocationSafetyComponent.OnTick 2",
                  ).finally(void 0)
                : this.Hte.SetActorLocation(
                    this.Don.ToUeVector(),
                    "Safety",
                    !1,
                  )))
        : (([t, e] = this.xon(this.Hte.ActorLocationProxy)),
          t
            ? ((this.Ron = !0),
              this.Don.DeepCopy(this.Hte.ActorLocationProxy),
              (this.Aon = 0))
            : this.Ron &&
              ++this.Aon >= MAX_NOT_SAFETY_COUNT &&
              ((this.Aon = 0),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Movement",
                  6,
                  "Back to Safety Place",
                  ["From", this.Hte.ActorLocationProxy],
                  ["To", this.Don],
                  ["PlaceSafety", t],
                  ["HitActor", e?.GetName()],
                ),
              Vector_1.Vector.DistSquared(
                this.Hte.ActorLocationProxy,
                this.Don,
              ) > TELEPORT_THREHOLD_SQUARED
                ? TeleportController_1.TeleportController.TeleportToPositionNoLoading(
                    this.Don.ToUeVector(),
                    void 0,
                    "RoleLocationSafetyComponent.OnTick 2",
                  ).finally(void 0)
                : this.Hte.SetActorLocation(
                    this.Don.ToUeVector(),
                    "Safety",
                    !1,
                  )));
    }
  }
  OnAfterTick(t) {
    MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)
      ? this.WVs.DeepCopy(this.Hte.ActorLocationProxy)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            6,
            "Safety: InValid Location",
            ["Character", this.Hte?.Actor.GetName()],
            ["ErrorLocation", this.Hte?.ActorLocationProxy],
          ),
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(
          this.WVs.ToUeVector(),
          void 0,
          "RoleLocationSafetyComponent.OnAfterTick",
        ).finally(void 0)),
      MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)
        ? this.QVs.DeepCopy(this.Hte.ActorRotationProxy)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Movement",
              6,
              "Safety: InValid Rotator",
              ["Character", this.Hte?.Actor.GetName()],
              ["ErrorRotator", this.Hte?.ActorRotationProxy],
            ),
          this.Hte.SetActorRotation(
            this.QVs.ToUeRotator(),
            "RoleSafetyNotValid",
            !1,
          ));
  }
  Bon(t) {
    return !(
      t.Z < HIGHT_LIMIT &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Role", 7, "玩家超过最低高度，强制拉回安全位置"),
      (this.Aon = MAX_NOT_SAFETY_COUNT),
      1)
    );
  }
};
(RoleLocationSafetyComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(85)],
  RoleLocationSafetyComponent,
)),
  (exports.RoleLocationSafetyComponent = RoleLocationSafetyComponent);
//# sourceMappingURL=RoleLocationSafetyComponent.js.map
