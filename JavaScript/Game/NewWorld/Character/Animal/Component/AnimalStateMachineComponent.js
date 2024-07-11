"use strict";
var AnimalStateMachineComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, r, a) {
      var i,
        n = arguments.length,
        s =
          n < 3
            ? e
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(e, r))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, r, a);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (i = t[o]) &&
            (s = (n < 3 ? i(s) : 3 < n ? i(e, r, s) : i(e, r)) || s);
      return 3 < n && s && Object.defineProperty(e, r, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalStateMachineComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  StateMachine_1 = require("../../../../../Core/Utils/StateMachine/StateMachine"),
  CharacterNameDefines_1 = require("../../Common/CharacterNameDefines"),
  AnimalPerformAlertState_1 = require("../StateMachine/AnimalPerformAlertState"),
  AnimalPerformBornState_1 = require("../StateMachine/AnimalPerformBornState"),
  AnimalPerformIdleState_1 = require("../StateMachine/AnimalPerformIdleState"),
  AnimalPerformInteractState_1 = require("../StateMachine/AnimalPerformInteractState"),
  AnimalPerformStandState_1 = require("../StateMachine/AnimalPerformStandState"),
  AnimalPerformSystemUiState_1 = require("../StateMachine/AnimalPerformSystemUiState"),
  AnimalPerformTakeOffState_1 = require("../StateMachine/AnimalPerformTakeOffState"),
  AnimalPerformUnderAttackState_1 = require("../StateMachine/AnimalPerformUnderAttackState"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let AnimalStateMachineComponent =
  (AnimalStateMachineComponent_1 = class AnimalStateMachineComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Mne = 0),
        (this.oRe = void 0),
        (this.bbr = void 0),
        (this.Lle = void 0),
        (this.qbr = 0),
        (this.aGe = !1),
        (this.Pz = (t, e) => {});
    }
    OnInitData() {
      return (
        (this.Lle = new StateMachine_1.StateMachine(this.Entity, this.Pz)), !0
      );
    }
    OnStart() {
      var t = this.Entity.GetComponent(0),
        t =
          ((this.Mne = t.GetPbDataId()),
          (this.oRe = this.Entity.GetComponent(160)),
          this.oRe?.MainAnimInstance);
      return (
        t &&
        UE.KuroStaticLibrary.IsImplementInterface(
          t.GetClass(),
          UE.BPI_AnimalEcological_C.StaticClass(),
        )
          ? ((this.bbr = t),
            UE.KuroStaticLibrary.IsObjectClassByName(
              t,
              CharacterNameDefines_1.CharacterNameDefines.ABP_BASEANIMAL,
            )
              ? (this.Lle.AddState(
                  0,
                  AnimalPerformBornState_1.AnimalPerformBornState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  1,
                  AnimalPerformStandState_1.AnimalPerformStandState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  2,
                  AnimalPerformIdleState_1.AnimalPerformIdleState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  3,
                  AnimalPerformInteractState_1.AnimalPerformInteractState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  4,
                  AnimalPerformUnderAttackState_1.AnimalPerformUnderAttackState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  6,
                  AnimalPerformAlertState_1.AnimalPerformAlertState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  5,
                  AnimalPerformTakeOffState_1.AnimalPerformTakeOffState,
                  this.bbr,
                ),
                this.Lle.AddState(
                  7,
                  AnimalPerformSystemUiState_1.AnimalPerformSystemUiState,
                  this.bbr,
                ),
                this.StartStateMachine())
              : Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Animal",
                  30,
                  "动画蓝图不符合规范，不是ABP_BaseAnimal的实例，不能开启状态机",
                  ["ConfigID", this.Mne],
                  ["ABP", t?.GetName()],
                ))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Animal",
              30,
              "动画蓝图不符合规范，缺少AnimalEcological接口，不能开启状态机",
              ["ConfigID", this.Mne],
              ["ABP", t?.GetName()],
            ),
        !0
      );
    }
    OnTick(t) {
      this.aGe && this.Lle.Update(t);
    }
    OnEnd() {
      return (this.aGe = !1), this.Lle.Destroy(), !0;
    }
    StartStateMachine() {
      this.Lle.Start(this.qbr), (this.aGe = !0);
    }
    CurrentState() {
      return AnimalStateMachineComponent_1.GetUeState(this.Lle.CurrentState);
    }
    SwitchState(t) {
      this.aGe && this.Lle.Switch(t);
    }
    GetWaitTime() {
      return this.Lle.GetState(this.Lle.CurrentState)?.GetActionTime() ?? 0;
    }
    GetState(t) {
      if (this.aGe) return this.Lle.GetState(t);
    }
    GetCurrentState() {
      if (this.aGe) return this.GetState(this.Lle.CurrentState);
    }
    static GetStateName(t) {
      switch (t) {
        case 0:
        case 1:
          return "None";
        case 2:
          return "空闲";
        case 3:
          return "交互";
        case 6:
          return "警觉";
        case 4:
          return "受击";
        case 5:
          return "起飞";
        case 7:
          return "系统UI";
        default:
          return "None";
      }
    }
    static GetUeState(t) {
      switch (t) {
        case 0:
        case 1:
          return 0;
        case 2:
          return 1;
        case 3:
          return 5;
        case 6:
          return 2;
        case 4:
          return 3;
        case 5:
          return 4;
        case 7:
          return 6;
      }
      return 0;
    }
    static GetTsState(t) {
      switch (t) {
        case 0:
          return 1;
        case 1:
          return 2;
        case 2:
          return 6;
        case 3:
          return 4;
        case 4:
          return 5;
        case 5:
          return 3;
        case 6:
          return 7;
      }
      return 1;
    }
  });
(AnimalStateMachineComponent = AnimalStateMachineComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(14)],
    AnimalStateMachineComponent,
  )),
  (exports.AnimalStateMachineComponent = AnimalStateMachineComponent);
//# sourceMappingURL=AnimalStateMachineComponent.js.map
