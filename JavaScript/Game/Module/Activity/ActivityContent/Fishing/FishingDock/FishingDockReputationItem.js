"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingDockReputationItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  HelpController_1 = require("../../../../Help/HelpController"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../FishingDefine");
class FishingDockReputationItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.pcr = () => {
        HelpController_1.HelpController.OpenHelpById(
          FishingDefine_1.SAILING_REPUTATION_HELP_ID,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.pcr]]);
  }
  OnStart() {
    this.RefreshItem();
  }
  RefreshItem() {
    var e = ModelManager_1.ModelManager.FishingModel.FishingReputationItemId;
    let i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e);
    var e =
        ModelManager_1.ModelManager.FishingModel.GetFishingReputationLevelByItemCount(
          i,
        ),
      r =
        ModelManager_1.ModelManager.FishingModel.GetConfigMaxFishingReputationLevel();
    let a = 0;
    r <= e
      ? ((n =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingReputationByLevel(
            r - 1,
          )),
        (r =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingReputationByLevel(
            r,
          )),
        (a = r.Exp - n.Exp),
        (i -= n.Exp))
      : 1 <= e &&
        ((r =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingReputationByLevel(
            e,
          )),
        (n =
          ConfigManager_1.ConfigManager.FishingConfig.GetFishingReputationByLevel(
            e + 1,
          )),
        (a = n.Exp - r.Exp),
        (i -= r.Exp));
    var n = i / a;
    this.GetTexture(0).SetFillAmount(n < 1 ? n : 1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "PrefabTextItem_3692737534_Text",
        e,
      ),
      this.GetText(2).SetText(i + "/" + a);
  }
}
exports.FishingDockReputationItem = FishingDockReputationItem;
//# sourceMappingURL=FishingDockReputationItem.js.map
