"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenTransitionView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  BlackScreenGlobalData_1 = require("./BlackScreenGlobalData"),
  BlackScreenViewData_1 = require("./BlackScreenViewData");
class BlackScreenTransitionView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.R0t = "None"),
      (this.U0t = "None"),
      (this.C0t = new BlackScreenViewData_1.BlackScreenViewData()),
      (this.f0t = (e) => {
        e === this.R0t
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 11, "开始动画结束", [
                "动画名称",
                e,
              ]),
            BlackScreenGlobalData_1.BlackScreenGlobalData.FinishShowPromise())
          : e === this.U0t &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BlackScreen", 11, "关闭动画结束", [
                "动画名称",
                e,
              ]),
            BlackScreenGlobalData_1.BlackScreenGlobalData.FinishHidePromise(),
            this.GetTexture(0).SetAlpha(1),
            this.SetUiActive(!1));
      }),
      (this.A0t = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BlackScreen", 11, "开始显示黑屏"),
          this.SetUiActive(!0),
          BlackScreenGlobalData_1.BlackScreenGlobalData.FinishShowPromise();
      }),
      (this.p0t = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BlackScreen", 11, "开始显示黑屏", [
            "动画名称",
            this.R0t.toString(),
          ]),
          this.SetUiActive(!0),
          this.SPe.PlayLevelSequenceByName(this.R0t.toString());
      }),
      (this.P0t = () => {
        this.SPe.StopCurrentSequence(!0, !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BlackScreen", 11, "开始隐藏黑屏"),
          this.GetTexture(0).SetAlpha(1),
          this.SetUiActive(!1),
          BlackScreenGlobalData_1.BlackScreenGlobalData.FinishHidePromise();
      }),
      (this.M0t = () => {
        this.SPe.StopCurrentSequence(!0, !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BlackScreen", 11, "开始隐藏黑屏", [
              "动画名称",
              this.U0t.toString(),
            ]),
          this.SPe.PlayLevelSequenceByName(this.U0t.toString());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.f0t),
      this.C0t.RegisterStateDelegate(1, this.A0t),
      this.C0t.RegisterStateDelegate(2, this.p0t),
      this.C0t.RegisterStateDelegate(3, this.P0t),
      this.C0t.RegisterStateDelegate(4, this.M0t),
      this.GetTexture(0).SetAlpha(1),
      LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, !0, !0),
      this.C0t.TriggerCurrentStateDelegate();
  }
  OnBeforeDestroy() {
    BlackScreenGlobalData_1.BlackScreenGlobalData.ResetGlobalData(),
      this.SPe?.Clear();
  }
  ShowTemp(e) {
    BlackScreenGlobalData_1.BlackScreenGlobalData.CreateShowPromise();
    var t = this.R0t,
      e = "None" !== (this.R0t = e);
    this.C0t.SwitchState(e ? 2 : 1) || (this.R0t = t);
  }
  HideTemp(e) {
    BlackScreenGlobalData_1.BlackScreenGlobalData.CreateHidePromise();
    var t = this.U0t,
      e = "None" !== (this.U0t = e);
    this.C0t.SwitchState(e ? 4 : 3) || (this.U0t = t);
  }
}
exports.BlackScreenTransitionView = BlackScreenTransitionView;
//# sourceMappingURL=BlackScreenTransitionView.js.map
