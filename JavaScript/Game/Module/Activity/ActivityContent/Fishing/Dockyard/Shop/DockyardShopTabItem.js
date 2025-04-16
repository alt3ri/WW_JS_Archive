"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopTabItem = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiTabSequence_1 = require("../../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class DockyardShopTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.GridIndex = 0),
      (this.Cke = (e) => {
        1 === e && this.SelectedCallBack?.(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Cke]]);
  }
  OnStart() {
    super.OnStart(), this.GetItem(1).SetUIActive(!1);
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  SetRedDotActive(e) {
    this.GetItem(1).SetUIActive(e);
  }
}
exports.DockyardShopTabItem = DockyardShopTabItem;
//# sourceMappingURL=DockyardShopTabItem.js.map
