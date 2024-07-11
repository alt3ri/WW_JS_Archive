"use strict";
var SceneItemManipulatableComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        a = arguments.length,
        o =
          a < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, i, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (h = t[n]) &&
            (o = (a < 3 ? h(o) : 3 < a ? h(e, i, o) : h(e, i)) || o);
      return 3 < a && o && Object.defineProperty(e, i, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemManipulatableComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager"),
  ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController"),
  BulletController_1 = require("../Bullet/BulletController"),
  CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
  SceneItemDynamicAttachTargetComponent_1 = require("./Common/Component/SceneItemDynamicAttachTargetComponent"),
  SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent"),
  SceneItemManipulableBoomerangCastState_1 = require("./Manipulate/SceneItemManipulableBoomerangCastState"),
  SceneItemManipulableCastFreeState_1 = require("./Manipulate/SceneItemManipulableCastFreeState"),
  SceneItemManipulableCastProjectileState_1 = require("./Manipulate/SceneItemManipulableCastProjectileState"),
  SceneItemManipulableCastToOutletState_1 = require("./Manipulate/SceneItemManipulableCastToOutletState"),
  SceneItemManipulableCastToTargetState_1 = require("./Manipulate/SceneItemManipulableCastToTargetState"),
  SceneItemManipulableChantState_1 = require("./Manipulate/SceneItemManipulableChantState"),
  SceneItemManipulableDrawState_1 = require("./Manipulate/SceneItemManipulableDrawState"),
  SceneItemManipulableDropState_1 = require("./Manipulate/SceneItemManipulableDropState"),
  SceneItemManipulableHoldState_1 = require("./Manipulate/SceneItemManipulableHoldState"),
  SceneItemManipulableMatchJigsawBaseState_1 = require("./Manipulate/SceneItemManipulableMatchJigsawBaseState"),
  SceneItemManipulableMatchOutletState_1 = require("./Manipulate/SceneItemManipulableMatchOutletState"),
  SceneItemManipulablePrecastState_1 = require("./Manipulate/SceneItemManipulablePrecastState"),
  SceneItemManipulableResetState_1 = require("./Manipulate/SceneItemManipulableResetState"),
  SceneItemManipulableTrackTargetCastToFreeState_1 = require("./Manipulate/SceneItemManipulableTrackTargetCastToFreeState"),
  SceneItemManipulableTrackTargetCastToTargetState_1 = require("./Manipulate/SceneItemManipulableTrackTargetCastToTargetState"),
  SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils"),
  ON_GROUND_OFFSET = 0.2,
  BINDING_TAG = new UE.FName("Obj"),
  CONTROL_OBJECT_TAG = new UE.FName("ControlObj"),
  INVALID_ID = 0,
  MAX_CREATE_BULLET_NUM = 1,
  MIN_VELOCITY = 0.3,
  ZERO_VELOCITY_FRAME_NUM = 10;
let SceneItemManipulatableComponent =
  (SceneItemManipulatableComponent_1 = class SceneItemManipulatableComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Config = void 0),
        (this.ManipulateBaseConfig = void 0),
        (this.gpn = !1),
        (this.ConfigHoldOffset = void 0),
        (this.ConfigHoldRotator = void 0),
        (this.ConfigMatchType = void 0),
        (this.State = "Reset"),
        (this.TargetActorComponent = void 0),
        (this.TargetOutletComponent = void 0),
        (this.ActorComp = void 0),
        (this.ActivatedOutlet = void 0),
        (this.ugn = void 0),
        (this.Xrr = void 0),
        (this.ijr = void 0),
        (this.Snn = void 0),
        (this.fpn = void 0),
        (this.ppn = void 0),
        (this.vpn = void 0),
        (this.Mpn = void 0),
        (this.CastTargetLocation = void 0),
        (this.MatchSequence = void 0),
        (this.PlayingMatchSequence = !1),
        (this.PropComp = void 0),
        (this.CastCurve = void 0),
        (this.IsCanBeHeld = !0),
        (this.Uxr = void 0),
        (this.jDn = void 0),
        (this.Spn = 0),
        (this.rBn = 0),
        (this.NeedRemoveControllerId = !1),
        (this.IsRequestingRemoveControllerId = !1),
        (this.IsRequestingRemoveAutonomousId = !1),
        (this.Epn = !1),
        (this.ypn = !1),
        (this.FinishCheckInitAttach = !1),
        (this.EnableDynamicAttach = !1),
        (this.mBe = void 0),
        (this.Ipn = !1),
        (this.Tpn = void 0),
        (this.Lpn = !1),
        (this.Dpn = !0),
        (this.Rpn = !0),
        (this.Apn = !0),
        (this.Upn = !0),
        (this.zht = void 0),
        (this._pn = void 0),
        (this.Ppn = void 0),
        (this.xpn = void 0),
        (this.UsingAssistantHoldOffset = !1),
        (this.ConfigAssistantHoldOffset = void 0),
        (this.MovementTargetLocation = void 0),
        (this.MovementTargetRotation = void 0),
        (this.wpn = void 0),
        (this.ResetState = void 0),
        (this.ChantState = void 0),
        (this.DrawState = void 0),
        (this.HoldState = void 0),
        (this.PrecastState = void 0),
        (this.CastToTargetState = void 0),
        (this.CastToOutletState = void 0),
        (this.CastFreeState = void 0),
        (this.CastProjectileState = void 0),
        (this.MatchOutletState = void 0),
        (this.DropState = void 0),
        (this.Bpn = ""),
        (this.bpn = 0),
        (this.qpn = !1),
        (this.Gpn = !1),
        (this.Npn = !1),
        (this.Opn = 0),
        (this.kpn = 0),
        (this.Fpn = MAX_CREATE_BULLET_NUM),
        (this.Vpn = 0),
        (this.Hpn = 0),
        (this.IsHoldingUsePhysics = !1),
        (this.ForceMoving = !1),
        (this.LastHoldingLocation = Vector_1.Vector.Create()),
        (this.BCe = void 0),
        (this.R_n = void 0),
        (this.YO = void 0),
        (this.jpn = void 0),
        (this.Wpn = !1),
        (this.azr = () => {
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterPresentationInitRange,
            this.azr,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.EnterPresentationInitRange,
              this.azr,
            );
        }),
        (this.Kpn = (t, e, i) => {
          var s = e.Entity.GetComponent(0);
          this.zht?.RelationId === s.GetPbDataId() &&
            (this.Qpn(e, this.zht.PbRelationMatchCfgIndex),
            this.Xpn(e),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.Kpn,
            ));
        }),
        (this.$pn = () => {
          var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
          this.szo(t, this.Bpn),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHit,
              this.$pn,
            ),
            this.qpn && this.Ypn();
        }),
        (this.Jpn = (t, e) => {
          e !== Global_1.Global.BaseCharacter.CharacterActorComponent.Owner &&
            ((e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity),
            this.szo(e, String(this.Opn)),
            this.qpn) &&
            this.Ypn();
        }),
        (this.zpn = () => {
          this.CurrentState === this.ChantState &&
            (this.CurrentState = this.ResetState);
        }),
        (this.cjr = (t) => {
          (this.Hpn += t),
            this.Dpn || this.Zpn(t),
            this.Rpn || this.evn(),
            this.Apn || this.tvn(),
            this.Upn || this.ivn(t),
            this.Xrr.DeepCopy(this.ActorComp.ActorLocationProxy),
            this.ijr.DeepCopy(this.ActorComp.ActorRotationProxy),
            this.IsCanBeHeld ||
              !this.Epn ||
              this.Ipn ||
              (this.ManipulateBaseConfig?.被控制CD &&
              0 < this.ManipulateBaseConfig?.被控制CD
                ? ((this.Ipn = !0),
                  (this.Tpn = TimerSystem_1.TimerSystem.Delay(() => {
                    (this.Ipn = !1),
                      (this.IsCanBeHeld = !0),
                      this.NeedRemoveControllerId &&
                        !this.IsRequestingRemoveControllerId &&
                        this.ovn(),
                      (this.Tpn = void 0);
                  }, this.ManipulateBaseConfig.被控制CD * TimeUtil_1.TimeUtil.InverseMillisecond)))
                : ((this.IsCanBeHeld = !0),
                  this.NeedRemoveControllerId &&
                    !this.IsRequestingRemoveControllerId &&
                    this.ovn())),
            this.Dpn &&
              this.Rpn &&
              (this.Lpn || this.Apn) &&
              this.Upn &&
              ((this.Lpn = !1),
              this.TryDisableTick(
                "[SceneItemManipulatableComponent.OnTick] 没有被控制",
              ),
              this.ActorComp.ResetLocationCachedTime(),
              this.Ppn?.ForceSendPendingMoveInfos(),
              this.IsRequestingRemoveAutonomousId ||
                ((this.IsCanBeHeld = !1), this.oBn()));
        }),
        (this.gIe = (t, e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneItem", 32, "[电池] 改变状态", [
              "State",
              this.Snn.GetTagNames(),
            ]),
            t.includes(-1611484717)
              ? TimerSystem_1.TimerSystem.Next(() => {
                  this.Snn.RemoveTag(-938118674), this.Snn.AddTag(1926099076);
                })
              : t.includes(-1660917319) &&
                TimerSystem_1.TimerSystem.Next(() => {
                  this.Snn.RemoveTag(1926099076), this.Snn.AddTag(-938118674);
                });
        }),
        (this.rvn = (t, e) => {
          0 !== t
            ? ((t =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  t,
                )),
              this.Qpn(t, e))
            : this.nvn();
        }),
        (this.svn = (t) => {
          void 0 !== t && ((this.jpn = t), this.avn());
        }),
        (this.hvn = (t) =>
          SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack(
            { Type: IComponent_1.EHitBulletType.PlayerAttack },
            t,
            this.Entity,
          ));
    }
    GetControllerId() {
      return this.Spn;
    }
    SetControllerId(t) {
      (this.Spn = t),
        (this.ActorComp.GetPrimitiveComponent().bCanCharacterStandOn =
          t === INVALID_ID);
    }
    GetAutonomousId() {
      return this.rBn;
    }
    SetAutonomousId(t) {
      this.rBn = t;
    }
    get CanBeHeld() {
      let t = !0;
      return (
        this.mBe && (t = this.mBe.IsInteractState ?? !1),
        !(
          void 0 !== this.YO &&
          !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
            this.YO,
            this.ActorComp.Owner,
            LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
          )
        ) &&
          this.IsCanBeHeld &&
          t &&
          !this.Ipn &&
          !this.PropComp?.IsLocked &&
          this.gpn
      );
    }
    get CanBeChant() {
      return "Reset" === this.State || "MatchingOutlet" === this.State;
    }
    get PutIndex() {
      return this.jpn;
    }
    get IsProjectileAimMode() {
      return this.Wpn;
    }
    set IsProjectileAimMode(t) {
      (this.Wpn = t),
        this.CurrentState === this.HoldState &&
          (this.Wpn
            ? this.HoldState.EnterProjectileAimMode()
            : this.HoldState.ExitProjectileAimMode());
    }
    IsCanInteractType() {
      return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
        this._pn,
      );
    }
    OnInitData(t) {
      var t = t.GetParam(SceneItemManipulatableComponent_1)[0],
        t =
          ((this.Config = t),
          void 0 !== this.Config.PlayerStateRestritionId &&
            ((t = {
              Type: "CheckPlayerStateRestriction",
              RestrictionId: this.Config.PlayerStateRestritionId,
            }),
            (this.YO = { Type: 0, Conditions: [t] })),
          (this.zht = this.Entity.GetComponent(0)),
          this.zht.GetBaseInfo());
      (this._pn = t?.OnlineInteractType),
        (this.ConfigMatchType = t?.Category?.ControlMatchType),
        (this.CurrentState = this.ResetState),
        (this.ugn = Rotator_1.Rotator.Create()),
        (this.Xrr = Vector_1.Vector.Create()),
        (this.ijr = Rotator_1.Rotator.Create());
      this.Entity.GetComponent(138).AddComponentHitCondition(this, this.hvn);
      t = this.Config.DestroyCfg;
      if (t)
        for (const e of t.Conditions)
          switch (e.Type) {
            case IComponent_1.ETeleControlDestroyCondition.CreateBullet:
              this.qpn = !0;
              break;
            case IComponent_1.ETeleControlDestroyCondition.LetGo:
              this.Gpn = !0;
              break;
            case IComponent_1.ETeleControlDestroyCondition.Throw:
              this.Npn = !0;
          }
      t = this.zht.ComponentDataMap.get("rps");
      return (
        (this.jDn = MathUtils_1.MathUtils.LongToBigInt(t?.rps?.S4n)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.azr,
        ),
        !0
      );
    }
    OnClear() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHit,
          this.$pn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHit,
            this.$pn,
          ),
        !0
      );
    }
    Xpn(t) {
      var e = t.Entity.GetComponent(0),
        i = this.zht.GetPbDataId();
      e.OccupiedGridInfo.has(i) &&
        ((e = e.OccupiedGridInfo.get(i)),
        ((i = this.Entity.GetComponent(122)).PutDownIndex =
          new SceneItemJigsawBaseComponent_1.JigsawIndex(e.M3n.tFn, e.M3n.rFn)),
        (i.Rotation = e.M3n.oFn),
        (i = t.Entity.GetComponent(145).GetSocketRotator(this.Entity)),
        this.ActorComp.SetActorRotation(i.ToUeRotator()));
    }
    Qpn(t, e) {
      this.TargetActorComponent = t.Entity.GetComponent(1);
      t = t.Entity.GetComponent(145);
      t &&
        ((this.ActivatedOutlet = t),
        (this.ActivatedOutlet.MatchCfgIndex = e),
        (this.ActivatedOutlet.EntityInSocket = this),
        (e = t.GetMatchSequence(this.Entity)),
        StringUtils_1.StringUtils.IsEmpty(e) || (this.MatchSequence = e),
        (this.CastTargetLocation = t.GetSocketLocation(this.Entity)),
        this.ActivatedOutlet.ChangeSilentTag(),
        (this.CurrentState = this.MatchOutletState),
        this.ActorComp.SetActorRotation(
          this.ActivatedOutlet.GetSocketRotator(this.Entity).ToUeRotator(),
        ));
    }
    OnStart() {
      var t;
      return (
        (this.ActorComp = this.Entity.GetComponent(182)),
        this.ActorComp.Owner.Tags.Add(CONTROL_OBJECT_TAG),
        this.ActorComp.Owner.Tags.Add(
          CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
        ),
        this.ActorComp.GetPrimitiveComponent().SetUseCCD(!0),
        (this.Snn = this.Entity.GetComponent(177)),
        this.Snn.AddTag(-1299967416),
        (this.TargetActorComponent = void 0),
        (this.TargetOutletComponent = void 0),
        this.ugn.DeepCopy(this.ActorComp.ActorRotationProxy),
        this.Xrr.DeepCopy(this.ActorComp.ActorLocationProxy),
        (this.mBe = this.Entity.GetComponent(117)),
        (this.PropComp = this.Entity.GetComponent(115)),
        (this.Ppn = this.Entity.GetComponent(142)),
        (this.Spn = this.zht.ControllerId),
        this.Spn !== INVALID_ID &&
          this.zht.IsShowingHandFx &&
          this.lvn(this.Spn, !0),
        (this.rBn = this.zht.AutonomousId),
        this.rBn !== INVALID_ID
          ? ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              this.Spn,
            ).Entity.GetComponent(3)),
            this.ActorComp.SetAutonomous(t.IsRoleAndCtrlByMe),
            this.Entity.GetComponent(142)?.TryEnable())
          : this.Entity.GetComponent(142)?.TryDisable(
              "[SceneItemManipulatableComponent.OnStart] AutonomousId === INVALID_CONTROL_ID",
            ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
          this.rvn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
          this.svn,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnManipulateCancelChanting,
          this.zpn,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SceneItem", 32, "[电池] OnStart", [
            "State",
            this.Snn.GetTagNames(),
          ]),
        this._vn(),
        this.uvn(),
        this.TryDisableTick(
          "[SceneItemManipulatableComponent.OnStart] 默认Disable",
        ),
        !0
      );
    }
    OnActivate() {
      !Info_1.Info.EnableForceTick &&
        this.Active &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        );
    }
    uvn() {
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Config.BaseCfg.CommonConfig,
        UE.BP_TeleControlConfig_C,
        (t) => {
          if (t?.IsValid()) {
            (this.gpn = !0), (this.ManipulateBaseConfig = t);
            this.Entity.GetComponent(106).SetLogicRange(
              this.ManipulateBaseConfig.被感知范围,
            ),
              (this.IsHoldingUsePhysics =
                this.ManipulateBaseConfig.控物保持使用物理);
            var t = this.ActorComp.GetPrimitiveComponent(),
              e = this.ManipulateBaseConfig.物体质量,
              e =
                (0 <= e &&
                  t.SetMassOverrideInKg(FNameUtil_1.FNameUtil.NONE, e, !0),
                t.SetLinearDamping(this.ManipulateBaseConfig.物体线性阻尼),
                t.SetAngularDamping(this.ManipulateBaseConfig.物体角速度阻尼),
                this.Config.ThrowCfg.MotionConfig),
              t =
                (e.Type === IComponent_1.EThrowMotion.Projectile &&
                  (e.MatchSpeedCurve?.SpeedCurve &&
                    ResourceSystem_1.ResourceSystem.LoadAsync(
                      e.MatchSpeedCurve.SpeedCurve,
                      UE.CurveFloat,
                      (t) => {
                        this.CastCurve = t;
                      },
                    ),
                  StringUtils_1.StringUtils.IsEmpty(e.CameraShake) ||
                    ResourceSystem_1.ResourceSystem.LoadAsync(
                      e.CameraShake + "_C",
                      UE.Class,
                      (t) => {
                        this.Mpn = t;
                      },
                    )),
                (this.fpn = this.ManipulateBaseConfig.读条震屏),
                (this.vpn = this.ManipulateBaseConfig.吸取飞行震屏),
                (this.ppn = this.ManipulateBaseConfig.控物保持震屏),
                (this.ConfigHoldOffset = this.ManipulateBaseConfig.一级偏移),
                (this.ConfigAssistantHoldOffset =
                  this.ManipulateBaseConfig.二级偏移),
                this.ManipulateBaseConfig.旋转),
              e =
                ((this.ConfigHoldRotator = new UE.Rotator(t.Y, t.Z, t.X)),
                (this.wpn = void 0),
                (this.ResetState =
                  new SceneItemManipulableResetState_1.SceneItemManipulableResetState(
                    this,
                  )),
                (this.ChantState =
                  new SceneItemManipulableChantState_1.SceneItemManipulableChantState(
                    this,
                    this.fpn,
                    this.ManipulateBaseConfig.读条镜头,
                  )),
                (this.DrawState =
                  new SceneItemManipulableDrawState_1.SceneItemManipulableDrawState(
                    this,
                    this.vpn,
                    this.ManipulateBaseConfig.吸取飞行镜头,
                  )),
                (this.HoldState =
                  new SceneItemManipulableHoldState_1.SceneItemManipulableHoldState(
                    this,
                    this.ppn,
                    this.ManipulateBaseConfig.控物保持镜头,
                    this.ManipulateBaseConfig.控物保持标签,
                  )),
                (this.PrecastState =
                  new SceneItemManipulablePrecastState_1.SceneItemManipulablePrecastState(
                    this,
                  )),
                this.Config.ThrowCfg.MotionConfig.Type);
            switch (e) {
              case IComponent_1.EThrowMotion.Projectile:
                (this.CastToTargetState =
                  new SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState(
                    this,
                    this.Mpn,
                  )),
                  (this.CastToOutletState =
                    new SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState(
                      this,
                      this.Mpn,
                    )),
                  (this.CastFreeState =
                    new SceneItemManipulableCastFreeState_1.SceneItemManipulableCastFreeState(
                      this,
                      this.Mpn,
                    )),
                  (this.CastProjectileState =
                    new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(
                      this,
                      void 0,
                    ));
                break;
              case IComponent_1.EThrowMotion.Circumnutation:
                var i =
                  new SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState(
                    this,
                    this.Mpn,
                  );
                (this.CastToTargetState = i),
                  (this.CastToOutletState = i),
                  (this.CastFreeState = i),
                  (this.CastProjectileState =
                    new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(
                      this,
                      void 0,
                    ));
                break;
              case IComponent_1.EThrowMotion.TrackTarget:
                (this.CastToTargetState =
                  new SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState(
                    this,
                    this.Mpn,
                  )),
                  (this.CastToOutletState =
                    new SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState(
                      this,
                      this.Mpn,
                    )),
                  (this.CastFreeState =
                    new SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState(
                      this,
                      this.Mpn,
                    )),
                  (this.CastProjectileState =
                    new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(
                      this,
                      void 0,
                    ));
            }
            this.Entity.GetComponent(122)?.Valid
              ? (this.MatchOutletState =
                  new SceneItemManipulableMatchJigsawBaseState_1.SceneItemManipulableMatchJigsawBaseState(
                    this,
                  ))
              : (this.MatchOutletState =
                  new SceneItemManipulableMatchOutletState_1.SceneItemManipulableMatchOutletState(
                    this,
                  )),
              (this.DropState =
                new SceneItemManipulableDropState_1.SceneItemManipulableDropState(
                  this,
                )),
              this.Gpn &&
                this.DropState.SetEnterCallback(() => {
                  this.Ypn();
                }),
              (this.CurrentState = this.ResetState),
              this.avn(),
              this.cvn();
            t = this.Config.BulletCfg?.CreateConditions;
            if (t)
              for (const s of t)
                switch (s.Type) {
                  case IComponent_1.EBulletCreateCondition.OnHit:
                    (this.Bpn = String(s.BulletId)),
                      EventSystem_1.EventSystem.AddWithTarget(
                        this,
                        EventDefine_1.EEventName.OnSceneItemHit,
                        this.$pn,
                      );
                    break;
                  case IComponent_1.EBulletCreateCondition.OnMatching:
                    this.CastToOutletState.SetFinishCallback(() => {
                      var t =
                        Global_1.Global.BaseCharacter.CharacterActorComponent
                          .Entity;
                      this.szo(t, String(s.BulletId)), this.qpn && this.Ypn();
                    });
                    break;
                  case IComponent_1.EBulletCreateCondition.OnCollision:
                    (this.Opn = s.BulletId),
                      this.CastFreeState.SetHitCallback(this.Jpn),
                      this.CastToOutletState.SetHitCallback(this.Jpn),
                      this.CastToTargetState.SetHitCallback(this.Jpn),
                      this.CastProjectileState.SetHitCallback(this.Jpn),
                      s.TriggerCount &&
                        ((this.Fpn = s.TriggerCount.TriggerCount),
                        (this.Vpn =
                          s.TriggerCount.TriggerInterval *
                          TimeUtil_1.TimeUtil.InverseMillisecond),
                        this.HoldState.SetEnterCallback(() => {
                          (this.bpn = 0), (this.Hpn = 0);
                        }));
                    break;
                  case IComponent_1.EBulletCreateCondition.OnThrowTriggerTime:
                    this.CastFreeState.SetEnterCallback(() => {
                      this.R_n = TimerSystem_1.TimerSystem.Delay(() => {
                        var t =
                          Global_1.Global.BaseCharacter.CharacterActorComponent
                            .Entity;
                        this.szo(t, String(s.BulletId)), this.qpn && this.Ypn();
                      }, s.TriggerTime * TimeUtil_1.TimeUtil.InverseMillisecond);
                    }),
                      this.CastProjectileState.SetEnterCallback(() => {
                        this.R_n = TimerSystem_1.TimerSystem.Delay(() => {
                          var t =
                            Global_1.Global.BaseCharacter
                              .CharacterActorComponent.Entity;
                          this.szo(t, String(s.BulletId)),
                            this.qpn && this.Ypn();
                        }, s.TriggerTime * TimeUtil_1.TimeUtil.InverseMillisecond);
                      });
                }
          }
        },
      );
    }
    avn() {
      var t = this.Entity.GetComponent(122);
      this.ypn ||
        void 0 === this.MatchOutletState ||
        (t?.Valid && void 0 === this.PutIndex) ||
        ((this.ActivatedOutlet = void 0),
        this.zht.RelationId &&
          ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.zht.RelationId,
          ))?.IsInit
            ? (this.Qpn(t, this.zht.PbRelationMatchCfgIndex), this.Xpn(t))
            : EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.Kpn,
              )),
        (this.ypn = !0));
    }
    cvn() {
      var t,
        e = this.Entity.GetComponent(110);
      this.FinishCheckInitAttach ||
        (e && this.CurrentState === this.ResetState
          ? (((t =
              new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
              2),
            (t.PosAttachOffset = this.zht.PbDynAttachRelPos),
            (t.PosAbsolute = !1),
            (t.RotAttachType = 2),
            (t.RotAttachOffset = this.zht.PbDynAttachRelRot),
            (t.RotAbsolute = !1),
            this.zht.PbDynAttachEntityConfigId
              ? e.RegEntityTarget(
                  this.zht.PbDynAttachEntityConfigId,
                  this.zht.PbDynAttachEntityActorKey,
                  t,
                  "[ManipulatableComp] CheckInitAttach",
                )
              : this.zht.PbDynAttachRefActorKey?.length &&
                e.RegRefActorTarget(
                  this.zht.PbDynAttachRefActorKey,
                  t,
                  "[ManipulatableComp] CheckInitAttach",
                ),
            (this.FinishCheckInitAttach = !0),
            (this.EnableDynamicAttach = !0),
            e.IsRegTarget() || this.TryReqAttachToFloor())
          : ((this.FinishCheckInitAttach = !0),
            (this.EnableDynamicAttach = !0)));
    }
    OnForceTick(t) {
      this.cjr(t);
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.cjr,
        );
    }
    OnDisable(t) {
      Info_1.Info.EnableForceTick ||
        ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
          this,
        );
    }
    OnEnd() {
      if (
        (this.TryDisableTick(
          "[SceneItemManipulatableComponent.OnEnd] 重置数据",
        ),
        (this.EnableDynamicAttach = !1),
        (this.CurrentState = this.ResetState),
        this.ActivatedOutlet &&
          ((this.ActivatedOutlet.EntityInSocket = void 0),
          (this.ActivatedOutlet.MatchCfgIndex = void 0),
          (this.ActivatedOutlet = void 0)),
        this.NeedRemoveControllerId && this.ovn(),
        this.Spn !== INVALID_ID && this.lvn(this.Spn, !1),
        void 0 !== this.R_n &&
          (TimerSystem_1.TimerSystem.Remove(this.R_n), (this.R_n = void 0)),
        this.ActorComp?.Owner?.OnActorHit?.Clear(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
          this.rvn,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
          this.svn,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnManipulateCancelChanting,
          this.zpn,
        ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.Kpn,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.Kpn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.azr,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterPresentationInitRange,
            this.azr,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHit,
          this.$pn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHit,
            this.$pn,
          ),
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        this.xpn)
      ) {
        const t = this.xpn;
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put(t);
        });
      }
      return this.ClearCastDestroyTimer(), !0;
    }
    BePopupFormOutlet() {
      (this.IsCanBeHeld = !1),
        (this.ActorComp.PhysicsMode = 3),
        (this.CurrentState = this.CastFreeState),
        (this.ActivatedOutlet.EntityInSocket = void 0),
        (this.ActivatedOutlet.MatchCfgIndex = void 0),
        (this.ActivatedOutlet = void 0),
        (this.MatchSequence = void 0),
        this.TryEnableTick();
    }
    szo(t, e) {
      !this.Entity?.Valid ||
        this.bpn >= this.Fpn ||
        (0 < this.bpn && this.Hpn < this.Vpn) ||
        ((this.Hpn = 0),
        this.bpn++,
        BulletController_1.BulletController.CreateBulletCustomTarget(
          t,
          e,
          this.ActorComp.ActorTransform,
          {},
          this.jDn,
        ));
    }
    mvn(t) {
      "MatchingOutlet" === this.State &&
        ((this.TargetActorComponent = void 0),
        (this.TargetOutletComponent = void 0),
        (this.ActivatedOutlet = t.GetComponent(145)),
        this.ActorComp?.Valid) &&
        (this.ActorComp.PhysicsMode = 0);
    }
    dvn(i, s) {
      this.Ppn.ForceSendPendingMoveInfos();
      var t = i.GetComponent(0).GetCreatureDataId(),
        e = this.zht.GetCreatureDataId(),
        h = Protocol_1.Aki.Protocol.M1s.create(),
        t =
          ((h.rkn = MathUtils_1.MathUtils.NumberToLong(t)),
          (h.E7n = MathUtils_1.MathUtils.NumberToLong(e)),
          (h.y7n = s ? 1 : 0),
          Protocol_1.Aki.Protocol.VBs.create()),
        e = this.ActorComp.ActorLocationProxy,
        e =
          ((t.X = e.X),
          (t.Y = e.Y),
          (t.Z = e.Z),
          Protocol_1.Aki.Protocol.iws.create()),
        a = this.ActorComp.ActorRotationProxy;
      (e.Pitch = a.Pitch),
        (e.Roll = a.Roll),
        (e.Yaw = a.Yaw),
        (h.M3n = t),
        (h.S3n = e),
        Net_1.Net.Call(9907, h, (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              32,
              "[Manipulate] Match outlet net response!",
              ["active", t.y7n],
            );
          var e = i.GetComponent(145);
          s && e.OnPutDownItem(this.Entity),
            t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.lkn,
                  6430,
                )
              : s &&
                (this.ManipulateBaseConfig?.被控制CD &&
                  0 < this.ManipulateBaseConfig?.被控制CD &&
                  ((this.Ipn = !0),
                  (this.Tpn = TimerSystem_1.TimerSystem.Delay(() => {
                    (this.Ipn = !1), (this.Tpn = void 0);
                  }, this.ManipulateBaseConfig.被控制CD * TimeUtil_1.TimeUtil.InverseMillisecond))),
                1 === t.y7n
                  ? ((this.CurrentState = this.MatchOutletState), this.mvn(i))
                  : (this.CurrentState = this.DropState));
        });
    }
    TryPlayMismatchSequence(t) {
      var e,
        i,
        t = t.GetComponent(145),
        s = t.GetMismatchSequence(this.Entity);
      void 0 !== s &&
        t?.Valid &&
        ((this.PlayingMatchSequence = !0),
        void 0 === this.xpn && this.Cvn(),
        (t = this.xpn.DefaultInstanceData),
        (e = this.ActorComp.ActorLocationProxy),
        (i = this.ActorComp.ActorRotationProxy),
        (i = Transform_1.Transform.Create(
          i.Quaternion(void 0),
          e,
          Vector_1.Vector.OneVectorProxy,
        )),
        (t.TransformOrigin = i.ToUeTransform()),
        this.xpn) &&
        ((this.IsCanBeHeld = !1),
        (this.NeedRemoveControllerId = !0),
        this.gvn(s));
    }
    ShouldPlayMismatchSequence(t) {
      t = t.GetComponent(145);
      return !(void 0 === t.GetMismatchSequence(this.Entity) || !t?.Valid);
    }
    gvn(t) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, (t) => {
        this.BePopupFormOutlet(),
          this.xpn.SetActorTickEnabled(!0),
          this.xpn.SetSequence(t),
          this.fvn(!1, () => {
            this.PlayingMatchSequence = !1;
          });
      });
    }
    ResetItemLocationAndRotation(t = 0, e = !1) {
      this.TryDisableTick(
        "[SceneItemManipulatableComponent.ResetItemLocationAndRotation]",
      ),
        (this.CurrentState = this.ResetState),
        this.ActorComp?.Owner?.OnActorHit.Clear();
      var i = new UE.Transform(),
        s =
          (i.SetLocation(this.ActorComp.ActorLocation),
          EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            i,
            ConfigManager_1.ConfigManager.ManipulateConfig
              .ItemDisappearEffectPath,
            "[SceneItemManipulatableComponent.ResetItemLocationAndRotation]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          ),
          this.zht.GetPbEntityInitData()),
        h = s.Transform.Pos,
        s = s.Transform.Rot,
        h = Vector_1.Vector.Create(h?.X ?? 0, h?.Y ?? 0, h?.Z ?? 0),
        s = Rotator_1.Rotator.Create(s?.Y ?? 0, s?.Z ?? 0, s?.X ?? 0),
        h =
          (this.ActorComp.SetActorLocationAndRotation(
            h.ToUeVector(),
            s.ToUeRotator(),
          ),
          (0, puerts_1.$ref)(void 0)),
        s = (0, puerts_1.$ref)(void 0),
        s =
          (SceneInteractionManager_1.SceneInteractionManager.Get()
            .GetMainCollisionActor(
              this.ActorComp.GetSceneInteractionLevelHandleId(),
            )
            .GetActorBounds(!1, h, s),
          i.SetLocation((0, puerts_1.$unref)(h)),
          EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            i,
            ConfigManager_1.ConfigManager.ManipulateConfig.PushEffectPath,
            "[SceneItemManipulatableComponent.ResetItemLocationAndRotation]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          ),
          this.DropState?.SetEnterCallback(void 0),
          (this.ActorComp.PhysicsMode = 0),
          this.ActorComp.GetPrimitiveComponent());
      s.SetPhysicsLinearVelocity(new UE.Vector(0, 0, 0)),
        s.SetPhysicsAngularVelocityInDegrees(new UE.Vector(0, 0, 0)),
        this.R_n &&
          (TimerSystem_1.TimerSystem.Remove(this.R_n), (this.R_n = void 0)),
        (this.IsCanBeHeld = !0),
        (this.Ipn = !1),
        this.Tpn &&
          (TimerSystem_1.TimerSystem.Remove(this.Tpn), (this.Tpn = void 0)),
        this.NeedRemoveControllerId && this.ovn(),
        this.nvn(),
        e &&
          (((h = Protocol_1.Aki.Protocol.l_s.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(this.zht.GetCreatureDataId())),
          (h.I7n = MathUtils_1.MathUtils.NumberToLong(t)),
          Net_1.Net.Call(17308, h, (t) => {
            switch (t.lkn) {
              case Protocol_1.Aki.Protocol.lkn.Sys:
              case Protocol_1.Aki.Protocol.lkn
                .Proto_ErrBeControlledEntityNotExist:
                break;
              default:
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.lkn,
                  6430,
                );
            }
          })),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatedItemPosReset,
        );
    }
    nvn() {
      (this.MatchSequence = void 0),
        this.ActivatedOutlet &&
          ((this.ActivatedOutlet.EntityInSocket = void 0),
          (this.ActivatedOutlet.MatchCfgIndex = void 0),
          (this.ActivatedOutlet = void 0));
    }
    _vn() {
      let t = void 0;
      this.Snn.HasTag(-1660917319)
        ? (t = -938118674)
        : this.Snn.HasTag(-1611484717) && (t = 1926099076),
        t && this.Snn.AddTag(t);
    }
    CalcCastTargetPoint() {
      void 0 !== this.MatchSequence && (this.MatchSequence = void 0),
        (this.TargetOutletComponent ?? this.ActivatedOutlet) &&
          ((t = (
            this.TargetOutletComponent ?? this.ActivatedOutlet
          ).GetMatchSequence(this.Entity)),
          StringUtils_1.StringUtils.IsEmpty(t) || (this.MatchSequence = t));
      var t =
          ModelManager_1.ModelManager.ManipulaterModel.GetTargetPartLocation(),
        e = this.TargetActorComponent?.Entity.GetComponent(132);
      let i = Vector_1.Vector.Create();
      (i = this.TargetOutletComponent?.Valid
        ? this.TargetActorComponent.Entity.GetComponent(121)?.Valid
          ? this.TargetOutletComponent.GetCurrentLockLocation()
          : this.TargetOutletComponent.GetSocketLocation(this.Entity)
        : e?.Valid
          ? e.GetHitPoint()
          : t !== Vector_1.Vector.ZeroVectorProxy
            ? t
            : this.TargetActorComponent.ActorLocationProxy),
        (this.CastTargetLocation = i);
    }
    CalcCastTargetPointWithEntity(t) {
      var e = t.GetComponent(1),
        t = t.GetComponent(145);
      return t
        ? t.GetSocketLocation(this.Entity)
        : Vector_1.Vector.Create(e.ActorLocationProxy);
    }
    GetDrawStartLocation() {
      return this.MatchSequence
        ? this.CastTargetLocation
        : this.ActorComp.ActorLocationProxy;
    }
    TryEnableTick(t = !1) {
      (this.Dpn = !1),
        (this.Rpn = !1),
        (this.Apn = !1),
        (this.Upn = !1),
        (this.kpn = 0),
        (this.Epn = !1),
        void 0 !== this.Uxr &&
          (this.Enable(
            this.Uxr,
            "SceneItemManipulatableComponent.TryEnableTick",
          ),
          t) &&
          3 !== this.ActorComp.PhysicsMode &&
          ((this.ActorComp.PhysicsMode = 3),
          this.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
            Vector_1.Vector.OneVector.op_Multiply(0.1),
          )),
        (this.Uxr = void 0),
        this.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
          Vector_1.Vector.ZeroVector,
          !1,
        );
    }
    TryDisableTick(t) {
      void 0 === this.Uxr &&
        ((this.Uxr = this.Disable(t)), 0 !== this.ActorComp.PhysicsMode) &&
        (this.ActorComp.PhysicsMode = 0);
    }
    Zpn(t) {
      switch (this.State) {
        case "BeCastingToTarget":
        case "BeCastingToOutlet":
        case "BeCastingFree":
          this.CurrentState.Tick(0.001 * t);
          break;
        default:
          this.Dpn = !0;
      }
    }
    evn() {
      var t;
      this.ForceMoving ||
        ((t = this.ActorComp.GetPrimitiveComponent())
          .GetPhysicsLinearVelocity()
          .Equals(
            Vector_1.Vector.ZeroVector,
            MathUtils_1.MathUtils.SmallNumber,
          ) &&
          t
            .GetPhysicsAngularVelocity()
            .Equals(
              Vector_1.Vector.ZeroVector,
              MathUtils_1.MathUtils.SmallNumber,
            ) &&
          this.ActorComp.ActorLocationProxy.Equals(this.Xrr) &&
          this.ActorComp.ActorRotationProxy.Equals(this.ijr) &&
          (("BeCastingFree" !== this.State && "BeDropping" !== this.State) ||
            (this.CurrentState = this.ResetState),
          (this.Rpn = !0)));
    }
    tvn() {
      var t, e, i;
      this.PlayingMatchSequence ||
        ((0 === this.ActorComp.PhysicsMode ||
          (([t, i] = this.ActorComp.CheckGoundWithBox()), void 0 === i) ||
          (t &&
            i.bBlockingHit &&
            ((t = Vector_1.Vector.Create()),
            (e = this.ActorComp.Origin),
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, t),
            (i = e.Z - t.Z - this.ActorComp.Extent.Z) < ON_GROUND_OFFSET) &&
            0 < i)) &&
          (this.Apn = !0));
    }
    ivn(t) {
      var e, i, s;
      this.PlayingMatchSequence ||
        (3 === this.ActorComp.PhysicsMode &&
          ((e = Vector_1.Vector.Create(this.Xrr)),
          this.ActorComp.ActorLocationProxy.Subtraction(e, e),
          (e = e.Size()),
          (e /= t * TimeUtil_1.TimeUtil.Millisecond),
          (i = Vector_1.Vector.Create()),
          (s = Vector_1.Vector.Create()),
          this.ActorComp.ActorRotationProxy.Vector(s),
          this.ijr.Vector(i),
          i.Subtraction(s, i),
          (s = i.Size()),
          (s /= t * TimeUtil_1.TimeUtil.Millisecond),
          this.ManipulateBaseConfig.打开速度Log &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 32, "[Manipulate] 速度", ["size", e]),
          e < this.ManipulateBaseConfig.可再被控速度最小值 && (this.Epn = !0),
          e < MIN_VELOCITY && 0 == s
            ? (this.kpn++,
              this.kpn > ZERO_VELOCITY_FRAME_NUM &&
                (this.ActorComp.PhysicsMode = 0))
            : (this.kpn = 0)),
        0 === this.ActorComp.PhysicsMode && (this.Upn = !0));
    }
    ovn() {
      var t, e;
      this.Spn === INVALID_ID
        ? (this.IsCanBeHeld = !0)
        : ((t = this.zht?.GetCreatureDataId()),
          ((e = Protocol_1.Aki.Protocol.y1s.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(t)),
          (e.W9n = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              32,
              "[Manipulate] RequestRemoveControllerId",
              ["location", this.ActorComp?.ActorLocationProxy],
              ["id", this.zht?.GetPbDataId()],
            ),
          (this.IsRequestingRemoveControllerId = !0),
          Net_1.Net.Call(19086, e, (t) => {
            switch (((this.IsRequestingRemoveControllerId = !1), t.lkn)) {
              case Protocol_1.Aki.Protocol.lkn.Sys:
                (this.NeedRemoveControllerId = !1), (this.IsCanBeHeld = !0);
                break;
              case Protocol_1.Aki.Protocol.lkn
                .Proto_ErrBeControlledEntityNotExist:
              case Protocol_1.Aki.Protocol.lkn
                .Proto_ErrNotBeControlledNotPlayer:
                this.IsCanBeHeld = !0;
                break;
              default:
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.lkn,
                  6430,
                );
            }
          }));
    }
    oBn() {
      var t, e;
      this.rBn === INVALID_ID ||
      this.rBn !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
        ? (this.IsCanBeHeld = !0)
        : ((t = this.zht?.GetCreatureDataId()),
          ((e = Protocol_1.Aki.Protocol.vms.create()).rkn =
            MathUtils_1.MathUtils.NumberToLong(t)),
          (e.W9n = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              32,
              "[Manipulate] RequestRemoveAutonomousId",
              ["location", this.ActorComp?.ActorLocationProxy],
              ["id", this.zht?.GetPbDataId()],
            ),
          (this.IsRequestingRemoveAutonomousId = !0),
          Net_1.Net.Call(6535, e, (t) => {
            switch (
              ((this.IsRequestingRemoveAutonomousId = !1),
              (this.IsCanBeHeld = !0),
              t.lkn)
            ) {
              case Protocol_1.Aki.Protocol.lkn.Sys:
              case Protocol_1.Aki.Protocol.lkn
                .Proto_ErrBeControlledEntityNotExist:
                break;
              default:
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.lkn,
                  3946,
                );
            }
          }));
    }
    lvn(t, e) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
      t?.Valid &&
        ((t = t.Entity.GetComponent(55)),
        e ? t.ActiveHandFX(this.Entity) : t.DeactiveHandFx());
    }
    get CurrentState() {
      return this.wpn;
    }
    set CurrentState(t) {
      var e;
      this.wpn !== t &&
        ((e = this.State),
        this.wpn?.Exit(),
        (this.wpn = t),
        this.wpn?.Enter(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableItemStateModified,
          e,
          this.State,
        ));
    }
    RequestAttachToOutlet() {
      this.dvn(this.ActivatedOutlet.Entity, !0);
    }
    ClearAttachOutletInfo() {
      (this.ActivatedOutlet.EntityInSocket = void 0),
        (this.ActivatedOutlet.MatchCfgIndex = void 0),
        (this.ActivatedOutlet = void 0);
    }
    Cvn() {
      void 0 === this.xpn &&
        ((this.xpn = ActorSystem_1.ActorSystem.Get(
          UE.LevelSequenceActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0,
          !1,
        )),
        (this.xpn.bOverrideInstanceData = !0));
    }
    PlayMatchSequence(e, i) {
      var t, s;
      StringUtils_1.StringUtils.IsEmpty(this.MatchSequence) ||
        (void 0 === this.xpn && this.Cvn(),
        (t = this.xpn.DefaultInstanceData),
        (s = this.ActorComp.ActorTransform).SetLocation(
          this.CastTargetLocation.ToUeVector(),
        ),
        (t.TransformOrigin = s),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.MatchSequence,
          UE.LevelSequence,
          (t) => {
            this.xpn.SetActorTickEnabled(!0),
              this.xpn.SetSequence(t),
              this.fvn(i, e);
          },
        ));
    }
    fvn(t, e) {
      this.xpn.AddBindingByTag(BINDING_TAG, this.ActorComp.Owner),
        this.xpn.SequencePlayer.IsValid() &&
          (this.xpn.SequencePlayer.SetPlayRate(1),
          this.xpn.SequencePlayer.OnFinished.Clear(),
          t
            ? this.xpn.SequencePlayer.PlayReverse()
            : this.xpn.SequencePlayer.Play(),
          this.xpn.SequencePlayer.OnFinished.Add(e),
          this.xpn.SequencePlayer.OnFinished.Add(() => {
            this.xpn.RemoveBindingByTag(BINDING_TAG, this.ActorComp.Owner);
          }));
    }
    StopSequence() {
      this.xpn?.SequencePlayer?.IsPlaying &&
        (this.xpn.SequencePlayer.Stop(),
        (this.PlayingMatchSequence = !1),
        this.xpn.RemoveBindingByTag(BINDING_TAG, this.ActorComp.Owner));
    }
    Ypn() {
      var t = this.zht?.GetCreatureDataId(),
        e = Protocol_1.Aki.Protocol.r_s.create();
      (e.rkn = MathUtils_1.MathUtils.NumberToLong(t)),
        Net_1.Net.Call(10407, e, (t) => {
          switch (t.lkn) {
            case Protocol_1.Aki.Protocol.lkn.Sys:
            case Protocol_1.Aki.Protocol.lkn
              .Proto_ErrBeControlledEntityNotExist:
              this.R_n &&
                (TimerSystem_1.TimerSystem.Remove(this.R_n),
                (this.R_n = void 0));
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.lkn,
                6955,
              );
          }
        });
    }
    OnCastItem() {
      var t;
      this.Npn &&
        ((t = this.Config.DestroyCfg.Conditions.filter(
          (t) => t.Type === IComponent_1.ETeleControlDestroyCondition.Throw,
        )[0]),
        (this.BCe = TimerSystem_1.TimerSystem.Delay(() => {
          this.Ypn();
        }, t.DelayTime * TimeUtil_1.TimeUtil.InverseMillisecond)));
    }
    ClearCastDestroyTimer() {
      void 0 !== this.BCe &&
        (TimerSystem_1.TimerSystem.Remove(this.BCe), (this.BCe = void 0));
    }
    TryAddTagById(t) {
      this.Snn.HasTag(t) || this.Snn.AddTag(t);
    }
    TryRemoveTagById(t) {
      this.Snn.HasTag(t) && this.Snn.RemoveTag(t);
    }
    ForceStopDropping() {
      if ("BeDropping" === this.State && this.NeedRemoveControllerId) {
        const e = this.ActorComp.GetPrimitiveComponent();
        if (
          (e.SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector),
          e.SetPhysicsAngularVelocity(Vector_1.Vector.ZeroVector),
          !FNameUtil_1.FNameUtil.IsNothing(
            this.ManipulateBaseConfig.待机状态碰撞预设,
          ))
        ) {
          const e = this.ActorComp.GetPrimitiveComponent();
          e.SetCollisionProfileName(this.ManipulateBaseConfig.待机状态碰撞预设);
        }
        var t = this.ActorComp.Owner?.GetComponentByClass(
          UE.ActorComponent.StaticClass(),
        );
        t?.IsValid() && (t.bEnableAutoPhysicsSplit = !0),
          0 !== this.ActorComp.PhysicsMode && (this.ActorComp.PhysicsMode = 0),
          (this.IsCanBeHeld = !1),
          (this.Lpn = !0);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[SceneItemManipulatableComponent.ForceStopDropping] 尝试强停物理掉落时，被控物不处于脱手掉落状态，返回",
            ["State", this.State],
            ["NeedRemoveControllerId", this.NeedRemoveControllerId],
            ["PbDataId", this.zht?.GetPbDataId()],
          );
    }
    TryAddSpecLockTag() {
      var t;
      this.Entity.GetComponent(122) &&
        ((t = void 0 !== this.ActivatedOutlet ? 2142861976 : -628734864),
        this.Snn.HasTag(t) || this.Snn.AddTag(t));
    }
    TryRemoveSpecLockTag() {
      var t;
      this.Entity.GetComponent(122) &&
        (this.Snn.HasTag((t = 2142861976)) && this.Snn.RemoveTag(t),
        this.Snn.HasTag((t = -628734864))) &&
        this.Snn.RemoveTag(t);
    }
    TryReqAttachToFloor() {
      var t = this.Entity.GetComponent(110);
      if (
        t &&
        this.ActorComp?.Owner?.IsValid() &&
        this.ActorComp.GetIsSceneInteractionLoadCompleted() &&
        !t.IsRegTarget()
      ) {
        var e,
          i,
          s,
          h = this.pvn(0, -5);
        if (h)
          return (
            ([s, i] = this.vvn(h)),
            s?.IsValid() && i
              ? i.length <= 0
                ? void 0
                : ((s = s),
                  this.ActorComp.ResetAllCachedTime(),
                  (e = (s = this.ActorComp.ActorTransform.GetRelativeTransform(
                    s.GetTransform(),
                  )).GetLocation()),
                  (s = s.Rotator()),
                  void t.RequestAttachRefActor(i, e, s))
              : (([i, e] = this.Mvn(h)),
                void (
                  i &&
                  ((s = i.GetComponent(182)),
                  (i = i.GetComponent(0).GetPbDataId()),
                  s) &&
                  i &&
                  ((h = e ? h : s.Owner),
                  this.ActorComp.ResetAllCachedTime(),
                  (h = (s = this.ActorComp.ActorTransform.GetRelativeTransform(
                    h.GetTransform(),
                  )).GetLocation()),
                  (s = s.Rotator()),
                  t.RequestAttachEntity(i, e, h, s))
                ))
          );
      }
    }
    pvn(e, i) {
      if (this.ActorComp) {
        var s =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.ActorComp.GetSceneInteractionLevelHandleId(),
          );
        if (s?.IsValid) {
          var h = s.K2_GetActorRotation(),
            a = (0, puerts_1.$ref)(void 0),
            o = (0, puerts_1.$ref)(void 0),
            s =
              (s.GetActorBounds(!1, a, void 0),
              s.K2_SetActorRotation(new UE.Rotator(0, 0, 0), !1),
              s.GetActorBounds(!1, void 0, o),
              s.K2_SetActorRotation(h, !1),
              MathUtils_1.MathUtils.CommonTempVector),
            a =
              (s.FromUeVector((0, puerts_1.$unref)(a)),
              ModelManager_1.ModelManager.TraceElementModel
                .CommonStartLocation),
            n = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation,
            r =
              (a.Set(s.X, s.Y, s.Z + e),
              n.Set(s.X, s.Y, s.Z + i),
              ModelManager_1.ModelManager.TraceElementModel.ClearBoxTrace(),
              ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace()),
            l =
              ((r.WorldContextObject = this.ActorComp.Owner),
              (r.bIsSingle = !0),
              r.ActorsToIgnore.Empty(),
              SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(
                this.ActorComp.GetSceneInteractionLevelHandleId(),
              ));
          for (let t = 0; t < l.Num(); t++) r.ActorsToIgnore.Add(l.Get(t));
          r.bIgnoreSelf = !0;
          (e = MathUtils_1.MathUtils.CommonTempVector),
            (s =
              (e.FromUeVector((0, puerts_1.$unref)(o)),
              (r.HalfSizeX = e.X),
              (r.HalfSizeY = e.Y),
              (r.HalfSizeZ = e.Z),
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, a),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, n),
              TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(r, h),
              TraceElementCommon_1.TraceElementCommon.BoxTrace(
                r,
                "TraceFindFloorActor",
              ))),
            (i = r.HitResult);
          let t = void 0;
          return (
            s &&
              i?.bBlockingHit &&
              0 < i.Actors.Num() &&
              (t = i.Actors.Get(0).RootComponent?.GetOwner()),
            r.ClearCacheData(),
            ModelManager_1.ModelManager.TraceElementModel.ClearBoxTrace(),
            t
          );
        }
      }
    }
    vvn(t) {
      if (t.IsValid()) {
        var e = UE.KismetSystemLibrary.GetPathName(t),
          i = e.indexOf(".");
        if (0 <= i && i + 1 < e.length) {
          e = e.substring(i + 1);
          if (
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
              GlobalData_1.GlobalData.World,
              UE.KuroActorSubsystem.StaticClass(),
            ).GetActor(new UE.FName(e))
          )
            return [t, e];
          i = t.GetAttachRootParentActor();
          if (i && UE.KismetMathLibrary.NotEqual_ObjectObject(i, t))
            return this.vvn(i);
        }
      }
      return [void 0, void 0];
    }
    Mvn(e) {
      var t =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(e),
        i = t?.Entity?.GetComponent(182);
      if (!i?.Owner?.IsValid()) return [void 0, void 0];
      var s =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllKeyRefActors(
          i.GetSceneInteractionLevelHandleId(),
        );
      let h = void 0;
      var a = s?.Num();
      if (a)
        for (let t = 0; t < a; t++) {
          var o = s.GetKey(t);
          if (s.Get(o) === e) {
            h = o;
            break;
          }
        }
      return [t.Entity, h];
    }
  });
(SceneItemManipulatableComponent = SceneItemManipulatableComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(140)],
    SceneItemManipulatableComponent,
  )),
  (exports.SceneItemManipulatableComponent = SceneItemManipulatableComponent);
//# sourceMappingURL=SceneItemManipulatableComponent.js.map
