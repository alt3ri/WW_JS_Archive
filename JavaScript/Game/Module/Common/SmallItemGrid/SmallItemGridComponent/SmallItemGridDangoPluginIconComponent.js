"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmallItemGridDangoPluginIconComponent = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  DangoAbyssDefine_1 = require("../../../Dango/DangoAbyss/DangoAbyssDefine"),
  SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridDangoPluginIconComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
    ];
  }
  GetLayoutLevel() {
    return 2;
  }
  GetResourceId() {
    return "UiItem_ItemChipIcon";
  }
  RefreshByInfo(e) {
    this.OnRefresh(e);
  }
  OnRefresh(e) {
    var n,
      o,
      e = e.PluginItemId,
      r = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e),
      e =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemQualityIcon(e);
    r && "" !== e
      ? ((o = r.SlotType),
        (n = this.GetTexture(1)),
        (o = DangoAbyssDefine_1.iconSizeBySlotType.get(o)),
        n.SetWidth(o),
        n.SetHeight(o),
        this.SetTextureByPath(e, this.GetTexture(0)),
        this.SetTextureByPath(r.IconMiddle, n),
        this.SetActive(!0))
      : this.SetActive(!1);
  }
}
exports.SmallItemGridDangoPluginIconComponent =
  SmallItemGridDangoPluginIconComponent;
//# sourceMappingURL=SmallItemGridDangoPluginIconComponent.js.map
