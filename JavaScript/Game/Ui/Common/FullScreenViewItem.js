"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenViewItem = void 0);
const UE = require("ue"),
  CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase"),
  PopupCaptionItem_1 = require("./PopupCaptionItem");
class FullScreenViewItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
  constructor() {
    super(...arguments), (this.n6t = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.n6t.SetCloseCallBack(() => {
        this.TryHideSelf();
      });
  }
  GetAttachParent() {
    return this.GetItem(1);
  }
  SetCaptionTitleIconVisible(e) {
    this.n6t.SetTitleIconVisible(e);
  }
  SetCaptionTitleVisible(e) {
    this.n6t.SetTitleTextActive(e);
  }
  OnSetTitleByTextIdAndArg(e, ...t) {
    this.n6t.SetTitleByTextIdAndArg(e, t);
  }
}
exports.FullScreenViewItem = FullScreenViewItem;
//# sourceMappingURL=FullScreenViewItem.js.map
