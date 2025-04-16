"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineChoosePanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  VisionRefineMediumItemGrid_1 = require("./VisionRefineMediumItemGrid");
class VisionRefineChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.nmc = []),
      (this.ys_ = void 0),
      (this.FilterSortGroupId = 0),
      (this.UiViewSequence = void 0),
      (this.Vvt = void 0),
      (this.amc = void 0),
      (this.vpt = void 0),
      (this.Mpt = void 0),
      (this.OnClickCloseCallBack = void 0),
      (this.OnChangeCallBack = void 0),
      (this.sGe = () => {
        var i = new VisionRefineMediumItemGrid_1.VisionRefineMediumItemGrid();
        return (
          i.BindOnExtendToggleStateChanged(this.lmc),
          i.BindOnCanExecuteChange(this.X8a),
          i
        );
      }),
      (this.OnClickMask = () => {
        this.GetItem(2).SetUIActive(!1),
          this.GetButton(1).RootUIComp.SetUIActive(!1);
      }),
      (this.OnClickClose = () => {
        this.OnClickCloseCallBack
          ? this.OnClickCloseCallBack()
          : this.SetActive(!1);
      }),
      (this.lmc = (i) => {
        var e,
          i = i.Data;
        this.ys_ === i
          ? this.ClearSelection()
          : ((e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
              i.GetConfigId(),
              i.GetUniqueId(),
            )),
            this.ShowTipsComponent(e),
            (e = this.nmc.indexOf(i)),
            this.amc.DeselectCurrentGridProxy(),
            (this.ys_ = i),
            this.amc.SelectGridProxy(e),
            this.amc.RefreshGridProxy(e),
            this.OnChangeCallBack && this.OnChangeCallBack(this.ys_));
      }),
      (this.OnItemFuncValueChange = (e) => {
        var t =
          ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
        if (t) {
          var s = this.amc.GetSelectedGridIndex();
          for (let i = 0; i < this.nmc.length; i++)
            if (this.nmc[i].GetUniqueId() === e) {
              t.GetIsLock() && i === s && this.ClearSelection(),
                this.amc.RefreshGridProxy(i);
              break;
            }
        }
      }),
      (this.X8a = (i, e, t) => {
        var s = i.GetUniqueId(),
          s =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              s,
            );
        return (
          !!s.GetVisionIfCanRefine() ||
          (s.GetIsLock()
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "WeaponLockTipsText",
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "VisionRefineChooseCheck",
              ),
          (s = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
            i.GetConfigId(),
            i.GetUniqueId(),
          )),
          this.ShowTipsComponent(s),
          !1)
        );
      }),
      (this.FNt = (i) => {
        this.ClearSelection(),
          (this.nmc = i),
          this.amc.RefreshByData(this.nmc),
          this.GetItem(6).SetUIActive(i?.length <= 0),
          this.Vvt.SetActive(!1);
      }),
      (this.ua1 = (i, e) => {
        i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(i, e);
        this.ShowTipsComponent(i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.OnClickMask],
        [3, this.OnClickClose],
      ]);
  }
  OnBeforeCreateImplement() {
    (this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    (this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.Vvt.CreateByActorAsync(this.GetItem(2).GetOwner()),
      (this.amc = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(4),
        this.GetItem(5).GetOwner(),
        this.sGe,
      ));
  }
  OnStart() {
    (this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(7), this.FNt)),
      (this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(8), this.FNt));
  }
  ClearSelection() {
    (this.ys_ = void 0),
      this.amc.DeselectCurrentGridProxy(),
      this.OnChangeCallBack && this.OnChangeCallBack(this.ys_);
  }
  RefreshList(i) {
    this.amc.DeselectCurrentGridProxy(!1),
      this.amc.RefreshByData(i),
      (this.nmc = i),
      (this.ys_ = void 0),
      this.GetItem(6).SetUIActive(i?.length <= 0),
      this.Mpt.SetSortToggleState(!1),
      this.vpt.UpdateData(this.FilterSortGroupId, i),
      this.Mpt.UpdateData(this.FilterSortGroupId, i);
  }
  ShowTipsComponent(i) {
    this.Vvt.Refresh(i),
      this.GetItem(2).SetUIActive(!0),
      this.GetButton(1).RootUIComp.SetUIActive(!0);
  }
  OnAfterShow() {
    this.OnAddEventListener();
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.ua1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.ua1,
    );
  }
}
exports.VisionRefineChoosePanel = VisionRefineChoosePanel;
//# sourceMappingURL=VisionRefineChoosePanel.js.map
