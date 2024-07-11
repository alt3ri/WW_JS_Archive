"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoveryTabView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
  SortViewData_1 = require("../../../Common/FilterSort/Sort/Model/SortViewData"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CalabashController_1 = require("../../CalabashController"),
  CalabashDefine_1 = require("../../CalabashDefine"),
  VisionRecoveryChoosePanel_1 = require("./VisionRecoveryChoosePanel"),
  VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.cMt = []),
      (this.mMt = []),
      (this.dMt = []),
      (this.CMt = void 0),
      (this.Xvt = void 0),
      (this.H3e = void 0),
      (this.gMt = !1),
      (this.fMt = !1),
      (this.pMt = () => {
        this.CMt.SetActive(!1),
          this.CMt.UiViewSequence.RemoveSequenceFinishEvent(
            "SwitchB",
            this.pMt,
          );
      }),
      (this.vMt = (e, i) => {
        e
          ? (this.fMt || this.MMt(), this.EMt())
          : 0 <= (e = this.cMt.findIndex((e) => e.IncId === i.GetUniqueId())) &&
            (this.cMt.splice(e, 1),
            this.SMt(this.mMt, this.cMt),
            this.Zvt(this.cMt));
      }),
      (this.yMt = () => {
        this.cMt.length <= 0 ? this.IMt() : this.TMt();
      }),
      (this.LMt = () => {
        if (this.cMt.length < CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "Text_EchoLack_Text",
          );
        else if (
          ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox
        )
          this.DMt();
        else {
          let e = !1,
            i = !1,
            t = !1;
          for (const n of this.cMt) {
            var r =
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
                n.IncId,
              );
            r &&
              (!e &&
                ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(
                  r,
                ) &&
                (e = !0),
              !i &&
                ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(
                  r,
                ) &&
                (i = !0),
              !t) &&
              ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(
                r,
              ) &&
              (t = !0);
          }
          let o = void 0;
          var s,
            a = [];
          switch (
            (e &&
              ((s =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighQuality",
                )),
              a.push(s)),
            i &&
              ((s =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighLevel",
                )),
              a.push(s)),
            t &&
              ((s =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighRare",
                )),
              a.push(s)),
            a.length)
          ) {
            case 1:
              o = 127;
              break;
            case 2:
              o = 126;
              break;
            case 3:
              o = 125;
          }
          o
            ? ((s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).SetTextArgs(
                ...a,
              ),
              s.FunctionMap.set(2, this.DMt),
              (s.HasToggle = !0),
              (s.ToggleText =
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "Text_ItemRecycleConfirmToggle_text",
                )),
              s.SetToggleFunction(this.RMt),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                s,
              ))
            : this.DMt();
        }
      }),
      (this.DMt = () => {
        CalabashController_1.CalabashController.RequestPhantomRefiningRequest(
          this.cMt,
        );
      }),
      (this.RMt = (e) => {
        ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox =
          e;
      }),
      (this.UMt = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.AMt = (e) => {
        (this.cMt = e), this.Zvt(this.cMt);
      }),
      (this.PMt = () => {
        this.xMt();
      }),
      (this.wMt = (e) => {
        UiManager_1.UiManager.OpenView("VisionRecoveryResultView", e, (e) => {
          (this.mMt =
            ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
            this.TMt(),
            this.xMt();
        });
      }),
      (this.BMt = (e) => {
        void 0 !== e && (this.dMt = e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.yMt],
        [4, this.LMt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Xvt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(
      this.vMt,
      !0,
    )),
      await this.Xvt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.UMt,
      )),
      this.bMt(),
      (this.CMt = new VisionRecoveryChoosePanel_1.VisionRecoveryChoosePanel()),
      this.CMt.BindClickCloseCallBack(this.PMt),
      this.CMt.BindFilterSortRefresh(this.BMt);
    var e = this.GetItem(1);
    await this.CMt.CreateByResourceIdAsync("UiItem_VisionRecoveryList", e);
  }
  OnStart() {
    this.Zvt(this.cMt);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionRecoveryResult,
      this.wMt,
    );
  }
  MMt() {
    (this.fMt = !0),
      (this.mMt =
        ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
      this.SMt(this.mMt, this.cMt);
  }
  bMt() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "VisionRecoveryPreviewRewardDropId",
      ),
      i = new Array(),
      t =
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
          e,
        ).DropPreview;
    for (const r of t.keys()) {
      var o = [{ IncId: 0, ItemId: r }, t.get(r)];
      i.push(o);
    }
    this.H3e.RefreshByData(i);
  }
  SMt(e, i) {
    var t = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
      o = new SelectableComponent_1.SelectableComponentData();
    (o.IsSingleSelected = !1),
      (o.MaxSelectedGridNum = CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM),
      (o.OnChangeSelectedFunction = this.AMt),
      (t.SelectableComponentType = 1),
      (t.ItemDataBaseList = e),
      (t.SelectedDataList = i),
      (t.ExpData = void 0),
      (t.SelectableComponentData = o),
      (t.UseWayId = 33),
      (t.InitSortToggleState = !0),
      this.CMt.RefreshUi(t);
  }
  Zvt(e) {
    const i = [];
    e.forEach((e) => {
      e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(
        e.IncId,
      );
      void 0 !== e && i.push(e);
    }),
      this.Xvt.RefreshUi(i);
    var e = i.length,
      t = this.GetText(2),
      o = 0 < e ? "DeleteSelect" : "AutoSelect";
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      t,
      "Text_EchoSelect_Text",
      e,
      CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM,
    ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), o);
  }
  EMt() {
    this.gMt ||
      ((this.gMt = !0),
      this.CMt.SetActive(!0),
      this.UiViewSequence.PlaySequence("SwitchA"),
      this.CMt.UiViewSequence.PlaySequence("SwitchA"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
        !0,
      ));
  }
  xMt() {
    this.gMt &&
      ((this.gMt = !1),
      this.UiViewSequence.PlaySequence("SwitchB"),
      this.CMt.UiViewSequence.PlaySequence("SwitchB"),
      this.CMt.UiViewSequence.AddSequenceFinishEvent("SwitchB", this.pMt),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshCalabashTabShowState,
        !1,
      ));
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionRecoveryResult,
      this.wMt,
    );
  }
  IMt() {
    this.fMt || this.qMt();
    var e = [];
    for (const t of this.dMt) {
      var i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
          t.GetUniqueId(),
        );
      if (
        (void 0 !== i &&
          i.GetPhantomLevel() <= 0 &&
          !i.GetIfLock() &&
          e.push(t),
        e.length >= CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM)
      )
        break;
    }
    e.length < CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "RoleNoMaterial",
        )
      : ((this.cMt = []),
        e.forEach((e) => {
          e =
            SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
              e,
            );
          (e.SelectedCount = 1), this.cMt.push(e);
        }),
        this.Zvt(this.cMt),
        this.SMt(this.mMt, this.cMt));
  }
  qMt() {
    this.dMt =
      ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(33),
      e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(e),
      i = new SortViewData_1.SortResultData(),
      t = (i.SetConfigId(e.Id), i.SetIsAscending(!0), e.BaseSortList[0]),
      o = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, e.DataId);
    i.SetSelectBaseSort([t, o]),
      ModelManager_1.ModelManager.SortModel.SortDataList(this.dMt, e.Id, i);
  }
  TMt() {
    this.cMt.length <= 0 ||
      ((this.cMt = []), this.SMt(this.mMt, this.cMt), this.Zvt(this.cMt));
  }
  RemoveAllVisionItemOutside() {
    (this.mMt =
      ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
      this.TMt();
  }
}
exports.VisionRecoveryTabView = VisionRecoveryTabView;
//# sourceMappingURL=VisionRecoveryTabView.js.map
