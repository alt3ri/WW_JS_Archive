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
  LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
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
  NpcPerformRideVehicleState_1 = require("../StateMachine/NpcPerformRideVehicleState"),
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
        (this.StateMachine = void 0),
        (this.IdleState = void 0),
        (this.InteractState = void 0),
        (this.UnderAttackState = void 0),
        (this.MonsterNearbyState = void 0),
        (this.RideVehicleState = void 0),
        (this.DestroyState = void 0),
        (this.SystemUiState = void 0),
        (this.TurnActionController = void 0),
        (this.Ztn = -1),
        (this.vir = Vector_1.Vector.Create()),
        (this.QBr = Vector_1.Vector.Create()),
        (this.ein = Vector_1.Vector.Create()),
        (this.$Br = !1),
        (this.oin = !1),
        (this.NeedLookAtCamera = !1),
        (this.IsBaseRoleNpc = !1),
        (this.MaterialController = void 0),
        (this.PerformGroupController = void 0),
        (this.ExpressionController = void 0),
        (this.AnyIdleLoopMontagePlaying = !1),
        (this.ATl = !1),
        (this.xTl = !1),
        (this.PTl = !1),
        (this.wTl = !1),
        (this.zLn = void 0),
        (this.rzr = void 0),
        (this.zun = 0),
        (this.BTl = void 0),
        (this.bTl = void 0),
        (this.rin = (t, i, e) => {
          this.IsInPlot ||
            this.IsBeingAttacked ||
            this.IsBeingImpacted ||
            1 !== this.StateMachine.CurrentState ||
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
              29,
              "NPC切换状态",
              ["ConfigId", this.Mne],
              ["旧状态", CommonNpcPerformComponent_1.GetStateName(t)],
              ["新状态", CommonNpcPerformComponent_1.GetStateName(i)],
            );
        }),
        (this._in = 0),
        (this.uin = 0),
        (this.cin = !1),
        (this.OnNpcInAiControl = () => {
          2 === this._in
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("NPC", 29, "关卡Ai控制中，与行为树不兼容", [
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
                Log_1.Log.Error("NPC", 29, "行为树控制中，与关卡Ai不兼容", [
                  "ConfigID",
                  this.Entity.GetComponent(0).GetPbDataId(),
                ]),
              !1)
            : this.IsInPlot || this.cin
              ? !(this.uin = 2)
              : ((this._in = 2), !0)),
        (this.OnStartMoveWithSpline = (t, i, e) => {
          (this.ATl = !0), (this.bTl = e);
          var s = {
            DebugMode: !1,
            ReturnFalseWhenNavigationFailed: !1,
            UseNearestPoint: !0,
            IsFollowStrictly: t.IsFollowStrictly,
            StartPointIndex: t.StartPointIndex,
            EndPointIndex: t.EndPointIndex,
            OnArrivePointHandle: void 0,
            OnPatrolEndHandle: (t) => {
              1 === t ? e && e(!0) : e && e(!1), (this.ATl = !1);
            },
          };
          this.zLn?.StartPatrol(t.SplineEntityId, s),
            (this.zun = t.SplineEntityId),
            (this.BTl = t),
            this.qTl(t);
        }),
        (this.GTl = (t) => {
          t !== this.xTl &&
            (t
              ? (this.zLn?.PausePatrol(this.zun, "perform"),
                (this.xTl = !0),
                (this.wTl = !0),
                (t = this.BTl?.NpcFollow?.PerformerWhenExit?.Actions),
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                  t,
                  LevelGeneralContextDefine_1.EntityContext.Create(
                    this.ActorComp.Entity.Id,
                  ),
                  (t) => {
                    1 === t
                      ? ((this.wTl = !1), this.GTl(this.PTl))
                      : ((this.ATl = !1), this.bTl && this.bTl(!1));
                  },
                ))
              : ((this.wTl = !0),
                (t = this.BTl?.NpcFollow?.PerformerWhenEnter?.Actions),
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                  t,
                  LevelGeneralContextDefine_1.EntityContext.Create(
                    this.ActorComp.Entity.Id,
                  ),
                  (t) => {
                    1 === t
                      ? (this.zLn?.ResumePatrol(this.zun, "perform"),
                        (this.xTl = !1),
                        (this.wTl = !1),
                        this.GTl(this.PTl))
                      : ((this.ATl = !1), this.bTl && this.bTl(!1));
                  },
                )));
        });
    }
    GetCurrentState() {
      return this.StateMachine?.CurrentState;
    }
    OnInitData() {
      var t = this.Entity.GetComponent(0).GetPbEntityInitData();
      if (!t?.ComponentsData) return !(this.oin = !1);
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "NpcPerformComponent",
      );
      if (!t) return !(this.oin = !1);
      (this.oin = !0),
        (this.IsBaseRoleNpc =
          t.SpecialNpcPerformConfig?.Type ===
          IComponent_1.ESpecialNpcType.BaseRoleNpc);
      var i = this.Entity.GetComponent(0),
        i =
          ((this.Mne = i.GetPbDataId()),
          (this.Y8e = this.Entity.GetComponent(116)),
          (this.Lie = this.Entity.GetComponent(194)),
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            i.GetCreatureDataId(),
          ));
      return (
        (this.StateMachine = new StateMachine_1.StateMachine(i, this.Pz)),
        this.StateMachine.AddState(
          1,
          NpcPerformIdleState_1.NpcPerformIdleState,
          t,
        ),
        this.StateMachine.AddState(
          2,
          NpcPerformInteractState_1.NpcPerformInteractState,
          t,
        ),
        this.StateMachine.AddState(
          3,
          NpcPerformUnderAttackState_1.NpcPerformUnderAttackState,
          t,
        ),
        this.StateMachine.AddState(
          4,
          NpcPerformImpactedState_1.NpcPerformImpactedState,
        ),
        this.StateMachine.AddState(
          5,
          NpcPerformSystemUiState_1.NpcPerformSystemUiState,
          t,
        ),
        this.StateMachine.AddState(
          6,
          NpcPerformAlertState_1.NpcPerformAlertState,
        ),
        this.StateMachine.AddState(
          7,
          NpcPerformMonsterNearbyState_1.NpcPerformMonsterNearbyState,
          t,
        ),
        this.StateMachine.AddState(
          8,
          NpcPerformRideVehicleState_1.NpcPerformRideVehicleState,
          t,
        ),
        this.StateMachine.AddState(
          9,
          NpcPerformDestroyState_1.NpcPerformDestroyState,
          t,
        ),
        (this.IdleState = this.StateMachine.GetState(1)),
        (this.InteractState = this.StateMachine.GetState(2)),
        (this.UnderAttackState = this.StateMachine.GetState(3)),
        (this.MonsterNearbyState = this.StateMachine.GetState(7)),
        (this.SystemUiState = this.StateMachine.GetState(5)),
        (this.RideVehicleState = this.StateMachine.GetState(8)),
        (this.DestroyState = this.StateMachine.GetState(9)),
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
          (this.jBr = this.Entity.GetComponent(117)),
          this.jBr && this.jBr.SetSightRange(DEFAULT_SIGHT_RANGE),
          this.Ore(),
          (this.zLn = this.Entity.GetComponent(47)),
          (this.rzr = this.Entity.GetComponent(119))),
        !0
      );
    }
    OnActivate() {
      (this.TurnActionController =
        new PawnTurnActionController_1.PawnTurnActionController(this.Entity)),
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
        this.oin && (this.Cin(), this.StateMachine.Start(1), this.gin());
    }
    OnEnd() {
      return (
        this.TurnActionController?.Dispose(),
        this.MaterialController?.Dispose(),
        this.ExpressionController?.Dispose(),
        super.OnEnd(),
        this.oin && (this.fin(), this.kre()),
        !0
      );
    }
    OnClear() {
      return (
        (this.TurnActionController = void 0),
        this.oin && (this.StateMachine.Destroy(), this.pin()),
        !0
      );
    }
    pin() {
      (this.StateMachine = void 0),
        (this.IdleState = void 0),
        (this.InteractState = void 0),
        (this.UnderAttackState = void 0),
        (this.MonsterNearbyState = void 0),
        (this.SystemUiState = void 0),
        (this.RideVehicleState = void 0),
        (this.DestroyState = void 0);
    }
    Ore() {
      this.$Br ||
        (EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnRunBehaviorTree,
          this.OnNpcInAiControl,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.StartMoveWithSpline,
          this.OnStartMoveWithSpline,
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
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.StartMoveWithSpline,
          this.OnStartMoveWithSpline,
        ),
        (this.$Br = !1));
    }
    Cin() {
      (this.IdleState.NpcMoveComp = this.Entity.GetComponent(44)),
        this.UnderAttackState.SetDefaultDirect(
          this.ActorComp.ActorForwardProxy,
        );
    }
    OnMonsterNearby() {
      return (
        7 === this.StateMachine.CurrentState ||
        (!this.IsInPlot &&
          1 === this.StateMachine.CurrentState &&
          this.IdleState.OnMonsterNearby())
      );
    }
    gin() {
      if (this.Lo?.NpcMonsterClosePerform) {
        const i = new MonsterNearbySensory_1.MonsterNearbySensory();
        i.Init(this.Lo.NpcMonsterClosePerform.Range),
          (i.OnEnterSensoryRange = (t) => this.OnMonsterNearby()),
          (i.OnExitSensoryRange = (t) =>
            !(!i.CheckInRange() && 7 === this.StateMachine.CurrentState) ||
            this.StateMachine.Switch(1)),
          (this.Ztn = this.Entity.GetComponent(118).AddSensoryInfo(i));
      }
    }
    fin() {
      0 <= this.Ztn &&
        (this.Entity.GetComponent(118).RemoveSensoryInfo(this.Ztn),
        (this.Ztn = -1));
    }
    OnPlayerAttack() {
      this.IsInPlot ||
        1 !== this.StateMachine.CurrentState ||
        this.IdleState.OnPlayerAttack();
    }
    OnPlayerAttackBegin() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          42,
          "NPC进入受到攻击ABP动画状态 [OnPlayerAttackBegin]",
          ["ConfigId", this.Mne],
        ),
        (this.IsBeingAttacked = !1);
    }
    OnPlayerAttackEnd() {
      this.vin(!1),
        3 !== this.StateMachine.CurrentState
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              42,
              "NPC退出Attack状态失败 [OnPlayerAttackEnd]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.StateMachine.CurrentState],
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "NPC",
                42,
                "NPC退出受到攻击ABP动画状态 [OnPlayerAttackEnd]",
                ["ConfigId", this.Mne],
              ),
            this.StateMachine.Switch(1));
    }
    OnPlayerImpact() {
      this.IsInPlot ||
        1 !== this.StateMachine.CurrentState ||
        this.IdleState.OnPlayerImpact();
    }
    OnPlayerImpactBegin() {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "NPC",
          42,
          "NPC进入受到冲撞ABP动画状态 [OnPlayerImpactBegin]",
          ["ConfigId", this.Mne],
        ),
        (this.IsBeingImpacted = !1);
    }
    OnPlayerImpactEnd() {
      this.vin(!1),
        4 !== this.StateMachine.CurrentState
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              42,
              "NPC退出Impact状态失败 [OnPlayerImpactEnd]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.StateMachine.CurrentState],
            )
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "NPC",
                42,
                "NPC退出受到冲撞ABP动画状态 [OnPlayerImpactEnd]",
                ["ConfigId", this.Mne],
              ),
            this.StateMachine.Switch(1));
    }
    OnEnterVehicle() {
      8 !== this.StateMachine.CurrentState &&
        1 === this.StateMachine.CurrentState &&
        this.StateMachine.Switch(8);
    }
    OnLeaveVehicle() {
      !this.StateMachine?.Owner?.Entity ||
        this.IsPendingDestroy ||
        (8 !== this.StateMachine.CurrentState
          ? Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "NPC",
              50,
              "NPC退出RideVehicle状态失败 [OnLeaveVehicle]",
              ["ConfigId", this.Mne],
              ["CurrentState", this.StateMachine.CurrentState],
            )
          : this.StateMachine.Switch(1));
    }
    OnPlayerInteractStart(t, i, e, s = void 0) {
      return !(
        !this.TurnActionController ||
        this.IsInPlot ||
        (this.StateMachine
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "NPC",
                50,
                "[NpcPerformComp.OnPlayerInteractStart] 开始执行交互转身",
                ["PbDataID", this.ActorComp?.CreatureData.GetPbDataId()],
              ),
            (this.TurnActionController.NeedTurn = t),
            (this.TurnActionController.WaitTurnEnd = i),
            (this.TurnActionController.OnTurnToInteractTargetEndHandle = e),
            s
              ? this.TurnActionController.PlayerOffset.DeepCopy(s)
              : this.TurnActionController.PlayerOffset.DeepCopy(
                  Vector_1.Vector.ZeroVectorProxy,
                ),
            (8 === this.StateMachine.CurrentState
              ? this.RideVehicleState
              : (1 !== this.StateMachine.CurrentState &&
                  this.StateMachine.Switch(1),
                this.IdleState)
            ).OnPlayerInteractTurnActionStart(),
            0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "NPC",
                50,
                "没有勾选NpcPerformComp, 无法交互转身",
                ["PbDataId", this.Mne],
              ),
            1))
      );
    }
    OnPlayerInteractEnd() {
      var t;
      this.TurnActionController &&
        !this.IsInPlot &&
        (t = this.StateMachine?.CurrentState) &&
        this.StateMachine.GetState(t).OnPlayerInteractTurnActionEnd();
    }
    OnTick(t) {
      this.AnimComp &&
        (this.PerformGroupController?.Tick(t), this.oin) &&
        (this.StateMachine.Update(t),
        this.NeedLookAtCamera || 5 === this.StateMachine.CurrentState
          ? (this.ein.DeepCopy(
              CameraController_1.CameraController.WidgetCamera.DisplayComponent.CineCamera.D_K2_GetActorLocation(),
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
            29,
            "开启系统UI失败，剧情中开启系统UI",
            ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()],
            ["已开启系统UI", t],
            ["正在开启系统UI", this.SystemUiState.SystemUiViewName],
          );
      else if (5 === this.StateMachine.CurrentState)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "NPC",
            29,
            "开启系统UI失败，系统UI已开启",
            ["ConfigID", this.Entity.GetComponent(0).GetPbDataId()],
            ["已开启系统UI", t],
            ["正在开启系统UI", this.SystemUiState.SystemUiViewName],
          );
      else {
        (this.SystemUiState.SystemUiViewName = t),
          (this.SystemUiState.BoardId = i),
          this.StateMachine.Switch(5);
        var e = this.Entity.GetComponent(0);
        if (e?.Valid) {
          e = e.GetBaseInfo().ChildEntityIds;
          if (e && !(e.length < 1)) {
            var s = ModelManager_1.ModelManager.CreatureModel;
            for (const h of e) {
              var r = s.GetEntityByPbDataId(h);
              r?.Valid &&
                (r = r.Entity.GetComponent(185))?.Valid &&
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
      var t = Global_1.Global.BaseCharacter.D_GetVelocity().Size2D();
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
          203,
        );
      return (
        !!t &&
        (t.HasTag(1408042260) || t.HasTag(64219164) || t.HasTag(1733479717))
      );
    }
    Ein() {
      var t = Global_1.Global.BaseCharacter.D_GetVelocity(),
        i = this.ActorComp.Actor.D_GetVelocity(),
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
            42,
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
          return "乘坐载具";
        case 9:
          return "销毁";
      }
      return "undefined";
    }
    get HasBrain() {
      return 0 !== this._in || 0 !== this.uin;
    }
    ResumeAi(t) {
      2 === this._in
        ? this.Entity.GetComponent(72).Resume(t)
        : 1 === this._in && this.Entity.GetComponent(46).EnableAi(t),
        (this.cin = !1);
    }
    PauseAi(t) {
      2 === this._in
        ? this.Entity.GetComponent(72).Pause(t)
        : 1 === this._in && this.Entity.GetComponent(46).DisableAi(t),
        (this.cin = !0);
    }
    OnNpcInPlot(t) {
      super.OnNpcInPlot(t),
        t ? this.PauseAi("OnNpcInPlot") : this.ResumeAi("OnNpcInPlot");
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
        this.MaterialController.ApplyMaterialEffect(t);
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
      this.StateMachine
        ? ((this.IsPendingDestroy = !0), this.StateMachine.Switch(9))
        : ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
            this.Entity,
          );
    }
    qTl(t) {
      this.rzr.CreatePerceptionEvent(
        t.NpcFollow.PerformerWhenEnter.Range,
        this.Entity?.GameBudgetManagedToken,
        () => {
          this.ATl && ((this.PTl = !1), this.wTl || this.GTl(this.PTl));
        },
        () => {
          this.ATl && ((this.PTl = !0), this.wTl || this.GTl(this.PTl));
        },
        void 0,
        void 0,
        t.NpcFollow.PerformerWhenExit.Range,
      );
    }
  });
(CommonNpcPerformComponent = CommonNpcPerformComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(185)],
    CommonNpcPerformComponent,
  )),
  (exports.CommonNpcPerformComponent = CommonNpcPerformComponent);
//# sourceMappingURL=CommonNpcPerformComponent.js.map
