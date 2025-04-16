"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleVisionIdentifyAttribute = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
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
  Refresh(e, a, i) {
    const n =
        ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(
          i.RoleId,
          i.Cost,
        ),
      r = n?.GetSubAttrRecommendInfo(),
      o = r ? r.length : 0,
      s = new Array();
    e.forEach((e) => {
      var i = new PhantomDataBase_1.VisionSubPropViewData();
      if (
        ((i.Data = e),
        (i.SourceView = "VisionEquipmentView"),
        (i.CurrentVisionData = a),
        e.PhantomSubProp)
      ) {
        var t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(
            e.PhantomSubProp.Yws,
          );
        if (n)
          for (let e = 0; e < o; e++)
            t.AddType === r[e].GetAddType() &&
              t.PropId === r[e].GetAttrId() &&
              (i.NeedHighLight = !0);
      }
      s.push(i);
    }),
      this.AttributeScroller.RefreshByData(s);
  }
}
exports.RoleVisionIdentifyAttribute = RoleVisionIdentifyAttribute;
//# sourceMappingURL=RoleVisionIdentifyAttribute.js.map
