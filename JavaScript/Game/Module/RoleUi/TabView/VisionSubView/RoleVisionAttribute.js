"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionAttribute = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  RoleAttributeItem_1 = require("./RoleAttributeItem");
class RoleVisionAttribute extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.AttributeScroller = void 0),
      (this.wqe = void 0),
      (this.PCo = () => {
        return new RoleAttributeItem_1.RoleAttributeItem();
      }),
      (this.wqe = e);
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.AttributeScroller = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.PCo,
      this.GetItem(1).GetOwner(),
    );
  }
  Refresh(e, i = !1) {
    const s = new Array();
    e?.forEach((e) => {
      var t = new RoleAttributeItem_1.RoleAttributeSt();
      (t.Data = e), (t.NeedCheckBg = i), s.push(t);
    }),
      this.AttributeScroller.RefreshByData(s);
  }
}
exports.RoleVisionAttribute = RoleVisionAttribute;
//# sourceMappingURL=RoleVisionAttribute.js.map
