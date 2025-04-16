"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsInitValueSource = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  GameSettingsDefine_1 = require("../GameSettingsDefine");
class GameSettingsInitValueSource {
  constructor(e) {
    (this.awi = e), (this.L_c = new Map());
  }
  CacheValue(e, t) {
    this.L_c.has(t)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameSettings",
          64,
          "收集设置数据时，出现来源重复。当前数据弃置",
          ["functionId", this.awi],
          ["sourceType", t],
          ["value", e],
        )
      : this.L_c.set(t, e);
  }
  get ValidInitValue() {
    for (const t of GameSettingsDefine_1.gameSettingsInitSourceTypePriority) {
      var e = this.L_c.get(t);
      if (void 0 !== e)
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "GameSettings",
              64,
              "拿到ValidInitValue",
              ["functionId", this.awi],
              ["sourceType", t],
              ["value", e],
            ),
          e
        );
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "GameSettings",
        64,
        "不能获得有效的数据缓存，返回undefined",
        ["functionId", this.awi],
      );
  }
}
exports.GameSettingsInitValueSource = GameSettingsInitValueSource;
//# sourceMappingURL=GameSettingsInitValueSource.js.map
