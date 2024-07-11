"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillLockEnemyLogic = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuController_1 = require("../MenuController"),
  MenuFunction_1 = require("../MenuFunction"),
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
      var n = e.OptionsName;
      for (let e = 0; e < n.length; e++) {
        var o = n[e],
          o = new SkillLockEnemyDropDownData_1.SkillLockEnemyDropDownData(e, o);
        r.push(o);
      }
    }
    return r;
  }
  GetDataTextId(e, r) {
    return new LguiUtil_1.TableTextArgNew(e.TextId);
  }
  TriggerSelectChange(e, r) {
    var n = MenuController_1.MenuController.GetTargetConfig(
        r.MenuDataFunctionId,
      ),
      e = e.Index;
    n !== e &&
      (MenuFunction_1.MenuFunction.SetSkillLockEnemyMode(e),
      MenuController_1.MenuController.NoticeChange(r.MenuDataFunctionId),
      (ModelManager_1.ModelManager.MenuModel.IsEdited = !0));
  }
  GetDefaultIndex(e) {
    return MenuController_1.MenuController.GetTargetConfig(
      e.MenuDataFunctionId,
    );
  }
}
exports.SkillLockEnemyLogic = SkillLockEnemyLogic;
//# sourceMappingURL=SkillLockEnemyLogic.js.map
