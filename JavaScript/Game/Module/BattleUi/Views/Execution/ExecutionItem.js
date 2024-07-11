"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecutionItem = void 0);
const Info_1 = require("../../../../../Core/Common/Info"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  BattleSkillItem_1 = require("../BattleSkillItem");
class ExecutionItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments), (this.B7 = void 0);
  }
  Init(t) {
    (this.B7 = t), this.IsShowOrShowing || this.Show();
  }
  RefreshKeyByActionName(t) {
    var e = Info_1.Info.OperationType;
    2 !== e ||
      (this.KeyActionName === t && this.KeyOperationType === e) ||
      (this.KeyItem &&
        (this.KeyItem.RefreshByActionOrAxis({ ActionOrAxisName: t }),
        this.KeyItem.SetActive(!0)),
      (this.KeyOperationType = e),
      (this.KeyActionName = t));
  }
  RefreshSkillIconByResId(t) {
    t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSkillIcon(t);
  }
  OnSkillButtonPressed() {
    this.B7?.();
  }
  OnInputAction() {
    this.ClickEffect?.Play();
  }
}
exports.ExecutionItem = ExecutionItem;
//# sourceMappingURL=ExecutionItem.js.map
