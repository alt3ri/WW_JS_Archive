"use strict";
var SceneItemManipulatableComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var h,
        a = arguments.length,
        n =
          a < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (h = t[o]) &&
            (n = (a < 3 ? h(n) : 3 < a ? h(e, i, n) : h(e, i)) || n);
      return 3 < a && n && Object.defineProperty(e, i, n), n;
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
        (this.$fn = !1),
        (this.ConfigHoldOffset = void 0),
        (this.ConfigHoldRotator = void 0),
        (this.ConfigMatchType = void 0),
        (this.State = "Reset"),
        (this.TargetActorComponent = void 0),
        (this.TargetOutletComponent = void 0),
        (this.ActorComp = void 0),
        (this.ActivatedOutlet = void 0),
        (this.jCn = void 0),
        (this.Wnr = void 0),
        (this.qHr = void 0),
        (this.inn = void 0),
        (this.Yfn = void 0),
        (this.Jfn = void 0),
        (this.zfn = void 0),
        (this.Zfn = void 0),
        (this.CastTargetLocation = void 0),
        (this.MatchSequence = void 0),
        (this.PlayingMatchSequence = !1),
        (this.PropComp = void 0),
        (this.CastCurve = void 0),
        (this.IsCanBeHeld = !0),
        (this.sxr = void 0),
        (this.JUn = void 0),
        (this.epn = 0),
        (this.fqn = 0),
        (this.NeedRemoveControllerId = !1),
        (this.IsRequestingRemoveControllerId = !1),
        (this.IsRequestingRemoveAutonomousId = !1),
        (this.tpn = !1),
        (this.ipn = !1),
        (this.FinishCheckInitAttach = !1),
        (this.EnableDynamicAttach = !1),
        (this.mBe = void 0),
        (this.opn = !1),
        (this.rpn = void 0),
        (this.npn = !1),
        (this.spn = !0),
        (this.apn = !0),
        (this.hpn = !0),
        (this.lpn = !0),
        (this.u1t = void 0),
        (this.Hfn = void 0),
        (this._pn = void 0),
        (this.upn = void 0),
        (this.UsingAssistantHoldOffset = !1),
        (this.ConfigAssistantHoldOffset = void 0),
        (this.MovementTargetLocation = void 0),
        (this.MovementTargetRotation = void 0),
        (this.ZOe = void 0),
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
        (this.cpn = ""),
        (this.mpn = 0),
        (this.dpn = !1),
        (this.Cpn = !1),
        (this.gpn = !1),
        (this.fpn = 0),
        (this.ppn = 0),
        (this.vpn = MAX_CREATE_BULLET_NUM),
        (this.Mpn = 0),
        (this.Epn = 0),
        (this.IsHoldingUsePhysics = !1),
        (this.ForceMoving = !1),
        (this.LastHoldingLocation = Vector_1.Vector.Create()),
        (this.BCe = void 0),
        (this.a_n = void 0),
        (this.YO = void 0),
        (this.Spn = void 0),
        (this.ypn = !1),
        (this.FJr = () => {
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterPresentationInitRange,
            this.FJr,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.Entity,
              EventDefine_1.EEventName.EnterPresentationInitRange,
              this.FJr,
            );
        }),
        (this.Ipn = (t, e, i) => {
          var s = e.Entity.GetComponent(0);
          this.u1t?.RelationId === s.GetPbDataId() &&
            (this.Tpn(e, this.u1t.PbRelationMatchCfgIndex),
            this.Lpn(e),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.AddEntity,
              this.Ipn,
            ));
        }),
        (this.Dpn = () => {
          var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
          this.oZo(t, this.cpn),
            EventSystem_1.EventSystem.RemoveWithTarget(
              this,
              EventDefine_1.EEventName.OnSceneItemHit,
              this.Dpn,
            ),
            this.dpn && this.Rpn();
        }),
        (this.Upn = (t, e) => {
          e !== Global_1.Global.BaseCharacter.CharacterActorComponent.Owner &&
            ((e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity),
            this.oZo(e, String(this.fpn)),
            this.dpn) &&
            this.Rpn();
        }),
        (this.Apn = () => {
          this.CurrentState === this.ChantState &&
            (this.CurrentState = this.ResetState);
        }),
        (this.KHr = (t) => {
          (this.Epn += t),
            this.spn || this.Ppn(t),
            this.apn || this.xpn(),
            this.hpn || this.wpn(),
            this.lpn || this.Bpn(t),
            this.Wnr.DeepCopy(this.ActorComp.ActorLocationProxy),
            this.qHr.DeepCopy(this.ActorComp.ActorRotationProxy),
            this.IsCanBeHeld ||
              !this.tpn ||
              this.opn ||
              (this.ManipulateBaseConfig?.被控制CD &&
              0 < this.ManipulateBaseConfig?.被控制CD
                ? ((this.opn = !0),
                  (this.rpn = TimerSystem_1.TimerSystem.Delay(() => {
                    (this.opn = !1),
                      (this.IsCanBeHeld = !0),
                      this.NeedRemoveControllerId &&
                        !this.IsRequestingRemoveControllerId &&
                        this.bpn(),
                      (this.rpn = void 0);
                  }, this.ManipulateBaseConfig.被控制CD * TimeUtil_1.TimeUtil.InverseMillisecond)))
                : ((this.IsCanBeHeld = !0),
                  this.NeedRemoveControllerId &&
                    !this.IsRequestingRemoveControllerId &&
                    this.bpn())),
            this.spn &&
              this.apn &&
              (this.npn || this.hpn) &&
              this.lpn &&
              ((this.npn = !1),
              this.TryDisableTick(
                "[SceneItemManipulatableComponent.OnTick] 没有被控制",
              ),
              this.ActorComp.ResetLocationCachedTime(),
              this._pn?.CollectSampleAndSend(!0),
              this.IsRequestingRemoveAutonomousId ||
                ((this.IsCanBeHeld = !1), this.pqn()));
        }),
        (this.gIe = (t, e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneItem", 32, "[电池] 改变状态", [
              "State",
              this.inn.GetTagNames(),
            ]),
            t.includes(-1611484717)
              ? TimerSystem_1.TimerSystem.Next(() => {
                  this.inn.RemoveTag(-938118674), this.inn.AddTag(1926099076);
                })
              : t.includes(-1660917319) &&
                TimerSystem_1.TimerSystem.Next(() => {
                  this.inn.RemoveTag(1926099076), this.inn.AddTag(-938118674);
                });
        }),
        (this.qpn = (t, e) => {
          0 !== t
            ? ((t =
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  t,
                )),
              this.Tpn(t, e))
            : this.Gpn();
        }),
        (this.Npn = (t, e) => {
          void 0 !== t && ((this.Spn = t), this.Opn(e));
        }),
        (this.kpn = (t) =>
          SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack(
            { Type: IComponent_1.EHitBulletType.PlayerAttack },
            t,
            this.Entity,
          ));
    }
    GetControllerId() {
      return this.epn;
    }
    SetControllerId(t) {
      (this.epn = t),
        (this.ActorComp.GetPrimitiveComponent().bCanCharacterStandOn =
          t === INVALID_ID);
    }
    GetAutonomousId() {
      return this.fqn;
    }
    SetAutonomousId(t) {
      this.fqn = t;
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
          !this.opn &&
          !this.PropComp?.IsLocked &&
          this.$fn
      );
    }
    get CanBeChant() {
      return "Reset" === this.State || "MatchingOutlet" === this.State;
    }
    get PutIndex() {
      return this.Spn;
    }
    get IsProjectileAimMode() {
      return this.ypn;
    }
    set IsProjectileAimMode(t) {
      (this.ypn = t),
        this.CurrentState === this.HoldState &&
          (this.ypn
            ? this.HoldState.EnterProjectileAimMode()
            : this.HoldState.ExitProjectileAimMode());
    }
    IsCanInteractType() {
      return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(
        this.Hfn,
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
          (this.u1t = this.Entity.GetComponent(0)),
          this.u1t.GetBaseInfo());
      (this.Hfn = t?.OnlineInteractType),
        (this.ConfigMatchType = t?.Category?.ControlMatchType),
        (this.CurrentState = this.ResetState),
        (this.jCn = Rotator_1.Rotator.Create()),
        (this.Wnr = Vector_1.Vector.Create()),
        (this.qHr = Rotator_1.Rotator.Create());
      this.Entity.GetComponent(140).AddComponentHitCondition(this, this.kpn);
      t = this.Config.DestroyCfg;
      if (t)
        for (const e of t.Conditions)
          switch (e.Type) {
            case IComponent_1.ETeleControlDestroyCondition.CreateBullet:
              this.dpn = !0;
              break;
            case IComponent_1.ETeleControlDestroyCondition.LetGo:
              this.Cpn = !0;
              break;
            case IComponent_1.ETeleControlDestroyCondition.Throw:
              this.gpn = !0;
          }
      t = this.u1t.ComponentDataMap.get("Mys");
      return (
        (this.JUn = MathUtils_1.MathUtils.LongToBigInt(t?.Mys?.tVn)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.FJr,
        ),
        !0
      );
    }
    OnClear() {
      return (
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHit,
          this.Dpn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHit,
            this.Dpn,
          ),
        !0
      );
    }
    Lpn(t) {
      var e = t.Entity.GetComponent(0),
        i = this.u1t.GetPbDataId();
      e.OccupiedGridInfo.has(i) &&
        ((e = e.OccupiedGridInfo.get(i)),
        ((i = this.Entity.GetComponent(124)).PutDownIndex =
          new SceneItemJigsawBaseComponent_1.JigsawIndex(e.e8n.R5n, e.e8n.P5n)),
        (i.Rotation = e.e8n.B5n),
        (i = t.Entity.GetComponent(147).GetSocketRotator(this.Entity)),
        this.ActorComp.SetActorRotation(i.ToUeRotator()));
    }
    Tpn(t, e) {
      this.TargetActorComponent = t.Entity.GetComponent(1);
      t = t.Entity.GetComponent(147);
      t &&
        ((this.ActivatedOutlet = t),
        ((this.ActivatedOutlet.EntityInSocket =
          this).ActivatedOutlet.MatchCfgIndex = e),
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
        (this.ActorComp = this.Entity.GetComponent(185)),
        this.ActorComp.Owner.Tags.Add(CONTROL_OBJECT_TAG),
        this.ActorComp.Owner.Tags.Add(
          CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE,
        ),
        this.ActorComp.GetPrimitiveComponent().SetUseCCD(!0),
        (this.inn = this.Entity.GetComponent(180)),
        this.inn.AddTag(-1299967416),
        (this.TargetActorComponent = void 0),
        (this.TargetOutletComponent = void 0),
        this.jCn.DeepCopy(this.ActorComp.ActorRotationProxy),
        this.Wnr.DeepCopy(this.ActorComp.ActorLocationProxy),
        (this.mBe = this.Entity.GetComponent(119)),
        (this.PropComp = this.Entity.GetComponent(117)),
        (this._pn = this.Entity.GetComponent(144)),
        (this.epn = this.u1t.ControllerId),
        this.epn !== INVALID_ID &&
          this.u1t.IsShowingHandFx &&
          this.Fpn(this.epn, !0),
        (this.fqn = this.u1t.AutonomousId),
        this.fqn !== INVALID_ID
          ? ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              this.epn,
            ).Entity.GetComponent(3)),
            this.ActorComp.SetAutonomous(t.IsRoleAndCtrlByMe),
            this.Entity.GetComponent(144)?.SetEnableMovementSync(
              !0,
              "SceneItemManipulatableComponent",
            ))
          : this.Entity.GetComponent(144)?.SetEnableMovementSync(
              !1,
              "SceneItemManipulatableComponent",
            ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
          this.qpn,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
          this.Npn,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnManipulateCancelChanting,
          this.Apn,
        ),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SceneItem", 32, "[电池] OnStart", [
            "State",
            this.inn.GetTagNames(),
          ]),
        this.Vpn(),
        this.Hpn(),
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
          this.KHr,
        );
    }
    Hpn() {
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.Config.BaseCfg.CommonConfig,
        UE.BP_TeleControlConfig_C,
        (t) => {
          if (t?.IsValid()) {
            (this.$fn = !0), (this.ManipulateBaseConfig = t);
            this.Entity.GetComponent(108).SetLogicRange(
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
                        this.Zfn = t;
                      },
                    )),
                (this.Yfn = this.ManipulateBaseConfig.读条震屏),
                (this.zfn = this.ManipulateBaseConfig.吸取飞行震屏),
                (this.Jfn = this.ManipulateBaseConfig.控物保持震屏),
                (this.ConfigHoldOffset = this.ManipulateBaseConfig.一级偏移),
                (this.ConfigAssistantHoldOffset =
                  this.ManipulateBaseConfig.二级偏移),
                this.ManipulateBaseConfig.旋转),
              e =
                ((this.ConfigHoldRotator = new UE.Rotator(t.Y, t.Z, t.X)),
                (this.ZOe = void 0),
                (this.ResetState =
                  new SceneItemManipulableResetState_1.SceneItemManipulableResetState(
                    this,
                  )),
                (this.ChantState =
                  new SceneItemManipulableChantState_1.SceneItemManipulableChantState(
                    this,
                    this.Yfn,
                    this.ManipulateBaseConfig.读条镜头,
                  )),
                (this.DrawState =
                  new SceneItemManipulableDrawState_1.SceneItemManipulableDrawState(
                    this,
                    this.zfn,
                    this.ManipulateBaseConfig.吸取飞行镜头,
                  )),
                (this.HoldState =
                  new SceneItemManipulableHoldState_1.SceneItemManipulableHoldState(
                    this,
                    this.Jfn,
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
                    this.Zfn,
                  )),
                  (this.CastToOutletState =
                    new SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState(
                      this,
                      this.Zfn,
                    )),
                  (this.CastFreeState =
                    new SceneItemManipulableCastFreeState_1.SceneItemManipulableCastFreeState(
                      this,
                      this.Zfn,
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
                    this.Zfn,
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
                    this.Zfn,
                  )),
                  (this.CastToOutletState =
                    new SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState(
                      this,
                      this.Zfn,
                    )),
                  (this.CastFreeState =
                    new SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState(
                      this,
                      this.Zfn,
                    )),
                  (this.CastProjectileState =
                    new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(
                      this,
                      void 0,
                    ));
            }
            this.Entity.GetComponent(124)?.Valid
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
              this.Cpn &&
                this.DropState.SetEnterCallback(() => {
                  this.Rpn();
                }),
              (this.CurrentState = this.ResetState),
              this.Opn(),
              this.jpn();
            t = this.Config.BulletCfg?.CreateConditions;
            if (t)
              for (const s of t)
                switch (s.Type) {
                  case IComponent_1.EBulletCreateCondition.OnHit:
                    (this.cpn = String(s.BulletId)),
                      EventSystem_1.EventSystem.AddWithTarget(
                        this,
                        EventDefine_1.EEventName.OnSceneItemHit,
                        this.Dpn,
                      );
                    break;
                  case IComponent_1.EBulletCreateCondition.OnMatching:
                    this.CastToOutletState.SetFinishCallback(() => {
                      var t =
                        Global_1.Global.BaseCharacter.CharacterActorComponent
                          .Entity;
                      this.oZo(t, String(s.BulletId)), this.dpn && this.Rpn();
                    });
                    break;
                  case IComponent_1.EBulletCreateCondition.OnCollision:
                    (this.fpn = s.BulletId),
                      this.CastFreeState.SetHitCallback(this.Upn),
                      this.CastToOutletState.SetHitCallback(this.Upn),
                      this.CastToTargetState.SetHitCallback(this.Upn),
                      this.CastProjectileState.SetHitCallback(this.Upn),
                      s.TriggerCount &&
                        ((this.vpn = s.TriggerCount.TriggerCount),
                        (this.Mpn =
                          s.TriggerCount.TriggerInterval *
                          TimeUtil_1.TimeUtil.InverseMillisecond),
                        this.HoldState.SetEnterCallback(() => {
                          (this.mpn = 0), (this.Epn = 0);
                        }));
                    break;
                  case IComponent_1.EBulletCreateCondition.OnThrowTriggerTime:
                    this.CastFreeState.SetEnterCallback(() => {
                      this.a_n = TimerSystem_1.TimerSystem.Delay(() => {
                        var t =
                          Global_1.Global.BaseCharacter.CharacterActorComponent
                            .Entity;
                        this.oZo(t, String(s.BulletId)), this.dpn && this.Rpn();
                      }, s.TriggerTime * TimeUtil_1.TimeUtil.InverseMillisecond);
                    }),
                      this.CastProjectileState.SetEnterCallback(() => {
                        this.a_n = TimerSystem_1.TimerSystem.Delay(() => {
                          var t =
                            Global_1.Global.BaseCharacter
                              .CharacterActorComponent.Entity;
                          this.oZo(t, String(s.BulletId)),
                            this.dpn && this.Rpn();
                        }, s.TriggerTime * TimeUtil_1.TimeUtil.InverseMillisecond);
                      });
                }
          }
        },
      );
    }
    Opn(t = !1) {
      var e = this.Entity.GetComponent(124);
      (this.ipn && !t) ||
        void 0 === this.MatchOutletState ||
        (e?.Valid && void 0 === this.PutIndex) ||
        ((this.ActivatedOutlet = void 0),
        this.u1t.RelationId &&
          ((t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.u1t.RelationId,
          ))?.IsInit
            ? (this.Tpn(t, this.u1t.PbRelationMatchCfgIndex), this.Lpn(t))
            : EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.AddEntity,
                this.Ipn,
              )),
        (this.ipn = !0));
    }
    jpn() {
      var t,
        e = this.Entity.GetComponent(112);
      this.FinishCheckInitAttach ||
        (e && this.CurrentState === this.ResetState
          ? (((t =
              new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType =
              2),
            (t.PosAttachOffset = this.u1t.PbDynAttachRelPos),
            (t.PosAbsolute = !1),
            (t.RotAttachType = 2),
            (t.RotAttachOffset = this.u1t.PbDynAttachRelRot),
            (t.RotAbsolute = !1),
            this.u1t.PbDynAttachEntityConfigId
              ? e.RegEntityTarget(
                  this.u1t.PbDynAttachEntityConfigId,
                  this.u1t.PbDynAttachEntityActorKey,
                  t,
                  "[ManipulatableComp] CheckInitAttach",
                )
              : this.u1t.PbDynAttachRefActorKey?.length &&
                e.RegRefActorTarget(
                  this.u1t.PbDynAttachRefActorKey,
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
      this.KHr(t);
    }
    OnEnable() {
      !Info_1.Info.EnableForceTick &&
        this.Entity?.IsInit &&
        ComponentForceTickController_1.ComponentForceTickController.RegisterTick(
          this,
          this.KHr,
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
        this.NeedRemoveControllerId && this.bpn(),
        this.epn !== INVALID_ID && this.Fpn(this.epn, !1),
        void 0 !== this.a_n &&
          (TimerSystem_1.TimerSystem.Remove(this.a_n), (this.a_n = void 0)),
        this.ActorComp?.Owner?.OnActorHit?.Clear(),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnLevelTagChanged,
          this.gIe,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation,
          this.qpn,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnModifyJigsawItemPutIndex,
          this.Npn,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnManipulateCancelChanting,
          this.Apn,
        ),
        EventSystem_1.EventSystem.Has(
          EventDefine_1.EEventName.AddEntity,
          this.Ipn,
        ) &&
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.AddEntity,
            this.Ipn,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EnterPresentationInitRange,
          this.FJr,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.EnterPresentationInitRange,
            this.FJr,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHit,
          this.Dpn,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this,
            EventDefine_1.EEventName.OnSceneItemHit,
            this.Dpn,
          ),
        Info_1.Info.EnableForceTick ||
          ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(
            this,
          ),
        this.upn)
      ) {
        const t = this.upn;
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put(t);
        });
      }
      return this.ClearCastDestroyTimer(), !0;
    }
    BePopupFormOutlet() {
      (this.IsCanBeHeld = !1),
        (this.CurrentState = this.CastFreeState),
        (this.ActivatedOutlet.EntityInSocket = void 0),
        (this.ActivatedOutlet.MatchCfgIndex = void 0),
        (this.ActivatedOutlet = void 0),
        (this.MatchSequence = void 0);
    }
    oZo(t, e) {
      !this.Entity?.Valid ||
        this.mpn >= this.vpn ||
        (0 < this.mpn && this.Epn < this.Mpn) ||
        ((this.Epn = 0),
        this.mpn++,
        BulletController_1.BulletController.CreateBulletCustomTarget(
          t,
          e,
          this.ActorComp.ActorTransform,
          {},
          this.JUn,
        ));
    }
    Wpn(t) {
      "MatchingOutlet" === this.State &&
        ((this.TargetActorComponent = void 0),
        (this.TargetOutletComponent = void 0),
        (this.ActivatedOutlet = t.GetComponent(147)),
        this.ActorComp?.Valid) &&
        (this.ActorComp.PhysicsMode = 0);
    }
    Kpn(i, s) {
      this._pn.CollectSampleAndSend(!0);
      var t = i.GetComponent(0).GetCreatureDataId(),
        e = this.u1t.GetCreatureDataId(),
        h = Protocol_1.Aki.Protocol.mds.create(),
        t =
          ((h.P4n = MathUtils_1.MathUtils.NumberToLong(t)),
          (h.tKn = MathUtils_1.MathUtils.NumberToLong(e)),
          (h.iKn = s ? 1 : 0),
          Protocol_1.Aki.Protocol.Pks.create()),
        e = this.ActorComp.ActorLocationProxy,
        e =
          ((t.X = e.X),
          (t.Y = e.Y),
          (t.Z = e.Z),
          Protocol_1.Aki.Protocol.S2s.create()),
        a = this.ActorComp.ActorRotationProxy;
      (e.Pitch = a.Pitch),
        (e.Roll = a.Roll),
        (e.Yaw = a.Yaw),
        (h.e8n = t),
        (h.t8n = e),
        Net_1.Net.Call(4551, h, (t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              32,
              "[Manipulate] Match outlet net response!",
              ["active", t.iKn],
            );
          var e = i.GetComponent(147);
          s && e.OnPutDownItem(this.Entity),
            t.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.O4n,
                  23327,
                )
              : s &&
                (this.ManipulateBaseConfig?.被控制CD &&
                  0 < this.ManipulateBaseConfig?.被控制CD &&
                  ((this.opn = !0),
                  (this.rpn = TimerSystem_1.TimerSystem.Delay(() => {
                    (this.opn = !1), (this.rpn = void 0);
                  }, this.ManipulateBaseConfig.被控制CD * TimeUtil_1.TimeUtil.InverseMillisecond))),
                1 === t.iKn
                  ? ((this.CurrentState = this.MatchOutletState), this.Wpn(i))
                  : (this.CurrentState = this.DropState));
        });
    }
    TryPlayMismatchSequence(t) {
      var e,
        i,
        t = t.GetComponent(147),
        s = t.GetMismatchSequence(this.Entity);
      void 0 !== s &&
        t?.Valid &&
        ((this.PlayingMatchSequence = !0),
        void 0 === this.upn && this.Qpn(),
        (t = this.upn.DefaultInstanceData),
        (e = this.ActorComp.ActorLocationProxy),
        (i = this.ActorComp.ActorRotationProxy),
        (i = Transform_1.Transform.Create(
          i.Quaternion(void 0),
          e,
          Vector_1.Vector.OneVectorProxy,
        )),
        (t.TransformOrigin = i.ToUeTransform()),
        this.upn) &&
        ((this.IsCanBeHeld = !1),
        (this.NeedRemoveControllerId = !0),
        this.Xpn(s));
    }
    ShouldPlayMismatchSequence(t) {
      t = t.GetComponent(147);
      return !(void 0 === t.GetMismatchSequence(this.Entity) || !t?.Valid);
    }
    Xpn(t) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, (t) => {
        this.BePopupFormOutlet(),
          this.upn.SetActorTickEnabled(!0),
          this.upn.SetSequence(t),
          TimerSystem_1.TimerSystem.Delay(() => {
            this.$pn(!1, () => {
              this.PlayingMatchSequence = !1;
            }),
              (this.ActorComp.PhysicsMode = 3),
              this.TryEnableTick();
          }, 50);
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
          this.u1t.GetPbEntityInitData()),
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
        this.a_n &&
          (TimerSystem_1.TimerSystem.Remove(this.a_n), (this.a_n = void 0)),
        (this.IsCanBeHeld = !0),
        (this.opn = !1),
        this.rpn &&
          (TimerSystem_1.TimerSystem.Remove(this.rpn), (this.rpn = void 0)),
        this.NeedRemoveControllerId && this.bpn(),
        this.Gpn(),
        e &&
          (((h = Protocol_1.Aki.Protocol.oms.create()).P4n =
            MathUtils_1.MathUtils.NumberToLong(this.u1t.GetCreatureDataId())),
          (h.rKn = MathUtils_1.MathUtils.NumberToLong(t)),
          Net_1.Net.Call(16153, h, (t) => {
            switch (t.O4n) {
              case Protocol_1.Aki.Protocol.O4n.NRs:
              case Protocol_1.Aki.Protocol.O4n
                .Proto_ErrBeControlledEntityNotExist:
                break;
              default:
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.O4n,
                  23327,
                );
            }
          })),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatedItemPosReset,
        );
    }
    Gpn() {
      (this.MatchSequence = void 0),
        this.ActivatedOutlet &&
          ((this.ActivatedOutlet.EntityInSocket = void 0),
          (this.ActivatedOutlet.MatchCfgIndex = void 0),
          (this.ActivatedOutlet = void 0));
    }
    Vpn() {
      let t = void 0;
      this.inn.HasTag(-1660917319)
        ? (t = -938118674)
        : this.inn.HasTag(-1611484717) && (t = 1926099076),
        t && this.inn.AddTag(t);
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
        e = this.TargetActorComponent?.Entity.GetComponent(134);
      let i = Vector_1.Vector.Create();
      (i = this.TargetOutletComponent?.Valid
        ? this.TargetActorComponent.Entity.GetComponent(123)?.Valid
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
        t = t.GetComponent(147);
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
      (this.spn = !1),
        (this.apn = !1),
        (this.hpn = !1),
        (this.lpn = !1),
        (this.ppn = 0),
        (this.tpn = !1),
        void 0 !== this.sxr &&
          (this.Enable(
            this.sxr,
            "SceneItemManipulatableComponent.TryEnableTick",
          ),
          t) &&
          3 !== this.ActorComp.PhysicsMode &&
          ((this.ActorComp.PhysicsMode = 3),
          this.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
            Vector_1.Vector.OneVector.op_Multiply(0.1),
          )),
        (this.sxr = void 0),
        this.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
          Vector_1.Vector.ZeroVector,
          !1,
        );
    }
    TryDisableTick(t) {
      void 0 === this.sxr &&
        ((this.sxr = this.Disable(t)), 0 !== this.ActorComp.PhysicsMode) &&
        (this.ActorComp.PhysicsMode = 0);
    }
    Ppn(t) {
      switch (this.State) {
        case "BeCastingToTarget":
        case "BeCastingToOutlet":
        case "BeCastingFree":
          this.CurrentState.Tick(0.001 * t);
          break;
        default:
          this.spn = !0;
      }
    }
    xpn() {
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
          this.ActorComp.ActorLocationProxy.Equals(this.Wnr) &&
          this.ActorComp.ActorRotationProxy.Equals(this.qHr) &&
          (("BeCastingFree" !== this.State && "BeDropping" !== this.State) ||
            (this.CurrentState = this.ResetState),
          (this.apn = !0)));
    }
    wpn() {
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
          (this.hpn = !0));
    }
    Bpn(t) {
      var e, i, s;
      this.PlayingMatchSequence ||
        (3 === this.ActorComp.PhysicsMode &&
          ((e = Vector_1.Vector.Create(this.Wnr)),
          this.ActorComp.ActorLocationProxy.Subtraction(e, e),
          (e = e.Size()),
          (e /= t * TimeUtil_1.TimeUtil.Millisecond),
          (i = Vector_1.Vector.Create()),
          (s = Vector_1.Vector.Create()),
          this.ActorComp.ActorRotationProxy.Vector(s),
          this.qHr.Vector(i),
          i.Subtraction(s, i),
          (s = i.Size()),
          (s /= t * TimeUtil_1.TimeUtil.Millisecond),
          this.ManipulateBaseConfig.打开速度Log &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error("SceneItem", 32, "[Manipulate] 速度", ["size", e]),
          e < this.ManipulateBaseConfig.可再被控速度最小值 && (this.tpn = !0),
          e < MIN_VELOCITY && 0 == s
            ? (this.ppn++,
              this.ppn > ZERO_VELOCITY_FRAME_NUM &&
                (this.ActorComp.PhysicsMode = 0))
            : (this.ppn = 0)),
        0 === this.ActorComp.PhysicsMode && (this.lpn = !0));
    }
    bpn() {
      var t, e;
      this.epn === INVALID_ID
        ? (this.IsCanBeHeld = !0)
        : ((t = this.u1t?.GetCreatureDataId()),
          ((e = Protocol_1.Aki.Protocol.fds.create()).P4n =
            MathUtils_1.MathUtils.NumberToLong(t)),
          (e.EWn = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              32,
              "[Manipulate] RequestRemoveControllerId",
              ["location", this.ActorComp?.ActorLocationProxy],
              ["id", this.u1t?.GetPbDataId()],
            ),
          (this.IsRequestingRemoveControllerId = !0),
          Net_1.Net.Call(24371, e, (t) => {
            switch (((this.IsRequestingRemoveControllerId = !1), t.O4n)) {
              case Protocol_1.Aki.Protocol.O4n.NRs:
                (this.NeedRemoveControllerId = !1), (this.IsCanBeHeld = !0);
                break;
              case Protocol_1.Aki.Protocol.O4n
                .Proto_ErrBeControlledEntityNotExist:
              case Protocol_1.Aki.Protocol.O4n
                .Proto_ErrNotBeControlledNotPlayer:
                this.IsCanBeHeld = !0;
                break;
              default:
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.O4n,
                  23327,
                );
            }
          }));
    }
    pqn() {
      var t, e;
      this.fqn === INVALID_ID ||
      this.fqn !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
        ? (this.IsCanBeHeld = !0)
        : ((t = this.u1t?.GetCreatureDataId()),
          ((e = Protocol_1.Aki.Protocol.Pfs.create()).P4n =
            MathUtils_1.MathUtils.NumberToLong(t)),
          (e.EWn = !1),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneItem",
              32,
              "[Manipulate] RequestRemoveAutonomousId",
              ["location", this.ActorComp?.ActorLocationProxy],
              ["id", this.u1t?.GetPbDataId()],
            ),
          (this.IsRequestingRemoveAutonomousId = !0),
          Net_1.Net.Call(22971, e, (t) => {
            (this.IsRequestingRemoveAutonomousId = !1), (this.IsCanBeHeld = !0);
          }));
    }
    Fpn(t, e) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
      t?.Valid &&
        ((t = t.Entity.GetComponent(56)),
        e ? t.ActiveHandFX(this.Entity) : t.DeactiveHandFx());
    }
    get CurrentState() {
      return this.ZOe;
    }
    set CurrentState(t) {
      var e;
      this.ZOe !== t &&
        ((e = this.State),
        this.ZOe?.Exit(),
        (this.ZOe = t),
        this.ZOe?.Enter(),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnManipulatableItemStateModified,
          e,
          this.State,
        ));
    }
    RequestAttachToOutlet() {
      this.Kpn(this.ActivatedOutlet.Entity, !0);
    }
    ClearAttachOutletInfo() {
      (this.ActivatedOutlet.EntityInSocket = void 0),
        (this.ActivatedOutlet.MatchCfgIndex = void 0),
        (this.ActivatedOutlet = void 0);
    }
    Qpn() {
      void 0 === this.upn &&
        ((this.upn = ActorSystem_1.ActorSystem.Get(
          UE.LevelSequenceActor.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransform,
          void 0,
          !1,
        )),
        (this.upn.bOverrideInstanceData = !0));
    }
    PlayMatchSequence(e, i) {
      var t, s;
      StringUtils_1.StringUtils.IsEmpty(this.MatchSequence) ||
        (void 0 === this.upn && this.Qpn(),
        (t = this.upn.DefaultInstanceData),
        (s = this.ActorComp.ActorTransform).SetLocation(
          this.CastTargetLocation.ToUeVector(),
        ),
        (t.TransformOrigin = s),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.MatchSequence,
          UE.LevelSequence,
          (t) => {
            this.upn.SetActorTickEnabled(!0),
              this.upn.SetSequence(t),
              this.$pn(i, e);
          },
        ));
    }
    $pn(t, e) {
      this.upn.AddBindingByTag(BINDING_TAG, this.ActorComp.Owner),
        this.upn.SequencePlayer.IsValid() &&
          (this.upn.SequencePlayer.SetPlayRate(1),
          this.upn.SequencePlayer.OnFinished.Clear(),
          t
            ? this.upn.SequencePlayer.PlayReverse()
            : this.upn.SequencePlayer.Play(),
          this.upn.SequencePlayer.OnFinished.Add(e),
          this.upn.SequencePlayer.OnFinished.Add(() => {
            this.upn.RemoveBindingByTag(BINDING_TAG, this.ActorComp.Owner);
          }));
    }
    StopSequence() {
      this.upn?.SequencePlayer?.IsPlaying &&
        (this.upn.SequencePlayer.Stop(),
        (this.PlayingMatchSequence = !1),
        this.upn.RemoveBindingByTag(BINDING_TAG, this.ActorComp.Owner));
    }
    Rpn() {
      var t = this.u1t?.GetCreatureDataId(),
        e = Protocol_1.Aki.Protocol.zds.create();
      (e.P4n = MathUtils_1.MathUtils.NumberToLong(t)),
        Net_1.Net.Call(13850, e, (t) => {
          switch (t.O4n) {
            case Protocol_1.Aki.Protocol.O4n.NRs:
            case Protocol_1.Aki.Protocol.O4n
              .Proto_ErrBeControlledEntityNotExist:
              this.a_n &&
                (TimerSystem_1.TimerSystem.Remove(this.a_n),
                (this.a_n = void 0));
              break;
            default:
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.O4n,
                21273,
              );
          }
        });
    }
    OnCastItem() {
      var t;
      this.gpn &&
        ((t = this.Config.DestroyCfg.Conditions.filter(
          (t) => t.Type === IComponent_1.ETeleControlDestroyCondition.Throw,
        )[0]),
        (this.BCe = TimerSystem_1.TimerSystem.Delay(() => {
          this.Rpn();
        }, t.DelayTime * TimeUtil_1.TimeUtil.InverseMillisecond)));
    }
    ClearCastDestroyTimer() {
      void 0 !== this.BCe &&
        (TimerSystem_1.TimerSystem.Remove(this.BCe), (this.BCe = void 0));
    }
    TryAddTagById(t) {
      this.inn.HasTag(t) || this.inn.AddTag(t);
    }
    TryRemoveTagById(t) {
      this.inn.HasTag(t) && this.inn.RemoveTag(t);
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
          (this.npn = !0);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneItem",
            40,
            "[SceneItemManipulatableComponent.ForceStopDropping] 尝试强停物理掉落时，被控物不处于脱手掉落状态，返回",
            ["State", this.State],
            ["NeedRemoveControllerId", this.NeedRemoveControllerId],
            ["PbDataId", this.u1t?.GetPbDataId()],
          );
    }
    TryAddSpecLockTag() {
      var t;
      this.Entity.GetComponent(124) &&
        ((t = void 0 !== this.ActivatedOutlet ? 2142861976 : -628734864),
        this.inn.HasTag(t) || this.inn.AddTag(t));
    }
    TryRemoveSpecLockTag() {
      var t;
      this.Entity.GetComponent(124) &&
        (this.inn.HasTag((t = 2142861976)) && this.inn.RemoveTag(t),
        this.inn.HasTag((t = -628734864))) &&
        this.inn.RemoveTag(t);
    }
    TryReqAttachToFloor() {
      var t = this.Entity.GetComponent(112);
      if (
        t &&
        this.ActorComp?.Owner?.IsValid() &&
        this.ActorComp.GetIsSceneInteractionLoadCompleted() &&
        !t.IsRegTarget()
      ) {
        var e,
          i,
          s,
          h = this.Ypn(0, -5);
        if (h)
          return (
            ([s, i] = this.Jpn(h)),
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
              : (([i, e] = this.zpn(h)),
                void (
                  i &&
                  ((s = i.GetComponent(185)),
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
    Ypn(e, i) {
      if (this.ActorComp) {
        var s =
          SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(
            this.ActorComp.GetSceneInteractionLevelHandleId(),
          );
        if (s?.IsValid) {
          var h = s.K2_GetActorRotation(),
            a = (0, puerts_1.$ref)(void 0),
            n = (0, puerts_1.$ref)(void 0),
            s =
              (s.GetActorBounds(!1, a, void 0),
              s.K2_SetActorRotation(new UE.Rotator(0, 0, 0), !1),
              s.GetActorBounds(!1, void 0, n),
              s.K2_SetActorRotation(h, !1),
              MathUtils_1.MathUtils.CommonTempVector),
            a =
              (s.FromUeVector((0, puerts_1.$unref)(a)),
              ModelManager_1.ModelManager.TraceElementModel
                .CommonStartLocation),
            o = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation,
            r =
              (a.Set(s.X, s.Y, s.Z + e),
              o.Set(s.X, s.Y, s.Z + i),
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
              (e.FromUeVector((0, puerts_1.$unref)(n)),
              (r.HalfSizeX = e.X),
              (r.HalfSizeY = e.Y),
              (r.HalfSizeZ = e.Z),
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, a),
              TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, o),
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
    Jpn(t) {
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
            return this.Jpn(i);
        }
      }
      return [void 0, void 0];
    }
    zpn(e) {
      var t =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(e),
        i = t?.Entity?.GetComponent(185);
      if (!i?.Owner?.IsValid()) return [void 0, void 0];
      var s =
        SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllKeyRefActors(
          i.GetSceneInteractionLevelHandleId(),
        );
      let h = void 0;
      var a = s?.Num();
      if (a)
        for (let t = 0; t < a; t++) {
          var n = s.GetKey(t);
          if (s.Get(n) === e) {
            h = n;
            break;
          }
        }
      return [t.Entity, h];
    }
  });
(SceneItemManipulatableComponent = SceneItemManipulatableComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(142)],
    SceneItemManipulatableComponent,
  )),
  (exports.SceneItemManipulatableComponent = SceneItemManipulatableComponent);
//# sourceMappingURL=SceneItemManipulatableComponent.js.map
