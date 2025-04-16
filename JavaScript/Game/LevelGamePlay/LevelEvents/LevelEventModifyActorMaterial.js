"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventModifyActorMaterial = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventModifyActorMaterial extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var o;
    e
      ? (t = t)
        ? (o = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid
          ? o.GetComponent(200)?.Owner
            ? (o = o.GetComponent(161)) && o.HandleActorMaterial(e)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelEvent", 33, "状态控制actor不存在")
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelEvent", 33, "状态控制entity不存在", [
              "EntityId",
              t.EntityId,
            ])
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            7,
            "此LevelEvent只能配置在SceneActorRefComponent中",
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
  }
}
exports.LevelEventModifyActorMaterial = LevelEventModifyActorMaterial;
//# sourceMappingURL=LevelEventModifyActorMaterial.js.map
