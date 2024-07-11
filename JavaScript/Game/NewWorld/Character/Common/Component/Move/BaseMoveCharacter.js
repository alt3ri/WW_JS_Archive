"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseMoveCharacter = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const MathCommon_1 = require("../../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary");
const GlobalData_1 = require("../../../../../GlobalData");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const WorldFunctionLibrary_1 = require("../../../../../World/Bridge/WorldFunctionLibrary");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
const MoveToLocationLogic_1 = require("./MoveToLocationLogic");
const PatrolMoveLogic_1 = require("./PatrolMoveLogic");
const PatrolMovePointsLogic_1 = require("./PatrolMovePointsLogic");
const DEFAULT_TURN_SPEED = 360;
const END_DISTANCE = 30;
const NAV_DISTANCE = 200;
const NO_RESET_ANGLE = 20;
const NO_RESET_DISTANCE = 50;
const PER_TICK_MIN_MOVE_SPEED = 30;
class BaseMoveCharacter {
  constructor() {
    (this.wDe = 0),
      (this.Jh = void 0),
      (this.Hte = void 0),
      (this.aYo = void 0),
      (this.hYo = 0),
      (this.lYo = !1),
      (this._Yo = !1),
      (this.uYo = !1),
      (this.cYo = 0),
      (this.mYo = !1),
      (this.dYo = Vector_1.Vector.Create()),
      (this.CYo = !1),
      (this.gYo = 0),
      (this.fYo = 0),
      (this.pYo = 0),
      (this.jye = Vector_1.Vector.Create()),
      (this.RTe = Vector_1.Vector.Create()),
      (this.vYo = Vector_1.Vector.Create()),
      (this.MYo = void 0),
      (this.rWo = void 0),
      (this.hse = void 0),
      (this.mie = 0),
      (this.SYo = !1),
      (this.Ioo = !1),
      (this.EYo = void 0),
      (this.yYo = new PatrolMovePointsLogic_1.PatrolMovePointsLogic()),
      (this.IYo = new PatrolMoveLogic_1.PatrolMoveLogic()),
      (this.TYo = (t) => {
        this.EYo && this.EYo(t);
      }),
      (this.PushMoveInfo = () => {
        const t = Protocol_1.Aki.Protocol.Zhs.create();
        const i = Protocol_1.Aki.Protocol.o2s.create();
        (i.rkn = MathUtils_1.MathUtils.NumberToLong(
          this.Hte.CreatureData.GetCreatureDataId(),
        )),
          (i.$kn = this.Hte.ActorLocationProxy),
          (i.D3n = void 0),
          (t.m4n = [i]),
          Net_1.Net.Send(24100, t),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "AI",
              43,
              "向服务器同步NPC位置",
              ["EntityId", this.Jh.Id],
              ["PbDataId", this.wDe],
              ["X", i.$kn.X],
              ["Y", i.$kn.Y],
              ["Z", i.$kn.Z],
            );
      });
  }
  get CurrentToLocation() {
    return this.yYo.TargetPoint.Position;
  }
  Init(t) {
    (this.Jh = t),
      (this.Hte = this.Jh.GetComponent(3)),
      (this.aYo = this.Jh.GetComponent(89)),
      (this.wDe = this.Hte.CreatureData.GetPbDataId()),
      (this.MYo = []),
      (this.Ioo = !1),
      this.yYo.Init(this.Hte),
      this.IYo.Init(this.Jh);
  }
  UpdateMove(h) {
    if (this.IsRunning)
      if (this.yYo.TargetPoint) {
        (this.mie += h),
          this.mie > 1 && ((this.mie = 0), this.LYo()),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            MoveToLocationLogic_1.MoveToLocationController.DebugDraw &&
            this.DYo();
        let t = !1;
        let i = !1;
        let s = this.IYo.UpdateMove(h, this.SYo);
        for (; !s; ) {
          if (
            ((i = i || this.yYo.TargetPoint.Index >= 0),
            this.RYo(),
            this.yYo.CheckMoveLastPoint())
          ) {
            const t = this.IYo.ResetLastPointCondition();
            return (
              t && this.IYo.ResetLastPatrolPoint(h, !1),
              this.PYo(),
              void this.MoveEnd(1)
            );
          }
          (t = !0), this.UYo(), (s = this.IYo.UpdateMove(h, this.SYo));
        }
        !this.lYo &&
          this.IYo.ResetLastPointCondition() &&
          this.AYo() &&
          this.IYo.ResetLastPatrolPoint(h, !0),
          t && i && this.PYo(),
          this.CYo &&
            h > MathCommon_1.MathCommon.KindaSmallNumber &&
            this.xYo(h, t);
      } else this.MoveEnd(2);
  }
  xYo(t, i) {
    const s = Vector_1.Vector.Dist(
      this.Hte.ActorLocationProxy,
      this.CurrentToLocation,
    );
    if (
      Math.abs(this.pYo - s) / t > PER_TICK_MIN_MOVE_SPEED ||
      this.pYo === 0 ||
      i
    )
      this.fYo = this.gYo;
    else if (((this.fYo -= t), this.fYo <= 0))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            43,
            "检测到移动行为不符合预期,持续卡住超时,返回移动失败",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.wDe],
            ["超时时限", this.gYo],
          ),
        void this.MoveEnd(2)
      );
    this.pYo = s;
  }
  UYo() {
    this.mYo && (this.mYo = !1),
      this.yYo.ChangeToNextPoint(),
      this.wYo(
        this.yYo.GetPreviousLocation(),
        this.yYo.TargetPoint.Position,
        this._Yo,
        !1,
      );
  }
  AYo() {
    var t = this.yYo.GetPreviousLocation();
    if (!t) return !1;
    this.jye.DeepCopy(this.Hte.ActorLocationProxy),
      this.jye.SubtractionEqual(t),
      this.lYo || (this.jye.Z = 0);
    let i = this.jye.Size();
    var t =
      (this.RTe.DeepCopy(this.CurrentToLocation),
      this.RTe.SubtractionEqual(t),
      this.lYo || (this.RTe.Z = 0),
      this.RTe.Size());
    return (
      i !== 0 &&
      t !== 0 &&
      ((i = this.jye.DotProduct(this.RTe) / (i * t)),
      (i = MathCommon_1.MathCommon.RadToDeg * Math.acos(i)),
      this.jye.CrossProduct(this.RTe, this.jye),
      (t = this.jye.Size() / t),
      !(i > 0 && i < NO_RESET_ANGLE && t < NO_RESET_DISTANCE))
    );
  }
  StopMove() {
    let t;
    this.IsRunning &&
      (this.Hte.ClearInput(),
      (t = this.yYo.UpdatePreIndex()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "中断巡逻",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["Index", this.yYo.TargetIndex],
          ["PreIndex", t],
        ),
      this.BYo());
  }
  Dispose() {
    this.BYo();
  }
  BYo() {
    this.IYo.StopMove(),
      (this.MYo = []),
      (this.Ioo = !1),
      (this.mYo = !0),
      this.dYo.DeepCopy(this.Hte.ActorLocationProxy);
  }
  MoveAlongPath(t) {
    let i;
    this.Hte
      ? ((this.Ioo = !0),
        (i = t.TurnSpeed ?? DEFAULT_TURN_SPEED),
        (this.cYo = i),
        (this.lYo = t.IsFly),
        (this._Yo = t.Navigation && !t.IsFly),
        (this.hYo = t.Distance ?? END_DISTANCE),
        (this.SYo = t.DebugMode),
        (this.EYo = t.Callback),
        (this.uYo = t.ReturnFalseWhenNavigationFailed),
        t.ReturnTimeoutFailed && t.ReturnTimeoutFailed !== 0
          ? ((this.CYo = !0),
            (this.gYo = t.ReturnTimeoutFailed),
            (this.fYo = t.ReturnTimeoutFailed))
          : (this.CYo = !1),
        this.yYo.UpdateMovePoints(t),
        this.LYo(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "AI",
            43,
            "开始巡逻",
            ["EntityId", this.Jh.Id],
            ["PbDataId", this.wDe],
            ["循环巡逻", t.Loop],
            ["环形巡逻", t.CircleMove ?? !1],
            ["飞行模式", this.lYo],
            ["寻路", this._Yo],
            ["容差", this.hYo],
          ),
        (i = Vector_1.Vector.Dist2D(this.dYo, this.Hte.ActorLocationProxy)),
        t.UsePreviousIndex && this.mYo && i > this.hYo
          ? (this.wYo(
              this.dYo,
              this.yYo.TargetPoint.Position,
              i > NAV_DISTANCE || this._Yo,
              !0,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                43,
                "恢复中断巡逻",
                ["EntityId", this.Jh.Id],
                ["PbDataId", this.wDe],
                ["当前目标点Index", this.yYo.TargetIndex],
              ))
          : ((this.mYo = !1),
            this.wYo(void 0, this.yYo.TargetPoint.Position, this._Yo, !0)))
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
    this.StopMove(),
      this.yYo.Reset(),
      this.TYo(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "结束巡逻",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["EndState", t],
        );
  }
  wYo(t, i, s, h) {
    if (
      ((this.rWo = []),
      (!h && t) ||
        (this.vYo.DeepCopy(this.Hte.ActorLocationProxy),
        this.lYo || (this.vYo.Z -= this.Hte.HalfHeight),
        this.rWo.push(this.vYo)),
      t && this.rWo.push(t),
      this.rWo.push(i),
      s)
    ) {
      (this.hse = []), this.hse.push(this.rWo[0]);
      for (let t = 0; t < this.rWo.length - 1; t++)
        if (
          ((this.MYo = []),
          Vector_1.Vector.Dist2D(this.rWo[t], this.rWo[t + 1]) < this.hYo)
        )
          this.hse.push(this.rWo[t + 1]);
        else if (this.bYo(this.rWo[t], this.rWo[t + 1], this.MYo))
          for (let t = 1; t < this.MYo.length; t++) this.hse.push(this.MYo[t]);
        else {
          if (this.uYo) return void this.MoveEnd(2);
          this.hse.push(this.rWo[t + 1]);
        }
      this.IYo.UpdateMovePath(this.hse, this.lYo, this.cYo, this.hYo);
    } else this.IYo.UpdateMovePath(this.rWo, this.lYo, this.cYo, this.hYo);
  }
  bYo(t, i, s) {
    return (
      AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
        this.Hte.Owner.GetWorld(),
        t.ToUeVector(),
        i.ToUeVector(),
        s,
      ) && s.length > 0
    );
  }
  RYo() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AI",
        43,
        "到达点",
        ["EntityId", this.Jh.Id],
        ["PbDataId", this.wDe],
        ["TargetIndex", this.yYo.TargetIndex],
        ["MovePoint.length", this.yYo.MovePoint.length],
        ["飞行模式", this.lYo],
        ["寻路", this._Yo],
      ),
      this.LYo(),
      this.yYo.OnArriveMovePoint();
  }
  PYo() {
    const t = WorldFunctionLibrary_1.default.GetEntityTypeByEntity(
      this.Hte.Entity.Id,
    );
    t === Protocol_1.Aki.Protocol.HBs.Proto_Npc && this.qYo(),
      t === Protocol_1.Aki.Protocol.HBs.Proto_Monster && this.GYo();
  }
  GYo() {
    const t = this.Hte.Entity.GetComponent(57);
    const i = t.GetCurrentMoveSample();
    const s =
      ((i.$kn = this.Hte.ActorLocationProxy),
      t.PendingMoveInfos.push(i),
      Protocol_1.Aki.Protocol.Xhs.create());
    s.Mys.push(t.CollectPendingMoveInfos()),
      Net_1.Net.Send(29494, s),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "向服务器同步怪物位置",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["X", i.$kn.X],
          ["Y", i.$kn.Y],
          ["Z", i.$kn.Z],
        );
  }
  qYo() {
    const t = Protocol_1.Aki.Protocol.o2s.create();
    const i =
      ((t.rkn = MathUtils_1.MathUtils.NumberToLong(
        this.Hte.CreatureData.GetCreatureDataId(),
      )),
      (t.$kn = this.Hte.ActorLocationProxy),
      (t.D3n = this.Hte.ActorRotationProxy),
      Protocol_1.Aki.Protocol.Zhs.create());
    (i.m4n = [t]),
      Net_1.Net.Send(24100, i),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          43,
          "向服务器同步NPC位置",
          ["EntityId", this.Jh.Id],
          ["PbDataId", this.wDe],
          ["X", t.$kn.X],
          ["Y", t.$kn.Y],
          ["Z", t.$kn.Z],
        );
  }
  LYo() {
    let t, i;
    this.yYo.TargetPoint &&
      (i = this.Jh.GetComponent(36)) &&
      ((t = this.yYo.TargetPoint.MoveSpeed),
      this.lYo
        ? (i.CharacterMovement.SetMovementMode(5), t && i.SetMaxSpeed(t))
        : (t && i.SetMaxSpeed(t),
          (i = this.NYo(this.yYo.TargetPoint.MoveState)),
          CharacterUnifiedStateTypes_1.legalMoveStates
            .get(this.aYo.PositionState)
            .has(i) && this.aYo.SetMoveState(i)));
  }
  NYo(t) {
    if (t && this.aYo?.Valid)
      switch (t) {
        case IComponent_1.EPatrolMoveState.Walk:
          return this.aYo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
            : CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        case IComponent_1.EPatrolMoveState.Run:
          return this.aYo.PositionState ===
            CharacterUnifiedStateTypes_1.ECharPositionState.Water
            ? CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
            : CharacterUnifiedStateTypes_1.ECharMoveState.Run;
      }
    return CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
  }
  DYo() {
    if (
      this.yYo.MovePoint.length !== 0 &&
      GlobalData_1.GlobalData.IsPlayInEditor
    )
      for (let t = this.yYo.MovePoint.length - 1; t > -1; t--) {
        const i = this.yYo.MovePoint[t].Position;
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          i.ToUeVector(),
          30,
          10,
          t === this.yYo.TargetIndex
            ? ColorUtils_1.ColorUtils.LinearYellow
            : ColorUtils_1.ColorUtils.LinearWhite,
        );
      }
  }
  get IsRunning() {
    return this.Ioo;
  }
}
exports.BaseMoveCharacter = BaseMoveCharacter;
// # sourceMappingURL=BaseMoveCharacter.js.map
