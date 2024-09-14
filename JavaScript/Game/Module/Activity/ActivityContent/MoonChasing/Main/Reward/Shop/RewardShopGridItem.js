"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardShopGridItem = void 0);
const ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  PayShopGoods_1 = require("../../../../../../PayShop/PayShopData/PayShopGoods"),
  PayShopItem_1 = require("../../../../../../PayShop/PayShopTab/TabItem/PayShopItem");
class RewardShopGridItem extends PayShopItem_1.PayShopItem {
  constructor() {
    super(...arguments),
      (this.o2a = (e, o) => {
        ModelManager_1.ModelManager.MoonChasingRewardModel.ReadShopItemUnlockFlag(
          o,
        ) && this.SetNewFlagState(!1);
      });
  }
  OnStart() {
    super.OnStart(), this.SetExtraFunction(this.o2a);
  }
  Refresh(e, o, a) {
    e instanceof PayShopGoods_1.PayShopGoods &&
      (super.Refresh(e, o, a),
      (o =
        ModelManager_1.ModelManager.MoonChasingRewardModel.CheckShopItemRedDotState(
          e,
        )),
      this.SetNewFlagState(o));
  }
}
exports.RewardShopGridItem = RewardShopGridItem;
//# sourceMappingURL=RewardShopGridItem.js.map
