"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaParentItem = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ExploreAreaItem_1 = require("./ExploreAreaItem");
const ExploreCountryItem_1 = require("./ExploreCountryItem");
class ExploreAreaParentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.z5t = void 0),
      (this.ExploreAreaItem = void 0),
      (this.Z5t = void 0),
      (this.eVt = void 0),
      (this.tVt = (t, e, i) => {
        this.Z5t && this.Z5t(t, e, i);
      }),
      (this.iVt = (t, e, i) => {
        this.eVt && this.eVt(t, e, i);
      }),
      (this.oVt = () => !0),
      (this.rVt = () => !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  GetUsingItem(t) {
    if (t.IsCountry) {
      const e = this.GetItem(0);
      return e.GetOwner();
    }
    const e = this.GetItem(1);
    return e.GetOwner();
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
  }
  OnStart() {
    (this.z5t = new ExploreCountryItem_1.ExploreCountryItem()),
      this.z5t.Initialize(this.GetItem(0)),
      (this.ExploreAreaItem = new ExploreAreaItem_1.ExploreAreaItem()),
      this.ExploreAreaItem.Initialize(this.GetItem(1));
  }
  Update(t, e) {
    const i = (this.Data = t).IsCountry;
    (i
      ? (this.z5t.BindOnSelected(this.tVt),
        this.z5t.BindCanExecuteChange(this.oVt),
        this.z5t)
      : (this.ExploreAreaItem.BindOnSelected(this.iVt),
        this.ExploreAreaItem.BindCanExecuteChange(this.rVt),
        this.ExploreAreaItem)
    ).Refresh(t),
      this.z5t.SetActive(i),
      this.ExploreAreaItem.SetActive(!i);
  }
  BindOnCountrySelected(t) {
    this.Z5t = t;
  }
  BindOnAreaSelected(t) {
    this.eVt = t;
  }
  ClearItem() {
    (this.Data = void 0),
      this.z5t?.Destroy(),
      (this.z5t = void 0),
      this.ExploreAreaItem?.Destroy(),
      (this.ExploreAreaItem = void 0);
  }
}
exports.ExploreAreaParentItem = ExploreAreaParentItem;
// # sourceMappingURL=ExploreAreaParentItem.js.map
