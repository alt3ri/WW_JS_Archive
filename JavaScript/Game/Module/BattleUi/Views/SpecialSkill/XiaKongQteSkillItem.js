"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.XiaKongQteSkillItem = void 0);
const Info_1 = require("../../../../../Core/Common/Info"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleSkillItem_1 = require("../BattleSkillItem");
class XiaKongQteSkillItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments), (this.hqa = 0), (this.rTt = void 0), (this.WI = !1);
  }
  SetPressCallback(e) {
    this.rTt = e;
  }
  RefreshType(e) {
    (this.hqa = e), this.RefreshOnInputControllerMainTypeChange();
  }
  RefreshOnInputControllerMainTypeChange() {
    var e = this.tbc(this.hqa);
    e && this.ibc(e);
  }
  tbc(e) {
    if (!Info_1.Info.IsInTouch())
      return 1 === e
        ? InputMappingsDefine_1.actionMappings.向右移动
        : 2 === e
          ? InputMappingsDefine_1.actionMappings.向左移动
          : 4 === e
            ? InputMappingsDefine_1.actionMappings.大招
            : void 0;
  }
  ibc(e) {
    2 === Info_1.Info.OperationType &&
      this.KeyActionName !== e &&
      (this.KeyItem &&
        (this.KeyItem.RefreshByActionOrAxis({ ActionOrAxisName: e }),
        this.KeyItem.SetActive(!0)),
      (this.KeyActionName = e));
  }
  RefreshSkillIconByResId(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetSkillIcon(e);
  }
  OnSkillButtonPressed() {
    this.ClickEffect?.Play(), this.rTt?.(this.hqa);
  }
  SetEnable(e) {
    (this.WI = e), this.RefreshEnable(), this.RefreshDynamicEffect();
  }
  RefreshEnable(e = !1) {
    this.SetSkillItemEnable(this.WI, e);
  }
  RefreshDynamicEffect() {
    this.SetDynamicEffectVisible(this.WI);
  }
  SetSkillIconName(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.SkillNameText, e),
      this.SkillNameText.SetUIActive(!0);
  }
  RefreshSkillName() {}
}
exports.XiaKongQteSkillItem = XiaKongQteSkillItem;
//# sourceMappingURL=XiaKongQteSkillItem.js.map
