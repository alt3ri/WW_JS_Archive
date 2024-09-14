"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventToggleAirWall = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventToggleAirWall extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, o) {
    if (e)
      if (t) {
        var l = EntitySystem_1.EntitySystem.Get(t.EntityId);
        if (!l?.Valid)
          return e.ActorRefs?.length
            ? void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelEvent",
                  40,
                  "状态控制entity不存在",
                  ["EntityId", t.EntityId],
                  ["ActorRef", e.ActorRefs[0]?.PathName],
                )
              )
            : void 0;
        l.GetComponent(187)?.Owner
          ? (t = l.GetComponent(150)) && t.HandleAirWall(e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 7, "状态控制actor不存在");
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            7,
            "此LevelEvent只能配置在SceneActorRefComponent中",
          );
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
  }
}
exports.LevelEventToggleAirWall = LevelEventToggleAirWall;
//# sourceMappingURL=LevelEventToggleAirWall.js.map
