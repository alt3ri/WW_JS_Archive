"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitHandleManager = void 0);
const AimHandle_1 = require("./HudUnitHandle/AimHandle");
const CameraAimHandle_1 = require("./HudUnitHandle/CameraAimHandle");
const LockCursorHandle_1 = require("./HudUnitHandle/LockCursorHandle");
const LockExecutionHandle_1 = require("./HudUnitHandle/LockExecutionHandle");
const ManipulateAimHandle_1 = require("./HudUnitHandle/ManipulateAimHandle");
const ManipulateCursorHandle_1 = require("./HudUnitHandle/ManipulateCursorHandle");
const MonsterCursorHandle_1 = require("./HudUnitHandle/MonsterCursorHandle");
const RogueScoreHandle_1 = require("./HudUnitHandle/RogueScoreHandle");
const StrengthHandle_1 = require("./HudUnitHandle/StrengthHandle");
const HudUnitManager_1 = require("./HudUnitManager");
class HudUnitHandleManager {
  static Init() {
    HudUnitManager_1.HudUnitManager.HudUnitHandleClassArray = [
      LockCursorHandle_1.LockCursorHandle,
      StrengthHandle_1.StrengthHandle,
      AimHandle_1.AimHandle,
      MonsterCursorHandle_1.MonsterCursorHandle,
      ManipulateCursorHandle_1.ManipulateCursorHandle,
      ManipulateAimHandle_1.ManipulateAimHandle,
      LockExecutionHandle_1.LockExecutionHandle,
      CameraAimHandle_1.CameraAimHandle,
      RogueScoreHandle_1.RogueScoreHandle,
    ];
  }
}
exports.HudUnitHandleManager = HudUnitHandleManager;
// # sourceMappingURL=HudUnitHandleManager.js.map
