"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryActivityData = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityData_1 = require("../Activity/ActivityData");
class FragmentMemoryActivityData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    return this.EntranceRedDot();
  }
  EntranceRedDot() {
    return ModelManager_1.ModelManager.FragmentMemoryModel.GetRedDotState();
  }
  GetCurrentTopicId() {
    return ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryActivityById(
      this.Id,
    ).TopicId;
  }
}
exports.FragmentMemoryActivityData = FragmentMemoryActivityData;
//# sourceMappingURL=FragmentMemoryActivityData.js.map
