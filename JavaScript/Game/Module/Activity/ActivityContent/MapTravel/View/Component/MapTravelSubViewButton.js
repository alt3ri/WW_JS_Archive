"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelSubViewButton = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class MapTravelSubViewButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Type = e),
      (this.cVl = void 0),
      (this.UFe = () => {
        this.cVl?.(this.Type);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [4, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  SetNameTextId(e) {
    this.GetText(1).ShowTextNew(e);
  }
  SetItemDone(e) {
    this.GetItem(7).SetUIActive(e);
  }
  SetItemNew(e) {
    this.GetItem(8).SetUIActive(e);
  }
  SetProgressText(e) {
    this.GetText(2).SetText(e);
  }
  SetProgressTextChangeColor(e) {
    var t = this.GetText(2);
    t.SetChangeColor(e, t.changeColor);
  }
  RefreshRedDot(e) {
    this.GetItem(6).SetUIActive(e);
  }
  GetIconItem() {
    return this.GetItem(4);
  }
  SetFunction(e) {
    this.cVl = e;
  }
}
exports.MapTravelSubViewButton = MapTravelSubViewButton;
//# sourceMappingURL=MapTravelSubViewButton.js.map
