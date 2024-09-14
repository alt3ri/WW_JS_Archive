"use strict";
var CommonNpcPerformComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var r,
        h = arguments.length,
        o =
          h < 3
            ? i
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(i, e))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var n = t.length - 1; 0 <= n; n--)
          (r = t[n]) &&
            (o = (h < 3 ? r(o) : 3 < h ? r(i, e, o) : r(i, e)) || o);
      return 3 < h && o && Object.defineProperty(i, e, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonNpcPerformComponent = exports.DITHER_RATE_PER_SECOND = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StateMachine_1 = require("../../../../../Core/Utils/StateMachine/StateMachine"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PawnTurnActionController_1 = require("../../../Pawn/Controllers/PawnTurnActionController"),
  MonsterNearbySensory_1 = require("../../../Pawn/SensoryInfo/MonsterNearbySensory"),
  NpcFacialExpressionController_1 = require("../Logics/NpcFacialExpressionController"),
  NpcPerformAlertState_1 = require("../StateMachine/NpcPerformAlertState"),
  NpcPerformDestroyState_1 = require("../StateMachine/NpcPerformDestroyState"),
  NpcPerformIdleState_1 = require("../StateMachine/NpcPerformIdleState"),
  NpcPerformImpactedState_1 = require("../StateMachine/NpcPerformImpactedState"),
  NpcPerformInteractState_1 = require("../StateMachine/NpcPerformInteractState"),
  NpcPerformMonsterNearbyState_1 = require("../StateMachine/NpcPerformMonsterNearbyState"),
  NpcPerformSystemUiState_1 = require("../StateMachine/NpcPerformSystemUiState"),
  NpcPerformUnderAttackState_1 = require("../StateMachine/NpcPerformUnderAttackState"),
  NpcMaterialController_1 = require("./NpcMaterialController"),
  NpcPerformComponent_1 = require("./NpcPerformComponent"),
  NpcPerformGroupController_1 = require("./NpcPerformGroupController"),
  MIN_IMPACT_STRENGTH = 500,
  DEFAULT_SIGHT_RANGE = 300,
  SIGHT_OPEN_DEGREE = 80;
exports.DITHER_RATE_PER_SECOND = 0.33;
let CommonNpcPerformComponent =
  (CommonNpcPerformComponent_1 = class CommonNpcPerformComponent extends (
    NpcPerformComponent_1.NpcPerformComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Mne = 0),
        (this.Lo = void 0),
        (this.KBr = !1),
        (this.jBr = void 0),
        (this.Y8e = void 0),
        (this.Lie = void 0),
        (this.Lle = void 0),
        (this.Xtn = void 0),
        (this.$tn = void 0),
        (this.Ytn = void 0),
        (this.Jtn = void 0),
        (this.cra = void 0),
        (this.ztn = void 0),
        (this.htr = void 0),
        (this.Ztn = -1),
        (this.vir = Vector_1.Vector.Create()),
        (this.QBr = Vector_1.Vector.Create()),
        (this.ein = Vector_1.Vector.Create()),
        (this.$Br = !1),
        (this.oin = !1),
        (this.NeedLookAtCamera = !1),
        (this.MaterialController = void 0),
        (this.PerformGroupController = void 0),
        (this.ExpressionController = void 0),
        (this.AnyIdleLoopMontagePlaying = !1),
        (this.rin = (t, i, e) => {
          this.IsInPlot ||
            this.IsBeingAttacked ||
            this.IsBeingImpacted ||
            1 !== this.Lle.CurrentState ||
            (Global_1.Global.BaseCharacter === i &&
              (this.nin() &&
              1 !== this.ActorComp?.CreatureData.GetSubEntityType()
                ? this.Lo.NpcHitShow && this.ain()
                : this.Lo.IsShowStrike && this.hin()));
        }),
        (this.Pz = (t, i) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "NPC",
              30,
              "NPC切换状态",
              ["ConfigId", this.Mne],
              ["旧状态", CommonNpcPerformComponent_1.GetStateName(t)],
              ["新状态", CommonNpcPerformComponent_1.GetStateName(i)],
            );
        }),
        (this.lin = !1),
        (this._in = 0),
        (this.uin = 0),
        (this.cin = !1),
        (this.OnNpcInAiControl = () => {
          2 === this._in
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("NPC", 30, "关卡Ai控制中，与行为树不兼容", [
                "ConfigID",
                this.Entity.GetComponent(0).GetPbDataId(),
              ])
            : this.IsInPlot
              ? (this.uin = 1)
              : (this._in = 1);
        }),
        (this.InLevelAiControl = () =>
          1 === this._in
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error("NPC", 30, "行为树控制中，与关卡Ai不兼容", [
                  "ConfigID",
                  this.Entity.GetComponent(0).GetPbDataId(),
                ]),
              !1)
            : this.IsInPlot || this.cin
              ? !(this.uin = 2)
              : ((this._in = 2), !0));
    }
    GetCurrentState() {
      return this.Lle?.CurrentState;
    }
    OnInitData() {
      var t = this.Entity.GetComponent(0).GetPbEntityInitData();
      if (!t?.ComponentsData) return !(this.oin = !1);
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "NpcPerformComponent",
      );
      if (!t) return !(this.oin = !1);
      this.oin = !0;
      var i = this.Entity.GetComponent(0),
        i =
          ((this.Mne = i.GetPbDataId()),
          (this.Y8e = this.Entity.GetComponent(106)),
          (this.Lie = this.Entity.GetComponent(181)),
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
        this.Lle.AddState(
          8,
          NpcPerformDestroyState_1.NpcPerformDestroyState,
          t,
        ),
        (this.Xtn = this.Lle.GetState(1)),
        (this.$tn = this.Lle.GetState(2)),
        (this.Ytn = this.Lle.GetState(3)),
        (this.Jtn = this.Lle.GetState(7)),
        (this.ztn = this.Lle.GetState(5)),
        (this.cra = this.Lle.GetState(8)),
        (this.Lo = t),
        !0
      );
    }
    OnStart() {
      var t;
      return (
        super.OnStart(),
        this.vir.DeepCopy(this.ActorComp.ActorForwardProxy),
        this.oin &&
          (this.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
            (((t = this.Owner).CanPlayerImpact = this.Lo.IsShowStrike),
            (t.CanLookAtPlayer = this.Lo.IsStare),
            (this.KBr = t.CanLookAtPlayer),
            this.Lo.NpcHitShow
              ? (t.CanPlayerAttack = !0)
              : (t.CanPlayerAttack = !1),
            this.oin) &&
            (this.Lo.IsShowStrike || this.Lo.NpcHitShow) &&
            t.HitCollision.OnComponentBeginOverlap.Add(this.rin),
          (this.jBr = this.Entity.GetComponent(107)),
          this.jBr && this.jBr.SetSightRange(DEFAULT_SIGHT_RANGE),
          this.Ore()),
        !0
      );
    }
    OnActivate() {
      (this.htr = new PawnTurnActionController_1.PawnTurnActionController(
        this.Entity,
      )),
        (this.MaterialController =
          new NpcMaterialController_1.NpcMaterialController(this.Entity)),
        this.HandleBornPerform(),
        super.OnActivate(),
        (this.PerformGroupController =
          new NpcPerformGroupController_1.PerformGroupController()),
        this.PerformGroupController.Init(this.Entity),
        (this.ExpressionController =
          new NpcFacialExpressionController_1.NpcFacialExpressionController(
            this.Entity.Id,
          )),
        this.oin && (this.Cin(), this.Lle.Start(1), this.gin());
    }
    OnEnd() {
      return (
        this.htr?.Dispose(),
        this.MaterialController?.Dispose(),
        this.ExpressionController?.Dispose(),
        super.OnEnd(),
        this.oin && (this.fin(), this.kre()),
        !0
      );
    }
    OnClear() {
      return (
        (this.htr = void 0), this.oin && (this.Lle.Destroy(), this.pin()), !0
      );
    }
    pin() {
      (this.Lle = void 0),
        (this.Xtn = void 0),
        (this.$tn = void 0),
        (this.Ytn = void 0),
        (this.Jtn = void 0),
        (this.ztn = void 0),
        (this.cra = void 0);
    }
    Ore() {
      this.$Br ||
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRunBehaviorTree,
          this.OnNpcInAiControl,
        ),
        (this.$Br = !0));
    }
    kre() {
      this.$Br &&
        (EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRunBehaviorTree,
          this.OnNpcInAiControl,
        ),
        (this.$Br = !1));
    }
    Cin() {
      (this.Xtn.NpcMontageController = this.GetMontageController()),
        (this.Xtn.NpcTurnActionController = this.htr),
        (this.Xtn.NpcMoveComp = this.Entity.GetComponent(38)),
        (this.$tn.NpcMontageController = this.GetMontageController()),
        (this.Ytn.NpcMontageController = this.GetMontageController()),
        this.Ytn.SetDefaultDirect(this.ActorComp.ActorForwardProxy),
        (this.Jtn.NpcMontageController = this.GetMontageController()),
        (this.cra.ActorComp = this.ActorComp),
        (this.cra.PerformComp = this);
    }
    OnMonsterNearby() {
      return (
        7 === this.Lle.CurrentState ||
        (!this.IsInPlot &&
          1 === this.Lle.CurrentState &&
          this.Xtn.OnMonsterNearby())
      );
    }
    gin() {
      if (this.Lo?.NpcMonsterClosePerform) {
        const i = new MonsterNearbySensory_1.MonsterNearbySensory();
        i.Init(this.Lo.NpcMonsterClosePerform.Range),
          (i.OnEnterSensoryRange = (t) => this.OnMonsterNearby()),
          (i.OnExitSensoryRange = (t) =>
            !(!i.CheckInRange() && 7 === this.Lle.CurrentState) ||
            this.Lle.Switch(1)),
          (this.Ztn = this.Entity.GetComponent(108).AddSensoryInfo(i));
      }
    }
    fin() {
      0 <= this.Ztn &&
        (this.Entity.GetComponent(108).RemoveSensoryInfo(this.Ztn),
        (this.Ztn = -1));
    }
    OnPlayerAttack() {
      this.IsInPlot || 1 !== this.Lle.CurrentState || this.Xtn.OnPlayerAttack();
    }
    OnPlayerAttackBegin() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          43,
          "NPC进入受到攻击ABP动画状态 [OnPlayerAttackBegin]",
          ["ConfigId", this.Mne],
        ),
        (this.IsBeingAttacked = !1);
    }
    OnPlayerAttackEnd() {
      this.vin(!1),
        3 !== this.Lle.CurrentState
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              43,
              "NPC退出Attack状态失败 [OnPlayerAttackEnd]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.Lle.CurrentState],
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "NPC",
                43,
                "NPC退出受到攻击ABP动画状态 [OnPlayerAttackEnd]",
                ["ConfigId", this.Mne],
              ),
            this.Lle.Switch(1));
    }
    OnPlayerImpact() {
      this.IsInPlot || 1 !== this.Lle.CurrentState || this.Xtn.OnPlayerImpact();
    }
    OnPlayerImpactBegin() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          43,
          "NPC进入受到冲撞ABP动画状态 [OnPlayerImpactBegin]",
          ["ConfigId", this.Mne],
        ),
        (this.IsBeingImpacted = !1);
    }
    OnPlayerImpactEnd() {
      this.vin(!1),
        4 !== this.Lle.CurrentState
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              43,
              "NPC退出Impact状态失败 [OnPlayerImpactEnd]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.Lle.CurrentState],
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "NPC",
                43,
                "NPC退出受到冲撞ABP动画状态 [OnPlayerImpactEnd]",
                ["ConfigId", this.Mne],
              ),
            this.Lle.Switch(1));
    }
    OnPlayerInteractStart(t, i, e, s = void 0) {
      return (
        !!this.htr &&
        !this.IsInPlot &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "NPC",
            51,
            "[NpcPerformComp.OnPlayerInteractStart] 开始执行交互转身",
            ["PbDataID", this.ActorComp?.CreatureData.GetPbDataId()],
          ),
        1 !== this.Lle.CurrentState && this.Lle.Switch(1),
        (this.htr.NeedTurn = t),
        (this.htr.WaitTurnEnd = i),
        (this.htr.OnTurnToInteractTargetEndHandle = e),
        s
          ? this.htr.PlayerOffset.DeepCopy(s)
          : this.htr.PlayerOffset.DeepCopy(Vector_1.Vector.ZeroVectorProxy),
        this.Xtn.OnPlayerInteractTurnActionStart(),
        !0)
      );
    }
    OnPlayerInteractEnd() {
      !this.htr ||
        this.IsInPlot ||
        (1 === this.Lle.CurrentState &&
          this.Xtn.OnPlayerInteractTurnActionEnd());
    }
    OnTick(t) {
      this.AnimComp &&
        (this.PerformGroupController?.Tick(t), this.oin) &&
        (this.Lle.Update(t),
        this.NeedLookAtCamera || 5 === this.Lle.CurrentState
          ? (this.ein.DeepCopy(
              CameraController_1.CameraController.WidgetCamera.DisplayComponent.CineCamera.K2_GetActorLocation(),
            ),
            this.SightTarget(this.ein))
          : this.KBr &&
            (this.jBr.IsInSightRange && this.lbr()
              ? this.SightTarget(
                  Global_1.Global.BaseCharacter.CharacterActorComponent,
                )
              : this.SightTarget(void 0)));
    }
    lbr() {
      var t;
      return (
        !!Global_1.Global.BaseCharacter?.IsValid() &&
        ((t = Global_1.Global.BaseCharacter.CharacterActorComponent),
        this.QBr.FromUeVector(t.ActorLocationProxy),
        this.QBr.SubtractionEqual(this.ActorComp.ActorLocationProxy),
        (this.QBr.Z = 0),
        this.QBr.Normalize(),
        MathUtils_1.MathUtils.GetAngleByVectorDot(
          this.QBr,
          this.ActorComp.ActorForwardProxy,
        ) <= SIGHT_OPEN_DEGREE)
      );
    }
    SightTarget(t) {
      this.KBr &&
        ((0, RegisterComponent_1.isComponentInstance)(t, 1)
          ? this.AnimComp.SetSightTargetItem(t)
          : t instanceof Vector_1.Vector
            ? this.AnimComp.SetSightTargetPoint(t)
            : (this.AnimComp.SetSightTargetItem(void 0),
              this.AnimComp.SetSightTargetPoint(void 0)));
    }
    get OpenLookAt() {
      return this.KBr;
    }
    SetLookAtPlayerEnabled(t) {
      !t &&
        this.AnimComp &&
        (this.AnimComp.SetSightTargetItem(void 0),
        this.AnimComp.SetSightTargetPoint(void 0)),
        (this.KBr = t);
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
            ["正在开启系统UI", this.ztn.SystemUiViewName],
          );
      else if (5 === this.Lle.CurrentState)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            30,
            "开启系统UI失败，系统UI已开启",
            ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()],
            ["已开启系统UI", t],
            ["正在开启系统UI", this.ztn.SystemUiViewName],
          );
      else {
        (this.ztn.SystemUiViewName = t),
          (this.ztn.BoardId = i),
          this.Lle.Switch(5);
        var e = this.Entity.GetComponent(0);
        if (e?.Valid) {
          e = e.GetBaseInfo().ChildEntityIds;
          if (e && !(e.length < 1)) {
            var s = ModelManager_1.ModelManager.CreatureModel;
            for (const h of e) {
              var r = s.GetEntityByPbDataId(h);
              r?.Valid &&
                (r = r.Entity.GetComponent(172))?.Valid &&
                r.SetUiOpenPerformance(t, i);
            }
          }
        }
      }
    }
    ain() {
      (this.IsBeingAttacked = !0),
        this.vin(!0),
        this.Y8e?.ForceUpdate(),
        this.OnPlayerAttack();
    }
    hin() {
      var t = Global_1.Global.BaseCharacter.GetVelocity().Size2D();
      t < MIN_IMPACT_STRENGTH ||
        ((this.CollisionStrength = t),
        this.Ein(),
        (this.IsBeingImpacted = !0),
        this.vin(!0),
        this.Y8e?.ForceUpdate(),
        this.OnPlayerImpact());
    }
    vin(t) {
      this.Lie &&
        (t && !this.Lie.HasTag(-2044964178) && this.Lie.AddTag(-2044964178),
        !t) &&
        this.Lie.HasTag(-2044964178) &&
        this.Lie.RemoveTag(-2044964178);
    }
    nin() {
      var t =
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(
          190,
        );
      return (
        !!t &&
        (t.HasTag(1408042260) || t.HasTag(64219164) || t.HasTag(1733479717))
      );
    }
    Ein() {
      var t = Global_1.Global.BaseCharacter.GetVelocity(),
        i = this.ActorComp.Actor.GetVelocity(),
        t = t.op_Subtraction(i),
        i = this.ActorComp.ActorRight,
        i = t.CosineAngle2D(i),
        i = MathCommon_1.MathCommon.RadianToDegree(Math.acos(i)),
        e = this.ActorComp.ActorForward,
        t = t.CosineAngle2D(e),
        e = MathCommon_1.MathCommon.RadianToDegree(Math.acos(t));
      i > MathCommon_1.MathCommon.RightAngle
        ? (this.CollisionDirection = -1 * e)
        : (this.CollisionDirection = e),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
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
        case 8:
          return "销毁";
      }
      return "undefined";
    }
    get HasBrain() {
      return 0 !== this._in || 0 !== this.uin;
    }
    ResumeAi(t) {
      2 === this._in
        ? this.Entity.GetComponent(65).Resume(t)
        : 1 === this._in && this.Entity.GetComponent(40).EnableAi(t),
        (this.cin = !1);
    }
    PauseAi(t) {
      2 === this._in
        ? this.Entity.GetComponent(65).Pause(t)
        : 1 === this._in && this.Entity.GetComponent(40).DisableAi(t),
        (this.cin = !0);
    }
    OnNpcInPlot(t) {
      t ? this.PauseAi("OnNpcInPlot") : this.ResumeAi("OnNpcInPlot"),
        (this.lin = t);
    }
    get IsInPlot() {
      return this.lin;
    }
    HandleBornPerform() {
      this.HandleBornMaterial(), this.HandleBornEffect();
    }
    HandleBornMaterial() {
      var t;
      this.ActorComp?.Actor?.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
        (t = this.ActorComp.Owner)?.BornEffect &&
        "" !== (t = t.BornEffect.AssetPathName.toString()) &&
        "None" !== t &&
        this.MaterialController.ApplySimpleMaterialEffect(t);
    }
    HandleBornEffect() {
      this.HandleCommonNpcBornEffect();
    }
    HandleCommonNpcBornEffect() {
      var t = this.Entity.GetComponent(0)?.GetPbEntityInitData();
      t &&
        (t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "EntityVisibleComponent",
        )) &&
        t.UseHolographicEffect &&
        this.MaterialController.LoadAndSetHolographicEffect();
    }
    HandlePendingDestroy() {
      this.Lle
        ? ((this.IsPendingDestroy = !0), this.Lle.Switch(8))
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DelayRemoveEntityFinished,
            this.Entity,
          );
    }
  });
(CommonNpcPerformComponent = CommonNpcPerformComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(172)],
    CommonNpcPerformComponent,
  )),
  (exports.CommonNpcPerformComponent = CommonNpcPerformComponent);
//# sourceMappingURL=CommonNpcPerformComponent.js.map
