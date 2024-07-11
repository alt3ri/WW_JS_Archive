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
      (this.bjt = void 0),
      (this.Hjt = () => new GachaShareResultItem_1.GachaShareResultItem());
  }
  async OnBeforeStartAsync() {
    this.bjt = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(0),
      this.Hjt,
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
            e.u5n.G3n,
          )?.QualityId ?? 0,
        t =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
            a.u5n.G3n,
          )?.QualityId ?? 0;
      return r === t
        ? ((e = n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.u5n.G3n),
          )),
          n(
            ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(a.u5n.G3n),
          ) - e)
        : t - r;
    }),
      await this.bjt.RefreshByDataAsync(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout]];
  }
  GetGachaResultItemLayout() {
    return this.GetGridLayout(0);
  }
  OnBeforeDestroy() {
    this.bjt?.ClearChildren();
  }
}
exports.GachaShareTenPanel = GachaShareTenPanel;
//# sourceMappingURL=GachaShareTenPanel.js.map
