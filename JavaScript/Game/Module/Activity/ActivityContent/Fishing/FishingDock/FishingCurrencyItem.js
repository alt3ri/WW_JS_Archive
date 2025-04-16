"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingCurrencyItem = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  HelpController_1 = require("../../../../Help/HelpController"),
  FishingDefine_1 = require("../FishingDefine");
class FishingCurrencyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.cU_ = void 0),
      (this.nqe = () => {
        HelpController_1.HelpController.OpenHelpById(
          FishingDefine_1.SAILING_DURABILITY_HELP_ID,
        );
      }),
      (this.Ruc = () => {
        this.RefreshItem();
      }),
      (this._k_ = () => {
        this.RefreshItem();
        var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
        e.AddAttributeListener(
          CharacterAttributeTypes_1.EAttributeId.Proto_Life,
          this.Ruc,
        ),
          e.AddAttributeListener(
            CharacterAttributeTypes_1.EAttributeId.l5n,
            this.Ruc,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UITextureTransitionComponent],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.nqe]]);
  }
  async OnBeforeStartAsync() {
    (this.cU_ = new UiPanelBase_1.UiPanelBase()),
      await this.cU_.CreateThenShowByResourceIdAsync(
        "PnlNavigationMainCostTip",
        this.RootItem,
      );
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingShipDataRefresh,
      this._k_,
    ),
      this.GetTexture(0)?.SetUIActive(!1),
      this.GetButton(2)?.RootUIComp.SetUIActive(!1),
      this.GetItem(5)?.SetUIActive(!1),
      this.GetItem(8)?.SetUIActive(!1);
    var e = this.GetSprite(7),
      t =
        (e.SetUIActive(!0),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "SP_FightHp",
        ));
    this.SetSpriteByPath(t, e, !1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingShipDataRefresh,
      this._k_,
    );
    var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
    e.RemoveAttributeListener(
      CharacterAttributeTypes_1.EAttributeId.Proto_Life,
      this.Ruc,
    ),
      e.RemoveAttributeListener(
        CharacterAttributeTypes_1.EAttributeId.l5n,
        this.Ruc,
      );
  }
  OnBeforeShow() {
    this.RefreshItem();
  }
  RefreshItem() {
    var e = ModelManager_1.ModelManager.FishingModel.GetShipData(),
      t = e.GetCurrentHp(),
      e = e.GetMaxHp(),
      e =
        (this.GetText(1).SetText(t + "/" + e),
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "FishingLowFixTips",
        ) ?? 0);
    this.cU_?.SetUiActive(t < e);
  }
}
exports.FishingCurrencyItem = FishingCurrencyItem;
//# sourceMappingURL=FishingCurrencyItem.js.map
