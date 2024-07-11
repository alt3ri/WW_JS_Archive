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
    (this.QPn = void 0),
      (this.$Pn = void 0),
      (this.XPn = void 0),
      (this.Hte = void 0),
      (this.Hte = t.GetComponent(3)),
      (this.$Pn = new MoveToLocation()),
      this.$Pn.Init(t),
      (this.XPn = i);
  }
  UpdateMove(t) {
    this.XPn?.IsRunning
      ? this.XPn?.UpdateMove(t)
      : void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
        this.$Pn?.UpdateMove(t);
  }
  IsMoving() {
    return (
      this.XPn?.IsRunning || void 0 !== this.$Pn?.GetCurrentMoveToLocation()
    );
  }
  IsMovingToLocation() {
    return void 0 !== this.$Pn?.GetCurrentMoveToLocation();
  }
  MoveEnd(t) {
    this.XPn?.IsRunning && this.XPn.MoveEnd(t),
      void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
        (this.$Pn.MoveEnd(t), (this.QPn = void 0));
  }
  StopMove() {
    this.XPn?.IsRunning && this.XPn.StopMove(),
      void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
        (this.$Pn.StopMove(), (this.QPn = void 0));
  }
  StopMoveAlongPath() {
    this.XPn?.StopMove();
  }
  StopMoveToLocation() {
    this.$Pn.StopMove(), (this.QPn = void 0);
  }
  Dispose() {
    this.XPn?.Dispose(), this.$Pn?.Dispose();
  }
  GetCurrentToLocation() {
    return this.XPn?.IsRunning
      ? this.XPn.CurrentToLocation
      : void 0 !== this.$Pn?.GetLastMoveToLocation()
        ? this.$Pn.GetLastMoveToLocation()
        : void 0;
  }
  MoveToLocation(t, i = !0) {
    var s, o;
    return (
      !!this.$Pn &&
      ((s = this.Hte.ActorLocationProxy),
      (o = t.Distance ?? MoveToPointConfig.DefaultDistance),
      Vector_1.Vector.Dist2D(s, t.Position) < o ||
        (i && this.YPn(),
        t.CallbackList || (t.CallbackList = []),
        t.CallbackList.push((t) => {
          this.ZLe(t);
        }),
        this.$Pn.SetMoveToLocation(t)))
    );
  }
  NavigateMoveToLocation(i, t, s = !0) {
    if (!this.$Pn) return !1;
    2 === this.Hte?.WanderDirectionType &&
      (i.MoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk),
      (this.QPn = []);
    var o = [],
      h = this.Hte.ActorLocationProxy,
      e = i.Distance ?? MoveToPointConfig.DefaultDistance;
    if (Vector_1.Vector.Dist2D(h, i.Position) < e) return !0;
    var r = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
      this.Hte.Owner.GetWorld(),
      h.ToUeVector(),
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
    if ((s && this.YPn(), 0 < o.length)) {
      Vector_1.Vector.Dist2D(o[0], h) > e &&
        this.QPn.push(MoveToPointConfig.GetTempMovePointConfig(o[0], i));
      for (let t = 1; t < o.length; t++)
        this.QPn.push(MoveToPointConfig.GetTempMovePointConfig(o[t], i));
    }
    0 < this.QPn.length
      ? ((r = this.QPn.length - 1),
        this.QPn[r].CallbackList || (this.QPn[r].CallbackList = []),
        this.QPn[r].CallbackList.push((t) => {
          this.ZLe(t);
        }))
      : this.QPn.push(i);
    for (let t = 0; t < this.QPn.length - 1; t++) {
      var a = t + 1;
      this.QPn[t].NextMovePointConfig = this.QPn[a];
    }
    return this.$Pn.SetMoveToLocation(this.QPn[0]);
  }
  YPn() {
    void 0 !== this.$Pn?.GetCurrentMoveToLocation() &&
      (this.$Pn.StopMove(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn(
        "AI",
        43,
        "正在移动中，停止移动。",
        ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
        ["EntityId", this.Hte.Entity.Id],
      );
  }
  ZLe(t) {
    this.QPn = void 0;
  }
}
(exports.MoveToLocationController = MoveToLocationController).DebugDraw = !1;
class MoveToLocation {
  constructor() {
    (this.Jh = void 0),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.mBe = void 0),
      (this.Fuo = Rotator_1.Rotator.Create()),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.JPn = Vector_1.Vector.Create()),
      (this.QYo = Quat_1.Quat.Create()),
      (this.mie = 0),
      (this.nDi = -0),
      (this.XYo = Vector_1.Vector.Create()),
      (this.wDe = 0),
      (this.$Yo = Vector_1.Vector.Create(0, 0, 0)),
      (this.zPn = Vector_1.Vector.Create(0, 0, 0)),
      (this.ZPn = void 0),
      (this.ewn = Vector_1.Vector.Create(0, 0, 0)),
      (this.fYo = 0),
      (this.pYo = 0),
      (this.eJo = void 0),
      (this.twn = void 0);
  }
  GetCurrentMoveToLocation() {
    return this.ZPn?.Position ?? void 0;
  }
  GetLastMoveToLocation() {
    let t = this.ZPn;
    for (; t && t?.NextMovePointConfig; ) t = this.ZPn?.NextMovePointConfig;
    return t?.Position ?? void 0;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.mBe = this.Jh.GetComponent(89)),
      (this.oRe = this.Jh.GetComponent(160)),
      (this.wDe = this.Hte.CreatureData.GetPbDataId()),
      this.tJo();
  }
  SetMoveToLocation(t) {
    return (
      !!t &&
      (this.ht(),
      this.iwn(t),
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
    this.ZPn &&
      (MoveToLocationController.DebugDraw &&
        GlobalData_1.GlobalData.IsPlayInEditor &&
        this.DYo(),
      (this.mie += t),
      1 < this.mie && ((this.mie = 0), this.LYo()),
      this.UpdateMoveToDirection()
        ? (!this.rwn() ||
            (this.ZPn.ResetCondition && !this.ZPn.ResetCondition()) ||
            this.own(t, !1),
          this.MoveEnd(1))
        : this.ZPn.ReturnTimeoutFailed &&
          t > MathCommon_1.MathCommon.KindaSmallNumber &&
          this.xYo(t));
  }
  Dispose() {
    this.StopMove();
  }
  xYo(t) {
    var i = this.nDi;
    if (Math.abs(this.pYo - i) / t > PER_TICK_MIN_MOVE_SPEED || 0 === this.pYo)
      this.fYo = this.ZPn.ReturnTimeoutFailed;
    else if (((this.fYo -= t), this.fYo <= 0))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
            ["PbDataId", this.wDe],
            ["EntityId", this.Jh.Id],
            ["超时时限", this.ZPn.ReturnTimeoutFailed],
          ),
        void this.MoveEnd(2)
      );
    this.pYo = i;
  }
  UpdateMoveToDirection() {
    var t;
    return (
      this.oJo(),
      !!this.rJo() ||
        (this.XYo.Normalize(),
        this.mBe &&
        this.mBe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Climb
          ? (this.QYo.DeepCopy(this.Hte.ActorQuatProxy),
            this.QYo.Inverse(this.QYo),
            this.QYo.RotateVector(this.XYo, this.XYo),
            this.Hte.SetInputDirect(this.XYo))
          : ((t = this.ZPn.TurnSpeed),
            this.Hte.SetOverrideTurnSpeed(t),
            this.mBe &&
            this.mBe.MoveState ===
              CharacterUnifiedStateTypes_1.ECharMoveState.Walk
              ? (this.ZPn.FaceToPosition &&
                  (this.JPn.DeepCopy(this.ZPn.FaceToPosition),
                  this.JPn.SubtractionEqual(this.Hte.ActorLocationProxy)),
                AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
                  this.Hte,
                  this.XYo,
                  this.QYo,
                  this.RTe,
                  this.ZPn.TurnSpeed,
                  this.ZPn.UseNearestDirection,
                  this.ZPn.FaceToPosition ? this.JPn : void 0,
                ))
              : (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                  this.Hte,
                  this.XYo,
                  t,
                  this.ZPn.IsFly,
                ),
                this.Hte.SetInputDirect(this.Hte.ActorForwardProxy))),
        !1)
    );
  }
  StopMove() {
    this.ZPn &&
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
      this.ZPn?.Clear(),
      (this.ZPn = void 0));
  }
  MoveEnd(t) {
    var i = this.ZPn?.NextMovePointConfig ?? void 0;
    this.ZPn?.RunCallbackList(t),
      this.ht(),
      i
        ? this.iwn(i)
        : (this.StopMove(), this.ZPn?.Clear(), (this.ZPn = void 0));
  }
  iwn(t) {
    this.zPn.DeepCopy(this.Hte.ActorLocationProxy),
      t instanceof MoveToPointConfig
        ? (this.ZPn = t)
        : this.ZPn
          ? this.ZPn.DeepCopy(t)
          : (this.ZPn = new MoveToPointConfig(t, this.ewn));
  }
  ht() {
    (this.fYo = 0), (this.pYo = 0), this.zPn.Reset(), this.$Yo.Reset();
  }
  oJo() {
    this.XYo.DeepCopy(this.ZPn.Position),
      this.XYo.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.ZPn.IsFly || (this.XYo.Z = 0),
      (this.nDi = this.XYo.Size());
  }
  rJo() {
    if (this.nDi <= this.ZPn.Distance) return !0;
    this.ZPn.Position.Subtraction(this.zPn, this.jye),
      (this.jye.Z = 0),
      this.RTe.DeepCopy(this.XYo),
      (this.RTe.Z = 0);
    var t = this.RTe.DotProduct(this.jye);
    return (
      t < 0 &&
        (this.nwn(), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "AI",
          43,
          "经过了目标位置",
          ["PbDataId", this.wDe],
          ["EntityId", this.Jh.Id],
          ["distance", this.nDi],
          ["dotProduct", t],
        ),
      t < 0
    );
  }
  LYo() {
    var t,
      i = this.Jh.GetComponent(36);
    i &&
      ((t = this.ZPn.MoveSpeed),
      this.ZPn.IsFly
        ? (i.CharacterMovement.SetMovementMode(5), t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.ZPn.MoveState) &&
            CharacterUnifiedStateTypes_1.legalMoveStates
              .get(this.mBe.PositionState)
              .has(i) &&
            this.mBe.SetMoveState(i)));
  }
  nwn() {
    this.jye.DeepCopy(this.ZPn.Position),
      this.ZPn.IsFly || (this.jye.Z += this.Hte.HalfHeight),
      this.$Yo.DeepCopy(this.jye),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "更新LastPatrolPoint",
          ["PbDataId", this.wDe],
          ["EntityId", this.Jh.Id],
          ["LastPatrolPoint", this.$Yo],
          ["CurrentPoint", this.Hte.ActorLocationProxy],
        );
  }
  own(t, i) {
    var s;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        43,
        "Reset目标位置",
        ["PbDataId", this.wDe],
        ["EntityId", this.Jh.Id],
        ["deltaSeconds", t],
        ["LastPatrolPoint", this.$Yo],
        ["CurrentPoint", this.Hte.ActorLocationProxy],
        [
          "Distance",
          Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy),
        ],
      ),
      this.oRe?.MainAnimInstance?.ConsumeExtractedRootMotion(1),
      this.Hte.ClearInput(),
      this.oRe && this.Jh.GetTickInterval() <= 1
        ? ((s = this.oRe.GetMeshTransform()),
          this.aJo(i),
          this.oRe.SetModelBuffer(
            s,
            t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
          ))
        : this.aJo(i),
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
            Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy),
          ],
        ),
      this.$Yo.Set(0, 0, 0);
  }
  aJo(t) {
    this.ZPn.IsFly || this.hJo(this.$Yo, this.$Yo),
      t
        ? (this.jye.DeepCopy(this.XYo),
          this.jye.ToOrientationRotator(this.Fuo),
          this.Hte.SetActorLocationAndRotation(
            this.$Yo.ToUeVector(),
            this.Fuo.ToUeRotator(),
            "拉回目标点设置坐标",
            !0,
          ))
        : this.Hte.SetActorLocation(
            this.$Yo.ToUeVector(),
            "拉回目标点设置坐标",
            !0,
          );
  }
  rwn() {
    return !(
      this.$Yo.Size() < 1 ||
      (Vector_1.Vector.Dist2D(this.$Yo, this.Hte.ActorLocationProxy) <
        this.ZPn.Distance + RESET_LOCATION_TOLERANCE &&
        (this.$Yo.Set(0, 0, 0), 1))
    );
  }
  tJo() {
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
      (this.eJo = t);
  }
  hJo(t, h) {
    this.jye.DeepCopy(t), (this.jye.Z += this.Hte.HalfHeight);
    var i = this.jye,
      t =
        (this.RTe.DeepCopy(t),
        (this.RTe.Z += CharacterActorComponent_1.FIX_SPAWN_TRACE_HEIGHT),
        this.RTe),
      s = this.eJo;
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
        this.eJo &&
          ((this.eJo.WorldContextObject = void 0),
          this.eJo.ActorsToIgnore.Empty()),
        h.DeepCopy(r),
        !0
      );
    }
    return (
      this.eJo &&
        ((this.eJo.WorldContextObject = void 0),
        this.eJo.ActorsToIgnore.Empty()),
      !1
    );
  }
  DYo() {
    if (this.ZPn && GlobalData_1.GlobalData.IsPlayInEditor) {
      this.twn ||
        (this.twn = new UE.LinearColor(
          0.5 < Math.random() ? 0 : 1,
          0.5 < Math.random() ? 0 : 1,
          0.5 < Math.random() ? 0 : 1,
          0,
        ));
      let t = this.ZPn;
      for (
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this.Hte.ActorLocation,
          30,
          10,
          this.twn,
        );
        t;

      ) {
        var i = t.Position;
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          30,
          10,
          this.twn,
        ),
          (t = t.NextMovePointConfig);
      }
    }
  }
}
exports.MoveToLocation = MoveToLocation;
class MoveToPointConfig {
  constructor(t, i) {
    (this.swn = void 0),
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
      (this.swn = i || Vector_1.Vector.Create()),
      this.swn.DeepCopy(t.Position),
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
    return this.swn;
  }
  DeepCopy(t) {
    this.swn.DeepCopy(t.Position),
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
