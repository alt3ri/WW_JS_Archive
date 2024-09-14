"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaShareOnePanel = void 0);
const UE = require("ue"),
  GaChaShareById_1 = require("../../../../Core/Define/ConfigQuery/GaChaShareById"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class GachaShareOnePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.$be = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UISprite],
    ];
  }
  OnStart() {
    (this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
      this.GetHorizontalLayout(1),
    )),
      this.PKt();
  }
  PKt() {
    var e = this.OpenParam.e9n.L8n,
      i = GaChaShareById_1.configGaChaShareById.GetConfig(e),
      i =
        (this.SetTextureByPath(i.SharePic, this.GetTexture(0)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.Desc),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e)),
      i =
        (this.$be.RebuildLayout(i.QualityId),
        this.GetText(3).ShowTextNew(i.Name),
        this.GetTexture(5)),
      a = this.GetSprite(7),
      r = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e);
    this.GetItem(4).SetUIActive(2 === r),
      i.SetUIActive(1 === r),
      a.SetUIActive(1 !== r),
      1 === r
        ? ((r =
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
              e,
            ).ElementId),
          (r = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(r)),
          this.SetTextureByPath(r.Icon, i),
          i.SetColor(UE.Color.FromHex(r.ElementColor)))
        : ((i =
            ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
              e,
            )),
          (r = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponIconPath(
            i.WeaponType,
          )),
          this.SetSpriteByPath(r, a, !1));
  }
}
exports.GachaShareOnePanel = GachaShareOnePanel;
//# sourceMappingURL=GachaShareOnePanel.js.map
