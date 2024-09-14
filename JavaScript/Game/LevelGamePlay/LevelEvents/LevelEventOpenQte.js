"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenQte = void 0);
const PanelQteController_1 = require("../../Module/PanelQte/PanelQteController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenQte extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l, t) {
    e
      ? (PanelQteController_1.PanelQteController.StartLevelEventQte(
          e.Config.Id,
        ),
        this.FinishExecute(!0))
      : this.FinishExecute(!1);
  }
}
exports.LevelEventOpenQte = LevelEventOpenQte;
//# sourceMappingURL=LevelEventOpenQte.js.map
