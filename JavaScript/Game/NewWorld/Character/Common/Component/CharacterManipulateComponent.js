"use strict";
var CharacterManipulateComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        a = arguments.length,
        r =
          a < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (h = t[n]) &&
            (r = (a < 3 ? h(r) : 3 < a ? h(e, i, r) : h(e, i)) || r);
      return 3 < a && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterManipulateComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController"),
  LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  SceneItemManipulableBoomerangCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableBoomerangCastState"),
  SceneItemManipulableCastFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastFreeState"),
  SceneItemManipulableCastToOutletState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToOutletState"),
  SceneItemManipulableCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToTargetState"),
  SceneItemManipulableTrackTargetCastToFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToFreeState"),
  SceneItemManipulableTrackTargetCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToTargetState"),
  PROFILE_KEY = "CharacterManipulateComponent_LineTarceTestWithTarget",
  CAST_PITCH_MAX = 75,
  CAST_PITCH_MIN = -45,
  TARGET_ACTOR_TAG = new UE.FName("ControlObj"),
  DRAW_SPHERE_DEBUG = !1,
  MANIPULATE_SKILL_ID = 1003,
  HIT_COLLISION_NAME = new UE.FName("攻击碰撞"),
  MANIPULATE_CHECK_IGNORE_TAG = new UE.FName("ManipulateCheck_Ignore"),
  NORMAL_CHECK_PRESET_NAME = new UE.FName("被控物检测_Normal"),
  MONSTER_PART_CHECK_PRESET_NAME = new UE.FName("被控物检测_Part"),
  TEMP_HALF_HEIGHT = 80,
  MAX_CALC_WEIGTH_NUMBER_PER_FRAME = 3,
  MAX_WAIT_MANIPULATE_TIME = 5e3,
  LineTraceColor = new UE.LinearColor(1, 0, 0, 1);
