"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveToPointConfig =
    exports.MoveToLocation =
    exports.MoveToLocationController =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine"),
  MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon"),
  AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CharacterActorComponent_1 = require("../CharacterActorComponent"),
  FIX_LOCATION_TOLERANCE = 2,
  PROFILE_KEY = "PatrolMoveLogic_ResetActorLocation",
  END_DISTANCE = 30,
  DEFAULT_TURN_SPEED = 360,
  RESET_LOCATION_TOLERANCE = 10,
  PER_TICK_MIN_MOVE_SPEED = 30;
class MoveToLocationController {
  constructor(t, i) {
    (this.Kbn = void 0),
      (this.Qbn = void 0),
      (this.Xbn = void 0),
      (this.Hte = void 0),
      (this.mBe = void 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.Hte = t.GetComponent(3)),
      (this.mBe = t.GetComponent(91)),
      (this.Qbn = new MoveToLocation()),
      this.Qbn.Init(t),
      (this.Xbn = i);
  }
  UpdateMove(t) {
    this.Xbn?.IsRunning
      ? this.Xbn?.UpdateMove(t)
      : void 0 !== this.Qbn?.GetCurrentMoveToLocation() &&
        this.Qbn?.UpdateMove(t);
  }
  IsMoving() {
    return (
      this.Xbn?.IsRunning || void 0 !== this.Qbn?.GetCurrentMoveToLocation()
    );
  }
  IsMovingToLocation() {
    return void 0 !== this.Qbn?.GetCurrentMoveToLocation();
  }
  MoveEnd(t) {
    this.Xbn?.IsRunning && this.Xbn.MoveEnd(t),
      void 0 !== this.Qbn?.GetCurrentMoveToLocation() &&
        (this.Qbn.MoveEnd(t), (this.Kbn = void 0));
  }
  StopMove() {
    this.Xbn?.IsRunning && this.Xbn.StopMove(),
      void 0 !== this.Qbn?.GetCurrentMoveToLocation() &&
        (this.Qbn.StopMove(), (this.Kbn = void 0));
  }
  StopMoveAlongPath() {
    this.Xbn?.StopMove();
  }
  StopMoveToLocation() {
    this.Qbn.StopMove(), (this.Kbn = void 0);
  }
  Dispose() {
    this.Xbn?.Dispose(), this.Qbn?.Dispose();
  }
  GetCurrentToLocation() {
    return this.Xbn?.IsRunning
      ? this.Xbn.CurrentToLocation
      : void 0 !== this.Qbn?.GetLastMoveToLocation()
        ? this.Qbn.GetLastMoveToLocation()
        : void 0;
  }
  MoveToLocation(t, i = !0) {
    var s, o;
    return (
      !!this.Qbn &&
      ((s = this.Hte.ActorLocationProxy),
      (o = t.Distance ?? MoveToPointConfig.DefaultDistance),
      Vector_1.Vector.Dist2D(s, t.Position) < o ||
        (i && this.$bn(),
        t.CallbackList || (t.CallbackList = []),
        t.CallbackList.push((t) => {
          this.ZLe(t);
        }),
        this.Qbn.SetMoveToLocation(t)))
    );
  }
  NavigateMoveToLocation(i, t, s = !0) {
    if (!this.Qbn) return !1;
    2 === this.Hte?.WanderDirectionType &&
      (i.MoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
      (this.Kbn = []);
    var o = [],
      h = this.Hte.ActorLocationProxy,
      e = i.Distance ?? MoveToPointConfig.DefaultDistance;
    if (Vector_1.Vector.Dist2D(h, i.Position) < e) return !0;
    this.jye.DeepCopy(h),
      this.mBe?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
        (this.jye.Z -= this.Hte.HalfHeight);
    var r = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
      this.Hte.Owner.GetWorld(),
      this.jye.ToUeVector(),
      i.Position.ToUeVector(),
      o,
      !0,
      !0,
    );
    if ((!r || 0 === o.length) && t)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "寻路失败或起点终点不在NavMesh上。",
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["EntityId", this.Hte.Entity.Id],
          ),
        !1
      );
    if ((s && this.$bn(), 0 < o.length)) {
      Vector_1.Vector.Dist2D(o[0], h) > e &&
        this.Kbn.push(MoveToPointConfig.GetTempMovePointConfig(o[0], i));
      for (let t = 1; t < o.length; t++)
        this.Kbn.push(MoveToPointConfig.GetTempMovePointConfig(o[t], i));
    }
    0 < this.Kbn.length
      ? ((r = this.Kbn.length - 1),
        this.Kbn[r].CallbackList || (this.Kbn[r].CallbackList = []),
        this.Kbn[r].CallbackList.push((t) => {
          this.ZLe(t);
        }))
      : this.Kbn.push(i);
    for (let t = 0; t < this.Kbn.length - 1; t++) {
      var a = t + 1;
      this.Kbn[t].NextMovePointConfig = this.Kbn[a];
    }
    return this.Qbn.SetMoveToLocation(this.Kbn[0]);
  }
  $bn() {
    void 0 !== this.Qbn?.GetCurrentMoveToLocation() &&
      (this.Qbn.StopMove(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn(
        "AI",
        43,
        "正在移动中，停止移动。",
        ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
        ["EntityId", this.Hte.Entity.Id],
      );
  }
  ZLe(t) {
    this.Kbn = void 0;
  }
}
(exports.MoveToLocationController = MoveToLocationController).DebugDraw = !1;
class MoveToLocation {
  constructor() {
    (this.Jh = void 0),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.mBe = void 0),
      (this.Gco = Rotator_1.Rotator.Create()),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.Ybn = Vector_1.Vector.Create()),
      (this.jJo = Quat_1.Quat.Create()),
      (this.mie = 0),
      (this.nRi = -0),
      (this.WJo = Vector_1.Vector.Create()),
      (this.wDe = 0),
      (this.KJo = Vector_1.Vector.Create(0, 0, 0)),
      (this.Jbn = Vector_1.Vector.Create(0, 0, 0)),
      (this.zbn = void 0),
      (this.Zbn = Vector_1.Vector.Create(0, 0, 0)),
      (this.dJo = 0),
      (this.CJo = 0),
      (this.JJo = void 0),
      (this.tqn = void 0);
  }
  GetCurrentMoveToLocation() {
    return this.zbn?.Position ?? void 0;
  }
  GetLastMoveToLocation() {
    let t = this.zbn;
    for (; t && t?.NextMovePointConfig; ) t = this.zbn?.NextMovePointConfig;
    return t?.Position ?? void 0;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.mBe = this.Jh.GetComponent(91)),
      (this.oRe = this.Jh.GetComponent(162)),
      (this.wDe = this.Hte.CreatureData.GetPbDataId()),
      this.zJo();
  }
  SetMoveToLocation(t) {
    return (
      !!t &&
      (this.ht(),
      this.iqn(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "开始移动。",
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["EntityId", this.Hte.Entity.Id],
          ["Config", t],
        ),
      !0)
    );
  }
  UpdateMove(t) {
    this.zbn &&
      (MoveToLocationController.DebugDraw &&
        GlobalData_1.GlobalData.IsPlayInEditor &&
        this.IJo(),
      (this.mie += t),
      1 < this.mie && ((this.mie = 0), this.yJo()),
      this.UpdateMoveToDirection()
        ? (!this.rqn() ||
            (this.zbn.ResetCondition && !this.zbn.ResetCondition()) ||
            this.oqn(t, !1),
          this.MoveEnd(1))
        : this.zbn.ReturnTimeoutFailed &&
          t > MathCommon_1.MathCommon.KindaSmallNumber &&
          this.UJo(t));
  }
  Dispose() {
    this.StopMove();
  }
  UJo(t) {
    var i = this.nRi;
    if (Math.abs(this.CJo - i) / t > PER_TICK_MIN_MOVE_SPEED || 0 === this.CJo)
      this.dJo = this.zbn.ReturnTimeoutFailed;
    else if (((this.dJo -= t), this.dJo <= 0))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
            ["PbDataId", this.wDe],
            ["EntityId", this.Jh.Id],
            ["超时时限", this.zbn.ReturnTimeoutFailed],
          ),
        void this.MoveEnd(2)
      );
    this.CJo = i;
  }
  UpdateMoveToDirection() {
    var t;
    return (
      this.ezo(),
      !!this.tzo() ||
        (this.WJo.Normalize(),
        this.mBe &&
        this.mBe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb
          ? (this.jJo.DeepCopy(this.Hte.ActorQuatProxy),
            this.jJo.Inverse(this.jJo),
            this.jJo.RotateVector(this.WJo, this.WJo),
            this.Hte.SetInputDirect(this.WJo))
          : ((t = this.zbn.TurnSpeed),
            this.Hte.SetOverrideTurnSpeed(t),
            this.mBe &&
            this.mBe.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.Walk
              ? (this.zbn.FaceToPosition &&
                  (this.Ybn.DeepCopy(this.zbn.FaceToPosition),
                  this.Ybn.SubtractionEqual(this.Hte.ActorLocationProxy)),
                AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
                  this.Hte,
                  this.WJo,
                  this.jJo,
                  this.RTe,
                  this.zbn.TurnSpeed,
                  this.zbn.UseNearestDirection,
                  this.zbn.FaceToPosition ? this.Ybn : void 0,
                ))
              : (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                  this.Hte,
                  this.WJo,
                  t,
                  this.zbn.IsFly,
                ),
                this.Hte.SetInputDirect(this.Hte.ActorForwardProxy))),
        !1)
    );
  }
  StopMove() {
    this.zbn &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "StopMove ClearInput",
          ["PbDataId", this.wDe],
          ["EntityId", this.Jh.Id],
        ),
      this.ht(),
      this.Hte.ClearInput(),
      this.zbn?.Clear(),
      (this.zbn = void 0));
  }
  MoveEnd(t) {
    var i = this.zbn?.NextMovePointConfig ?? void 0;
    this.zbn?.RunCallbackList(t),
      this.ht(),
      i
        ? this.iqn(i)
        : (this.StopMove(), this.zbn?.Clear(), (this.zbn = void 0));
  }
  iqn(t) {
    this.Jbn.DeepCopy(this.Hte.ActorLocationProxy),
      t instanceof MoveToPointConfig
        ? (this.zbn = t)
        : this.zbn
          ? this.zbn.DeepCopy(t)
          : (this.zbn = new MoveToPointConfig(t, this.Zbn));
  }
  ht() {
    (this.dJo = 0), (this.CJo = 0), this.Jbn.Reset(), this.KJo.Reset();
  }
  ezo() {
    this.WJo.DeepCopy(this.zbn.Position),
      this.WJo.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.zbn.IsFly || (this.WJo.Z = 0),
      (this.nRi = this.WJo.Size());
  }
  tzo() {
    if (this.nRi <= this.zbn.Distance) return !0;
    this.zbn.Position.Subtraction(this.Jbn, this.jye),
      (this.jye.Z = 0),
      this.RTe.DeepCopy(this.WJo),
      (this.RTe.Z = 0);
    var t = this.RTe.DotProduct(this.jye);
    return (
      t < 0 &&
        (this.nqn(), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "AI",
          43,
          "经过了目标位置",
          ["PbDataId", this.wDe],
          ["EntityId", this.Jh.Id],
          ["distance", this.nRi],
          ["dotProduct", t],
        ),
      t < 0
    );
  }
  yJo() {
    var t,
      i = this.Jh.GetComponent(37);
    i &&
      ((t = this.zbn.MoveSpeed),
      this.zbn.IsFly
        ? (i.CharacterMovement.SetMovementMode(5), t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.zbn.MoveState) &&
            CharacterUnifiedStateTypes_1.legalMoveStates
              .get(this.mBe.PositionState)
              .has(i) &&
            this.mBe.SetMoveState(i)));
  }
  nqn() {
    this.jye.DeepCopy(this.zbn.Position),
      this.zbn.IsFly || (this.jye.Z += this.Hte.HalfHeight),
      this.KJo.DeepCopy(this.jye),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "更新LastPatrolPoint",
          ["PbDataId", this.wDe],
          ["EntityId", this.Jh.Id],
          ["LastPatrolPoint", this.KJo],
          ["CurrentPoint", this.Hte.ActorLocationProxy],
        );
  }
  oqn(t, i) {
    var s;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        43,
        "Reset目标位置",
        ["PbDataId", this.wDe],
        ["EntityId", this.Jh.Id],
        ["deltaSeconds", t],
        ["LastPatrolPoint", this.KJo],
        ["CurrentPoint", this.Hte.ActorLocationProxy],
        [
          "Distance",
          Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy),
        ],
      ),
      this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1),
      this.Hte.ClearInput(),
      this.oRe && this.Jh.GetTickInterval() <= 1
        ? ((s = this.oRe.GetMeshTransform()),
          this.rzo(i),
          this.oRe.SetModelBuffer(
            s,
            t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ))
        : this.rzo(i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "Reset目标位置结束",
          ["PbDataId", this.wDe],
          ["EntityId", this.Jh.Id],
          ["ActorLocation", this.Hte.ActorLocationProxy],
          [
            "Distance",
            Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy),
          ],
        ),
      this.KJo.Set(0, 0, 0);
  }
  rzo(t) {
    this.zbn.IsFly || this.nzo(this.KJo, this.KJo),
      t
        ? (this.jye.DeepCopy(this.WJo),
          this.jye.ToOrientationRotator(this.Gco),
          this.Hte.SetActorLocationAndRotation(
            this.KJo.ToUeVector(),
            this.Gco.ToUeRotator(),
            "拉回目标点设置坐标",
            !0,
          ))
        : this.Hte.SetActorLocation(
            this.KJo.ToUeVector(),
            "拉回目标点设置坐标",
            !0,
          );
  }
  rqn() {
    return !(
      this.KJo.Size() < 1 ||
      (Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy) <
        this.zbn.Distance + RESET_LOCATION_TOLERANCE &&
        (this.KJo.Set(0, 0, 0), 1))
    );
  }
  zJo() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    (t.bIsSingle = !1),
      (t.bIgnoreSelf = !0),
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        t,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        t,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.JJo = t);
  }
  nzo(t, h) {
    this.jye.DeepCopy(t), (this.jye.Z += this.Hte.HalfHeight);
    var i = this.jye,
      t =
        (this.RTe.DeepCopy(t),
        (this.RTe.Z += CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
        this.RTe),
      s = this.JJo;
    (s.WorldContextObject = this.Hte.Actor),
      (s.Radius = this.Hte.ScaledRadius),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, i),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, t),
      s.ActorsToIgnore.Empty();
    for (const o of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
      s.ActorsToIgnore.Add(o);
    var i = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        this.Hte.Actor.CapsuleComponent,
        s,
        PROFILE_KEY,
        PROFILE_KEY,
      ),
      e = s.HitResult;
    if (i && e.bBlockingHit) {
      var r = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      let i = "";
      var a = e.Actors.Num();
      let s = -1,
        o = "";
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, 0, r);
      for (let t = 0; t < a; ++t) {
        var n = e.Actors.Get(t);
        if (
          n?.IsValid() &&
          ((i += n.GetName() + ", "), !n.IsA(UE.Character.StaticClass()))
        ) {
          (s = t),
            (o = n.GetName()),
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, t, r);
          break;
        }
      }
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
            ["PbDataId", this.wDe],
            ["EntityId", this.Jh.Id],
            ["经过修正的位置", r],
            ["Actors", i],
            ["HitLocationIndex", s],
            ["HitLocationName", o],
            ["this.ActorComp!.ScaledHalfHeight", this.Hte.ScaledHalfHeight],
            ["this.ActorComp!.ScaledRadius", this.Hte.ScaledRadius],
          ),
        (r.Z += this.Hte.ScaledHalfHeight - this.Hte.ScaledRadius),
        (r.Z += FIX_LOCATION_TOLERANCE),
        this.JJo &&
          ((this.JJo.WorldContextObject = void 0),
          this.JJo.ActorsToIgnore.Empty()),
        h.DeepCopy(r),
        !0
      );
    }
    return (
      this.JJo &&
        ((this.JJo.WorldContextObject = void 0),
        this.JJo.ActorsToIgnore.Empty()),
      !1
    );
  }
  IJo() {
    if (this.zbn && GlobalData_1.GlobalData.IsPlayInEditor) {
      this.tqn ||
        (this.tqn = new UE.LinearColor(
          0.5 < Math.random() ? 0 : 1,
          0.5 < Math.random() ? 0 : 1,
          0.5 < Math.random() ? 0 : 1,
          0,
        ));
      let t = this.zbn;
      for (
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this.Hte.ActorLocation,
          30,
          10,
          this.tqn,
        );
        t;

      ) {
        var i = t.Position;
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          30,
          10,
          this.tqn,
        ),
          (t = t.NextMovePointConfig);
      }
    }
  }
}
exports.MoveToLocation = MoveToLocation;
class MoveToPointConfig {
  constructor(t, i) {
    (this.sqn = void 0),
      (this.IsFly = !1),
      (this.ReturnTimeoutFailed = 0),
      (this.Distance = MoveToPointConfig.DefaultDistance),
      (this.TurnSpeed = MoveToPointConfig.DefaultTurnSpeed),
      (this.MoveState = void 0),
      (this.UseNearestDirection = !1),
      (this.MoveSpeed = void 0),
      (this.NextMovePointConfig = void 0),
      (this.FaceToPosition = void 0),
      (this.ResetCondition = void 0),
      (this.CallbackList = void 0),
      (this.sqn = i || Vector_1.Vector.Create()),
      this.sqn.DeepCopy(t.Position),
      (this.NextMovePointConfig = t.NextMovePointConfig ?? void 0),
      (this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance),
      (this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed),
      (this.MoveState = t.MoveState ?? void 0),
      (this.IsFly = t.IsFly ?? !1),
      (this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0),
      (this.UseNearestDirection = t.UseNearestDirection ?? !1),
      (this.MoveSpeed = t.MoveSpeed ?? void 0),
      (this.FaceToPosition = t.FaceToPosition ?? void 0),
      (this.CallbackList = []),
      t.CallbackList &&
        0 < t.CallbackList.length &&
        this.CallbackList.push(...t.CallbackList),
      t.ResetCondition && (this.ResetCondition = t.ResetCondition);
  }
  get Position() {
    return this.sqn;
  }
  DeepCopy(t) {
    this.sqn.DeepCopy(t.Position),
      (this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance),
      (this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed),
      (this.MoveState = t.MoveState ?? void 0),
      (this.IsFly = t.IsFly ?? !1),
      (this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0),
      (this.UseNearestDirection = t.UseNearestDirection ?? !1),
      (this.MoveSpeed = t.MoveSpeed),
      (this.FaceToPosition = t.FaceToPosition),
      (this.CallbackList = t.CallbackList),
      (this.ResetCondition = t.ResetCondition),
      this.NextMovePointConfig &&
      t.NextMovePointConfig &&
      this.NextMovePointConfig instanceof MoveToPointConfig &&
      this.NextMovePointConfig !== t.NextMovePointConfig
        ? this.NextMovePointConfig.DeepCopy(t.NextMovePointConfig)
        : (this.NextMovePointConfig = t.NextMovePointConfig);
  }
  RunCallbackList(t) {
    if (this.CallbackList && 0 !== this.CallbackList.length)
      for (const i of this.CallbackList) i && i(t);
  }
  Clear() {
    this.CallbackList && (this.CallbackList.length = 0),
      (this.ResetCondition = void 0),
      (this.NextMovePointConfig = void 0);
  }
  static GetTempMovePointConfig(t, i) {
    return {
      Position: t,
      IsFly: i.IsFly,
      Distance: i.Distance,
      MoveState: i.MoveState,
      MoveSpeed: i.MoveSpeed,
      TurnSpeed: i.TurnSpeed,
      ReturnTimeoutFailed: i.ReturnTimeoutFailed,
      UseNearestDirection: i.UseNearestDirection,
      FaceToPosition: i.FaceToPosition,
      ResetCondition: i.ResetCondition,
      NextMovePointConfig: void 0,
      CallbackList: void 0,
    };
  }
}
((exports.MoveToPointConfig = MoveToPointConfig).DefaultDistance =
  END_DISTANCE),
  (MoveToPointConfig.DefaultTurnSpeed = DEFAULT_TURN_SPEED);
//# sourceMappingURL=MoveToLocationLogic.js.map
