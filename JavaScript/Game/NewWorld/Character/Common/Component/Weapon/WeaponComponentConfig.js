"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponComponentConfig = void 0);
const WeaponHideConfigByIdWithZero_1 = require("../../../../../../Core/Define/ConfigQuery/WeaponHideConfigByIdWithZero"),
  WeaponVisibleConfigByIdWithZero_1 = require("../../../../../../Core/Define/ConfigQuery/WeaponVisibleConfigByIdWithZero"),
  ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
class WeaponComponentConfig extends ConfigBase_1.ConfigBase {
  GetWeaponVisibleConfig(e) {
    var e = e.GetComponent(0);
    if (e) return (e = e.GetPbDataId()), this.GetWeaponVisibleConfigById(e);
  }
  GetWeaponVisibleConfigById(e) {
    return WeaponVisibleConfigByIdWithZero_1.configWeaponVisibleConfigByIdWithZero.GetConfig(
      e,
      e,
      e,
    );
  }
  GetHideWeaponTags(e) {
    return WeaponHideConfigByIdWithZero_1.configWeaponHideConfigByIdWithZero
      .GetConfig(e, e, e)
      .HideWeaponTags.map((e) =>
        GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
      );
  }
}
exports.WeaponComponentConfig = WeaponComponentConfig;
//# sourceMappingURL=WeaponComponentConfig.js.map
