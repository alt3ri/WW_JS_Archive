"use strict";
let CharacterManipulateComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    let h;
    const r = arguments.length;
    let a =
      r < 3 ? e : s === null ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, i, s);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (h = t[n]) && (a = (r < 3 ? h(a) : r > 3 ? h(e, i, a) : h(e, i)) || a);
    return r > 3 && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterManipulateComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController");
const LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const SceneItemManipulableBoomerangCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableBoomerangCastState");
const SceneItemManipulableCastFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastFreeState");
const SceneItemManipulableCastToOutletState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToOutletState");
const SceneItemManipulableCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToTargetState");
const SceneItemManipulableTrackTargetCastToFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToFreeState");
const SceneItemManipulableTrackTargetCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToTargetState");
const PROFILE_KEY = "CharacterManipulateComponent_LineTarceTestWithTarget";
const CAST_PITCH_MAX = 75;
const CAST_PITCH_MIN = -45;
const TARGET_ACTOR_TAG = new UE.FName("ControlObj");
const DRAW_SPHERE_DEBUG = !1;
const MANIPULATE_SKILL_ID = 1003;
const HIT_COLLISION_NAME = new UE.FName("攻击碰撞");
const MANIPULATE_CHECK_IGNORE_TAG = new UE.FName("ManipulateCheck_Ignore");
const NORMAL_CHECK_PRESET_NAME = new UE.FName("被控物检测_Normal");
const MONSTER_PART_CHECK_PRESET_NAME = new UE.FName("被控物检测_Part");
const TEMP_HALF_HEIGHT = 80;
const MAX_CALC_WEIGTH_NUMBER_PER_FRAME = 3;
const LineTraceColor = new UE.LinearColor(1, 0, 0, 1);
let CharacterManipulateComponent =
  (CharacterManipulateComponent_1 = class CharacterManipulateComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ac = 0),
        (this.z9r = void 0),
        (this.Z9r = void 0),
        (this.e7r = void 0),
        (this.t7r = void 0),
        (this.i7r = void 0),
        (this.o7r = void 0),
        (this.r7r = void 0),
        (this.nXt = void 0),
        (this.s3o = void 0),
        (this.Xte = void 0),
        (this.AWo = []),
        (this.n7r = -0),
        (this.s7r = -0),
        (this.a7r = -0),
        (this.h7r = void 0),
        (this.l7r = !1),
        (this._7r = !1),
        (this.u7r = 0),
        (this.uoe = void 0),
        (this.c7r = void 0),
        (this.m7r = !1),
        (this.d7r = 1),
        (this.C7r = void 0),
        (this.g7r = void 0),
        (this.f7r = !1),
        (this.p7r = !1),
        (this.v7r = void 0),
        (this.M7r = -MathUtils_1.MathUtils.MaxFloat),
        (this.S7r = void 0),
        (this.E7r = void 0),
        (this.y7r = []),
        (this.I7r = Vector_1.Vector.Create(0, 0, 0)),
        (this.T7r = 2),
        (this.L7r = void 0),
        (this.zpe = (t, e) => {
          this.t7r === e.Entity && this.StopManipualte();
        }),
        (this.D7r = () => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
          MANIPULATE_SKILL_ID
            ? ((this.d7r = 1),
              ModelManager_1.ModelManager.RouletteModel
                .CurrentExploreSkillId === MANIPULATE_SKILL_ID &&
                void 0 !== this.Z9r &&
                void 0 === this.t7r &&
                this.R7r(1193763416),
              this.Xte.HasTag(40422668) && this.AddOrRemoveManipulateAirTag(!0))
            : ((this.d7r = 0.7),
              this.A7r(1193763416),
              this.AddOrRemoveManipulateAirTag(!1));
        }),
        (this.U7r = (t) => {
          t.TagName !== "None" && this.Xte?.AddTag(t?.TagId);
        }),
        (this.P7r = (t) => {
          t.TagName !== "None" && this.Xte?.RemoveTag(t?.TagId);
        }),
        (this.x7r = (e) => {
          for (let t = 0; t < e.Num(); t++) {
            const i = e.Get(t);
            i.TagName !== "None" && this.Xte?.AddTag(i?.TagId);
          }
        }),
        (this.w7r = (e) => {
          for (let t = 0; t < e.Num(); t++) {
            const i = e.Get(t);
            i.TagName !== "None" && this.Xte?.RemoveTag(i?.TagId);
          }
        }),
        (this.B7r = () => {
          this.StopManipualte();
        }),
        (this.b7r = (t) => {
          const e = this.t7r?.GetComponent(177);
          e && (t ? e.AddTag(230094484) : e.RemoveTag(230094484));
        }),
        (this.gIe = (t, e) => {
          ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId ===
            MANIPULATE_SKILL_ID && this.AddOrRemoveManipulateAirTag(e);
        }),
        (this.q7r = () => {
          this.A7r(1193763416),
            this.Xte.RemoveTag(-1178928415),
            this.Xte.RemoveTag(-1976579620);
        });
    }
    set DebugDrawSphereAndArrow(t) {
      this.l7r = t;
    }
    get DebugDrawSphereAndArrow() {
      return this.l7r;
    }
    set TraceDebug(t) {
      this._7r = t;
    }
    get TraceDebug() {
      return this._7r;
    }
    OnInit() {
      return (this.ac = 0), (this.z9r = this.Entity.GetComponent(1).Owner), !0;
    }
    OnStart() {
      return (
        (this.nXt = this.Entity.GetComponent(3)),
        (this.s3o = this.Entity.GetComponent(161)),
        (this.Z9r = void 0),
        (this.e7r = void 0),
        (this.t7r = void 0),
        (this.i7r = void 0),
        (this.o7r = void 0),
        (this.h7r = new UE.Transform()),
        (this.l7r = DRAW_SPHERE_DEBUG),
        (this.u7r = ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange),
        (this.Xte = this.Entity.GetComponent(185)),
        (this.L7r = this.Xte.ListenForTagAddOrRemove(40422668, this.gIe)),
        this.Ore(),
        !0
      );
    }
    Ore() {
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.U7r,
      ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveSubCameraTag,
          this.P7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AddExtraHoldingTags,
          this.x7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveExtraHoldingTags,
          this.w7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.D7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.B7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          this.b7r,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnChangeRole,
          this.B7r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.B7r,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.q7r,
        );
    }
    kre() {
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddSubCameraTag,
        this.U7r,
      ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveSubCameraTag,
          this.P7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AddExtraHoldingTags,
          this.x7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveExtraHoldingTags,
          this.w7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeSelectedExploreId,
          this.D7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.ChangeModeFinish,
          this.B7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnManipulateShowLandTips,
          this.b7r,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnChangeRole,
          this.B7r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.B7r,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnRevive,
          this.q7r,
        );
    }
    OnTick(t) {
      if (this.nXt.IsMoveAutonomousProxy)
        if (CharacterManipulateComponent_1.G7r)
          switch (this.ac) {
            case 0:
              this.m7r || this.$jo(!1);
              break;
            case 1:
              this.N7r(t);
              break;
            case 2:
              this.O7r(t);
              break;
            case 3:
              this.k7r(t),
                this.o7r?.IsProjectileAimMode || this.$jo(!0),
                this.F7r();
              break;
            case 4:
              this.V7r(t);
          }
        else
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(
            MANIPULATE_SKILL_ID,
          ) && (CharacterManipulateComponent_1.G7r = !0);
    }
    OnEnd() {
      return (
        this.Reset(),
        this.r7r &&
          (this.r7r.K2_DestroyComponent(this.z9r), (this.r7r = void 0)),
        this.uoe && (this.uoe.Dispose(), (this.uoe = void 0)),
        this.c7r && (this.c7r.Dispose(), (this.c7r = void 0)),
        this.L7r && (this.L7r.EndTask(), (this.L7r = void 0)),
        this.kre(),
        !0
      );
    }
    GetDrawTarget() {
      if ((this.ac === 0 || this.ac === 1) && this.Z9r?.Valid) {
        const t = this.Z9r.GetComponent(1);
        if (t) return t.Owner;
      }
    }
    SetDrawTargetEntity(t) {
      this.Z9r = t;
    }
    GetDrawTargetChantTime() {
      let t;
      return this.Z9r?.Valid && (t = this.Z9r.GetComponent(140))
        ? t.ManipulateBaseConfig.读条时间
        : 0;
    }
    GetCastTarget() {
      if (this.ac === 3 && this.Z9r?.Valid) {
        const t = this.Z9r.GetComponent(1);
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
        !!this.Z9r?.Valid &&
          !!this.e7r?.CanBeHeld &&
          !(
            this.m7r ||
            (this.e7r?.IsCanInteractType()
              ? this.e7r.IsRequestingRemoveControllerId || (this.H7r(t), 0)
              : (this.StopManipualte(), 1))
          )
      );
    }
    H7r(i) {
      const t = this.Z9r.GetComponent(0)?.GetCreatureDataId();
      const s = Protocol_1.Aki.Protocol.y1s.create();
      (s.rkn = MathUtils_1.MathUtils.NumberToLong(t)),
        (s.W9n = !0),
        (this.m7r = !0),
        Net_1.Net.Call(19086, s, (t) => {
          if (this.m7r) {
            switch (t.lkn) {
              case Protocol_1.Aki.Protocol.lkn.Sys:
                break;
              case Protocol_1.Aki.Protocol.lkn.Proto_ErrNotBeControlledPlayer:
              case Protocol_1.Aki.Protocol.lkn
                .Proto_ErrBeControlledEntityNotExist:
                return (this.m7r = !1), void this.StopManipualte();
              default:
                return (
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    t.lkn,
                    6430,
                  ),
                  (this.m7r = !1),
                  void this.StopManipualte()
                );
            }
            let e;
            this.e7r?.Valid
              ? (this.e7r.TryDisableTick("Chant"), this.j7r(i))
              : (((e = Protocol_1.Aki.Protocol.y1s.create()).rkn = s.rkn),
                (e.W9n = !1),
                Net_1.Net.Call(19086, e, (t) => {})),
              (this.m7r = !1);
          }
        });
    }
    j7r(t) {
      if (!this.m7r) return !1;
      this.Entity.GetComponent(36)?.SetForceSpeed(
        Vector_1.Vector.ZeroVectorProxy,
      );
      const e = this.Z9r?.GetComponent(182);
      if (!e) return this.W7r(), this.StopManipualte(), !1;
      let i = this.s3o.CharacterMovement.CurrentFloor;
      if (i && i.HitResult.Actor === e.Owner)
        return this.W7r(), this.StopManipualte(), !1;
      e.SetAutonomous(!0),
        (this.n7r = 0),
        this.Xte?.Valid &&
          this.e7r.ManipulateBaseConfig.读条时间 > 0 &&
          this.Xte.AddTag(135557294),
        (this.e7r.CurrentState = this.e7r.ChantState);
      i = this.Z9r.GetComponent(140);
      return (
        i?.TryRemoveTagById(793256493),
        i?.TryRemoveSpecLockTag(),
        (this.ac = 1),
        t.Callback.Broadcast(!0),
        (this.T7r = 2),
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
        !!this.Z9r?.Valid &&
          ((this.t7r = this.Z9r),
          (this.i7r = this.t7r.GetComponent(182)),
          (this.o7r = this.t7r.GetComponent(140)),
          (this.Z9r = void 0),
          (this.e7r = void 0),
          (this.s7r = 0),
          (this.o7r.CurrentState = this.o7r.DrawState),
          this.Xte?.Valid &&
            (this.Xte.RemoveTag(135557294), this.Xte.AddTag(2078326536)),
          this.A7r(1193763416),
          (this.ac = 2),
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
        this.ac !== 4)
      )
        return !1;
      if (!this.t7r.Valid) return !1;
      if (
        (this.r7r && this.r7r.ReleaseComponent(),
        this.p7r &&
          (LevelAimLineController_1.LevelAimLineController.StopEffect(),
          (this.p7r = !1)),
        (this.h7r = this.i7r.ActorTransform),
        (this.o7r.IsCanBeHeld = !1),
        this.o7r.TryEnableTick(),
        this.Z9r?.Valid && !this.o7r.IsProjectileAimMode)
      ) {
        let t = !1;
        let e = this.Z9r.GetComponent(145);
        let i = this.Z9r.GetComponent(121);
        e?.Valid
          ? i?.Valid && e.GetIsIllegal(this.t7r)
            ? (this.K7r(), (t = !0))
            : (i?.Valid &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  this.t7r,
                  EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
                  e.GetCurrentChooseIndex(),
                ),
              (i = this.o7r.CastToOutletState) instanceof
                SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState &&
                i.SetTarget(this.Z9r),
              (this.o7r.CurrentState = this.o7r.CastToOutletState))
          : ((e = this.o7r.CastToTargetState) instanceof
            SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState
              ? e.SetTarget(this.Z9r)
              : e instanceof
                  SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState &&
                e.SetTargetActorWithPart(this.Z9r.GetComponent(1), this.C7r),
            (this.o7r.CurrentState = this.o7r.CastToTargetState)),
          t ||
            ((i = this.Z9r.GetComponent(1)),
            this.h7r.SetRotation(
              new UE.Quat(
                UE.KismetMathLibrary.FindLookAtRotation(
                  this.i7r.ActorLocation,
                  i.ActorLocation,
                ),
              ),
            )),
          (this.Z9r = void 0);
      } else this.K7r();
      return (
        (this.o7r.IsProjectileAimMode = !1),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          this.h7r,
          ConfigManager_1.ConfigManager.ManipulateConfig.PushEffectPath,
          "[CharacterManipulateComponent.Cast]",
          new EffectContext_1.EffectContext(this.Entity.Id),
        ),
        this.TBo(),
        !0
      );
    }
    K7r() {
      const t = this.Q7r();
      const e = this.o7r.CastFreeState;
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
        this.o7r.IsProjectileAimMode
          ? (this.o7r.CurrentState = this.o7r.CastProjectileState)
          : (this.o7r.CurrentState = this.o7r.CastFreeState),
        this.h7r.SetRotation(new UE.Quat(t));
    }
    Q7r() {
      const t = Global_1.Global.CharacterCameraManager.GetCameraRotation();
      return (
        (t.Pitch = MathUtils_1.MathUtils.Clamp(
          t.Pitch + this.o7r.ManipulateBaseConfig.无锁状态附加仰角,
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
        !this.t7r?.Valid && !this.Z9r?.Valid)
      )
        return !1;
      this.m7r && (this.W7r(), (this.m7r = !1)),
        (this.ac !== 3 && this.ac !== 4) ||
          !this.r7r ||
          this.r7r.ReleaseComponent();
      const t = (this.t7r ?? this.Z9r)?.GetComponent(140);
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
          this.Z9r,
          !1,
        ),
        this.TBo(),
        !0
      );
    }
    Reset() {
      const t = this.t7r ?? this.Z9r;
      if (t) {
        const i = Vector_1.Vector.Create(
          t.GetComponent(182).ActorLocationProxy,
        );
        const s = Vector_1.Vector.Create(i);
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
            const h = this.uoe.HitResult.Actors.Get(t);
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
            ["Location", t.GetComponent(182).ActorLocationProxy],
            ["FloorName", e],
            ["id", this.Entity.Id],
          );
      }
      this.ac !== 0 && this.Drop(), this.TBo();
    }
    X7r() {
      let t;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 23, "[Manipulate] Hold", [
          "State",
          this.ac,
        ]),
        this.t7r?.Valid &&
          (ModelManager_1.ModelManager.ManipulaterModel.NeedShowLandTips() &&
            this.t7r?.GetComponent(177)?.AddTag(230094484),
          this.r7r ||
            ((this.r7r = this.z9r.GetComponentByClass(
              UE.PhysicsHandleComponent.StaticClass(),
            )),
            this.r7r) ||
            (this.r7r = this.z9r.AddComponentByClass(
              UE.PhysicsHandleComponent.StaticClass(),
              !1,
              new UE.Transform(),
              !1,
            )),
          (this.o7r.CurrentState = this.o7r.HoldState),
          (t = this.o7r.ManipulateBaseConfig),
          this.r7r.SetLinearStiffness(t.线性刚度),
          this.r7r.SetLinearDamping(t.线性阻尼),
          this.r7r.SetAngularStiffness(t.角刚度),
          this.r7r.SetAngularDamping(t.角度阻尼),
          this.o7r.ManipulateBaseConfig.控物保持使用物理 &&
            this.r7r.GrabComponentAtLocationWithRotation(
              this.i7r.GetPrimitiveComponent(),
              FNameUtil_1.FNameUtil.EMPTY,
              this.i7r.ActorLocation,
              this.i7r.ActorRotation,
            ),
          this.Xte?.Valid &&
            (this.Xte.RemoveTag(2078326536), this.Xte.AddTag(-624589333)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnManipulateStartChanting,
            this.o7r.ManipulateBaseConfig.读条时间,
            this.o7r.ManipulateBaseConfig.控物准星资源ID,
          ),
          this.ActiveHandFX(this.t7r),
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(
            this.t7r.Id,
            !0,
          ),
          (this.ac = 3));
    }
    Precast(t) {
      return (
        this.ac === 3 &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HideJigsawBaseHint,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
          !1,
          this.Z9r,
          !1,
        ),
        (ModelManager_1.ModelManager.ManipulaterModel.ExitHoldingStateCameraLocation =
          Vector_1.Vector.Create(
            CameraController_1.CameraController.CameraLocation,
          )),
        (this.a7r = 0),
        this.o7r.PrecastState.SetDirection(t),
        (this.o7r.CurrentState = this.o7r.PrecastState),
        (this.ac = 4),
        !0)
      );
    }
    TBo() {
      this.Xte?.Valid &&
        (this.Xte.RemoveTag(135557294),
        this.Xte.RemoveTag(2078326536),
        this.Xte.RemoveTag(-624589333),
        this.Xte.RemoveTag(-284509534)),
        this.A7r(1193763416),
        this.m7r && (this.W7r(), (this.m7r = !1), this.StopManipualte()),
        this.p7r &&
          (LevelAimLineController_1.LevelAimLineController.StopEffect(),
          (this.p7r = !1)),
        ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        (this.C7r = void 0);
      const t = this.t7r ?? this.Z9r;
      t?.GetComponent(177)?.RemoveTag(230094484),
        this.f7r &&
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(
            t.Id,
            !1,
          ),
        (this.t7r = void 0),
        (this.i7r = void 0),
        (this.o7r = void 0),
        (this.Z9r = void 0),
        (this.e7r = void 0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.HiddenManipulateUI,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnManipulateCancelChanting,
        ),
        this.DeactiveHandFx(),
        (this.ac = 0),
        (this.T7r = 2),
        (this.g7r = void 0);
    }
    $jo(t) {
      const e = this.s3o.CharacterMovement.CurrentFloor.HitResult.Actor;
      if (e)
        switch (this.T7r) {
          case 2:
            this.$7r(), this.Y7r(e, t), (this.T7r = 0);
            break;
          case 0:
            this.J7r(e, t);
            break;
          case 1:
            this.z7r(this.S7r, t), (this.T7r = 2);
        }
      else
        this.Z9r?.Valid &&
          (this.m7r && this.W7r(),
          (this.Z9r = void 0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
            void 0 !== this.Z9r,
            this.Z9r,
            t,
          )),
          this.A7r(1193763416),
          this.$7r();
    }
    $7r() {
      CameraController_1.CameraController.CameraRotator.Vector(this.I7r),
        (this.M7r = -MathUtils_1.MathUtils.MaxFloat),
        (this.S7r = void 0),
        (this.y7r = []),
        (this.g7r = void 0);
    }
    Y7r(t, e) {
      let i = this.u7r;
      e && (i = this.o7r.ManipulateBaseConfig.投掷锁定范围);
      const s =
        ModelManager_1.ModelManager.CameraModel?.FightCameraFinalDistance;
      s && (i += s),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          i,
          1,
          this.AWo,
        );
      for (const o of this.AWo) {
        const h = o.Entity;
        if (h?.Valid && !h.GetComponent(0)?.IsConcealed) {
          var r = h.GetComponent(182);
          if (!r || t !== r.Owner) {
            if (!e) if (!h.GetComponent(140)?.Valid) continue;
            var r = h.GetComponent(121);
            const a = h.GetComponent(122);
            ((r?.Valid ?? a?.Valid) ||
              h.GetComponent(182)?.GetIsSceneInteractionLoadCompleted()) &&
              this.y7r.push(h);
          }
        }
      }
      if (e) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          i,
          2,
          this.AWo,
        );
        for (const _ of this.AWo) {
          const n = _.Entity;
          !n?.Valid || n.GetComponent(0)?.IsConcealed || this.y7r.push(n);
        }
      }
    }
    J7r(t, e) {
      let i = 0;
      if (this.y7r)
        for (; i < MAX_CALC_WEIGTH_NUMBER_PER_FRAME; ) {
          if (this.y7r.length <= 0) return void (this.T7r = 1);
          var s;
          const h = this.y7r.shift();
          h?.Valid &&
            (((s = h.GetComponent(182)) && t === s.Owner) ||
              ((this.E7r = void 0),
              (s = this.Z7r(h, e, this.I7r)) > this.M7r &&
                ((this.M7r = s), (this.S7r = h), (this.C7r = this.E7r)),
              i++));
        }
    }
    z7r(t, e) {
      let i;
      this.eHr(t),
        t &&
          this.g7r &&
          (i = this.tHr(t, this.g7r.BoneName)[0]) &&
          ((i = Vector_1.Vector.Create(i.GetLocation())),
          ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
            i,
          )),
        t !== this.Z9r
          ? (this.Z9r?.Valid &&
              void 0 === this.t7r &&
              ((i = this.Z9r.GetComponent(140))?.TryRemoveTagById(793256493),
              i?.TryRemoveSpecLockTag()),
            (this.Z9r = t),
            e
              ? t
                ? (EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ManipulateStartLockCastTarget,
                    this.Z9r,
                    this.C7r,
                  ),
                  (this.g7r = this.C7r))
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.ManipulateEndLockCastTarget,
                  )
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
                  void 0 !== this.Z9r,
                  this.Z9r,
                  e,
                ),
            (i = this.Z9r?.GetComponent(1)),
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
            this.Z9r?.Valid && (this.e7r = this.Z9r.GetComponent(140)),
            this.Z9r?.Valid && void 0 === this.t7r
              ? ((t = this.Z9r.GetComponent(140))?.TryAddTagById(793256493),
                t?.TryAddSpecLockTag(),
                ModelManager_1.ModelManager.RouletteModel
                  .CurrentExploreSkillId === MANIPULATE_SKILL_ID &&
                  this.R7r(1193763416))
              : this.A7r(1193763416))
          : this.g7r !== this.C7r &&
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ManipulateStartLockCastTarget,
              this.Z9r,
              this.C7r,
            ),
            (this.g7r = this.C7r));
    }
    eHr(t) {
      t?.Valid
        ? (t !== this.Z9r &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.HideJigsawBaseHint,
            ),
          (t = t.GetComponent(145))?.Valid
            ? (t.ShowAimModel(this.t7r),
              this.A7r(1520676172),
              this.o7r?.Config?.BaseCfg?.CanRotate && this.R7r(-1070569477))
            : this.A7r(-1070569477))
        : (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.HideJigsawBaseHint,
          ),
          this.A7r(-1070569477),
          this.o7r?.Config?.BaseCfg?.CanRotate && this.R7r(1520676172));
    }
    Z7r(e, t, i) {
      const s = -MathUtils_1.MathUtils.MaxFloat;
      const h = e.GetComponent(1);
      if (!this.iHr(e, t, h)) return s;
      var r = e.GetComponent(177);
      const a = e.GetComponent(140);
      if (a?.Valid && void 0 === a?.ManipulateBaseConfig) return s;
      let n = !1;
      let o = !1;
      let _ = 1;
      if (r?.HasTag(-709838471)) return s;
      if (t) {
        if (!this.t7r?.Valid && !this.Z9r?.Valid) return s;
        var r = e.GetComponent(0);
        const l = r.GetBaseInfo();
        if (!l) return s;
        if (this.t7r.GetComponent(141)?.Valid) {
          r = r.GetAwakedEntities();
          if (
            r.length > 0 &&
            !r.includes(this.t7r.GetComponent(0).GetPbDataId())
          )
            return s;
        }
        if (this.o7r.Config.SearchTargetCfg)
          for (const v of this.o7r.Config.SearchTargetCfg.LockConditions)
            if ((0, IUtil_1.isEntitiyMatch)(v.EntitiyMatch, l.Category)) {
              (n = !0), (_ = v.Weight);
              break;
            }
        if (!n) return s;
        r = e.GetComponent(145);
        if (
          (r &&
            (n = !(
              !r?.CheckMatchManipulatable(this.o7r?.Entity) ||
              !r?.CanSetNewItem() ||
              r?.IsLockOrSlient() ||
              !r?.MultiplayerLimitTypeCheck()
            )),
          (r =
            e.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.HBs.Proto_Monster),
          n)
        )
          if (r) {
            r = e.GetComponent(58);
            let t = !1;
            if (r.Parts.length > 0)
              for (const E of r.Parts)
                if (E.Active) {
                  t = !0;
                  break;
                }
            n = t
              ? ((o = !0), !!(e = this.oHr(e, r)) && e.length > 0)
              : this.rHr(h);
          } else n = this.rHr(h);
      } else {
        (n = h.Owner?.ActorHasTag(TARGET_ACTOR_TAG) ?? !1),
          (!a?.Valid ||
            ((n = n && a.CanBeHeld),
            (r = this.nXt?.ActorLocationProxy),
            (e = h.ActorLocationProxy),
            Vector_1.Vector.Distance(r, e) >
              a.ManipulateBaseConfig.被感知范围)) &&
            (n = !1);
        (r = this.Entity.GetComponent(0).GetCreatureDataId()),
          (e = a?.GetControllerId());
        n =
          (n = void 0 === e || e === 0 || (e !== 0 && e === r) ? n : !1) &&
          this.rHr(h);
      }
      return n ? _ * this.nHr(h, i, s, o, t) : s;
    }
    sHr() {
      (this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.uoe.WorldContextObject = this.nXt.Owner),
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
    aHr() {
      (this.c7r = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.c7r.WorldContextObject = this.nXt.Owner),
        (this.c7r.bIsSingle = !1),
        (this.c7r.bIgnoreSelf = !0),
        (this.c7r.bIsProfile = !0),
        (this.c7r.ProfileName = NORMAL_CHECK_PRESET_NAME),
        (this.c7r.DrawTime = 0.5),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.c7r,
          LineTraceColor,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.c7r,
          LineTraceColor,
        );
    }
    rHr(e) {
      this.uoe || this.sHr();
      var t = Vector_1.Vector.Create();
      var t =
        (t.DeepCopy(this.nXt.ActorLocationProxy),
        t.AdditionEqual(Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT)),
        t.ToUeVector());
      let i = e.ActorLocation;
      var s = e.Entity.GetComponent(132);
      var s =
        (s?.Valid && (i = s.GetHitPoint().ToUeVector()),
        e.Entity.GetComponent(145));
      var s =
        (s?.Valid && (i = s.GetSocketLocation(this.t7r).ToUeVector()),
        e.Entity.GetComponent(124));
      var s =
        (s?.Valid && (i = s.GetHitPoint().ToUeVector()),
        e.Entity.GetComponent(140));
      s?.Valid && (i = i.op_Addition(s.ManipulateBaseConfig.被感知坐标偏移)),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, i),
        this.uoe.SetDrawDebugTrace(this._7r ? 2 : 0);
      let h = !0;
      if (
        ((this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        ) && this.uoe.HitResult.bBlockingHit)
      )
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          const r = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== r) {
            const a = this.uoe.HitResult.Components.Get(t);
            if (this.hHr(r, e)) break;
            if (this.lHr(r, a)) {
              h = !1;
              break;
            }
          }
        }
      return h && this._Hr(this.i7r, h);
    }
    _Hr(e, t) {
      var i = Vector_1.Vector.Create();
      var i =
        (i.DeepCopy(this.nXt.ActorLocationProxy),
        i.AdditionEqual(Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT)),
        i.ToUeVector());
      let s = this.z9r.GetTransform();
      const h = e?.Entity.GetComponent(140);
      if (!h?.Valid) return t;
      (t = s.TransformPositionNoScale(h.ConfigHoldOffset)),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, i),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, t),
        (this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
        (s = TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        ));
      if (s && this.uoe.HitResult.bBlockingHit)
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          const r = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== r) {
            if (this.t7r.GetComponent(143)?.IsChildrenActor(r)) break;
            const a = this.uoe.HitResult.Components.Get(t);
            if (this.hHr(r, e)) break;
            if (this.lHr(r, a)) return !1;
          }
        }
      return !0;
    }
    lHr(t, e) {
      return (
        this.i7r?.Owner !== t &&
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
    F7r() {
      this.c7r || this.aHr();
      let t = Vector_1.Vector.Create();
      let e =
        (t.DeepCopy(this.nXt.ActorLocationProxy),
        t.AdditionEqual(Vector_1.Vector.Create(0, 0, this.nXt.HalfHeight)),
        t.ToUeVector());
      const i = Vector_1.Vector.Create();
      i.DeepCopy(this.nXt.ActorForwardProxy),
        i.Normalize(),
        t.AdditionEqual(i.MultiplyEqual(20));
      (t = t.ToUeVector()),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.c7r, e),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.c7r, t),
        (this.c7r.Radius = this.nXt.HalfHeight),
        this.c7r.SetDrawDebugTrace(this._7r ? 1 : 0),
        (e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
          this.c7r,
          PROFILE_KEY,
        ));
      if (e && this.c7r.HitResult.bBlockingHit) {
        for (let t = 0; t < this.c7r.HitResult.Actors.Num(); t++) {
          let s = this.c7r.HitResult.Actors.Get(t);
          if (void 0 !== s && !this.hHr(s, this.i7r)) {
            const h = this.c7r.HitResult.Components.Get(t);
            if (this.lHr(s, h)) {
              s = Vector_1.Vector.Create();
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                this.c7r.HitResult,
                t,
                s,
              ),
                s.SubtractionEqual(this.nXt.ActorLocationProxy);
              const i = this.nXt.ActorForwardProxy;
              if (
                (s.Set(s.X, s.Y, 0),
                s.Normalize(),
                i.Set(i.X, i.Y, 0),
                i.Normalize(),
                s.CrossProduct(i, s),
                s.Z > 0)
              )
                return void (this.o7r.UsingAssistantHoldOffset = !0);
            }
          }
        }
        this.o7r.UsingAssistantHoldOffset &&
          (this.o7r.UsingAssistantHoldOffset = !1);
      } else this.o7r.UsingAssistantHoldOffset = !1;
    }
    hHr(t, e) {
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
    iHr(t, e, i) {
      return !!t.Active && !((e && t === this.t7r) || !i?.Valid);
    }
    nHr(t, e, i, s, h = !1) {
      let r = i;
      return (r = s
        ? this.uHr(t, e, i)
        : t.Entity.GetComponent(122)?.Valid
          ? this.cHr(t, e, i, h)
          : this.mHr(t, e, i, h));
    }
    mHr(t, e, i, s) {
      let h = Vector_1.Vector.Create(t.ActorLocationProxy);
      var r = t.Entity.GetComponent(145);
      var r =
        (r?.Valid && h.DeepCopy(r.GetSocketLocation(this.t7r)),
        Vector_1.Vector.Create(0, 0, 0));
      const a =
        (h.Subtraction(CameraController_1.CameraController.CameraLocation, r),
        r.Normalize(),
        e.Normalize(),
        MathUtils_1.MathUtils.DotProduct(r, e));
      var r = Vector_1.Vector.Distance(h, this.nXt.ActorLocationProxy);
      let n = -1;
      var e = t.Entity.GetComponent(140);
      const o = new Array();
      const _ = new Array();
      if (s)
        for (const m of this.o7r.Config.SearchTargetCfg.AngleWeight)
          o.push(m.Angle), _.push(m.Weight);
      else {
        const l = e.ManipulateBaseConfig.被感知角度权重;
        for (let t = 0; t < l.Num(); t++) {
          const v = l.GetKey(t);
          const E = l.Get(v);
          o.push(v), _.push(E);
        }
      }
      for (let t = 0; t < o.length; t++) {
        const c = o[t];
        if (a > Math.cos(((c * this.d7r) / 180) * Math.PI)) {
          n = _[t];
          break;
        }
      }
      return n === -1
        ? i
        : ((h = s ? this.o7r.ManipulateBaseConfig.投掷锁定范围 : this.u7r),
          n * (h - r));
    }
    uHr(t, e, i) {
      const s = t.Entity;
      var t = s.GetComponent(58);
      let h = -Number.MAX_VALUE;
      let r = -1;
      const a = this.oHr(s, t);
      for (let t = 0; t < a.length; t++) {
        var n = a[t];
        var n = this.tHr(s, n.BoneName)[0];
        const o = Vector_1.Vector.Create(n.GetLocation());
        let _ = Vector_1.Vector.Create(0, 0, 0);
        o.Subtraction(this.nXt.ActorLocationProxy, _),
          _.Normalize(),
          e.Normalize();
        Vector_1.Vector.Create(n.GetLocation()).SubtractionEqual(
          this.nXt.ActorLocationProxy,
        );
        const l = MathUtils_1.MathUtils.DotProduct(_, e);
        var n = Vector_1.Vector.Distance(o, this.nXt.ActorLocationProxy);
        if (!(n > this.u7r)) {
          let e = -1;
          const v = new Array();
          const E = new Array();
          for (const m of this.o7r.Config.SearchTargetCfg.AngleWeight)
            v.push(m.Angle), E.push(m.Weight);
          for (let t = 0; t < v.length; t++) {
            const c = v[t];
            if (l > Math.cos(((c * this.d7r) / 180) * Math.PI)) {
              e = E[t];
              break;
            }
          }
          e !== -1 && (_ = e * (this.u7r - n)) > h && ((h = _), (r = t));
        }
      }
      return r !== -1 ? ((this.E7r = a[r]), 1e4) : i;
    }
    cHr(t, e, i, s) {
      const h = t.Entity.GetComponent(122);
      let r = -MathUtils_1.MathUtils.MaxFloat;
      const a = Vector_1.Vector.Create(0, 0, 0);
      let n = [];
      let o = [];
      e.Normalize();
      let _ = -1;
      if (((n = []), (o = []), s))
        for (const f of this.o7r.Config.SearchTargetCfg.AngleWeight)
          n.push(f.Angle), o.push(f.Weight);
      else {
        const l =
          t.Entity.GetComponent(140).ManipulateBaseConfig.被感知角度权重;
        for (let t = 0; t < l.Num(); t++) {
          const v = l.GetKey(t);
          const E = l.Get(v);
          n.push(v), o.push(E);
        }
      }
      for (const u of h.GetAllActivatedBlockPos()) {
        u.Subtraction(CameraController_1.CameraController.CameraLocation, a),
          a.Normalize();
        var c;
        const m = MathUtils_1.MathUtils.DotProduct(a, e);
        for (let t = 0; t < n.length; t++) {
          const C = n[t];
          if (m > Math.cos(((C * this.d7r) / 180) * Math.PI)) {
            _ = o[t];
            break;
          }
        }
        _ !== -1 && (c = _ * m) > r && (r = c);
      }
      return r === -MathUtils_1.MathUtils.MaxFloat ? i : r;
    }
    N7r(t) {
      (this.n7r += 0.001 * t),
        this.e7r.CurrentState.Tick(0.001 * t),
        void 0 === this.e7r
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                32,
                "[Manipulate] 读条中的对象上没有Manipulatable组件",
                ["Name", this.Z9r],
              ),
            this.StopManipualte())
          : this.n7r > this.e7r.ManipulateBaseConfig.读条时间 && this.Draw();
    }
    O7r(t) {
      this.o7r?.PlayingMatchSequence ||
        ((this.s7r += 0.001 * t),
        this._Hr(this.i7r, !1)
          ? (this.o7r.CurrentState.Tick(0.001 * t),
            (t = this.o7r?.ManipulateBaseConfig.吸取时间) &&
              this.s7r >= t &&
              ((t = this.i7r.ActorLocationProxy),
              Vector_1.Vector.DistSquared(t, this.i7r.ActorLocationProxy) < 2500
                ? this.X7r()
                : (this.StopManipualte(), this.Reset())))
          : (this.StopManipualte(), this.Reset()));
    }
    k7r(e) {
      if (((this.s7r += 0.001 * e), this.r7r?.IsValid())) {
        if (
          (this.o7r.CurrentState.Tick(0.001 * e),
          this.o7r.CastFreeState instanceof
            SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState)
        )
          if (
            this.o7r.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig?.Effect
          ) {
            let t = [];
            (t = this.Z9r?.Valid
              ? ((e = this.o7r.CalcCastTargetPointWithEntity(
                  this.Z9r,
                )).Subtraction(this.i7r.ActorLocationProxy, e),
                e.Normalize(),
                this.o7r.CastFreeState.GetCastPath(e))
              : ((e = this.Q7r()),
                this.o7r.CastFreeState.GetCastPath(
                  Vector_1.Vector.Create(e.Vector()),
                ))).length > 0 &&
              (this.p7r ||
                (LevelAimLineController_1.LevelAimLineController.PlayEffect() &&
                  (this.p7r = !0)),
              LevelAimLineController_1.LevelAimLineController.UpdatePoints(
                t,
                1,
              ));
          }
        Vector_1.Vector.Distance(
          this.i7r.ActorLocationProxy,
          Vector_1.Vector.Create(this.o7r.MovementTargetLocation),
        ) < ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance
          ? this.o7r.IsHoldingUsePhysics
            ? this.r7r.SetTargetLocationAndRotation(
                this.o7r.MovementTargetLocation,
                this.o7r.MovementTargetRotation,
              )
            : this.i7r.SetActorLocationAndRotation(
                this.o7r.MovementTargetLocation,
                this.o7r.MovementTargetRotation,
                "TickHolding",
                !1,
              )
          : (this.StopManipualte(), this.Reset());
      }
    }
    V7r(t) {
      (this.a7r += t),
        this.o7r.CurrentState.Tick(0.001 * t),
        this.a7r > ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime &&
          this.Cast();
    }
    StopManipualte() {
      const t = this.Entity.GetComponent(33);
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
        this.A7r(1193763416);
    }
    GetHoldingActor() {
      return this.i7r.Owner;
    }
    GetHoldingEntity() {
      return this.t7r;
    }
    SetDataFromOldRole(t) {
      const e = t.Entity.GetComponent(55);
      e.ac === 3 &&
        ((t.Entity.GetComponent(33).SkillTarget = void 0),
        (this.Entity.GetComponent(33).SkillTarget = void 0)),
        e.Reset(),
        (this._7r = e._7r),
        this.StopManipualte(),
        this.A7r(1193763416);
    }
    R7r(t) {
      this.Xte.HasTag(t) || this.Xte.AddTag(t);
    }
    A7r(t) {
      this.Xte.HasTag(t) && this.Xte.RemoveTag(t);
    }
    ActiveHandFX(t, e = 0) {
      const i = t.GetComponent(177);
      i
        ? (i.AddTag(1408918695), (this.v7r = i), (this.f7r = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 32, "被控物目标找不到TagComp", [
            "Entity",
            t,
          ]);
    }
    DeactiveHandFx() {
      this.v7r &&
        (this.v7r.RemoveTag(1408918695), (this.v7r = void 0), (this.f7r = !1));
    }
    W7r() {
      let t;
      let e = this.Z9r ?? this.t7r;
      e?.Valid &&
        ((e = e.GetComponent(0)?.GetCreatureDataId()),
        ((t = Protocol_1.Aki.Protocol.y1s.create()).rkn =
          MathUtils_1.MathUtils.NumberToLong(e)),
        (t.W9n = !1),
        Net_1.Net.Call(19086, t, (t) => {}));
    }
    AddOrRemoveManipulateAirTag(t) {
      const e = this.ac === 3;
      let i = 0;
      (i = e ? -1976579620 : -1178928415),
        t
          ? this.Xte.HasTag(i) || this.Xte.AddTag(i)
          : (this.Xte.RemoveTag(-1976579620), this.Xte.RemoveTag(-1178928415));
    }
    tHr(t, e) {
      let i;
      let s;
      const h = t.GetComponent(3)?.Actor?.Mesh;
      let r = void 0;
      for ([i, s] of t.GetComponent(58).GroupMapByBone)
        if (s === e.toString()) {
          r = FNameUtil_1.FNameUtil.GetDynamicFName(i);
          break;
        }
      t = h.GetAllSocketNames();
      return void 0 !== r && t.FindIndex(r) !== -1
        ? [h.GetSocketTransform(r, 0), r]
        : [void 0, void 0];
    }
    oHr(t, e) {
      let i;
      let s;
      let h;
      const r = new Array();
      for (const a of e.Parts)
        a.Active &&
          (([s, i] = this.tHr(t, a.BoneName)), s) &&
          ((h = this.nXt.ActorLocationProxy),
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
            r.push(a));
      return r.length > 0 ? r : void 0;
    }
    ExtraAction() {
      let t;
      this.ac === 3 &&
        (this.t7r.Valid || this.o7r.Valid) &&
        (t = this.t7r.GetComponent(122))?.Valid &&
        (this.o7r?.TryRemoveTagById(-1354651119),
        t.RotateSelf(),
        this.o7r?.TryAddTagById(-1354651119));
    }
    GetIsCharRotateWithCameraWhenManipulate() {
      return this.ac !== 2 && this.ac !== 3
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              32,
              "[Manipulate.GetIsCharRotateWithCameraWhenManipulate] 当前不是控物中",
            ),
          !1)
        : this.o7r.ManipulateBaseConfig.角色是否随相机旋转;
    }
    ChangeToProjectileState() {
      return !(
        this.ac !== 3 ||
        this.o7r.IsProjectileAimMode ||
        !this.o7r.ManipulateBaseConfig.抛物瞄准模式开关 ||
        ((this.o7r.IsProjectileAimMode = !0),
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
        this.ac !== 3 ||
        !this.o7r.IsProjectileAimMode ||
        !this.o7r.ManipulateBaseConfig.抛物瞄准模式开关 ||
        ((this.o7r.IsProjectileAimMode = !1),
        this.Z9r?.Valid &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ManipulateStartLockCastTarget,
            this.Z9r,
            this.C7r,
          ),
        0)
      );
    }
  });
(CharacterManipulateComponent.G7r = !1),
  (CharacterManipulateComponent.SkillId = 210003),
  (CharacterManipulateComponent.CastSkillId = 210005),
  (CharacterManipulateComponent.CancelSkillId = 210006),
  (CharacterManipulateComponent.HoldingSkillId = 210007),
  (CharacterManipulateComponent = CharacterManipulateComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(55)],
      CharacterManipulateComponent,
    )),
  (exports.CharacterManipulateComponent = CharacterManipulateComponent);
// # sourceMappingURL=CharacterManipulateComponent.js.map
