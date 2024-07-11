"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonLevelUpAttributeItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class CommonLevelUpAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
    ];
  }
  Update(e) {
    const t =
      ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
        e.Id,
      );
    this.SetTextureByPath(t.Icon, this.GetTexture(4)),
      this.GetText(0).ShowTextNew(t.Name),
      this.GetText(1).SetText(
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.Id,
          e.BaseValue,
          e.IsRatio,
        ),
      ),
      this.GetText(3).SetText(
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          e.Id,
          e.AddValue,
          e.IsRatio,
        ),
      ),
      this.GetItem(2).SetUIActive(e.AddValue - e.BaseValue > 0),
      this.GetText(3).SetUIActive(e.AddValue - e.BaseValue > 0);
  }
}
exports.CommonLevelUpAttributeItem = CommonLevelUpAttributeItem;
// # sourceMappingURL=CommonLevelUpAttributeItem.js.map
