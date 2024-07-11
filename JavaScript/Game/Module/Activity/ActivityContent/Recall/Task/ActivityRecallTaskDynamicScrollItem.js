"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTaskDynamicScrollItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  ActivityRecallTaskScrollItemPanel_1 = require("./ActivityRecallTaskScrollItemPanel"),
  ActivityRecallTaskTitlePanel_1 = require("./ActivityRecallTaskTitlePanel");
class ActivityRecallTaskDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.k_a = void 0), (this.gLt = void 0);
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.k_a =
      new ActivityRecallTaskScrollItemPanel_1.ActivityRecallTaskScrollItemPanel();
    var t = this.GetItem(0).GetOwner(),
      t =
        (await this.k_a.CreateThenShowByActorAsync(t, void 0, !0),
        (this.gLt =
          new ActivityRecallTaskTitlePanel_1.ActivityRecallTaskTitlePanel()),
        this.GetItem(1).GetOwner());
    await this.gLt.CreateThenShowByActorAsync(t, void 0, !0);
  }
  GetUsingItem(t) {
    return 0 === t.ItemType
      ? this.N_a(1)
      : 1 === t.ItemType
        ? this.N_a(0)
        : void 0;
  }
  N_a(t) {
    return this.GetItem(t).GetOwner();
  }
  Update(t, e) {
    var i = 0 === t.ItemType;
    this.gLt.SetUiActive(i),
      this.k_a.SetUiActive(!i),
      i ? this.gLt.RefreshByData(t) : i || this.k_a.RefreshByData(t);
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.ActivityRecallTaskDynamicScrollItem =
  ActivityRecallTaskDynamicScrollItem;
//# sourceMappingURL=ActivityRecallTaskDynamicScrollItem.js.map
