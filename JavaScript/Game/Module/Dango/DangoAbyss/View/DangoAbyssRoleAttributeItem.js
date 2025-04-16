"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssRoleAttributeItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoAbyssRoleAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UISprite],
    ];
  }
  Refresh(e) {
    var r =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          e.Id,
        ),
      r =
        (this.SetTextureByPath(r.Icon, this.GetTexture(4)),
        this.GetText(0).ShowTextNew(r.Name),
        this.GetItem(2).SetUIActive(!1),
        this.GetText(3).SetUIActive(!1),
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.Id,
          e.BaseValue + e.AddValue,
          e.IsRatio,
        ));
    this.GetText(1).SetText(r);
  }
}
exports.DangoAbyssRoleAttributeItem = DangoAbyssRoleAttributeItem;
//# sourceMappingURL=DangoAbyssRoleAttributeItem.js.map
