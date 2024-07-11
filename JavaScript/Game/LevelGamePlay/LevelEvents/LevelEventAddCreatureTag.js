"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddCreatureTag = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAddCreatureTag extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, r) {
    let a;
    e &&
      ((a = e.get("Tag")), (e = e.get("CreatureGen"))) &&
      a &&
      UE.KismetStringLibrary.Conv_StringToInt64(e) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("LevelEvent", 3, "该功能已废弃");
  }
}
exports.LevelEventAddCreatureTag = LevelEventAddCreatureTag;
// # sourceMappingURL=LevelEventAddCreatureTag.js.map
