"use strict";
var CharacterManipulateComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var a,
        h = arguments.length,
        r =
          h < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (a = t[n]) &&
            (r = (h < 3 ? a(r) : 3 < h ? a(e, i, r) : a(e, i)) || r);
      return 3 < h && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterManipulateComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Quat_1 = require("../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
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
  InputController_1 = require("../../../../Input/InputController"),
  LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController"),
  LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../../Render/Config/RenderConfig"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  PortalUtils_1 = require("../../../../Utils/PortalUtils"),
  SceneItemManipulableBoomerangCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableBoomerangCastState"),
  SceneItemManipulableCastFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastFreeState"),
  SceneItemManipulableCastToOutletState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToOutletState"),
  SceneItemManipulableCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToTargetState"),
  SceneItemManipulableLevitateCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableLevitateCastState"),
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
class FindedEntityWithPortalParam {
  constructor(t, e, i, s, a) {
    (this.PortalPairId = void 0),
      (this.Entity = t),
      (this.PortalType = e),
      (this.Dist = i),
      (this.Dot = s),
      (this.PortalPairId = a);
  }
}
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
        (this.Fdl = void 0),
        (this.SGl = void 0),
        (this.e7r = -MathUtils_1.MathUtils.MaxFloat),
        (this.t7r = void 0),
        (this.i7r = void 0),
        (this.o7r = []),
        (this.r7r = Vector_1.Vector.Create(0, 0, 0)),
        (this.XWs = Vector_1.Vector.Create(0, 0, 0)),
        (this.YWs = Vector_1.Vector.Create(0, 0, 0)),
        (this.QWs = Vector_1.Vector.Create()),
        (this.n7r = 2),
        (this.Bhh = void 0),
        (this.s7r = void 0),
        (this.Ela = -0),
        (this.zpe = (t, e) => {
          this.b9r === e.Entity && this.StopManipulate(),
            1 === this.ac &&
              this.w9r === e.Entity &&
              (this.StopWaitingToManipulate(), this.Reset());
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
          this.StopManipulate();
        }),
        (this.NH_ = (t) => {
          this.N9r?.SetComponentTickEnabled(!t);
        }),
        (this.C7r = (t) => {
          var e = this.b9r?.GetComponent(194);
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
        (this.o4o = this.Entity.GetComponent(176)),
        (this.w9r = void 0),
        (this.B9r = void 0),
        (this.b9r = void 0),
        (this.q9r = void 0),
        (this.G9r = void 0),
        (this.Ela = 0),
        (this.V9r = new UE.TransformDouble()),
        (this.H9r = DRAW_SPHERE_DEBUG),
        (this.W9r = ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange),
        (this.Xte = this.Entity.GetComponent(203)),
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
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnWorldOriginInUiMode,
          this.NH_,
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
    yol() {
      var t;
      this.Bhh && this.Eol(),
        (this.Bhh = InputController_1.InputController.CreateInputLayer(4)),
        this.Bhh &&
          (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
            this.Entity,
          )) &&
          (this.Bhh.Init(t),
          InputController_1.InputController.AddInputLayer(
            this.Entity.Id,
            this.Bhh,
          ));
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
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnWorldOriginInUiMode,
          this.NH_,
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
    Eol() {
      this.Bhh &&
        (InputController_1.InputController.RemoveInputLayer(this.Bhh),
        this.Bhh.Clear(),
        (this.Bhh = void 0));
    }
    OnTick(t) {
      if (
        this.n$t.IsMoveAutonomousProxy &&
        !ControllerHolder_1.ControllerHolder.WorldController.GetIsWorldOriginInUiMode()
      )
        if (CharacterManipulateComponent_1.f7r)
          switch (this.ac) {
            case 0:
              this.Q9r || this.KWo(!1);
              break;
            case 1:
              this.Q9r || this.yla(t);
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
      return this.w9r?.Valid && (t = this.w9r.GetComponent(154))
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
          Log_1.Log.Debug("Character", 22, "[Manipulate] Chant", [
            "State",
            this.ac,
          ]),
        !!this.w9r?.Valid &&
          !!this.B9r?.CanBeHeld &&
          !(
            this.Q9r ||
            (this.B9r?.IsCanInteractType()
              ? this.B9r.IsRequestingRemoveControllerId || (this.y7r(t), 0)
              : (this.StopManipulate(), 1))
          )
      );
    }
    y7r(i) {
      const s = this.w9r.GetComponent(0)?.GetCreatureDataId(),
        a = Protocol_1.Aki.Protocol.Tds.create();
      (a.F4n = MathUtils_1.MathUtils.NumberToLong(s)),
        (a.xWn = !0),
        (this.Q9r = !0),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            39,
            "[CharacterManipulateComp] RequestChant(req)",
            ["Id", this.Entity.Id],
            ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            ["F4n", s],
          ),
        Net_1.Net.Call(16418, a, (t) => {
          if (
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Character",
                39,
                "[CharacterManipulateComp] RequestChant(resp)",
                ["Id", this.Entity.Id],
                ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
                ["F4n", s],
              ),
            this.Q9r)
          ) {
            switch (t.Q4n) {
              case Protocol_1.Aki.Protocol.Q4n.KRs:
                break;
              case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotBeControlledPlayer:
              case Protocol_1.Aki.Protocol.Q4n
                .Proto_ErrBeControlledEntityNotExist:
                return (this.Q9r = !1), void this.StopManipulate();
              default:
                return (
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    t.Q4n,
                    19926,
                  ),
                  (this.Q9r = !1),
                  void this.StopManipulate()
                );
            }
            var e;
            this.B9r?.Valid
              ? (this.B9r.TryDisableTick("Chant"), this.I7r(i))
              : (((e = Protocol_1.Aki.Protocol.Tds.create()).F4n = a.F4n),
                (e.xWn = !1),
                Net_1.Net.Call(16418, e, (t) => {})),
              (this.Q9r = !1);
          }
        });
    }
    I7r(t) {
      if (!this.Q9r) return !1;
      this.Entity.GetComponent(44)?.SetForceSpeed(
        Vector_1.Vector.ZeroVectorProxy,
      );
      var e = this.w9r?.GetComponent(200);
      if (!e) return this.T7r(), this.StopManipulate(), !1;
      var i = this.o4o.CharacterMovement.CurrentFloor;
      if (i && i.HitResult.Actor === e.Owner)
        return this.T7r(), this.StopManipulate(), !1;
      e.SetAutonomous(!0), (this.O9r = 0);
      i = this.w9r.GetComponent(154);
      return (
        i?.TryRemoveTagById(793256493),
        i?.TryRemoveSpecLockTag(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Character", 31, "[CharacterManipulateComp] Draw", [
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
          Log_1.Log.Debug("Character", 22, "[Manipulate] Draw", [
            "State",
            this.ac,
          ]),
        !!this.w9r?.Valid &&
          ((this.b9r = this.w9r),
          (this.q9r = this.b9r.GetComponent(200)),
          (this.G9r = this.b9r.GetComponent(154)),
          (this.w9r = void 0),
          (this.B9r = void 0),
          (this.k9r = 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              31,
              "[CharacterManipulateComp] 对应控物进入Draw状态",
              ["PbDataId", this.q9r?.CreatureData.GetPbDataId()],
            ),
          this.G9r?.SetState(3, "CharacterManipulateComponent.Draw"),
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
          Log_1.Log.Debug("Character", 22, "[Manipulate] Cast", [
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
        this.G9r.CastFreeState instanceof
          SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState &&
          this.q9r.GetInteractionMainActor().RemoveActorProjection(),
        this.w9r?.Valid && !this.G9r.IsProjectileAimMode)
      ) {
        let t = !1;
        var e = this.w9r.GetComponent(159),
          i = this.w9r.GetComponent(135);
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
              this.G9r?.SetState(
                7,
                "CharacterManipulateComponent cast to outlet",
              ))
          : ((e = this.G9r.CastToTargetState) instanceof
            SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState
              ? e.SetTarget(this.w9r)
              : e instanceof
                  SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState &&
                e.SetTargetActorWithPart(this.w9r.GetComponent(1), this.$9r),
            this.G9r?.SetState(
              6,
              "CharacterManipulateComponent cast to target",
            )),
          t ||
            ((i = this.w9r.GetComponent(1)),
            this.V9r.SetRotation(
              new UE.Quat(
                UE.KismetMathLibrary.D_FindLookAtRotation(
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
              SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState ||
            e instanceof
              SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState
          ? e.SetVelocityDirection(Vector_1.Vector.Create(t.VectorDouble()))
          : e instanceof
              SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState &&
            e.SetStartCameraLocation(
              ModelManager_1.ModelManager.ManipulaterModel
                .ExitHoldingStateCameraLocation,
            ),
        this.G9r.IsProjectileAimMode
          ? this.G9r?.SetState(8, "CharacterManipulateComponent cast with aim")
          : this.G9r?.SetState(9, "CharacterManipulateComponent cast free"),
        this.V9r.SetRotation(new UE.Quat(t));
    }
    D7r() {
      var t, e, i, s;
      let a = Global_1.Global.CharacterCameraManager.GetCameraRotation();
      return (
        this.G9r.ActorComp.ActorInitNotStandardGravity
          ? ((t = Rotator_1.Rotator.Create(a)),
            (e = this.G9r.ActorComp.ActorInitGravityRotationProxy.Quaternion()),
            (i = Quat_1.Quat.Create()),
            e.Inverse(i),
            (s = Rotator_1.Rotator.Create()),
            MathUtils_1.MathUtils.ComposeRotator(t, i.Rotator(), s),
            (s.Pitch = MathUtils_1.MathUtils.Clamp(
              s.Pitch + this.G9r.ManipulateBaseConfig.无锁状态附加仰角,
              CAST_PITCH_MIN,
              CAST_PITCH_MAX,
            )),
            MathUtils_1.MathUtils.ComposeRotator(s, e.Rotator(), t),
            (a = t.ToUeRotator()))
          : (a.Pitch = MathUtils_1.MathUtils.Clamp(
              a.Pitch + this.G9r.ManipulateBaseConfig.无锁状态附加仰角,
              CAST_PITCH_MIN,
              CAST_PITCH_MAX,
            )),
        a
      );
    }
    Drop() {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 22, "[Manipulate] Drop", [
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
      var t,
        e = (this.b9r ?? this.w9r)?.GetComponent(154);
      return (
        e?.Valid &&
          ((e.IsCanBeHeld = !1),
          (e.IsProjectileAimMode = !1),
          e.CastFreeState instanceof
            SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState &&
            e.ActorComp.GetInteractionMainActor().RemoveActorProjection(),
          (1 !== (t = e.GetState()) && 10 !== t) ||
            (1 === t && 1 === this.ac)) &&
          (e.SetState(11, "CharacterManipulateComponent drop"),
          e?.TryEnableTick()),
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
        var i = Vector_1.Vector.Create(t.GetComponent(200).ActorLocationProxy),
          s = Vector_1.Vector.Create(i);
        i.Set(i.X, i.Y, i.Z + 500), s.Set(s.X, s.Y, s.Z - 1e3);
        let e = void 0;
        if (
          (this.uoe || this.k7r(),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, i),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s),
          (this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) && this.uoe.HitResult.bBlockingHit)
        )
          for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
            var a = this.uoe.HitResult.Actors.Get(t);
            if (void 0 !== a) {
              e = a.GetName();
              break;
            }
          }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            31,
            "[CharacterManipulateComp] StopManipualte",
            ["Location", t.GetComponent(200).ActorLocationProxy],
            ["FloorName", e],
            ["id", this.Entity.Id],
          );
      }
      0 !== this.ac && this.Drop(), this.Sbo();
    }
    R7r() {
      var t;
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 22, "[Manipulate] Hold", [
          "State",
          this.ac,
        ]),
        this.b9r?.Valid &&
          (ModelManager_1.ModelManager.ManipulaterModel.NeedShowLandTips() &&
            this.b9r?.GetComponent(194)?.AddTag(230094484),
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
          this.G9r?.SetState(4, "CharacterManipulateComponent hold"),
          (t = this.G9r.ManipulateBaseConfig),
          this.N9r.SetLinearStiffness(t.线性刚度),
          this.N9r.SetLinearDamping(t.线性阻尼),
          this.N9r.SetAngularStiffness(t.角刚度),
          this.N9r.SetAngularDamping(t.角度阻尼),
          this.G9r.ManipulateBaseConfig.控物保持使用物理 &&
            ((t = UE.KismetMathLibrary.WD_WorldToLocal(
              GlobalData_1.GlobalData.World,
              this.q9r.ActorLocation,
            )),
            this.N9r.GrabComponentAtLocationWithRotation(
              this.q9r.GetPrimitiveComponent(),
              FNameUtil_1.FNameUtil.EMPTY,
              t,
              this.q9r.ActorRotation,
            )),
          this.Xte?.Valid &&
            (this.Xte.RemoveTag(2078326536),
            this.Xte.AddTag(-624589333),
            this.G9r?.CannotCastWithoutTarget) &&
            this.Xte.AddTag(-972568039),
          this.yol(),
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
        this.G9r?.SetState(5, "CharacterManipulateComponent precast"),
        (this.ac = 5),
        !0)
      );
    }
    Sbo() {
      this.Xte?.Valid &&
        (this.Xte.RemoveTag(135557294),
        this.Xte.RemoveTag(2078326536),
        this.Xte.RemoveTag(-624589333),
        this.Xte.RemoveTag(-284509534),
        this.Xte.RemoveTag(-972568039)),
        this.l7r(1193763416),
        this.Eol(),
        this.Q9r && (this.T7r(), (this.Q9r = !1), this.StopManipulate()),
        this.z9r &&
          (LevelAimLineController_1.LevelAimLineController.StopEffect(),
          (this.z9r = !1)),
        this.Fdl &&
          (EffectSystem_1.EffectSystem.StopEffectById(
            this.Fdl,
            "[CharacterManipulateComponent.AfterFindTarget]",
            !1,
          ),
          (this.Fdl = void 0)),
        this.SGl && (this.G9r?.TryRemoveTagById(this.SGl), (this.SGl = void 0)),
        ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
          Vector_1.Vector.ZeroVectorProxy,
        ),
        (this.$9r = void 0);
      var t = this.b9r ?? this.w9r;
      t?.GetComponent(194)?.RemoveTag(230094484),
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
        this.r7r.Normalize(),
        (this.e7r = -MathUtils_1.MathUtils.MaxFloat),
        (this.t7r = void 0),
        (this.o7r = []),
        (this.Y9r = void 0);
    }
    A7r(i, s) {
      let a = this.W9r;
      s && (a = this.G9r.ManipulateBaseConfig.投掷锁定范围),
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          a,
          1,
          this.DKo,
        );
      for (const l of this.DKo) {
        var e = l.Entity;
        if (this.B0a(e, i, s)) {
          let t = Vector_1.Vector.Create(e.GetComponent(1).ActorLocationProxy);
          var h = e.GetComponent(159),
            h =
              (h &&
                (t = Vector_1.Vector.Create(h.GetSocketLocation(this.Entity))),
              Vector_1.Vector.Distance(this.n$t.ActorLocationProxy, t)),
            r = Vector_1.Vector.Create(0, 0, 0),
            r =
              (t.Subtraction(
                CameraController_1.CameraController.CameraLocation,
                r,
              ),
              r.Normalize(),
              MathUtils_1.MathUtils.DotProduct(r, this.r7r)),
            e = new FindedEntityWithPortalParam(e, 0, h, r, void 0);
          this.o7r.push(e);
        }
      }
      if (s) {
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
          a,
          62,
          this.DKo,
        );
        for (const v of this.DKo) {
          var t,
            n,
            o,
            _ = v.Entity;
          !_?.Valid ||
            _.GetComponent(0)?.IsConcealed ||
            ((o = Vector_1.Vector.Create(_.GetComponent(1).ActorLocationProxy)),
            (t = Vector_1.Vector.Distance(this.n$t.ActorLocationProxy, o)),
            (n = Vector_1.Vector.Create(0, 0, 0)),
            o.Subtraction(
              CameraController_1.CameraController.CameraLocation,
              n,
            ),
            n.Normalize(),
            (o = MathUtils_1.MathUtils.DotProduct(n, this.r7r)),
            this.o7r.push(new FindedEntityWithPortalParam(_, 0, t, o, void 0)));
        }
      }
      ModelManager_1.ModelManager.PortalModel.GetPortals().forEach((t, e) => {
        this.q0a(e, !0, a, i, s), this.q0a(e, !1, a, i, s);
      });
    }
    B0a(t, e, i) {
      if (!t?.Valid) return !1;
      if (t.GetComponent(0)?.IsConcealed) return !1;
      var s = t.GetComponent(200);
      if (s && e === s.Owner) return !1;
      if (!i && !t.GetComponent(154)?.Valid) return !1;
      (e = t.GetComponent(135)), (s = t.GetComponent(136));
      return !(
        !(e?.Valid ?? s?.Valid) &&
        !t.GetComponent(200)?.GetIsSceneInteractionLoadCompleted()
      );
    }
    q0a(e, i, s, a, h) {
      if (e) {
        var r = ModelManager_1.ModelManager.PortalModel.GetPortal(e);
        if (r && r.Portal1Enable && r.Portal2Enable) {
          let t = void 0;
          var n = (t =
              (t =
                ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                  e,
                )?.Entity) || EntitySystem_1.EntitySystem.Get(e))?.GetComponent(
              213,
            ),
            o = (0, puerts_1.$ref)(void 0),
            o = (n?.PortalCapture?.GetPair(o), (0, puerts_1.$unref)(o));
          if (i ? n?.GetPbDataId() : o?.PbdataId) {
            var [n, o] = i
                ? [r.PortalWorldTransform1, r.PortalWorldTransform2]
                : [r.PortalWorldTransform2, r.PortalWorldTransform1],
              r =
                (this.XWs.FromUeVector(n.GetLocation()),
                this.YWs.FromUeVector(n.GetRotation().GetForwardVector()),
                this.n$t.ActorLocationProxy),
              n = this.QWs,
              _ =
                (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
                  r,
                  e,
                  i,
                  n,
                ),
                Vector_1.Vector.Create(o.GetRotation().GetForwardVector())),
              l = (_.Normalize(), Vector_1.Vector.Create(o.GetLocation())),
              v = Vector_1.Vector.Distance(r, this.XWs),
              n = s - v;
            if (!(n <= 0)) {
              ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
                l,
                n,
                1,
                this.DKo,
              );
              for (const M of this.DKo) {
                var c,
                  C,
                  m = M.Entity;
                this.B0a(m, a, h) &&
                  ((C = Vector_1.Vector.Create(
                    m.GetComponent(200).ActorLocationProxy,
                  )),
                  (c = Vector_1.Vector.Distance(C, l)),
                  ((C = C.SubtractionEqual(l)).Z = 0),
                  C.Normalize(),
                  0.5 < (C = Vector_1.Vector.DotProduct(_, C))) &&
                  this.o7r.push(
                    new FindedEntityWithPortalParam(m, i ? 1 : 2, c + v, C, e),
                  );
              }
              if (h) {
                ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
                  l,
                  n,
                  62,
                  this.DKo,
                );
                for (const f of this.DKo) {
                  var E,
                    u,
                    p = f.Entity;
                  !p?.Valid ||
                    p.GetComponent(0)?.IsConcealed ||
                    ((u = Vector_1.Vector.Create(
                      p.GetComponent(1).ActorLocationProxy,
                    )),
                    (E = Vector_1.Vector.Distance(u, l)),
                    ((u = u.SubtractionEqual(l)).Z = 0),
                    u.Normalize(),
                    0.5 < (u = Vector_1.Vector.DotProduct(_, u)) &&
                      this.o7r.push(
                        new FindedEntityWithPortalParam(
                          p,
                          i ? 1 : 2,
                          E + v,
                          u,
                          e,
                        ),
                      ));
                }
              }
            }
          }
        }
      }
    }
    P7r(t, e) {
      let i = 0;
      if (this.o7r)
        for (; i < MAX_CALC_WEIGTH_NUMBER_PER_FRAME; ) {
          if (this.o7r.length <= 0) return void (this.n7r = 1);
          var s,
            a = this.o7r.shift();
          a.Entity?.Valid &&
            (((s = a.Entity.GetComponent(200)) && t === s.Owner) ||
              ((this.i7r = void 0),
              (s = this.w7r(a, e)) > this.e7r &&
                ((this.e7r = s), (this.t7r = a), (this.$9r = this.i7r)),
              i++));
        }
    }
    x7r(t, e) {
      var i,
        s,
        a = t?.Entity;
      this.B7r(a),
        a &&
          this.Y9r &&
          (i = this.b7r(a, this.Y9r.BoneName)[0]) &&
          ((i = Vector_1.Vector.Create(i.GetLocation())),
          ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(
            i,
          )),
        a !== this.w9r
          ? (this.w9r?.Valid &&
              void 0 === this.b9r &&
              ((i = this.w9r?.GetComponent(154))?.TryRemoveTagById(793256493),
              i?.TryRemoveSpecLockTag()),
            (this.w9r = a),
            (i = this.w9r?.GetComponent(154))?.SetPassthroughPortalId(
              t?.PortalPairId ?? -1,
            ),
            i?.SetPassThroughPortalType(t?.PortalType ?? 0),
            e
              ? (this.Fdl &&
                  (EffectSystem_1.EffectSystem.StopEffectById(
                    this.Fdl,
                    "[CharacterManipulateComponent.AfterFindTarget]",
                    !1,
                  ),
                  (this.Fdl = void 0)),
                this.SGl &&
                  (this.G9r?.TryRemoveTagById(this.SGl), (this.SGl = void 0)),
                a
                  ? (EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.ManipulateStartLockCastTarget,
                      this.w9r,
                      this.$9r,
                    ),
                    (this.Y9r = this.$9r),
                    this.G9r?.CannotCastWithoutTarget &&
                      this.Xte.RemoveTag(-972568039),
                    (t = a.GetComponent(159))?.Valid &&
                      this.b9r?.Valid &&
                      ((a = t.GetLockingEffect(this.b9r)) &&
                        ((s = t.GetFinalLocation(this.b9r)),
                        (s = new UE.TransformDouble(
                          t.GetSocketRotator(this.b9r).ToUeRotator(),
                          s.ToUeVector(),
                          Vector_1.Vector.OneVectorDouble,
                        )),
                        (this.Fdl = EffectSystem_1.EffectSystem.SpawnEffect(
                          GlobalData_1.GlobalData.World,
                          s,
                          a,
                          "[CharacterManipulateComponent.AfterFindTarget]",
                          new EffectContext_1.EffectContext(this.Entity.Id),
                        ))),
                      (s = t.GetLockingItemTag(this.b9r))) &&
                      ((this.SGl =
                        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s)),
                      this.SGl) &&
                      this.G9r?.TryAddTagById(this.SGl))
                  : (EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.ManipulateEndLockCastTarget,
                    ),
                    this.G9r?.CannotCastWithoutTarget &&
                      this.Xte.AddTag(-972568039)))
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnManipulateSwitchToNewTarget,
                  void 0 !== this.w9r,
                  this.w9r,
                  e,
                ),
            this.w9r?.Valid && (this.B9r = this.w9r.GetComponent(154)),
            this.w9r?.Valid && void 0 === this.b9r
              ? (i?.TryAddTagById(793256493),
                i?.TryAddSpecLockTag(),
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
          (t = t.GetComponent(159))?.Valid
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
    w7r(e, t) {
      var i = -MathUtils_1.MathUtils.MaxFloat,
        s = e.Entity,
        a = s.GetComponent(1);
      if (!this.q7r(s, t, a)) return i;
      var h = s.GetComponent(194),
        r = s.GetComponent(154);
      if (r?.Valid && void 0 === r?.ManipulateBaseConfig) return i;
      if (r && !r?.IsMatchRoleGravityDirect(this.n$t)) return i;
      let n = !1;
      let o = !1,
        _ = 1;
      if (h?.HasTag(-709838471)) return i;
      if (t) {
        if (!this.b9r?.Valid && !this.w9r?.Valid) return i;
        if (!this.OE1(s)) return i;
        var h = s.GetComponent(0),
          l = h.GetBaseInfo();
        if (!l) return i;
        if (this.b9r.GetComponent(155)?.Valid) {
          h = h.GetAwakedEntities();
          if (
            0 < h.length &&
            !h.includes(this.b9r.GetComponent(0).GetPbDataId())
          )
            return i;
        }
        if (this.G9r.Config.SearchTargetCfg)
          for (const v of this.G9r.Config.SearchTargetCfg.LockConditions)
            if ((0, IUtil_1.isEntitiyMatch)(v.EntitiyMatch, l.Category)) {
              (n = !0), (_ = v.Weight);
              break;
            }
        if (!n) return i;
        h = s.GetComponent(159);
        if (
          (h &&
            (n = !(
              !h?.CheckMatchManipulatable(this.G9r?.Entity) ||
              !h?.CanSetNewItem() ||
              h?.IsLockOrSlient() ||
              !h?.MultiplayerLimitTypeCheck()
            )),
          (h =
            s.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.kks.Proto_Monster),
          n)
        )
          if (h) {
            h = s.GetComponent(68);
            let t = !1;
            if (0 < h.Parts.length)
              for (const c of h.Parts)
                if (c.Active) {
                  t = !0;
                  break;
                }
            n = t
              ? ((o = !0), !!(s = this.G7r(s, h)) && 0 < s.length)
              : this.N7r(e);
          } else n = this.N7r(e);
      } else {
        (n = a.Owner?.ActorHasTag(TARGET_ACTOR_TAG) ?? !1),
          (!r?.Valid ||
            ((n = n && r.CanBeHeld),
            e.Dist > r.ManipulateBaseConfig.被感知范围)) &&
            (n = !1);
        (h = this.Entity.GetComponent(0).GetCreatureDataId()),
          (s = r?.GetControllerId());
        n =
          (n = void 0 === s || 0 === s || (0 !== s && s === h) ? n : !1) &&
          this.N7r(e);
      }
      return n ? _ * this.O7r(e, i, o, t) : i;
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
    N7r(t) {
      this.uoe || this.k7r();
      var e = t.Entity.GetComponent(1),
        i = Vector_1.Vector.Create(),
        s =
          (i.DeepCopy(this.n$t.ActorLocationProxy),
          Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT)),
        s =
          (GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, s),
          i.AdditionEqual(s),
          i.ToUeVectorOld());
      let a = e.ActorLocation;
      var h = e.Entity.GetComponent(146),
        h =
          (h?.Valid && (a = h.GetHitPoint().ToUeVector()),
          e.Entity.GetComponent(159)),
        h =
          (h?.Valid && (a = h.GetSocketLocation(this.b9r).ToUeVector()),
          e.Entity.GetComponent(138)),
        h =
          (h?.Valid && (a = h.GetHitPoint().ToUeVector()),
          e.Entity.GetComponent(154));
      h?.Valid &&
        ((h = Vector_1.Vector.Create(h.ManipulateBaseConfig.被感知坐标偏移)),
        GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, h),
        (a = a.op_Addition(h.ToUeVector()))),
        this.uoe.SetDrawDebugTrace(this.j9r ? 2 : 0),
        (this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME);
      let r = !0;
      if (
        (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, s),
        0 === t.PortalType)
      )
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) && (r = this.O0a(e));
      else {
        var h = 1 === t.PortalType,
          s = Vector_1.Vector.Create(e.ActorLocationProxy),
          n = Vector_1.Vector.Create(),
          o =
            (PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
              s,
              t.PortalPairId,
              !h,
              n,
            ),
            ModelManager_1.ModelManager.PortalModel.GetPortal(t.PortalPairId));
        const a = Vector_1.Vector.Create();
        MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
          i,
          n,
          Vector_1.Vector.Create(
            (h
              ? o.PortalWorldTransform1
              : o.PortalWorldTransform2
            ).GetLocation(),
          ),
          Vector_1.Vector.Create(
            (h ? o.PortalWorldTransform1 : o.PortalWorldTransform2)
              .GetRotation()
              .GetForwardVector(),
          ),
          a,
        ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a);
        var _ = TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        );
        if (!(r = _ ? this.O0a(e) : r)) return r;
        PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(
          i,
          t.PortalPairId,
          h,
          n,
        ),
          MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(
            n,
            s,
            Vector_1.Vector.Create(
              (h
                ? o.PortalWorldTransform2
                : o.PortalWorldTransform1
              ).GetLocation(),
            ),
            Vector_1.Vector.Create(
              (h ? o.PortalWorldTransform2 : o.PortalWorldTransform1)
                .GetRotation()
                .GetForwardVector(),
            ),
            a,
          ),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, a),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s),
          TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) && (r = this.O0a(e));
      }
      return r && this.j7r(this.q9r, r);
    }
    O0a(e) {
      if (this.uoe.HitResult.bBlockingHit)
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var i = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== i) {
            var s = this.uoe.HitResult.Components.Get(t);
            if (this.V7r(i, e)) break;
            if (this.H7r(i, s)) return !1;
          }
        }
      return !0;
    }
    j7r(e, t) {
      var i = Vector_1.Vector.Create(),
        s =
          (i.DeepCopy(this.n$t.ActorLocationProxy),
          Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT)),
        s =
          (GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, s),
          i.AdditionEqual(s),
          i.ToUeVectorOld()),
        i = this.x9r.D_GetTransform(),
        a = e?.Entity.GetComponent(154);
      if (!a?.Valid) return t;
      (t = Vector_1.Vector.Create(a.ConfigHoldOffset)),
        GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, t),
        (a = i.TransformPositionNoScale(t.ToUeVector())),
        this.uoe || this.k7r(),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, s),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a),
        (this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME),
        (i = TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.uoe,
          PROFILE_KEY,
        ));
      if (i && this.uoe.HitResult.bBlockingHit)
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var h = this.uoe.HitResult.Actors.Get(t);
          if (void 0 !== h) {
            if (this.b9r.GetComponent(157)?.IsChildrenActor(h)) break;
            var r = this.uoe.HitResult.Components.Get(t);
            if (this.V7r(h, e)) break;
            if (this.H7r(h, r)) return !1;
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
      if (this.G9r?.Valid) {
        this.K9r || this.F7r();
        var t = Vector_1.Vector.Create(),
          e =
            (t.DeepCopy(this.n$t.ActorLocationProxy),
            Vector_1.Vector.Create(0, 0, this.n$t.HalfHeight)),
          e =
            (GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(
              this.q9r,
              e,
            ),
            t.AdditionEqual(e),
            t.ToUeVectorOld());
        const a = Vector_1.Vector.Create();
        a.DeepCopy(this.n$t.ActorForwardProxy),
          a.Normalize(),
          t.AdditionEqual(a.MultiplyEqual(20));
        (t = t.ToUeVectorOld()),
          (e =
            (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              this.K9r,
              e,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.K9r, t),
            (this.K9r.Radius = this.n$t.HalfHeight),
            this.K9r.SetDrawDebugTrace(this.j9r ? 1 : 0),
            TraceElementCommon_1.TraceElementCommon.SphereTrace(
              this.K9r,
              PROFILE_KEY,
            )));
        if (e && this.K9r.HitResult.bBlockingHit) {
          for (let t = 0; t < this.K9r.HitResult.Actors.Num(); t++) {
            var i = this.K9r.HitResult.Actors.Get(t);
            if (void 0 !== i && !this.V7r(i, this.q9r)) {
              var s = this.K9r.HitResult.Components.Get(t);
              if (this.H7r(i, s)) {
                i = Vector_1.Vector.Create();
                TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                  this.K9r.HitResult,
                  t,
                  i,
                ),
                  i.SubtractionEqual(this.n$t.ActorLocationProxy);
                const a = this.n$t.ActorForwardProxy;
                if (
                  (i.Set(i.X, i.Y, 0),
                  i.Normalize(),
                  a.Set(a.X, a.Y, 0),
                  a.Normalize(),
                  i.CrossProduct(a, i),
                  0 < i.Z)
                )
                  return void (this.G9r.UsingAssistantHoldOffset = !0);
              }
            }
          }
          this.G9r.UsingAssistantHoldOffset &&
            (this.G9r.UsingAssistantHoldOffset = !1);
        } else this.G9r.UsingAssistantHoldOffset = !1;
      }
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
    O7r(t, e, i, s = !1) {
      let a = e;
      return (a = i
        ? this.W7r(t, e)
        : t.Entity.GetComponent(136)?.Valid
          ? this.K7r(t, e, s)
          : this.Q7r(t, e, s));
    }
    Q7r(e, t, i) {
      var s = e.Entity.GetComponent(1),
        a = Vector_1.Vector.Create(s.ActorLocationProxy),
        h = s.Entity.GetComponent(159);
      h?.Valid && a.DeepCopy(h.GetSocketLocation(this.b9r));
      let r = -1;
      var a = s.Entity.GetComponent(154),
        n = new Array(),
        o = new Array();
      if (i)
        for (const C of this.G9r.Config.SearchTargetCfg.AngleWeight)
          n.push(C.Angle), o.push(C.Weight);
      else {
        var _ = a.ManipulateBaseConfig.被感知角度权重;
        for (let t = 0; t < _.Num(); t++) {
          var l = _.GetKey(t),
            v = _.Get(l);
          n.push(l), o.push(v);
        }
      }
      for (let t = 0; t < n.length; t++) {
        var c = n[t];
        if (e.Dot > Math.cos(((c * this.X9r) / 180) * Math.PI)) {
          r = o[t];
          break;
        }
      }
      return -1 === r
        ? t
        : ((h = i ? this.G9r.ManipulateBaseConfig.投掷锁定范围 : this.W9r),
          (s =
            !!i && this.G9r.Config.SearchTargetCfg.IgnoreDistanceWeight
              ? 1
              : h - e.Dist),
          r * s);
    }
    W7r(t, e) {
      var i = t.Entity,
        t = i.GetComponent(68);
      let s = -Number.MAX_VALUE,
        a = -1;
      var h = this.G7r(i, t);
      for (let t = 0; t < h.length; t++) {
        var r = h[t],
          r = this.b7r(i, r.BoneName)[0],
          n = Vector_1.Vector.Create(r.GetLocation()),
          o = Vector_1.Vector.Create(0, 0, 0);
        n.Subtraction(this.n$t.ActorLocationProxy, o), o.Normalize();
        Vector_1.Vector.Create(r.GetLocation()).SubtractionEqual(
          this.n$t.ActorLocationProxy,
        );
        var _ = MathUtils_1.MathUtils.DotProduct(o, this.r7r),
          r = Vector_1.Vector.Distance(n, this.n$t.ActorLocationProxy);
        if (!(r > this.W9r)) {
          let e = -1;
          var l = new Array(),
            v = new Array();
          for (const C of this.G9r.Config.SearchTargetCfg.AngleWeight)
            l.push(C.Angle), v.push(C.Weight);
          for (let t = 0; t < l.length; t++) {
            var c = l[t];
            if (_ > Math.cos(((c * this.X9r) / 180) * Math.PI)) {
              e = v[t];
              break;
            }
          }
          -1 !== e && (o = e * (this.W9r - r)) > s && ((s = o), (a = t));
        }
      }
      return -1 !== a ? ((this.i7r = h[a]), 1e4) : e;
    }
    K7r(t, e, i) {
      var s = t.Entity.GetComponent(136);
      let a = -MathUtils_1.MathUtils.MaxFloat;
      var h = Vector_1.Vector.Create(0, 0, 0),
        r = [],
        n = [];
      let o = -1;
      if (((r = []), (n = []), i))
        for (const E of this.G9r.Config.SearchTargetCfg.AngleWeight)
          r.push(E.Angle), n.push(E.Weight);
      else {
        var _ = t.Entity.GetComponent(154).ManipulateBaseConfig.被感知角度权重;
        for (let t = 0; t < _.Num(); t++) {
          var l = _.GetKey(t),
            v = _.Get(l);
          r.push(l), n.push(v);
        }
      }
      for (const u of s.GetAllActivatedBlockPos()) {
        u.Subtraction(CameraController_1.CameraController.CameraLocation, h),
          h.Normalize();
        var c,
          C = MathUtils_1.MathUtils.DotProduct(h, this.r7r);
        for (let t = 0; t < r.length; t++) {
          var m = r[t];
          if (C > Math.cos(((m * this.X9r) / 180) * Math.PI)) {
            o = n[t];
            break;
          }
        }
        -1 !== o && (c = o * C) > a && (a = c);
      }
      return a === -MathUtils_1.MathUtils.MaxFloat ? e : a;
    }
    yla(t) {
      (!this.w9r?.Valid ||
        !this.B9r?.Valid ||
        ((this.Ela += t), this.Ela > MAX_WAIT_MANIPULATE_TIME) ||
        (this.B9r.CanBeHeld && !this.Ila())) &&
        (this.StopWaitingToManipulate(), this.Reset());
    }
    p7r(t) {
      (this.O9r += 0.001 * t),
        this.G9r?.TickState(0.001 * t),
        void 0 === this.B9r
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                31,
                "[Manipulate] 读条中的对象上没有Manipulatable组件",
                ["Name", this.w9r],
              ),
            this.StopManipulate())
          : this.O9r > this.B9r.ManipulateBaseConfig.读条时间 && this.Draw();
    }
    v7r(t) {
      this.G9r?.PlayingMatchSequence ||
        ((this.k9r += 0.001 * t),
        this.j7r(this.q9r, !1)
          ? (this.G9r?.TickState(0.001 * t),
            (t = this.G9r?.ManipulateBaseConfig.吸取时间) &&
              this.k9r >= t &&
              ((t = this.q9r.ActorLocationProxy),
              Vector_1.Vector.DistSquared(t, this.q9r.ActorLocationProxy) < 2500
                ? this.R7r()
                : (this.StopManipulate(), this.Reset())))
          : (this.StopManipulate(), this.Reset()));
    }
    M7r(e) {
      if (((this.k9r += 0.001 * e), this.N9r?.IsValid())) {
        var t;
        if (
          (this.G9r?.TickState(0.001 * e),
          this.G9r.CastFreeState instanceof
            SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState)
        ) {
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
                    Vector_1.Vector.Create(e.VectorDouble()),
                  ))).length &&
              (this.z9r ||
                (LevelAimLineController_1.LevelAimLineController.PlayEffect() &&
                  (this.z9r = !0)),
              LevelAimLineController_1.LevelAimLineController.UpdatePoints(
                t,
                0,
              ));
          }
        } else
          this.G9r.CastFreeState instanceof
            SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState &&
            ((e = this.G9r.Config.ThrowCfg.MotionConfig),
            (t = this.G9r.CastFreeState.GetCastPath()),
            e.RenderTrajectoryConfig?.Effect &&
              0 < t.length &&
              (this.z9r ||
                (LevelAimLineController_1.LevelAimLineController.PlayEffect(
                  e.RenderTrajectoryConfig.Effect,
                ) &&
                  (this.z9r = !0)),
              LevelAimLineController_1.LevelAimLineController.UpdatePoints(
                t,
                0,
              )),
            0 < t.length) &&
            ((e = Transform_1.Transform.Create(
              this.q9r.ActorTransform,
            )).SetLocation(t[t.length - 1]),
            this.q9r
              .GetInteractionMainActor()
              .UpdateProjectionActorTransform(e.ToUeTransform()));
        Vector_1.Vector.Distance(
          this.q9r.ActorLocationProxy,
          Vector_1.Vector.Create(this.G9r.MovementTargetLocation),
        ) < ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance
          ? this.G9r.IsHoldingUsePhysics
            ? ((t = UE.KismetMathLibrary.WD_WorldToLocal(
                GlobalData_1.GlobalData.World,
                this.G9r.MovementTargetLocation,
              )),
              this.N9r.SetTargetLocationAndRotation(
                t,
                this.G9r.MovementTargetRotation,
              ))
            : this.q9r.SetActorLocationAndRotation(
                this.G9r.MovementTargetLocation,
                this.G9r.MovementTargetRotation,
                "TickHolding",
                !1,
              )
          : (this.StopManipulate(), this.Reset());
      }
    }
    S7r(t) {
      (this.F9r += t),
        this.G9r?.TickState(0.001 * t),
        this.F9r > ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime &&
          this.Cast();
    }
    StopManipulate() {
      var t = this.Entity.GetComponent(39);
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
        1 === this.ac && (this.StopWaitingToManipulate(), this.Reset()),
        (this.w9r = void 0);
    }
    GetHoldingActor() {
      return this.q9r.Owner;
    }
    GetHoldingEntity() {
      return this.b9r;
    }
    SetDataFromOldRole(t) {
      var e = t.Entity.GetComponent(64);
      4 === e.ac &&
        ((t.Entity.GetComponent(39).SkillTarget = void 0),
        (this.Entity.GetComponent(39).SkillTarget = void 0)),
        e.Reset(),
        (this.j9r = e.j9r),
        this.StopManipulate(),
        this.l7r(1193763416);
    }
    h7r(t) {
      this.Xte.HasTag(t) || this.Xte.AddTag(t);
    }
    l7r(t) {
      this.Xte.HasTag(t) && this.Xte.RemoveTag(t);
    }
    ActiveHandFX(t, e = 0) {
      var i = t.GetComponent(194);
      i
        ? (i.AddTag(1408918695), (this.Z9r = i), (this.J9r = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 31, "被控物目标找不到TagComp", [
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
        ((t = Protocol_1.Aki.Protocol.Tds.create()).F4n =
          MathUtils_1.MathUtils.NumberToLong(e)),
        (t.xWn = !1),
        Net_1.Net.Call(16418, t, (t) => {}));
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
        a = t.GetComponent(3)?.Actor?.Mesh;
      let h = void 0;
      for ([i, s] of t.GetComponent(68).GroupMapByBone)
        if (s === e.toString()) {
          h = FNameUtil_1.FNameUtil.GetDynamicFName(i);
          break;
        }
      t = a.GetAllSocketNames();
      return void 0 !== h && -1 !== t.FindIndex(h)
        ? [a.D_GetSocketTransform(h, 0), h]
        : [void 0, void 0];
    }
    G7r(t, e) {
      var i,
        s,
        a,
        h = new Array();
      for (const r of e.Parts)
        r.Active &&
          (([s, i] = this.b7r(t, r.BoneName)), s) &&
          ((a = this.n$t.ActorLocationProxy),
          (s = Vector_1.Vector.Create(s.GetLocation())),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, a),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s),
          (this.uoe.ProfileName = MONSTER_PART_CHECK_PRESET_NAME),
          (TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.uoe,
            PROFILE_KEY,
          ) &&
            this.uoe.HitResult.bBlockingHit &&
            ((a =
              !this.uoe.HitResult.Components.Get(
                0,
              ).AttachSocketName.op_Equality(i)),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Temp",
                31,
                "realBoneName",
                ["realBoneName", i.toString()],
                ["beBlock", a],
              ),
            a)) ||
            h.push(r));
      return 0 < h.length ? h : void 0;
    }
    ExtraAction() {
      var t;
      4 === this.ac &&
        (this.b9r.Valid || this.G9r.Valid) &&
        (t = this.b9r.GetComponent(136))?.Valid &&
        (this.G9r?.TryRemoveTagById(-1354651119),
        t.RotateSelf(),
        this.G9r?.TryAddTagById(-1354651119));
    }
    GetIsCharRotateWithCameraWhenManipulate() {
      return 3 !== this.ac && 4 !== this.ac
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              31,
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
    Ila() {
      var t;
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            39,
            "[CharacterManipulateComp] ManipulateSelectedTarget",
            ["Id", this.Entity.Id],
            ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            ["TargetId", this.w9r?.Id],
          ),
        !(
          !this.w9r ||
          !this.B9r ||
          !(t = this.Entity.GetComponent(39)).Valid
        ) &&
          t.BeginSkill(CharacterManipulateComponent_1.SkillId, {
            Reason: "ManipulateSpecificTarget",
          })
      );
    }
    CanManipulate() {
      return !(
        !this.n$t.IsMoveAutonomousProxy ||
        !CharacterManipulateComponent_1.f7r ||
        0 !== this.ac ||
        this.Q9r ||
        !this.Entity.GetComponent(39).Valid
      );
    }
    TryManipulateSpecificItem(t) {
      var e;
      return !(
        !this.CanManipulate() ||
        !(e = t.GetComponent(154)) ||
        !t.GetComponent(131)?.Valid ||
        ((this.w9r = t),
        (this.B9r = e),
        (this.Ela = 0),
        (this.ac = 1),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            39,
            "[CharacterManipulateComp] TryManipulateSpecificItem",
            ["Id", this.Entity.Id],
            ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()],
            ["TargetId", this.w9r?.Id],
          ),
        0)
      );
    }
    StopWaitingToManipulate() {
      this.Ela = 0;
      var t = this.Entity.GetComponent(39);
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
        this.l7r(1193763416);
    }
    OnRoleTeleport() {
      var t;
      4 === this.ac &&
        ((t = this.G9r?.HoldState.UpdateTargetLocationAndRotation()),
        this.G9r.IsHoldingUsePhysics && this.N9r && this.N9r.ReleaseComponent(),
        this.q9r?.SetActorLocationAndRotation(
          t.Loc,
          t.Rot,
          "OnRoleTeleport",
          !1,
        ),
        (t = UE.KismetMathLibrary.WD_WorldToLocal(
          GlobalData_1.GlobalData.World,
          this.q9r.ActorLocation,
        )),
        this.G9r.IsHoldingUsePhysics) &&
        this.N9r &&
        this.N9r.GrabComponentAtLocationWithRotation(
          this.q9r.GetPrimitiveComponent(),
          FNameUtil_1.FNameUtil.EMPTY,
          t,
          this.q9r.ActorRotation,
        );
    }
    IsManipulating() {
      return 0 !== this.ac;
    }
    get CurSelectedEntity() {
      return this.w9r;
    }
    OE1(t) {
      var t = t.GetComponent(0)?.GetPbEntityInitData();
      return (
        !t ||
        !GravityUtils_1.GravityUtils.IsEntityGravityLimitGravity(t) ||
        ((t = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(t)),
        !this.n$t?.MoveComp) ||
        (this.n$t?.MoveComp?.IsStandardGravity
          ? t.Equals(Vector_1.Vector.DownVectorProxy)
          : t.Equals(this.n$t.ActorGravityDirectProxy))
      );
    }
  });
(CharacterManipulateComponent.f7r = !1),
  (CharacterManipulateComponent.SkillId = 210003),
  (CharacterManipulateComponent.CastSkillId = 210005),
  (CharacterManipulateComponent.CancelSkillId = 210006),
  (CharacterManipulateComponent.HoldingSkillId = 210007),
  (CharacterManipulateComponent = CharacterManipulateComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(64)],
      CharacterManipulateComponent,
    )),
  (exports.CharacterManipulateComponent = CharacterManipulateComponent);
//# sourceMappingURL=CharacterManipulateComponent.js.map
