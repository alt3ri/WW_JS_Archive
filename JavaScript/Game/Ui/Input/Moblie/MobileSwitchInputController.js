"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobileSwitchInputController = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  CloudGameManager_1 = require("../../../Manager/CloudGameManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController"),
  InputDistributeDefine_1 = require("../../InputDistribute/InputDistributeDefine"),
  UiManager_1 = require("../../UiManager"),
  UiModel_1 = require("../../UiModel");
class MobileSwitchInputController {
  static async CWa() {
    UiManager_1.UiManager.CloseView("PingView"),
      await UiManager_1.UiManager.NormalResetToViewAsync("BattleView"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 10, "重置回主界面成功"),
      await Promise.all([
        UiManager_1.UiManager.CloseViewAsync("PingView"),
        UiManager_1.UiManager.CloseViewAsync("BattleView"),
      ]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 10, "关闭主界面成功");
  }
  static fk_() {
    for (const e of this.gk_.values())
      UiManager_1.UiManager.OpenView(e.UiViewName, e.Param),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MobileInputSwitch",
            10,
            "重新打开切换期间打开的界面数据",
            ["viewName", e.UiViewName],
          );
    this.gk_.clear();
  }
  static _Wa(e) {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "All",
      MobileSwitchInputController.Ck_,
      "MobileSwitchInput",
    ),
      UiManager_1.UiManager.OpenView("MobileSwitchInputView", e);
  }
  static Brl() {
    return !!(
      Info_1.Info.IsMobileInputModel() &&
      UiModel_1.UiModel.IsInMainView &&
      ModelManager_1.ModelManager.BattleUiModel?.IsEnableChangeInputControllerOnMobile() &&
      ModelManager_1.ModelManager.InputDistributeModel.IsTagMatchAnyCurrentInputTag(
        InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
      )
    );
  }
  static SwitchToGamepadByMenuSetting() {
    if (Info_1.Info.IsMobileInputModel() && !Info_1.Info.IsInGamepad()) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 10, "[MenuSetting]触屏切换手柄");
      const e =
        ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceInputController();
      MobileSwitchInputController.CWa().finally(() => {
        MobileSwitchInputController._Wa(!0),
          Info_1.Info.SwitchInputControllerType(e, "MenuSetting");
      });
    }
  }
  static SwitchToGamepad(e, t) {
    e
      ? this.Brl() &&
        ((MobileSwitchInputController.gWa = e),
        Info_1.Info.IsInGamepad() ||
          MobileSwitchInputController.fWa ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("MobileInputSwitch", 10, "触屏切换手柄"),
          (MobileSwitchInputController.fWa = !0),
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(212)).FunctionMap.set(
            1,
            MobileSwitchInputController.Sbo,
          ),
          e.FunctionMap.set(2, MobileSwitchInputController.pWa),
          e.SetCloseFunction(MobileSwitchInputController.vWa),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MobileInputSwitch",
          10,
          "触屏切换手柄异常,传入无效的输入设备类型",
          ["reason", t],
        );
  }
  static SwitchToTouch() {
    !Info_1.Info.IsMobileInputModel() ||
      Info_1.Info.IsInTouch() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 10, "手柄切换触屏"),
      MobileSwitchInputController.CWa().finally(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.MobileGamepadDisconnect,
        ),
          MobileSwitchInputController._Wa(!1),
          Info_1.Info.SwitchInputControllerType(5, "MobileSwitch");
      }));
  }
  static SwitchToTouchByDisconnectGamepad() {
    !this.Brl() ||
      Info_1.Info.IsInTouch() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "MobileInputSwitch",
          10,
          "手柄切换触屏DisconnectGamepad",
        ),
      MobileSwitchInputController.CWa().finally(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.MobileGamepadDisconnect,
        ),
          MobileSwitchInputController._Wa(!1),
          Info_1.Info.SwitchInputControllerType(5, "MobileSwitch");
      }));
  }
}
(exports.MobileSwitchInputController = MobileSwitchInputController),
  ((_a = MobileSwitchInputController).MWa = !1),
  (MobileSwitchInputController.fWa = !1),
  (MobileSwitchInputController.gWa = void 0),
  (MobileSwitchInputController.gk_ = new Map()),
  (MobileSwitchInputController.Sbo = () => {
    MobileSwitchInputController.fWa = !1;
  }),
  (MobileSwitchInputController.pWa = () => {
    1 ===
    GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
      GameSettingsDefine_1.EFunction.MobileGamepadMode,
    )
      ? (MobileSwitchInputController.MWa = !0)
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Controler_Notconnect_tips",
        );
  }),
  (MobileSwitchInputController.vWa = () => {
    const e = MobileSwitchInputController.gWa;
    (MobileSwitchInputController.gWa = void 0),
      (MobileSwitchInputController.fWa = !1),
      MobileSwitchInputController.MWa &&
        ((MobileSwitchInputController.MWa = !1),
        MobileSwitchInputController.CWa().finally(() => {
          MobileSwitchInputController._Wa(!0),
            Info_1.Info.SwitchInputControllerType(e, "MobileSwitch");
        }));
  }),
  (MobileSwitchInputController.Ck_ = (e, t) =>
    "MobileSwitchInputView" === e ||
    (_a.gk_.set(e, { UiViewName: e, Param: t }),
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("MobileInputSwitch", 10, "缓存切换期间打开的界面数据", [
        "viewName",
        e,
      ]),
    !1)),
  (MobileSwitchInputController.ReOpenBattleView = () => {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "All",
      MobileSwitchInputController.Ck_,
    ),
      UiManager_1.UiManager.OpenView("BattleView"),
      CloudGameManager_1.CloudGameManager.IsCloudGame ||
        UiManager_1.UiManager.OpenView("PingView"),
      MobileSwitchInputController.fk_();
  });
//# sourceMappingURL=MobileSwitchInputController.js.map
