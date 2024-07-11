"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MotionConfig = void 0);
const MotionById_1 = require("../../../Core/Define/ConfigQuery/MotionById");
const MotionByRoleId_1 = require("../../../Core/Define/ConfigQuery/MotionByRoleId");
const MotionByRoleIdAndType_1 = require("../../../Core/Define/ConfigQuery/MotionByRoleIdAndType");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class MotionConfig extends ConfigBase_1.ConfigBase {
  GetMotionConfig(e) {
    return MotionById_1.configMotionById.GetConfig(e);
  }
  GetMotionConfigsByRoleId(e) {
    return MotionByRoleId_1.configMotionByRoleId.GetConfigList(e);
  }
  GetRoleMotionByType(e, o) {
    return MotionByRoleIdAndType_1.configMotionByRoleIdAndType.GetConfigList(
      e,
      o,
    );
  }
  GetMotionTitle(e) {
    e = this.GetMotionConfig(e);
    if (e) return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Title);
  }
  GetMotionContent(e) {
    e = this.GetMotionConfig(e);
    if (e)
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e?.Content);
  }
  GetMotionUnLockConditionGroup(e) {
    return this.GetMotionConfig(e)?.CondGroupId;
  }
  GetMotionRoleId(e) {
    return this.GetMotionConfig(e)?.RoleId;
  }
  GetMotionType(e) {
    return this.GetMotionConfig(e)?.Type;
  }
  GetMotionSort(e) {
    return this.GetMotionConfig(e)?.Sort;
  }
  GetMotionImg(e) {
    return this.GetMotionConfig(e)?.MotionImg;
  }
  GetMotionAnimation(e) {
    return this.GetMotionConfig(e)?.AniMontage;
  }
}
exports.MotionConfig = MotionConfig;
// # sourceMappingURL=MotionConfig.js.map
