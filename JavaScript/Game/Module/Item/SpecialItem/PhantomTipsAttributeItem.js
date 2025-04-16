"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomTipsAttributeItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PhantomTipsAttributeItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  RefreshUi(e) {
    var a =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          e.Id,
        ),
      a =
        (this.GetText(1).ShowTextNew(a.Name),
        this.SetTextureShowUntilLoaded(a.Icon, this.GetTexture(0)),
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.Id,
          e.BaseValue,
          e.IsRatio,
        ));
    this.GetText(2).SetText(a);
  }
}
exports.PhantomTipsAttributeItem = PhantomTipsAttributeItem;
//# sourceMappingURL=PhantomTipsAttributeItem.js.map
