"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobileSwitchInputController = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController"),
  UiManager_1 = require("../../UiManager"),
  UiModel_1 = require("../../UiModel");
class MobileSwitchInputController {
  static async d7a() {
    await UiManager_1.UiManager.NormalResetToViewAsync("BattleView"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 11, "重置回主界面成功"),
      await UiManager_1.UiManager.CloseViewAsync("BattleView"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 11, "关闭主界面成功");
  }
  static h7a(o) {
    UiManager_1.UiManager.OpenView("MobileSwitchInputView", o);
  }
  static SwitchToGamepadByMenuSetting() {
    if (Info_1.Info.IsMobilePlatform() && !Info_1.Info.IsInGamepad()) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 11, "[MenuSetting]触屏切换手柄");
      const o =
        ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceInputController();
      MobileSwitchInputController.d7a().finally(() => {
        MobileSwitchInputController.h7a(!0),
          Info_1.Info.SwitchInputControllerType(o, "MenuSetting");
      });
    }
  }
  static SwitchToGamepad(o, e) {
    o
      ? Info_1.Info.IsMobilePlatform() &&
        UiModel_1.UiModel.IsInMainView &&
        ModelManager_1.ModelManager.BattleUiModel
          ?.IsEnableChangeInputControllerOnMobile &&
        ((MobileSwitchInputController.C7a = o),
        Info_1.Info.IsInGamepad() ||
          MobileSwitchInputController.g7a ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("MobileInputSwitch", 11, "触屏切换手柄"),
          (MobileSwitchInputController.g7a = !0),
          (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(212)).FunctionMap.set(
            2,
            MobileSwitchInputController.f7a,
          ),
          o.SetCloseFunction(MobileSwitchInputController.p7a),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            o,
          )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "MobileInputSwitch",
          11,
          "触屏切换手柄异常,传入无效的输入设备类型",
          ["reason", e],
        );
  }
  static SwitchToTouch() {
    !Info_1.Info.IsMobilePlatform() ||
      Info_1.Info.IsInTouch() ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MobileInputSwitch", 11, "手柄切换触屏"),
      MobileSwitchInputController.d7a().finally(() => {
        MobileSwitchInputController.h7a(!1),
          Info_1.Info.SwitchInputControllerType(5, "MobileSwitch");
      }));
  }
  static SwitchToTouchByDisconnectGamepad() {
    !Info_1.Info.IsMobilePlatform() ||
      Info_1.Info.IsInTouch() ||
      (UiModel_1.UiModel.IsInMainView &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "MobileInputSwitch",
            11,
            "手柄切换触屏DisconnectGamepad",
          ),
        MobileSwitchInputController.d7a().finally(() => {
          MobileSwitchInputController.h7a(!1),
            Info_1.Info.SwitchInputControllerType(5, "MobileSwitch");
        })));
  }
}
((exports.MobileSwitchInputController = MobileSwitchInputController).v7a = !1),
  (MobileSwitchInputController.g7a = !1),
  (MobileSwitchInputController.C7a = void 0),
  (MobileSwitchInputController.f7a = () => {
    1 === GameSettingsManager_1.GameSettingsManager.Get(137)?.GetCurrentValue()
      ? (MobileSwitchInputController.v7a = !0)
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Controler_Notconnect_tips",
        );
  }),
  (MobileSwitchInputController.p7a = () => {
    const o = MobileSwitchInputController.C7a;
    (MobileSwitchInputController.C7a = void 0),
      (MobileSwitchInputController.g7a = !1),
      MobileSwitchInputController.v7a &&
        ((MobileSwitchInputController.v7a = !1),
        MobileSwitchInputController.d7a().finally(() => {
          MobileSwitchInputController.h7a(!0),
            Info_1.Info.SwitchInputControllerType(o, "MobileSwitch");
        }));
  }),
  (MobileSwitchInputController.ReOpenBattleView = () => {
    UiManager_1.UiManager.OpenView("BattleView");
  });
//# sourceMappingURL=MobileSwitchInputController.js.map
