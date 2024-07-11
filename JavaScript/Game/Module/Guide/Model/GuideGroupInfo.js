"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuideGroupInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StateBase_1 = require("../../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../../Core/Utils/StateMachine/StateMachine");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideConfig_1 = require("../GuideConfig");
const GuideController_1 = require("../GuideController");
const GuideStepInfo_1 = require("./GuideStepInfo");
const stateDesc = ["Init", "Opening", "Executing", "Pending", "Finishing"];
class InitState extends StateBase_1.StateBase {
  OnStart() {
    this.Owner.StepInfoList.length = 0;
    for (const e of ConfigManager_1.ConfigManager.GuideConfig.GetOrderedStepIdsOfGroup(
      this.Owner.Id,
      ModelManager_1.ModelManager.PlatformModel.InputController,
    ))
      this.Owner.StepInfoList.push(
        new GuideStepInfo_1.GuideStepInfo(e, this.Owner),
      );
    (this.Owner.CurrentStepIndex = -1), (this.Owner.IsFake = !1);
  }
  OnEnter() {
    (this.Owner.CurrentStepIndex = -1), (this.Owner.IsFake = !1);
  }
}
class OpeningState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.PYt = !1);
  }
  OnEnter() {
    let e;
    this.PYt ||
      ((this.PYt = !0),
      (e = this.Owner.GetIfPreExecute()) && this.Owner.SwitchState(2),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GuideGroupOpening,
        this.Owner.Id,
        e,
      ));
  }
  OnExit() {
    this.PYt = !1;
  }
}
class ExecutingState extends StateBase_1.StateBase {
  OnEnter() {
    this.Owner.PumpStep();
  }
}
class PendingState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments), (this.xYt = void 0);
  }
  jm() {
    void 0 !== this.xYt &&
      (TimerSystem_1.TimerSystem.Remove(this.xYt), (this.xYt = void 0));
  }
  OnEnter() {
    this.jm(),
      (this.xYt = TimerSystem_1.TimerSystem.Forever(() => {
        this.Owner.CanEnterExecuting() &&
          (this.jm(), this.Owner.StateMachine.Switch(2));
      }, 1e3));
  }
  OnExit() {
    this.jm();
  }
}
class FinishingState extends StateBase_1.StateBase {
  OnEnter() {
    GuideController_1.GuideController.FinishGuide(this.Owner.Id);
  }
}
class GuideGroupInfo {
  constructor(e) {
    (this.Id = 0),
      (this.StateMachine = void 0),
      (this.StepInfoList = []),
      (this.IsFake = !1),
      (this.CurrentStepIndex = -1),
      (this.Id = e),
      (this.StateMachine = new StateMachine_1.StateMachine(this)),
      this.StateMachine.AddState(0, InitState),
      this.StateMachine.AddState(1, OpeningState),
      this.StateMachine.AddState(2, ExecutingState),
      this.StateMachine.AddState(3, PendingState),
      this.StateMachine.AddState(4, FinishingState),
      this.StateMachine.Start(0);
  }
  get CurrentGuideStep() {
    if (!(this.CurrentStepIndex >= this.StepInfoList.length))
      return this.StepInfoList[this.CurrentStepIndex];
  }
  GetIfPreExecute() {
    return (
      this.StepInfoList.length !== 0 &&
      this.StepInfoList[0].Config.TimeScale !== 1
    );
  }
  SwitchState(e) {
    let t = e;
    e === 1 && this.StateMachine.CurrentState !== 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Guide", 17, "引导组正在执行中, 不再重复执行")
      : (e !== 2 ||
          this.CanEnterExecuting() ||
          (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Guide", 17, "引导组暂时无法执行, 挂起"),
          (t = 3)),
        e === 4 &&
          (this.IsFake
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Guide",
                  17,
                  "引导组是通过GM调用的, 跳过服务端完成步骤",
                ),
              (t = 0))
            : ModelManager_1.ModelManager.GuideModel.IsGroupFinished(this.Id) &&
              !ModelManager_1.ModelManager.GuideModel.IsGroupCanRepeat(
                this.Id,
              ) &&
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Guide",
                  17,
                  "引导组未配置为可重复完成但重复请求完成, 跳过服务端完成步骤",
                ),
              (t = 0))),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Guide",
            17,
            "[引导状态切换:引导组]",
            ["组Id", this.Id],
            ["当前状态", stateDesc[this.StateMachine.CurrentState]],
            ["切换到的状态", stateDesc[t]],
          ),
        this.StateMachine.Switch(t));
  }
  PumpStep() {
    let e;
    this.StepInfoList.length === 0
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Guide",
            17,
            "引导组未配置当前平台的步骤, 执行失败, 中断当前引导组",
            ["组Id", this.Id],
          ),
        this.Break())
      : (this.wYt(),
        (e = this.CurrentStepIndex + 1) >= this.StepInfoList.length
          ? this.SwitchState(4)
          : ((this.CurrentStepIndex = e),
            (e = this.StepInfoList[e]),
            GuideConfig_1.GuideConfig.GmMuteTutorial &&
            e.Config.ContentType === 3
              ? e.SwitchState(4)
              : (e.SwitchState(0), e.TryEnterExecuting())));
  }
  wYt() {
    const e = this.CurrentStepIndex;
    e >= 0 &&
      e < this.StepInfoList.length &&
      this.StepInfoList[e].SwitchState(5);
  }
  Reset() {
    this.wYt(),
      (this.CurrentStepIndex = -1),
      this.SwitchState(0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GuideGroupRest,
        this.Id,
      );
  }
  HasAnyFinishedStep(t) {
    for (let e = 0; e < this.CurrentStepIndex; ++e) {
      const i = this.StepInfoList[e].Id;
      if (t.has(i)) return !0;
    }
    return !1;
  }
  Break() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Guide", 17, "引导组中断", ["组Id", this.Id]),
      this.StateMachine.CurrentState === 0
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Guide", 17, "引导组已被外部终止, 中断时不做处理", [
            "组Id",
            this.Id,
          ])
        : ModelManager_1.ModelManager.GuideModel.IsGroupCanRepeat(this.Id)
          ? (this.SwitchState(0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.GuideGroupBreak,
              this.Id,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Guide", 17, "引导组中断后状态切换为未完成", [
                "组Id",
                this.Id,
              ]))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Guide",
                17,
                "引导组中断时, 配置为不可重复触发, 引导组算作完成",
                ["组Id", this.Id],
              ),
            this.SwitchState(4));
  }
  CanEnterExecuting() {
    return (
      (!ModelManager_1.ModelManager.LoadingModel.IsLoading &&
        !UiManager_1.UiManager.IsViewShow("LoadingView")) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Guide", 17, "引导组不能打开, 因为loading还没完成", [
          "组Id",
          this.Id,
        ]),
      !1)
    );
  }
}
exports.GuideGroupInfo = GuideGroupInfo;
// # sourceMappingURL=GuideGroupInfo.js.map
