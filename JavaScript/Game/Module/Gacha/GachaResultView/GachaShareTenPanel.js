"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaShareTenPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  GachaShareResultItem_1 = require("./GachaShareResultItem");
class GachaShareTenPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.bWt = void 0),
      (this.HWt = () => new GachaShareResultItem_1.GachaShareResultItem());
  }
  async OnBeforeStartAsync() {
    this.bWt = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(0),
      this.HWt,
    );
    var e = this.OpenParam;
    const n = (e) => {
      switch (e) {
        case 1:
          return 2;
        case 2:
          return 1;
        default:
          return 0;
      }
    };
    e = [...e];
    e.sort((e, a) => {
      var r =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            e.WVn.f8n,
          )?.QualityId ?? 0,
        t =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            a.WVn.f8n,
          )?.QualityId ?? 0;
      return r === t
        ? ((e = n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.WVn.f8n),
          )),
          n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(a.WVn.f8n),
          ) - e)
        : t - r;
    }),
      await this.bWt.RefreshByDataAsync(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  GetGachaResultItemLayout() {
    return this.GetGridLayout(0);
  }
  OnBeforeDestroy() {
    this.bWt?.ClearChildren();
  }
}
exports.GachaShareTenPanel = GachaShareTenPanel;
//# sourceMappingURL=GachaShareTenPanel.js.map
