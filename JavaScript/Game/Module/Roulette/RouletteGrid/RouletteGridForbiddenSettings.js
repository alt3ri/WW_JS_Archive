"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridForbiddenSettings = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class RouletteGridForbiddenSettings {
  static CheckForbiddenState(e, r) {
    if (0 === e) {
      e = this.qla.get(r);
      if (e) return e();
    }
    return !1;
  }
  static TipsForbiddenState(e, r) {
    0 === e && (e = this.Gla.get(r)) && e();
  }
  static CheckLockState(e, r) {
    switch (e) {
      case 0:
        if (
          ModelManager_1.ModelManager.RouletteModel.GetExploreDataBySkillId(r)
        )
          break;
        return !0;
      case 1:
        if (ModelManager_1.ModelManager.RouletteModel.GetFuncDataByFuncId(r))
          break;
        return !0;
    }
    return !1;
  }
  static TipsLockState(e, r) {
    if (0 === e) {
      e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(r);
      e &&
        4 === e.SkillType &&
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_SkillUnlockTech",
        );
    }
  }
  static CheckGridSpecialState(e, r, t) {
    switch (r) {
      case 0:
        if (this.CheckForbiddenState(r, t)) return 0;
        if (this.CheckLockState(r, t)) return 5;
        break;
      case 1:
        if (this.CheckLockState(r, t)) return 3;
        break;
      case 2:
        var i = 1 === e,
          a =
            ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteReplace();
        if (i && a)
          if (
            0 === ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId
          )
            return 3;
    }
  }
}
(exports.RouletteGridForbiddenSettings = RouletteGridForbiddenSettings),
  ((_a = RouletteGridForbiddenSettings).w0o = () => {
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        203,
      )?.HasTag(-1002623896) ?? !1
    );
  }),
  (RouletteGridForbiddenSettings.vha = () => {
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        203,
      )?.HasTag(-1488322179) ?? !1
    );
  }),
  (RouletteGridForbiddenSettings.qla = new Map([
    [1001, _a.w0o],
    [1013, _a.vha],
  ])),
  (RouletteGridForbiddenSettings.Gla = new Map([]));
//# sourceMappingURL=RouletteGridForbiddenSettings.js.map
