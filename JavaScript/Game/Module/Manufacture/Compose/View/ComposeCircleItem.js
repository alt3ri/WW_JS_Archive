"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeCircleItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  tempVector = new UE.Vector();
class ComposeCircleItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.ButtonFunction = void 0),
      (this.CheckToggleCanClick = void 0),
      (this.$8i = void 0),
      (this.ItemCurve = void 0),
      (this.Xpt = () => {
        this.ButtonFunction?.(this.$8i, this.$8i.MainType, !0),
          this.GetExtendToggle(1)?.SetToggleStateForce(1, !1);
      }),
      (this.UHl = () =>
        !this.CheckToggleCanClick || this.CheckToggleCanClick());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UISprite],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[1, this.Xpt]]);
  }
  OnStart() {
    this.GetExtendToggle(1)?.CanExecuteChange.Bind(this.UHl);
  }
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage(),
      t = this.ItemCurve.GetFloatValue(t);
    (tempVector.X = t),
      (tempVector.Y = t),
      (tempVector.Z = 1),
      this.GetExtendToggle(1)?.RootUIComp.SetUIItemScale(tempVector);
  }
  OnRefreshItem(t) {
    var e, i;
    (this.$8i = t) &&
      ((e =
        4 === t.MainType
          ? t.ConfigId
          : ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              t.ConfigId,
            )?.ItemId),
      (i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e)),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ItemTipsHaveNum", i),
      (i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e))) &&
      (this.SetTextureByPath(i.Icon, this.GetTexture(3)),
      (e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        i.QualityId,
      ))) &&
      (this.SetSpriteByPath(e.ComposeQualityBg, this.GetSprite(2), !1),
      (i = ModelManager_1.ModelManager.ComposeModel.GetSameGroupItem(this.$8i)),
      this.$8i?.ConfigId === i[0].ConfigId &&
        this.GetSprite(0)?.SetUIActive(!1),
      t.IsUnlock || this.GetItem(4).SetUIActive(!0));
  }
  OnSelect() {
    this.ButtonFunction?.(this.$8i, this.$8i.MainType),
      this.GetExtendToggle(1)?.SetToggleStateForce(1, !1);
  }
  OnUnSelect() {
    this.GetExtendToggle(1)?.SetToggleStateForce(0, !1);
  }
}
exports.ComposeCircleItem = ComposeCircleItem;
//# sourceMappingURL=ComposeCircleItem.js.map
