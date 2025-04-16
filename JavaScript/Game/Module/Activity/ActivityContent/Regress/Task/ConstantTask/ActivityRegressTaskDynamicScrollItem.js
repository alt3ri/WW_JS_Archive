"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressTaskDynamicScrollItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  ActivityRegressTaskScrollItemPanel_1 = require("./ActivityRegressTaskScrollItemPanel"),
  ActivityRegressTaskTitlePanel_1 = require("./ActivityRegressTaskTitlePanel");
class ActivityRegressTaskDynamicScrollItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.uma = void 0), (this.gLt = void 0);
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.uma =
      new ActivityRegressTaskScrollItemPanel_1.ActivityRegressTaskScrollItemPanel();
    var e = this.GetItem(0).GetOwner(),
      e =
        (await this.uma.CreateThenShowByActorAsync(e, void 0, !0),
        (this.gLt =
          new ActivityRegressTaskTitlePanel_1.ActivityRegressTaskTitlePanel()),
        this.GetItem(1).GetOwner());
    await this.gLt.CreateThenShowByActorAsync(e, void 0, !0);
  }
  GetUsingItem(e) {
    return 0 === e.ItemType
      ? this.cma(1)
      : 1 === e.ItemType
        ? this.cma(0)
        : void 0;
  }
  cma(e) {
    return this.GetItem(e).GetOwner();
  }
  Update(e, t) {
    var s = 0 === e.ItemType;
    this.gLt.SetUiActive(s),
      this.uma.SetUiActive(!s),
      s
        ? this.gLt.RefreshByData(e)
        : s ||
          (this.uma.GetRootItem().SetAnchorOffsetY(0),
          this.uma.RefreshByData(e));
  }
  ClearItem() {
    this.Destroy();
  }
}
exports.ActivityRegressTaskDynamicScrollItem =
  ActivityRegressTaskDynamicScrollItem;
//# sourceMappingURL=ActivityRegressTaskDynamicScrollItem.js.map
