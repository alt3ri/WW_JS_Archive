"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridEmptyComponent = void 0);
const UE = require("ue"),
  MediumItemGridVisibleComponent_1 = require("./MediumItemGridVisibleComponent");
class MediumItemGridEmptyComponent extends MediumItemGridVisibleComponent_1.MediumItemGridVisibleComponent {
  constructor() {
    super(...arguments),
      (this.OnClickedCallback = void 0),
      (this.UV_ = !1),
      (this.eje = () => {
        this.OnClickedCallback?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIButtonComponent]]),
      (this.BtnBindInfo = [[0, this.eje]]);
  }
  GetResourceId() {
    return "UiItem_ItemBtnEmpty";
  }
  GetLayoutLevel() {
    return 1;
  }
  OnDeactivate() {
    this.OnClickedCallback = void 0;
  }
  SetClickable(e) {
    (this.UV_ = e), this.DV_();
  }
  OnRefresh(e) {
    super.OnRefresh(e), this.DV_();
  }
  DV_() {
    this.GetButton(0)?.SetSelfInteractive(this.UV_);
  }
}
exports.MediumItemGridEmptyComponent = MediumItemGridEmptyComponent;
//# sourceMappingURL=MediumItemGridEmptyComponent.js.map
