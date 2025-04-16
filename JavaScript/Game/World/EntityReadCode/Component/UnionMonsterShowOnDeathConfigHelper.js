"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMonsterShowOnDeathConfigHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbMonsterShowOnDeathEffect_1 = require("./FbMonsterShowOnDeathEffect");
class UnionMonsterShowOnDeathConfigHelper {
  static GetUnionMonsterShowOnDeathConfigObject(e) {
    if (
      e ===
      fb_component_1.UnionMonsterShowOnDeathConfig.MonsterShowOnDeathEffect
    )
      return new fb_component_1.MonsterShowOnDeathEffect();
  }
  static ReadUnionMonsterShowOnDeathConfig(e, n) {
    return void 0 !== n &&
      e ===
        fb_component_1.UnionMonsterShowOnDeathConfig.MonsterShowOnDeathEffect
      ? FbMonsterShowOnDeathEffect_1.FbMonsterShowOnDeathEffect.Create(n)
      : void 0;
  }
}
exports.UnionMonsterShowOnDeathConfigHelper =
  UnionMonsterShowOnDeathConfigHelper;
//# sourceMappingURL=UnionMonsterShowOnDeathConfigHelper.js.map
