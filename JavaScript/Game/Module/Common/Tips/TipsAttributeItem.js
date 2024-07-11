"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsAttributeItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TipsAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  UpdateItem(e) {
    const a =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexName(
        e.Id,
      );
    this.GetText(0).ShowTextNew(a),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.Id,
          e.Value,
          e.IsRatio,
        ),
      );
  }
}
exports.TipsAttributeItem = TipsAttributeItem;
// # sourceMappingURL=TipsAttributeItem.js.map
