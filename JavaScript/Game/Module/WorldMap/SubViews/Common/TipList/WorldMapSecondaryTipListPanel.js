"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryTipListPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  WorldMapSecondaryTipListItem_1 = require("./WorldMapSecondaryTipListItem");
class WorldMapSecondaryTipListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.In_ = void 0),
      (this.CreateListItem = () =>
        new WorldMapSecondaryTipListItem_1.WorldMapSecondaryTipListItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.GetVerticalLayout(0);
    this.In_ = new GenericLayout_1.GenericLayout(e, this.CreateListItem);
  }
  OnBeforeDestroy() {
    this.In_.ClearChildren();
  }
  RefreshByData(e) {
    this.In_.RefreshByData(e);
  }
}
exports.WorldMapSecondaryTipListPanel = WorldMapSecondaryTipListPanel;
//# sourceMappingURL=WorldMapSecondaryTipListPanel.js.map
