"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillLockEnemyLogic = void 0);
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
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
          GameSettingsDefine_1.EFunction.SkillLockEnemyMode,
        );
    if (e) {
      var n = e.OptionsName;
      for (let e = 0; e < n.length; e++) {
        var a = n[e],
          a = new SkillLockEnemyDropDownData_1.SkillLockEnemyDropDownData(e, a);
        r.push(a);
      }
    }
    return r;
  }
  GetDataTextId(e, r) {
    return new LguiUtil_1.TableTextArgNew(e.TextId);
  }
  TriggerSelectChange(e, r) {
    var n = MenuController_1.MenuController.GetTargetConfig(r.FunctionId),
      e = e.Index;
    n !== e &&
      (GameSettingsManager_1.GameSettingsManager.HandleValueChange(
        r.FunctionId,
        e,
        1,
      ),
      (ModelManager_1.ModelManager.MenuModel.IsEdited = !0));
  }
  GetDefaultIndex(e) {
    return MenuController_1.MenuController.GetTargetConfig(e.FunctionId);
  }
}
exports.SkillLockEnemyLogic = SkillLockEnemyLogic;
//# sourceMappingURL=SkillLockEnemyLogic.js.map
