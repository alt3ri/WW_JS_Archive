"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorUtil = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class RoleFavorUtil {
  static IsRoleInfo(e) {
    return e.FavorTabType === 1 && e.TypeParam !== 3;
  }
  static IsRoleBaseInfo(e) {
    return e.FavorTabType === 1 && e.TypeParam === 1;
  }
  static IsRolePowerFile(e) {
    return e.FavorTabType === 1 && e.TypeParam === 2;
  }
  static IsSameContentItemData(e, r) {
    return (
      void 0 !== e &&
      void 0 !== r &&
      e.FavorTabType === r.FavorTabType &&
      e.RoleId === r.RoleId &&
      e.TypeParam === r.TypeParam &&
      e.Config.Id === r.Config.Id
    );
  }
  static GetCurLanguageCvName(e) {
    const r =
      ConfigManager_1.ConfigManager.RoleFavorConfig?.GetFavorRoleInfoConfig(e);
    if (void 0 === r) return StringUtils_1.EMPTY_STRING;
    switch (LanguageSystem_1.LanguageSystem.PackageAudio) {
      case CommonDefine_1.CHINESE_ISO639_1:
        return r.CVNameCn;
      case CommonDefine_1.JAPANESE_ISO639_1:
        return r.CVNameJp;
      case CommonDefine_1.ENGLISH_ISO639_1:
        return r.CVNameEn;
      case CommonDefine_1.KOREAN_ISO639_1:
        return r.CVNameKo;
      default:
        return r.CVNameCn;
    }
  }
}
exports.RoleFavorUtil = RoleFavorUtil;
// # sourceMappingURL=RoleFavorUtil.js.map
