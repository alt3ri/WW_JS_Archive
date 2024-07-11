"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionUtils = exports.WAIT_ENTITY_TIME = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
exports.WAIT_ENTITY_TIME = 2e4;
class FlowActionUtils {
  static CheckEntityInAoi(e) {
    if (
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.IsInit
    )
      return !0;
    let o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
    if (o)
      if (o.Transform) {
        let t;
        let r;
        let n = (0, IComponent_1.getComponent)(
          o.ComponentsData,
          "BaseInfoComponent",
        );
        if (n) {
          if (Global_1.Global.BaseCharacter?.CharacterActorComponent?.Valid)
            return (
              (t = IComponent_1.aoiXyLayerValues[n.AoiLayer]),
              (n = IComponent_1.aoizLayerValues[n.AoiZRadius]),
              (r = Vector_1.Vector.Create()).FromConfigVector(o.Transform.Pos),
              (o =
                Global_1.Global.BaseCharacter.CharacterActorComponent
                  .ActorLocationProxy),
              Vector_1.Vector.Dist2D(r, o) < t &&
                (n < 0 || Math.abs(r.Z - o.Z) < n)
            );
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Entity", 27, "当前角色未准备好");
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 27, "找不到BaseInfoComp，检查实体模板", [
              "pbDataId",
              e,
            ]);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 27, "Entity坐标未配置", ["pbDataId", e]);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 27, "找不到EntityData，实体不存在", [
          "pbDataId",
          e,
        ]);
  }
}
exports.FlowActionUtils = FlowActionUtils;
// # sourceMappingURL=FlowActionUtils.js.map
