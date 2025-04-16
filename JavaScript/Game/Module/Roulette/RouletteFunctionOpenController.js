"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteFunctionOpenController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  MapRogueController_1 = require("../MapRogue/MapRogueController");
class RouletteFunctionOpenController {
  static OpenRelateView(e) {
    var o = this.Wvc.get(e);
    o
      ? o()
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Functional",
          37,
          "[FunctionRoulette] 查找不到对应FuncId打开界面的实现方式,请在RouletteFunctionOpenController中注册",
          ["功能ID", e],
        );
  }
}
(exports.RouletteFunctionOpenController = RouletteFunctionOpenController),
  ((_a = RouletteFunctionOpenController).Qvc = () => {
    ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue() &&
      UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
  }),
  (RouletteFunctionOpenController.MM1 = () => {
    MapRogueController_1.MapRogueController.CheckInMapRogueInstance() &&
      UiManager_1.UiManager.OpenView("RogueBattleSummary");
  }),
  (RouletteFunctionOpenController.Wvc = new Map([
    [20001, _a.Qvc],
    [20002, _a.MM1],
  ]));
//# sourceMappingURL=RouletteFunctionOpenController.js.map
