"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteGridForbiddenSettings = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class RouletteGridForbiddenSettings {
  static CheckForbiddenState(e, t) {
    if (0 === e) {
      e = this.qla.get(t);
      if (e) return e();
    }
    return !1;
  }
  static TipsForbiddenState(e, t) {
    0 === e && (e = this.Gla.get(t)) && e();
  }
}
(exports.RouletteGridForbiddenSettings = RouletteGridForbiddenSettings),
  ((_a = RouletteGridForbiddenSettings).w0o = () => {
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        190,
      )?.HasTag(-1002623896) ?? !1
    );
  }),
  (RouletteGridForbiddenSettings.vha = () => {
    return (
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        190,
      )?.HasTag(-1488322179) ?? !1
    );
  }),
  (RouletteGridForbiddenSettings.qla = new Map([
    [1001, _a.w0o],
    [1013, _a.vha],
  ])),
  (RouletteGridForbiddenSettings.Gla = new Map([]));
//# sourceMappingURL=RouletteGridForbiddenSettings.js.map
