"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionGroupFinishConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbGroupFinishDestroy_1 = require("./FbGroupFinishDestroy"),
  FbGroupFinishSilence_1 = require("./FbGroupFinishSilence");
class UnionGroupFinishConfigHelper {
  static GetUnionGroupFinishConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionGroupFinishConfig.GroupFinishDestroy:
        return new fb_component_1.GroupFinishDestroy();
      case fb_component_1.UnionGroupFinishConfig.GroupFinishSilence:
        return new fb_component_1.GroupFinishSilence();
      default:
        return;
    }
  }
  static ReadUnionGroupFinishConfig(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_component_1.UnionGroupFinishConfig.GroupFinishDestroy:
          return FbGroupFinishDestroy_1.FbGroupFinishDestroy.Create(n);
        case fb_component_1.UnionGroupFinishConfig.GroupFinishSilence:
          return FbGroupFinishSilence_1.FbGroupFinishSilence.Create(n);
        default:
          return;
      }
  }
}
exports.UnionGroupFinishConfigHelper = UnionGroupFinishConfigHelper;
//# sourceMappingURL=UnionGroupFinishConfigHelper.js.map
