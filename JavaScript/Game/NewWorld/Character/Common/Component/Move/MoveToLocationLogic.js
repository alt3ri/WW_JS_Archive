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
    (this.iqn = void 0),
      (this.rqn = void 0),
      (this.oqn = void 0),
      (this.Hte = void 0),
      (this.mBe = void 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.Hte = t.GetComponent(3)),
      (this.mBe = t.GetComponent(92)),
      (this.rqn = new MoveToLocation()),
      this.rqn.Init(t),
      (this.oqn = i);
  }
  UpdateMove(t) {
    this.oqn?.IsRunning
      ? this.oqn?.UpdateMove(t)
      : void 0 !== this.rqn?.GetCurrentMoveToLocation() &&
        this.rqn?.UpdateMove(t);
  }
  IsMoving() {
    return (
      this.oqn?.IsRunning || void 0 !== this.rqn?.GetCurrentMoveToLocation()
    );
  }
  IsMovingToLocation() {
    return void 0 !== this.rqn?.GetCurrentMoveToLocation();
  }
  MoveEnd(t) {
    this.oqn?.IsRunning && this.oqn.MoveEnd(t),
      void 0 !== this.rqn?.GetCurrentMoveToLocation() &&
        (this.rqn.MoveEnd(t), (this.iqn = void 0));
  }
  StopMove() {
    this.oqn?.IsRunning && this.oqn.StopMove(),
      void 0 !== this.rqn?.GetCurrentMoveToLocation() &&
        (this.rqn.StopMove(), (this.iqn = void 0));
  }
  StopMoveAlongPath() {
    this.oqn?.StopMove();
  }
  StopMoveToLocation() {
    this.rqn.StopMove(), (this.iqn = void 0);
  }
  Dispose() {
    this.oqn?.Dispose(), this.rqn?.Dispose();
  }
  GetCurrentToLocation() {
    return this.oqn?.IsRunning
      ? this.oqn.CurrentToLocation
      : void 0 !== this.rqn?.GetLastMoveToLocation()
        ? this.rqn.GetLastMoveToLocation()
        : void 0;
  }
  MoveToLocation(t, i = !0) {
    if (!this.rqn) return !1;
    var s = this.Hte.ActorLocationProxy,
      o = t.Distance ?? MoveToPointConfig.DefaultDistance;
    if (Vector_1.Vector.Dist2D(s, t.Position) < o) {
      if (t.CallbackList && 0 !== t.CallbackList.length)
        for (const h of t.CallbackList) h && h(1);
      return !0;
    }
    return (
      i && this.nqn(),
      t.CallbackList || (t.CallbackList = []),
      t.CallbackList.push((t) => {
        this.ZLe(t);
      }),
      this.rqn.SetMoveToLocation(t)
    );
  }
  NavigateMoveToLocation(i, t, s = !0) {
    if (!this.rqn) return !1;
    2 === this.Hte?.WanderDirectionType &&
      (i.MoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
      (this.iqn = []);
    var o = [],
      h = this.Hte.ActorLocationProxy,
      e = i.Distance ?? MoveToPointConfig.DefaultDistance;
    if (Vector_1.Vector.Dist2D(h, i.Position) < e) {
      if (i.CallbackList && 0 !== i.CallbackList.length)
        for (const n of i.CallbackList) n && n(1);
      return !0;
    }
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
    if ((s && this.nqn(), 0 < o.length)) {
      Vector_1.Vector.Dist2D(o[0], h) > e &&
        this.iqn.push(MoveToPointConfig.GetTempMovePointConfig(o[0], i));
      for (let t = 1; t < o.length; t++)
        this.iqn.push(MoveToPointConfig.GetTempMovePointConfig(o[t], i));
    }
    0 < this.iqn.length
      ? ((r = this.iqn.length - 1),
        this.iqn[r].CallbackList || (this.iqn[r].CallbackList = []),
        i.CallbackList && this.iqn[r].CallbackList.push(...i.CallbackList),
        this.iqn[r].CallbackList.push((t) => {
          this.ZLe(t);
        }))
      : this.iqn.push(i);
    for (let t = 0; t < this.iqn.length - 1; t++) {
      var a = t + 1;
      this.iqn[t].NextMovePointConfig = this.iqn[a];
    }
    return this.rqn.SetMoveToLocation(this.iqn[0]);
  }
  nqn() {
    void 0 !== this.rqn?.GetCurrentMoveToLocation() &&
      (this.rqn.StopMove(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn(
        "AI",
        43,
        "正在移动中，停止移动。",
        ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
        ["EntityId", this.Hte.Entity.Id],
      );
  }
  ZLe(t) {
    this.iqn = void 0;
  }
}
(exports.MoveToLocationController = MoveToLocationController).DebugDraw = !1;
class MoveToLocation {
  constructor() {
    (this.Jh = void 0),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.mBe = void 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.sqn = Vector_1.Vector.Create()),
      (this.jJo = Quat_1.Quat.Create()),
      (this.mie = 0),
      (this.nRi = -0),
      (this.WJo = Vector_1.Vector.Create()),
      (this.w3a = Vector_1.Vector.Create()),
      (this.wDe = 0),
      (this.KJo = Vector_1.Vector.Create(0, 0, 0)),
      (this.aqn = Vector_1.Vector.Create(0, 0, 0)),
      (this.hqn = void 0),
      (this.lqn = Vector_1.Vector.Create(0, 0, 0)),
      (this.dJo = 0),
      (this.CJo = 0),
      (this.JJo = void 0),
      (this._qn = void 0);
  }
  GetCurrentMoveToLocation() {
    return this.hqn?.Position ?? void 0;
  }
  GetLastMoveToLocation() {
    let t = this.hqn;
    for (; t && t?.NextMovePointConfig; ) t = this.hqn?.NextMovePointConfig;
    return t?.Position ?? void 0;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.mBe = this.Jh.GetComponent(92)),
      (this.oRe = this.Jh.GetComponent(163)),
      (this.wDe = this.Hte.CreatureData.GetPbDataId()),
      this.zJo();
  }
  SetMoveToLocation(t) {
    return (
      !!t &&
      (this.ht(),
      this.uqn(t),
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
    this.hqn &&
      (MoveToLocationController.DebugDraw &&
        GlobalData_1.GlobalData.IsPlayInEditor &&
        this.IJo(),
      (this.mie += t),
      1 < this.mie && ((this.mie = 0), this.yJo()),
      this.UpdateMoveToDirection()
        ? (!this.cqn() ||
            (this.hqn.ResetCondition && !this.hqn.ResetCondition()) ||
            this.mqn(t),
          this.MoveEnd(1))
        : this.hqn.ReturnTimeoutFailed &&
          t > MathCommon_1.MathCommon.KindaSmallNumber &&
          this.UJo(t));
  }
  Dispose() {
    this.StopMove();
  }
  UJo(t) {
    var i = this.nRi;
    if (Math.abs(this.CJo - i) / t > PER_TICK_MIN_MOVE_SPEED || 0 === this.CJo)
      this.dJo = this.hqn.ReturnTimeoutFailed;
    else if (((this.dJo -= t), this.dJo <= 0))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
            ["PbDataId", this.wDe],
            ["EntityId", this.Jh.Id],
            ["超时时限", this.hqn.ReturnTimeoutFailed],
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
            (t = this.WJo.X),
            (this.WJo.X = this.WJo.Z),
            (this.WJo.Z = t),
            this.Hte.SetInputDirect(this.WJo))
          : ((t = this.hqn.TurnSpeed),
            this.Hte.SetOverrideTurnSpeed(t),
            this.mBe &&
            this.mBe.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.Walk
              ? (this.hqn.FaceToPosition &&
                  (this.sqn.DeepCopy(this.hqn.FaceToPosition),
                  this.sqn.SubtractionEqual(this.Hte.ActorLocationProxy)),
                AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
                  this.Hte,
                  this.WJo,
                  this.jJo,
                  this.RTe,
                  this.hqn.TurnSpeed,
                  this.hqn.UseNearestDirection,
                  this.hqn.FaceToPosition ? this.sqn : void 0,
                ))
              : (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                  this.Hte,
                  this.WJo,
                  t,
                  this.hqn.IsFly,
                ),
                this.Hte.SetInputDirect(this.Hte.ActorForwardProxy))),
        !1)
    );
  }
  StopMove() {
    this.hqn &&
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
      this.hqn?.Clear(),
      (this.hqn = void 0));
  }
  MoveEnd(t) {
    var i = this.hqn?.NextMovePointConfig ?? void 0;
    this.hqn?.RunCallbackList(t),
      this.ht(),
      i
        ? this.uqn(i)
        : (this.StopMove(), this.hqn?.Clear(), (this.hqn = void 0));
  }
  uqn(t) {
    this.aqn.DeepCopy(this.Hte.ActorLocationProxy),
      t instanceof MoveToPointConfig
        ? (this.hqn = t)
        : this.hqn
          ? this.hqn.DeepCopy(t)
          : (this.hqn = new MoveToPointConfig(t, this.lqn));
  }
  ht() {
    (this.dJo = 0), (this.CJo = 0), this.aqn.Reset(), this.KJo.Reset();
  }
  ezo() {
    var t;
    this.WJo.DeepCopy(this.hqn.Position),
      this.WJo.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.w3a.DeepCopy(this.WJo),
      this.mBe?.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Climb
        ? (this.jye.DeepCopy(this.WJo),
          (t = this.jye.DotProduct(this.Hte.ActorForwardProxy)),
          this.jye.DeepCopy(this.Hte.ActorForwardProxy),
          this.jye.MultiplyEqual(t),
          this.jye.UnaryNegation(this.jye),
          this.jye.AdditionEqual(this.WJo),
          this.WJo.DeepCopy(this.jye))
        : this.hqn.IsFly || (this.WJo.Z = 0),
      (this.nRi = this.hqn.IsFly ? this.w3a.Size() : this.w3a.Size2D());
  }
  tzo() {
    if (this.nRi <= this.hqn.Distance) return !0;
    this.hqn.Position.Subtraction(this.aqn, this.jye),
      (this.jye.Z = 0),
      this.RTe.DeepCopy(this.w3a),
      (this.RTe.Z = 0);
    var t = this.RTe.DotProduct(this.jye);
    return (
      t < 0 &&
        (this.dqn(), Log_1.Log.CheckDebug()) &&
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
      i = this.Jh.GetComponent(38);
    i &&
      ((t = this.hqn.MoveSpeed),
      this.hqn.IsFly
        ? (i.CharacterMovement.SetMovementMode(5), t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.hqn.MoveState) &&
            CharacterUnifiedStateTypes_1.legalMoveStates
              .get(this.mBe.PositionState)
              .has(i) &&
            this.mBe.SetMoveState(i)));
  }
  dqn() {
    this.jye.DeepCopy(this.hqn.Position),
      this.hqn.IsFly || (this.jye.Z += this.Hte.HalfHeight),
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
  mqn(t) {
    var i;
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
      this.oRe && 1 < this.Jh.GetTickInterval()
        ? ((i = this.oRe.GetMeshTransform()),
          this.rzo(),
          this.oRe.SetModelBuffer(
            i,
            t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ))
        : this.rzo(),
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
  rzo() {
    this.hqn.IsFly || this.nzo(this.KJo, this.KJo),
      this.Hte.SetActorLocation(
        this.KJo.ToUeVector(),
        "拉回目标点设置坐标",
        !0,
      );
  }
  cqn() {
    return !(
      this.KJo.Size() < 1 ||
      (Vector_1.Vector.Dist2D(this.KJo, this.Hte.ActorLocationProxy) <
        this.hqn.Distance + RESET_LOCATION_TOLERANCE &&
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
    if (this.hqn && GlobalData_1.GlobalData.IsPlayInEditor) {
      this._qn ||
        (this._qn = new UE.LinearColor(
          0.5 < Math.random() ? 0 : 1,
          0.5 < Math.random() ? 0 : 1,
          0.5 < Math.random() ? 0 : 1,
          0,
        ));
      let t = this.hqn;
      for (
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this.Hte.ActorLocation,
          30,
          10,
          this._qn,
        );
        t;

      ) {
        var i = t.Position;
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          30,
          10,
          this._qn,
        ),
          (t = t.NextMovePointConfig);
      }
    }
  }
}
exports.MoveToLocation = MoveToLocation;
class MoveToPointConfig {
  constructor(t, i) {
    (this.Cqn = void 0),
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
      (this.Cqn = i || Vector_1.Vector.Create()),
      this.Cqn.DeepCopy(t.Position),
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
    return this.Cqn;
  }
  DeepCopy(t) {
    this.Cqn.DeepCopy(t.Position),
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
