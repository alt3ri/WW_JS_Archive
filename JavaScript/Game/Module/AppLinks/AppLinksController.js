"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppLinksController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  AppLinks_1 = require("../../../Launcher/AppLinks"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  FunctionController_1 = require("../Functional/FunctionController");
class AppLinksController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.h2n(), super.OnInit();
  }
  static OnClear() {
    return this.l2n(), super.OnClear();
  }
  static h2n() {
    AppLinks_1.AppLinks.SetDeepValueHandle("10009", this._2n),
      AppLinks_1.AppLinks.SetDeepValueHandle("10053", this.y4e);
  }
  static l2n() {
    AppLinks_1.AppLinks.RemoveDeepValueHandle("10009"),
      AppLinks_1.AppLinks.RemoveDeepValueHandle("10053");
  }
  static iVe() {
    return !(
      !ModelManager_1.ModelManager.GameModeModel.WorldDone ||
      ModelManager_1.ModelManager.GameModeModel.Loading ||
      !UiManager_1.UiManager.IsViewShow("BattleView")
    );
  }
}
(exports.AppLinksController = AppLinksController),
  ((_a = AppLinksController)._2n = (e, r) => {
    _a.iVe()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Functional", 22, "打开抽卡界面"),
        FunctionController_1.FunctionController.OpenFunctionRelateView(10009))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Functional", 22, "未完成游戏登录");
  }),
  (AppLinksController.y4e = (e, r) => {
    _a.iVe()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Functional", 22, "打开活动界面"),
        FunctionController_1.FunctionController.OpenFunctionRelateView(10053))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Functional", 22, "未完成游戏登录");
  });
//# sourceMappingURL=AppLinksController.js.map
