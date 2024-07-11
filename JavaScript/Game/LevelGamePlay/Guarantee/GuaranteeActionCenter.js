"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuaranteeActionCenter = void 0);
const GuaranteeActionBlackScreenFadeOut_1 = require("./GuaranteeActions/GuaranteeActionBlackScreenFadeOut");
const GuaranteeActionEnablePlayerMoveControl_1 = require("./GuaranteeActions/GuaranteeActionEnablePlayerMoveControl");
const GuaranteeActionExitOrbitalCamera_1 = require("./GuaranteeActions/GuaranteeActionExitOrbitalCamera");
const GuaranteeActionRestorePlayerCameraAdjustment_1 = require("./GuaranteeActions/GuaranteeActionRestorePlayerCameraAdjustment");
const GuaranteeActionUnLimitPlayerOperation_1 = require("./GuaranteeActions/GuaranteeActionUnLimitPlayerOperation");
class GuaranteeActionCenter {
  static RegGuaranteeActions() {
    const e = GuaranteeActionCenter.tIe;
    e(
      "RestorePlayerCameraAdjustment",
      GuaranteeActionRestorePlayerCameraAdjustment_1.GuaranteeActionRestorePlayerCameraAdjustment,
    ),
      e(
        "EnablePlayerMoveControl",
        GuaranteeActionEnablePlayerMoveControl_1.GuaranteeActionEnablePlayerMoveControl,
      ),
      e(
        "UnLimitPlayerOperation",
        GuaranteeActionUnLimitPlayerOperation_1.GuaranteeActionUnLimitPlayerOperation,
      ),
      e(
        "ExitOrbitalCamera",
        GuaranteeActionExitOrbitalCamera_1.GuaranteeActionExitOrbitalCamera,
      ),
      e(
        "ActionBlackScreenFadeOut",
        GuaranteeActionBlackScreenFadeOut_1.GuaranteeActionBlackScreenFadeOut,
      );
  }
  static GetGuaranteeAction(e) {
    e = GuaranteeActionCenter.iIe.get(e);
    if (e) return new e();
  }
  static GetActionFilterMode(e) {
    return this.oIe.get(e) ?? 0;
  }
}
((exports.GuaranteeActionCenter = GuaranteeActionCenter).iIe = new Map()),
  (GuaranteeActionCenter.oIe = new Map()),
  (GuaranteeActionCenter.tIe = (e, t, a = 1) => {
    GuaranteeActionCenter.iIe.has(e) || GuaranteeActionCenter.iIe.set(e, t),
      GuaranteeActionCenter.oIe.has(e) || GuaranteeActionCenter.oIe.set(e, a);
  });
// # sourceMappingURL=GuaranteeActionCenter.js.map
