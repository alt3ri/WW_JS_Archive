"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionIdentifyAttribute = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PhantomDataBase_1 = require("../../../Phantom/PhantomBattle/Data/PhantomDataBase"),
  VisionIdentifyItem_1 = require("../../../Phantom/Vision/View/VisionIdentifyItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RoleVisionIdentifyAttribute extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.AttributeScroller = void 0),
      (this.sGe = () => new VisionIdentifyItem_1.VisionIdentifyItem());
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
      this.sGe,
    );
  }
  Refresh(e, i) {
    const n = new Array();
    e.forEach((e) => {
      var t = new PhantomDataBase_1.VisionSubPropViewData();
      (t.Data = e),
        (t.SourceView = "VisionEquipmentView"),
        (t.CurrentVisionData = i),
        n.push(t);
    }),
      this.AttributeScroller.RefreshByData(n);
  }
}
exports.RoleVisionIdentifyAttribute = RoleVisionIdentifyAttribute;
//# sourceMappingURL=RoleVisionIdentifyAttribute.js.map
