"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConditionConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ConditionById_1 = require("../../../Core/Define/ConfigQuery/ConditionById");
const ConditionGroupById_1 = require("../../../Core/Define/ConfigQuery/ConditionGroupById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ConditionConfig extends ConfigBase_1.ConfigBase {
  GetConditionGroupConfig(o) {
    const n = ConditionGroupById_1.configConditionGroupById.GetConfig(o);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 17, "获取条件组配置错误", [
        "conditionGroupId",
        o,
      ]);
  }
  GetConditionConfig(o) {
    const n = ConditionById_1.configConditionById.GetConfig(o);
    if (n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("InstanceDungeon", 17, "获取条件配置错误", [
        "conditionId",
        o,
      ]);
  }
  GetConditionConfigByType(o, n) {
    for (const e of this.GetConditionGroupConfig(o).GroupId) {
      const i = this.GetConditionConfig(e);
      if (n === i.Type) return i;
    }
  }
  GetGroupConditionIds(o) {
    o = this.GetConditionGroupConfig(o);
    return o ? o.GroupId : [];
  }
}
exports.ConditionConfig = ConditionConfig;
// # sourceMappingURL=ConditionConfig.js.map
