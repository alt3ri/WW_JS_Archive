"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTriggerModeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSkyboxDistanceTrigger_1 = require("./FbSkyboxDistanceTrigger"),
  FbSkyboxGlobalTrigger_1 = require("./FbSkyboxGlobalTrigger");
class UnionTriggerModeHelper {
  static GetUnionTriggerModeObject(e) {
    switch (e) {
      case fb_component_1.UnionTriggerMode.SkyboxDistanceTrigger:
        return new fb_component_1.SkyboxDistanceTrigger();
      case fb_component_1.UnionTriggerMode.SkyboxGlobalTrigger:
        return new fb_component_1.SkyboxGlobalTrigger();
      default:
        return;
    }
  }
  static ReadUnionTriggerMode(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_component_1.UnionTriggerMode.SkyboxDistanceTrigger:
          return FbSkyboxDistanceTrigger_1.FbSkyboxDistanceTrigger.Create(r);
        case fb_component_1.UnionTriggerMode.SkyboxGlobalTrigger:
          return FbSkyboxGlobalTrigger_1.FbSkyboxGlobalTrigger.Create(r);
        default:
          return;
      }
  }
}
exports.UnionTriggerModeHelper = UnionTriggerModeHelper;
//# sourceMappingURL=UnionTriggerModeHelper.js.map
