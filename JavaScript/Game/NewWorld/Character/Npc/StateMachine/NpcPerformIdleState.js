"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformIdleState = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const AiAlertById_1 = require("../../../../../Core/Define/ConfigQuery/AiAlertById");
const AiSenseById_1 = require("../../../../../Core/Define/ConfigQuery/AiSenseById");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent");
const IDLE_MONTAGE_CD_MIN = 2;
const IDLE_MONTAGE_CD_MAX = 4;
const INITIAL_IDLE_MONTAGE_CD_MIN = 0;
const INITIAL_IDLE_MONTAGE_CD_MAX = 10;
const IMMEDIATE_PLAY_PROBABILITY = 0.1;
const ALERT_TURN_SPEED = 2e4;
class NpcPerformIdleState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.Mne = 0),
      (this.HZo = !1),
      (this.jZo = -0),
      (this.WZo = -0),
      (this.KZo = -0),
      (this.QZo = -0),
      (this.XZo = !1),
      (this.$Zo = !1),
      (this.GTe = void 0),
      (this.YZo = void 0),
      (this.JZo = void 0),
      (this.zZo = -0),
      (this.ZZo = -0),
      (this.eer = void 0),
      (this.ter = IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly),
      (this.ier = 0),
      (this.oer = !1),
      (this.rer = !1),
      (this.ner = !1),
      (this.ser = void 0),
      (this.aer = void 0),
      (this.her = void 0),
      (this.ler = !1),
      (this.i4s = 0),
      (this._er = !1),
      (this.uer = void 0),
      (this.awn = void 0),
      (this.mer = (t, i) => {
        t === this.YZo &&
          (this.ser.RemoveOnMontageEnded(this.mer),
          (this.HZo = !0),
          (this.XZo = !1),
          (this.YZo = void 0),
          (this.JZo = void 0),
          (this.oer = !1),
          this.der(),
          (this.Owner.Entity.GetComponent(168).AnyIdleLoopMontagePlaying = !1));
      }),
      (this.Cer = !1),
      (this.ger = !1),
      (this.fer = !1),
      (this.per = void 0),
      (this.ver = !1),
      (this.OnLoopMontageEndForTurning = (t, i) => {
        const s = this.Owner.Entity.GetComponent(0);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformIdleState.OnLoopMontageEndForTurning][交互转身] Montage播放完毕",
            ["PbDataID", s?.GetPbDataId()],
          ),
          this.ser?.RemoveOnMontageEnded(this.OnLoopMontageEndForTurning),
          this.uer.TurnToInteractTarget();
      }),
      (this.Mer = () => {
        this.StateMachine.Switch(2);
      }),
      (this.Ser = () => {
        let t, i;
        this.XZo && this.Eer(),
          this.Owner.Entity.GetComponent(168)?.PauseAi("StalkAlert"),
          (this.fer = !0),
          Global_1.Global.BaseCharacter &&
            ((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
            (i = this.Owner.Entity.GetComponent(3)),
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
              i,
              t.ActorLocationProxy,
              ALERT_TURN_SPEED,
            ));
      }),
      (this.VZo = () => {
        this.XZo && this.Eer(),
          this.Owner.Entity.GetComponent(168)?.ResumeAi("StalkAlert"),
          (this.fer = !1);
      }),
      (this.xZt = () => {
        this.XZo && this.Eer(),
          this.Owner.Entity?.GetComponent(168)?.ResumeAi("LeaveLogicRange"),
          (this.fer = !1);
      }),
      (this.yer = () => {
        this.Owner.Entity?.GetComponent(168)?.PauseAi("LeaveLogicRange"),
          (this.fer = !0);
      });
  }
  get NpcMontageController() {
    return this.ser;
  }
  set NpcMontageController(t) {
    this.ser = t;
  }
  get NpcTurnActionController() {
    return this.uer;
  }
  set NpcTurnActionController(t) {
    this.uer = t;
  }
  get NpcMoveComp() {
    return this.awn;
  }
  set NpcMoveComp(t) {
    this.awn = t;
  }
  OnCreate(t) {
    if (
      ((this.Mne = this.Owner.Entity.GetComponent(0).GetPbDataId()),
      t?.ShowOnStandby)
    )
      if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Loop)
        (this.$Zo = !0), (this.GTe = t.ShowOnStandby.Montage);
      else if (t.ShowOnStandby.Type === IComponent_1.ENpcStandbyShowMode.Sit)
        (this.$Zo = !0),
          (this.GTe = t.ShowOnStandby.Montage),
          (this.aer = t.ShowOnStandby.PosEntityId);
      else {
        this.eer = new Array();
        for (const i of t.ShowOnStandby.Montages) this.eer.push(i);
        this.ter = t.ShowOnStandby.PlayMode;
        t = Math.random();
        this.rer = t < IMMEDIATE_PLAY_PROBABILITY;
      }
    else this.ner = !0;
  }
  OnStart() {
    this.Ier(),
      this.Ore(),
      this.ner ||
        this.Owner.Entity.GetComponent(168)?.IsInPlot ||
        this.fer ||
        this.awn?.IsMoving ||
        (this.$Zo
          ? ((this.ler = !0), this.Ter(this.GTe))
          : (this.rer
              ? (this.jZo = 0)
              : (this.jZo = MathUtils_1.MathUtils.GetRandomRange(
                  INITIAL_IDLE_MONTAGE_CD_MIN,
                  INITIAL_IDLE_MONTAGE_CD_MAX,
                )),
            (this.WZo = Time_1.Time.WorldTimeSeconds)));
  }
  OnEnter(t) {
    const i = this.Owner.Entity.GetComponent(168);
    i?.ResumeAi("NpcPerformIdleState"),
      this.Ore(),
      this.ner ||
        ((this.HZo = !0), this.der(), i?.IsInPlot) ||
        this.fer ||
        this.ver ||
        (this.awn?.IsMoving
          ? this.XZo && this.Eer()
          : this.$Zo
            ? this.Ler(this.GTe)
            : this.XZo &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "NPC",
                30,
                "NPC逻辑状态机切换过快，请联系相关人员检查",
                ["ConfigId", this.Mne],
              ));
  }
  Der() {
    return Time_1.Time.WorldTimeSeconds > this.KZo + this.QZo;
  }
  OnUpdate(t) {
    this.ner ||
      (this.Rer(), this.r4s(), this.Owner.Entity.GetComponent(168)?.IsInPlot) ||
      this.fer ||
      this.ver ||
      (this.awn?.IsMoving
        ? this.XZo && this.Eer()
        : this.$Zo
          ? (this.XZo && this.JZo !== this.GTe && this.Eer(),
            !this.XZo && this.Der() && this.Ler(this.GTe))
          : this.XZo
            ? Time_1.Time.WorldTimeSeconds > this.ZZo + this.zZo && this.Eer()
            : this.HZo
              ? this.Der() && this.Ler()
              : this.rer
                ? this.Ter()
                : Time_1.Time.WorldTimeSeconds > this.WZo + this.jZo &&
                  this.Ler());
  }
  OnExit(t) {
    this.XZo && this.Eer(),
      this.kre(),
      this.Owner.Entity.GetComponent(168)?.PauseAi("NpcPerformIdleState");
  }
  OnDestroy() {
    this.ser?.RemoveOnMontageEnded(this.mer),
      (this.ser = void 0),
      (this.uer = void 0),
      (this.awn = void 0),
      this.kre();
  }
  Rer() {
    let t, i, s, e, h, r, n;
    this.aer &&
      !this._er &&
      ((this.her =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          this.aer,
        )),
      this.her) &&
      (t =
        this.her.Entity.GetComponent(
          178,
        )?.GetSubEntityInteractLogicController()) &&
      t.IsSceneInteractionLoadCompleted() &&
      ((this._er = !0),
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
      i?.GetComponent(98)?.Disable("NPC以坐下出生默认不移动"),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "AI",
        51,
        "[HandleLeisureInteract] 修正坐下位置和朝向",
        ["Location", h],
        ["Rotation", n],
        ["chairPbDataId", this.aer],
        ["npcPbDataId", e],
      );
  }
  Uer() {
    if (this.ler) {
      this.ler = !1;
      const i = this.Owner.Entity.GetComponent(2);
      let t = void 0;
      (t =
        i.CreatureData.GetSubEntityType() === 1
          ? this.Owner.Entity.GetComponent(176)
          : this.Owner.Entity.GetComponent(160)),
        (this.i4s = 3),
        t.StartForceDisableAnimOptimization(4);
    }
  }
  r4s() {
    if (!(this.i4s <= 0) && --this.i4s == 0) {
      const i = this.Owner.Entity.GetComponent(2);
      let t = void 0;
      (t =
        i.CreatureData.GetSubEntityType() === 1
          ? this.Owner.Entity.GetComponent(176)
          : this.Owner.Entity.GetComponent(
              160,
            )).CancelForceDisableAnimOptimization(4);
    }
  }
  Ter(i) {
    if (!this.XZo) {
      let t = i;
      if (t) {
        if (t === "Empty") return;
      } else {
        i = this.Aer();
        if (!i || !i.Montage || i.Montage === "" || i.Montage === "Empty")
          return;
        (t = i.Montage), (this.zZo = i.Time);
      }
      const s = this.Owner.Entity.GetComponent(168);
      (s.AnyIdleLoopMontagePlaying = !0),
        (this.XZo = !0),
        this.ser.LoadAsync(t, (t, i) => {
          this?.Owner?.Valid &&
            (t?.IsValid()
              ? (this.ser?.PlayFromLoop(t, this.mer),
                (this.ZZo = Time_1.Time.WorldTimeSeconds),
                (this.YZo = t),
                (this.JZo = i),
                (this.XZo = !0),
                this.Uer(),
                (s.AnyIdleLoopMontagePlaying = !0))
              : ((this.XZo = !1), (s.AnyIdleLoopMontagePlaying = !1)));
        });
    }
  }
  Ler(i) {
    if (!this.XZo) {
      let t = i;
      if (t) {
        if (t === "Empty") return;
      } else {
        i = this.Aer();
        if (!i || !i.Montage || i.Montage === "" || i.Montage === "Empty")
          return;
        (t = i.Montage), (this.zZo = i.Time);
      }
      (this.XZo = !0),
        this.ser.LoadAsync(t, (t, i) => {
          this?.Owner?.Valid &&
            (t?.IsValid()
              ? (this.ser?.Play(t, this.mer),
                (this.ZZo = Time_1.Time.WorldTimeSeconds),
                (this.YZo = t),
                (this.JZo = i),
                (this.XZo = !0))
              : (this.XZo = !1));
        });
    }
  }
  Eer(t = !1) {
    this.oer || ((this.oer = !0), this.ser?.Stop(t, this.YZo));
  }
  aWo() {
    (this.oer = !0), this.ser?.ForceStop(0.1, this.YZo);
  }
  Per() {
    (this.oer = !0), this.ser?.ForceStop(0.5, this.YZo);
  }
  der() {
    (this.KZo = MathUtils_1.MathUtils.GetRandomRange(
      IDLE_MONTAGE_CD_MIN,
      IDLE_MONTAGE_CD_MAX,
    )),
      (this.QZo = Time_1.Time.WorldTimeSeconds);
  }
  Aer() {
    if (this.eer?.length) {
      switch (this.ter) {
        case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Randomly:
          this.ier = Math.floor(Math.random() * this.eer.length);
          break;
        case IComponent_1.ENpcStandbyShowFinitelyPlayMode.Orderly:
          this.ier = (this.ier + 1) % this.eer.length;
      }
      return this.eer[this.ier];
    }
  }
  Ier() {
    let t;
    let i;
    const s = this.Owner.Entity.GetComponent(38);
    s?.IsEnabled() &&
      ((t = s.AiController?.AiBase?.SubBehaviorConfigs?.get("AiSense")) &&
        ((i = this.Owner.Entity.GetComponent(106)),
        (t = AiSenseById_1.configAiSenseById.GetConfig(Number(t)))) &&
        ((t = Math.max(t.SenseDistanceRange.Max, 0)),
        i.SetLogicRange(t),
        (this.Cer = t > 0)),
      (i = s.AiController?.AiBase?.SubBehaviorConfigs?.get("AiAlert"))) &&
      AiAlertById_1.configAiAlertById.GetConfig(Number(i)) &&
      (this.ger = !0);
  }
  Ore() {
    (this.per = this.Owner.Entity),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner.Entity,
        EventDefine_1.EEventName.OnInteractPlotStart,
        this.Mer,
      ),
      this.Cer &&
        this.ger &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.OnStalkAlert,
          this.Ser,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.OnStalkAlertLifted,
          this.VZo,
        )),
      this.Cer &&
        !this.ger &&
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.EnterLogicRange,
          this.xZt,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Owner.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.yer,
        ),
        this.Owner.Entity.GetComponent(106)?.IsInLogicRange || this.yer());
  }
  kre() {
    this.per &&
      (EventSystem_1.EventSystem.RemoveWithTarget(
        this.per,
        EventDefine_1.EEventName.OnInteractPlotStart,
        this.Mer,
      ),
      this.Cer &&
        this.ger &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.per,
          EventDefine_1.EEventName.OnStalkAlert,
          this.Ser,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.per,
          EventDefine_1.EEventName.OnStalkAlertLifted,
          this.VZo,
        )),
      this.Cer &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.per,
          EventDefine_1.EEventName.EnterLogicRange,
          this.xZt,
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.per,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.yer,
        )),
      (this.per = void 0));
  }
  OnPlayerInteractTurnActionStart() {
    this.Owner.Entity.GetComponent(168)?.PauseAi("PlayerInteractTurnAction"),
      (this.ver = !0);
    const t = this.Owner.Entity.GetComponent(0);
    const i =
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          51,
          "[NpcPerformIdleState.OnPlayerInteractTurnActionStart] 开始执行交互转身",
          ["PbDataID", t?.GetPbDataId()],
        ),
      this.Owner?.Entity?.GetComponent(35));
    i?.MainAnimInstance?.IsAnyMontagePlaying() && this.uer.NeedTurn
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformIdleState.OnPlayerInteractTurnActionStart][交互转身] 停止播放Montage",
            ["PbDataID", t?.GetPbDataId()],
            ["IsIdleMontage", this.XZo],
            [
              "CurrentMontage",
              i?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
            ],
          ),
        this.ser?.AddOnMontageEnded(this.OnLoopMontageEndForTurning),
        this.Per())
      : this.uer.TurnToInteractTarget();
  }
  OnPlayerInteractTurnActionEnd() {
    const t = this.Owner.Entity.GetComponent(0);
    const i = this.Owner.Entity.GetComponent(35);
    i.MainAnimInstance.IsAnyMontagePlaying() &&
      this.uer.NeedTurn &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          51,
          "[NpcPerformIdleState.OnPlayerInteractTurnActionEnd][结束交互转身] 停止播放Montage",
          ["PbDataID", t?.GetPbDataId()],
          ["IsIdleMontage", this.XZo],
          [
            "CurrentMontage",
            i?.MainAnimInstance?.GetCurrentActiveMontage()?.GetName(),
          ],
        ),
      this.Per()),
      (this.uer.OnTurnToDefaultForwardEndHandle = () => {
        this?.Owner?.Valid &&
          (this.Owner.Entity.GetComponent(168)?.ResumeAi(
            "PlayerInteractTurnAction",
          ),
          (this.uer.NeedTurn = !1));
      }),
      this.uer.TurnToDefaultForward(),
      (this.ver = !1),
      this.der();
  }
  OnPlayerAttack() {
    this.fer || (this.XZo && this.aWo(), this.StateMachine.Switch(3));
  }
  OnMonsterNearby() {
    return (
      !this.fer && (this.XZo && this.aWo(), this.StateMachine.Switch(7), !0)
    );
  }
  OnPlayerImpact() {
    this.fer || (this.XZo && this.aWo(), this.StateMachine.Switch(4));
  }
}
exports.NpcPerformIdleState = NpcPerformIdleState;
// # sourceMappingURL=NpcPerformIdleState.js.map
