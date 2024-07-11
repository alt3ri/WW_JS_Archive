"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkRangeImageComponent = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MarkRangeImageComponent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  get RangeImage() {
    return this.GetSprite(0);
  }
}
exports.MarkRangeImageComponent = MarkRangeImageComponent;
// # sourceMappingURL=MarkRangeImageComponent.js.map
