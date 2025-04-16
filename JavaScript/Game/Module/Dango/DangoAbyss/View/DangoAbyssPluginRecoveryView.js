"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssPluginRecoveryView = exports.RecoveryRewardItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  FilterSortEntrance_1 = require("../../../Common/FilterSort/FilterSortEntrance"),
  ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DangoAbyssSelectableComponent_1 = require("./DangoAbyssSelectableComponent");
class RecoveryRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, i) {
    e = {
      Data: e,
      Type: 4,
      ItemConfigId: e.ItemId,
      BottomText: e.Count.toString(),
    };
    this.Apply(e);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    var e = this.Data;
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      e.ItemId,
    );
  }
}
exports.RecoveryRewardItem = RecoveryRewardItem;
class DangoAbyssPluginRecoveryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this._a1 = []),
      (this.ypt = []),
      (this.Vvt = void 0),
      (this.adi = void 0),
      (this.amc =
        new DangoAbyssSelectableComponent_1.DangoAbyssSelectableComponent(!1)),
      (this.yc1 = void 0),
      (this.yil = void 0),
      (this.bmc = (e) => {
        (this._a1 = e), this.IT1();
      }),
      (this.Sc1 = () => {
        return new RecoveryRewardItem();
      }),
      (this.I5t = () => {
        this.CloseMe();
      }),
      (this.p5t = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Activity", 75, "OnClickConfirm"),
          this.GetItem(11).SetUIActive(!1),
          this.GetButton(12).RootUIComp.SetUIActive(!1);
        var e =
          ModelManager_1.ModelManager.DangoAbyssModel.GetRecoverySelectionCountMap(
            this._a1,
          );
        if (
          ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryTimesCountAll(
            e,
          ) <= 0
        )
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            "Text_NotEnoughItem_Text",
          );
        else {
          var t = [];
          for (const i of this._a1) t.push(i.IncId);
          DangoAbyssActivityController_1.DangoAbyssActivityController.RequestPluginRecovery(
            t,
          );
        }
      }),
      (this.OnClickMask = () => {
        this.GetItem(11).SetUIActive(!1),
          this.GetButton(12).RootUIComp.SetUIActive(!1);
      }),
      (this.OnClickAll = (e) => {
        this.ca1(0 === e);
      }),
      (this.ua1 = (e, t) => {
        (e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemTipsData(
          e,
          t,
        )),
          (t =
            ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e));
        this.ShowTipsComponent(t);
      }),
      (this.ha1 = (t) => {
        var e = this._a1.findIndex((e) => e.IncId === t);
        0 <= e && this._a1.splice(e, 1),
          this.amc.RemoveAndRefresh(t),
          this.IT1();
      }),
      (this.da1 = (e) => {
        !e || e.length <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Calabash",
              75,
              "Proto_AbyssPluginSynthesisResponse.Proto_OutputItems为空",
            )
          : UiManager_1.UiManager.OpenView(
              "DangoAbyssPluginRecoveryResultView",
              e,
              () => {
                (this._a1 = []), this.d4e(), this.IT1();
              },
            );
      }),
      (this.FNt = (e) => {
        (this.ypt = e), this.amc.UpdateDataList(this.ypt);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UILoopScrollViewComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
      [13, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [5, this.I5t],
        [4, this.p5t],
        [12, this.OnClickMask],
        [13, this.OnClickAll],
      ]);
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    (this.yil = this.OpenParam),
      (this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent()),
      await this.Vvt.CreateByActorAsync(this.GetItem(11).GetOwner());
    var e =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity(),
      t = new SelectableComponent_1.SelectableComponentData();
    (t.IsNumSelectable = !0),
      (t.OnChangeSelectedFunction = this.bmc),
      this.amc.InitLoopScroller(
        this.GetLoopScrollViewComponent(8),
        this.GetItem(10),
        t,
      ),
      this.amc.SetMaxSize(e),
      (this.yc1 = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.Sc1,
      )),
      (this.adi = new FilterSortEntrance_1.FilterSortEntrance(
        this.GetItem(7),
        this.FNt,
      ));
  }
  OnBeforeShow() {
    this.d4e(), this.IT1(), this.GetItem(0).SetUIActive(!0);
  }
  d4e() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetAllPluginItemList(),
      t =
        ((this.ypt = e),
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(
          this.GetText(6),
          DangoAbyssDefine_1.TEXT_PLUGIN_COUNT,
          e.length,
        ),
        this.GetItem(9).SetUIActive(e.length <= 0),
        this.amc.UpdateComponent(e, this._a1),
        this.yil.GetDangoId());
    this.adi.UpdateData(41, e, t);
  }
  IT1() {
    var e,
      t,
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity(),
      i =
        (LguiUtil_1.LguiUtil.TrySetLocalTextNew(
          this.GetText(2),
          DangoAbyssDefine_1.TEXT_RECOVERY_SELECT,
          this._a1.length,
          i,
        ),
        ModelManager_1.ModelManager.DangoAbyssModel.GetRecoverySelectionCountMap(
          this._a1,
        )),
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryTimesCountMap(i),
      i =
        ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryRewardItemMap(i),
      s = new Array();
    for ([e, t] of i) {
      var o = { ItemId: e, Count: t };
      s.push(o);
    }
    i = i.get(DangoAbyssDefine_1.CURRENCY_ITEM_EXP_ID) ?? 0;
    this.yc1.RefreshByData(s),
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(
        this.GetText(3),
        DangoAbyssDefine_1.TEXT_RECOVERY_TIMES,
        i,
      );
  }
  ShowTipsComponent(e) {
    this.Vvt.Refresh(e),
      this.GetItem(11).SetUIActive(!0),
      this.GetButton(12).RootUIComp.SetUIActive(!0);
  }
  ca1(e) {
    if (e) this._a1 = [];
    else
      for (const i of this.ypt) {
        const s = i.GetUniqueId();
        var t;
        i.GetCanRecovery() &&
          void 0 === this._a1.find((e) => e.IncId === s) &&
          (((t =
            SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(
              i,
            )).SelectedCount = 1),
          this._a1.push(t));
      }
    this.amc.UpdateComponent(this.ypt, this._a1);
    e = this.yil.GetDangoId();
    this.adi.UpdateData(41, this.ypt, e), this.IT1();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.ua1,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.ha1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAbyssPluginRecovery,
        this.da1,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSelectItemAdd,
      this.ua1,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.ha1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAbyssPluginRecovery,
        this.da1,
      );
  }
}
exports.DangoAbyssPluginRecoveryView = DangoAbyssPluginRecoveryView;
//# sourceMappingURL=DangoAbyssPluginRecoveryView.js.map
