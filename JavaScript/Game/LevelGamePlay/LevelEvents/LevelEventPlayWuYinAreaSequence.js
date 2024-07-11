"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayWuYinAreaSequence = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayWuYinAreaSequence extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, a) {
    const n = e.get("State");
    n !== "Play" && n !== "End"
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "WuYinModel",
          4,
          "PlayWuYinSequence事件State参数填写错误！（必须是Play或者End）",
          ["GroupId:", this.GroupId],
        )
      : ((e = e.get("SequenceName")),
        ModelManager_1.ModelManager.WuYinAreaModel.PlayWuYinSequence(e, n));
  }
}
exports.LevelEventPlayWuYinAreaSequence = LevelEventPlayWuYinAreaSequence;
// # sourceMappingURL=LevelEventPlayWuYinAreaSequence.js.map
