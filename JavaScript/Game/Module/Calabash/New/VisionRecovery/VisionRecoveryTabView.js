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
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
  SortViewData_1 = require("../../../Common/FilterSort/Sort/Model/SortViewData"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
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
      (this.C3a = void 0),
      (this.gMt = !1),
      (this.fMt = !1),
      (this.g3a = 0),
      (this.p3a = CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM),
      (this.f3a = 0),
      (this.pMt = () => {
        this.CMt.SetActive(!1),
          this.CMt.UiViewSequence.RemoveSequenceFinishEvent(
            "SwitchB",
            this.pMt,
          );
      }),
      (this.Rrh = (e) => {
        ("Start" !== e && "ShowView" !== e && "Sle" !== e) ||
          UiLayer_1.UiLayer.SetShowMaskLayer("VisionRecoveryTabView", !0);
      }),
      (this.Urh = (e) => {
        ("Start" !== e && "ShowView" !== e && "Sle" !== e) ||
          UiLayer_1.UiLayer.SetShowMaskLayer("VisionRecoveryTabView", !1);
      }),
      (this.vMt = (e, i) => {
        e
          ? (this.fMt || this.MMt(this.g3a),
            void 0 !== i && this.Mza(i),
            this.EMt())
          : (e = this.cMt.findIndex((e) => e.IncId === i.GetUniqueId())) < 0 ||
            (this.cMt.splice(e, 1),
            this.SMt(this.mMt, this.cMt, 0),
            this.Zvt(this.cMt));
      }),
      (this.yMt = () => {
        this.cMt.length <= 0 ? this.IMt(0) : this.TMt(0);
      }),
      (this.LMt = () => {
        this.cMt.length < this.p3a
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Text_EchoLack_Text",
            )
          : this.v3a(() => {
              CalabashController_1.CalabashController.RequestPhantomRefiningRequest(
                this.cMt,
              );
            });
      }),
      (this.RMt = (e) => {
        ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox =
          e;
      }),
      (this.M3a = () => {
        ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRecoveryRedDot(
          !1,
        ),
          (this.g3a = 1),
          (this.cMt = []),
          this.fMt
            ? this.SMt(this.mMt, this.cMt, this.g3a)
            : this.MMt(this.g3a),
          this.Zvt(this.cMt),
          this.S3a(this.cMt),
          this.u7a(),
          this.EMt();
      }),
      (this.E3a = () => {
        this.cMt.length < this.p3a
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Text_BatchEchoLack",
            )
          : this.v3a(() => {
              CalabashController_1.CalabashController.RequestBatchRefiningRequest(
                this.cMt,
              );
            });
      }),
      (this.UMt = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.AMt = (e) => {
        (this.cMt = e),
          0 === this.g3a ? this.Zvt(this.cMt) : this.S3a(this.cMt);
      }),
      (this.PMt = () => {
        1 === this.g3a &&
          ((this.g3a = 0),
          (this.cMt = []),
          this.SMt(this.mMt, this.cMt, this.g3a),
          this.Zvt(this.cMt),
          this.S3a(this.cMt),
          this.c7a()),
          this.xMt();
      }),
      (this.wMt = (e) => {
        UiManager_1.UiManager.OpenView("VisionRecoveryResultView", e, () => {
          (this.mMt =
            ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
            this.TMt(0),
            this.xMt();
        });
      }),
      (this.y3a = (e) => {
        (this.g3a = 0),
          UiManager_1.UiManager.OpenView(
            "VisionRecoveryBatchResultView",
            e,
            () => {
              (this.mMt =
                ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
                this.TMt(0),
                this.c7a(),
                this.xMt();
            },
          );
      }),
      (this.I3a = (i) => {
        var e,
          t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i);
        void 0 !== t &&
          (0 <= (e = this.cMt.findIndex((e) => e.IncId === i)) &&
            t.GetIsLock() &&
            (this.cMt.splice(e, 1),
            0 === this.g3a ? this.Zvt(this.cMt) : this.S3a(this.cMt)),
          0 <= (t = this.dMt.findIndex((e) => e.GetUniqueId() === i))) &&
          this.CMt.UpdatePartByIndex(t);
      }),
      (this.BMt = (e) => {
        void 0 !== e && (this.dMt = e);
      }),
      (this.T3a = (e) => {
        0 === e ? this.TMt(1) : this.m7a(1);
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
      [7, UE.UIButtonComponent],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIText],
      [12, UE.UIText],
      [13, UE.UIButtonComponent],
      [14, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [3, this.yMt],
        [4, this.LMt],
        [7, this.M3a],
        [13, this.E3a],
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
      (this.C3a = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(10),
        this.UMt,
      )),
      this.bMt(),
      (this.CMt = new VisionRecoveryChoosePanel_1.VisionRecoveryChoosePanel()),
      this.CMt.BindClickCloseCallBack(this.PMt),
      this.CMt.BindFilterSortRefresh(this.BMt),
      this.CMt.BindClickSelectAllToggleCallback(this.T3a);
    var e = this.GetItem(1);
    await this.CMt.CreateByResourceIdAsync("UiItem_VisionRecoveryList", e),
      (this.f3a =
        ConfigManager_1.ConfigManager.CalabashConfig.GetVisionBatchRecoveryMaxCount());
  }
  OnStart() {
    (this.g3a = 0), this.Zvt(this.cMt);
    var e = this.GetTabBehavior(
      UiTabSequence_1.UiTabSequence,
    )?.GetLevelSequencePlayer();
    e &&
      (e.BindSequenceStartEvent(this.Rrh), e.BindSequenceCloseEvent(this.Urh));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionRecoveryResult,
      this.wMt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionRecoveryBatchResult,
        this.y3a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.I3a,
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "VisionRecovery",
        this.GetItem(14),
      );
  }
  MMt(e) {
    (this.fMt = !0),
      (this.mMt =
        ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
      this.SMt(this.mMt, this.cMt, e);
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
    for (const o of t.keys()) {
      var s = [{ IncId: 0, ItemId: o }, t.get(o)];
      i.push(s);
    }
    this.H3e.RefreshByData(i), this.C3a.RefreshByData(i);
  }
  SMt(e, i, t) {
    var s = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
      o = new SelectableComponent_1.SelectableComponentData();
    (o.IsSingleSelected = !1),
      (o.MaxSelectedGridNum = 0 === t ? this.p3a : this.f3a),
      (o.OnChangeSelectedFunction = this.AMt),
      (s.SelectableComponentType = 1),
      (s.ItemDataBaseList = e),
      (s.SelectedDataList = i),
      (s.ExpData = void 0),
      (s.SelectableComponentData = o),
      (s.UseWayId = 33),
      (s.InitSortToggleState = !0),
      this.CMt.RefreshUi(s),
      this.CMt.SetAllSelectToggleVisible(1 === t);
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
      s = 0 < e ? "DeleteSelect" : "AutoSelect";
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_EchoSelect_Text", e, this.p3a),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s);
  }
  S3a(e) {
    var e = e.length,
      i = Math.floor(e / this.p3a);
    this.GetText(11).SetText(e.toString() + "/" + this.f3a),
      this.GetText(12).SetText(i.toString()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(11),
        "Text_BatchEchoSelect_Text",
        e,
        this.f3a,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(12),
        "Text_BatchEchoSelectNum_Text",
        i,
      );
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
  Mza(e) {
    this.gMt &&
      ((e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
        e.GetConfigId(),
        e.GetUniqueId(),
      )),
      this.CMt.ShowTipsComponent(e));
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionRecoveryResult,
      this.wMt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionRecoveryBatchResult,
        this.y3a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.I3a,
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "VisionRecovery",
        this.GetItem(14),
      );
  }
  u7a() {
    this.UiViewSequence.StopPrevSequence(!1),
      this.GetItem(8).SetUIActive(!0),
      this.GetButton(7).RootUIComp.SetUIActive(!1),
      this.UiViewSequence.PlaySequence("BatchIn");
  }
  c7a() {
    this.UiViewSequence.StopPrevSequence(!1),
      this.GetButton(7).RootUIComp.SetUIActive(!0),
      this.UiViewSequence.PlaySequence("BatchOut");
  }
  IMt(e) {
    if (0 === this.g3a) {
      this.fMt || this.qMt();
      var i = [];
      for (const s of this.dMt) {
        var t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
            s.GetUniqueId(),
          );
        if (
          (void 0 !== t && t.GetVisionIfCanRecovery() && i.push(s),
          i.length >= this.p3a)
        )
          break;
      }
      i.length < this.p3a
        ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "RoleNoMaterial",
          )
        : ((this.cMt = []),
          i.forEach((e) => {
            e =
              SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
                e,
              );
            (e.SelectedCount = 1), this.cMt.push(e);
          }),
          0 === e ? this.Zvt(this.cMt) : this.S3a(this.cMt),
          this.SMt(this.mMt, this.cMt, e));
    }
  }
  m7a(e) {
    if (1 === e) {
      this.fMt || this.qMt();
      for (const t of this.dMt) {
        const s =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
            t.GetUniqueId(),
          );
        if (void 0 !== s && s.GetVisionIfCanRecovery()) {
          var i = this.cMt.find((e) => e.IncId === s.GetIncrId());
          if (
            void 0 === i &&
            (((i =
              SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
                t,
              )).SelectedCount = 1),
            this.cMt.push(i),
            this.cMt.length >= this.f3a)
          )
            break;
        }
      }
      this.S3a(this.cMt), this.SMt(this.mMt, this.cMt, e);
    }
  }
  qMt() {
    this.dMt =
      ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(33),
      e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(e),
      i = new SortViewData_1.SortResultData(),
      t = (i.SetConfigId(e.Id), i.SetIsAscending(!0), e.BaseSortList[0]),
      s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, e.DataId);
    i.SetSelectBaseSort([t, s]),
      ModelManager_1.ModelManager.SortModel.SortDataList(this.dMt, e.Id, i);
  }
  TMt(e) {
    this.cMt.length <= 0 ||
      ((this.cMt = []),
      0 === e ? this.Zvt(this.cMt) : this.S3a(this.cMt),
      this.SMt(this.mMt, this.cMt, e));
  }
  RemoveAllVisionItemOutside() {
    (this.mMt =
      ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList()),
      this.TMt(this.g3a);
  }
  v3a(s) {
    var o = () => {
      let e = !1;
      for (const t of this.cMt)
        if (
          0 < t.IncId &&
          ModelManager_1.ModelManager.VisionEquipGroupModel.CheckVisionListIfInGroup(
            [t.IncId],
          )
        ) {
          e = !0;
          break;
        }
      var i;
      e
        ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(247)).FunctionMap.set(
            2,
            s,
          ),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          ))
        : s();
    };
    if (ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox)
      o();
    else {
      let e = !1,
        i = !1,
        t = !1;
      for (const n of this.cMt) {
        var h =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            n.IncId,
          );
        h &&
          (!e &&
            ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(
              h,
            ) &&
            (e = !0),
          !i &&
            ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(
              h,
            ) &&
            (i = !0),
          !t) &&
          ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(h) &&
          (t = !0);
      }
      let s = void 0;
      var r,
        a = [];
      switch (
        (e &&
          ((r =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "VisionHighQuality",
            )),
          a.push(r)),
        i &&
          ((r =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "VisionHighLevel",
            )),
          a.push(r)),
        t &&
          ((r =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "VisionHighRare",
            )),
          a.push(r)),
        a.length)
      ) {
        case 1:
          s = 127;
          break;
        case 2:
          s = 126;
          break;
        case 3:
          s = 125;
      }
      s
        ? ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(s)).SetTextArgs(...a),
          r.FunctionMap.set(2, o),
          (r.HasToggle = !0),
          (r.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ItemRecycleConfirmToggle_text",
          )),
          r.SetToggleFunction(this.RMt),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            r,
          ))
        : o();
    }
  }
}
exports.VisionRecoveryTabView = VisionRecoveryTabView;
//# sourceMappingURL=VisionRecoveryTabView.js.map
