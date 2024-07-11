"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridForbiddenSettings = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class RouletteGridForbiddenSettings {
  static CheckForbiddenState(e, t) {
    if (0 === e) {
      e = this.Qsa.get(t);
      if (e) return e();
    }
    return !1;
  }
  static TipsForbiddenState(e, t) {
    0 === e && (e = this.Ksa.get(t)) && e();
  }
}
(exports.RouletteGridForbiddenSettings = RouletteGridForbiddenSettings),
  ((_a = RouletteGridForbiddenSettings).w0o = () => {
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        188,
      )?.HasTag(-1002623896) ?? !1
    );
  }),
  (RouletteGridForbiddenSettings.$sa = () => {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
      "ExploreTool_BanConnect",
    );
  }),
  (RouletteGridForbiddenSettings.Fna = () => {
    return ModelManager_1.ModelManager.GameModeModel.IsMulti;
  }),
  (RouletteGridForbiddenSettings.Qsa = new Map([
    [1001, _a.w0o],
    [1013, _a.Fna],
  ])),
  (RouletteGridForbiddenSettings.Ksa = new Map([[1013, _a.$sa]]));
//# sourceMappingURL=RouletteGridForbiddenSettings.js.map
