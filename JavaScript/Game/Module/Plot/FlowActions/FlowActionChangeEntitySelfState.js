"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowActionChangeEntitySelfState = void 0);
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntitySelfState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params,
      e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.EntityState);
    let a = void 0;
    switch (this.Context.Context.Type) {
      case 1:
        a = this.Context.Context.EntityId;
        break;
      case 5:
        a = this.Context.Context.TriggerEntityId;
        break;
      default:
        return;
    }
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(a);
    t?.IsInit &&
      e &&
      LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(
        ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(t),
        e,
        "ShowInPlotSequence",
      );
  }
}
exports.FlowActionChangeEntitySelfState = FlowActionChangeEntitySelfState;
//# sourceMappingURL=FlowActionChangeEntitySelfState.js.map
