"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillLockEnemyLogic = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  DropDownLogicBase_1 = require("./DropDownLogicBase"),
  SkillLockEnemyDropDownData_1 = require("./SkillLockEnemyDropDownData");
class SkillLockEnemyLogic extends DropDownLogicBase_1.DropDownLogicBase {
  GetDropDownDataList() {
    var r = [],
      e =
        ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuConfigByFunctionId(
          133,
        );
    if (e) {
      var o = e.OptionsName;
      for (let e = 0; e < o.length; e++) {
        var n = o[e],
          n = new SkillLockEnemyDropDownData_1.SkillLockEnemyDropDownData(e, n);
        r.push(n);
      }
    }
    return r;
  }
  GetDataTextId(e, r) {
    return new LguiUtil_1.TableTextArgNew(e.TextId);
  }
  TriggerSelectChange(e, r) {
    var o = MenuController_1.MenuController.GetTargetConfig(r.FunctionId),
      e = e.Index;
    o !== e &&
      (MenuController_1.MenuController.SetApplySave(r, e),
      MenuController_1.MenuController.NoticeChange(r.FunctionId),
      (ModelManager_1.ModelManager.MenuModel.IsEdited = !0));
  }
  GetDefaultIndex(e) {
    return MenuController_1.MenuController.GetTargetConfig(e.FunctionId);
  }
}
exports.SkillLockEnemyLogic = SkillLockEnemyLogic;
//# sourceMappingURL=SkillLockEnemyLogic.js.map
