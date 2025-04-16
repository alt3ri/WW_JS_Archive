"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CalabashController_1 = require("../../CalabashController"),
  VisionRefineAttributePanel_1 = require("./VisionRefineAttributePanel"),
  VisionRefineChoosePanel_1 = require("./VisionRefineChoosePanel"),
  VisionRefineMaterialItem_1 = require("./VisionRefineMaterialItem"),
  VisionRefineSlotItem_1 = require("./VisionRefineSlotItem");
class VisionRefineTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.umc = void 0),
      (this.dmc = void 0),
      (this.mmc = void 0),
      (this.gmc = void 0),
      (this.lqe = void 0),
      (this.Cmc = void 0),
      (this.cUc = 0),
      (this.ymc = !1),
      (this.Smc = () => {
        return new VisionRefineMaterialItem_1.VisionRefineMaterialItem();
      }),
      (this.Mmc = (i) => {
        ("Start" !== i && "ShowView" !== i && "Sle" !== i) ||
          UiLayer_1.UiLayer.SetShowMaskLayer("VisionRefineTabView", !0);
      }),
      (this.Emc = (i) => {
        ("Start" !== i && "ShowView" !== i && "Sle" !== i) ||
          UiLayer_1.UiLayer.SetShowMaskLayer("VisionRefineTabView", !1);
      }),
      (this.Imc = () => {
        this.dmc.SetActive(!1),
          this.dmc.UiViewSequence.RemoveSequenceFinishEvent(
            "SwitchB",
            this.Imc,
          );
      }),
      (this.Tmc = () => {
        this.dmc.SetActive(!1),
          this.UiViewSequence.RemoveSequenceFinishEvent("SwitchB_1", this.Tmc);
      }),
      (this.bmc = (i) => {
        2 !== this.cUc && (this.uUc(i), this.Lmc());
      }),
      (this.p5t = (i) => {
        (ModelManager_1.ModelManager.CalabashModel.RefineAttribute = i)
          ? this.gmc.RefreshItemSwitch(i)
          : this.gmc.RefreshItemSwitch(void 0);
      }),
      (this.wmc = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(262);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          i,
        );
      }),
      (this.Rmc = () => {
        this.mmc
          ? 2 !== this.cUc && this.mmc
            ? this.ql1() && this.z3e(2)
            : 2 === this.cUc &&
              this.Gl1() &&
              CalabashController_1.CalabashController.RequestPhantomPolishRequest(
                this.mmc.GetUniqueId(),
                ModelManager_1.ModelManager.CalabashModel.RefineAttribute
                  .PropItemId,
              )
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "VisionRefineLackTip",
            );
      }),
      (this.Pmc = (i) => {
        i && 1 === this.cUc
          ? this.xmc()
          : (i || this.dmc.ClearSelection(), 1 !== this.cUc && this.z3e(1));
      }),
      (this.Bmc = () => {
        this.z3e(0);
      }),
      (this.Omc = () => {
        var i = this.mmc,
          e = this.p5t,
          i = { IncId: i.GetUniqueId(), Callback: e };
        UiManager_1.UiManager.OpenView("VisionRefineAttributeSelectView", i);
      }),
      (this.rki = () => {
        1 !== this.cUc && this.z3e(1);
      }),
      (this.I3a = (i) => {
        this.dmc?.OnItemFuncValueChange(i);
      }),
      (this.Gmc = (i) => {
        UiManager_1.UiManager.OpenView("VisionRefineResultView", i, (i, e) => {
          this.dmc.ClearSelection(),
            this.z3e(0),
            this.GetItem(3).SetAlpha(1),
            i && (UiManager_1.UiManager.GetView(e).OnCloseCallback = this.dUc);
        });
      }),
      (this.dUc = (i) => {
        i && this.z3e(1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIHorizontalLayout],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [5, this.wmc],
        [2, this.Rmc],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.umc = new VisionRefineSlotItem_1.VisionRefineSlotItem(this.Pmc)),
      await this.umc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.dmc = new VisionRefineChoosePanel_1.VisionRefineChoosePanel()),
      (this.dmc.FilterSortGroupId = 40),
      (this.dmc.OnClickCloseCallBack = this.Bmc),
      (this.dmc.OnChangeCallBack = this.bmc);
    var i = this.GetItem(0);
    await this.dmc.CreateByResourceIdAsync("UiItem_VisionRefineList", i),
      (this.gmc =
        new VisionRefineAttributePanel_1.VisionRefineAttributePanel()),
      this.gmc.BindClickCallBack(this.Omc),
      await this.gmc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      (this.Cmc = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(6),
        this.Smc,
      ));
  }
  OnStart() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
      this.lqe.SetCloseCallBack(this.rki),
      this.lqe.SetUiActive(!1);
    var i = this.GetTabBehavior(
      UiTabSequence_1.UiTabSequence,
    )?.GetLevelSequencePlayer();
    i &&
      (i.BindSequenceStartEvent(this.Mmc), i.BindSequenceCloseEvent(this.Emc)),
      (this.ymc = !1),
      (this.cUc = 0),
      this.uUc(void 0),
      this.Lmc();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionRefineResult,
      this.Gmc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.I3a,
      );
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRefineRedDot(!1);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionRefineResult,
      this.Gmc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.I3a,
      );
  }
  Umc() {
    this.ymc = !0;
    var i =
      ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    this.dmc.RefreshList(i);
  }
  z3e(i) {
    this.cUc !== i &&
      (this.dmc.SetActive(1 === i),
      this.gmc.SetActive(2 === i),
      this.Cmc.SetActive(2 !== i),
      1 === i
        ? this.mUc(this.cUc)
        : 0 === i
          ? this.fUc(this.cUc)
          : 2 === i && this.gUc(this.cUc),
      (this.cUc = i),
      this.Lmc());
  }
  mUc(i) {
    this.ymc || this.Umc(),
      0 === i
        ? (this.UiViewSequence.PlaySequence("SwitchA_1"),
          this.dmc.UiViewSequence.PlaySequence("SwitchA"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.CalabashEnterInternalView,
          ))
        : 2 === i &&
          (this.UiViewSequence.PlaySequence("SwitchB_2"),
          this.dmc.UiViewSequence.PlaySequence("SwitchA"));
  }
  fUc(i) {
    1 === i
      ? (this.UiViewSequence.PlaySequence("SwitchA_2"),
        this.dmc.UiViewSequence.PlaySequence("SwitchB"),
        this.dmc.UiViewSequence.AddSequenceFinishEvent("SwitchB", this.Imc),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CalabashQuitInternalView,
        ))
      : 2 === i &&
        (this.UiViewSequence.PlaySequence("SwitchC_1"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CalabashQuitInternalView,
        ),
        this.lqe.SetUiActive(!1));
  }
  gUc(i) {
    0 === i
      ? (this.lqe.SetUiActive(!0),
        this.UiViewSequence.PlaySequence("CaptionIn"),
        this.UiViewSequence.PlaySequence("SwitchC_2"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CalabashEnterInternalView,
        ))
      : 1 === i &&
        (this.lqe.SetUiActive(!0),
        this.UiViewSequence.AddSequenceFinishEvent("SwitchB_1", this.Tmc),
        this.UiViewSequence.PlaySequence("SwitchB_1"),
        this.dmc.UiViewSequence.PlaySequence("SwitchB"));
  }
  xmc() {
    var i;
    this.mmc &&
      ((i = this.mmc),
      (i = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(
        i.GetUniqueId(),
      )),
      (i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
        i.GetConfigId(),
        i.GetUniqueId(),
      )),
      this.dmc.ShowTipsComponent(i));
  }
  Lmc() {
    let i =
      ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialDefaultCost();
    this.mmc &&
      (i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRefineMaterialCost(
          this.mmc.GetUniqueId(),
        ));
    const t = new Array();
    var e, s;
    i.forEach((i, e) => {
      e = { ItemId: e, IncId: 0, Count: this.mmc ? i : 0, SelectedCount: 0 };
      t.push(e);
    }),
      this.Cmc.RefreshByData(t),
      this.mmc
        ? ((s = this.mmc.GetUniqueId()),
          (e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
              s,
            )),
          (s =
            ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(s)),
          this.umc.RefreshByData(s, 2 === this.cUc, e.GetCost()),
          (s = e.GetMainPropShowAttributeList(1)),
          this.gmc.RefreshItemNow(s),
          this.gmc.RefreshItemSwitch(
            ModelManager_1.ModelManager.CalabashModel.RefineAttribute,
          ))
        : this.umc.RefreshEmpty();
  }
  uUc(i) {
    (this.mmc = i),
      (ModelManager_1.ModelManager.CalabashModel.RefineAttribute = void 0);
  }
  OnClickCloseRoot() {
    return 2 === this.cUc && (this.z3e(1), !0);
  }
  ql1() {
    return (
      !!ModelManager_1.ModelManager.PhantomBattleModel.IsVisionRefineMaterialEnough(
        this.mmc.GetUniqueId(),
      ) ||
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "VisionRefineMaterialLack",
      ),
      !1)
    );
  }
  Gl1() {
    return (
      !!ModelManager_1.ModelManager.CalabashModel.RefineAttribute ||
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "VisionRefineAttributeEmpty",
      ),
      !1)
    );
  }
}
exports.VisionRefineTabView = VisionRefineTabView;
//# sourceMappingURL=VisionRefineTabView.js.map
