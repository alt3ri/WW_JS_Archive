"use strict";
var CharacterSwimComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var h,
        r = arguments.length,
        _ =
          r < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        _ = Reflect.decorate(t, i, e, s);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (h = t[o]) &&
            (_ = (r < 3 ? h(_) : 3 < r ? h(i, e, _) : h(i, e)) || _);
      return 3 < r && _ && Object.defineProperty(i, e, _), _;
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
  PreloadConstants_1 = require("../../../../World/Controller/PreloadConstants"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  PROFILE_DETECT_WATER_DEPTH = "CharacterSwimComponent_DetectWaterDepth",
  PROFILE_FLOOR = "CharacterSwimComponent_CheckHasArrivedFloorInSwimming",
  MAX_LAST_TICK_OFFSET_SQUARE = 1e6,
  MAX_BYTE = 255,
  MAX_SPEED_INTO_WATER = 50,
  ENTER_SWIM_BIGGER_THAN_THIS = 0.75,
  LEAVE_SWIM_LESS_THAN_THIS = 0.7,
  CLIMB_CHECK_ENTER_WATER_RATE = 0.8,
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
  waterAreaDetectExtent = new UE.Vector(500, 500, 2e3);
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
        (this.LWr = () => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Movement",
              58,
              "[游泳组件]设置游泳盒子保底入水检测",
            ),
            (this.DWr = !0);
        }),
        (this.RWr = (t, i) => {
          this.Lie.RemoveTag(-104158548),
            i === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
              ? ((this.MaxSpeed =
                  this.Gce.MovementData.FaceDirection.Standing.FastSwimSpeed),
                (this.AWr = !0),
                this.UWr())
              : i === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
                ? ((this.MaxSpeed =
                    this.Gce.MovementData.FaceDirection.Standing.NormalSwimSpeed),
                  (this.AWr = !1),
                  this.UWr())
                : this.PWr();
        }),
        (this.xWr = (t, i) => {
          t === CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? this.PWr()
            : i === CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
              this.UWr();
        }),
        (this.wWr = () => {
          this.UWr();
        }),
        (this.BWr = (t) => {
          var i =
            ((1 -
              MathUtils_1.MathUtils.Clamp(
                this.Gce.Speed / SWIMMING_FRICTION_MIN_SPEED,
                0,
                1,
              )) *
              SWIMMING_FRICTION_RATION +
              1) *
            SWIMMING_FRICTION;
          let e = this.Hte.ActorRotationProxy.Yaw - this.Hte.InputRotator.Yaw;
          for (; e > MathUtils_1.PI_DEG; ) e -= MathUtils_1.PI_DEG_DOUBLE;
          for (; e < -MathUtils_1.PI_DEG; ) e += MathUtils_1.PI_DEG_DOUBLE;
          e = Math.abs(e);
          var s =
              this.SwimAcceleratorCurve.GetFloatValue(e) * SWIMMING_ACCELERATOR,
            h =
              ((this.RotateSpeed = this.SwimRotationCurve.GetFloatValue(e)),
              1 === this.bWr ? 0 : exports.SWIMMING_BUOYANCY);
          this.Gce.CharacterMovement.KuroSwimming(
            t,
            !0,
            this.Depth,
            h,
            i,
            this.MaxSpeed,
            this.WaterSlope,
            s,
            exports.SWIMMING_DECELERATION,
          );
        }),
        (this.GWr = void 0),
        (this.NWr = void 0),
        (this.OWr = 0),
        (this.kWr = void 0),
        (this.FWr = 0),
        (this.Depth = 0),
        (this.RotateSpeed = 0),
        (this.SwimAcceleratorCurve = void 0),
        (this.SwimRotationCurve = void 0),
        (this.VWr = void 0),
        (this.HWr = void 0),
        (this.jWr = void 0),
        (this.WWr = 0),
        (this.KWr = !1),
        (this.WaterSlope = 0),
        (this.MaxSpeed = 0),
        (this.QWr = void 0),
        (this.Hte = void 0),
        (this.Lie = void 0),
        (this.W5r = void 0),
        (this.oRe = void 0),
        (this.cBe = void 0),
        (this.XWr = void 0),
        (this.Gce = void 0),
        (this.cz = void 0),
        (this.fz = void 0),
        (this.pz = void 0),
        (this.$Wr = void 0),
        (this.YWr = void 0),
        (this.JWr = void 0),
        (this.SprintSwimOffset = 0),
        (this.SprintSwimOffsetLerpSpeed = 0),
        (this.mie = -0),
        (this.zWr = void 0),
        (this.ZWr = BigInt(0)),
        (this.AWr = !1),
        (this.bWr = 1),
        (this.eKr = -0),
        (this.Iso = void 0),
        (this.InSwimTriggerCount = 0),
        (this.IsRole = !1),
        (this.DWr = !1),
        (this.h2r = (t) => {
          this.kWr.DeepCopy(this.Hte.ActorLocation);
        });
    }
    static get Dependencies() {
      return [3, 161, 185];
    }
    get BuffIndex() {
      return this.ZWr;
    }
    set BuffIndex(t) {
      this.ZWr !== t &&
        ((this.ZWr = t),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwimStrengthChanged,
          this.ZWr,
        ));
    }
    tKr() {
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
        (this.AWr = !1),
        (this.InSwimTriggerCount = 0),
        (this.DWr = !1),
        this.iKr(),
        (this.eKr = 0);
      var t = this.Entity.GetComponent(0).GetEntityType();
      return (
        (this.IsRole = t === Protocol_1.Aki.Protocol.HBs.Proto_Player),
        (this.bWr = 0),
        !!this.oKr() &&
          !(
            !this.cRr() ||
            !this.rKr() ||
            !this.nKr() ||
            (this.Iwr(),
            this.IsRole &&
              (EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
                this.RWr,
              ),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.CharOnPositionStateChanged,
                this.xWr,
              ),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.CustomMoveSwim,
                this.BWr,
              ),
              EventSystem_1.EventSystem.AddWithTarget(
                this.Entity,
                EventDefine_1.EEventName.RoleOnStateInherit,
                this.h2r,
              ),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.WorldDone,
                this.LWr,
              ),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.TeleportComplete,
                this.LWr,
              ),
              EventSystem_1.EventSystem.Add(
                EventDefine_1.EEventName.OnUpdateSceneTeam,
                this.LWr,
              ),
              this.Lie?.AddTagChangedListener(-290630940, this.wWr)),
            this.Hte.Actor.Tags.Add(
              CharacterNameDefines_1.CharacterNameDefines
                .ENABLE_MOVE_TRIGGER_TAG,
            ),
            0)
          )
      );
    }
    Iwr() {
      (this.Iso = UE.NewObject(UE.TraceSphereElement.StaticClass())),
        (this.Iso.WorldContextObject = this.Hte.Actor),
        (this.Iso.Radius = 1),
        (this.Iso.bIgnoreSelf = !0),
        (this.Iso.bIsSingle = !1),
        this.Iso.SetDrawDebugTrace(this.IsDebug ? 1 : 0),
        this.Iso.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          this.Iso,
          CharacterSwimUtils.DebugColor3,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          this.Iso,
          CharacterSwimUtils.DebugColor4,
        );
    }
    sKr() {
      this.Iso && (this.Iso.Dispose(), (this.Iso = void 0));
    }
    TLn() {
      var t, i;
      return CharacterSwimComponent_1.UseSwimTrigger
        ? 0 < this.InSwimTriggerCount
        : ((t = (0, puerts_1.$ref)(0)),
          (i = (0, puerts_1.$ref)(0)),
          UE.NavigationSystemV1.NavigationGetWaterDeep(
            this.Hte.Actor,
            this.Hte.ActorLocation,
            waterAreaDetectExtent,
            t,
            i,
            this.Hte.Actor,
            void 0,
          ));
    }
    OnTick(t) {
      this.aKr(),
        !this.Hte.IsAutonomousProxy ||
          this.Lie.HasTag(464607714) ||
          this.Lie.HasTag(-1523054094) ||
          (this.IsRole
            ? (6 === this.Gce.CharacterMovement.MovementMode &&
                this.Gce.CharacterMovement.CustomMovementMode ===
                  CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM) ||
              this.TLn() ||
              this.DWr
              ? ((this.mie = t * MathUtils_1.MathUtils.MillisecondToSecond),
                this.GWr.DeepCopy(this.Hte.ActorLocation),
                this.oRe && (this.GWr.Z += this.oRe.IkMeshOffset),
                this.NWr.DeepCopy(this.Hte.ActorUpProxy),
                Vector_1.Vector.DistSquared(this.kWr, this.GWr) >
                  MAX_LAST_TICK_OFFSET_SQUARE &&
                  (this.IsDebug &&
                    Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Movement",
                      58,
                      "[游泳组件]与上一帧位置差巨大,重新设置这一帧位置",
                      ["LastTickLocation", this.kWr],
                      ["PlayerLocation", this.GWr],
                    ),
                  this.kWr.DeepCopy(this.Hte.ActorLocation)),
                (t = this.hKr(this.lKr())),
                this._Kr(),
                t ||
                  (this.uKr(this.mie),
                  (this.FWr = this.cKr()),
                  this.mKr(),
                  Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.kWr),
                  (this.DWr = !1)))
              : this.Gce.FallingIntoWater &&
                Time_1.Time.Now > this.eKr &&
                ((this.Gce.FallingIntoWater = !1),
                this.Lie.RemoveTag(-104158548))
            : this.TLn()
              ? this.Hte?.ActorLocationProxy.Equals(
                  this.Hte.LastActorLocation,
                ) ||
                TickScoreController_1.TickScoreController.SwimTickScore.AddScore(
                  this,
                )
              : 6 === this.Gce.CharacterMovement.MovementMode &&
                this.Gce.CharacterMovement.CustomMovementMode ===
                  CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
                this.Gce.CharacterMovement.SetMovementMode(3, 0));
    }
    ScoreUpdate() {
      this.Active &&
        this.Hte &&
        (Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.GWr),
        this.dKr(),
        Vector_1.Vector.VectorCopy(this.Hte.ActorLocation, this.kWr));
    }
    OnEnd() {
      return (
        this.CKr(),
        this.sKr(),
        this.IsRole &&
          (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
            this.RWr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CharOnPositionStateChanged,
            this.xWr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.CustomMoveSwim,
            this.BWr,
          ),
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.RoleOnStateInherit,
            this.h2r,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.WorldDone,
            this.LWr,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.TeleportComplete,
            this.LWr,
          ),
          EventSystem_1.EventSystem.Remove(
            EventDefine_1.EEventName.OnUpdateSceneTeam,
            this.LWr,
          )),
        !0
      );
    }
    iKr() {
      (this.$Wr = Vector_1.Vector.Create(0, 0, 0)),
        (this.YWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.cz = Vector_1.Vector.Create(0, 0, 0)),
        (this.fz = Vector_1.Vector.Create(0, 0, 0)),
        (this.pz = Vector_1.Vector.Create(0, 0, 0)),
        (this.zWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.kWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.GWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.NWr = Vector_1.Vector.Create(0, 0, 0)),
        (this.VWr = Vector_1.Vector.Create(0, 0, MIN_DEPTH)),
        (this.HWr = Vector_1.Vector.Create(0, 0, MIN_DEPTH)),
        (this.jWr = Vector_1.Vector.Create(0, 0, 0));
    }
    CKr() {
      (this.cz = void 0),
        (this.fz = void 0),
        (this.pz = void 0),
        (this.$Wr = void 0),
        (this.YWr = void 0),
        (this.zWr = void 0),
        (this.kWr = void 0),
        (this.GWr = void 0),
        (this.NWr = void 0),
        (this.VWr = void 0),
        (this.HWr = void 0),
        (this.jWr = void 0);
    }
    oKr() {
      this.Hte = this.Entity.GetComponent(3);
      var t = this.Hte.ActorLocationProxy,
        t =
          (Vector_1.Vector.VectorCopy(t, this.GWr),
          this.Entity.GetComponent(185));
      if (!t?.Valid) return !1;
      (this.Lie = t),
        (this.W5r = this.Entity.GetComponent(158)),
        (this.oRe = this.Entity.GetComponent(160)),
        (this.cBe = this.Entity.GetComponent(33)),
        (this.XWr = this.Entity.GetComponent(31));
      t = this.Entity.GetComponent(161);
      return (
        !!t?.Valid &&
        ((this.Gce = t),
        (this.OWr = this.Hte.HalfHeight),
        Vector_1.Vector.VectorCopy(this.Hte.ActorLocationProxy, this.kWr),
        !0)
      );
    }
    cRr() {
      return (
        !this.IsRole ||
        ((this.JWr =
          ConfigManager_1.ConfigManager.SwimConfig.GetSwimConfigByRoleBodyId(
            this.Hte.CreatureData.GetRoleConfig().RoleBody,
          )),
        !!this.JWr &&
          ((this.SprintSwimOffset = 0),
          (this.SprintSwimOffsetLerpSpeed = this.JWr.SprintZOffsetSpeed),
          !0))
      );
    }
    rKr() {
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
    nKr() {
      return (
        (this.QWr = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          this.Hte.Actor.DtBaseMovementSetting,
          CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
        )),
        !!this.QWr
      );
    }
    cKr() {
      var t;
      return this.Gce.HasSwimmingBlock
        ? ((t = (0, puerts_1.$ref)(void 0)),
          this.Gce.CharacterMovement.K2_FindFloor(this.GWr.ToUeVector(), t),
          (t = (0, puerts_1.$unref)(t)),
          this.Gce?.CharacterMovement?.IsWalkable(t.HitResult) ? 1 : 2)
        : 0;
    }
    _Kr() {
      var t, i, e;
      this.Lie.HasTag(855966206) &&
        ((t = this.cz),
        this.NWr.Multiply(2 * this.OWr, t),
        (i = this.$Wr),
        this.GWr.Addition(t, i),
        this.NWr.Multiply(this.OWr, t),
        (e = this.YWr),
        this.GWr.Subtraction(t, e),
        (this.Depth = this.gKr(i, e)),
        (this.KWr = this.Iso.HitResult.bBlockingHit),
        this.fKr(this.jWr));
    }
    pKr(i) {
      let e = !1,
        s = !1;
      this.HWr.Reset(),
        this.jWr.Reset(),
        this.VWr.Reset(),
        (this.HWr.Z = MIN_DEPTH),
        (this.VWr.Z = MIN_DEPTH);
      var h = i.GetHitCount();
      for (let t = 0; t < h; ++t) {
        var r = i.Actors.Get(t);
        r?.IsValid() &&
          (r.ActorHasTag(CharacterSwimComponent_1.vKr)
            ? ((s = !0),
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                i,
                t,
                this.cz,
              ),
              this.cz.Z > this.VWr.Z && this.VWr.DeepCopy(this.cz))
            : ((e = !0),
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                i,
                t,
                this.cz,
              ),
              this.cz.Z > this.HWr.Z &&
                (TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                  i,
                  t,
                  this.jWr,
                ),
                this.HWr.DeepCopy(this.cz),
                (this.WWr = i.TimeArray.Get(t)))));
      }
      return !s && e && this.VWr.DeepCopy(this.HWr), e;
    }
    lKr() {
      return this.Gce.FallingIntoWater || this.Lie.HasTag(40422668)
        ? 1
        : this.Lie.HasTag(504239013)
          ? 2
          : this.Lie.HasTag(-1898186757)
            ? 3
            : 0;
    }
    MKr(t, i, e = this.Hte.ScaledRadius) {
      var s = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      (s.WorldContextObject = this.Hte.Actor),
        (s.Radius = e),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, i),
        s.ActorsToIgnore.Empty();
      for (const h of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
        s.ActorsToIgnore.Add(h);
      return TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        this.Hte.Actor.CapsuleComponent,
        s,
        PROFILE_FLOOR,
        PROFILE_FLOOR,
      );
    }
    SKr(t, i) {
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Iso, t),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Iso, i);
      let e = TraceElementCommon_1.TraceElementCommon.SphereTrace(
        this.Iso,
        PROFILE_DETECT_WATER_DEPTH,
      );
      return (
        (e = e && this.pKr(this.Iso.HitResult)) &&
        this.Iso.HitResult.bBlockingHit
      );
    }
    dKr() {
      var t = this.$Wr,
        i = this.YWr;
      if (this.Lie.HasTag(855966206) && this.Lie.HasTag(-1714966381))
        t.Set(
          this.GWr.X,
          this.GWr.Y,
          this.GWr.Z + (1 - ENTER_SWIM_BIGGER_THAN_THIS) * this.OWr * 2,
        ),
          i.Set(
            this.GWr.X,
            this.GWr.Y,
            this.GWr.Z + FIVE_HUNDRED_TO_FIND_SURFACE,
          ),
          this.SKr(t, i)
            ? (this.Depth = SWIMMING_MAX_DEPTH)
            : (this.Gce.CharacterMovement.SetMovementMode(3, 0),
              (this.Depth = 0));
      else if (
        (t.Set(this.kWr.X, this.kWr.Y, this.kWr.Z + 2 * this.OWr),
        i.Set(this.GWr.X, this.GWr.Y, this.GWr.Z - this.OWr),
        (this.Depth = this.gKr(t, i)),
        this.Depth > ENTER_SWIM_BIGGER_THAN_THIS)
      )
        return this.tKr(), !0;
      return !1;
    }
    EKr(t, i) {
      var e = this.pz,
        t =
          (e.FromUeVector(t),
          (e.Z += i),
          this.zWr.DeepCopy(e),
          this.Hte.SetActorLocation(
            this.zWr.ToUeVector(),
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
              ["坐标：", this.zWr],
              ["强制速度：", t],
            ),
          this.yKr(CharacterSwimUtils.DebugColor1));
    }
    DetectEnterWaterFromAir() {
      if (!(0 < this.Hte.ActorVelocityProxy.Z || this.Gce.FallingIntoWater)) {
        var i = this.cz,
          e = this.fz,
          e =
            (e.DeepCopy(this.Hte.ActorVelocityProxy),
            e.Multiply(this.mie, e),
            e.Addition(this.GWr, i),
            this.MKr(this.GWr, i));
        if (!e) {
          let t = this.SKr(this.GWr, i);
          var s = this.OWr;
          if (!t) {
            var h = this.fz;
            if ((h.FromUeVector(i), (h.Z -= s), (e = this.MKr(i, h)))) return;
            t = this.SKr(i, h);
          }
          t &&
            (this.fKr(this.jWr),
            !this.IKr(this.jWr) ||
              ((e = this.$Wr).DeepCopy(this.HWr),
              (i = this.YWr).FromUeVector(e),
              (i.Z -= this.OWr * ENTER_SWIM_BIGGER_THAN_THIS * 2),
              this.MKr(e, i)) ||
              (this.cBe.StopAllSkills(
                "CharacterSwimComponent.DetectEnterWaterFromAir",
              ),
              this.EKr(e, s),
              this.Lie.AddTag(-104158548),
              (this.Gce.FallingIntoWater = !0),
              (this.eKr = Time_1.Time.Now + TIME_CLEAR_ENTER_WATER)));
        }
      }
    }
    fKr(t) {
      t.Z = Math.abs(t.Z);
    }
    TKr(t, i) {
      return !(
        t.Z < i.Z ||
        0 === this.gKr(t, i) ||
        (this.fKr(this.jWr), !this.IKr(this.jWr))
      );
    }
    LKr() {
      this.Gce.FallingIntoWater || this.DetectEnterWaterFromAir();
      var t = this.$Wr,
        i = this.YWr,
        e = this.cz,
        e =
          (e.FromUeVector(this.NWr),
          e.Multiply(this.OWr, e),
          this.kWr.Z + this.OWr);
      return (
        t.FromUeVector(this.GWr),
        (t.Z = e),
        i.Set(this.GWr.X, this.GWr.Y, this.GWr.Z),
        !!this.TKr(t, i) &&
          ((i.Z -= this.OWr * ENTER_SWIM_BIGGER_THAN_THIS * 2),
          !this.MKr(t, i, 1)) &&
          (this.tKr(),
          this.GWr.Z - this.HWr.Z < -this.OWr &&
            this.Hte.SetActorLocation(
              this.HWr.ToUeVector(),
              "游泳.入水位置修正",
              !0,
            ),
          this.IsDebug &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Movement", 58, "[游泳组件]触发空中入水"),
            this.yKr(CharacterSwimUtils.DebugColor2)),
          !0)
      );
    }
    DKr() {
      var t = this.$Wr,
        i = this.YWr,
        e = this.cz,
        e =
          (e.FromUeVector(this.NWr),
          e.Multiply(this.OWr, e),
          this.kWr.Z + this.OWr);
      return (
        t.FromUeVector(this.GWr),
        (t.Z = e),
        i.Set(
          this.GWr.X,
          this.GWr.Y,
          this.GWr.Z + (1 - ENTER_SWIM_BIGGER_THAN_THIS) * this.OWr * 2,
        ),
        !!this.TKr(t, i) &&
          (this.tKr(),
          this.IsDebug &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Movement", 58, "[游泳组件]触发地面入水"),
            this.yKr(CharacterSwimUtils.DebugColor2)),
          !0)
      );
    }
    AKr() {
      var t;
      return (
        3 !== this.XWr.GetTsClimbState().攀爬状态 &&
        ((t = this.cz).FromUeVector(this.NWr),
        t.Multiply(this.OWr, t),
        t.Addition(this.kWr, this.$Wr),
        t.Multiply(CLIMB_CHECK_ENTER_WATER_RATE, t),
        t.Addition(this.GWr, this.YWr),
        !!this.TKr(this.$Wr, this.YWr)) &&
        !this.MKr(this.$Wr, this.YWr, 1) &&
        (this.tKr(),
        this.IsDebug &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 58, "[游泳组件]触发攀爬入水"),
          this.yKr(CharacterSwimUtils.DebugColor2)),
        !0)
      );
    }
    UKr() {
      var t = this.$Wr,
        i =
          (this.NWr.Multiply(FIVE_HUNDRED_TO_FIND_SURFACE, t),
          t.Addition(this.GWr, t),
          this.YWr),
        t =
          (this.NWr.Multiply(this.OWr, i),
          i.Addition(this.GWr, i),
          this.TKr(t, i));
      if (t) {
        i = this.MKr(i, this.HWr);
        if (i)
          if (
            ModelManager_1.ModelManager.TraceElementModel.GetActorTrace().HitResult.ImpactPointZ_Array.Get(
              0,
            ) < this.Iso.HitResult.ImpactPointZ_Array.Get(0)
          )
            return !1;
      }
      return t;
    }
    PKr() {
      var t = this.UKr();
      return (
        t &&
          (this.tKr(), this.IsDebug) &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Movement", 58, "[游泳组件]触发保底的向上探测入水"),
          this.yKr(CharacterSwimUtils.DebugColor2)),
        t
      );
    }
    hKr(t) {
      this.Gce.FallingIntoWater &&
        Time_1.Time.Now > this.eKr &&
        ((this.Gce.FallingIntoWater = !1), this.Lie.RemoveTag(-104158548));
      let i = !1;
      switch (t) {
        case 0:
          i = !1;
          break;
        case 1:
          i = this.LKr();
          break;
        case 2:
          i = this.AKr();
          break;
        case 3:
          i = this.DKr();
      }
      return (i = 0 !== t ? i || this.PKr() : i);
    }
    uKr(t) {
      var i;
      6 === this.Gce.CharacterMovement.MovementMode &&
        this.Gce.CharacterMovement.CustomMovementMode ===
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWIM &&
        ((i = this.Lie.HasTag(388142570)),
        (this.SprintSwimOffset = i
          ? this.JWr.SprintZOffsetRate * this.Hte.Radius
          : 0),
        (this.Gce.FallingIntoWater = !1));
    }
    IKr(t) {
      return (
        MathUtils_1.MathUtils.DotProduct(t, Vector_1.Vector.ZAxisVector) >
        COS_EIGHTY
      );
    }
    PWr() {
      (this.BuffIndex = BigInt(0)), (this.SprintSwimOffset = 0);
    }
    mKr() {
      this.Lie.HasTag(855966206) &&
        (this.NWr.FromUeVector(this.Hte.ActorUpProxy),
        this.KWr && !this.IKr(this.jWr)
          ? (this.Gce.CharacterMovement.SetMovementMode(3, 0),
            this.IsDebug &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Movement",
                  58,
                  "[游泳组件]触发水面角度不够游泳支持触发出水",
                  ["水面法线:", this.jWr],
                ),
              this.yKr(CharacterSwimUtils.DebugColor3)))
          : this.KWr || this.Gce.FallingIntoWater
            ? this.Depth <= LEAVE_SWIM_LESS_THAN_THIS &&
              (1 === this.FWr
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
                    this.yKr(CharacterSwimUtils.DebugColor3)))
                : 2 === this.FWr &&
                  this.Hte?.SetActorLocation(
                    this.Hte.LastActorLocation.ToUeVector(),
                    "SwimOff",
                    !1,
                  ))
            : this.UKr()
              ? (this.Depth = SWIMMING_MAX_DEPTH)
              : (this.Gce.CharacterMovement.SetMovementMode(1, 0),
                this.PWr(),
                this.IsDebug &&
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Movement",
                      58,
                      "[游泳组件]游泳向上探测出水未有水面触发出水",
                    ),
                  this.yKr(CharacterSwimUtils.DebugColor3))));
    }
    CheckCanEnterClimbFromSwim() {
      return (
        !this.Lie.HasTag(855966206) ||
        this.Depth <= CLIMB_CHECK_ENTER_WATER_RATE
      );
    }
    gKr(t, i) {
      return this.SKr(t, i)
        ? (this.IsDebug &&
            this.xKr(this.HWr.ToUeVector(), CharacterSwimUtils.DebugColor2),
          (Vector_1.Vector.Dist(t, i) * (1 - this.WWr)) / (2 * this.OWr))
        : 0;
    }
    UWr() {
      var t;
      this.W5r?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Water &&
      this.Lie.HasTag(-290630940)
        ? ((t = this.Gce.HasMoveInput),
          (t = ConfigManager_1.ConfigManager.SwimConfig.GetSwimBuffId(
            t,
            this.AWr,
          )),
          (this.BuffIndex = t))
        : (this.BuffIndex = BigInt(0));
    }
    aKr() {
      this.HWr && (this.HWr.Reset(), (this.HWr.Z = MIN_DEPTH)),
        this.jWr && this.jWr.Reset(),
        this.VWr && (this.VWr.Reset(), (this.VWr.Z = MIN_DEPTH));
    }
    GetWaterLocation() {
      return this.VWr.ToUeVector();
    }
    GetSwimLocation() {
      return this.HWr.ToUeVector();
    }
    GetWaterVolume() {
      return this.KWr;
    }
    SetEnterWaterState(t) {
      this.bWr = t ? 1 : 0;
    }
    GetAboveFootWaterSurfaceInfo() {
      var t, i, e, s;
      if (
        this.Hte?.SkeletalMesh &&
        this.TLn() &&
        !(this.Depth <= 0) &&
        this.jWr &&
        this.Depth !== SWIMMING_MAX_DEPTH
      )
        return (
          (t = this.Depth * this.OWr * 2),
          this.fKr(this.jWr),
          (i = Vector_1.Vector.Create(this.jWr)),
          (e = Vector_1.Vector.Create()).FromUeVector(
            this.Hte.SkeletalMesh.K2_GetComponentLocation(),
          ),
          (s = Vector_1.Vector.Create(this.Hte.ActorVelocityProxy)),
          {
            Depth: this.Depth,
            WaterHeight: t,
            SurfaceNormal: i,
            Velocity: s,
            Location: e,
          }
        );
    }
    yKr(t) {
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
    xKr(t, i) {
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
      (this.IsDebug = t), this.Iso.SetDrawDebugTrace(this.IsDebug ? 1 : 0);
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
(CharacterSwimComponent.vKr = new UE.FName("Water_No_Swim")),
  (CharacterSwimComponent.UseSwimTrigger = !1),
  (CharacterSwimComponent = CharacterSwimComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(66)],
      CharacterSwimComponent,
    )),
  (exports.CharacterSwimComponent = CharacterSwimComponent);
//# sourceMappingURL=CharacterSwimComponent.js.map
