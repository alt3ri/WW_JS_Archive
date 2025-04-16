"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveToPointConfig =
    exports.MoveToLocation =
    exports.MoveToLocationController =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../../Core/Container/Queue"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
  Quat_1 = require("../../../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
  GlobalData_1 = require("../../../../../GlobalData"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  MOVE_STATE_CHANGE_SECOND = 1,
  END_DISTANCE = 30,
  DEFAULT_TURN_SPEED = 360,
  RESET_LOCATION_TOLERANCE = 10,
  PER_TICK_MIN_MOVE_SPEED = 30;
class MoveToLocationController {
  constructor(t, i) {
    (this.Y2l = new Queue_1.Queue()),
      (this.rqn = void 0),
      (this.oqn = void 0),
      (this.Hte = void 0),
      (this.mBe = void 0),
      (this.Hte = t.GetComponent(3)),
      (this.mBe = t.GetComponent(99)),
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
      void 0 !== this.rqn?.GetCurrentMoveToLocation() && this.rqn.MoveEnd(t);
  }
  StopMove() {
    this.oqn?.IsRunning && this.oqn.StopMove(),
      void 0 !== this.rqn?.GetCurrentMoveToLocation() && this.rqn.StopMove();
  }
  StopMoveAlongPath() {
    this.oqn?.StopMove();
  }
  StopMoveToLocation() {
    this.rqn.StopMove();
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
  GetMoveToLocationLogic() {
    if (this.rqn?.GetCurrentMoveToLocation()) return this.rqn;
  }
  MoveToLocation(t, i = !0) {
    if (!this.rqn) return !1;
    var o = this.Hte.ActorLocationProxy,
      s = t.Distance ?? MoveToPointConfig.DefaultDistance;
    if (
      GravityUtils_1.GravityUtils.GetDistSquared2dForActor(
        this.Hte,
        o,
        t.Position,
      ) <
      s * s
    ) {
      if (t.CallbackList && 0 !== t.CallbackList.length)
        for (const h of t.CallbackList) h && h(1);
      return !0;
    }
    return i && this.nqn(), this.rqn.SetMoveToLocation(t);
  }
  NavigateMoveToLocation(t, i, o = !0) {
    if (!this.rqn) return !1;
    2 === this.Hte?.WanderDirectionType &&
      (t.MoveState = CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
    var s = this.Hte.ActorLocationProxy,
      h = t.Distance ?? MoveToPointConfig.DefaultDistance;
    if (
      GravityUtils_1.GravityUtils.GetDistSquared2dForActor(
        this.Hte,
        s,
        t.Position,
      ) <
      h * h
    ) {
      if (t.CallbackList && 0 !== t.CallbackList.length)
        for (const e of t.CallbackList) e && e(1);
      return !0;
    }
    this.mBe?.PositionState ===
    CharacterUnifiedStateTypes_1.ECharPositionState.Ground
      ? MoveToLocationController.jye.DeepCopy(this.Hte.FloorLocation)
      : MoveToLocationController.jye.DeepCopy(s);
    s = MoveToLocationController.GetNavigateMoveToLocationQueue(
      this.Hte,
      MoveToLocationController.jye,
      t.Position,
      this.Y2l,
      h,
    );
    return i && !s
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            42,
            "寻路失败或起点终点不在NavMesh上。",
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["EntityId", this.Hte.Entity.Id],
          ),
        !1)
      : (o && this.nqn(),
        this.Y2l.Empty ||
          (t.Position.DeepCopy(this.Y2l.Pop()),
          (t.NextMovePointConfig = this.Y2l)),
        this.rqn.SetMoveToLocation(t));
  }
  nqn() {
    void 0 !== this.rqn?.GetCurrentMoveToLocation() &&
      (this.rqn.StopMove(), Log_1.Log.CheckWarn()) &&
      Log_1.Log.Warn(
        "AI",
        42,
        "正在移动中，停止移动。",
        ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
        ["EntityId", this.Hte.Entity.Id],
      );
  }
  static GetNavigateMoveToLocationQueue(t, i, o, s, h) {
    s.Clear(), (MoveToLocationController.Zxl.length = 0);
    var e = t.ActorLocationProxy;
    if (
      !AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
        t.Owner.GetWorld(),
        i.ToUeVector(),
        o.ToUeVector(),
        MoveToLocationController.Zxl,
        !0,
        !0,
      ) ||
      0 === MoveToLocationController.Zxl.length
    )
      return !1;
    if (0 < MoveToLocationController.Zxl.length) {
      Vector_1.Vector.Dist2D(MoveToLocationController.Zxl[0], e) > h &&
        s.Push(MoveToLocationController.Zxl[0]);
      for (let t = 1; t < MoveToLocationController.Zxl.length; t++)
        s.Push(MoveToLocationController.Zxl[t]);
    }
    return !0;
  }
}
((exports.MoveToLocationController = MoveToLocationController).DebugDraw = !1),
  (MoveToLocationController.jye = Vector_1.Vector.Create()),
  (MoveToLocationController.Zxl = []);
class MoveToLocation {
  constructor() {
    (this.Jh = void 0),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.mBe = void 0),
      (this.mie = MOVE_STATE_CHANGE_SECOND),
      (this.nRi = -0),
      (this.WJo = Vector_1.Vector.Create()),
      (this.c6a = Vector_1.Vector.Create()),
      (this.wDe = 0),
      (this.KJo = Vector_1.Vector.Create(0, 0, 0)),
      (this.aqn = Vector_1.Vector.Create(0, 0, 0)),
      (this.hqn = void 0),
      (this.lqn = Vector_1.Vector.Create(0, 0, 0)),
      (this.dJo = 0),
      (this._qn = void 0);
  }
  GetCurrentMoveToLocation() {
    return this.hqn?.Position ?? void 0;
  }
  GetLastMoveToLocation() {
    let t = this.hqn?.Position;
    return (
      (t = this.hqn?.NextMovePointConfig?.Empty
        ? t
        : this.hqn?.NextMovePointConfig?.Get(
            this.hqn.NextMovePointConfig.Size - 1,
          )) ?? void 0
    );
  }
  GetCurrentDistance() {
    if (this.hqn?.HasNextPoint()) {
      var t = this.GetLastMoveToLocation();
      if (t)
        return this.hqn.IsFly
          ? Vector_1.Vector.Dist(this.Hte.ActorLocationProxy, t)
          : Vector_1.Vector.Dist2D(this.Hte.ActorLocationProxy, t);
    }
    return this.nRi;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.mBe = this.Jh.GetComponent(99)),
      (this.oRe = this.Jh.GetComponent(175)),
      (this.wDe = this.Hte.CreatureData.GetPbDataId());
  }
  SetMoveToLocation(t) {
    return (
      !!t &&
      (this.ht(),
      this.uqn(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "开始移动。",
          ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
          ["EntityId", this.Hte.Entity.Id],
          ["Config", t],
          ["CollisionEnable", this.Hte.DisableCollisionHandle?.Empty],
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
      this.mie > MOVE_STATE_CHANGE_SECOND && ((this.mie = 0), this.yJo()),
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
    Math.sqrt(
      GravityUtils_1.GravityUtils.GetDistSquared2dForActor(
        this.Hte,
        this.Hte.ActorLocationProxy,
        this.Hte.LastActorLocation,
      ),
    ) /
      t >
    PER_TICK_MIN_MOVE_SPEED
      ? (this.dJo = this.hqn.ReturnTimeoutFailed)
      : ((this.dJo -= t),
        this.dJo <= 0 &&
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "AI",
              42,
              "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
              ["PbDataId", this.wDe],
              ["EntityId", this.Jh.Id],
              ["超时时限", this.hqn.ReturnTimeoutFailed],
            ),
          this.MoveEnd(2)));
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
          ? (MoveToLocation.jJo.DeepCopy(this.Hte.ActorQuatProxy),
            MoveToLocation.jJo.Inverse(MoveToLocation.jJo),
            MoveToLocation.jJo.RotateVector(this.WJo, this.WJo),
            (t = this.WJo.X),
            (this.WJo.X = this.WJo.Z),
            (this.WJo.Z = t),
            this.Hte.SetInputDirect(this.WJo))
          : ((t = this.hqn.TurnSpeed * (this.Jh?.GetTickInterval() ?? 1)),
            this.Hte.SetOverrideTurnSpeed(t),
            !this.mBe ||
            this.mBe.MoveState !==
              CharacterUnifiedStateTypes_1.ECharMoveState.Walk ||
            this.hqn?.IsForward
              ? (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
                  this.Hte,
                  this.WJo,
                  t,
                  this.hqn.IsFly,
                ),
                this.Hte.SetInputDirect(this.Hte.ActorForwardProxy))
              : (this.hqn.FaceToPosition &&
                  (MoveToLocation.sqn.DeepCopy(this.hqn.FaceToPosition),
                  MoveToLocation.sqn.SubtractionEqual(
                    this.Hte.ActorLocationProxy,
                  )),
                AiContollerLibrary_1.AiControllerLibrary.InputNearestDirection(
                  this.Hte,
                  this.WJo,
                  MoveToLocation.jJo,
                  MoveToLocation.RTe,
                  this.hqn.TurnSpeed,
                  this.hqn.UseNearestDirection,
                  this.hqn.FaceToPosition ? MoveToLocation.sqn : void 0,
                ))),
        !1)
    );
  }
  StopMove() {
    this.hqn &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
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
    var i = this.hqn?.UpdateNextPoint();
    1 === t && i
      ? this.HAl()
      : (this.hqn?.RunCallbackList(t),
        this.ht(),
        this.StopMove(),
        this.hqn?.Clear(),
        (this.hqn = void 0));
  }
  uqn(t) {
    this.aqn.DeepCopy(this.Hte.ActorLocationProxy),
      t instanceof MoveToPointConfig
        ? (this.hqn = t)
        : this.hqn
          ? this.hqn.DeepCopy(t)
          : (this.hqn = new MoveToPointConfig(t, this.lqn)),
      (this.dJo = this.hqn.ReturnTimeoutFailed);
  }
  ht() {
    (this.dJo = 0), this.aqn.Reset(), this.KJo.Reset();
  }
  ezo() {
    var t;
    this.hqn.UpdateTargetPosition() &&
      this.aqn.DeepCopy(this.Hte.ActorLocationProxy),
      this.WJo.DeepCopy(this.hqn.Position),
      this.WJo.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.c6a.DeepCopy(this.WJo),
      this.mBe?.PositionState ===
      CharacterUnifiedStateTypes_1.ECharPositionState.Climb
        ? (MoveToLocation.jye.DeepCopy(this.WJo),
          (t = MoveToLocation.jye.DotProduct(this.Hte.ActorForwardProxy)),
          MoveToLocation.jye.DeepCopy(this.Hte.ActorForwardProxy),
          MoveToLocation.jye.MultiplyEqual(t),
          MoveToLocation.jye.UnaryNegation(MoveToLocation.jye),
          MoveToLocation.jye.AdditionEqual(this.WJo),
          this.WJo.DeepCopy(MoveToLocation.jye))
        : this.hqn.IsFly ||
          GravityUtils_1.GravityUtils.SetZnInGravityForActor(
            this.Hte,
            this.WJo,
            0,
          ),
      (this.nRi = this.hqn.IsFly
        ? this.c6a.Size()
        : Math.sqrt(
            GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(
              this.Hte,
              this.c6a,
            ),
          ));
  }
  tzo() {
    if (this.nRi <= this.hqn.Distance) return !0;
    this.hqn.Position.Subtraction(this.aqn, MoveToLocation.jye),
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(
        this.Hte,
        MoveToLocation.jye,
        0,
      ),
      MoveToLocation.RTe.DeepCopy(this.c6a),
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(
        this.Hte,
        MoveToLocation.RTe,
        0,
      );
    var t = MoveToLocation.RTe.DotProduct(MoveToLocation.jye);
    return (
      t < 0 &&
        (this.dqn(), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "AI",
          42,
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
      i = this.Jh.GetComponent(44);
    i &&
      ((t = this.hqn.MoveSpeed),
      this.hqn.IsFly
        ? (this.Hte?.Actor.KuroSetMovementMode({
            Mode: 5,
            Context: "[MoveToLocation.UpdateMoveStateAndSpeed]",
          }),
          t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.hqn.MoveState) &&
            CharacterUnifiedStateTypes_1.legalMoveStates
              .get(this.mBe.PositionState)
              .has(i) &&
            this.mBe.SetMoveState(i)));
  }
  dqn() {
    this.KJo.DeepCopy(this.hqn.Position),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "经过目标位置，更新拉回点记录",
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
        42,
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
          42,
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
    this.hqn.IsFly
      ? this.Hte.SetActorLocation(
          this.KJo.ToUeVector(),
          "拉回目标点设置坐标",
          !1,
        )
      : this.Hte.FixBornLocation("拉回目标点地面修正", !0, this.KJo, !1, !0) ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            42,
            "未能检测到地面，没设置拉回目标点",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.Hte.CreatureData.GetPbDataId()],
            ["LastPatrolPoint", this.KJo],
            ["ActorLocation", this.Hte.ActorLocationProxy],
          ));
  }
  cqn() {
    return !(
      this.KJo.Size() < 1 ||
      (GravityUtils_1.GravityUtils.GetDistSquared2dForActor(
        this.Hte,
        this.KJo,
        this.Hte.ActorLocationProxy,
      ) <
        MathUtils_1.MathUtils.Square(
          this.hqn.Distance + RESET_LOCATION_TOLERANCE,
        ) &&
        (this.KJo.Set(0, 0, 0), 1))
    );
  }
  HAl() {
    MoveToLocation.jye.DeepCopy(this.hqn.Position),
      MoveToLocation.jye.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.hqn?.IsFly ||
        GravityUtils_1.GravityUtils.SetZnInGravityForActor(
          this.Hte,
          MoveToLocation.jye,
          0,
        ),
      MoveToLocation.jye.Normalize(),
      this.Hte?.ClearInput(),
      this.Hte?.SetInputDirect(MoveToLocation.jye);
    var t = this.Hte.ActorVelocityProxy.Size();
    MoveToLocation.jye.MultiplyEqual(t),
      this.Hte.ActorVelocityProxy.Set(
        MoveToLocation.jye.X,
        MoveToLocation.jye.Y,
        MoveToLocation.jye.Z,
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
      var i = this.hqn;
      if (
        (UE.KismetSystemLibrary.D_DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this.Hte.ActorLocation,
          30,
          10,
          this._qn,
        ),
        UE.KismetSystemLibrary.D_DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this.hqn.Position.ToUeVector(),
          30,
          10,
          this._qn,
        ),
        i.NextMovePointConfig)
      )
        for (let t = 0; t < i.NextMovePointConfig.Size; t++)
          UE.KismetSystemLibrary.D_DrawDebugSphere(
            GlobalData_1.GlobalData.World,
            i.NextMovePointConfig.Get(t).ToUeVector(),
            30,
            10,
            this._qn,
          );
    }
  }
}
((exports.MoveToLocation = MoveToLocation).jye = Vector_1.Vector.Create()),
  (MoveToLocation.RTe = Vector_1.Vector.Create()),
  (MoveToLocation.sqn = Vector_1.Vector.Create()),
  (MoveToLocation.jJo = Quat_1.Quat.Create());
