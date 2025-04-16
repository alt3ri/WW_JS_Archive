"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformIdleState = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  AiAlertById_1 = require("../../../../../Core/Define/ConfigQuery/AiAlertById"),
  AiSenseById_1 = require("../../../../../Core/Define/ConfigQuery/AiSenseById"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
  CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent"),
  NpcWaitEntityTaskController_1 = require("../Logics/NpcWaitEntityTaskController"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState"),
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
      var e = i.RegisteredMontageId;
      (t = e.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(e.MontageId)
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(e.MontageId)),
        (this.MontagePath = t?.ActionMontage);
    }
    (this.ExpressionId = i.FaceExpressionId),
      (this.IsLoop = !!i),
      (this.Time = i.Time ?? 0);
  }
}
class NpcPerformIdleState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments),
      (this.ker = !1),
      (this.Fer = -0),
      (this.Ver = -0),
      (this.Her = -0),
      (this.jer = -0),
      (this.Xaa = !1),
      (this.Wer = !1),
      (this.Ker = !1),
      (this.Rga = void 0),
      (this.Qer = void 0),
      (this.Xer = void 0),
      (this.Jer = void 0),
      (this.zer = IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly),
      (this.Zer = 0),
      (this.etr = !1),
      (this.ttr = !1),
      (this.itr = !1),
      (this.rtr = void 0),
      (this.ntr = void 0),
      (this.atr = !1),
      (this._Ll = void 0),
      (this.gqn = void 0),
      (this._tr = (t, i) => {
        (this.ker = !0),
          (this.Xaa = !1),
          (this.Wer = !1),
          (this.Qer = void 0),
          (this.Xer = void 0),
          (this.etr = !1),
          this.utr(),
          (this.Owner.Entity.GetComponent(185).AnyIdleLoopMontagePlaying = !1);
      }),
      (this.ctr = !1),
      (this.mtr = !1),
      (this.dtr = !1),
      (this.Ctr = void 0),
      (this.ftr = () => {
        this.StateMachine.Switch(2);
      }),
      (this.ptr = () => {
        var t, i;
        this.vtr(),
          this.Owner.Entity.GetComponent(185)?.PauseAi("StalkAlert"),
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
        this.vtr(),
          this.Owner.Entity.GetComponent(185)?.ResumeAi("StalkAlert"),
          (this.dtr = !1);
      }),
      (this.xei = () => {
        this.vtr(),
          this.Owner.Entity?.GetComponent(185)?.ResumeAi("LeaveLogicRange"),
          (this.dtr = !1);
      }),
      (this.Mtr = () => {
        this.Owner.Entity?.GetComponent(185)?.PauseAi("LeaveLogicRange"),
          (this.dtr = !0);
      });
  }
  get NpcMoveComp() {
    return this.gqn;
  }
  set NpcMoveComp(t) {
    this.gqn = t;
  }
  CanChangeFrom(t) {
    return 9 !== t;
  }
  OnCreate(t) {
    if ((super.OnCreate(t), t?.ShowOnStandby)) {
      if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Loop)
        (this.Ker = !0),
          (this.Rga = new NpcStandbyShowInfo(t.ShowOnStandby)),
          t.ShowOnStandby?.IgnoreEntityCollision?.EntityIds &&
            ((this._Ll =
              new NpcWaitEntityTaskController_1.NpcWaitEntityTaskController(
                this.Owner.Entity,
              )),
            this._Ll.AddTask(
              t.ShowOnStandby?.IgnoreEntityCollision?.EntityIds,
              0,
            ));
      else if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Sit)
        (this.Ker = !0),
          (this.Rga = new NpcStandbyShowInfo(t.ShowOnStandby)),
          (this.rtr = t.ShowOnStandby.PosEntityId);
      else if (
        t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Finite
      ) {
        this.Jer = new Array();
        for (const i of t.ShowOnStandby.Montages)
          this.Jer.push(new NpcStandbyShowInfo(i));
        this.zer = t.ShowOnStandby.PlayMode;
        t = Math.random();
        this.ttr = t < IMMEDIATE_PLAY_PROBABILITY;
      }
    } else this.itr = !0;
  }
  OnStart() {
    this.Etr(),
      this.Ore(),
      this.itr ||
        (this._Ll?.RunTask(), this.Owner.Entity.GetComponent(185)?.IsInPlot) ||
        this.dtr ||
        this.gqn?.IsMoving ||
        (this.Ker
          ? this.Itr(!0)
          : ((this.Fer = this.ttr
              ? 0
              : MathUtils_1.MathUtils.GetRandomRange(
                  INITIAL_IDLE_MONTAGE_CD_MIN,
                  INITIAL_IDLE_MONTAGE_CD_MAX,
                )),
            (this.Ver = Time_1.Time.WorldTimeSeconds)));
  }
  OnEnter(t) {
    var i = this.Owner.Entity.GetComponent(185);
    i?.ResumeAi("NpcPerformIdleState"),
      this.Ore(),
      this.itr ||
        ((this.ker = !0), this.utr(), i?.IsInPlot) ||
        this.dtr ||
        this.InteractRequestWaiting ||
        (this.gqn?.IsMoving ? this.vtr() : this.Ker && this.Itr());
  }
  Ttr() {
    return Time_1.Time.WorldTimeSeconds > this.Her + this.jer;
  }
  OnUpdate(t) {
    this.itr ||
      (this.XWa(), this.Owner.Entity.GetComponent(185)?.IsInPlot) ||
      this.dtr ||
      this.InteractRequestWaiting ||
      (this.gqn?.IsMoving ||
      (this.Ker && this.Xer && this.Xer !== this.Rga.MontagePath)
        ? this.vtr()
        : this.Xaa ||
          this.Wer ||
          (this.ker
            ? this.Ttr() && this.Itr()
            : (this.ttr ||
                Time_1.Time.WorldTimeSeconds > this.Ver + this.Fer) &&
              this.Itr(this.ttr)));
  }
  OnExit(t) {
    this.vtr(),
      this.kre(),
      this.Owner.Entity.GetComponent(185)?.PauseAi("NpcPerformIdleState");
  }
  OnDestroy() {
    this.YWa(),
      this._Ll?.Dispose(),
      (this._Ll = void 0),
      (this.gqn = void 0),
      this.kre();
  }
  XWa() {
    var t, i, e, s, h;
    this.rtr &&
      !this.atr &&
      ((this.ntr =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          this.rtr,
        )),
      this.ntr) &&
      (s =
        this.ntr.Entity.GetComponent(
          195,
        )?.GetSubEntityInteractLogicController()) &&
      s.IsSceneInteractionLoadCompleted() &&
      ((this.atr = !0),
      (t = this.Owner.Entity),
      s.Possess(t),
      s.IgnoreCollision(),
      (i = (t = t.GetComponent(2)).CreatureData.GetPbDataId()),
      (e = s.GetSitLocation()),
      (s = s.GetForwardDirection()),
      (h = Rotator_1.Rotator.Create()),
      s.ToOrientationRotator(h),
      t.SetActorLocationAndRotation(
        e.ToUeVector(),
        h.ToUeRotator(),
        "Npc椅子交互位置修正",
        !1,
      ),
      t instanceof CharacterActorComponent_1.CharacterActorComponent &&
        t.SetInputRotator(h),
      this.TurnActionController?.UpdateDefaultDirect(s),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "AI",
        50,
        "[HandleLeisureInteract] 修正坐下位置和朝向",
        ["Location", e],
        ["Rotation", h],
        ["chairPbDataId", this.rtr],
        ["npcPbDataId", i],
      );
  }
  YWa() {
    var t;
    this.rtr &&
      ((this.ntr =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          this.rtr,
        )),
      this.ntr) &&
      (t =
        this.ntr.Entity.GetComponent(
          195,
        )?.GetSubEntityInteractLogicController()) &&
      t.IsSceneInteractionLoadCompleted() &&
      (t.UnPossess(this.Owner.Entity), t.ResetCollision());
  }
  Itr(r = !1) {
    if (!this.Xaa && !this.Wer) {
      const n = this.Owner.Entity.GetComponent(185),
        o = this.Ker ? this.Rga : this.Rtr();
      if (
        o &&
        o.MontagePath &&
        "" !== o.MontagePath &&
        "Empty" !== o.MontagePath
      ) {
        var t = o.MontagePath;
        const a = o.ExpressionId;
        (this.Xaa = !0),
          this.Rga && (n.AnyIdleLoopMontagePlaying = !0),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            t,
            UE.AnimMontage,
            (t, i) => {
              var e, s, h;
              this?.Owner?.Valid &&
                (!t?.IsValid() || 1 !== n?.GetCurrentState()
                  ? ((this.Xaa = !1), (n.AnyIdleLoopMontagePlaying = !1))
                  : ((s = t.SequenceLength),
                    (e = r
                      ? CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION
                      : void 0),
                    (s = this.Ker || -1 === o.Time || o.Time > s),
                    (h =
                      !this.Ker && 0 < o.Time
                        ? o.Time * MathUtils_1.MathUtils.SecondToMillisecond
                        : void 0),
                    this.PlayMontage({
                      MontageAsset: t,
                      IsLoop: s,
                      Duration: h,
                      InSectionToStartMontageAt: e,
                      OnEndCallback: this._tr,
                    }),
                    (this.Qer = t),
                    (this.Xer = i),
                    (this.Wer = !0),
                    n.ExpressionController.ChangeFaceForExpression(t, a)));
            },
          );
      }
    }
  }
  vtr(t = !1) {
    (!this.Xaa && !this.Wer) ||
      this.etr ||
      ((this.etr = !0),
      this.StopMontage({ Method: t ? 2 : 4, Montage: this.Qer }));
  }
  rKo() {
    (this.Xaa || this.Wer) &&
      ((this.etr = !0),
      this.StopMontage({ Method: 0, BlendOutTime: 0.1, Montage: this.Qer }));
  }
  Utr() {
    (this.etr = !0),
      this.StopMontage({ Method: 0, BlendOutTime: 0.5, Montage: this.Qer });
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
      e = this.Owner.Entity.GetComponent(46);
    e?.IsEnabled() &&
      ((t = e.AiController?.AiBase?.SubBehaviorConfigs?.get("AiSense")) &&
        ((i = this.Owner.Entity.GetComponent(119)),
        (t = AiSenseById_1.configAiSenseById.GetConfig(Number(t)))) &&
        ((t = Math.max(t.SenseDistanceRange.Max, 0)),
        i.SetLogicRange(t),
        (this.ctr = 0 < t)),
      (i = e.AiController?.AiBase?.SubBehaviorConfigs?.get("AiAlert"))) &&
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
        this.Owner.Entity.GetComponent(119)?.IsInLogicRange || this.Mtr());
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
    this.Owner.Entity.GetComponent(185)?.PauseAi("PlayerInteractTurnAction"),
      (this.InteractRequestWaiting = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          50,
          "[NpcPerformIdleState.OnPlayerInteractTurnActionStart] 开始执行交互转身",
          ["PbDataID", this.ConfigId],
        ),
      this.TurnActionController.TurnToInteractTarget();
  }
  OnPlayerInteractTurnActionEnd() {
    var t = this.Owner.Entity.GetComponent(43);
    t.MainAnimInstance.IsAnyMontagePlaying() &&
      this.TurnActionController.NeedTurn &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          50,
          "[NpcPerformIdleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage",
          ["PbDataID", this.ConfigId],
          ["IsIdleMontage", this.Xaa],
          [
            "CurrentMontage",
            t?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
          ],
        ),
      this.Utr()),
      (this.TurnActionController.OnTurnToDefaultForwardEndHandle = () => {
        this?.Owner?.Valid &&
          (this.Owner.Entity.GetComponent(185)?.ResumeAi(
            "PlayerInteractTurnAction",
          ),
          (this.TurnActionController.NeedTurn = !1));
      }),
      this.TurnActionController.TurnToDefaultForward(),
      (this.InteractRequestWaiting = !1),
      this.utr();
  }
  OnPlayerAttack() {
    this.dtr || (this.rKo(), this.StateMachine.Switch(3));
  }
  OnMonsterNearby() {
    return !this.dtr && (this.rKo(), this.StateMachine.Switch(7), !0);
  }
  OnPlayerImpact() {
    this.dtr || (this.rKo(), this.StateMachine.Switch(4));
  }
}
exports.NpcPerformIdleState = NpcPerformIdleState;
//# sourceMappingURL=NpcPerformIdleState.js.map
