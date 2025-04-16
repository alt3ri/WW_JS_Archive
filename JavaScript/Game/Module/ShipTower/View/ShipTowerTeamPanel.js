"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerTeamPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
  TabComponent_1 = require("../../Common/TabComponent/TabComponent"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ShipTowerRoleGrid_1 = require("./ShipTowerRoleGrid"),
  ShipTowerRoleTeamItem_1 = require("./ShipTowerRoleTeamItem"),
  ShipTowerTeamTabItem_1 = require("./ShipTowerTeamTabItem");
class ShipTowerTeamPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Ivt = void 0),
      (this.I6e = 0),
      (this.vNt = void 0),
      (this.Flo = void 0),
      (this.Ea_ = void 0),
      (this.Vlo = []),
      (this.Ia_ = void 0),
      (this.Ns_ = void 0),
      (this.os_ = void 0),
      (this.RoleSelectCallBack = void 0),
      (this.TeamSelectCallBack = void 0),
      (this.e7_ = void 0),
      (this.EmptyStateItem = void 0),
      (this.RoleListUpdateCallback = void 0),
      (this.fqe = () => {
        return new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
      }),
      (this.KOl = (e) => {
        if (!this.IsStartOrStarting)
          switch (
            ((this.I6e = e),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("ShipTower", 69, "二级页签点击回调: " + this.I6e),
            this.I6e)
          ) {
            case 0:
              this.Hlo();
              break;
            case 1:
              this.Ta_();
          }
      }),
      (this.Gua = (e, i, t) => {
        (this.Vlo = e),
          this.Flo?.RefreshByData(this.Vlo),
          this.EmptyStateItem?.SetUIActive(this.Vlo.length <= 0),
          this.RoleListUpdateCallback?.();
      }),
      (this.cHe = () => {
        var e = new ShipTowerRoleGrid_1.ShipTowerRoleGrid();
        return (
          e.BindOnExtendToggleStateChanged(this.ToggleFunction),
          e.BindOnCanExecuteChange(this.CanExecuteChangeFunction),
          e
        );
      }),
      (this.ba_ = () => {
        var e = new ShipTowerRoleTeamItem_1.ShipTowerRoleTeamItem();
        return (
          (e.OnClickCallback = this.TeamSelectCallBack),
          (e.StageData = this.Ns_),
          e
        );
      }),
      (this.ToggleFunction = (e) => {
        var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap,
          t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet,
          r = e.Data,
          e = 1 === e.State;
        if (e)
          for (
            let e = 1;
            e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM;
            e++
          ) {
            const s = this.e7_.GetRoleIndexInAllTeam(e);
            if (!i.has(s)) {
              i.set(s, r), t.add(r.GetDataId());
              break;
            }
          }
        else
          for (const o of i)
            if (o[1] === r) {
              i.delete(o[0]), t.delete(r.GetDataId());
              break;
            }
        const s = this.Vlo.indexOf(r);
        this.RoleSelectCallBack?.(r),
          this.Flo.GetScrollItemByIndex(s)?.Refresh(r, e, s),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("ShipTower", 69, "ToggleFunction", [
              "",
              this.Ns_.Id,
            ]);
      }),
      (this.CanExecuteChangeFunction = (e, i, t) => {
        return (
          !!ModelManager_1.ModelManager.ShipTowerModel.IsOtherTeamRoleData(
            e.GetDataId(),
          ) ||
          0 !== t ||
          !this.t7_() ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "EditBattleTeamRoleFull",
          ),
          !1)
        );
      });
  }
  async Init(e, i) {
    (this.Ns_ = i), await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Ivt = new TabComponent_1.TabComponent(
      this.GetItem(0),
      this.fqe,
      this.KOl,
      void 0,
    )),
      (this.Vlo = ModelManager_1.ModelManager.RoleModel.GetRoleList()),
      (this.vNt = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(3),
        this.Gua,
      )),
      this.vNt?.UpdateData(38, this.Vlo),
      (this.Flo = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(2),
        this.cHe,
      )),
      (this.Ea_ = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(1),
        this.ba_,
      )),
      (this.os_ = ModelManager_1.ModelManager.ShipTowerModel.GetTeamTabList()),
      await this.Ivt.RefreshTabItemByLengthAsync(this.os_.length),
      this.La_();
  }
  La_() {
    var e, i;
    for ([e, i] of this.Ivt.GetTabItemMap()) i.UpdateName(this.os_[e].Title);
    this.Ivt.SelectToggleByIndex(0, !0);
  }
  OnBeforeShow() {
    this.KOl(this.I6e);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.ShipTowerTeamPanelShown,
    );
  }
  UpdateViewAndShow(e) {
    (this.e7_ = e), this.GetActive() ? this.KOl(this.I6e) : this.SetActive(!0);
  }
  OnBeforeDestroy() {
    (this.Ivt = void 0), (this.vNt = void 0);
  }
  UpdateRoleListByMainRoleChange() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    this.vNt?.UpdateData(38, e),
      this.Ia_ &&
        (this.Ia_ =
          ModelManager_1.ModelManager.ShipTowerModel.GetPlayerTeamList());
  }
  Hlo() {
    this.GetScrollViewWithScrollbar(2).RootUIComp.SetUIActive(!0),
      this.GetScrollViewWithScrollbar(1).RootUIComp.SetUIActive(!1),
      this.vNt?.UpdateData(38, this.Vlo),
      this.vNt?.SetActive(!0),
      this.UpdateRoleListFilter();
  }
  UpdateRoleListFilter() {
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(38);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnFilterDataUpdate,
      e,
    );
  }
  Ta_() {
    this.GetScrollViewWithScrollbar(2).RootUIComp.SetUIActive(!1),
      this.GetScrollViewWithScrollbar(1).RootUIComp.SetUIActive(!0),
      this.vNt?.SetActive(!1),
      (this.Ia_ =
        this.Ia_ ??
        ModelManager_1.ModelManager.ShipTowerModel.GetPlayerTeamList()),
      this.Ea_?.SelectGridProxy(-1),
      this.OnlyUpdateTeamList();
  }
  OnlyUpdateTeamList() {
    this.Ea_?.RefreshByData(this.Ia_), this.EmptyStateItem?.SetUIActive(!1);
  }
  UpdateTeamListByIndex(e) {
    this.Ea_?.GetScrollItemByIndex(e)?.Refresh(this.Ia_[e]);
  }
  t7_() {
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var i = this.e7_.GetRoleIndexInAllTeam(e);
      if (!ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.has(i))
        return !1;
    }
    return !0;
  }
  GetRoleIdList() {
    return this.Vlo.map((e) => e.GetDataId());
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = this.Ivt?.GetTabItemByIndex(1)?.GetRootItem();
    return i ? [i, i] : void 0;
  }
}
exports.ShipTowerTeamPanel = ShipTowerTeamPanel;
//# sourceMappingURL=ShipTowerTeamPanel.js.map
