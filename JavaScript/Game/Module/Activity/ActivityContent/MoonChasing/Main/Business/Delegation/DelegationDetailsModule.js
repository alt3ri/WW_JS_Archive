"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DelegationDetailsModule = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../../../../Common/Button/ButtonItem"),
  CommonCostItem_1 = require("../../../../../../Common/PropItem/CommonCostItem"),
  ConfirmBoxController_1 = require("../../../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  BusinessDefine_1 = require("../BusinessDefine"),
  CharacterItem_1 = require("../Common/Character/CharacterItem"),
  CharacterListModule_1 = require("../Common/Character/CharacterListModule"),
  CharacterNameWithBg_1 = require("../Common/Character/CharacterNameWithBg"),
  EditTeamModule_1 = require("../Common/EditTeamModule"),
  DelegationRoleModule_1 = require("./DelegationRoleModule");
class StarItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(t, e, i) {}
}
class DelegationDetailsModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RecommendLayout = void 0),
      (this.CharacterListModule = void 0),
      (this.RoleModule = void 0),
      (this.FirstCost = void 0),
      (this.SecondCost = void 0),
      (this.EditTeamModule = void 0),
      (this.Data = void 0),
      (this.SelectedRoleIdSet = new Set()),
      (this.StarLayout = void 0),
      (this.HelperBtn = void 0),
      (this.dke = () => new CharacterItem_1.CharacterItem()),
      (this.pke = () => new CharacterNameWithBg_1.CharacterNameWithBg()),
      (this.vke = () => new StarItem()),
      (this.Mke = () => {
        var t, e;
        0 === this.SelectedRoleIdSet.size
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Text_EditBattleTeamLastRole_Text",
            )
          : ((t = () => {
              var t = Array.from(this.SelectedRoleIdSet);
              ControllerHolder_1.ControllerHolder.MoonChasingController.AcceptDelegateRequest(
                this.Data.Id,
                t,
              );
            }),
            this.SelectedRoleIdSet.size < BusinessDefine_1.ROLELIST_MAX &&
            this.SelectedRoleIdSet.size < this.EditTeamModule.GetDataLength()
              ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  187,
                )).FunctionMap.set(2, t),
                ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                ))
              : t());
      }),
      (this.pMa = () => {
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHelperView();
      }),
      (this.yke = (t, e) => {
        e ? this.SelectedRoleIdSet.add(t) : this.SelectedRoleIdSet.delete(t),
          this.RoleModule?.Refresh(this.SelectedRoleIdSet),
          this.Ike().finally(void 0),
          this.Tke();
      }),
      (this.Lke = (t, e) =>
        1 === e ||
        this.SelectedRoleIdSet.size < BusinessDefine_1.ROLELIST_MAX ||
        !!this.SelectedRoleIdSet.has(t) ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Moonfiesta_PartnerFull",
        ),
        !1)),
      (this.fda = (t) => this.SelectedRoleIdSet.has(t));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILayoutBase],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UILayoutBase],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[12, this.Mke]]);
  }
  async ido() {
    (this.FirstCost = new CommonCostItem_1.CommonCostItem()),
      (this.SecondCost = new CommonCostItem_1.CommonCostItem()),
      await Promise.all([
        this.FirstCost.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()),
        this.SecondCost.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()),
      ]);
  }
  async Dma() {
    (this.RoleModule = new DelegationRoleModule_1.DelegationRoleModule()),
      await this.RoleModule.CreateThenShowByActorAsync(
        this.GetItem(9).GetOwner(),
      );
  }
  async PAr() {
    (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
      this.dke,
    )),
      await this.CharacterListModule.CreateThenShowByActorAsync(
        this.GetItem(8).GetOwner(),
      );
  }
  async Ama() {
    (this.EditTeamModule = new EditTeamModule_1.EditTeamModule()),
      this.EditTeamModule.SetClickEvent(this.yke),
      this.EditTeamModule.SetCanExecuteChange(this.Lke),
      this.EditTeamModule.SetIsItemSelected(this.fda);
    var t =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetOwnEditTeamDataList();
    this.EditTeamModule.SetEditTeamDataList(t),
      await this.EditTeamModule.CreateThenShowByResourceIdAsync(
        "UiItem_EntrustCharacterRoleList",
        this.GetItem(13),
      );
  }
  HWs() {
    (this.HelperBtn = new ButtonItem_1.ButtonItem(this.GetItem(14))),
      this.HelperBtn.SetFunction(this.pMa);
  }
  async OnBeforeStartAsync() {
    (this.RecommendLayout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(6),
      this.pke,
      this.GetItem(7).GetOwner(),
    )),
      (this.StarLayout = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(1),
        this.vke,
        this.GetItem(2).GetOwner(),
      )),
      await Promise.all([this.PAr(), this.ido(), this.Dma(), this.Ama()]),
      this.HWs();
  }
  async OnBeforeShowAsyncImplement() {
    await this.RefreshAsync();
  }
  OnAfterHide() {
    this.HelperBtn.UnBindRedDot(), this.SelectedRoleIdSet.clear();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 2)) {
      var e = t[1],
        i = this.GetGuideUiItem(e);
      switch (e) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
          return void 0 === i ? void 0 : [i, i];
        case "EditTeam":
          return this.EditTeamModule?.GetGuideUiItemAndUiItemForShowEx(t);
        default:
          return;
      }
    }
  }
  mGe() {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
  }
  aqe() {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Data.Id,
    );
    this.StarLayout.RefreshByDataAsync([], !1, t.Star).finally(void 0);
  }
  Dke() {
    var t = ConfigManager_1.ConfigManager.BusinessConfig.GetDelegationConfig(
      this.Data.Id,
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Content);
  }
  Rke() {
    var t;
    this.GetItem(4).SetUIActive(this.Data.HasBestEvaluate()),
      this.Data.HasBestEvaluate() &&
        ((t = ConfigManager_1.ConfigManager.BusinessConfig.GetEvaluateByLevel(
          this.Data.BestEvaluateLevel,
        )),
        this.SetTextureByPath(t.Icon, this.GetTexture(5)));
  }
  async Uke() {
    var t = this.Data.GetRecommendList();
    await this.RecommendLayout.RefreshByDataAsync(t);
  }
  async Ike() {
    var t =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetCharacterValueListByRoleIds(
          this.SelectedRoleIdSet,
          !1,
        ),
      e =
        (await this.CharacterListModule.RefreshByDataAsync(t),
        this.Data.GetRecommendList());
    for (const i of this.CharacterListModule.GetItemList())
      i.SetGoodItemActive(e.includes(i.GetId()));
  }
  async Uma() {
    var t =
      ModelManager_1.ModelManager.MoonChasingBusinessModel.GetOwnEditTeamDataList();
    this.EditTeamModule.SetEditTeamDataList(t),
      await this.EditTeamModule.RefreshEditTeamModule();
  }
  Ake() {
    this.RoleModule.Refresh(this.SelectedRoleIdSet);
  }
  Pke() {
    var t = this.Data.GetConsumeList(),
      e = t[0],
      e =
        (this.FirstCost.UpdateItem(e.ItemId, e.Count),
        this.FirstCost.RefreshCountEnableState(),
        t[1]);
    this.SecondCost.UpdateItem(e.ItemId, e.Count),
      this.SecondCost.RefreshCountEnableState();
  }
  Tke() {
    this.GetButton(12).SetSelfInteractive(
      this.FirstCost.IsEnough && this.SecondCost.IsEnough,
    );
  }
  BNe() {
    this.HelperBtn.BindRedDot("MoonChasingRole");
  }
  SetDelegationData(t) {
    this.Data = t;
  }
  async RefreshAsync() {
    this.mGe(),
      this.aqe(),
      this.Dke(),
      this.Rke(),
      await Promise.all([this.Uma(), this.Uke(), this.Ike()]),
      this.Ake(),
      this.Pke(),
      this.Tke(),
      this.BNe();
  }
}
exports.DelegationDetailsModule = DelegationDetailsModule;
//# sourceMappingURL=DelegationDetailsModule.js.map
