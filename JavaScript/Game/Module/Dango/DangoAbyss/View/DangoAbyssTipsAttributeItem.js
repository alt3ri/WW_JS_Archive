"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssTipsAttributeItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AttributeModel_1 = require("../../../Attribute/AttributeModel"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoAbyssTipsAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  Refresh(e, t, r) {
    var i =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          e.Id,
        ),
      i =
        (this.GetText(1).ShowTextNew(i.Name),
        this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(0)),
        AttributeModel_1.TipsDataTool.GetPropRatioValue(
          e.BaseValue,
          e.IsRatio,
        )),
      i =
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.Id,
          i,
          e.IsRatio,
        );
    this.GetText(2).SetText(i);
  }
}
exports.DangoAbyssTipsAttributeItem = DangoAbyssTipsAttributeItem;
//# sourceMappingURL=DangoAbyssTipsAttributeItem.js.map
