"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialItemLogicSummonGongduola = void 0);
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  SpecialItemLogicBase_1 = require("./SpecialItemLogicBase");
class SpecialItemLogicSummonGongduola extends SpecialItemLogicBase_1.SpecialItemLogicBase {
  CheckUseCondition() {
    return !0;
  }
  OnUse() {
    ControllerHolder_1.ControllerHolder.GongduolaSummonController.StartSummonGongduola(
      70140050,
    );
  }
}
exports.SpecialItemLogicSummonGongduola = SpecialItemLogicSummonGongduola;
//# sourceMappingURL=SpecialItemLogicSummonGongduola.js.map
