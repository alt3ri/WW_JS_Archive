"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventDeliverQuestBehavior = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDeliverQuestBehavior extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(r, e) {
    if (r) {
      var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        r.EntityId,
      );
      let e = "";
      l && (e = l.Entity.GetComponent(115)?.PawnName ?? ""),
        ControllerHolder_1.ControllerHolder.ItemDeliverController.OpenItemDeliverViewByHandInItem(
          r.Items,
          e,
          void 0,
          r.DescText,
        );
    }
  }
}
exports.LevelEventDeliverQuestBehavior = LevelEventDeliverQuestBehavior;
//# sourceMappingURL=LevelEventDeliverQuestBehavior.js.map
