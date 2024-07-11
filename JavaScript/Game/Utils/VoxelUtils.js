"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VoxelUtils = void 0);
const UE = require("ue");
class VoxelUtils {
  static GetVoxelInfo(e, t) {
    return UE.KuroVoxelSystem.GetVoxelInfoAtPos(e, t);
  }
}
exports.VoxelUtils = VoxelUtils;
//# sourceMappingURL=VoxelUtils.js.map
