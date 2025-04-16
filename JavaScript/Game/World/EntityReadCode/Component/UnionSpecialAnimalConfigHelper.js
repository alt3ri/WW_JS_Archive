"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSpecialAnimalConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCollectAnimalConfig_1 = require("./FbCollectAnimalConfig");
class UnionSpecialAnimalConfigHelper {
  static GetUnionSpecialAnimalConfigObject(n) {
    if (n === fb_component_1.UnionSpecialAnimalConfig.CollectAnimalConfig)
      return new fb_component_1.CollectAnimalConfig();
  }
  static ReadUnionSpecialAnimalConfig(n, e) {
    return void 0 !== e &&
      n === fb_component_1.UnionSpecialAnimalConfig.CollectAnimalConfig
      ? FbCollectAnimalConfig_1.FbCollectAnimalConfig.Create(e)
      : void 0;
  }
}
exports.UnionSpecialAnimalConfigHelper = UnionSpecialAnimalConfigHelper;
//# sourceMappingURL=UnionSpecialAnimalConfigHelper.js.map
