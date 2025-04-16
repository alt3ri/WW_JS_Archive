"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalPlayer = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase"),
  StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CiacconaGalUtils_1 = require("./CiacconaGalUtils");
class BaseCiacconaGalPlayerState extends StateBase_1.StateBase {
  OnEnter(a) {
    this.Owner.ClearStatePendingToSwitchByState(this),
      this.Owner.NotifyStateChange(this.State);
  }
  OnClick(a) {}
}
class CiacconaGalPlayerInitializingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      this.Owner.AnimHandler?.Stop(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Initializing");
  }
}
class CiacconaGalPlayerPausingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Pausing");
  }
  OnClick() {
    var a = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(
      this.Owner.CurHandlingStepId,
    );
    a && 1 === a.Type && this.Owner.TryContinue(a.NextStepId);
  }
}
class CiacconaGalPlayerPlayingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Playing");
  }
  OnClick() {
    this.Owner.TrySwitchToState(3);
  }
}
class CiacconaGalPlayerSkippingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Skipping"),
      this.Owner.AnimHandler.Skip();
  }
  OnClick() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在Skipping状态, 禁用点击");
  }
}
class CiacconaGalPlayerProtectingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Protecting");
    a =
      CiacconaGalUtils_1.CiacconaGalUtils.GetAvgCoolDownTime() *
      TimeUtil_1.TimeUtil.InverseMillisecond;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Owner?.TrySwitchToState(1);
    }, a);
  }
  OnClick() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在Protecting状态, 禁用点击");
  }
}
class CiacconaGalPlayerChoiceProtectingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: ChoiceProtecting");
    a =
      CiacconaGalUtils_1.CiacconaGalUtils.GetAvgChoiceProtectingTime() *
      TimeUtil_1.TimeUtil.InverseMillisecond;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Owner?.TrySwitchToState(4);
    }, a);
  }
  OnClick() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "CiacconaGal",
        74,
        "GalPlayer在ChoiceProtecting状态, 禁用点击",
      );
  }
}
class CiacconaGalPlayerChoosingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: Choosing"),
      (ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty =
        !0);
  }
  OnClick(a) {
    if (a) {
      var e = ModelManager_1.ModelManager.CiacconaGalModel.GetChoiceDataById(a);
      if (e) {
        var t = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(
            this.Owner.CurHandlingStepId,
          ),
          i = 0 === e.ToStepId ? t.NextStepId : e.ToStepId,
          n = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id,
          l = this.Owner.CurHandlingChapterId,
          o =
            ModelManager_1.ModelManager.CiacconaGalModel.ActivityData
              .InspirationCount,
          c = e.RequiredInspiration;
        switch (e.State) {
          case 0:
            (t.ChosenId = a), this.Owner.TryContinue(i);
            break;
          case 1:
            c <= o
              ? ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestUnlockChoice(
                  n,
                  l,
                  a,
                )
              : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "InspirationNotEnough",
                );
            break;
          case 2:
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "RequireConditionToUnlock",
            );
            break;
          case 3:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnCiacconaAvgReChoose,
              t,
              e,
            );
        }
      }
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer在Choosing状态, 禁用点击");
  }
}
class CiacconaGalPlayerBeforeSubEndingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: BeforeSubEnding");
    a =
      CiacconaGalUtils_1.CiacconaGalUtils.GetAvgSubEndingDelayTime() *
      TimeUtil_1.TimeUtil.InverseMillisecond;
    TimerSystem_1.TimerSystem.Delay(() => {
      this.Owner?.TrySwitchToState(5);
    }, a);
  }
}
class CiacconaGalPlayerSubEndingState extends BaseCiacconaGalPlayerState {
  OnEnter(a) {
    super.OnEnter(a),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer状态: SubEnding"),
      (ModelManager_1.ModelManager.CiacconaGalModel.IsCurStepDataListDirty =
        !0);
  }
}
class CiacconaGalPlayer {
  constructor() {
    (this.Lle = void 0),
      (this.zqc = []),
      (this.CurHandlingStepId = 0),
      (this.CurHandlingChapterId = 0),
      (this.mbc = 0),
      (this.fbc = void 0),
      (this.gbc = new Map()),
      (this.OnAnimEnd = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer: TextAnim播放结束");
        var a = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(
          this.CurHandlingStepId,
        );
        if (a)
          switch ((this.gbc.set(a.Id, !0), a.Type)) {
            case 2:
              this.TrySwitchToState(8);
              break;
            case 1:
              this.TrySwitchToState(6);
              break;
            case 3:
              this.TrySwitchToState(7);
          }
      }),
      void 0 !== CiacconaGalPlayer.cj
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "CiacconaGal",
            74,
            "CiacconaGalPlayer只允许单例, 请使用CiacconaGalPlayer.Instance",
          )
        : ((this.Lle = new StateMachine_1.StateMachine(this)),
          this.Lle.AddState(0, CiacconaGalPlayerInitializingState),
          this.Lle.AddState(1, CiacconaGalPlayerPausingState),
          this.Lle.AddState(2, CiacconaGalPlayerPlayingState),
          this.Lle.AddState(3, CiacconaGalPlayerSkippingState),
          this.Lle.AddState(4, CiacconaGalPlayerChoosingState),
          this.Lle.AddState(5, CiacconaGalPlayerSubEndingState),
          this.Lle.AddState(6, CiacconaGalPlayerProtectingState),
          this.Lle.AddState(7, CiacconaGalPlayerBeforeSubEndingState),
          this.Lle.AddState(8, CiacconaGalPlayerChoiceProtectingState),
          this.Lle.Start(0));
  }
  get StatePendingToSwitch() {
    return this.mbc;
  }
  get AnimHandler() {
    return this.fbc;
  }
  static get Instance() {
    if (!(0 < CiacconaGalPlayer.Cbc))
      return (
        void 0 === CiacconaGalPlayer.cj &&
          (CiacconaGalPlayer.cj = new CiacconaGalPlayer()),
        (CiacconaGalPlayer.Cbc += 1),
        CiacconaGalPlayer.cj
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "CiacconaGal",
        74,
        "CiacconaGalPlayer只能由CiacconaGalController持有",
      );
  }
  AddOnStateChange(a) {
    this.zqc.push(a);
  }
  RemoveOnStateChange(a) {
    a = this.zqc.indexOf(a);
    0 <= a && this.zqc.splice(a, 1);
  }
  SetAnimHandler(a) {
    this.fbc = a;
  }
  HasPlayedStepAnim(a) {
    return this.gbc.get(a) ?? !1;
  }
  GetCurState() {
    return this.Lle.CurrentState;
  }
  TrySwitchToState(a) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("CiacconaGal", 74, "GalPlayer: 尝试切换状态到" + a),
      (this.mbc = a);
  }
  SwitchState() {
    0 === this.mbc
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("CiacconaGal", 74, "GalPlayer: 无状态切换请求")
      : this.AnimHandler || 2 !== this.mbc
        ? this.Lle.Switch(this.mbc) &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "CiacconaGal",
            74,
            `GalPlayer: 切换状态到${this.mbc}成功`,
          )
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "CiacconaGal",
            74,
            "GalPlayer: 未注册TextAnim组件, 禁止切换至播放态",
            ["目标状态: ", this.mbc],
          );
  }
  ClearStatePendingToSwitchByState(a) {
    a && (this.mbc = 0);
  }
  TryContinue(a) {
    ModelManager_1.ModelManager.CiacconaGalModel.TryPushCurStepDataById(a) &&
      ((this.CurHandlingStepId = a),
      (a = ModelManager_1.ModelManager.CiacconaGalModel.GetStepDataById(a))
        .HasText
        ? this.TrySwitchToState(2)
        : 2 === a.Type
          ? this.TrySwitchToState(8)
          : 3 === a.Type
            ? this.TrySwitchToState(5)
            : this.TrySwitchToState(1));
  }
  OnClick(a) {
    this.Lle.GetState(this.Lle.CurrentState).OnClick(a);
  }
  NotifyStateChange(e) {
    this.zqc.forEach((a) => {
      a(e);
    });
  }
  Reset() {
    (this.CurHandlingStepId = 0),
      (this.CurHandlingChapterId = 0),
      (this.mbc = 0),
      this.Lle.Switch(0),
      this.gbc.clear();
  }
  Release() {
    this.Reset(),
      (this.zqc.length = 0),
      --CiacconaGalPlayer.Cbc,
      (CiacconaGalPlayer.cj = void 0);
  }
}
((exports.CiacconaGalPlayer = CiacconaGalPlayer).cj = void 0),
  (CiacconaGalPlayer.Cbc = 0);
//# sourceMappingURL=CiacoonaGalPlayer.js.map
