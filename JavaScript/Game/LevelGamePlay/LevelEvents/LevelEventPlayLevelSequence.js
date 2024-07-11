"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPlayLevelSequence = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayLevelSequence extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    e
      ? e.LevelSequencePath
        ? (t = t)
          ? (t = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid
            ? t.GetComponent(185)?.Owner
              ? (t = t.GetComponent(149)) && t.HandleSequence(e)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("LevelEvent", 34, "状态控制actor不存在")
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelEvent", 34, "状态控制entity不存在")
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              7,
              "此LevelEvent只能配置在SceneActorRefComponent中",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelEvent", 7, "LevelSequence路径为空")
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
  }
}
exports.LevelEventPlayLevelSequence = LevelEventPlayLevelSequence;
//# sourceMappingURL=LevelEventPlayLevelSequence.js.map