class MoveToPointConfig {
  constructor(t, i) {
    (this.Cqn = void 0),
      (this.ReferencePosition = void 0),
      (this.IsFly = !1),
      (this.IsForward = !1),
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
      (this.IsForward = t.IsForward ?? !1),
      (this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0),
      (this.UseNearestDirection = t.UseNearestDirection ?? !1),
      (this.MoveSpeed = t.MoveSpeed ?? void 0),
      (this.FaceToPosition = t.FaceToPosition ?? void 0),
      (this.CallbackList = []),
      t.CallbackList &&
        0 < t.CallbackList.length &&
        this.CallbackList.push(...t.CallbackList),
      t.ResetCondition && (this.ResetCondition = t.ResetCondition),
      t.ReferencePosition && (this.ReferencePosition = t.ReferencePosition);
  }
  get Position() {
    return this.Cqn;
  }
  UpdateTargetPosition() {
    return !(
      !this.ReferencePosition ||
      this.HasNextPoint() ||
      (this.Cqn.DeepCopy(this.ReferencePosition()), 0)
    );
  }
  DeepCopy(t) {
    this.Cqn.DeepCopy(t.Position),
      (this.Distance = t.Distance ?? MoveToPointConfig.DefaultDistance),
      (this.TurnSpeed = t.TurnSpeed ?? MoveToPointConfig.DefaultTurnSpeed),
      (this.MoveState = t.MoveState ?? void 0),
      (this.IsFly = t.IsFly ?? !1),
      (this.IsForward = t.IsForward ?? !1),
      (this.ReturnTimeoutFailed = t.ReturnTimeoutFailed ?? 0),
      (this.UseNearestDirection = t.UseNearestDirection ?? !1),
      (this.MoveSpeed = t.MoveSpeed),
      (this.FaceToPosition = t.FaceToPosition),
      (this.CallbackList = t.CallbackList),
      (this.ResetCondition = t.ResetCondition),
      (this.ReferencePosition = t.ReferencePosition),
      (this.NextMovePointConfig = t.NextMovePointConfig);
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
  UpdateNextPoint() {
    var t;
    return !(
      !this.NextMovePointConfig ||
      this.NextMovePointConfig.Empty ||
      ((t = this.NextMovePointConfig.Pop()), this.Cqn.DeepCopy(t), 0)
    );
  }
  HasNextPoint() {
    return (this.NextMovePointConfig && !this.NextMovePointConfig.Empty) ?? !1;
  }
}
((exports.MoveToPointConfig = MoveToPointConfig).DefaultDistance =
  END_DISTANCE),
  (MoveToPointConfig.DefaultTurnSpeed = DEFAULT_TURN_SPEED);
//# sourceMappingURL=MoveToLocationLogic.js.map
