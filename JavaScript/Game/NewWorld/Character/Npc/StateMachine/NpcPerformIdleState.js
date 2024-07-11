"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformIdleState = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  AiAlertById_1 = require("../../../../../Core/Define/ConfigQuery/AiAlertById"),
  AiSenseById_1 = require("../../../../../Core/Define/ConfigQuery/AiSenseById"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent"),
  IDLE_MONTAGE_CD_MIN = 2,
  IDLE_MONTAGE_CD_MAX = 4,
  INITIAL_IDLE_MONTAGE_CD_MIN = 0,
  INITIAL_IDLE_MONTAGE_CD_MAX = 10,
  IMMEDIATE_PLAY_PROBABILITY = 0.1,
  ALERT_TURN_SPEED = 2e4;
class NpcStandbyShowInfo {
  constructor(i) {
    if (
      ((this.MontagePath = void 0),
      (this.ExpressionId = void 0),
      (this.IsLoop = !1),
      (this.Time = 0),
      (this.MontagePath = i.Montage),
      !this.MontagePath && i.RegisteredMontageId)
    ) {
      let t = void 0;
      var s = i.RegisteredMontageId;
      (t = s.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(s.MontageId)
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(s.MontageId)),
        (this.MontagePath = t?.ActionMontage);
    }
    (this.ExpressionId = i.FaceExpressionId),
      (this.IsLoop = !!i),
      (this.Time = i.Time ?? 0);
  }
}
class NpcPerformIdleState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.Mne = 0),
      (this.ker = !1),
      (this.Fer = -0),
      (this.Ver = -0),
      (this.Her = -0),
      (this.jer = -0),
      (this.dna = !1),
      (this.Wer = !1),
      (this.Ker = !1),
      (this.Mma = void 0),
      (this.Qer = void 0),
      (this.Xer = void 0),
      (this.$er = -0),
      (this.Yer = -0),
      (this.Jer = void 0),
      (this.zer = IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly),
      (this.Zer = 0),
      (this.etr = !1),
      (this.ttr = !1),
      (this.itr = !1),
      (this.otr = void 0),
      (this.rtr = void 0),
      (this.ntr = void 0),
      (this.atr = !1),
      (this.htr = void 0),
      (this.aqn = void 0),
      (this._tr = (t, i) => {
        t === this.Qer &&
          (this.otr.RemoveOnMontageEnded(this._tr),
          (this.ker = !0),
          (this.dna = !1),
          (this.Wer = !1),
          (this.Qer = void 0),
          (this.Xer = void 0),
          (this.etr = !1),
          this.utr(),
          (this.Owner.Entity.GetComponent(171).AnyIdleLoopMontagePlaying = !1));
      }),
      (this.ctr = !1),
      (this.mtr = !1),
      (this.dtr = !1),
      (this.Ctr = void 0),
      (this.gtr = !1),
      (this.OnLoopMontageEndForTurning = (t, i) => {
        var s = this.Owner.Entity.GetComponent(0),
          t = t?.IsValid() ? t.GetName() : "";
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformIdleState.OnLoopMontageEndForTurning][交互转身] Montage播放完毕",
            ["PbDataID", s?.GetPbDataId()],
            ["Montage", t],
          ),
          this.otr?.RemoveOnMontageEnded(this.OnLoopMontageEndForTurning),
          8 !== this.Owner.Entity.GetComponent(171)?.GetCurrentState() &&
            this.htr.TurnToInteractTarget();
      }),
      (this.ftr = () => {
        this.StateMachine.Switch(2);
      }),
      (this.ptr = () => {
        var t, i;
        this.Wer && this.vtr(),
          this.Owner.Entity.GetComponent(171)?.PauseAi("StalkAlert"),
          (this.dtr = !0),
          Global_1.Global.BaseCharacter &&
            ((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
            (i = this.Owner.Entity.GetComponent(3)),
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
              i,
              t.ActorLocationProxy,
              ALERT_TURN_SPEED,
            ));
      }),
      (this.Oer = () => {
        this.Wer && this.vtr(),
          this.Owner.Entity.GetComponent(171)?.ResumeAi("StalkAlert"),
          (this.dtr = !1);
      }),
      (this.xei = () => {
        this.Wer && this.vtr(),
          this.Owner.Entity?.GetComponent(171)?.ResumeAi("LeaveLogicRange"),
          (this.dtr = !1);
      }),
      (this.Mtr = () => {
        this.Owner.Entity?.GetComponent(171)?.PauseAi("LeaveLogicRange"),
          (this.dtr = !0);
      });
  }
  get NpcMontageController() {
    return this.otr;
  }
  set NpcMontageController(t) {
    this.otr = t;
  }
  get NpcTurnActionController() {
    return this.htr;
  }
  set NpcTurnActionController(t) {
    this.htr = t;
  }
  get NpcMoveComp() {
    return this.aqn;
  }
  set NpcMoveComp(t) {
    this.aqn = t;
  }
  CanChangeFrom(t) {
    return 8 !== t;
  }
  OnCreate(t) {
    if (
      ((this.Mne = this.Owner.Entity.GetComponent(0).GetPbDataId()),
      t?.ShowOnStandby)
    )
      if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Loop)
        (this.Ker = !0), (this.Mma = new NpcStandbyShowInfo(t.ShowOnStandby));
      else if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Sit)
        (this.Ker = !0),
          (this.Mma = new NpcStandbyShowInfo(t.ShowOnStandby)),
          (this.rtr = t.ShowOnStandby.PosEntityId);
      else {
        this.Jer = new Array();
        for (const i of t.ShowOnStandby.Montages)
          this.Jer.push(new NpcStandbyShowInfo(i));
        this.zer = t.ShowOnStandby.PlayMode;
        t = Math.random();
        this.ttr = t < IMMEDIATE_PLAY_PROBABILITY;
      }
    else this.itr = !0;
  }
  OnStart() {
    this.Etr(),
      this.Ore(),
      this.itr ||
        this.Owner.Entity.GetComponent(171)?.IsInPlot ||
        this.dtr ||
        this.aqn?.IsMoving ||
        (this.Ker
          ? this.ytr(this.Mma)
          : (this.ttr
              ? (this.Fer = 0)
              : (this.Fer = MathUtils_1.MathUtils.GetRandomRange(
                  INITIAL_IDLE_MONTAGE_CD_MIN,
                  INITIAL_IDLE_MONTAGE_CD_MAX,
                )),
            (this.Ver = Time_1.Time.WorldTimeSeconds)));
  }
  OnEnter(t) {
    var i = this.Owner.Entity.GetComponent(171);
    i?.ResumeAi("NpcPerformIdleState"),
      this.Ore(),
      this.itr ||
        ((this.ker = !0), this.utr(), i?.IsInPlot) ||
        this.dtr ||
        this.gtr ||
        (this.aqn?.IsMoving
          ? this.Wer && this.vtr()
          : this.Ker
            ? this.Itr(this.Mma)
            : this.dna &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "NPC",
                30,
                "NPC逻辑状态机切换过快，请联系相关人员检查",
                ["ConfigId", this.Mne],
              ));
  }
  Ttr() {
    return Time_1.Time.WorldTimeSeconds > this.Her + this.jer;
  }
  OnUpdate(t) {
    this.itr ||
      (this.Ltr(), this.Owner.Entity.GetComponent(171)?.IsInPlot) ||
      this.dtr ||
      this.gtr ||
      (this.aqn?.IsMoving
        ? this.Wer && this.vtr()
        : this.Ker
          ? (this.Wer && this.Xer !== this.Mma.MontagePath && this.vtr(),
            !this.dna && this.Ttr() && this.Itr(this.Mma))
          : this.Wer
            ? Time_1.Time.WorldTimeSeconds > this.Yer + this.$er && this.vtr()
            : this.ker
              ? this.Ttr() && this.Itr()
              : this.ttr
                ? this.ytr()
                : Time_1.Time.WorldTimeSeconds > this.Ver + this.Fer &&
                  this.Itr());
  }
  OnExit(t) {
    this.Wer && this.vtr(),
      this.kre(),
      this.Owner.Entity.GetComponent(171)?.PauseAi("NpcPerformIdleState");
  }
  OnDestroy() {
    this.otr?.RemoveOnMontageEnded(this._tr),
      (this.otr = void 0),
      (this.htr = void 0),
      (this.aqn = void 0),
      this.kre();
  }
  Ltr() {
    var t, i, s, e, h, r, n;
    this.rtr &&
      !this.atr &&
      ((this.ntr =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          this.rtr,
        )),
      this.ntr) &&
      (t =
        this.ntr.Entity.GetComponent(
          181,
        )?.GetSubEntityInteractLogicController()) &&
      t.IsSceneInteractionLoadCompleted() &&
      ((this.atr = !0),
      (i = this.Owner.Entity),
      t.Possess(i),
      t.IgnoreCollision(),
      (e = (s = i.GetComponent(2)).CreatureData.GetPbDataId()),
      (h = t.GetInteractPoint()),
      (r = s.HalfHeight),
      (h = Vector_1.Vector.Create(h.X, h.Y, h.Z + r)),
      (r = t.GetForwardDirection()),
      (n = Rotator_1.Rotator.Create()),
      r.ToOrientationRotator(n),
      s.SetActorLocationAndRotation(
        h.ToUeVector(),
        n.ToUeRotator(),
        "Npc椅子交互位置修正",
        !1,
      ),
      s instanceof CharacterActorComponent_1.CharacterActorComponent &&
        s.SetInputRotator(n),
      i?.GetComponent(100)?.Disable("NPC以坐下出生默认不移动"),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "AI",
        51,
        "[HandleLeisureInteract] 修正坐下位置和朝向",
        ["Location", h],
        ["Rotation", n],
        ["chairPbDataId", this.rtr],
        ["npcPbDataId", e],
      );
  }
  ytr(i) {
    if (!this.dna) {
      let t = i?.MontagePath,
        s = i?.ExpressionId;
      if (t) {
        if ("Empty" === t) return;
      } else {
        i = this.Rtr();
        if (
          !i ||
          !i.MontagePath ||
          "" === i.MontagePath ||
          "Empty" === i.MontagePath
        )
          return;
        (t = i.MontagePath), (s = i.ExpressionId), (this.$er = i.Time);
      }
      const e = this.Owner.Entity.GetComponent(171);
      (e.AnyIdleLoopMontagePlaying = !0),
        (this.dna = !0),
        this.otr.LoadAsync(t, (t, i) => {
          this?.Owner?.Valid &&
            (t?.IsValid()
              ? (this.otr?.PlayFromLoop(t, this._tr),
                (this.Yer = Time_1.Time.WorldTimeSeconds),
                (this.Qer = t),
                (this.Xer = i),
                (this.Wer = !0),
                e.ExpressionController.ChangeFaceForExpression(t, s),
                (e.AnyIdleLoopMontagePlaying = !0))
              : ((this.dna = !1), (e.AnyIdleLoopMontagePlaying = !1)));
        });
    }
  }
  Itr(i) {
    if (!this.dna) {
      let t = i?.MontagePath,
        s = i?.ExpressionId;
      if (t) {
        if ("Empty" === t) return;
      } else {
        i = this.Rtr();
        if (
          !i ||
          !i.MontagePath ||
          "" === i.MontagePath ||
          "Empty" === i.MontagePath
        )
          return;
        (t = i.MontagePath), (s = i.ExpressionId), (this.$er = i.Time);
      }
      const e = this.Owner.Entity.GetComponent(171);
      (this.dna = !0),
        this.otr.LoadAsync(t, (t, i) => {
          this?.Owner?.Valid &&
            (t?.IsValid()
              ? (this.otr?.Play(t, this._tr),
                (this.Yer = Time_1.Time.WorldTimeSeconds),
                (this.Qer = t),
                (this.Xer = i),
                (this.Wer = !0),
                e.ExpressionController.ChangeFaceForExpression(t, s))
              : (this.dna = !1));
        });
    }
  }
  vtr(t = !1) {
    this.etr || ((this.etr = !0), this.otr?.Stop(t, this.Qer));
  }
  rKo() {
    (this.etr = !0), this.otr?.ForceStop(0.1, this.Qer);
  }
  Utr() {
    (this.etr = !0), this.otr?.ForceStop(0.5, this.Qer);
  }
  utr() {
    (this.Her = MathUtils_1.MathUtils.GetRandomRange(
      IDLE_MONTAGE_CD_MIN,
      IDLE_MONTAGE_CD_MAX,
    )),
      (this.jer = Time_1.Time.WorldTimeSeconds);
  }
  Rtr() {
    if (this.Jer?.length) {
      switch (this.zer) {
        case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly:
          this.Zer = Math.floor(Math.random() * this.Jer.length);
          break;
        case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Orderly:
          this.Zer = (this.Zer + 1) % this.Jer.length;
      }
      return this.Jer[this.Zer];
    }
  }
  Etr() {
    var t,
      i,
      s = this.Owner.Entity.GetComponent(39);
    s?.IsEnabled() &&
      ((t = s.AiController?.AiBase?.SubBehaviorConfigs?.get("AiSense")) &&
        ((i = this.Owner.Entity.GetComponent(108)),
        (t = AiSenseById_1.configAiSenseById.GetConfig(Number(t)))) &&
        ((t = Math.max(t.SenseDistanceRange.Max, 0)),
        i.SetLogicRange(t),
        (this.ctr = 0 < t)),
      (i = s.AiController?.AiBase?.SubBehaviorConfigs?.get("AiAlert"))) &&
      AiAlertById_1.configAiAlertById.GetConfig(Number(i)) &&
      (this.mtr = !0);
  }
  Ore() {
    (this.Ctr = this.Owner.Entity),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner.Entity,
        EventDefine_1.EEventName.OnInteractPlotStart,
        this.ftr,
      ),
      this.ctr &&
        this.mtr &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.OnStalkAlert,
          this.ptr,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.OnStalkAlertLifted,
          this.Oer,
        )),
      this.ctr &&
        !this.mtr &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.xei,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Mtr,
        ),
        this.Owner.Entity.GetComponent(108)?.IsInLogicRange || this.Mtr());
  }
  kre() {
    this.Ctr &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.Ctr,
        EventDefine_1.EEventName.OnInteractPlotStart,
        this.ftr,
      ),
      this.ctr &&
        this.mtr &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Ctr,
          EventDefine_1.EEventName.OnStalkAlert,
          this.ptr,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Ctr,
          EventDefine_1.EEventName.OnStalkAlertLifted,
          this.Oer,
        )),
      this.ctr &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Ctr,
          EventDefine_1.EEventName.EnterLogicRange,
          this.xei,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Ctr,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Mtr,
        )),
      (this.Ctr = void 0));
  }
  OnPlayerInteractTurnActionStart() {
    this.Owner.Entity.GetComponent(171)?.PauseAi("PlayerInteractTurnAction"),
      (this.gtr = !0);
    var t = this.Owner.Entity.GetComponent(0),
      i =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformIdleState.OnPlayerInteractTurnActionStart] 开始执行交互转身",
            ["PbDataID", t?.GetPbDataId()],
          ),
        this.Owner?.Entity?.GetComponent(36));
    i?.MainAnimInstance?.IsAnyMontagePlaying() && this.htr.NeedTurn
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformIdleState.OnPlayerInteractTurnActionStart][交互转身] 停止播放Montage",
            ["PbDataID", t?.GetPbDataId()],
            ["IsIdleMontage", this.dna],
            [
              "CurrentMontage",
              i?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
            ],
          ),
        this.otr?.AddOnMontageEnded(this.OnLoopMontageEndForTurning),
        this.Utr())
      : this.htr.TurnToInteractTarget();
  }
  OnPlayerInteractTurnActionEnd() {
    var t = this.Owner.Entity.GetComponent(0),
      i = this.Owner.Entity.GetComponent(36);
    i.MainAnimInstance.IsAnyMontagePlaying() &&
      this.htr.NeedTurn &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          51,
          "[NpcPerformIdleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage",
          ["PbDataID", t?.GetPbDataId()],
          ["IsIdleMontage", this.dna],
          [
            "CurrentMontage",
            i?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
          ],
        ),
      this.Utr()),
      (this.htr.OnTurnToDefaultForwardEndHandle = () => {
        this?.Owner?.Valid &&
          (this.Owner.Entity.GetComponent(171)?.ResumeAi(
            "PlayerInteractTurnAction",
          ),
          (this.htr.NeedTurn = !1));
      }),
      this.htr.TurnToDefaultForward(),
      (this.gtr = !1),
      this.utr();
  }
  OnPlayerAttack() {
    this.dtr || (this.dna && this.rKo(), this.StateMachine.Switch(3));
  }
  OnMonsterNearby() {
    return (
      !this.dtr && (this.dna && this.rKo(), this.StateMachine.Switch(7), !0)
    );
  }
  OnPlayerImpact() {
    this.dtr || (this.dna && this.rKo(), this.StateMachine.Switch(4));
  }
}
exports.NpcPerformIdleState = NpcPerformIdleState;
//# sourceMappingURL=NpcPerformIdleState.js.map
