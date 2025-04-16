"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushConfig = void 0);
const BossRushActivityByActivityIdAndInstanceId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushActivityByActivityIdAndInstanceId"),
  BossRushActivityById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushActivityById"),
  BossRushBuffById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushBuffById"),
  BossRushBuffDescById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushBuffDescById"),
  BossRushMapMarkByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushMapMarkByActivityId"),
  BossRushScoreById_1 = require("../../../../../Core/Define/ConfigQuery/BossRushScoreById"),
  BossRushTaskConfigAll_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskConfigAll"),
  BossRushTaskConfigByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskConfigByTaskId"),
  BossRushTaskTabAll_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskTabAll"),
  BossRushTaskTabByTabId_1 = require("../../../../../Core/Define/ConfigQuery/BossRushTaskTabByTabId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class BossRushConfig extends ConfigBase_1.ConfigBase {
  GetBossRushActivityConfigById(s) {
    return BossRushActivityById_1.configBossRushActivityById.GetConfig(s);
  }
  GetBossRushByActivityIdAndInstanceId(s, e) {
    s =
      BossRushActivityByActivityIdAndInstanceId_1.configBossRushActivityByActivityIdAndInstanceId.GetConfigList(
        s,
        e,
      );
    if (void 0 !== s && 0 !== s.length) return s[0];
  }
  GetBossRushBuffConfigById(s) {
    return BossRushBuffById_1.configBossRushBuffById.GetConfig(s);
  }
  GetBossRushScoreConfigById(s) {
    return BossRushScoreById_1.configBossRushScoreById.GetConfig(s);
  }
  GetBossRushMarkTypeByActivityId(s) {
    return 0;
  }
  GetBossRushMarkByActivityId(s) {
    return BossRushMapMarkByActivityId_1.configBossRushMapMarkByActivityId.GetConfig(
      s,
    ).MarkId;
  }
  GetBossRushTaskConfig(s) {
    return BossRushTaskConfigByTaskId_1.configBossRushTaskConfigByTaskId.GetConfig(
      s,
    );
  }
  GetBossRushTabListByActivityId(e) {
    var s = BossRushTaskTabAll_1.configBossRushTaskTabAll.GetConfigList(),
      o = BossRushTaskConfigAll_1.configBossRushTaskConfigAll.GetConfigList();
    return void 0 === s || void 0 === o
      ? []
      : s.filter((s) => s.ActivityId === e);
  }
  GetBossRushTabByTabId(s) {
    return BossRushTaskTabByTabId_1.configBossRushTaskTabByTabId.GetConfig(s);
  }
  GetBossRushBuffDescByClassLevel(s, e) {
    var s = this.GetBossRushBuffConfigById(s).PopDescIdList;
    if (s.length > e)
      return (
        (s = s[e]),
        BossRushBuffDescById_1.configBossRushBuffDescById.GetConfig(s)
      );
  }
}
exports.BossRushConfig = BossRushConfig;
//# sourceMappingURL=BossRushConfig.js.map
