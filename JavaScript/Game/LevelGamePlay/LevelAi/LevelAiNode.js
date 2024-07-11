"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiNode = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  LevelAiDefines_1 = require("./LevelAiDefines");
class LevelAiNode {
  constructor() {
    (this._A = ++LevelAiNode.MIe),
      (this.EIe = void 0),
      (this.SIe = void 0),
      (this.Description = "");
  }
  Serialize(e, i, t) {
    (this.SIe = e), (this.EIe = i), (this.Description = t);
  }
  get CreatureDataComponent() {
    return this.EIe;
  }
  get CharacterPlanComponent() {
    return this.SIe;
  }
  PrintDescription(e, ...i) {
    LevelAiDefines_1.LEVEL_AI_DEBUG_MODE &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "LevelAi",
        30,
        e,
        ["Uid", this._A],
        ["Node", this.constructor.name],
        ["Owner", this.EIe?.GetPbDataId()],
        ["Description", this.Description],
        ...i,
      );
  }
}
(exports.LevelAiNode = LevelAiNode).MIe = 0;
//# sourceMappingURL=LevelAiNode.js.map
