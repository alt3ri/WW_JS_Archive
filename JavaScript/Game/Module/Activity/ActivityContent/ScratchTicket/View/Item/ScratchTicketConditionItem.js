"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketConditionItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketConditionItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(t, e, r) {
    this.GetItem(0).SetUIActive(t.IsFinish()),
      this.GetText(1).SetText(t.GetConditionDesc()),
      this.GetText(2).SetText(t.GetConditionTypeName());
  }
}
exports.ScratchTicketConditionItem = ScratchTicketConditionItem;
//# sourceMappingURL=ScratchTicketConditionItem.js.map
