"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SequenceUtils = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log");
class SequenceUtils {
  static GetSelectedSequenceInEditor() {
    var e = UE.LevelSequenceEditorBlueprintLibrary.GetCurrentLevelSequence();
    if (e) return e;
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 45, "没有打开的seq");
  }
}
exports.SequenceUtils = SequenceUtils;
//# sourceMappingURL=SequenceUtils.js.map
