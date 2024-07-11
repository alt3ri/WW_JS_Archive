"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookMaterialItem = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CookMaterialItemContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wGt = void 0),
      (this.ClickDelegate = void 0),
      (this.OnClick = () => {
        this?.ClickDelegate();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UISprite],
      [11, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[4, this.OnClick]]);
  }
  SetSelect() {
    this.GetExtendToggle(4).SetToggleState(1, !1);
  }
  SetDelect() {
    this.GetExtendToggle(4).SetToggleState(0, !1);
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(!0),
      this.GetTexture(1).SetUIActive(!0),
      this.GetText(2).SetUIActive(!0),
      this.GetExtendToggle(4)
        .GetOwner()
        .GetComponentByClass(UE.UIItem.StaticClass())
        .SetUIActive(!0),
      this.GetItem(3).SetUIActive(!0),
      this.GetItem(5).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(7).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetText(9).SetUIActive(!1),
      this.GetSprite(10).SetUIActive(!1),
      this.GetSprite(11).SetUIActive(!1);
  }
  Update(t) {
    (this.wGt = t), this.RefreshHave(), this.Kbe(), this.BGt();
  }
  RefreshNeed(t = 1) {
    this.RefreshHave(t);
  }
  RefreshHave(t = 1) {
    var t = this.wGt.MVn * t,
      i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        this.wGt.f8n,
      );
    let e = void 0;
    (e = this.wGt.G6n
      ? i < this.wGt.MVn
        ? StringUtils_1.StringUtils.Format(
            CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN,
            i.toString(),
            t.toString(),
          )
        : StringUtils_1.StringUtils.Format(
            CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN,
            i.toString(),
            t.toString(),
          )
      : StringUtils_1.StringUtils.Format(
          CommonDefine_1.MATERIAL_NEED_SELECT_TEXT_PATTERN,
          t.toString(),
        )),
      this.GetText(2).SetText(e);
  }
  Kbe() {
    var t;
    this.wGt.G6n
      ? (this.GetTexture(1).SetUIActive(!0),
        (t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.wGt.f8n)),
        this.SetTextureByPath(t.Icon, this.GetTexture(1)))
      : this.GetTexture(1).SetUIActive(!1);
  }
  BGt() {
    this.wGt.G6n
      ? (this.GetSprite(0).SetUIActive(!0),
        this.SetItemQualityIcon(this.GetSprite(0), this.wGt.f8n))
      : this.GetSprite(0).SetUIActive(!1);
  }
  OnBeforeDestroy() {}
}
class CookMaterialItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.yGe = void 0),
      (this.Xy = 0),
      (this.oft = void 0),
      (this.wGt = void 0),
      (this.OnClick = () => {
        this?.oft(this.wGt, this.Xy);
      });
  }
  BindOnClickedCallback(t) {
    (this.oft = void 0), (this.oft = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    (this.yGe = new CookMaterialItemContent()),
      this.yGe.CreateThenShowByActor(this.GetItem(0).GetOwner()),
      (this.yGe.ClickDelegate = void 0),
      (this.yGe.ClickDelegate = this.OnClick);
  }
  Update(t, i) {
    (this.wGt = t), this.yGe.Update(t), (this.Xy = i);
  }
  UpdateSelectedState(t) {
    t === this.Xy ? this.yGe.SetSelect() : this.yGe.SetDelect();
  }
  RefreshNeed(t = 1) {
    this.yGe.RefreshNeed(t);
  }
  OnBeforeDestroy() {
    this.yGe.Destroy();
  }
}
exports.CookMaterialItem = CookMaterialItem;
//# sourceMappingURL=CookMaterialItem.js.map
