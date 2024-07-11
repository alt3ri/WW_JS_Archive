"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionBottomButtonItem = void 0);
const UE = require("ue");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FunctionBottomButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(), (this.QFe = e), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  BindRedDot() {
    const t = this.GetItem(0);
    RedDotController_1.RedDotController.BindRedDot(this.QFe, t);
  }
  UnBindRedDot() {
    const t = this.GetItem(0);
    RedDotController_1.RedDotController.UnBindGivenUi(this.QFe, t);
  }
}
exports.FunctionBottomButtonItem = FunctionBottomButtonItem;
// # sourceMappingURL=FunctionBottomButtonItem.js.map
