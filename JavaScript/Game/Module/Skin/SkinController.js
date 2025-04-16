"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  WeaponInstance_1 = require("../Weapon/WeaponInstance"),
  ShopSkinData_1 = require("./Data/ShopSkinData"),
  SkinBuyDetailViewData_1 = require("./Data/SkinBuyDetailViewData"),
  SkinObtainView_1 = require("./SkinObtainView"),
  SkinRootViewModel_1 = require("./SkinRootViewModel");
class SkinController extends UiControllerBase_1.UiControllerBase {
  static OpenObtainSkinView(e, i) {
    var n = new SkinObtainView_1.SkinObtainViewData();
    (n.ObtainSkinData = e),
      (n.OtherRewardData = i),
      UiManager_1.UiManager.OpenView("SkinObtainView", n);
  }
  static OpenBuyRoleSkinDetailView(e) {
    var i = new Array();
    for (const t of e) {
      const n = ShopSkinData_1.ShopSkinData.Create(t);
      i.push(n);
    }
    const n = SkinBuyDetailViewData_1.SkinBuyDetailViewData.Create(i);
    n.SetPreviewTitle("RoleSkinShopTitle_Text"),
      UiManager_1.UiManager.OpenView("SkinBuyDetailView", n);
  }
  static OpenBuyRoleSkinPreviewDetailViewByRoleSkinData(e) {
    e = SkinBuyDetailViewData_1.SkinBuyDetailViewData.CreateByRoleSkinData(e);
    e.SetPreviewTitle("RoleSkinPreviewTitle_Text"),
      UiManager_1.UiManager.OpenView("SkinBuyDetailView", e);
  }
  static OpenSkinShowView(e) {
    UiManager_1.UiManager.OpenView("SkinShowView", e);
  }
  static SkipToSkinView(e, i, n, t = -1, o) {
    var r = new SkinRootViewModel_1.SkinRootViewModel(),
      a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e);
    a instanceof WeaponInstance_1.WeaponInstance &&
      (r.SetViewData(e, a.GetIncId(), i, n),
      (r.SelectRoleSkinId = t),
      UiManager_1.UiManager.OpenView("SkinRootView", r, o));
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19165, (e) => {
      ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkin(e.bBs),
        ModelManager_1.ModelManager.RoleSkinModel.UpdateWeaponSkinFirstWearRecord(
          e.bBs,
        ),
        ModelManager_1.ModelManager.RoleSkinModel.AddRoleSkinNewFlag(e.bBs);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19165);
  }
  static nTl() {
    var e = new Protocol_1.Aki.Protocol.ep_();
    Net_1.Net.Call(22331, Protocol_1.Aki.Protocol.ep_.create(e), (e) => {
      e &&
        ModelManager_1.ModelManager.RoleSkinModel.UpdateUnlockRoleSkin(e.bBs);
    });
  }
  static CheckCanWearSkinAndShowTip() {
    var e =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        203,
      );
    return e.HasTag(-1371021686) || e.HasTag(1996802261)
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Text_ForbiddenActionInFight_Text",
        ),
        !1)
      : e.HasTag(-1504358738)
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "Text_ForbiddenActionInSwimming_Text",
          ),
          !1)
        : e.HasTag(504239013)
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Text_ForbiddenActionInClimbing_Text",
            ),
            !1)
          : !e.HasTag(40422668) ||
            (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Text_ForbiddenActionMidair_Text",
            ),
            !1);
  }
}
(exports.SkinController = SkinController).xkt = () => {
  SkinController.nTl();
};
//# sourceMappingURL=SkinController.js.map
