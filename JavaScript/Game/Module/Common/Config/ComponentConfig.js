"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComponentConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ElementIconTagById_1 = require("../../../../Core/Define/ConfigQuery/ElementIconTagById");
const EntranceIconTagById_1 = require("../../../../Core/Define/ConfigQuery/EntranceIconTagById");
const ItemIconTagById_1 = require("../../../../Core/Define/ConfigQuery/ItemIconTagById");
const MonsterIconTagById_1 = require("../../../../Core/Define/ConfigQuery/MonsterIconTagById");
const QualityIconTagById_1 = require("../../../../Core/Define/ConfigQuery/QualityIconTagById");
const RoleIconTagById_1 = require("../../../../Core/Define/ConfigQuery/RoleIconTagById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ComponentConfig extends ConfigBase_1.ConfigBase {
  GetItemConfigParam(e) {
    const o = ItemIconTagById_1.configItemIconTagById.GetConfig(e);
    if (o) return o.ConfigParam;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LguiUtil",
        11,
        "[ComponentConfig.GetItemConfigParam]查找配置数据失败，数据为空",
        ["标签", e],
      );
  }
  GetQualityConfigParam(e) {
    const o = QualityIconTagById_1.configQualityIconTagById.GetConfig(e);
    if (o) return o.ConfigParam;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LguiUtil",
        11,
        "[ComponentConfig.GetQualityConfigParam]查找配置数据失败，数据为空",
        ["标签", e],
      );
  }
  GetRoleConfigParam(e) {
    const o = RoleIconTagById_1.configRoleIconTagById.GetConfig(e);
    if (o) return o.ConfigParam;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LguiUtil",
        11,
        "[ComponentConfig.GetRoleConfigParam]查找配置数据失败，数据为空",
        ["标签", e],
      );
  }
  GetElementConfigParam(e) {
    const o = ElementIconTagById_1.configElementIconTagById.GetConfig(e);
    if (o) return o.ConfigParam;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LguiUtil",
        11,
        "[ComponentConfig.GetElementIconTag]查找配置数据失败，数据为空",
        ["标签", e],
      );
  }
  GetMonsterConfigParam(e) {
    const o = MonsterIconTagById_1.configMonsterIconTagById.GetConfig(e);
    if (!o || o) return o.ConfigParam;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LguiUtil",
        11,
        "[ComponentConfig.GetMonsterConfigParam]查找配置数据失败，数据为空",
        ["标签", e],
      );
  }
  GetDungeonEntranceConfigParam(e) {
    const o = EntranceIconTagById_1.configEntranceIconTagById.GetConfig(e);
    if (!o || o) return o.ConfigParam;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "LguiUtil",
        11,
        "[ComponentConfig.GetDungeonConfigParam]查找配置数据失败，数据为空",
        ["标签", e],
      );
  }
}
exports.ComponentConfig = ComponentConfig;
// # sourceMappingURL=ComponentConfig.js.map
