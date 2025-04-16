"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMoveCharacter = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../../../../Core/Common/LogAnalyzer"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../../Core/Net/Net"),
  MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent"),
  AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../../../Utils/ColorUtils"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  WorldFunctionLibrary_1 = require("../../../../../World/Bridge/WorldFunctionLibrary"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  MoveToLocationLogic_1 = require("./MoveToLocationLogic"),
  PatrolMoveLogic_1 = require("./PatrolMoveLogic"),
  PatrolMovePointsLogic_1 = require("./PatrolMovePointsLogic"),
  DEFAULT_TURN_SPEED = 360,
  END_DISTANCE = 30,
  NAV_DISTANCE = 200,
  NO_RESET_ANGLE = 20,
  NO_RESET_DISTANCE = 50,
  PER_TICK_MIN_MOVE_SPEED = 30,
  WHILE_UPDATE_MOVE_POINT_COUNT = 2,
  IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : void 0;
class BaseMoveCharacter {
  constructor() {
    (this.wDe = 0),
      (this.Jh = void 0),
      (this.Hte = void 0),
      (this.rJo = void 0),
      (this.JLe = void 0),
      (this.nJo = 0),
      (this.sJo = !1),
      (this.aJo = !1),
      (this.lJo = 0),
      (this._Jo = !1),
      (this.uJo = Vector_1.Vector.Create()),
      (this.cJo = !1),
      (this.mJo = 0),
      (this.dJo = 0),
      (this.CJo = 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.gJo = Vector_1.Vector.Create()),
      (this.fJo = void 0),
      (this.tKo = void 0),
      (this.hse = void 0),
      (this.mie = 0),
      (this.Ero = !1),
      (this.vJo = void 0),
      (this.MJo = new PatrolMovePointsLogic_1.PatrolMovePointsLogic()),
      (this.EJo = new PatrolMoveLogic_1.PatrolMoveLogic()),
      (this.SJo = (t) => {
        this.vJo && this.vJo(t);
      }),
      (this.PushMoveInfo = () => {
        var t = Protocol_1.Aki.Protocol.ecs.create(),
          i = Protocol_1.Aki.Protocol.Zks.create();
        (i.F4n = MathUtils_1.MathUtils.NumberToLong(
          this.Hte.CreatureData.GetCreatureDataId(),
        )),
          (i.P5n = this.Hte.ActorLocationProxy),
          (i.g8n = void 0),
          (t.iVn = [i]),
          Net_1.Net.Send(17177, t),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              42,
              "向服务器同步NPC位置",
              ["EntityId", this.Jh.Id],
              ["PbDataId", this.wDe],
              ["X", i.P5n.X],
              ["Y", i.P5n.Y],
              ["Z", i.P5n.Z],
            );
      }),
      (this.xsa = (t, i) => {
        var e;
        this.MJo.TargetPoint &&
          (e = this.bJo(this.MJo.TargetPoint.MoveState)) &&
          CharacterUnifiedStateTypes_1.legalMoveStates.get(i).has(e) &&
          this.rJo.SetMoveState(e);
      }),
      (this.vMc = !1);
  }
  get CurrentToLocation() {
    return this.MJo.TargetPoint.Position;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.rJo = this.Jh.GetComponent(99)),
      (this.wDe = this.Hte.CreatureData.GetPbDataId()),
      (this.fJo = []),
      (this.Ero = !1),
      this.MJo.Init(this.Hte),
      this.EJo.Init(this.Jh),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharOnPositionStateChanged,
        this.xsa,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        );
  }
  UpdateMove(t) {
    this.IsRunning &&
      (this.MJo.TargetPoint
        ? ((this.mie += t),
          1 < this.mie && ((this.mie = 0), this.yJo()),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            MoveToLocationLogic_1.MoveToLocationController.DebugDraw &&
            this.IJo(),
          this.Dlh(t))
        : this.MoveEnd(2));
  }
  Dlh(t) {
    let i = !1,
      e = !1;
    var s =
      this.sJo ||
      this.rJo?.PositionState ===
        CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
    let h = this.EJo.UpdateMove(t),
      r = 0;
    for (; !h && this.IsRunning && r < WHILE_UPDATE_MOVE_POINT_COUNT; ) {
      if (
        (r++,
        (e = e || 0 <= this.MJo.TargetPoint.Index),
        this.TJo(),
        this.MJo.CheckMoveLastPoint())
      ) {
        const h = this.EJo.ResetLastPointCondition();
        return !s && h && this.mqn(t), this.RJo(), void this.MoveEnd(1);
      }
      if (((i = !0), !this.LJo()))
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "AI",
              42,
              "未能正常获取下个移动点，巡逻失败结束",
              ["EntityId", this.Jh.Id],
              ["PbDataId", this.wDe],
            ),
          void this.MoveEnd(2)
        );
      if (this.JLe?.ResetAllPoints) break;
      h = this.EJo.UpdateMove(t);
    }
    !s && this.EJo.ResetLastPointCondition() && this.DJo() && this.mqn(t),
      i && e && this.RJo(),
      this.cJo &&
        t > MathCommon_1.MathCommon.KindaSmallNumber &&
        this.UJo(t, i);
  }
  mqn(t) {
    this.EJo.ResetLastPatrolPoint(t),
      this.jye.DeepCopy(this.CurrentToLocation),
      this.jye.SubtractionEqual(this.Hte.ActorLocationProxy),
      this.sJo || (this.jye.Z = 0),
      this.jye.Normalize(),
      this.Hte?.ClearInput(),
      this.Hte?.SetInputDirect(this.jye);
    t = this.Hte.ActorVelocityProxy.Size();
    this.jye.MultiplyEqual(t),
      this.Hte.ActorVelocityProxy.Set(this.jye.X, this.jye.Y, this.jye.Z);
  }
  UJo(t, i) {
    var e = Vector_1.Vector.Dist(
      this.Hte.ActorLocationProxy,
      this.CurrentToLocation,
    );
    if (
      Math.abs(this.CJo - e) / t > PER_TICK_MIN_MOVE_SPEED ||
      0 === this.CJo ||
      i
    )
      this.dJo = this.mJo;
    else if (((this.dJo -= t), this.dJo <= 0))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            42,
            "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.wDe],
            ["超时时限", this.mJo],
          ),
        void this.MoveEnd(2)
      );
    this.CJo = e;
  }
  LJo() {
    return (
      this._Jo && (this._Jo = !1),
      this.MJo.ChangeToNextPoint() &&
        this.AJo(
          this.MJo.GetPreviousLocation(),
          this.MJo.TargetPoint.Position,
          this.aJo,
          !1,
        )
    );
  }
  DJo() {
    if (this.JLe?.ResetAllPoints) return !0;
    var t = this.MJo.GetPreviousLocation();
    if (!t) return !1;
    this.jye.DeepCopy(this.Hte.ActorLocationProxy),
      this.jye.SubtractionEqual(t),
      this.sJo || (this.jye.Z = 0);
    var i = this.jye.Size(),
      t =
        (this.RTe.DeepCopy(this.CurrentToLocation),
        this.RTe.SubtractionEqual(t),
        this.sJo || (this.RTe.Z = 0),
        this.RTe.Size());
    return (
      0 !== i &&
      0 !== t &&
      ((i = this.jye.DotProduct(this.RTe) / (i * t)),
      (i = MathCommon_1.MathCommon.RadToDeg * Math.acos(i)),
      this.jye.CrossProduct(this.RTe, this.jye),
      (t = this.jye.Size() / t),
      !(0 < i && i < NO_RESET_ANGLE && t < NO_RESET_DISTANCE))
    );
  }
  StopMove() {
    var t;
    this.IsRunning &&
      (this.Hte.ClearInput(),
      (t = this.MJo.UpdatePreIndex()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "中断巡逻",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["Index", this.MJo.TargetIndex],
          ["PreIndex", t],
          ["CurrentLoc", this.Hte.ActorLocationProxy],
        ),
      this.PJo());
  }
  Dispose() {
    this.PJo();
  }
  PJo() {
    this.EJo.StopMove(),
      (this.fJo = []),
      (this.Ero = !1),
      (this._Jo = !0),
      this.uJo.DeepCopy(this.Hte.ActorLocationProxy),
      this.Jh &&
        EventSystem_1.EventSystem.HasWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharOnPositionStateChanged,
          this.xsa,
        );
  }
  MoveAlongPath(i) {
    if (this.Hte) {
      (this.Ero = !0),
        (this.JLe = i),
        (this.lJo = i.TurnSpeed ?? DEFAULT_TURN_SPEED),
        (this.aJo = i.Navigation && !i.IsFly),
        (this.nJo = i.Distance ?? END_DISTANCE),
        (this.vJo = i.Callback),
        i.ReturnTimeoutFailed && 0 !== i.ReturnTimeoutFailed
          ? ((this.cJo = !0),
            (this.mJo = i.ReturnTimeoutFailed),
            (this.dJo = i.ReturnTimeoutFailed))
          : (this.cJo = !1),
        this.MJo.UpdateMovePoints(i),
        (this.sJo =
          this.MJo.TargetPoint?.PosState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air || i.IsFly),
        this.yJo(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            42,
            "开始巡逻",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.wDe],
            ["循环巡逻", i.Loop],
            ["环形巡逻", i.CircleMove ?? !1],
            ["飞行模式", this.sJo],
            ["寻路", this.aJo],
            ["容差", this.nJo],
            ["碰撞启用", this.Hte?.DisableCollisionHandle?.Empty],
          );
      var e = Vector_1.Vector.Dist2D(this.uJo, this.Hte.ActorLocationProxy);
      let t = !1;
      i.UsePreviousIndex && this._Jo && e > this.nJo
        ? ((t = this.AJo(
            this.uJo,
            this.MJo.TargetPoint.Position,
            e > NAV_DISTANCE || this.aJo,
            !0,
          )),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              42,
              "恢复中断巡逻",
              ["EntityId", this.Jh.Id],
              ["PbDataId", this.wDe],
              ["当前目标点Index", this.MJo.TargetIndex],
              ["PreLocation", this.uJo],
              ["Current", this.Hte.ActorLocationProxy],
            ))
        : ((this._Jo = !1),
          (t = this.AJo(
            void 0,
            this.MJo.TargetPoint.Position,
            this.aJo || !!i.NavigateToStartPos,
            !0,
          ))),
        t ||
          (this.MoveEnd(2),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "AI",
              42,
              "未正常生成寻路路径，巡逻失败结束",
              ["EntityId", this.Jh.Id],
              ["PbDataId", this.wDe],
            ));
    } else
      (e = this.Jh?.GetComponent(0)),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            50,
            "[BaseMoveCharacter.MoveAlongPath]获取ActorComp失败",
            ["PbDataId", e?.GetPbDataId()],
          );
  }
  MoveEnd(t) {
    this._Jo = !1;
    this.StopMove(),
      this.MJo.Reset(),
      this.SJo(t),
      this.vMc &&
        (this.yMc(CharacterUnifiedStateTypes_1.ECharMoveState.Run),
        (this.vMc = !1)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "结束巡逻",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["EndState", t],
        );
  }
  AJo(t, i, e, s) {
    if (
      ((this.tKo = []),
      (!s && t) ||
        (this.gJo.DeepCopy(this.Hte.LastActorLocation),
        this.sJo || (this.gJo.Z -= this.Hte.HalfHeight),
        this.tKo.push(this.gJo)),
      t && this.tKo.push(t),
      this.tKo.push(i),
      e)
    ) {
      (this.hse = []), this.hse.push(this.tKo[0]);
      for (let t = 0; t < this.tKo.length - 1; t++)
        if (
          ((this.fJo = []),
          Vector_1.Vector.Dist2D(this.tKo[t], this.tKo[t + 1]) < this.nJo)
        )
          this.hse.push(this.tKo[t + 1]);
        else if (this.xJo(this.tKo[t], this.tKo[t + 1], this.fJo))
          for (let t = 1; t < this.fJo.length; t++) this.hse.push(this.fJo[t]);
        else {
          if (this.JLe?.ReturnFalseWhenNavigationFailed) return !1;
          this.hse.push(this.tKo[t + 1]);
        }
      this.EJo.UpdateMovePath(this.hse, this.sJo, this.lJo, this.nJo);
    } else this.EJo.UpdateMovePath(this.tKo, this.sJo, this.lJo, this.nJo);
    return !0;
  }
  xJo(t, i, e) {
    return (
      AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
        this.Hte.Owner.GetWorld(),
        t.ToUeVector(),
        i.ToUeVector(),
        e,
      ) && 0 < e.length
    );
  }
  TJo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AI",
        42,
        "到达点",
        ["EntityId", this.Jh.Id],
        ["PbDataId", this.wDe],
        ["TargetIndex", this.MJo.TargetIndex],
        ["MovePoint.length", this.MJo.MovePoint.length],
        ["飞行模式", this.sJo],
        ["寻路", this.aJo],
      ),
      this.yJo(),
      this.MJo.OnArriveMovePoint(),
      this.MJo.TargetPoint?.PosState &&
        (this.sJo =
          this.MJo.TargetPoint?.PosState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Air);
  }
  RJo() {
    var t;
    this.JLe?.NoAsyncPoint ||
      ((t = WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
        this.Hte.Entity.Id,
      )) === Protocol_1.Aki.Protocol.kks.Proto_Npc && this.wJo(),
      t === Protocol_1.Aki.Protocol.kks.Proto_Monster && this.BJo());
  }
  BJo() {
    var t = this.Hte.Entity.GetComponent(67),
      i = t.GetCurrentMoveSample(),
      e =
        ((i.P5n = this.Hte.ActorLocationProxy),
        t.PendingMoveInfos.push(i),
        Protocol_1.Aki.Protocol.Yus.create());
    (e.uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.OnlineModel.OwnerId
      : ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      e.WRs.push(t.CollectPendingMoveInfos()),
      Net_1.Net.Send(16361, e),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((t = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id:
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          msg_id: 16361,
          immediately: !0,
          sub_count: e.WRs.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
        }),
        (e = JSON.stringify(t)),
        CombatDebugController_1.CombatDebugController.DataReport(
          "COMBAT_MESSAGE_COUNT",
          e,
        )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "向服务器同步怪物位置",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["X", i.P5n.X],
          ["Y", i.P5n.Y],
          ["Z", i.P5n.Z],
        );
  }
  wJo() {
    var t = Protocol_1.Aki.Protocol.Zks.create(),
      i =
        ((t.F4n = MathUtils_1.MathUtils.NumberToLong(
          this.Hte.CreatureData.GetCreatureDataId(),
        )),
        (t.P5n = this.Hte.ActorLocationProxy),
        (t.g8n = this.Hte.ActorRotationProxy),
        Protocol_1.Aki.Protocol.ecs.create());
    (i.iVn = [t]),
      Net_1.Net.Send(17177, i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          42,
          "向服务器同步NPC位置",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["X", t.P5n.X],
          ["Y", t.P5n.Y],
          ["Z", t.P5n.Z],
        );
  }
  yJo() {
    var t, i;
    this.MJo.TargetPoint &&
      (i = this.Jh.GetComponent(44)) &&
      ((t = this.MJo.TargetPoint.MoveSpeed),
      this.sJo
        ? (this.Hte?.Actor.KuroSetMovementMode({
            Mode: 5,
            Context: "[BaseMoveCharacter.UpdateMoveStateAndSpeed]",
          }),
          t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.bJo(this.MJo.TargetPoint.MoveState)) &&
            CharacterUnifiedStateTypes_1.legalMoveStates
              .get(this.rJo.PositionState)
              .has(i) &&
            ((i !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
              i !== CharacterUnifiedStateTypes_1.ECharMoveState.Run) ||
              this.yMc(i),
            this.rJo.SetMoveState(i))));
  }
  yMc(t) {
    this.Hte?.IsRoleAndCtrlByMe &&
      (0, RegisterComponent_1.isComponentInstance)(this.rJo, 173) &&
      (this.rJo.MarkWalkOrRun(
        t === CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
      ),
      (this.vMc = t === CharacterUnifiedStateTypes_1.ECharMoveState.Walk));
  }
  bJo(t) {
    if (t && this.rJo?.Valid)
      switch (t) {
        case IComponent_1.EPatrolMoveState.Walk:
          return this.rJo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
            : this.rJo.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Climb
              ? CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb
              : CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        case IComponent_1.EPatrolMoveState.Run:
          return this.rJo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
            : this.rJo.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Climb
              ? CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb
              : CharacterUnifiedStateTypes_1.ECharMoveState.Run;
        case IComponent_1.EPatrolMoveState.Sprint:
          return this.rJo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
            : this.rJo.PositionState ===
                CharacterUnifiedStateTypes_1.ECharPositionState.Climb
              ? CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb
              : CharacterUnifiedStateTypes_1.ECharMoveState.Sprint;
      }
  }
  IJo() {
    if (
      0 !== this.MJo.MovePoint.length &&
      GlobalData_1.GlobalData.IsPlayInEditor
    )
      for (let t = this.MJo.MovePoint.length - 1; -1 < t; t--) {
        var i = this.MJo.MovePoint[t].Position;
        UE.KismetSystemLibrary.D_DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          30,
          10,
          t === this.MJo.TargetIndex
            ? ColorUtils_1.ColorUtils.LinearYellow
            : ColorUtils_1.ColorUtils.LinearWhite,
          1,
        );
      }
  }
  get IsRunning() {
    return this.Ero;
  }
}
exports.BaseMoveCharacter = BaseMoveCharacter;
//# sourceMappingURL=BaseMoveCharacter.js.map
