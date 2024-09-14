"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCorniceMeetingConfig = void 0);
const CorniceChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/CorniceChallengeById"),
  CorniceChallengeByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/CorniceChallengeByMarkId"),
  CorniceQuestById_1 = require("../../../../../Core/Define/ConfigQuery/CorniceQuestById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityCorniceMeetingConfig extends ConfigBase_1.ConfigBase {
  GetCorniceMeetingChallengeConfig(e) {
    return CorniceChallengeById_1.configCorniceChallengeById.GetConfig(e);
  }
  GetCorniceMeetingQuest(e) {
    return CorniceQuestById_1.configCorniceQuestById.GetConfig(e);
  }
  GetCorniceMeetingChallengeByMarkId(e) {
    return CorniceChallengeByMarkId_1.configCorniceChallengeByMarkId.GetConfig(
      e,
    );
  }
}
exports.ActivityCorniceMeetingConfig = ActivityCorniceMeetingConfig;
//# sourceMappingURL=ActivityCorniceMeetingConfig.js.map
