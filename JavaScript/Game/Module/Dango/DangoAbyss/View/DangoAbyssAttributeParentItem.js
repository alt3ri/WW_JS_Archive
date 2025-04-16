"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssAttributeParentItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  DangoAbyssAttributeItems_1 = require("./DangoAbyssAttributeItems");
class DangoAbyssAttributeParentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.ItemTitle = void 0),
      (this.ItemAttribute = void 0),
      (this.ItemTag = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  GetUsingItem(t) {
    if (t.Attribute) {
      const s = this.GetItem(1);
      return s.GetOwner();
    }
    if (t.Tag) {
      const s = this.GetItem(2);
      return s.GetOwner();
    }
    const s = this.GetItem(0);
    return s.GetOwner();
  }
  OnStart() {
    (this.ItemTitle =
      new DangoAbyssAttributeItems_1.DangoAbyssAttributeTitleItem()),
      this.ItemTitle.Initialize(this.GetItem(0)),
      (this.ItemAttribute =
        new DangoAbyssAttributeItems_1.DangoAbyssAttributeItem()),
      this.ItemAttribute.Initialize(this.GetItem(1)),
      (this.ItemTag =
        new DangoAbyssAttributeItems_1.DangoAbyssAttributeTagItem()),
      this.ItemTag.Initialize(this.GetItem(2));
  }
  Update(t, s) {
    (this.Data = t),
      this.ItemAttribute.SetUiActive(!1),
      this.ItemTag.SetUiActive(!1),
      this.ItemTitle.SetUiActive(!1),
      (t.Attribute
        ? this.ItemAttribute
        : t.Tag
          ? this.ItemTag
          : this.ItemTitle
      ).Refresh(t);
  }
  ClearItem() {
    (this.Data = void 0),
      this.ItemTitle?.Destroy(),
      (this.ItemTitle = void 0),
      this.ItemAttribute?.Destroy(),
      (this.ItemAttribute = void 0),
      this.ItemTag?.Destroy(),
      (this.ItemTag = void 0);
  }
}
exports.DangoAbyssAttributeParentItem = DangoAbyssAttributeParentItem;
//# sourceMappingURL=DangoAbyssAttributeParentItem.js.map
