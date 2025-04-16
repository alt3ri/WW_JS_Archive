"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttributeSelectItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  AttributeModel_1 = require("../../../Attribute/AttributeModel"),
  CommonComponentDefine_1 = require("../../../Common/CommonComponentDefine");
class AttributeSelectItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  RefreshByData(e) {
    this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!0);
    var t =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          e.PropIndexId,
        ),
      t =
        (this.GetText(1).ShowTextNew(t.Name),
        this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(0)),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(
          e.PropItemId,
        )),
      i = t.AddType === CommonComponentDefine_1.RATIO,
      t = AttributeModel_1.TipsDataTool.GetPropRatioValue(
        t.StandardProperty,
        i,
      ),
      e =
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.PropIndexId,
          t,
          i,
        );
    this.GetText(2).SetText(e);
  }
  RefreshUi(e) {
    e
      ? this.RefreshByData(e)
      : (this.GetItem(3).SetUIActive(!0), this.GetItem(4).SetUIActive(!1));
  }
}
exports.AttributeSelectItem = AttributeSelectItem;
//# sourceMappingURL=VisionRefineAttributeSelectItem.js.map
