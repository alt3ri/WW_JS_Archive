"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMapExploreConfig = void 0);
const ExploreActivityById_1 = require("../../../../../Core/Define/ConfigQuery/ExploreActivityById"),
  ExploreActivityTaskByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/ExploreActivityTaskByActivityId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityMapExploreConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetExploreTaskList(e) {
    return (
      ExploreActivityTaskByActivityId_1.configExploreActivityTaskByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetActivityInfo(e) {
    return ExploreActivityById_1.configExploreActivityById.GetConfig(e);
  }
}
exports.ActivityMapExploreConfig = ActivityMapExploreConfig;
//# sourceMappingURL=ActivityMapExploreConfig.js.map
