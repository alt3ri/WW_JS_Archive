"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssPluginEquipView = exports.DangoAbyssPluginEquipViewData =
    void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  FilterSortEntrance_1 = require("../../../Common/FilterSort/FilterSortEntrance"),
  ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DangoAbyssAttributeBaseItem_1 = require("./DangoAbyssAttributeBaseItem"),
  DangoAbyssAttributeParentItem_1 = require("./DangoAbyssAttributeParentItem"),
  DangoAbyssPluginItem_1 = require("./DangoAbyssPluginItem"),
  DangoAbyssSelectableComponent_1 = require("./DangoAbyssSelectableComponent");
class DangoAbyssPluginEquipViewData {
  constructor() {
    (this.DangoData = void 0), (this.StartSelectIndex = 0);
  }
}
exports.DangoAbyssPluginEquipViewData = DangoAbyssPluginEquipViewData;
class DangoAbyssPluginEquipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ygc = void 0),
      (this.amc =
        new DangoAbyssSelectableComponent_1.DangoAbyssSelectableComponent(!0)),
      (this.Vvt = void 0),
      (this.adi = void 0),
      (this.EVc = void 0),
      (this.yil = void 0),
      (this.ZE1 = []),
      (this.wI1 = -1),
      (this.AOe = (e) => {
        switch (e) {
          case 0:
            this.wGc();
            break;
          case 1:
            this.RGc();
            break;
          case 2:
            this.AGc();
        }
      }),
      (this.FNt = (e) => {
        var t;
        this.amc.UpdateDataList(e),
          this.GetItem(6).SetUIActive(e.length <= 0),
          e.length <= 0
            ? (this.yil.SetPluginItem(void 0, !0), this.UGc())
            : 0 <= (t = this.Y01())
              ? this.amc.ScrollToIndex(t)
              : ((t = e?.[0]),
                this.yil.SetPluginItem(t, !0),
                this.d4e(),
                this.UGc());
      }),
      (this.xGc = (e, t) => {
        t =
          ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(t);
        this.yil.SetPluginItem(t);
      }),
      (this.gFc = () => {
        this.Tgc(),
          this.amc.RefreshAllByDisplay(),
          this.fvt(),
          this.UGc(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAbyssPluginEquipAttrRefresh,
            this.fT1(),
            this.gT1(),
          );
      }),
      (this.ha1 = (e) => {
        e = this.amc.GetLoopScrollViewIndex(e, -1);
        e < 0 || this.amc.RefreshPartByIndex(e);
      }),
      (this.I5t = () => {
        this.yil.UnBind(this.AOe), this.CloseMe();
      }),
      (this.la1 = () => {
        ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryAvailable() &&
          UiManager_1.UiManager.OpenView(
            "DangoAbyssPluginRecoveryView",
            this.yil,
          );
      }),
      (this.IVc = (e, t, i) => {
        return new DangoAbyssAttributeParentItem_1.DangoAbyssAttributeParentItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIDynScrollViewComponent],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.I5t],
        [2, this.la1],
      ]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    (this.yil = this.OpenParam),
      (this.ygc = new PluginPanel()),
      (this.ygc.ViewModel = this.yil);
    [].push(this.ygc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())),
      (this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.Vvt.CreateByActorAsync(this.GetItem(3).GetOwner()),
      (this.EVc = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(11),
        this.GetItem(10),
        new DangoAbyssAttributeBaseItem_1.DangoAbyssAttributeBaseItem(),
        this.IVc,
      )),
      await this.EVc.Init();
    var e = new SelectableComponent_1.SelectableComponentData();
    (e.IsSingleSelected = !0),
      (e.IsNumSelectable = !1),
      (e.MaxSelectedGridNum = 1),
      this.amc.InitLoopScroller(
        this.GetLoopScrollViewComponent(4),
        this.GetItem(5),
        e,
      ),
      this.amc.SetMaxSize(1),
      (this.adi = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(7),
        this.FNt,
      ));
  }
  OnBeforeShow() {
    this.yil.Bind(this.AOe), (this.ZE1 = []);
    var e = this.yil.GetDangoId(),
      e =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 75, "打开装备页", ["dangoId", e]),
        ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryAvailable());
    this.GetButton(2).RootUIComp.SetUIActive(e),
      this.SetButtonUiActive(13, !1),
      this.pO();
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.AOe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.xGc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
        this.gFc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.ha1,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.xGc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssRoleInfoUpdate,
        this.gFc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.ha1,
      );
  }
  pO() {
    this.Tgc(), this.d4e(), this.fvt(), this.UGc();
  }
  Tgc() {
    this.ygc.Refresh();
  }
  d4e() {
    var e = this.yil.GetSlotIndex(),
      t =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemListBySlotIndex(
          e,
        ),
      i = this.z01(),
      s = t.length,
      n =
        ModelManager_1.ModelManager.DangoAbyssModel.GetAllPluginItemList()
          .length,
      e =
        ModelManager_1.ModelManager.DangoAbyssModel.GetSlotTypeTextIdBySlotIndex(
          e,
        ),
      e =
        (LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e, s),
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity()),
      s =
        (LguiUtil_1.LguiUtil.TrySetLocalTextNew(
          this.GetText(14),
          "Text_DangoPluginItemCapacity_Text",
          n,
          e,
        ),
        this.amc.UpdateComponent(t, i),
        this.yil.GetDangoId());
    this.adi.UpdateData(41, t, s);
  }
  fvt() {
    var e = this.yil.GetDangoId();
    ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e)
      ? (this.GetItem(12).SetUIActive(!1),
        this.GetUIDynScrollViewComponent(11).RootUIComp.SetUIActive(!0),
        (e =
          ModelManager_1.ModelManager.DangoAbyssModel.GetEquipViewAttributeDataById(
            e,
          )),
        (e =
          ModelManager_1.ModelManager.DangoAbyssModel.SetEquipViewAttributeType(
            this.ZE1,
            e,
          )),
        (this.ZE1 = e),
        this.EVc.RefreshByData(e))
      : (this.GetItem(12).SetUIActive(!0),
        this.GetUIDynScrollViewComponent(11).RootUIComp.SetUIActive(!1));
  }
  UGc() {
    var e,
      t,
      i,
      s = this.yil.GetPluginItem();
    s
      ? ((i = s.GetConfigId()),
        (e = this.yil.GetSlotIndex()),
        (t = this.yil.GetDangoId()),
        (i = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemTipsData(
          i,
          s.GetUniqueId(),
          e,
          t,
        )),
        (s = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(i)),
        this.Vvt.Refresh(s),
        this.Vvt.SetUiActive(!0))
      : this.Vvt.SetUiActive(!1);
  }
  wGc() {
    this.pO();
  }
  RGc() {
    var e,
      t = this.yil.GetSlotIndex(),
      i =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 75, "EquipView OnSlotIndexUpdate", [
            "index",
            t,
          ]),
        this.Tgc(),
        this.yil.GetDangoId()),
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemIncIdBySlotIndex(
          i,
          t,
        );
    0 < i &&
      ((i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(i)),
      (e = this.yil.GetPluginItem()) &&
        e.GetUniqueId() !== i.GetUniqueId() &&
        this.amc.ReduceByIncId(e.GetUniqueId()),
      this.yil.SetPluginItem(i, !0)),
      ModelManager_1.ModelManager.DangoAbyssModel.GetIfSlotTypeChange(
        this.wI1,
        t,
      ) && this.d4e(),
      (this.wI1 = t),
      this.UGc();
  }
  AGc() {
    this.amc.RefreshAllByDisplay(), this.UGc();
  }
  Y01() {
    var e = this.yil.GetPluginItem();
    return e
      ? this.amc.GetLoopScrollViewIndex(e.GetUniqueId(), e.GetConfigId())
      : -1;
  }
  z01() {
    var e = this.yil.GetPluginItem();
    return e
      ? [
          {
            ItemId: e.GetItemId(),
            IncId: e.GetUniqueId(),
            Count: 1,
            SelectedCount: 1,
          },
        ]
      : [];
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (0 !== e.length)
      return "PluginSelect" === (t = e[0])
        ? !(e.length < 2) &&
          ((e = Number(e[1])), (e = this.amc?.GetGridByDisplayIndex(e)))
          ? [e, e]
          : void 0
        : "InvalidAttr" === t
          ? ((e = this.CT1()),
            (e = this.EVc?.GetGridByDisplayIndex(e)) ? [e, e] : void 0)
          : "ValidAttr" === t &&
              ((e = this.pT1()), (t = this.EVc?.GetGridByDisplayIndex(e)))
            ? [t, t]
            : void 0;
  }
  fT1() {
    return this.ZE1.some((e) => !e.IsValid && !!e.Tag);
  }
  gT1() {
    return this.ZE1.some((e) => e.IsChange && e.IsValid);
  }
  CT1() {
    return this.ZE1.findIndex((e) => !e.IsValid && !!e.Tag);
  }
  pT1() {
    return this.ZE1.findIndex((e) => e.IsChange && e.IsValid);
  }
}
exports.DangoAbyssPluginEquipView = DangoAbyssPluginEquipView;
class PluginPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.bgc = new Map()), (this.ViewModel = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 0; e < DangoAbyssDefine_1.SLOT_COUNT; e++) {
      var i = new DangoAbyssPluginItem_1.DangoAbyssPluginItem(e, !0);
      (i.ViewModel = this.ViewModel),
        t.push(i.CreateThenShowByActorAsync(this.GetItem(e).GetOwner())),
        this.bgc.set(e, i);
    }
    await Promise.all(t);
  }
  Refresh() {
    var e = this.ViewModel.GetDangoId(),
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(e);
    e && this.Tgc(e);
  }
  Tgc(i) {
    this.bgc.forEach((e, t) => {
      t = i.GetPluginSlotData(t);
      e.Refresh(t);
    });
  }
}
//# sourceMappingURL=DangoAbyssPluginEquipView.js.map
