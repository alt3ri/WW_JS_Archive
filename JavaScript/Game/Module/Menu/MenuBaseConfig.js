"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MenuBaseConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const AxisRevertByRevertType_1 = require("../../../Core/Define/ConfigQuery/AxisRevertByRevertType");
const KeySettingByTypeIdAndInputControllerType_1 = require("../../../Core/Define/ConfigQuery/KeySettingByTypeIdAndInputControllerType");
const KeyTypeAll_1 = require("../../../Core/Define/ConfigQuery/KeyTypeAll");
const MainTypeAll_1 = require("../../../Core/Define/ConfigQuery/MainTypeAll");
const MainTypeById_1 = require("../../../Core/Define/ConfigQuery/MainTypeById");
const MenuConfigAll_1 = require("../../../Core/Define/ConfigQuery/MenuConfigAll");
const MenuConfigByFunctionId_1 = require("../../../Core/Define/ConfigQuery/MenuConfigByFunctionId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MenuBaseConfig extends ConfigBase_1.ConfigBase {
  GetMenuBaseConfig() {
    const e = MenuConfigAll_1.configMenuConfigAll.GetConfigList();
    if (e && e.length > 0) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Menu", 8, "没有基础配置文件，请检查配置表是否缺失");
  }
  GetMainConfig() {
    const e = MainTypeAll_1.configMainTypeAll.GetConfigList();
    if (e && e.length > 0) {
      const n = new Map();
      for (const r of e) n.set(r.Id, r);
      return n;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Menu",
        8,
        "没有对应的主类型基础配置，请检查配置表是否缺失",
      );
  }
  GetMainTypeConfigById(e) {
    return MainTypeById_1.configMainTypeById.GetConfig(e);
  }
  GetMenuConfigByFunctionId(e) {
    return MenuConfigByFunctionId_1.configMenuConfigByFunctionId.GetConfig(e);
  }
  GetAllKeyTypeConfig() {
    return KeyTypeAll_1.configKeyTypeAll.GetConfigList();
  }
  GetKeySettingConfigListByTypeIdAndInputControllerType(e, n) {
    return KeySettingByTypeIdAndInputControllerType_1.configKeySettingByTypeIdAndInputControllerType.GetConfigList(
      e,
      n,
    );
  }
  GetAxisRevertConfigListByRevertType(e) {
    return AxisRevertByRevertType_1.configAxisRevertByRevertType.GetConfigList(
      e,
    );
  }
}
exports.MenuBaseConfig = MenuBaseConfig;
// # sourceMappingURL=MenuBaseConfig.js.map
