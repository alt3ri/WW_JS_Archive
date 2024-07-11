"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoveSkillItem = void 0);
const InputController_1 = require("../../../Input/InputController");
const InputEnums_1 = require("../../../Input/InputEnums");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleSkillItem_1 = require("./BattleSkillItem");
class MoveSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments),
      (this.f_t = !1),
      (this.Gut = InputEnums_1.EInputAxis.None),
      (this.jce = 0);
  }
  RefreshByMoveType(t, e) {
    (this.Gut = t), (this.jce = e), this.IsShowOrShowing || this.Show();
  }
  RefreshKeyByActionName(t) {
    const e = ModelManager_1.ModelManager.PlatformModel.OperationType;
    e !== 2 ||
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
    (this.f_t = !0),
      this.ClickEffect?.Play(),
      InputController_1.InputController.InputAxis(this.Gut, this.jce);
  }
  OnSkillButtonReleased() {
    (this.f_t = !1), InputController_1.InputController.InputAxis(this.Gut, 0);
  }
  Tick(t) {
    super.Tick(t),
      this.f_t &&
        InputController_1.InputController.InputAxis(this.Gut, this.jce);
  }
  OnBeforeHide() {
    this.f_t = !1;
  }
  OnInputAction() {
    this.ClickEffect?.Play();
  }
}
exports.MoveSkillItem = MoveSkillItem;
// # sourceMappingURL=MoveSkillItem.js.map
