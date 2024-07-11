"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemInteractionPanelMainTypeItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ItemInteractionPanelMainTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.MainTypeId = 0),
      (this.SPt = void 0),
      (this.Jgt = () => {
        this.SPt && this.SPt(this.MainTypeId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.Jgt]]);
  }
  OnStart() {
    this.MainTypeId = this.OpenParam;
    var e =
      ConfigManager_1.ConfigManager.InventoryConfig?.GetItemMainTypeConfig(
        this.MainTypeId,
      );
    e &&
      (this.SetSpriteByPath(e.Icon, this.GetSprite(0), !1), this.SetActive(!0));
  }
  OnBeforeDestroy() {
    this.SPt = void 0;
  }
  SetSelected(e) {
    e
      ? this.GetExtendToggle(1).SetToggleState(1)
      : this.GetExtendToggle(1).SetToggleState(0);
  }
  SetRedDotVisible(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
  BindOnExtendToggleStateChanged(e) {
    this.SPt = e;
  }
}
exports.ItemInteractionPanelMainTypeItem = ItemInteractionPanelMainTypeItem;
//# sourceMappingURL=ItemInteractionPanelMainTypeItem.js.map
