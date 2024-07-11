"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookContentItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBookContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.HandBookContentItemData = e),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  OnStart() {
    var e;
    this.HandBookContentItemData &&
      ((e = this.GetText(0)),
      this.HandBookContentItemData.Title
        ? (e.SetUIActive(!0), e.SetText(this.HandBookContentItemData.Title))
        : e.SetUIActive(!1),
      (e = this.GetText(1)),
      this.HandBookContentItemData.Desc
        ? (e.SetUIActive(!0), e.SetText(this.HandBookContentItemData.Desc))
        : e.SetUIActive(!1));
  }
  OnBeforeDestroy() {}
}
exports.HandBookContentItem = HandBookContentItem;
//# sourceMappingURL=HandBookContentItem.js.map
