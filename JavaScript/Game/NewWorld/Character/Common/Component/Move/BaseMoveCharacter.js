"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMoveCharacter = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../../../../Core/Common/LogAnalyzer"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
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
  IS_WITH_EDITOR = cpp_1.FKuroUtilityForPuerts.IsWithEditor() ? 1 : void 0;
class BaseMoveCharacter {
  constructor() {
    (this.wDe = 0),
      (this.Jh = void 0),
      (this.Hte = void 0),
      (this.rJo = void 0),
      (this.XNa = !1),
      (this.nJo = 0),
      (this.sJo = !1),
      (this.aJo = !1),
      (this.hJo = !1),
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
      (this.pJo = !1),
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
          Net_1.Net.Send(21915, t),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AI",
              43,
              "向服务器同步NPC位置",
              ["EntityId", this.Jh.Id],
              ["PbDataId", this.wDe],
              ["X", i.P5n.X],
              ["Y", i.P5n.Y],
              ["Z", i.P5n.Z],
            );
      }),
      (this.xsa = (t, i) => {
        var s;
        this.MJo.TargetPoint &&
          (s = this.bJo(this.MJo.TargetPoint.MoveState)) &&
          CharacterUnifiedStateTypes_1.legalMoveStates.get(i).has(s) &&
          this.rJo.SetMoveState(s);
      });
  }
  get CurrentToLocation() {
    return this.MJo.TargetPoint.Position;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.rJo = this.Jh.GetComponent(92)),
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
  UpdateMove(e) {
    if (this.IsRunning)
      if (this.MJo.TargetPoint) {
        (this.mie += e),
          1 < this.mie && ((this.mie = 0), this.yJo()),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            MoveToLocationLogic_1.MoveToLocationController.DebugDraw &&
            this.IJo();
        let t = !1,
          i = !1;
        var h =
          this.sJo ||
          this.rJo?.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Climb;
        let s = this.EJo.UpdateMove(e, this.pJo);
        for (; !s; ) {
          if (
            ((i = i || 0 <= this.MJo.TargetPoint.Index),
            this.TJo(),
            this.MJo.CheckMoveLastPoint())
          ) {
            const t = this.EJo.ResetLastPointCondition();
            return (
              !h && t && this.EJo.ResetLastPatrolPoint(e),
              this.RJo(),
              void this.MoveEnd(1)
            );
          }
          if (((t = !0), this.LJo(), this.XNa)) break;
          s = this.EJo.UpdateMove(e, this.pJo);
        }
        !h &&
          this.EJo.ResetLastPointCondition() &&
          this.DJo() &&
          this.EJo.ResetLastPatrolPoint(e),
          t && i && this.RJo(),
          this.cJo &&
            e > MathCommon_1.MathCommon.KindaSmallNumber &&
            this.UJo(e, t);
      } else this.MoveEnd(2);
  }
  UJo(t, i) {
    var s = Vector_1.Vector.Dist(
      this.Hte.ActorLocationProxy,
      this.CurrentToLocation,
    );
    if (
      Math.abs(this.CJo - s) / t > PER_TICK_MIN_MOVE_SPEED ||
      0 === this.CJo ||
      i
    )
      this.dJo = this.mJo;
    else if (((this.dJo -= t), this.dJo <= 0))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.wDe],
            ["超时时限", this.mJo],
          ),
        void this.MoveEnd(2)
      );
    this.CJo = s;
  }
  LJo() {
    this._Jo && (this._Jo = !1),
      this.MJo.ChangeToNextPoint(),
      this.AJo(
        this.MJo.GetPreviousLocation(),
        this.MJo.TargetPoint.Position,
        this.aJo,
        !1,
      );
  }
  DJo() {
    if (this.XNa) return !0;
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
          43,
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
  MoveAlongPath(t) {
    var i;
    this.Hte
      ? ((this.Ero = !0),
        (i = t.TurnSpeed ?? DEFAULT_TURN_SPEED),
        (this.lJo = i),
        (this.aJo = t.Navigation && !t.IsFly),
        (this.nJo = t.Distance ?? END_DISTANCE),
        (this.pJo = t.DebugMode),
        (this.vJo = t.Callback),
        (this.hJo = t.ReturnFalseWhenNavigationFailed),
        (this.XNa = t.ResetAllPoints ?? !1),
        t.ReturnTimeoutFailed && 0 !== t.ReturnTimeoutFailed
          ? ((this.cJo = !0),
            (this.mJo = t.ReturnTimeoutFailed),
            (this.dJo = t.ReturnTimeoutFailed))
          : (this.cJo = !1),
        this.MJo.UpdateMovePoints(t),
        (this.sJo =
          this.MJo.TargetPoint?.PosState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Air || t.IsFly),
        this.yJo(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "AI",
            43,
            "开始巡逻",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.wDe],
            ["循环巡逻", t.Loop],
            ["环形巡逻", t.CircleMove ?? !1],
            ["飞行模式", this.sJo],
            ["寻路", this.aJo],
            ["容差", this.nJo],
          ),
        (i = Vector_1.Vector.Dist2D(this.uJo, this.Hte.ActorLocationProxy)),
        t.UsePreviousIndex && this._Jo && i > this.nJo
          ? (this.AJo(
              this.uJo,
              this.MJo.TargetPoint.Position,
              i > NAV_DISTANCE || this.aJo,
              !0,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "AI",
                43,
                "恢复中断巡逻",
                ["EntityId", this.Jh.Id],
                ["PbDataId", this.wDe],
                ["当前目标点Index", this.MJo.TargetIndex],
                ["PreLocation", this.uJo],
                ["Current", this.Hte.ActorLocationProxy],
              ))
          : ((this._Jo = !1),
            this.AJo(void 0, this.MJo.TargetPoint.Position, this.aJo, !0)))
      : ((t = this.Jh?.GetComponent(0)),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            51,
            "[BaseMoveCharacter.MoveAlongPath]获取ActorComp失败",
            ["PbDataId", t?.GetPbDataId()],
          ));
  }
  MoveEnd(t) {
    this._Jo = !1;
    this.StopMove(),
      this.MJo.Reset(),
      this.SJo(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
          "结束巡逻",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["EndState", t],
        );
  }
  AJo(t, i, s, e) {
    if (
      ((this.tKo = []),
      (!e && t) ||
        (this.gJo.DeepCopy(this.Hte.LastActorLocation),
        this.sJo || (this.gJo.Z -= this.Hte.HalfHeight),
        this.tKo.push(this.gJo)),
      t && this.tKo.push(t),
      this.tKo.push(i),
      s)
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
          if (this.hJo) return void this.MoveEnd(2);
          this.hse.push(this.tKo[t + 1]);
        }
      this.EJo.UpdateMovePath(this.hse, this.sJo, this.lJo, this.nJo);
    } else this.EJo.UpdateMovePath(this.tKo, this.sJo, this.lJo, this.nJo);
  }
  xJo(t, i, s) {
    return (
      AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
        this.Hte.Owner.GetWorld(),
        t.ToUeVector(),
        i.ToUeVector(),
        s,
      ) && 0 < s.length
    );
  }
  TJo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AI",
        43,
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
    var t = WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
      this.Hte.Entity.Id,
    );
    t === Protocol_1.Aki.Protocol.kks.Proto_Npc && this.wJo(),
      t === Protocol_1.Aki.Protocol.kks.Proto_Monster && this.BJo();
  }
  BJo() {
    var t = this.Hte.Entity.GetComponent(60),
      i = t.GetCurrentMoveSample(),
      s =
        ((i.P5n = this.Hte.ActorLocationProxy),
        t.PendingMoveInfos.push(i),
        Protocol_1.Aki.Protocol.Yus.create());
    (s.qZa = ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.OnlineModel.OwnerId
      : ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      s.WRs.push(t.CollectPendingMoveInfos()),
      Net_1.Net.Send(28450, s),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((t = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id:
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          msg_id: 28450,
          immediately: !0,
          sub_count: s.WRs.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch(),
        }),
        (s = JSON.stringify(t)),
        CombatDebugController_1.CombatDebugController.DataReport(
          "COMBAT_MESSAGE_COUNT",
          s,
        )),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
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
      Net_1.Net.Send(21915, i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AI",
          43,
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
      (i = this.Jh.GetComponent(38)) &&
      ((t = this.MJo.TargetPoint.MoveSpeed),
      this.sJo
        ? (i.CharacterMovement.SetMovementMode(5), t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.bJo(this.MJo.TargetPoint.MoveState)) &&
            CharacterUnifiedStateTypes_1.legalMoveStates
              .get(this.rJo.PositionState)
              .has(i) &&
            this.rJo.SetMoveState(i)));
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
        UE.KismetSystemLibrary.DrawDebugSphere(
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
