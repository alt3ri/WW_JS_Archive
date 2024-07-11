"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventPickupDropItem = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  RewardController_1 = require("../../Module/Reward/RewardController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPickupDropItem extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments),
      (this.OXs = (e) => {
        this.FinishExecute(e);
      });
  }
  ExecuteNew(e, t) {
    (e &&
      ((e = e.EntityId), (e = EntitySystem_1.EntitySystem.Get(e))?.Valid) &&
      ((e = e.GetComponent(0)),
      RewardController_1.RewardController.PickUpFightDrop(
        e.GetCreatureDataId(),
        e.GetPbDataId(),
        this.OXs,
      ))) ||
      this.FinishExecute(!1);
  }
}
exports.LevelEventPickupDropItem = LevelEventPickupDropItem;
//# sourceMappingURL=LevelEventPickupDropItem.js.map
