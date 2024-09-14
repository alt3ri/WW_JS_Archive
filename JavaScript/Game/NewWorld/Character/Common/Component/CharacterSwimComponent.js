"use strict";
var CharacterSwimComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, s, e) {
      var h,
        r = arguments.length,
        _ =
          r < 3
            ? i
            : null === e
              ? (e = Object.getOwnPropertyDescriptor(i, s))
              : e;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        _ = Reflect.decorate(t, i, s, e);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (h = t[o]) &&
            (_ = (r < 3 ? h(_) : 3 < r ? h(i, s, _) : h(i, s)) || _);
      return 3 < r && _ && Object.defineProperty(i, s, _), _;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSwimComponent =
    exports.SWIMMING_DECELERATION =
    exports.SWIMMING_BUOYANCY =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  TickScoreController_1 = require("../../../../TickScore/TickScoreController"),
  GravityUtils_1 = require("../../../../Utils/GravityUtils"),
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  PROFILE_DETECT_WATER_DEPTH = "CharacterSwimComponent_DetectWaterDepth",
  PROFILE_FLOOR = "CharacterSwimComponent_CheckHasArrivedFloorInSwimming",
  MAX_LAST_TICK_OFFSET_SQUARE = 1e8,
  MAX_BYTE = 255,
  MAX_SPEED_INTO_WATER = 50,
  ENTER_SWIM_BIGGER_THAN_THIS = 0.75,
  LEAVE_SWIM_LESS_THAN_THIS = 0.7,
  CLIMB_CHECK_ENTER_WATER_RATE = 0.8,
  ONE_HUNDRED_TO_FIND_SURFACE = 100,
  FIVE_HUNDRED_TO_FIND_SURFACE = 500,
  TIME_CLEAR_ENTER_WATER = 500,
  SWIMMING_FRICTION = ((exports.SWIMMING_BUOYANCY = 1.4), 0.01),
  SWIMMING_FRICTION_MIN_SPEED = 75,
  SWIMMING_FRICTION_RATION = 1e4,
  SWIMMING_MAX_DEPTH = 2,
  SWIMMING_ACCELERATOR = 200,
  EIGHTY = ((exports.SWIMMING_DECELERATION = 0.06), 80),
  COS_EIGHTY = 0.173,
  MIN_DEPTH = -99999,
  waterAreaDetectExtent = new UE.Vector(500, 500, 1e3);
class CharacterSwimUtils {}
(CharacterSwimUtils.AfterTransformLocationOffset = new UE.Vector(EIGHTY, 0, 0)),
  (CharacterSwimUtils.DebugColor1 = new UE.LinearColor(
    MAX_BYTE,
    MAX_BYTE,
    0,
    1,
  )),
  (CharacterSwimUtils.DebugColor2 = new UE.LinearColor(0, MAX_BYTE, 0, 1)),
  (CharacterSwimUtils.DebugColor3 = new UE.LinearColor(MAX_BYTE, 0, 0, 1)),
  (CharacterSwimUtils.DebugColor4 = new UE.LinearColor(
    0,
    MAX_BYTE,
    MAX_BYTE,
    1,
  ));
let CharacterSwimComponent =
  (CharacterSwimComponent_1 = class CharacterSwimComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.IsDebug = !1),
        (this.sWr = () => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              58,
              "[游泳组件]设置游泳盒子保底入水检测",
            ),
            (this.aWr = !0);
        }),
        (this.hWr = (t, i) => {
          this.Lie.RemoveTag(-104158548),
            this.EnterSwimFromAirBuffIndex &&
              (this.Entity.GetComponent(160)?.RemoveBuffByHandle(
                this.EnterSwimFromAirBuffIndex,
                -1,
                "空中入水结束",
              ),
              (this.EnterSwimFromAirBuffIndex = 0)),
            i === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
              ? ((this.MaxSpeed =
                  this.Gce.MovementData.FaceDirection.Standing.FastSwimSpeed),
                (this.lWr = !0),
                this._Wr())
              : i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
                ? ((this.MaxSpeed =
                    this.Gce.MovementData.FaceDirection.Standing.NormalSwimSpeed),
                  (this.lWr = !1),
                  this._Wr())
                : this.uWr();
        }),
        (this.cWr = (t, i) => {
          t === CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? this.uWr()
            : i === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
              this._Wr();
        }),
        (this.mWr = () => {
          this._Wr();
        }),
        (this.dWr = (t) => {
          var i =
              ((1 -
                MathUtils_1.MathUtils.Clamp(
                  this.Gce.Speed / SWIMMING_FRICTION_MIN_SPEED,
                  0,
                  1,
                )) *
                SWIMMING_FRICTION_RATION +
                1) *
              SWIMMING_FRICTION,
            s = GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(
              this.Hte,
            ),
            e =
              this.SwimAcceleratorCurve.GetFloatValue(s) * SWIMMING_ACCELERATOR,
            s =
              ((this.RotateSpeed = this.SwimRotationCurve.GetFloatValue(s)),
              1 === this.CWr ? 0 : exports.SWIMMING_BUOYANCY);
          this.Gce.CharacterMovement.KuroSwimming(
            t,
            !0,
            this.Depth,
            s,
            i,
            this.MaxSpeed,
            this.WaterSlope,
            e,
            exports.SWIMMING_DECELERATION,
          );
        }),
        (this.fWr = void 0),
        (this.pWr = void 0),
        (this.vWr = 0),
        (this.MWr = void 0),
        (this.EWr = 0),
        (this.Depth = 0),
        (this.RotateSpeed = 0),
        (this.SwimAcceleratorCurve = void 0),
        (this.SwimRotationCurve = void 0),
        (this.SWr = void 0),
        (this.yWr = void 0),
        (this.IWr = void 0),
        (this.TWr = 0),
        (this.LWr = !1),
        (this.WaterSlope = 0),
        (this.MaxSpeed = 0),
        (this.DWr = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.I5r = void 0),
        (this.oRe = void 0),
        (this.cBe = void 0),
        (this.RWr = void 0),
        (this.Gce = void 0),
        (this.cz = void 0),
        (this.fz = void 0),
        (this.pz = void 0),
        (this.UWr = void 0),
        (this.AWr = void 0),
        (this.PWr = void 0),
        (this.SprintSwimOffset = 0),
        (this.SprintSwimOffsetLerpSpeed = 0),
        (this.mie = -0),
        (this.xWr = void 0),
        (this.wWr = BigInt(0)),
        (this.EnterSwimFromAirBuffIndex = 0),
        (this.lWr = !1),
        (this.CWr = 1),
        (this.BWr = -0),
        (this.Mao = void 0),
        (this.InSwimTriggerCount = 0),
        (this.IsRole = !1),
        (this.iOa = 0),
        (this.rOa = !1),
        (this.WaterHeightAboveMe = 0),
        (this.aWr = !1),
        (this.Nkr = (t) => {
          this.MWr.DeepCopy(this.Hte.ActorLocation);
        });
    }
    static get Dependencies() {
      return [3, 164, 190];
    }
    get BuffIndex() {
      return this.wWr;
    }
    set BuffIndex(t) {
      this.wWr !== t &&
        ((this.wWr = t),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwimStrengthChanged,
          this.wWr,
        ));
    }
    bWr() {
      this.Hte.IsBoss ||
        (this.cBe.StopAllSkills("CharacterSwimComponent.EnterSwimmingState"),
        this.IsDebug &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Movement", 58, "[游泳组件]触发入水,打断0组技能")),
        this.Gce.FallingIntoWater ||
          (this.cz.DeepCopy(this.Gce.CharacterMovement.LastUpdateVelocity),
          (this.cz.Z = MathUtils_1.MathUtils.Clamp(
            this.cz.Z,
            -MAX_SPEED_INTO_WATER,
            MAX_SPEED_INTO_WATER,
          )),
          (this.Gce.CharacterMovement.LastUpdateVelocity =
            this.cz.ToUeVector()),
          this.Gce.SetForceSpeed(this.cz),
          this.IsDebug &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Movement",
              58,
              "[游泳组件]触发入水,入水速度过大，限制到",
              ["入水速度", this.cz],
            )),
        this.Gce.CharacterMovement.SetMovementMode(
          6,
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM,
        );
    }
    OnStart() {
      (this.Depth = 0),
        (this.MaxSpeed = 0),
        (this.WaterSlope = 0),
        (this.RotateSpeed = 0),
        (this.lWr = !1),
        (this.InSwimTriggerCount = 0),
        (this.aWr = !1),
        this.qWr(),
        (this.BWr = 0);
      var t = this.Entity.GetComponent(0).GetEntityType();
      return (
        (this.IsRole = t === Protocol_1.Aki.Protocol.kks.Proto_Player),
        (this.CWr = 0),
        !!this.GWr() &&
          !(
            !this.lUr() ||
            !this.NWr() ||
            !this.OWr() ||
            (this.ewr(),
            this.IsRole &&
              (EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
                this.hWr,
              ),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.CharOnPositionStateChanged,
                this.cWr,
              ),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.CustomMoveSwim,
                this.dWr,
              ),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.RoleOnStateInherit,
                this.Nkr,
              ),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.WorldDone,
                this.sWr,
              ),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.TeleportComplete,
                this.sWr,
              ),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnUpdateSceneTeam,
                this.sWr,
              ),
              this.Lie?.AddTagChangedListener(-290630940, this.mWr)),
            this.Hte.Actor.Tags.Add(
              CharacterNameDefines_1.CharacterNameDefines
                .ENABLE_MOVE_TRIGGER_TAG,
            ),
            0)
          )
      );
    }
    ewr() {
      (this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.Mao.WorldContextObject = this.Hte.Actor),
        (this.Mao.Radius = 1),
        (this.Mao.bIgnoreSelf = !0),
        (this.Mao.bIsSingle = !1),
        this.Mao.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
        this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.Mao,
          CharacterSwimUtils.DebugColor3,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.Mao,
          CharacterSwimUtils.DebugColor4,
        );
    }
    kWr() {
      this.Mao && (this.Mao.Dispose(), (this.Mao = void 0));
    }
    oOa() {
      if (
        CharacterSwimComponent_1.UseSwimTrigger ||
        !this.Gce?.IsStandardGravity
      )
        (this.rOa = 0 < this.InSwimTriggerCount),
          (this.iOa = FIVE_HUNDRED_TO_FIND_SURFACE),
          (this.WaterHeightAboveMe = 0);
      else {
        var i,
          s = (0, puerts_1.$ref)(0),
          e = (0, puerts_1.$ref)(0);
        let t = !1;
        (t =
          this.Hte.IsRoleAndCtrlByMe &&
          this.I5r?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air
            ? (this.Hte.ActorVelocityProxy.Multiply(this.mie, this.cz),
              (i = Math.min(
                0,
                GravityUtils_1.GravityUtils.GetZnInGravity(this.Hte, this.cz),
              )),
              this.cz.DeepCopy(waterAreaDetectExtent),
              GravityUtils_1.GravityUtils.AddZnInGravity(this.Hte, this.cz, i),
              UE.NavigationSystemV1.NavigationGetWaterDeep(
                this.Hte.Actor,
                this.Hte.ActorLocation,
                this.cz?.ToUeVector(),
                s,
                e,
                this.Hte.Actor,
                void 0,
              ))
            : UE.NavigationSystemV1.NavigationGetWaterDeep(
                this.Hte.Actor,
                this.Hte.ActorLocation,
                waterAreaDetectExtent,
                s,
                e,
                this.Hte.Actor,
                void 0,
              )),
          (this.rOa = t)
            ? ((i = (0, puerts_1.$unref)(s)),
              (this.WaterHeightAboveMe = i - this.Hte.FloorLocation.Z),
              (this.iOa =
                i -
                this.Hte.ActorLocationProxy.Z +
                ONE_HUNDRED_TO_FIND_SURFACE))
            : (this.iOa = 0);
      }
    }
    uDn() {
      return this.rOa;
    }
    OnTick(t) {
      this.FWr(),
        !this.Hte.IsAutonomousProxy ||
          this.Lie.HasTag(464607714) ||
          this.Lie.HasTag(-1523054094) ||
          (this.oOa(),
          this.IsRole
            ? (6 === this.Gce.CharacterMovement.MovementMode &&
                this.Gce.CharacterMovement.CustomMovementMode ===
                  CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) ||
              this.uDn() ||
              this.aWr
              ? ((this.mie = t * MathUtils_1.MathUtils.MillisecondToSecond),
                this.fWr.DeepCopy(this.Hte.ActorLocation),
                this.oRe && (this.fWr.Z += this.oRe.IkMeshOffset),
                this.pWr.DeepCopy(this.Hte.ActorUpProxy),
                Vector_1.Vector.DistSquared(this.MWr, this.fWr) >
                  MAX_LAST_TICK_OFFSET_SQUARE &&
                  (this.IsDebug &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Movement",
                      58,
                      "[游泳组件]与上一帧位置差巨大,重新设置这一帧位置",
                      ["LastTickLocation", this.MWr],
                      ["PlayerLocation", this.fWr],
                    ),
                  this.MWr.DeepCopy(this.Hte.ActorLocation)),
                this.VWr(this.HWr())
                  ? ((this.Depth = 1),
                    this.MWr.DeepCopy(this.Hte.ActorLocation))
                  : (this.jWr(),
                    this.WWr(this.mie),
                    (this.EWr = this.KWr()),
                    this.QWr(),
                    this.MWr.DeepCopy(this.Hte.ActorLocation),
                    (this.aWr = !1)))
              : (this.Gce.FallingIntoWater &&
                  Time_1.Time.Now > this.BWr &&
                  ((this.Gce.FallingIntoWater = !1),
                  this.Lie.RemoveTag(-104158548),
                  this.EnterSwimFromAirBuffIndex) &&
                  (this.Entity.GetComponent(160)?.RemoveBuffByHandle(
                    this.EnterSwimFromAirBuffIndex,
                    -1,
                    "空中入水结束",
                  ),
                  (this.EnterSwimFromAirBuffIndex = 0)),
                this.MWr.DeepCopy(this.Hte.ActorLocation))
            : (this.uDn()
                ? this.Hte?.ActorLocationProxy.Equals(
                    this.Hte.LastActorLocation,
                  ) ||
                  TickScoreController_1.TickScoreController.SwimTickScore.AddScore(
                    this,
                  )
                : 6 === this.Gce.CharacterMovement.MovementMode &&
                  this.Gce.CharacterMovement.CustomMovementMode ===
                    CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
                  this.Gce.CharacterMovement.SetMovementMode(3, 0),
              Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.MWr)));
    }
    ScoreUpdate() {
      this.Active &&
        this.Hte &&
        (Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.fWr),
        this.XWr());
    }
    OnEnd() {
      return (
        this.$Wr(),
        this.kWr(),
        this.IsRole &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.hWr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnPositionStateChanged,
            this.cWr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CustomMoveSwim,
            this.dWr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.RoleOnStateInherit,
            this.Nkr,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.WorldDone,
            this.sWr,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.TeleportComplete,
            this.sWr,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnUpdateSceneTeam,
            this.sWr,
          )),
        !0
      );
    }
    qWr() {
      (this.UWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.AWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.fz = Vector_1.Vector.Create(0, 0, 0)),
        (this.pz = Vector_1.Vector.Create(0, 0, 0)),
        (this.xWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.MWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.fWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.pWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.SWr = Vector_1.Vector.Create(0, 0, MIN_DEPTH)),
        (this.yWr = Vector_1.Vector.Create(0, 0, MIN_DEPTH)),
        (this.IWr = Vector_1.Vector.Create(0, 0, 0));
    }
    $Wr() {
      (this.cz = void 0),
        (this.fz = void 0),
        (this.pz = void 0),
        (this.UWr = void 0),
        (this.AWr = void 0),
        (this.xWr = void 0),
        (this.MWr = void 0),
        (this.fWr = void 0),
        (this.pWr = void 0),
        (this.SWr = void 0),
        (this.yWr = void 0),
        (this.IWr = void 0);
    }
    GWr() {
      this.Hte = this.Entity.GetComponent(3);
      var t = this.Hte.ActorLocationProxy,
        t =
          (Vector_1.Vector.VectorCopy(t, this.fWr),
          this.Entity.GetComponent(190));
      if (!t?.Valid) return !1;
      (this.Lie = t),
        (this.I5r = this.Entity.GetComponent(161)),
        (this.oRe = this.Entity.GetComponent(163)),
        (this.cBe = this.Entity.GetComponent(34)),
        (this.RWr = this.Entity.GetComponent(31));
      t = this.Entity.GetComponent(164);
      return (
        !!t?.Valid &&
        ((this.Gce = t),
        (this.vWr = this.Hte.HalfHeight),
        Vector_1.Vector.VectorCopy(this.Hte.ActorLocationProxy, this.MWr),
        !0)
      );
    }
    lUr() {
      return (
        !this.IsRole ||
        ((this.PWr =
          ConfigManager_1.ConfigManager.SwimConfig.GetSwimConfigByRoleBodyId(
            this.Hte.CreatureData.GetRoleConfig().RoleBody,
          )),
        !!this.PWr &&
          ((this.SprintSwimOffset = 0),
          (this.SprintSwimOffsetLerpSpeed = this.PWr.SprintZOffsetSpeed),
          !0))
      );
    }
    NWr() {
      return (
        !(
          this.IsRole &&
          ((this.SwimAcceleratorCurve =
            ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH,
              UE.CurveFloat,
            )),
          (this.SwimRotationCurve =
            ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH,
              UE.CurveFloat,
            )),
          !this.SwimAcceleratorCurve || !this.SwimRotationCurve)
        ) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Movement",
            58,
            "游泳配置曲线加载失败，曲线为/Game/Aki/Character/Role/Common/Data/Curves/CT_SwimAcceleratorStrength.CT_SwimAcceleratorStrength或者/Game/Aki/Character/Role/Common/Data/Curves/CT_SwimRotateSpeed.CT_SwimRotateSpeed",
          ),
        !1)
      );
    }
    OWr() {
      return (
        (this.DWr = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.Hte.Actor.DtBaseMovementSetting,
          CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
        )),
        !!this.DWr
      );
    }
    KWr() {
      var t;
      return this.Gce.HasSwimmingBlock
        ? ((t = (0, puerts_1.$ref)(void 0)),
          this.Gce.CharacterMovement.K2_FindFloor(this.fWr.ToUeVector(), t),
          (t = (0, puerts_1.$unref)(t)),
          this.Gce?.CharacterMovement?.IsWalkable(t.HitResult) ? 1 : 2)
        : 0;
    }
    jWr() {
      var t, i, s;
      this.Lie.HasTag(855966206) &&
        ((t = this.cz),
        this.pWr.Multiply(2 * this.vWr, t),
        (i = this.UWr),
        this.fWr.Addition(t, i),
        this.pWr.Multiply(this.vWr, t),
        (s = this.AWr),
        this.fWr.Subtraction(t, s),
        (this.Depth = this.YWr(i, s)),
        (this.LWr = this.Mao.HitResult.bBlockingHit),
        this.JWr(this.IWr));
    }
    zWr(i) {
      let s = !1,
        e = !1;
      this.yWr.Reset(),
        this.IWr.Reset(),
        this.SWr.Reset(),
        (this.yWr.Z = MIN_DEPTH),
        (this.SWr.Z = MIN_DEPTH);
      var h = i.GetHitCount();
      for (let t = 0; t < h; ++t) {
        var r = i.Actors.Get(t);
        r?.IsValid() &&
          (r.ActorHasTag(CharacterSwimComponent_1.ZWr)
            ? ((e = !0),
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                i,
                t,
                this.cz,
              ),
              this.cz.Z > this.SWr.Z && this.SWr.DeepCopy(this.cz))
            : ((s = !0),
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                i,
                t,
                this.cz,
              ),
              this.cz.Z > this.yWr.Z &&
                (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                  i,
                  t,
                  this.IWr,
                ),
                this.yWr.DeepCopy(this.cz),
                (this.TWr = i.TimeArray.Get(t)))));
      }
      return !e && s && this.SWr.DeepCopy(this.yWr), s;
    }
    HWr() {
      return this.Gce.FallingIntoWater || this.Lie.HasTag(40422668)
        ? 1
        : this.Lie.HasTag(504239013)
          ? 2
          : this.Lie.HasTag(-1898186757)
            ? 3
            : 0;
    }
    eKr(t, i, s = this.Hte.ScaledRadius) {
      var e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      (e.WorldContextObject = this.Hte.Actor),
        (e.Radius = s),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, i),
        e.ActorsToIgnore.Empty();
      for (const h of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
        e.ActorsToIgnore.Add(h);
      return TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        this.Hte.Actor.CapsuleComponent,
        e,
        PROFILE_FLOOR,
        PROFILE_FLOOR,
      );
    }
    tKr(t, i) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, i);
      let s = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Mao,
        PROFILE_DETECT_WATER_DEPTH,
      );
      return (
        (s = s && this.zWr(this.Mao.HitResult)) &&
        this.Mao.HitResult.bBlockingHit
      );
    }
    XWr() {
      var t = this.UWr,
        i = this.AWr;
      if (this.Lie.HasTag(855966206) && this.Lie.HasTag(-1714966381))
        t.Set(
          this.fWr.X,
          this.fWr.Y,
          this.fWr.Z + (1 - ENTER_SWIM_BIGGER_THAN_THIS) * this.vWr * 2,
        ),
          i.Set(this.fWr.X, this.fWr.Y, this.fWr.Z + this.iOa),
          this.tKr(t, i)
            ? (this.Depth = SWIMMING_MAX_DEPTH)
            : (this.Gce.CharacterMovement.SetMovementMode(3, 0),
              (this.Depth = 0));
      else if (
        (t.Set(this.MWr.X, this.MWr.Y, this.MWr.Z + 2 * this.vWr),
        i.Set(this.fWr.X, this.fWr.Y, this.fWr.Z - this.vWr),
        (this.Depth = this.YWr(t, i)),
        this.Depth > ENTER_SWIM_BIGGER_THAN_THIS)
      )
        return this.bWr(), !0;
      return !1;
    }
    iKr(t, i) {
      var s = this.pz,
        t =
          (s.FromUeVector(t),
          (s.Z += i),
          this.xWr.DeepCopy(s),
          this.Hte.SetActorLocation(
            this.xWr.ToUeVector(),
            "游泳.游泳入水播放位置设置",
            !0,
          ),
          this.Hte.Actor.CharacterMovement.SetMovementMode(3),
          this.cz);
      t.Reset(),
        this.Gce.SetForceSpeed(t),
        this.IsDebug &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Movement",
              58,
              "[游泳组件]游泳触发入水机制,游泳入水设置位置",
              ["坐标：", this.xWr],
              ["强制速度：", t],
            ),
          this.oKr(CharacterSwimUtils.DebugColor1));
    }
    DetectEnterWaterFromAir() {
      if (!(0 < this.Hte.ActorVelocityProxy.Z || this.Gce.FallingIntoWater)) {
        var i = this.cz,
          s = this.fz,
          s =
            (s.DeepCopy(this.Hte.ActorVelocityProxy),
            s.Multiply(this.mie, s),
            s.Addition(this.fWr, i),
            this.eKr(this.fWr, i));
        if (!s) {
          let t = this.tKr(this.fWr, i);
          var e = this.vWr;
          if (!t) {
            var h = this.fz;
            if ((h.FromUeVector(i), (h.Z -= e), (s = this.eKr(i, h)))) return;
            t = this.tKr(i, h);
          }
          t &&
            (this.JWr(this.IWr),
            !this.rKr(this.IWr) ||
              ((s = this.UWr).DeepCopy(this.yWr),
              (i = this.AWr).FromUeVector(s),
              (i.Z -= this.vWr * ENTER_SWIM_BIGGER_THAN_THIS * 2),
              this.eKr(s, i)) ||
              (this.cBe.StopAllSkills(
                "CharacterSwimComponent.DetectEnterWaterFromAir",
              ),
              this.iKr(s, e),
              this.Lie.AddTag(-104158548),
              (h = this.Entity.GetComponent(160)) &&
                (this.EnterSwimFromAirBuffIndex = h.AddBuffLocal(
                  CharacterBuffIds_1.buffId.FallImmune,
                  {
                    InstigatorId: this.Hte.CreatureData.GetCreatureDataId(),
                    Duration: 1,
                    Reason: "空中入水",
                  },
                )),
              (this.Gce.FallingIntoWater = !0),
              (this.BWr = Time_1.Time.Now + TIME_CLEAR_ENTER_WATER)));
        }
      }
    }
    JWr(t) {
      t.Z = Math.abs(t.Z);
    }
    nKr(t, i, s) {
      return !(
        t.Z < i.Z ||
        0 === this.YWr(t, i) ||
        this.yWr.Z < s ||
        (this.JWr(this.IWr), !this.rKr(this.IWr))
      );
    }
    sKr() {
      this.Gce.FallingIntoWater || this.DetectEnterWaterFromAir();
      var t = this.UWr,
        i = this.AWr;
      return (
        t.DeepCopy(this.fWr),
        (t.Z = this.MWr.Z + this.vWr),
        i.Set(this.fWr.X, this.fWr.Y, this.fWr.Z - this.vWr),
        !!this.nKr(t, i, this.fWr.Z) &&
          ((i.Z -= this.vWr * ENTER_SWIM_BIGGER_THAN_THIS * 2),
          !this.eKr(t, i, 1)) &&
          (this.bWr(),
          this.fWr.Z - this.yWr.Z < -this.vWr &&
            this.Hte.SetActorLocation(
              this.yWr.ToUeVector(),
              "游泳.入水位置修正",
              !0,
            ),
          this.IsDebug &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Movement", 58, "[游泳组件]触发空中入水"),
            this.oKr(CharacterSwimUtils.DebugColor2)),
          !0)
      );
    }
    aKr() {
      var t = this.UWr,
        i = this.AWr,
        s =
          (t.FromUeVector(this.fWr),
          (t.Z = this.MWr.Z + this.vWr),
          i.Set(this.fWr.X, this.fWr.Y, this.fWr.Z - this.vWr),
          this.fWr.Z + (1 - ENTER_SWIM_BIGGER_THAN_THIS) * this.vWr * 2);
      return (
        !!this.nKr(t, i, s) &&
        (this.bWr(),
        this.IsDebug &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 58, "[游泳组件]触发地面入水"),
          this.oKr(CharacterSwimUtils.DebugColor2)),
        !0)
      );
    }
    lKr() {
      var t;
      return (
        3 !== this.RWr.GetTsClimbState().攀爬状态 &&
        ((t = this.cz).FromUeVector(this.pWr),
        t.Multiply(this.vWr, t),
        t.Addition(this.MWr, this.UWr),
        this.AWr.Set(this.fWr.X, this.fWr.Y, this.fWr.Z - this.vWr),
        (t = this.fWr.Z + CLIMB_CHECK_ENTER_WATER_RATE * this.vWr),
        !!this.nKr(this.UWr, this.AWr, t)) &&
        !this.eKr(this.UWr, this.AWr, 1) &&
        (this.bWr(),
        this.IsDebug &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 58, "[游泳组件]触发攀爬入水"),
          this.oKr(CharacterSwimUtils.DebugColor2)),
        !0)
      );
    }
    _Kr() {
      var t = this.UWr,
        i = (this.pWr.Multiply(this.iOa, t), t.Addition(this.fWr, t), this.AWr),
        t =
          (this.pWr.Multiply(this.vWr, i),
          i.Addition(this.fWr, i),
          this.nKr(t, i, i.Z));
      if (t) {
        i = this.eKr(i, this.yWr);
        if (i)
          if (
            ModelManager_1.ModelManager.TraceElementModel.GetActorTrace().HitResult.ImpactPointZ_Array.Get(
              0,
            ) < this.Mao.HitResult.ImpactPointZ_Array.Get(0)
          )
            return this.FWr(), !1;
      }
      return t;
    }
    uKr() {
      var t = this._Kr();
      return (
        t &&
          (this.bWr(), this.IsDebug) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 58, "[游泳组件]触发保底的向上探测入水"),
          this.oKr(CharacterSwimUtils.DebugColor2)),
        t
      );
    }
    VWr(t) {
      this.Gce.FallingIntoWater &&
        Time_1.Time.Now > this.BWr &&
        ((this.Gce.FallingIntoWater = !1),
        this.Lie.RemoveTag(-104158548),
        this.EnterSwimFromAirBuffIndex) &&
        (this.Entity.GetComponent(160)?.RemoveBuffByHandle(
          this.EnterSwimFromAirBuffIndex,
          -1,
          "空中入水结束",
        ),
        (this.EnterSwimFromAirBuffIndex = 0));
      let i = !1;
      switch (t) {
        case 0:
          i = !1;
          break;
        case 1:
          i = this.sKr();
          break;
        case 2:
          i = this.lKr();
          break;
        case 3:
          i = this.aKr();
      }
      return (i = 0 !== t ? i || this.uKr() : i);
    }
    WWr(t) {
      var i;
      6 === this.Gce.CharacterMovement.MovementMode &&
        this.Gce.CharacterMovement.CustomMovementMode ===
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
        ((i = this.Lie.HasTag(388142570)),
        (this.SprintSwimOffset = i
          ? this.PWr.SprintZOffsetRate * this.Hte.Radius
          : 0),
        (this.Gce.FallingIntoWater = !1));
    }
    rKr(t) {
      return (
        MathUtils_1.MathUtils.DotProduct(t, Vector_1.Vector.ZAxisVector) >
        COS_EIGHTY
      );
    }
    uWr() {
      (this.BuffIndex = BigInt(0)), (this.SprintSwimOffset = 0);
    }
    QWr() {
      this.Lie.HasTag(855966206) &&
        (this.LWr && !this.rKr(this.IWr)
          ? (this.Gce.CharacterMovement.SetMovementMode(3, 0),
            this.IsDebug &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Movement",
                  58,
                  "[游泳组件]触发水面角度不够游泳支持触发出水",
                  ["水面法线:", this.IWr],
                ),
              this.oKr(CharacterSwimUtils.DebugColor3)))
          : this.LWr || this.Gce.FallingIntoWater
            ? this.Depth <= LEAVE_SWIM_LESS_THAN_THIS &&
              (1 === this.EWr
                ? (this.Gce.CharacterMovement.SetMovementMode(1, 0),
                  this.IsDebug &&
                    (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Movement",
                        58,
                        "[游泳组件]触发碰撞并且游泳深度不够触发出水",
                        ["当前深度:", this.Depth],
                        ["出水深度:", LEAVE_SWIM_LESS_THAN_THIS],
                      ),
                    this.oKr(CharacterSwimUtils.DebugColor3)))
                : 2 === this.EWr &&
                  this.Hte?.SetActorLocation(
                    this.Hte.LastActorLocation.ToUeVector(),
                    "SwimOff",
                    !1,
                  ))
            : this._Kr()
              ? (this.Depth = SWIMMING_MAX_DEPTH)
              : (this.Gce.CharacterMovement.SetMovementMode(1, 0),
                this.uWr(),
                this.IsDebug &&
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Movement",
                      58,
                      "[游泳组件]游泳向上探测出水未有水面触发出水",
                    ),
                  this.oKr(CharacterSwimUtils.DebugColor3))));
    }
    CheckCanEnterClimbFromSwim() {
      return (
        !this.Lie.HasTag(855966206) ||
        this.Depth <= CLIMB_CHECK_ENTER_WATER_RATE
      );
    }
    YWr(t, i) {
      return this.tKr(t, i)
        ? (this.IsDebug &&
            this.cKr(this.yWr.ToUeVector(), CharacterSwimUtils.DebugColor2),
          ((t.Z - i.Z) * (1 - this.TWr)) / (2 * this.vWr))
        : 0;
    }
    _Wr() {
      var t;
      this.I5r?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
      this.Lie.HasTag(-290630940)
        ? ((t = this.Gce.HasMoveInput),
          (t = ConfigManager_1.ConfigManager.SwimConfig.GetSwimBuffId(
            t,
            this.lWr,
          )),
          (this.BuffIndex = t))
        : (this.BuffIndex = BigInt(0));
    }
    FWr() {
      this.yWr && (this.yWr.Reset(), (this.yWr.Z = MIN_DEPTH)),
        this.IWr && this.IWr.Reset(),
        this.SWr && (this.SWr.Reset(), (this.SWr.Z = MIN_DEPTH));
    }
    GetWaterLocation() {
      return this.SWr.ToUeVector();
    }
    GetSwimLocation() {
      return this.yWr.ToUeVector();
    }
    GetWaterVolume() {
      return this.LWr;
    }
    SetEnterWaterState(t) {
      this.CWr = t ? 1 : 0;
    }
    GetAboveFootWaterSurfaceInfo() {
      var t, i, s, e;
      if (
        this.Hte?.SkeletalMesh &&
        this.uDn() &&
        !(this.Depth <= 0) &&
        this.IWr &&
        this.Depth !== SWIMMING_MAX_DEPTH
      )
        return (
          (t = this.Depth * this.vWr * 2),
          this.JWr(this.IWr),
          (i = Vector_1.Vector.Create(this.IWr)),
          (s = Vector_1.Vector.Create()).FromUeVector(
            this.Hte.SkeletalMesh.K2_GetComponentLocation(),
          ),
          (e = Vector_1.Vector.Create(this.Hte.ActorVelocityProxy)),
          {
            Depth: this.Depth,
            WaterHeight: t,
            SurfaceNormal: i,
            Velocity: e,
            Location: s,
          }
        );
    }
    oKr(t) {
      UE.KismetSystemLibrary.DrawDebugCapsule(
        this.Hte.Actor,
        this.Hte.Actor.K2_GetActorLocation(),
        this.Hte.Actor.CapsuleComponent.CapsuleHalfHeight,
        this.Hte.Actor.CapsuleComponent.CapsuleRadius,
        this.Hte.Actor.K2_GetActorRotation(),
        t,
        5,
        2,
      );
    }
    cKr(t, i) {
      UE.KismetSystemLibrary.DrawDebugSphere(
        this.Hte.Actor,
        t,
        this.Hte.Actor.CapsuleComponent.CapsuleHalfHeight,
        12,
        i,
        0,
        1,
      );
    }
    SetDebug(t) {
      (this.IsDebug = t), this.Mao.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
    }
    LogSwimTriggerCount() {
      this.IsDebug &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Movement",
          58,
          "[游泳组件] 当前进入游泳盒子数量:",
          ["actor", this.Hte?.Actor?.GetName()],
          ["count", this.InSwimTriggerCount],
        );
    }
  });
(CharacterSwimComponent.ZWr = new UE.FName("Water_No_Swim")),
  (CharacterSwimComponent.UseSwimTrigger = !1),
  (CharacterSwimComponent = CharacterSwimComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(69)],
      CharacterSwimComponent,
    )),
  (exports.CharacterSwimComponent = CharacterSwimComponent);
//# sourceMappingURL=CharacterSwimComponent.js.map
