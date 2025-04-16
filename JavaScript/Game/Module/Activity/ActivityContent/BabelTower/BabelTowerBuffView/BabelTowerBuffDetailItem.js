"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerBuffDetailItem = void 0);
const UE = require("ue"),
  BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById"),
  BabelTowerDeTermById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  BabelTowerBuffStarAndDescItem_1 = require("./BabelTowerBuffStarAndDescItem");
class BabelTowerBuffDetailItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Ucc = void 0), (this.Pe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [2, UE.UITexture],
      [1, UE.UITexture],
      [4, UE.UIItem],
      [3, UE.UINiagara],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Ucc =
      new BabelTowerBuffStarAndDescItem_1.BabelTowerBuffStarAndDescItem()),
      await this.Ucc.CreateThenShowByResourceIdAsync(
        "UiItem_TipsBuff",
        this.GetItem(4),
      );
  }
  Update(e) {
    (this.Pe = e), this.Refresh();
  }
  Refresh() {
    if (this.Pe) {
      let e = void 0,
        i = void 0,
        r = void 0,
        t = void 0;
      (t = (
        this.Pe.IsDeTerm
          ? ((a = BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(
              this.Pe.Id,
            )),
            (e = a.NameText),
            (i = a.Texture),
            (r = a.DesText),
            a)
          : ((a = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(
              this.Pe.Id,
            )),
            (e = a.NameText),
            (i = a.Texture),
            (r = a.DesText),
            a)
      ).Star),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e),
        this.Ucc.Refresh(t.toString(), this.Pe.ShowStar ?? !1, r),
        this.SetTextureByPath(i, this.GetTexture(2));
      var a =
          ModelManager_1.ModelManager.BabelTowerModel.CoverStarNumToQualityId(
            t,
          ),
        s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_TipsQualityTypeLevel" + a,
        ),
        s =
          (this.SetTextureByPath(s, this.GetTexture(1)),
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(a)
            .QualityColor),
        a = UE.Color.FromHex(s),
        s = this.GetUiNiagara(3);
      s.SetColor(a), s.ActivateSystem(!0);
    }
  }
}
exports.BabelTowerBuffDetailItem = BabelTowerBuffDetailItem;
//# sourceMappingURL=BabelTowerBuffDetailItem.js.map
