"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToGachaView = void 0);
const FunctionController_1 = require("../../Functional/FunctionController"),
  SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToGachaView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun() {
    FunctionController_1.FunctionController.OpenFunctionRelateView(10009);
  }
}
exports.SkipToGachaView = SkipToGachaView;
//# sourceMappingURL=SkipToGachaView.js.map
