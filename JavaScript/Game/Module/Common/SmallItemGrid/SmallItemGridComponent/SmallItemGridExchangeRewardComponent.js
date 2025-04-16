"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridExchangeRewardComponent = void 0);
const UE = require("ue"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridExchangeRewardComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
  GetResourceId() {
    return "UiItem_ItemBFirstReward";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  OnStart() {
    this.GetSprite(1).SetColor(UE.Color.FromHex("#468fba")),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "InstanceDungeon_ExchangeReward",
      );
  }
}
exports.SmallItemGridExchangeRewardComponent =
  SmallItemGridExchangeRewardComponent;
//# sourceMappingURL=SmallItemGridExchangeRewardComponent.js.map
