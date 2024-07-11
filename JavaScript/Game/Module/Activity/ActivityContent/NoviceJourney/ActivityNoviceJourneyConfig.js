"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityNoviceJourneyConfig = void 0);
const NewbieCourseAll_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCourseAll"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager");
class ActivityNoviceJourneyConfig extends ConfigBase_1.ConfigBase {
  GetNoticeJourneyConfigList() {
    return NewbieCourseAll_1.configNewbieCourseAll.GetConfigList();
  }
  GetRewardList(e) {
    var r = [];
    for (const i of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)
      .DropPreview) {
      var o = { ItemId: i[0], Count: i[1] };
      r.push(o);
    }
    return r;
  }
}
exports.ActivityNoviceJourneyConfig = ActivityNoviceJourneyConfig;
//# sourceMappingURL=ActivityNoviceJourneyConfig.js.map
