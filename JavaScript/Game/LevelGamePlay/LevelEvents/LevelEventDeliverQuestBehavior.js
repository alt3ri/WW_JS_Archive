"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventDeliverQuestBehavior = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const ItemDeliverController_1 = require("../../Module/ItemDeliver/ItemDeliverController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventDeliverQuestBehavior extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(r, e) {
    if (r) {
      const l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
        r.EntityId,
      );
      let e = "";
      l && (e = l.Entity.GetComponent(102)?.PawnName ?? ""),
        ItemDeliverController_1.ItemDeliverController.OpenItemDeliverViewByHandInItem(
          r.Items,
          e,
          void 0,
          r.DescText,
        );
    }
  }
}
exports.LevelEventDeliverQuestBehavior = LevelEventDeliverQuestBehavior;
// # sourceMappingURL=LevelEventDeliverQuestBehavior.js.map
