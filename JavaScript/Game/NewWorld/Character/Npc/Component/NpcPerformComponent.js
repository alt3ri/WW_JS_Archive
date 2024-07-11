"use strict";
let NpcPerformComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let h;
    const r = arguments.length;
    let o =
      r < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, i, e, s);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (h = t[n]) && (o = (r < 3 ? h(o) : r > 3 ? h(i, e, o) : h(i, e)) || o);
    return r > 3 && o && Object.defineProperty(i, e, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StateMachine_1 = require("../../../../../Core/Utils/StateMachine/StateMachine");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PawnTurnActionController_1 = require("../../../Pawn/Controllers/PawnTurnActionController");
const MonsterNearbySensory_1 = require("../../../Pawn/SensoryInfo/MonsterNearbySensory");
const BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent");
const NpcPerformAlertState_1 = require("../StateMachine/NpcPerformAlertState");
const NpcPerformIdleState_1 = require("../StateMachine/NpcPerformIdleState");
const NpcPerformImpactedState_1 = require("../StateMachine/NpcPerformImpactedState");
const NpcPerformInteractState_1 = require("../StateMachine/NpcPerformInteractState");
const NpcPerformMonsterNearbyState_1 = require("../StateMachine/NpcPerformMonsterNearbyState");
const NpcPerformSystemUiState_1 = require("../StateMachine/NpcPerformSystemUiState");
const NpcPerformUnderAttackState_1 = require("../StateMachine/NpcPerformUnderAttackState");
const MIN_IMPACT_STRENGTH = 500;
const DEFAULT_SIGHT_RANGE = 300;
const SIGHT_OPEN_DEGREE = 80;
let NpcPerformComponent =
  (NpcPerformComponent_1 = class NpcPerformComponent extends (
    BasePerformComponent_1.BasePerformComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Mne = 0),
        (this.Lo = void 0),
        (this.OKt = void 0),
        (this.gbr = !1),
        (this.Hte = void 0),
        (this.dbr = void 0),
        (this.q6e = void 0),
        (this.Lie = void 0),
        (this.Lle = void 0),
        (this.gin = void 0),
        (this.fin = void 0),
        (this.pin = void 0),
        (this.vin = void 0),
        (this.Sin = void 0),
        (this.uer = void 0),
        (this.Ein = -1),
        (this.Mtr = Vector_1.Vector.Create()),
        (this.fbr = Vector_1.Vector.Create()),
        (this.yin = Vector_1.Vector.Create()),
        (this.vbr = !1),
        (this.Lin = !1),
        (this.IsBeingImpacted = !1),
        (this.IsBeingAttacked = !1),
        (this.CollisionStrength = 0),
        (this.CollisionDirection = 0),
        (this.AnyIdleLoopMontagePlaying = !1),
        (this.Din = (t, i, e) => {
          this.IsInPlot ||
            this.IsBeingAttacked ||
            this.IsBeingImpacted ||
            this.Lle.CurrentState !== 1 ||
            (Global_1.Global.BaseCharacter === i &&
              (this.Rin() && this.Hte?.CreatureData.GetSubEntityType() !== 1
                ? this.Lo.NpcHitShow && this.Ain()
                : this.Lo.IsShowStrike && this.Uin()));
        }),
        (this.Pz = (t, i) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "NPC",
              30,
              "NPC切换状态",
              ["ConfigId", this.Mne],
              ["旧状态", NpcPerformComponent_1.GetStateName(t)],
              ["新状态", NpcPerformComponent_1.GetStateName(i)],
            );
        }),
        (this.Pin = !1),
        (this.xin = 0),
        (this.win = 0),
        (this.Bin = !1),
        (this.OnNpcInAiControl = () => {
          this.xin === 2
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("NPC", 30, "关卡Ai控制中，与行为树不兼容", [
                "ConfigID",
                this.Entity.GetComponent(0).GetPbDataId(),
              ])
            : this.IsInPlot
              ? (this.win = 1)
              : (this.xin = 1);
        }),
        (this.InLevelAiControl = () =>
          this.xin === 1
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error("NPC", 30, "行为树控制中，与关卡Ai不兼容", [
                  "ConfigID",
                  this.Entity.GetComponent(0).GetPbDataId(),
                ]),
              !1)
            : this.IsInPlot || this.Bin
              ? !(this.win = 2)
              : ((this.xin = 2), !0));
    }
    OnInitData() {
      let t = this.Entity.GetComponent(0).GetPbEntityInitData();
      if (!t?.ComponentsData) return !(this.Lin = !1);
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "NpcPerformComponent",
      );
      if (!t) return !(this.Lin = !1);
      this.Lin = !0;
      var i = this.Entity.GetComponent(0);
      var i =
        ((this.Mne = i.GetPbDataId()),
        (this.q6e = this.Entity.GetComponent(103)),
        (this.Lie = this.Entity.GetComponent(177)),
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          i.GetCreatureDataId(),
        ));
      return (
        (this.Lle = new StateMachine_1.StateMachine(i, this.Pz)),
        this.Lle.AddState(1, NpcPerformIdleState_1.NpcPerformIdleState, t),
        this.Lle.AddState(
          2,
          NpcPerformInteractState_1.NpcPerformInteractState,
          t,
        ),
        this.Lle.AddState(
          3,
          NpcPerformUnderAttackState_1.NpcPerformUnderAttackState,
          t,
        ),
        this.Lle.AddState(4, NpcPerformImpactedState_1.NpcPerformImpactedState),
        this.Lle.AddState(
          5,
          NpcPerformSystemUiState_1.NpcPerformSystemUiState,
          t,
        ),
        this.Lle.AddState(6, NpcPerformAlertState_1.NpcPerformAlertState),
        this.Lle.AddState(
          7,
          NpcPerformMonsterNearbyState_1.NpcPerformMonsterNearbyState,
          t,
        ),
        (this.gin = this.Lle.GetState(1)),
        (this.fin = this.Lle.GetState(2)),
        (this.pin = this.Lle.GetState(3)),
        (this.vin = this.Lle.GetState(7)),
        (this.Sin = this.Lle.GetState(5)),
        (this.Lo = t),
        !0
      );
    }
    OnStart() {
      let t;
      return (
        this.Lin &&
          ((this.Hte = this.Entity.GetComponent(2)),
          (this.OKt = this.Hte.Owner),
          this.Mtr.DeepCopy(this.Hte.ActorForwardProxy),
          this.OKt.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
            (((t = this.OKt).CanPlayerImpact = this.Lo.IsShowStrike),
            (t.CanLookAtPlayer = this.Lo.IsStare),
            (this.gbr = t.CanLookAtPlayer),
            this.Lo.NpcHitShow
              ? (t.CanPlayerAttack = !0)
              : (t.CanPlayerAttack = !1),
            this.Lin) &&
            (this.Lo.IsShowStrike || this.Lo.NpcHitShow) &&
            t.HitCollision.OnComponentBeginOverlap.Add(this.Din),
          (this.AnimComp = this.Entity.GetComponent(35)),
          (this.dbr = this.Entity.GetComponent(104)),
          this.dbr && this.dbr.SetSightRange(DEFAULT_SIGHT_RANGE),
          this.Ore()),
        !0
      );
    }
    OnActivate() {
      this.Lin &&
        ((this.uer = new PawnTurnActionController_1.PawnTurnActionController(
          this.Entity,
        )),
        this.qin(),
        this.Lle.Start(1),
        this.Gin());
    }
    OnEnd() {
      return this.Lin && (this.Nin(), this.kre(), this.uer?.Dispose()), !0;
    }
    OnClear() {
      return this.Lin && (this.Lle.Destroy(), this.Oin()), !0;
    }
    Oin() {
      (this.Lle = void 0),
        (this.gin = void 0),
        (this.fin = void 0),
        (this.pin = void 0),
        (this.vin = void 0),
        (this.Sin = void 0),
        (this.uer = void 0);
    }
    Ore() {
      this.vbr ||
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRunBehaviorTree,
          this.OnNpcInAiControl,
        ),
        (this.vbr = !0));
    }
    kre() {
      this.vbr &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRunBehaviorTree,
          this.OnNpcInAiControl,
        ),
        (this.vbr = !1));
    }
    qin() {
      (this.gin.NpcMontageController = this.GetMontageController()),
        (this.gin.NpcTurnActionController = this.uer),
        (this.gin.NpcMoveComp = this.Entity.GetComponent(36)),
        (this.fin.NpcMontageController = this.GetMontageController()),
        (this.pin.NpcMontageController = this.GetMontageController()),
        this.pin.SetDefaultDirect(this.Hte.ActorForwardProxy),
        (this.vin.NpcMontageController = this.GetMontageController()),
        (this.Sin.NpcMontageController = this.GetMontageController());
    }
    OnMonsterNearby() {
      return (
        this.Lle.CurrentState === 7 ||
        (!this.IsInPlot &&
          this.Lle.CurrentState === 1 &&
          this.gin.OnMonsterNearby())
      );
    }
    Gin() {
      if (this.Lo?.NpcMonsterClosePerform) {
        const i = new MonsterNearbySensory_1.MonsterNearbySensory();
        i.Init(this.Lo.NpcMonsterClosePerform.Range),
          (i.OnEnterSensoryRange = (t) => this.OnMonsterNearby()),
          (i.OnExitSensoryRange = (t) =>
            !(!i.CheckInRange() && this.Lle.CurrentState === 7) ||
            this.Lle.Switch(1)),
          (this.Ein = this.Entity.GetComponent(105).AddSensoryInfo(i));
      }
    }
    Nin() {
      this.Ein >= 0 &&
        (this.Entity.GetComponent(105).RemoveSensoryInfo(this.Ein),
        (this.Ein = -1));
    }
    OnPlayerAttack() {
      this.IsInPlot || this.Lle.CurrentState !== 1 || this.gin.OnPlayerAttack();
    }
    OnPlayerAttackBegin() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          43,
          "NPC进入受到攻击ABP动画状态 [OnPlayerAttackBegin]",
          ["ConfigId", this.Mne],
        ),
        (this.IsBeingAttacked = !1);
    }
    OnPlayerAttackEnd() {
      this.kin(!1),
        this.Lle.CurrentState !== 3
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              43,
              "NPC退出Attack状态失败 [OnPlayerAttackEnd]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.Lle.CurrentState],
            )
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "NPC",
                43,
                "NPC退出受到攻击ABP动画状态 [OnPlayerAttackEnd]",
                ["ConfigId", this.Mne],
              ),
            this.Lle.Switch(1));
    }
    OnPlayerImpact() {
      this.IsInPlot || this.Lle.CurrentState !== 1 || this.gin.OnPlayerImpact();
    }
    OnPlayerImpactBegin() {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "NPC",
          43,
          "NPC进入受到冲撞ABP动画状态 [OnPlayerImpactBegin]",
          ["ConfigId", this.Mne],
        ),
        (this.IsBeingImpacted = !1);
    }
    OnPlayerImpactEnd() {
      this.kin(!1),
        this.Lle.CurrentState !== 4
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              43,
              "NPC退出Impact状态失败 [OnPlayerImpactEnd]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.Lle.CurrentState],
            )
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "NPC",
                43,
                "NPC退出受到冲撞ABP动画状态 [OnPlayerImpactEnd]",
                ["ConfigId", this.Mne],
              ),
            this.Lle.Switch(1));
    }
    OnPlayerInteractStart(t, i, e, s = void 0) {
      return (
        !!this.uer &&
        !this.IsInPlot &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformComp.OnPlayerInteractStart] 开始执行交互转身",
            ["PbDataID", this.Hte?.CreatureData.GetPbDataId()],
          ),
        this.Lle.CurrentState !== 1 && this.Lle.Switch(1),
        (this.uer.NeedTurn = t),
        (this.uer.WaitTurnEnd = i),
        (this.uer.OnTurnToInteractTargetEndHandle = e),
        s
          ? this.uer.PlayerOffset.DeepCopy(s)
          : this.uer.PlayerOffset.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.gin.OnPlayerInteractTurnActionStart(),
        !0)
      );
    }
    OnPlayerInteractEnd() {
      !this.uer || this.IsInPlot || this.gin.OnPlayerInteractTurnActionEnd();
    }
    OnTick(t) {
      this.Lin &&
        this.AnimComp &&
        (this.Lle.Update(t),
        this.Lle.CurrentState === 5
          ? (this.yin.DeepCopy(
              CameraController_1.CameraController.WidgetCamera.DisplayComponent.CineCamera.K2_GetActorLocation(),
            ),
            this.SightTarget(this.yin))
          : this.gbr &&
            (this.dbr.IsInSightRange && this.wbr()
              ? this.SightTarget(
                  Global_1.Global.BaseCharacter.CharacterActorComponent,
                )
              : this.SightTarget(void 0)));
    }
    wbr() {
      let t;
      return (
        !!Global_1.Global.BaseCharacter?.IsValid() &&
        ((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.fbr.FromUeVector(t.ActorLocationProxy),
        this.fbr.SubtractionEqual(this.Hte.ActorLocationProxy),
        (this.fbr.Z = 0),
        this.fbr.Normalize(),
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          this.fbr,
          this.Hte.ActorForwardProxy,
        ) <= SIGHT_OPEN_DEGREE)
      );
    }
    SightTarget(t) {
      this.gbr &&
        ((0, RegisterComponent_1.isComponentInstance)(t, 1)
          ? this.AnimComp.SetSightTargetItem(t)
          : t instanceof Vector_1.Vector
            ? this.AnimComp.SetSightTargetPoint(t)
            : (this.AnimComp.SetSightTargetItem(void 0),
              this.AnimComp.SetSightTargetPoint(void 0)));
    }
    get OpenLookAt() {
      return this.gbr;
    }
    SetLookAtPlayerEnabled(t) {
      !t &&
        this.AnimComp &&
        (this.AnimComp.SetSightTargetItem(void 0),
        this.AnimComp.SetSightTargetPoint(void 0)),
        (this.gbr = t);
    }
    SetUiOpenPerformance(t, i) {
      if (this.IsInPlot)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            30,
            "开启系统UI失败，剧情中开启系统UI",
            ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()],
            ["已开启系统UI", t],
            ["正在开启系统UI", this.Sin.SystemUiViewName],
          );
      else if (this.Lle.CurrentState === 5)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            30,
            "开启系统UI失败，系统UI已开启",
            ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()],
            ["已开启系统UI", t],
            ["正在开启系统UI", this.Sin.SystemUiViewName],
          );
      else {
        (this.Sin.SystemUiViewName = t),
          (this.Sin.BoardId = i),
          this.Lle.Switch(5);
        let e = this.Entity.GetComponent(0);
        if (e?.Valid) {
          e = e.GetBaseInfo().ChildEntityIds;
          if (e && !(e.length < 1)) {
            const s = ModelManager_1.ModelManager.CreatureModel;
            for (const r of e) {
              let h = s.GetEntityByPbDataId(r);
              h?.Valid &&
                (h = h.Entity.GetComponent(168))?.Valid &&
                h.SetUiOpenPerformance(t, i);
            }
          }
        }
      }
    }
    Ain() {
      (this.IsBeingAttacked = !0),
        this.kin(!0),
        this.q6e?.ForceUpdate(),
        this.OnPlayerAttack();
    }
    Uin() {
      const t = Global_1.Global.BaseCharacter.GetVelocity().Size2D();
      t < MIN_IMPACT_STRENGTH ||
        ((this.CollisionStrength = t),
        this.Fin(),
        (this.IsBeingImpacted = !0),
        this.kin(!0),
        this.q6e?.ForceUpdate(),
        this.OnPlayerImpact());
    }
    kin(t) {
      this.Lie &&
        (t && !this.Lie.HasTag(-2044964178) && this.Lie.AddTag(-2044964178),
        !t) &&
        this.Lie.HasTag(-2044964178) &&
        this.Lie.RemoveTag(-2044964178);
    }
    Rin() {
      const t =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          185,
        );
      return (
        !!t &&
        (t.HasTag(1408042260) || t.HasTag(64219164) || t.HasTag(1733479717))
      );
    }
    Fin() {
      var t = Global_1.Global.BaseCharacter.GetVelocity();
      var i = this.Hte.Actor.GetVelocity();
      var t = t.op_Subtraction(i);
      var i = this.Hte.ActorRight;
      var i = t.CosineAngle2D(i);
      var i = MathCommon_1.MathCommon.RadianToDegree(Math.acos(i));
      var e = this.Hte.ActorForward;
      var t = t.CosineAngle2D(e);
      var e = MathCommon_1.MathCommon.RadianToDegree(Math.acos(t));
      i > MathCommon_1.MathCommon.RightAngle
        ? (this.CollisionDirection = -1 * e)
        : (this.CollisionDirection = e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            43,
            "NPC受到冲撞",
            ["ConfigId", this.Mne],
            ["碰撞角度", this.CollisionDirection],
          );
    }
    static GetStateName(t) {
      switch (t) {
        case 1:
          return "空闲";
        case 2:
          return "交互";
        case 3:
          return "受到攻击";
        case 4:
          return "受到冲撞";
        case 5:
          return "系统UI";
        case 6:
          return "警觉";
        case 7:
          return "怪物靠近";
      }
      return "undefined";
    }
    get HasBrain() {
      return this.xin !== 0 || this.win !== 0;
    }
    ResumeAi(t) {
      this.xin === 2
        ? this.Entity.GetComponent(62).Resume(t)
        : this.xin === 1 && this.Entity.GetComponent(38).EnableAi(t),
        (this.Bin = !1);
    }
    PauseAi(t) {
      this.xin === 2
        ? this.Entity.GetComponent(62).Pause(t)
        : this.xin === 1 && this.Entity.GetComponent(38).DisableAi(t),
        (this.Bin = !0);
    }
    OnNpcInPlot(t) {
      t ? this.PauseAi("OnNpcInPlot") : this.ResumeAi("OnNpcInPlot"),
        (this.Pin = t);
    }
    get IsInPlot() {
      return this.Pin;
    }
  });
(NpcPerformComponent = NpcPerformComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(168)],
    NpcPerformComponent,
  )),
  (exports.NpcPerformComponent = NpcPerformComponent);
// # sourceMappingURL=NpcPerformComponent.js.map
