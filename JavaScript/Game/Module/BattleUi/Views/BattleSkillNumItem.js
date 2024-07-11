"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillNumItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillNumItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.pot = -1),
      (this.vot = new Map()),
      this.CreateByResourceIdAsync("UiItem_BattleSkillNumItem", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    for (const t of this.vot.values()) t();
  }
  SetComponentActive(t) {
    var e = () => {
      this.SetActive(t);
    };
    this.InAsyncLoading() ? this.vot.set("SetActive", e) : e();
  }
  SetTotalCount(t) {}
  SetRemainingCount(t) {
    var e = () => {
      this.pot !== t && (this.GetText(1).SetText(t.toString()), (this.pot = t));
    };
    this.InAsyncLoading() ? this.vot.set("SetRemainingCount", e) : e();
  }
  RefreshCountType(t) {}
  RefreshTotalCount(t) {}
}
exports.BattleSkillNumItem = BattleSkillNumItem;
//# sourceMappingURL=BattleSkillNumItem.js.map
