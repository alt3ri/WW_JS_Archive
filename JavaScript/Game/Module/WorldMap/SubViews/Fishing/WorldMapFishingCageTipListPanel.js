"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapFishingCageTipListPanel = void 0);
const WorldMapSecondaryTipListPanel_1 = require("../Common/TipList/WorldMapSecondaryTipListPanel"),
  WorldMapFishingCageTipListItem_1 = require("./WorldMapFishingCageTipListItem");
class WorldMapFishingCageTipListPanel extends WorldMapSecondaryTipListPanel_1.WorldMapSecondaryTipListPanel {
  constructor() {
    super(...arguments),
      (this.CreateListItem = () =>
        new WorldMapFishingCageTipListItem_1.WorldMapFishingCageTipListItem());
  }
}
exports.WorldMapFishingCageTipListPanel = WorldMapFishingCageTipListPanel;
//# sourceMappingURL=WorldMapFishingCageTipListPanel.js.map
