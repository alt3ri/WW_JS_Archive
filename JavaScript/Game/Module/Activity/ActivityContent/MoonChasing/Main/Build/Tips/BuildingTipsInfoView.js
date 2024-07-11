"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingTipsInfoView = void 0);
const UE = require("ue"),
  LevelGeneralCommons_1 = require("../../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../../../../Common/Button/ButtonItem"),
  CommonCostItem_1 = require("../../../../../../Common/PropItem/CommonCostItem"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  BuildingAttributeItem_1 = require("./BuildingAttributeItem"),
  BuildingTipsInfoViewController_1 = require("./BuildingTipsInfoViewController");
class BuildingTipsInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CostItem = void 0),
      (this.ConfirmItem = void 0),
      (this.CaptionItem = void 0),
      (this.AttrLayout = void 0),
      (this.zGn =
        new BuildingTipsInfoViewController_1.BuildingTipsInfoViewController()),
      (this.G1o = () => new BuildingAttributeItem_1.BuildingAttributeItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
      [16, UE.UIItem],
      [17, UE.UILayoutBase],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [13, this.zGn.SwitchPrev],
        [14, this.zGn.SwitchNext],
        [15, this.zGn.JumpToMap],
        [22, this.zGn.JumpToConditionTip],
      ]);
  }
  async zDn() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(16),
    )),
      this.CaptionItem.SetCloseCallBack(this.zGn.CloseSelf);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    await this.CaptionItem.SetCurrencyItemList([i]);
  }
  async ido() {
    (this.CostItem = new CommonCostItem_1.CommonCostItem()),
      await this.CostItem.CreateThenShowByActorAsync(
        this.GetItem(8).GetOwner(),
      );
  }
  dAn() {
    this.AttrLayout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(17),
      this.G1o,
      this.GetItem(18).GetOwner(),
    );
  }
  async OnBeforeStartAsync() {
    this.zGn.RegisterView(this),
      (this.ConfirmItem = new ButtonItem_1.ButtonItem(this.GetItem(9))),
      this.ConfirmItem.SetFunction(this.zGn.UnlockOrLevelUp),
      this.dAn(),
      await Promise.all([this.ido(), this.zDn()]);
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.zGn.Refresh();
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    return i.length < 1 ||
      "Cost" !== i[0] ||
      void 0 === (i = this.CaptionItem.GetCostContent())
      ? void 0
      : [i, i];
  }
  RefreshText(i) {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          i,
        ),
      t = this.GetText(2),
      s = this.GetText(1),
      n = this.GetText(3),
      i =
        (t.SetUIActive(e.IsUnlock),
        ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i));
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, i.Name),
      LguiUtil_1.LguiUtil.SetLocalTextNew(n, i.Desc),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        t,
        "Moonfiesta_BuildingLevelShow",
        e.Level,
        e.LevelMax,
      );
  }
  async RefreshAttribute(i) {
    (i =
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
        i,
      )),
      (i = i.GetAdditionDataList(i.Level + 1));
    await this.AttrLayout.RefreshByDataAsync(i);
  }
  RefreshRoleItem(i) {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          i,
        ),
      t = this.GetItem(4);
    e.IsUnlock
      ? (t.SetUIActive(!e.IsBuild),
        e.IsBuild ||
          ((e =
            ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i)),
          (i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
            e.AssociateRole,
          )),
          this.SetTextureByPath(i.SmallHeadIcon, this.GetTexture(5)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.RoleTips)))
      : t.SetUIActive(!1);
  }
  RefreshBottom(i) {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          i,
        ),
      t = this.GetItem(7),
      s = this.GetItem(10),
      n = this.GetItem(12);
    t.SetUIActive(e.IsUnlock && !e.IsMax),
      s.SetUIActive(!e.IsUnlock),
      n.SetUIActive(e.IsMax),
      e.IsUnlock
        ? e.IsMax ||
          ((t = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId()),
          this.CostItem.UpdateItem(t, e.GetConsumeCount()),
          this.CostItem.RefreshCountEnableState(),
          e.IsBuild
            ? this.ConfirmItem.SetShowText("PrefabTextItem_3945913769_Text")
            : this.ConfirmItem.SetShowText("Moonfiesta_BuildingTips_Building"))
        : ((s =
            ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i)),
          (n =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              s.UnlockCondition,
            )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), n));
  }
  RefreshTexture(i) {
    var e =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(
          i,
        ),
      i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(i);
    this.GetButton(15)?.RootUIComp.SetUIActive(!1),
      this.GetButton(13)?.RootUIComp.SetUIActive(!1),
      this.GetButton(14)?.RootUIComp.SetUIActive(!1),
      e.IsUnlock
        ? e.IsBuild
          ? this.SetTextureByPath(i.BuildingTexture, this.GetTexture(0))
          : ((i =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                "T_BuildItemBUnlock",
              )),
            this.SetTextureByPath(i, this.GetTexture(0)))
        : ((i =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "T_BuildItemBLock",
            )),
          this.SetTextureByPath(i, this.GetTexture(0))),
      this.GetItem(19)?.SetUIActive(!e.IsBuild),
      this.GetItem(20)?.SetUIActive(e.IsBuild),
      this.GetItem(21)?.SetUIActive(e.IsBuild);
  }
}
exports.BuildingTipsInfoView = BuildingTipsInfoView;
//# sourceMappingURL=BuildingTipsInfoView.js.map
