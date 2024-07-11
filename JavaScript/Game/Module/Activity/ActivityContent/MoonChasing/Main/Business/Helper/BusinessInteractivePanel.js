"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BusinessInteractivePanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase"),
  CommonCostItem_1 = require("../../../../../../Common/PropItem/CommonCostItem"),
  ConfirmBoxController_1 = require("../../../../../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../../../../../ConfirmBox/ConfirmBoxDefine"),
  GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../../Util/LguiUtil"),
  CharacterItem_1 = require("../Common/Character/CharacterItem"),
  CharacterListModule_1 = require("../Common/Character/CharacterListModule");
class InteractiveItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Gke = void 0),
      (this.Pe = void 0),
      (this.Raa = void 0),
      (this.xke = () => {
        this.Gke?.(this.Pe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UITextureTransitionComponent],
      [3, UE.UIText],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.xke]]);
  }
  async OnBeforeStartAsync() {
    (this.Raa = new CommonCostItem_1.CommonCostItem()),
      await this.Raa.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  Refresh(e, t, i) {
    (this.Pe = e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.TrainContent);
    var r = ConfigManager_1.ConfigManager.BusinessConfig.GetWishItemId(),
      r =
        (this.Raa.UpdateItem(r, e.WishConsume),
        this.Raa.RefreshCountEnableState(),
        this.GetButton(0)?.SetSelfInteractive(!0),
        ConfigManager_1.ConfigManager.BusinessConfig.GetRoleDevelopTypeById(
          e.TrainType,
        ));
    this.SetTextureByPath(r.Icon, this.GetTexture(1), void 0, () => {
      this.GetUiTextureTransitionComponent(2).SetAllStateTexture(
        this.GetTexture(1).GetTexture(),
      );
    });
  }
  SetButtonFunction(e) {
    this.Gke = e;
  }
}
class BusinessInteractivePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RoleId = 0),
      (this.CharacterListModule = void 0),
      (this.InteractiveLayout = void 0),
      (this.zGn = void 0),
      (this.Nke = (e) => {
        var t;
        ModelManager_1.ModelManager.MoonChasingModel.GetWishValue() <
        e.WishConsume
          ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              206,
            )).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBusinessMainView();
            }),
            ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(t))
          : ControllerHolder_1.ControllerHolder.MoonChasingController.RoleTrainRequest(
              this.RoleId,
              e.TrainType,
            );
      }),
      (this.Oke = () => {
        var e = new InteractiveItem();
        return e.SetButtonFunction(this.Nke), e;
      }),
      (this.dke = () => new CharacterItem_1.CharacterItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UILayoutBase],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.InteractiveLayout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(3),
      this.Oke,
      this.GetItem(4).GetOwner(),
    )),
      (this.CharacterListModule = new CharacterListModule_1.CharacterListModule(
        this.dke,
      )),
      await Promise.all([
        this.CharacterListModule.CreateThenShowByActorAsync(
          this.GetItem(1).GetOwner(),
        ),
      ]);
  }
  async OnBeforeShowAsyncImplement() {
    (this.RoleId = this.zGn.SelectedRoleId), await this.Refresh();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetGuideUiItem("1");
    if (t) return [t, t];
  }
  RegisterViewController(e) {
    this.zGn = e;
  }
  async Refresh() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
        this.RoleId,
      ),
      t =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(
          this.RoleId,
        ),
      e =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Name),
        this.GetText(2)?.SetText(t.Level.toString()),
        ConfigManager_1.ConfigManager.BusinessConfig.GetRoleDevelopCurveByGroupId(
          e.ExPropertyCurve,
        ));
    await Promise.all([
      this.InteractiveLayout.RefreshByDataAsync(e),
      this.CharacterListModule.RefreshByDataAsync(t.GetCharacterDataList()),
    ]);
  }
}
exports.BusinessInteractivePanel = BusinessInteractivePanel;
//# sourceMappingURL=BusinessInteractivePanel.js.map
