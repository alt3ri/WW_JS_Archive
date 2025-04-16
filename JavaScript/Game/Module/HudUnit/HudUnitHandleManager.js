"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitHandleManager = void 0);
const AimHandle_1 = require("./HudUnitHandle/AimHandle"),
  CameraAimHandle_1 = require("./HudUnitHandle/CameraAimHandle"),
  FlyRaceStrengthHandle_1 = require("./HudUnitHandle/FlyRaceStrengthHandle"),
  FollowShootAimHandle_1 = require("./HudUnitHandle/FollowShootAimHandle"),
  FollowShootAutoAimHandle_1 = require("./HudUnitHandle/FollowShootAutoAimHandle"),
  LockCursorHandle_1 = require("./HudUnitHandle/LockCursorHandle"),
  LockExecutionHandle_1 = require("./HudUnitHandle/LockExecutionHandle"),
  LockPredictedHandle_1 = require("./HudUnitHandle/LockPredictedHandle"),
  ManipulateAimHandle_1 = require("./HudUnitHandle/ManipulateAimHandle"),
  ManipulateCursorHandle_1 = require("./HudUnitHandle/ManipulateCursorHandle"),
  MigrationStrengthHandle_1 = require("./HudUnitHandle/MigrationStrengthHandle"),
  MonsterCursorHandle_1 = require("./HudUnitHandle/MonsterCursorHandle"),
  RoleSideEnergyHandle_1 = require("./HudUnitHandle/RoleSideEnergyHandle"),
  StrengthHandle_1 = require("./HudUnitHandle/StrengthHandle"),
  TreasureCompassHandle_1 = require("./HudUnitHandle/TreasureCompassHandle"),
  HudUnitManager_1 = require("./HudUnitManager");
class HudUnitHandleManager {
  static Init() {
    (HudUnitManager_1.HudUnitManager.HudUnitHandleClassArray = [
      LockCursorHandle_1.LockCursorHandle,
      StrengthHandle_1.StrengthHandle,
      AimHandle_1.AimHandle,
      MonsterCursorHandle_1.MonsterCursorHandle,
      ManipulateCursorHandle_1.ManipulateCursorHandle,
      ManipulateAimHandle_1.ManipulateAimHandle,
      LockExecutionHandle_1.LockExecutionHandle,
      CameraAimHandle_1.CameraAimHandle,
      LockPredictedHandle_1.LockPredictedHandle,
      RoleSideEnergyHandle_1.RoleSideEnergyHandle,
    ]),
      (HudUnitManager_1.HudUnitManager.HudUnitHandleClassMap = new Map([
        [0, MigrationStrengthHandle_1.MigrationStrengthHandle],
        [1, FollowShootAimHandle_1.FollowShootAimHandle],
        [2, FollowShootAutoAimHandle_1.FollowShootAutoAimHandle],
        [3, FollowShootAutoAimHandle_1.FollowShootAutoAimHandle],
        [4, TreasureCompassHandle_1.TreasureCompassHandle],
        [5, FlyRaceStrengthHandle_1.FlyRaceStrengthHandle],
      ]));
  }
}
exports.HudUnitHandleManager = HudUnitHandleManager;
//# sourceMappingURL=HudUnitHandleManager.js.map
