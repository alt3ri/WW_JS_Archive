"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionBottomButtonItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class FunctionBottomButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(), (this.l4e = e), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  BindRedDot() {
    var t = this.GetItem(0);
    RedDotController_1.RedDotController.BindRedDot(this.l4e, t);
  }
  UnBindRedDot() {
    var t = this.GetItem(0);
    RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t);
  }
}
exports.FunctionBottomButtonItem = FunctionBottomButtonItem;
//# sourceMappingURL=FunctionBottomButtonItem.js.map
