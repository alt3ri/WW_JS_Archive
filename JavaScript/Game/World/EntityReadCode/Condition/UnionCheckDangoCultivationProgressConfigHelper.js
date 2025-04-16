"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCheckDangoCultivationProgressConfigHelper = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCountDangoOverTargetLevel_1 = require("./FbCountDangoOverTargetLevel");
class UnionCheckDangoCultivationProgressConfigHelper {
  static GetUnionCheckDangoCultivationProgressConfigObject(o) {
    if (
      o ===
      fb_condition_1.UnionCheckDangoCultivationProgressConfig
        .CountDangoOverTargetLevel
    )
      return new fb_condition_1.CountDangoOverTargetLevel();
  }
  static ReadUnionCheckDangoCultivationProgressConfig(o, e) {
    return void 0 !== e &&
      o ===
        fb_condition_1.UnionCheckDangoCultivationProgressConfig
          .CountDangoOverTargetLevel
      ? FbCountDangoOverTargetLevel_1.FbCountDangoOverTargetLevel.Create(e)
      : void 0;
  }
}
exports.UnionCheckDangoCultivationProgressConfigHelper =
  UnionCheckDangoCultivationProgressConfigHelper;
//# sourceMappingURL=UnionCheckDangoCultivationProgressConfigHelper.js.map
