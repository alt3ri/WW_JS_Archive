"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  CommonAttributeItem_1 = require("../RoleUi/View/CommonAttributeItem"),
  GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class AttributeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NWe = void 0),
      (this.OWe = (e, t, i) => {
        t = new CommonAttributeItem_1.CommonAttributeItem(t);
        return t.ShowTemp(e), { Key: i, Value: t };
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    var e = this.OpenParam;
    (this.NWe = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.OWe,
    )),
      this.NWe.RefreshByData(e);
  }
  OnBeforeDestroy() {
    this.NWe && (this.NWe.ClearChildren(), (this.NWe = void 0));
  }
}
exports.AttributeView = AttributeView;
//# sourceMappingURL=AttributeView.js.map
