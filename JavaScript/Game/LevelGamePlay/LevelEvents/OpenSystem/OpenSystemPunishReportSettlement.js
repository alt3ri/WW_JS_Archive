"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemPunishReportSettlement = void 0);
const IVar_1 = require("../../../../UniverseEditor/Interface/IVar"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../../../Module/GeneralLogicTree/Define/GeneralLogicTreeDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemPunishReportSettlement extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e && e.InputVars && 6 === r.Type) {
      var n = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
        r.TreeIncId,
      );
      if (n) {
        var t = [];
        for (const i of e.InputVars) {
          var a = this.EGl(n, i);
          t.push(a ? 1 : 0);
        }
        r = new GeneralLogicTreeDefine_1.PunishReportSettlementViewParams(
          n.TreeConfigId,
          t,
        );
        await UiManager_1.UiManager.OpenViewAsync(
          "PunishReportSettlementView",
          r,
        );
      }
    }
    return !0;
  }
  EGl(e, r) {
    var n = r.Source,
      t = r.Type;
    if ("Self" === n) {
      n = e.GetTreeVarByKey(r.Name);
      if (void 0 === n) return !1;
      if (n.iTs === (0, IVar_1.getVarConfigIndex)(t) && "Boolean" === t)
        return n.rTs ?? !1;
    }
    return !1;
  }
  GetViewName(e, r) {
    return "PunishReportSettlementView";
  }
}
exports.OpenSystemPunishReportSettlement = OpenSystemPunishReportSettlement;
//# sourceMappingURL=OpenSystemPunishReportSettlement.js.map
