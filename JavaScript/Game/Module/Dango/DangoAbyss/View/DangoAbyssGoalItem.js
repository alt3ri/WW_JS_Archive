"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssGoalItem = exports.GoalPanelData = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class GoalPanelData {
  constructor() {
    (this.Title = ""), (this.Desc = "");
  }
}
exports.GoalPanelData = GoalPanelData;
class DangoAbyssGoalItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(t, s, e) {
    this.GetText(0).SetText(t.Title), this.GetText(1).SetText(t.Desc ?? "");
  }
}
exports.DangoAbyssGoalItem = DangoAbyssGoalItem;
//# sourceMappingURL=DangoAbyssGoalItem.js.map
