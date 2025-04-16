"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PopupComponentFunctionButton = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
class PopupComponentFunctionButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ButtonItem = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    (this.ButtonItem = new ButtonItem_1.ButtonItem()),
      await this.ButtonItem.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      );
  }
  SetButtonTextByTextId(t, ...e) {
    this.ButtonItem.SetLocalTextNew(t, ...e);
  }
  SetButtonFunction(t) {
    this.ButtonItem.SetFunction(t);
  }
}
exports.PopupComponentFunctionButton = PopupComponentFunctionButton;
//# sourceMappingURL=PopupComponentFunctionButton.js.map