let CharacterManipulateComponent =
  (CharacterManipulateComponent_1 = class CharacterManipulateComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ac = 0),
        (this.x9r = void 0),
        (this.w9r = void 0),
        (this.B9r = void 0),
        (this.b9r = void 0),
        (this.q9r = void 0),
        (this.G9r = void 0),
        (this.N9r = void 0),
        (this.n$t = void 0),
        (this.o4o = void 0),
        (this.Xte = void 0),
        (this.DKo = []),
        (this.O9r = -0),
        (this.k9r = -0),
        (this.F9r = -0),
        (this.V9r = void 0),
        (this.H9r = !1),
        (this.j9r = !1),
        (this.W9r = 0),
        (this.uoe = void 0),
        (this.K9r = void 0),
        (this.Q9r = !1),
        (this.X9r = 1),
        (this.$9r = void 0),
        (this.Y9r = void 0),
        (this.J9r = !1),
        (this.z9r = !1),
        (this.Z9r = void 0),
        (this.e7r = -MathUtils_1.MathUtils.MaxFloat),
        (this.t7r = void 0),
        (this.i7r = void 0),
        (this.o7r = []),
        (this.r7r = Vector_1.Vector.Create(0, 0, 0)),
        (this.n7r = 2),
        (this.s7r = void 0),
        (this.Psa = -0),
        (this.zpe = (t, e) => {
          this.b9r === e.Entity && this.StopManipualte(),
            1 === this.ac &&
              this.w9r === e.Entity &&
              this.StopWaitingToManipulate();
        }),
        (this.a7r = () => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
          MANIPULATE_SKILL_ID
            ? ((this.X9r = 1),
              ModelManager_1.ModelManager.RouletteModel
                .CurrentExploreSkillId === MANIPULATE_SKILL_ID &&
                void 0 !== this.w9r &&
                void 0 === this.b9r &&
                this.h7r(1193763416),
              this.Xte.HasTag(40422668) && this.AddOrRemoveManipulateAirTag(!0))
            : ((this.X9r = 0.7),
              this.l7r(1193763416),
              this.AddOrRemoveManipulateAirTag(!1));
        }),
        (this._7r = (t) => {
          "None" !== t.TagName && this.Xte?.AddTag(t?.TagId);
        }),
        (this.u7r = (t) => {
          "None" !== t.TagName && this.Xte?.RemoveTag(t?.TagId);
        }),
        (this.c7r = (e) => {
          for (let t = 0; t < e.Num(); t++) {
            var i = e.Get(t);
            "None" !== i.TagName && this.Xte?.AddTag(i?.TagId);
          }
        }),
        (this.m7r = (e) => {
          for (let t = 0; t < e.Num(); t++) {
            var i = e.Get(t);
            "None" !== i.TagName && this.Xte?.RemoveTag(i?.TagId);
          }
        }),
        (this.d7r = () => {
          this.StopManipualte();
        }),
        (this.C7r = (t) => {
          var e = this.b9r?.GetComponent(180);
          e && (t ? e.AddTag(230094484) : e.RemoveTag(230094484));
        }),
        (this.gIe = (t, e) => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
            MANIPULATE_SKILL_ID && this.AddOrRemoveManipulateAirTag(e);
        }),
        (this.g7r = () => {
          this.l7r(1193763416),
            this.Xte.RemoveTag(-1178928415),
            this.Xte.RemoveTag(-1976579620);
        });
    }
    set DebugDrawSphereAndArrow(t) {
      this.H9r = t;
    }
    get DebugDrawSphereAndArrow() {
      return this.H9r;
    }
    set TraceDebug(t) {
      this.j9r = t;
    }
    get TraceDebug() {
      return this.j9r;
    }
    OnInit() {
      return (this.ac = 0), (this.x9r = this.Entity.GetComponent(1).Owner), !0;
    }
    OnStart() {
      return (
        (this.n$t = this.Entity.GetComponent(3)),
        (this.o4o = this.Entity.GetComponent(163)),
        (this.w9r = void 0),
        (this.B9r = void 0),
        (this.b9r = void 0),
        (this.q9r = void 0),
        (this.G9r = void 0),
        (this.Psa = 0),
        (this.V9r = new UE.Transform()),
        (this.H9r = DRAW_SPHERE_DEBUG),
        (this.W9r = ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange),
        (this.Xte = this.Entity.GetComponent(188)),
        (this.s7r = this.Xte.ListenForTagAddOrRemove(40422668, this.gIe)),
        this.Ore(),
        !0
      );
    }
    Ore() {
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddSubCameraTag,
        this._7r,
      ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveSubCameraTag,
          this.u7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddExtraHoldingTags,
          this.c7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveExtraHoldingTags,
          this.m7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.a7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.d7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          this.C7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.d7r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.d7r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.g7r,
        );
    }
    kre() {
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddSubCameraTag,
        this._7r,
      ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveSubCameraTag,
          this.u7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddExtraHoldingTags,
          this.c7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveExtraHoldingTags,
          this.m7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.a7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.d7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          this.C7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.d7r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.d7r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.g7r,
        );
    }
    OnTick(t) {
      if (this.n$t.IsMoveAutonomousProxy)
        if (CharacterManipulateComponent_1.f7r)
          switch (this.ac) {
            case 0:
              this.Q9r || this.KWo(!1);
              break;
            case 1:
              this.Q9r || this.wsa(t);
              break;
            case 2:
              this.p7r(t);
              break;
            case 3:
              this.v7r(t);
              break;
            case 4:
              this.M7r(t),
                this.G9r?.IsProjectileAimMode || this.KWo(!0),
                this.E7r();
              break;
            case 5:
              this.S7r(t);
          }
        else
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            MANIPULATE_SKILL_ID,
          ) && (CharacterManipulateComponent_1.f7r = !0);
    }
    OnEnd() {
      return (
        this.Reset(),
        this.N9r &&
          (this.N9r.K2_DestroyComponent(this.x9r), (this.N9r = void 0)),
        this.uoe && (this.uoe.Dispose(), (this.uoe = void 0)),
        this.K9r && (this.K9r.Dispose(), (this.K9r = void 0)),
        this.s7r && (this.s7r.EndTask(), (this.s7r = void 0)),
        this.kre(),
        !0
      );
    }
    GetDrawTarget() {
      if (
        (0 === this.ac || 2 === this.ac || 1 === this.ac) &&
        this.w9r?.Valid
      ) {
        var t = this.w9r.GetComponent(1);
        if (t) return t.Owner;
      }
    }
    SetDrawTargetEntity(t) {
      this.w9r = t;
    }
    GetDrawTargetChantTime() {
      var t;
      return this.w9r?.Valid && (t = this.w9r.GetComponent(142))
        ? t.ManipulateBaseConfig.读条时间
        : 0;
    }
    GetCastTarget() {
      if (4 === this.ac && this.w9r?.Valid) {
        var t = this.w9r.GetComponent(1);
        if (t) return t.Owner;
      }
    }
    Chant(t) {
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 23, "[Manipulate] Chant", [
            "State",
            this.ac,
          ]),
        !!this.w9r?.Valid &&
          !!this.B9r?.CanBeHeld &&
          !(
            this.Q9r ||
            (this.B9r?.IsCanInteractType()
              ? this.B9r.IsRequestingRemoveControllerId || (this.y7r(t), 0)
              : (this.StopManipualte(), 1))
          )
      );
    }
    y7r(i) {
      const s = this.w9r.GetComponent(0)?.GetCreatureDataId(),
        h = Protocol_1.Aki.Protocol.fds.create();
      (h.P4n = MathUtils_1.MathUtils.NumberToLong(s)),
        (h.EWn = !0),
        (this.Q9r = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            40,
            "[CharacterManipulateComp] RequestChant",
            ["Id", this.Entity.Id],
            ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            ["P4n", s],
          ),
        Net_1.Net.Call(24371, h, (t) => {
          if (this.Q9r) {
            switch (
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Character",
                  40,
                  "[CharacterManipulateComp] RequestChant(resp)",
                  ["Id", this.Entity.Id],
                  ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
                  ["P4n", s],
                ),
              t.O4n)
            ) {
              case Protocol_1.Aki.Protocol.O4n.NRs:
                break;
              case Protocol_1.Aki.Protocol.O4n.Proto_ErrNotBeControlledPlayer:
              case Protocol_1.Aki.Protocol.O4n
                .Proto_ErrBeControlledEntityNotExist:
                return (this.Q9r = !1), void this.StopManipualte();
              default:
                return (
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    t.O4n,
                    23327,
                  ),
                  (this.Q9r = !1),
                  void this.StopManipualte()
                );
            }
            var e;
            this.B9r?.Valid
              ? (this.B9r.TryDisableTick("Chant"), this.I7r(i))
              : (((e = Protocol_1.Aki.Protocol.fds.create()).P4n = h.P4n),
                (e.EWn = !1),
                Net_1.Net.Call(24371, e, (t) => {})),
              (this.Q9r = !1);
          }
        });
    }
    I7r(t) {
      if (!this.Q9r) return !1;
      this.Entity.GetComponent(37)?.SetForceSpeed(
        Vector_1.Vector.ZeroVectorProxy,
      );
      var e = this.w9r?.GetComponent(185);
      if (!e) return this.T7r(), this.StopManipualte(), !1;
      var i = this.o4o.CharacterMovement.CurrentFloor;
      if (i && i.HitResult.Actor === e.Owner)
        return this.T7r(), this.StopManipualte(), !1;
      e.SetAutonomous(!0), (this.O9r = 0);
      i = this.w9r.GetComponent(142);
      return (
        i?.TryRemoveTagById(793256493),
        i?.TryRemoveSpecLockTag(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Character", 32, "[CharacterManipulateComp] Draw", [
            "PbDataId",
            e.CreatureData.GetPbDataId(),
          ]),
        this.Draw(),
        t.Callback.Broadcast(!0),
        (this.n7r = 2),
        !0
      );
    }
    Draw() {
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 23, "[Manipulate] Draw", [
            "State",
            this.ac,
          ]),
        !!this.w9r?.Valid &&
          ((this.b9r = this.w9r),
          (this.q9r = this.b9r.GetComponent(185)),
          (this.G9r = this.b9r.GetComponent(142)),
          (this.w9r = void 0),
          (this.B9r = void 0),
          (this.k9r = 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              32,
              "[CharacterManipulateComp] 对应控物进入Draw状态",
              ["PbDataId", this.q9r?.CreatureData.GetPbDataId()],
            ),
          (this.G9r.CurrentState = this.G9r.DrawState),
          this.Xte?.Valid &&
            (this.Xte.RemoveTag(135557294), this.Xte.AddTag(2078326536)),
          this.l7r(1193763416),
          (this.ac = 3),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnManipulateCompleteChanting,
          ),
          !0)
      );
    }
    Cast() {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 23, "[Manipulate] Cast", [
            "State",
            this.ac,
          ]),
        5 !== this.ac)
      )
        return !1;
      if (!this.b9r.Valid) return !1;
      if (
        (this.N9r && this.N9r.ReleaseComponent(),
        this.z9r &&
          (LevelAimLineController_1.LevelAimLineController.StopEffect(),
          (this.z9r = !1)),
        (this.V9r = this.q9r.ActorTransform),
        (this.G9r.IsCanBeHeld = !1),
        this.G9r.TryEnableTick(),
        this.w9r?.Valid && !this.G9r.IsProjectileAimMode)
      ) {
        let t = !1;
        var e = this.w9r.GetComponent(147),
          i = this.w9r.GetComponent(123);
        e?.Valid
          ? i?.Valid && e.GetIsIllegal(this.b9r)
            ? (this.L7r(), (t = !0))
            : (i?.Valid &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.b9r,
                  EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
                  e.GetCurrentChooseIndex(),
                  !1,
                ),
              (i = this.G9r.CastToOutletState) instanceof
                SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState &&
                i.SetTarget(this.w9r),
              (this.G9r.CurrentState = this.G9r.CastToOutletState))
          : ((e = this.G9r.CastToTargetState) instanceof
            SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState
              ? e.SetTarget(this.w9r)
              : e instanceof
                  SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState &&
                e.SetTargetActorWithPart(this.w9r.GetComponent(1), this.$9r),
            (this.G9r.CurrentState = this.G9r.CastToTargetState)),
          t ||
            ((i = this.w9r.GetComponent(1)),
            this.V9r.SetRotation(
              new UE.Quat(
                UE.KismetMathLibrary.FindLookAtRotation(
                  this.q9r.ActorLocation,
                  i.ActorLocation,
                ),
              ),
            )),
          (this.w9r = void 0);
      } else this.L7r();
      return (
        (this.G9r.IsProjectileAimMode = !1),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          this.V9r,
          ConfigManager_1.ConfigManager.ManipulateConfig.PushEffectPath,
          "[CharacterManipulateComponent.Cast]",
          new EffectContext_1.EffectContext(this.Entity.Id),
        ),
        this.Sbo(),
        !0
      );
    }
    L7r() {
      var t = this.D7r(),
        e = this.G9r.CastFreeState;
      e instanceof
      SceneItemManipulableCastFreeState_1.SceneItemManipulableCastFreeState
        ? e.SetForward(t.Vector())
        : e instanceof
            SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState
          ? e.SetVelocityDirection(Vector_1.Vector.Create(t.Vector()))
          : e instanceof
              SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState &&
            e.SetStartCameraLocation(
              ModelManager_1.ModelManager.ManipulaterModel
                .ExitHoldingStateCameraLocation,
            ),
        this.G9r.IsProjectileAimMode
          ? (this.G9r.CurrentState = this.G9r.CastProjectileState)
          : (this.G9r.CurrentState = this.G9r.CastFreeState),
        this.V9r.SetRotation(new UE.Quat(t));
    }
    D7r() {
      var t = Global_1.Global.CharacterCameraManager.GetCameraRotation();
      return (
        (t.Pitch = MathUtils_1.MathUtils.Clamp(
          t.Pitch + this.G9r.ManipulateBaseConfig.无锁状态附加仰角,
          CAST_PITCH_MIN,
          CAST_PITCH_MAX,
        )),
        t
      );
    }
    Drop() {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 23, "[Manipulate] Drop", [
            "State",
            this.ac,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HideJigsawBaseHint,
        ),
        !this.b9r?.Valid && !this.w9r?.Valid)
      )
        return !1;
      this.Q9r && (this.T7r(), (this.Q9r = !1)),
        (4 !== this.ac && 5 !== this.ac) ||
          !this.N9r ||
          this.N9r.ReleaseComponent();
      var t = (this.b9r ?? this.w9r)?.GetComponent(142);
      return (
        (t.IsCanBeHeld = !1),
        (t.IsProjectileAimMode = !1),
        t?.Valid &&
          t.CurrentState !== t.ResetState &&
          t.CurrentState !== t.MatchOutletState &&
          ((t.CurrentState = t.DropState), t?.TryEnableTick()),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          !1,
          this.w9r,
          !1,
        ),
        this.Sbo(),
        !0
      );
    }
    Reset() {
      var t = this.b9r ?? this.w9r;
      if (t) {
        var i = Vector_1.Vector.Create(t.GetComponent(185).ActorLocationProxy),
          s = Vector_1.Vector.Create(i);
        i.Set(i.X, i.Y, i.Z + 500), s.Set(s.X, s.Y, s.Z - 1e3);
        let e = void 0;
        if (
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            this.uoe,
            i,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s),
          (this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) && this.uoe.HitResult.bBlockingHit)
        )
          for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
            var h = this.uoe.HitResult.Actors.Get(t);
            if (void 0 !== h) {
              e = h.GetName();
              break;
            }
          }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            32,
            "[CharacterManipulateComp] StopManipualte",
            ["Location", t.GetComponent(185).ActorLocationProxy],
            ["FloorName", e],
            ["id", this.Entity.Id],
          );
      }
      0 !== this.ac && this.Drop(), this.Sbo();
    }
    R7r() {
      var t;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 23, "[Manipulate] Hold", [
          "State",
          this.ac,
        ]),
        this.b9r?.Valid &&
          (ModelManager_1.ModelManager.ManipulaterModel.NeedShowLandTips() &&
            this.b9r?.GetComponent(180)?.AddTag(230094484),
          this.N9r ||
            ((this.N9r = this.x9r.GetComponentByClass(
              UE.PhysicsHandleComponent.StaticClass(),
            )),
            this.N9r) ||
            (this.N9r = this.x9r.AddComponentByClass(
              UE.PhysicsHandleComponent.StaticClass(),
              !1,
              new UE.Transform(),
              !1,
            )),
          (this.G9r.CurrentState = this.G9r.HoldState),
          (t = this.G9r.ManipulateBaseConfig),
          this.N9r.SetLinearStiffness(t.线性刚度),
          this.N9r.SetLinearDamping(t.线性阻尼),
          this.N9r.SetAngularStiffness(t.角刚度),
          this.N9r.SetAngularDamping(t.角度阻尼),
          this.G9r.ManipulateBaseConfig.控物保持使用物理 &&
            this.N9r.GrabComponentAtLocationWithRotation(
              this.q9r.GetPrimitiveComponent(),
              FNameUtil_1.FNameUtil.EMPTY,
              this.q9r.ActorLocation,
              this.q9r.ActorRotation,
            ),
          this.Xte?.Valid &&
            (this.Xte.RemoveTag(2078326536), this.Xte.AddTag(-624589333)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnManipulateStartChanting,
            this.G9r.ManipulateBaseConfig.读条时间,
            this.G9r.ManipulateBaseConfig.控物准星资源ID,
          ),
          this.ActiveHandFX(this.b9r),
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(
            this.b9r.Id,
            !0,
          ),
          (this.ac = 4));
    }
    Precast(t) {
      return (
        4 === this.ac &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HideJigsawBaseHint,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          !1,
          this.w9r,
          !1,
        ),
        (ModelManager_1.ModelManager.ManipulaterModel.ExitHoldingStateCameraLocation =
          Vector_1.Vector.Create(
            CameraController_1.CameraController.CameraLocation,
          )),
        (this.F9r = 0),
        this.G9r.PrecastState.SetDirection(t),
        (this.G9r.CurrentState = this.G9r.PrecastState),
        (this.ac = 5),
        !0)
      );
    }
    Sbo() {
      this.Xte?.Valid &&
        (this.Xte.RemoveTag(135557294),
        this.Xte.RemoveTag(2078326536),
        this.Xte.RemoveTag(-624589333),
        this.Xte.RemoveTag(-284509534)),
        this.l7r(1193763416),
        this.Q9r && (this.T7r(), (this.Q9r = !1), this.StopManipualte()),
        this.z9r &&
          (LevelAimLineController_1.LevelAimLineController.StopEffect(),
          (this.z9r = !1)),
        ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        (this.$9r = void 0);
      var t = this.b9r ?? this.w9r;
      t?.GetComponent(180)?.RemoveTag(230094484),
        this.J9r &&
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(
            t.Id,
            !1,
          ),
        (this.b9r = void 0),
        (this.q9r = void 0),
        (this.G9r = void 0),
        (this.w9r = void 0),
        (this.B9r = void 0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HiddenManipulateUI,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateCancelChanting,
        ),
        this.DeactiveHandFx(),
        (this.ac = 0),
        (this.n7r = 2),
        (this.Y9r = void 0);
    }
    KWo(t) {
      var e = this.o4o.CharacterMovement.CurrentFloor.HitResult.Actor;
      if (e)
        switch (this.n7r) {
          case 2:
            this.U7r(), this.A7r(e, t), (this.n7r = 0);
            break;
          case 0:
            this.P7r(e, t);
            break;
          case 1:
            this.x7r(this.t7r, t), (this.n7r = 2);
        }
      else
        this.w9r?.Valid &&
          (this.Q9r && this.T7r(),
          (this.w9r = void 0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
            void 0 !== this.w9r,
            this.w9r,
            t,
          )),
          this.l7r(1193763416),
          this.U7r();
    }
    U7r() {
      CameraController_1.CameraController.CameraRotator.Vector(this.r7r),
        (this.e7r = -MathUtils_1.MathUtils.MaxFloat),
        (this.t7r = void 0),
        (this.o7r = []),
        (this.Y9r = void 0);
    }
    A7r(t, e) {
      let i = this.W9r;
      e && (i = this.G9r.ManipulateBaseConfig.投掷锁定范围);
      var s = ModelManager_1.ModelManager.CameraModel?.FightCameraFinalDistance;
      s && (i += s),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          i,
          1,
          this.DKo,
        );
      for (const o of this.DKo) {
        var h = o.Entity;
        if (h?.Valid && !h.GetComponent(0)?.IsConcealed) {
          var a = h.GetComponent(185);
          if (!a || t !== a.Owner) {
            if (!e) if (!h.GetComponent(142)?.Valid) continue;
            var a = h.GetComponent(123),
              r = h.GetComponent(124);
            ((a?.Valid ?? r?.Valid) ||
              h.GetComponent(185)?.GetIsSceneInteractionLoadCompleted()) &&
              this.o7r.push(h);
          }
        }
      }
      if (e) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          i,
          2,
          this.DKo,
        );
        for (const _ of this.DKo) {
          var n = _.Entity;
          !n?.Valid || n.GetComponent(0)?.IsConcealed || this.o7r.push(n);
        }
      }
    }
    P7r(t, e) {
      let i = 0;
      if (this.o7r)
        for (; i < MAX_CALC_WEIGTH_NUMBER_PER_FRAME; ) {
          if (this.o7r.length <= 0) return void (this.n7r = 1);
          var s,
            h = this.o7r.shift();
          h?.Valid &&
            (((s = h.GetComponent(185)) && t === s.Owner) ||
              ((this.i7r = void 0),
              (s = this.w7r(h, e, this.r7r)) > this.e7r &&
                ((this.e7r = s), (this.t7r = h), (this.$9r = this.i7r)),
              i++));
        }
    }
    x7r(t, e) {
      var i;
      this.B7r(t),
        t &&
          this.Y9r &&
          (i = this.b7r(t, this.Y9r.BoneName)[0]) &&
          ((i = Vector_1.Vector.Create(i.GetLocation())),
          ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
            i,
          )),
        t !== this.w9r
          ? (this.w9r?.Valid &&
              void 0 === this.b9r &&
              ((i = this.w9r.GetComponent(142))?.TryRemoveTagById(793256493),
              i?.TryRemoveSpecLockTag()),
            (this.w9r = t),
            e
              ? t
                ? (EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ManipulateStartLockCastTarget,
                    this.w9r,
                    this.$9r,
                  ),
                  (this.Y9r = this.$9r))
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ManipulateEndLockCastTarget,
                  )
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
                  void 0 !== this.w9r,
                  this.w9r,
                  e,
                ),
            (i = this.w9r?.GetComponent(1)),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Character",
                32,
                "Manipulate Switch To New Target",
                [
                  "Actor",
                  void 0 === i
                    ? void 0
                    : UE.KismetSystemLibrary.GetDisplayName(i.Owner),
                ],
              ),
            this.w9r?.Valid && (this.B9r = this.w9r.GetComponent(142)),
            this.w9r?.Valid && void 0 === this.b9r
              ? ((t = this.w9r.GetComponent(142))?.TryAddTagById(793256493),
                t?.TryAddSpecLockTag(),
                ModelManager_1.ModelManager.RouletteModel
                  .CurrentExploreSkillId === MANIPULATE_SKILL_ID &&
                  this.h7r(1193763416))
              : this.l7r(1193763416))
          : this.Y9r !== this.$9r &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ManipulateStartLockCastTarget,
              this.w9r,
              this.$9r,
            ),
            (this.Y9r = this.$9r));
    }
    B7r(t) {
      t?.Valid
        ? (t !== this.w9r &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.HideJigsawBaseHint,
            ),
          (t = t.GetComponent(147))?.Valid
            ? (t.ShowAimModel(this.b9r),
              this.l7r(1520676172),
              this.G9r?.Config?.BaseCfg?.CanRotate && this.h7r(-1070569477))
            : this.l7r(-1070569477))
        : (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.HideJigsawBaseHint,
          ),
          this.l7r(-1070569477),
          this.G9r?.Config?.BaseCfg?.CanRotate && this.h7r(1520676172));
    }
    w7r(e, t, i) {
      var s = -MathUtils_1.MathUtils.MaxFloat,
        h = e.GetComponent(1);
      if (!this.q7r(e, t, h)) return s;
      var a = e.GetComponent(180),
        r = e.GetComponent(142);
      if (r?.Valid && void 0 === r?.ManipulateBaseConfig) return s;
      let n = !1;
      let o = !1,
        _ = 1;
      if (a?.HasTag(-709838471)) return s;
      if (t) {
        if (!this.b9r?.Valid && !this.w9r?.Valid) return s;
        var a = e.GetComponent(0),
          l = a.GetBaseInfo();
        if (!l) return s;
        if (this.b9r.GetComponent(143)?.Valid) {
          a = a.GetAwakedEntities();
          if (
            0 < a.length &&
            !a.includes(this.b9r.GetComponent(0).GetPbDataId())
          )
            return s;
        }
        if (this.G9r.Config.SearchTargetCfg)
          for (const v of this.G9r.Config.SearchTargetCfg.LockConditions)
            if ((0, IUtil_1.isEntitiyMatch)(v.EntitiyMatch, l.Category)) {
              (n = !0), (_ = v.Weight);
              break;
            }
        if (!n) return s;
        a = e.GetComponent(147);
        if (
          (a &&
            (n = !(
              !a?.CheckMatchManipulatable(this.G9r?.Entity) ||
              !a?.CanSetNewItem() ||
              a?.IsLockOrSlient() ||
              !a?.MultiplayerLimitTypeCheck()
            )),
          (a =
            e.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.wks.Proto_Monster),
          n)
        )
          if (a) {
            a = e.GetComponent(60);
            let t = !1;
            if (0 < a.Parts.length)
              for (const c of a.Parts)
                if (c.Active) {
                  t = !0;
                  break;
                }
            n = t
              ? ((o = !0), !!(e = this.G7r(e, a)) && 0 < e.length)
              : this.N7r(h);
          } else n = this.N7r(h);
      } else {
        (n = h.Owner?.ActorHasTag(TARGET_ACTOR_TAG) ?? !1),
          (!r?.Valid ||
            ((n = n && r.CanBeHeld),
            (a = this.n$t?.ActorLocationProxy),
            (e = h.ActorLocationProxy),
            Vector_1.Vector.Distance(a, e) >
              r.ManipulateBaseConfig.被感知范围)) &&
            (n = !1);
        (a = this.Entity.GetComponent(0).GetCreatureDataId()),
          (e = r?.GetControllerId());
        n =
          (n = void 0 === e || 0 === e || (0 !== e && e === a) ? n : !1) &&
          this.N7r(h);
      }
      return n ? _ * this.O7r(h, i, s, o, t) : s;
    }
    k7r() {
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.WorldContextObject = this.n$t.Owner),
        (this.uoe.bIsSingle = !1),
        (this.uoe.bIgnoreSelf = !0),
        (this.uoe.bIsProfile = !0),
        (this.uoe.DrawTime = 0.5),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.uoe,
          LineTraceColor,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.uoe,
          new UE.LinearColor(0, 1, 0, 1),
        );
    }
    F7r() {
      (this.K9r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.K9r.WorldContextObject = this.n$t.Owner),
        (this.K9r.bIsSingle = !1),
        (this.K9r.bIgnoreSelf = !0),
        (this.K9r.bIsProfile = !0),
        (this.K9r.ProfileName = NORMAL_CHECK_PRESET_NAME),
        (this.K9r.DrawTime = 0.5),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.K9r,
          LineTraceColor,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.K9r,
          LineTraceColor,
        );
    }
    N7r(e) {
      this.uoe || this.k7r();
      var t = Vector_1.Vector.Create(),
        t =
          (t.DeepCopy(this.n$t.ActorLocationProxy),
          t.AdditionEqual(Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT)),
          t.ToUeVector());
      let i = e.ActorLocation;
      var s = e.Entity.GetComponent(134),
        s =
          (s?.Valid && (i = s.GetHitPoint().ToUeVector()),
          e.Entity.GetComponent(147)),
        s =
          (s?.Valid && (i = s.GetSocketLocation(this.b9r).ToUeVector()),
          e.Entity.GetComponent(126)),
        s =
          (s?.Valid && (i = s.GetHitPoint().ToUeVector()),
          e.Entity.GetComponent(142));
      s?.Valid && (i = i.op_Addition(s.ManipulateBaseConfig.被感知坐标偏移)),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, i),
        this.uoe.SetDrawDebugTrace(this.j9r ? 2 : 0);
      let h = !0;
      if (
        ((this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        ) && this.uoe.HitResult.bBlockingHit)
      )
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var a = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== a) {
            var r = this.uoe.HitResult.Components.Get(t);
            if (this.V7r(a, e)) break;
            if (this.H7r(a, r)) {
              h = !1;
              break;
            }
          }
        }
      return h && this.j7r(this.q9r, h);
    }
    j7r(e, t) {
      var i = Vector_1.Vector.Create(),
        i =
          (i.DeepCopy(this.n$t.ActorLocationProxy),
          i.AdditionEqual(Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT)),
          i.ToUeVector()),
        s = this.x9r.GetTransform(),
        h = e?.Entity.GetComponent(142);
      if (!h?.Valid) return t;
      (t = s.TransformPositionNoScale(h.ConfigHoldOffset)),
        this.uoe || this.k7r(),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, i),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, t),
        (this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
        (s = TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        ));
      if (s && this.uoe.HitResult.bBlockingHit)
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var a = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== a) {
            if (this.b9r.GetComponent(145)?.IsChildrenActor(a)) break;
            var r = this.uoe.HitResult.Components.Get(t);
            if (this.V7r(a, e)) break;
            if (this.H7r(a, r)) return !1;
          }
        }
      return !0;
    }
    H7r(t, e) {
      return (
        this.q9r?.Owner !== t &&
        !(
          !e ||
          t.ActorHasTag(MANIPULATE_CHECK_IGNORE_TAG) ||
          ((t = e.GetCollisionProfileName()),
          RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(
            t,
          )) ||
          HIT_COLLISION_NAME.op_Equality(t)
        )
      );
    }
    E7r() {
      this.K9r || this.F7r();
      var t = Vector_1.Vector.Create(),
        e =
          (t.DeepCopy(this.n$t.ActorLocationProxy),
          t.AdditionEqual(Vector_1.Vector.Create(0, 0, this.n$t.HalfHeight)),
          t.ToUeVector());
      const i = Vector_1.Vector.Create();
      i.DeepCopy(this.n$t.ActorForwardProxy),
        i.Normalize(),
        t.AdditionEqual(i.MultiplyEqual(20));
      (t = t.ToUeVector()),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.K9r, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.K9r, t),
        (this.K9r.Radius = this.n$t.HalfHeight),
        this.K9r.SetDrawDebugTrace(this.j9r ? 1 : 0),
        (e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.K9r,
          PROFILE_KEY,
        ));
      if (e && this.K9r.HitResult.bBlockingHit) {
        for (let t = 0; t < this.K9r.HitResult.Actors.Num(); t++) {
          var s = this.K9r.HitResult.Actors.Get(t);
          if (void 0 !== s && !this.V7r(s, this.q9r)) {
            var h = this.K9r.HitResult.Components.Get(t);
            if (this.H7r(s, h)) {
              s = Vector_1.Vector.Create();
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                this.K9r.HitResult,
                t,
                s,
              ),
                s.SubtractionEqual(this.n$t.ActorLocationProxy);
              const i = this.n$t.ActorForwardProxy;
              if (
                (s.Set(s.X, s.Y, 0),
                s.Normalize(),
                i.Set(i.X, i.Y, 0),
                i.Normalize(),
                s.CrossProduct(i, s),
                0 < s.Z)
              )
                return void (this.G9r.UsingAssistantHoldOffset = !0);
            }
          }
        }
        this.G9r.UsingAssistantHoldOffset &&
          (this.G9r.UsingAssistantHoldOffset = !1);
      } else this.G9r.UsingAssistantHoldOffset = !1;
    }
    V7r(t, e) {
      let i = void 0;
      return (
        (i = (
          UE.KuroStaticLibrary.IsImplementInterface(
            t.GetClass(),
            UE.BPI_CreatureInterface_C.StaticClass(),
          )
            ? ActorUtils_1.ActorUtils
            : ModelManager_1.ModelManager.SceneInteractionModel
        ).GetEntityByActor(t))?.Id === e?.Entity.Id
      );
    }
    q7r(t, e, i) {
      return !!t.Active && !((e && t === this.b9r) || !i?.Valid);
    }
    O7r(t, e, i, s, h = !1) {
      let a = i;
      return (a = s
        ? this.W7r(t, e, i)
        : t.Entity.GetComponent(124)?.Valid
          ? this.K7r(t, e, i, h)
          : this.Q7r(t, e, i, h));
    }
    Q7r(t, e, i, s) {
      var h = Vector_1.Vector.Create(t.ActorLocationProxy),
        a = t.Entity.GetComponent(147),
        a =
          (a?.Valid && h.DeepCopy(a.GetSocketLocation(this.b9r)),
          Vector_1.Vector.Create(0, 0, 0)),
        r =
          (h.Subtraction(CameraController_1.CameraController.CameraLocation, a),
          a.Normalize(),
          e.Normalize(),
          MathUtils_1.MathUtils.DotProduct(a, e)),
        a = Vector_1.Vector.Distance(h, this.n$t.ActorLocationProxy);
      let n = -1;
      var e = t.Entity.GetComponent(142),
        o = new Array(),
        _ = new Array();
      if (s)
        for (const E of this.G9r.Config.SearchTargetCfg.AngleWeight)
          o.push(E.Angle), _.push(E.Weight);
      else {
        var l = e.ManipulateBaseConfig.被感知角度权重;
        for (let t = 0; t < l.Num(); t++) {
          var v = l.GetKey(t),
            c = l.Get(v);
          o.push(v), _.push(c);
        }
      }
      for (let t = 0; t < o.length; t++) {
        var C = o[t];
        if (r > Math.cos(((C * this.X9r) / 180) * Math.PI)) {
          n = _[t];
          break;
        }
      }
      return -1 === n
        ? i
        : ((h = s ? this.G9r.ManipulateBaseConfig.投掷锁定范围 : this.W9r),
          n * (h - a));
    }
    W7r(t, e, i) {
      var s = t.Entity,
        t = s.GetComponent(60);
      let h = -Number.MAX_VALUE,
        a = -1;
      var r = this.G7r(s, t);
      for (let t = 0; t < r.length; t++) {
        var n = r[t],
          n = this.b7r(s, n.BoneName)[0],
          o = Vector_1.Vector.Create(n.GetLocation()),
          _ = Vector_1.Vector.Create(0, 0, 0);
        o.Subtraction(this.n$t.ActorLocationProxy, _),
          _.Normalize(),
          e.Normalize();
        Vector_1.Vector.Create(n.GetLocation()).SubtractionEqual(
          this.n$t.ActorLocationProxy,
        );
        var l = MathUtils_1.MathUtils.DotProduct(_, e),
          n = Vector_1.Vector.Distance(o, this.n$t.ActorLocationProxy);
        if (!(n > this.W9r)) {
          let e = -1;
          var v = new Array(),
            c = new Array();
          for (const E of this.G9r.Config.SearchTargetCfg.AngleWeight)
            v.push(E.Angle), c.push(E.Weight);
          for (let t = 0; t < v.length; t++) {
            var C = v[t];
            if (l > Math.cos(((C * this.X9r) / 180) * Math.PI)) {
              e = c[t];
              break;
            }
          }
          -1 !== e && (_ = e * (this.W9r - n)) > h && ((h = _), (a = t));
        }
      }
      return -1 !== a ? ((this.i7r = r[a]), 1e4) : i;
    }
    K7r(t, e, i, s) {
      var h = t.Entity.GetComponent(124);
      let a = -MathUtils_1.MathUtils.MaxFloat;
      var r = Vector_1.Vector.Create(0, 0, 0),
        n = [],
        o = [];
      e.Normalize();
      let _ = -1;
      if (((n = []), (o = []), s))
        for (const f of this.G9r.Config.SearchTargetCfg.AngleWeight)
          n.push(f.Angle), o.push(f.Weight);
      else {
        var l = t.Entity.GetComponent(142).ManipulateBaseConfig.被感知角度权重;
        for (let t = 0; t < l.Num(); t++) {
          var v = l.GetKey(t),
            c = l.Get(v);
          n.push(v), o.push(c);
        }
      }
      for (const u of h.GetAllActivatedBlockPos()) {
        u.Subtraction(CameraController_1.CameraController.CameraLocation, r),
          r.Normalize();
        var C,
          E = MathUtils_1.MathUtils.DotProduct(r, e);
        for (let t = 0; t < n.length; t++) {
          var m = n[t];
          if (E > Math.cos(((m * this.X9r) / 180) * Math.PI)) {
            _ = o[t];
            break;
          }
        }
        -1 !== _ && (C = _ * E) > a && (a = C);
      }
      return a === -MathUtils_1.MathUtils.MaxFloat ? i : a;
    }
    wsa(t) {
      (!this.w9r?.Valid ||
        ((this.Psa += t), this.Psa > MAX_WAIT_MANIPULATE_TIME) ||
        (this.w9r.GetComponent(119)?.IsInteractState && !this.Bsa())) &&
        this.StopWaitingToManipulate();
    }
    p7r(t) {
      (this.O9r += 0.001 * t),
        this.B9r.CurrentState.Tick(0.001 * t),
        void 0 === this.B9r
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                32,
                "[Manipulate] 读条中的对象上没有Manipulatable组件",
                ["Name", this.w9r],
              ),
            this.StopManipualte())
          : this.O9r > this.B9r.ManipulateBaseConfig.读条时间 && this.Draw();
    }
    v7r(t) {
      this.G9r?.PlayingMatchSequence ||
        ((this.k9r += 0.001 * t),
        this.j7r(this.q9r, !1)
          ? (this.G9r.CurrentState.Tick(0.001 * t),
            (t = this.G9r?.ManipulateBaseConfig.吸取时间) &&
              this.k9r >= t &&
              ((t = this.q9r.ActorLocationProxy),
              Vector_1.Vector.DistSquared(t, this.q9r.ActorLocationProxy) < 2500
                ? this.R7r()
                : (this.StopManipualte(), this.Reset())))
          : (this.StopManipualte(), this.Reset()));
    }
    M7r(e) {
      if (((this.k9r += 0.001 * e), this.N9r?.IsValid())) {
        if (
          (this.G9r.CurrentState.Tick(0.001 * e),
          this.G9r.CastFreeState instanceof
            SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState)
        )
          if (
            this.G9r.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig?.Effect
          ) {
            let t = [];
            0 <
              (t = this.w9r?.Valid
                ? ((e = this.G9r.CalcCastTargetPointWithEntity(
                    this.w9r,
                  )).Subtraction(this.q9r.ActorLocationProxy, e),
                  e.Normalize(),
                  this.G9r.CastFreeState.GetCastPath(e))
                : ((e = this.D7r()),
                  this.G9r.CastFreeState.GetCastPath(
                    Vector_1.Vector.Create(e.Vector()),
                  ))).length &&
              (this.z9r ||
                (LevelAimLineController_1.LevelAimLineController.PlayEffect() &&
                  (this.z9r = !0)),
              LevelAimLineController_1.LevelAimLineController.UpdatePoints(
                t,
                1,
              ));
          }
        Vector_1.Vector.Distance(
          this.q9r.ActorLocationProxy,
          Vector_1.Vector.Create(this.G9r.MovementTargetLocation),
        ) < ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance
          ? this.G9r.IsHoldingUsePhysics
            ? this.N9r.SetTargetLocationAndRotation(
                this.G9r.MovementTargetLocation,
                this.G9r.MovementTargetRotation,
              )
            : this.q9r.SetActorLocationAndRotation(
                this.G9r.MovementTargetLocation,
                this.G9r.MovementTargetRotation,
                "TickHolding",
                !1,
              )
          : (this.StopManipualte(), this.Reset());
      }
    }
    S7r(t) {
      (this.F9r += t),
        this.G9r.CurrentState.Tick(0.001 * t),
        this.F9r > ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime &&
          this.Cast();
    }
    StopManipualte() {
      var t = this.Entity.GetComponent(33);
      t.EndSkill(CharacterManipulateComponent_1.SkillId, "StopManipualte"),
        t.EndSkill(
          CharacterManipulateComponent_1.HoldingSkillId,
          "StopManipualte",
        ),
        t.EndSkill(
          CharacterManipulateComponent_1.CastSkillId,
          "StopManipualte",
        ),
        t.EndSkill(
          CharacterManipulateComponent_1.CancelSkillId,
          "StopManipualte",
        ),
        this.l7r(1193763416),
        1 === this.ac && this.StopWaitingToManipulate(),
        (this.w9r = void 0);
    }
    GetHoldingActor() {
      return this.q9r.Owner;
    }
    GetHoldingEntity() {
      return this.b9r;
    }
    SetDataFromOldRole(t) {
      var e = t.Entity.GetComponent(56);
      4 === e.ac &&
        ((t.Entity.GetComponent(33).SkillTarget = void 0),
        (this.Entity.GetComponent(33).SkillTarget = void 0)),
        e.Reset(),
        (this.j9r = e.j9r),
        this.StopManipualte(),
        this.l7r(1193763416);
    }
    h7r(t) {
      this.Xte.HasTag(t) || this.Xte.AddTag(t);
    }
    l7r(t) {
      this.Xte.HasTag(t) && this.Xte.RemoveTag(t);
    }
    ActiveHandFX(t, e = 0) {
      var i = t.GetComponent(180);
      i
        ? (i.AddTag(1408918695), (this.Z9r = i), (this.J9r = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 32, "被控物目标找不到TagComp", [
            "Entity",
            t,
          ]);
    }
    DeactiveHandFx() {
      this.Z9r &&
        (this.Z9r.RemoveTag(1408918695), (this.Z9r = void 0), (this.J9r = !1));
    }
    T7r() {
      var t,
        e = this.w9r ?? this.b9r;
      e?.Valid &&
        ((e = e.GetComponent(0)?.GetCreatureDataId()),
        ((t = Protocol_1.Aki.Protocol.fds.create()).P4n =
          MathUtils_1.MathUtils.NumberToLong(e)),
        (t.EWn = !1),
        Net_1.Net.Call(24371, t, (t) => {}));
    }
    AddOrRemoveManipulateAirTag(t) {
      var e = 4 === this.ac;
      let i = 0;
      (i = e ? -1976579620 : -1178928415),
        t
          ? this.Xte.HasTag(i) || this.Xte.AddTag(i)
          : (this.Xte.RemoveTag(-1976579620), this.Xte.RemoveTag(-1178928415));
    }
    b7r(t, e) {
      var i,
        s,
        h = t.GetComponent(3)?.Actor?.Mesh;
      let a = void 0;
      for ([i, s] of t.GetComponent(60).GroupMapByBone)
        if (s === e.toString()) {
          a = FNameUtil_1.FNameUtil.GetDynamicFName(i);
          break;
        }
      t = h.GetAllSocketNames();
      return void 0 !== a && -1 !== t.FindIndex(a)
        ? [h.GetSocketTransform(a, 0), a]
        : [void 0, void 0];
    }
    G7r(t, e) {
      var i,
        s,
        h,
        a = new Array();
      for (const r of e.Parts)
        r.Active &&
          (([s, i] = this.b7r(t, r.BoneName)), s) &&
          ((h = this.n$t.ActorLocationProxy),
          (s = Vector_1.Vector.Create(s.GetLocation())),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, h),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s),
          (this.uoe.ProfileName = MONSTER_PART_CHECK_PRESET_NAME),
          (TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) &&
            this.uoe.HitResult.bBlockingHit &&
            ((h =
              !this.uoe.HitResult.Components.Get(
                0,
              ).AttachSocketName.op_Equality(i)),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Temp",
                32,
                "realBoneName",
                ["realBoneName", i.toString()],
                ["beBlock", h],
              ),
            h)) ||
            a.push(r));
      return 0 < a.length ? a : void 0;
    }
    ExtraAction() {
      var t;
      4 === this.ac &&
        (this.b9r.Valid || this.G9r.Valid) &&
        (t = this.b9r.GetComponent(124))?.Valid &&
        (this.G9r?.TryRemoveTagById(-1354651119),
        t.RotateSelf(),
        this.G9r?.TryAddTagById(-1354651119));
    }
    GetIsCharRotateWithCameraWhenManipulate() {
      return 3 !== this.ac && 4 !== this.ac
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              32,
              "[Manipulate.GetIsCharRotateWithCameraWhenManipulate] 当前不是控物中",
            ),
          !1)
        : this.G9r.ManipulateBaseConfig.角色是否随相机旋转;
    }
    ChangeToProjectileState() {
      return !(
        4 !== this.ac ||
        this.G9r.IsProjectileAimMode ||
        !this.G9r.ManipulateBaseConfig.抛物瞄准模式开关 ||
        ((this.G9r.IsProjectileAimMode = !0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ManipulateEndLockCastTarget,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          !1,
          void 0,
          !0,
        ),
        0)
      );
    }
    ChangeToNormalState() {
      return !(
        4 !== this.ac ||
        !this.G9r.IsProjectileAimMode ||
        !this.G9r.ManipulateBaseConfig.抛物瞄准模式开关 ||
        ((this.G9r.IsProjectileAimMode = !1),
        this.w9r?.Valid &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ManipulateStartLockCastTarget,
            this.w9r,
            this.$9r,
          ),
        0)
      );
    }
    Bsa() {
      var t;
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            40,
            "[CharacterManipulateComp] ManipulateSelectedTarget",
            ["Id", this.Entity.Id],
            ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            ["TargetId", this.w9r?.Id],
          ),
        !(
          !this.w9r ||
          !this.B9r ||
          !(t = this.Entity.GetComponent(33)).Valid
        ) &&
          t.BeginSkill(CharacterManipulateComponent_1.SkillId, {
            Context: "ManipulateSpecificTarget",
          })
      );
    }
    TryManipulateSpecificItem(t) {
      var e,
        i,
        s = t.GetComponent(142);
      return !(
        !s ||
        !this.n$t.IsMoveAutonomousProxy ||
        !CharacterManipulateComponent_1.f7r ||
        0 !== this.ac ||
        this.Q9r ||
        ((e = this.Entity.GetComponent(33)),
        (i = t.GetComponent(119)),
        !e.Valid) ||
        !i?.Valid ||
        ((this.w9r = t),
        (this.B9r = s),
        (this.Psa = 0),
        (this.ac = 1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            40,
            "[CharacterManipulateComp] TryManipulateSpecificItem",
            ["Id", this.Entity.Id],
            ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            ["TargetId", this.w9r?.Id],
          ),
        0)
      );
    }
    StopWaitingToManipulate() {
      (this.w9r = void 0), (this.Psa = 0), this.Sbo();
    }
  });
(CharacterManipulateComponent.f7r = !1),
  (CharacterManipulateComponent.SkillId = 210003),
  (CharacterManipulateComponent.CastSkillId = 210005),
  (CharacterManipulateComponent.CancelSkillId = 210006),
  (CharacterManipulateComponent.HoldingSkillId = 210007),
  (CharacterManipulateComponent = CharacterManipulateComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(56)],
      CharacterManipulateComponent,
    )),
  (exports.CharacterManipulateComponent = CharacterManipulateComponent);
//# sourceMappingURL=CharacterManipulateComponent.js.map
