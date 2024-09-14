"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaResultItemNew = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
class GachaResultItemNew extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ETt = 0),
      (this.PWt = 0),
      (this.xWt = void 0),
      (this.Ijt = () => {
        var e;
        switch (
          ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(this.ETt)
        ) {
          case 1:
            RoleController_1.RoleController.OpenRoleMainView(1, this.PWt, [
              this.PWt,
            ]);
            break;
          case 2:
            0 < this.PWt &&
              ((e = new WeaponTrialData_1.WeaponTrialData()).SetTrialId(
                this.PWt,
              ),
              (e = { WeaponDataList: [e], SelectedIndex: 0 }),
              UiManager_1.UiManager.OpenView("WeaponPreviewView", e));
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [9, UE.UIItem],
      [10, UE.UIItem],
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [11, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [[2, this.Ijt]]);
  }
  async OnBeforeStartAsync() {
    (this.xWt = new SmallItemGrid_1.SmallItemGrid()),
      await this.xWt.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
      this.xWt.BindOnExtendToggleClicked((e) => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      }),
      this.xWt.BindOnCanExecuteChange(() => !1);
  }
  UpdateQuality(t) {
    for (let e = 0; e < t - 1; e++)
      LguiUtil_1.LguiUtil.CopyItem(this.GetItem(10), this.GetItem(9));
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t),
      i = e.GachaQualityTexture,
      i =
        (i && this.SetSpriteByPath(i, this.GetSprite(1), !0, "GachaResultView"),
        e.GachaBgTexture);
    i && this.SetSpriteByPath(i, this.GetSprite(0), !0, "GachaResultView");
    let a = void 0;
    switch (t) {
      case 4:
        a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "NS_Fx_LGUI_GachaResultPurple",
        );
        break;
      case 5:
        a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "NS_Fx_LGUI_GachaResultGold",
        );
    }
    e = this.GetUiNiagara(11);
    a
      ? (e.SetUIActive(!0), this.SetNiagaraSystemByPath(a, e))
      : e.SetUIActive(!1);
  }
  Update(e) {
    var t = e.e9n.L8n,
      i =
        ((this.ETt = t),
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
      a = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(t),
      r = ((this.PWt = a.TrialId), e.h9n),
      s =
        (r && 0 < r?.length
          ? (this.GetItem(6).SetUIActive(!0),
            (s = {
              Type: 4,
              Data: (r = r[0]).L8n,
              QualityId: 0,
              ItemConfigId: r.L8n,
              BottomText: r.n9n.toString(),
            }),
            this.xWt?.Apply(s),
            this.xWt?.SetBottomTextVisible(1 < r.n9n))
          : (this.xWt?.SetUiActive(!1), this.GetItem(6).SetUIActive(!e.IsNew)),
        ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(t));
    let o = 0;
    var h;
    1 === s
      ? (this.GetItem(3).SetUIActive(!0),
        (r = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(t)),
        (s = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
          r.ElementId,
        )) &&
          ((h = this.GetTexture(4)),
          this.SetTextureByPath(s.Icon, h),
          (s = UE.Color.FromHex(s.ElementColor)),
          h.SetColor(s)),
        (o = r.QualityId),
        this.GetItem(5).SetUIActive(e.IsNew))
      : (this.GetItem(3).SetUIActive(!0),
        (h =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            t,
          )),
        (s =
          ConfigManager_1.ConfigManager.GachaConfig.GetGachaWeaponTransformConfig(
            h?.WeaponType,
          )) && this.SetTextureByPath(s.WeaponTypeTexture, this.GetTexture(4)),
        (o = i.QualityId),
        this.GetItem(5).SetUIActive(e.IsNew),
        this.GetItem(6).SetUIActive(!1)),
      this.UpdateQuality(o),
      this.SetTextureByPath(
        a.GachaResultViewTexture,
        this.GetTexture(8),
        "GachaResultView",
      );
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  RefreshShare() {
    this.GetItem(5).SetUIActive(!1), this.GetItem(6).SetUIActive(!1);
  }
}
exports.GachaResultItemNew = GachaResultItemNew;
//# sourceMappingURL=GachaResultItemNew.js.map
