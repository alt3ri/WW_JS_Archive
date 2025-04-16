"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.flySkinTypeToCase =
    exports.DEFAULT_FLY_SKIN_CASE =
    exports.flySkinTabToType =
    exports.RoleFlySkinEquipData =
    exports.FLY_SKIN_APPLY_TO_ALL_HELP_ID =
      void 0),
  (exports.FLY_SKIN_APPLY_TO_ALL_HELP_ID = 243);
class RoleFlySkinEquipData {
  constructor() {
    (this.RoleDataId = 0),
      (this.SkinEquipMap = new Map()),
      (this.SkinEquipSet = new Set());
  }
}
(exports.RoleFlySkinEquipData = RoleFlySkinEquipData),
  (exports.flySkinTabToType = { [0]: 1, 1: 0 }),
  (exports.DEFAULT_FLY_SKIN_CASE = "GliderSkinCase"),
  (exports.flySkinTypeToCase = { [1]: "GliderSkinCase", 0: "SoarSkinCase" });
//# sourceMappingURL=FlySkinDefine.js.map
