"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StepControllerBase = void 0);
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class StepControllerBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ShowData = void 0), (this.Config = void 0);
  }
  CheckTextVisible() {
    return !0;
  }
  OnTick(e) {}
  async OnConfigRefresh(e, s) {
    (this.ShowData = e), (this.Config = s);
  }
}
exports.StepControllerBase = StepControllerBase;
//# sourceMappingURL=StepControllerBase.js.map
