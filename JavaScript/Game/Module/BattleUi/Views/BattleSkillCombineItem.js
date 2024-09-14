"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillCombineItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  CommonKeyItem_1 = require("./KeyItem/CommonKeyItem");
class BattleSkillCombineItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Qtt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    (this.Qtt = new CommonKeyItem_1.CommonKeyItem()),
      await this.Qtt.CreateThenShowByActorAsync(e.GetOwner()),
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.组合主键);
  }
  OnStart() {}
  SetVisible(e) {
    e
      ? this.IsShowOrShowing || this.Show()
      : this.IsShowOrShowing && this.Hide();
  }
}
exports.BattleSkillCombineItem = BattleSkillCombineItem;
//# sourceMappingURL=BattleSkillCombineItem.js.map
