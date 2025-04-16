"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleBuyRoleView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  MapRoguePopupBase_1 = require("../../MapRogue/View/Components/MapRoguePopupBase"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueBattleBuyRoleItem_1 = require("../Component/RogueBattleBuyRoleItem"),
  RogueBattleFetterInfoItem_1 = require("../Component/RogueBattleFetterInfoItem");
class RogueBattleBuyRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.iJl = void 0),
      (this._Xe = 0),
      (this.am1 = void 0),
      (this.hm1 = void 0),
      (this.iJs = void 0),
      (this.JGn = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenMapHelpView();
      }),
      (this.lm1 = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
        e &&
          (e.Select(Protocol_1.Aki.Protocol.Zc1.Proto_GiveUp), this.CloseMe());
      }),
      (this.ilo = () => {
        var e,
          t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
        t &&
          ((e = this.iJl.Uac).qN_ >
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            e.L8n,
          )
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "RogueBattle_BuyItemNotEnough",
              )
            : t.Select(e.c5n));
      }),
      (this.vlo = () => {
        var e,
          t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
        t &&
          ((e = t.Data.oac.uac).Yu1 >
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            e.Xu1,
          )
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "RogueBattle_RefreshItemNotEnough",
              )
            : e.Pr1 >= e.Ar1
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                  "RogueBattle_RefreshCountMax",
                )
              : t.Select(Protocol_1.Aki.Protocol.Zc1.Proto_Refresh));
      }),
      (this.UIi = (e, t) => {
        (this.iJl = t),
          this.GetButton(3).SetSelfInteractive(!0),
          this.am1?.SelectGridProxy(e),
          this.GetButton(3).SetSelfInteractive(!t.Uac?.O2s);
        let i = t.Uac.Ud1;
        t.Uac.Ud1 > RoleDefine_1.ROBOT_DATA_MIN_ID &&
          ((e = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(
            t.Uac.Ud1,
          )),
          (i = e.ParentId));
        e =
          ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
            i,
          );
        if (e) {
          var o = [];
          for (const r of e.BondIds)
            ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(
              r,
            ) && o.push({ Id: r, AddStar: t.Uac.F6n });
          o.sort((e, t) => {
            var i =
                ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(
                  e.Id,
                ),
              o =
                ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(
                  t.Id,
                ),
              e = i.Psc + e.AddStar >= i.Pd1,
              t = o.Psc + t.AddStar >= o.Pd1;
            return e && !t ? -1 : !e && t ? 1 : i.F6n - o.F6n;
          }),
            this.hm1.RefreshByDataAsync(o, !0);
        }
        this.hm1.GetRootUiItem().SetUIActive(!t.Uac?.O2s);
      }),
      (this.Bqe = () => {
        var e = new RogueBattleBuyRoleItem_1.RogueBattleBuyRoleItem();
        return (e.OnSelectCallback = this.UIi), e;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [10, UE.UIText],
      [9, UE.UIText],
      [11, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.lm1],
        [3, this.ilo],
        [4, this.vlo],
        [11, this.JGn],
      ]);
  }
  async OnBeforeStartAsync() {
    this._Xe = this.OpenParam;
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe),
      e =
        (e &&
          ((e.UpdateViewFunc = () => {
            this.RefreshRoleList();
          }),
          (e.CloseViewFunc = () => {
            this.CloseMe();
          })),
        (this.am1 = new GenericScrollViewNew_1.GenericScrollViewNew(
          this.GetScrollViewWithScrollbar(0),
          this.Bqe,
        )),
        (this.hm1 = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(5),
          () => new RogueBattleFetterInfoItem_1.RogueBattleFetterInfoItem(),
          this.GetItem(6).GetOwner(),
        )),
        this.GetButton(3).SetSelfInteractive(!1),
        (this.iJs = new MapRoguePopupBase_1.MapRoguePopupBase()),
        e.Data.oac.uac);
    this.GetText(10).SetText(e.Yu1.toString()),
      await Promise.all([
        this.iJs.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
        this.RefreshRoleList(),
      ]),
      this.iJs.SetPanelFetterVisible(!1);
  }
  async RefreshRoleList() {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "RogueBattleBuyRoleView.RefreshRoleList",
      async () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
        if (e) {
          const r = e.Data.oac.uac.Dac;
          this.am1?.BindLateUpdate(() => {
            var e = this.GetItem(1).GetWidth(),
              t = this.GetScrollViewWithScrollbar(0),
              i = t.GetViewport().GetUIItem().GetWidth(),
              o = t.Content.GetComponentByClass(UE.UIGridLayout.StaticClass()),
              i = Math.round(i / (e + o.GetSpacing().X));
            r.length <= i
              ? (o.SetHorizontalOrVertical(!0),
                o.SetAlign(4),
                t.Content.GetUIItem().SetStretchRight(0))
              : r.length > i && r.length <= 2 * i
                ? (o.SetHorizontalOrVertical(!0),
                  o.SetAlign(3),
                  t.Content.GetUIItem().SetStretchRight(0))
                : (o.SetHorizontalOrVertical(!1), o.SetAlign(0)),
              this.am1?.UnBindLateUpdate();
          }),
            this.RefreshBtnRefresh(),
            await this.am1.RefreshByDataAsync(r, !0),
            this.UIi(0, e.Data.oac.uac.Dac[0]);
        }
      },
    );
    await this.RunAsyncTask(e);
  }
  RefreshBtnRefresh() {
    var e,
      t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
    t &&
      ((e = (t = t.Data.oac.uac).Yu1),
      this.GetText(9).SetText(e.toString()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(10),
        "RogueBattle_BuyRole_RefreshCost",
        t.Pr1,
        t.Ar1,
      ),
      this.SetItemIcon(this.GetTexture(8), t.Xu1));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (0 !== e.length)
      return "FirstRole" === (e = e[0])
        ? (t = this.am1?.GetItemByIndex(0))
          ? [t, t]
          : void 0
        : "FirstFetter" === e && (t = this.hm1?.GetGridByDisplayIndex(0))
          ? [t, t]
          : void 0;
  }
}
exports.RogueBattleBuyRoleView = RogueBattleBuyRoleView;
//# sourceMappingURL=RogueBattleBuyRoleView.js.map
