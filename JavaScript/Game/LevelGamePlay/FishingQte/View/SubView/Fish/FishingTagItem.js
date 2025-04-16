"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTagItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  LguiUtil_1 = require("../../../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class FishingTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
    ];
  }
  Refresh(e) {
    0 === e
      ? this.SetActive(!1)
      : ((e =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingPointConfigById(
            e,
          )),
        (e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTagConfig(
          e.UnlockTech,
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
        (e = UE.Color.FromHex(e.Color)),
        this.GetSprite(1).SetColor(e),
        this.SetActive(!0));
  }
}
exports.FishingTagItem = FishingTagItem;
//# sourceMappingURL=FishingTagItem.js.map
