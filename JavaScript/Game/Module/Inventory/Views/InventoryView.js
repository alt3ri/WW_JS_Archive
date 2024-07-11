"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance"),
  ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool"),
  ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  PowerController_1 = require("../../Power/PowerController"),
  PowerDefines_1 = require("../../Power/PowerDefines"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  InventoryDefine_1 = require("../InventoryDefine"),
  CommonItemData_1 = require("../ItemData/CommonItemData"),
  PhantomItemData_1 = require("../ItemData/PhantomItemData"),
  WeaponItemData_1 = require("../ItemData/WeaponItemData"),
  ItemViewData_1 = require("../ItemViewData"),
  InventoryMediumItemGrid_1 = require("./InventoryMediumItemGrid"),
  ItemViewDefine_1 = require("./ItemViewDefine");
class InventoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Kui = void 0),
      (this.smi = 0),
      (this.xci = []),
      (this.XAt = void 0),
      (this.ami = void 0),
      (this.hmi = void 0),
      (this.lmi = new Map()),
      (this._mi = void 0),
      (this.umi = void 0),
      (this.cmi = []),
      (this.mmi = new Map()),
      (this.cpt = void 0),
      (this.dmi = void 0),
      (this.EPe = void 0),
      (this.gPt = void 0),
      (this.TipsButtonRelationMap = void 0),
      (this.TipsButtonIndexMap = void 0),
      (this.Cmi = void 0),
      (this.gmi = 0),
      (this.WGe = void 0),
      (this.fmi = !1),
      (this.pmi = !1),
      (this.vmi = !1),
      (this.Mmi = !1),
      (this.InvalidItemTempList = []),
      (this.IsInvalidItemViewShow = !1),
      (this.Smi = () => {
        this.Emi();
      }),
      (this.ymi = (e) => {
        this.IsInvalidItemViewShow
          ? this.InvalidItemTempList.push(e)
          : this.Imi(e);
      }),
      (this.Tmi = () => {
        1 === this.gmi && this.SetViewMode(0);
      }),
      (this.Lmi = () => {
        0 === this.gmi && this.SetViewMode(1);
      }),
      (this.OnClickedUseItemButton = () => {
        var e = ModelManager_1.ModelManager.InventoryModel,
          t = e.GetSelectedItemData();
        t &&
          (this.Dmi(t),
          2 === t.GetRedDotDisableRule() && this.Rmi(t),
          0 === t.GetItemDataType()
            ? (e.SaveNewCommonItemConfigIdList(),
              e.SaveRedDotCommonItemConfigIdList())
            : (e.SaveNewAttributeItemUniqueIdList(),
              e.SaveRedDotAttributeItemUniqueIdList()),
          0 <= (e = this.cmi.indexOf(t)) && this.XAt.RefreshGridProxy(e),
          this.Umi(0, !1),
          this.Ami(t),
          ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(
            t.GetConfigId(),
            1,
          ));
      }),
      (this.OnClickedSpecialItemFuncUseButton = () => {
        var e = ModelManager_1.ModelManager.InventoryModel,
          t = e.GetSelectedItemData();
        t &&
          (this.Dmi(t),
          2 === t.GetRedDotDisableRule() && this.Rmi(t),
          0 === t.GetItemDataType()
            ? (e.SaveNewCommonItemConfigIdList(),
              e.SaveRedDotCommonItemConfigIdList())
            : (e.SaveNewAttributeItemUniqueIdList(),
              e.SaveRedDotAttributeItemUniqueIdList()),
          this.Ami(t),
          ControllerHolder_1.ControllerHolder.SpecialItemController.AutoEquipOrUnEquipSpecialItem(
            t.GetConfigId(),
          )) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ResetToBattleView,
          );
      }),
      (this.OnClickedWeaponCultivateButton = () => {
        var e =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
        e && SkipTaskManager_1.SkipTaskManager.Run(4, e.GetUniqueId());
      }),
      (this.OnClickedVisionCultivateButton = () => {
        var e =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
        e && SkipTaskManager_1.SkipTaskManager.Run(5, e.GetUniqueId());
      }),
      (this.Pmi = () => {
        ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
          ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock();
        var e = ConfigManager_1.ConfigManager.PowerConfig.GetPowerItemInfos(
          PowerDefines_1.PowerConst.SingCube,
        );
        ModelManager_1.ModelManager.PowerModel.PowerCount + e.RenewValue >
        ConfigManager_1.ConfigManager.PowerConfig.GetPowerChargeLimit()
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "PowerBound",
            )
          : PowerController_1.PowerController.ExchangePower(e, 1);
      }),
      (this.xmi = (e, t) => {
        var i = ConfigManager_1.ConfigManager.PowerConfig.GetPowerItemInfos(
          PowerDefines_1.PowerConst.SingCube,
        );
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PowerBuySucceed",
          i.RenewValue,
        ),
          ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
          ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock();
      }),
      (this.ACt = () => {
        UiManager_1.UiManager.CloseView("InventoryView"),
          UiManager_1.UiManager.IsViewShow("PowerView") &&
            UiManager_1.UiManager.CloseView("PowerView");
      }),
      (this.wmi = () => {
        this.Bmi();
      }),
      (this.bmi = () => {
        this.Bmi();
      }),
      (this.qmi = () => {
        this.Bmi();
      }),
      (this.Gmi = (e) => {
        this.Bmi();
      }),
      (this.Nmi = (e) => {
        this.Bmi();
      }),
      (this.f0t = (e, t, i) => {
        this.Omi(),
          ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e) &&
            ((e =
              ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
                e,
              )),
            this.kmi(0, e <= 0));
      }),
      (this.k6e = (e, t) => {}),
      (this.$Ge = (e) => {
        "UseBuffItemView" === e &&
          (this.EPe.StopSequenceByKey("Tc"),
          this.EPe.PlaySequencePurely("Tc", !1, !0),
          (e = this.cmi[this.smi])) &&
          this.qft(e);
      }),
      (this.kJe = () => {
        this.Fmi();
      }),
      (this.Vmi = (t, i) => {
        if (ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t))
          for (let e = 0; e < this.cmi.length; e++) {
            var s = this.cmi[e];
            if (s.GetUniqueId() === t) {
              s.SetIsLock(i), s.RemoveNewItem(), this.XAt.RefreshGridProxy(e);
              break;
            }
          }
      }),
      (this.kGt = (t, e, i) => {
        this.fmi = !0;
        if (
          (1 === this.gmi &&
            (t.sort(this.SortViewDataSelectOn),
            this.SetDestroyAllSelectedState(void 0, !1)),
          (this.cmi = t),
          this.HGt(t),
          this.pmi)
        )
          this.qft(this.Hmi());
        else if (1 === i) this.qft(t[0]);
        else {
          let e = void 0;
          this.Kui && this.cmi.includes(this.Kui) && (e = this.Kui),
            this.qft(e ?? t[0]);
        }
        (this.fmi = !1), (this.pmi = !1);
      }),
      (this.z9e = () => {
        var e = new InventoryMediumItemGrid_1.InventoryMediumItemGrid();
        return e.BindOnItemButtonClickedCallback(this.UIt), e;
      }),
      (this.jmi = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Wmi = (e) => {
        var t = ModelManager_1.ModelManager.InventoryModel;
        t.GetSelectedTypeIndex() !== e &&
          (this.Kmi(), t.SetSelectedTypeIndex(e), this.Qmi(e));
      }),
      (this.yqe = (e) => {
        e = this.dmi[e];
        return new CommonTabData_1.CommonTabData(
          e.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(e.Name),
        );
      }),
      (this.UIt = (e) => {
        var t;
        this.Kui === e
          ? ((t = this.cmi.indexOf(e)),
            this.XAt.DeselectCurrentGridProxy(!1),
            this.XAt.SelectGridProxy(t),
            1 === this.gmi && this.Xmi(!e.GetSelectOn(), e))
          : this.qft(e);
      }),
      (this.$mi = () => {
        this.Ymi();
      }),
      (this.Jmi = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ItemDestroyNotJump",
        );
      }),
      (this.zmi = 0),
      (this.Zmi = new Set()),
      (this.OnClickedDestroyExecuteButton = () => {
        if (1 === this.gmi)
          if (0 === this.Zmi.size)
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ItemDestroyNotChoose",
            );
          else {
            let i = !1;
            const o = [];
            var s = Array.from(this.Zmi.values()),
              r = (s.sort(this.SortViewDataConfigId), s.length);
            for (let t = 0; t < r; t++) {
              let e = 0;
              for (
                ;
                t + 1 < r &&
                s[t].GetConfigId() === s[t + 1].GetConfigId() &&
                0 === s[t].GetUniqueId() &&
                0 === s[t + 1].GetUniqueId();

              )
                (e += s[t].GetSelectNum()), t++;
              var n = {
                G3n: s[t].GetConfigId(),
                Q5n: s[t].GetUniqueId(),
                I5n: e + s[t].GetSelectNum(),
              };
              o.push(n), !i && 4 <= s[t].GetQuality() && (i = !0);
            }
            var e,
              t = () => {
                ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructPreviewRequest(
                  o,
                );
              };
            ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction ||
            !i
              ? t()
              : (((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  167,
                )).HasToggle = !0),
                (e.ToggleText =
                  MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                    "Text_ItemRecycleConfirmToggle_text",
                  )),
                e.SetToggleFunction(this.gvt),
                e.FunctionMap.set(2, t),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                ));
          }
      }),
      (this.gvt = (e) => {
        ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction = e;
      }),
      (this.edi = (e) => {
        if (1 === this.gmi) {
          var t = e;
          if (!this.tdi() || !t)
            for (const i of this.cmi)
              if (
                (i.IsItemCanDestroy() &&
                  0 !== i.GetUniqueId() &&
                  this.Xmi(t, i),
                this.tdi() && t)
              )
                break;
        }
      }),
      (this.SortViewDataSelectOn = (e, t) => {
        e = e.GetSelectOn() ? 1 : 0;
        return (t.GetSelectOn() ? 1 : 0) - e;
      }),
      (this.SortViewDataConfigId = (e, t) => e.GetConfigId() - t.GetConfigId()),
      (this.KGe = (e) => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ItemRecycleCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        var t;
        !this.Kui ||
          (t = this.cmi.indexOf(this.Kui)) < 0 ||
          (this.Kui.SetSelectNum(e), this.XAt.RefreshGridProxy(t));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UILoopScrollViewComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIText],
      [18, UE.UIExtendToggle],
      [19, UE.UIItem],
      [20, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [13, this.Lmi],
        [14, this.Tmi],
        [20, this.OnClickedDestroyExecuteButton],
        [18, this.edi],
      ]);
  }
  idi() {
    (this.TipsButtonIndexMap = new Map()),
      (this.TipsButtonRelationMap = new Map()),
      this.TipsButtonRelationMap.set(0, {
        Function: this.OnClickedUseItemButton,
        Text: "HotKeyText_UseItemTips_Name",
        Index: 0,
      }),
      this.TipsButtonRelationMap.set(1, {
        Function: this.OnClickedSpecialItemFuncUseButton,
        Text: "Text_ButtonTextConfirm_Text",
        Index: 0,
      }),
      this.TipsButtonRelationMap.set(2, {
        Function: this.OnClickedWeaponCultivateButton,
        Text: "Text_BagFosterButton_Text",
        Index: 0,
      }),
      this.TipsButtonRelationMap.set(3, {
        Function: this.OnClickedVisionCultivateButton,
        Text: "Text_BagFosterButton_Text",
        Index: 0,
      });
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(9),
      t = this.GetItem(10),
      i =
        ((this._mi = new CommonCurrencyItem_1.CommonCurrencyItem()),
        (this.umi = new CommonCurrencyItem_1.CommonCurrencyItem()),
        this.GetItem(11)),
      e =
        ((this.gPt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent()),
        await this._mi.CreateThenShowByActorAsync(e.GetOwner()),
        await this.umi.CreateThenShowByActorAsync(t.GetOwner()),
        await this.gPt.CreateByActorAsync(i.GetOwner()),
        ModelManager_1.ModelManager.InventoryModel),
      t = e.GetSelectedTypeIndex(),
      i =
        ((this.Kui = e.GetSelectedItemData()),
        (this.smi = 0),
        (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )),
        this.GetItem(19)),
      e =
        ((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(i)),
        this.WGe.SetMinValue(1),
        this.WGe.SetUiActive(!1),
        this.idi(),
        await this.odi(t),
        this.rdi(),
        this.ndi(),
        this.sdi(),
        this.Fmi(),
        (this.Cmi = new Array(this.dmi.length).fill(0)),
        this.GetItem(8)),
      i = e.GetWidth(),
      t = e.GetHeight();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "背包物品滚动框ViewPort尺寸：",
        ["宽度", i],
        ["高度", t],
      );
  }
  OnAfterPlayStartSequence() {
    var e = this.cpt.GetSelectedIndex();
    this.cpt.ScrollToToggleByIndex(e);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.cpt.SelectToggleByIndex(e, !0), this.Qmi(e);
  }
  OnAfterShow() {
    this.adi(), this.hdi();
  }
  OnBeforeDestroy() {
    for (const t of this.xci) t.Destroy();
    this.ldi(),
      this._di(),
      (this.xci.length = 0),
      (this.smi = 0),
      (this.Kui = void 0),
      (this.XAt = void 0),
      this.ami.Destroy(),
      this._mi.Destroy(),
      (this._mi = void 0),
      this.umi.Destroy(),
      (this.umi = void 0),
      this.gPt.Destroy(),
      (this.gPt = void 0),
      (this.Cmi = void 0),
      this.cpt && (this.cpt.Destroy(), (this.cpt = void 0));
    var e = ModelManager_1.ModelManager.InventoryModel;
    e.SaveNewCommonItemConfigIdList(),
      e.SaveNewAttributeItemUniqueIdList(),
      e.SaveRedDotCommonItemConfigIdList(),
      e.SaveRedDotAttributeItemUniqueIdList();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddWeaponItemList,
      this.wmi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddPhantomItemList,
        this.bmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        this.Nmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemLock,
        this.Vmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.f0t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        this.k6e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$mi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BoughtItem,
        this.xmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PowerShopReady,
        this.Pmi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NotifyInvalidItem,
        this.ymi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddWeaponItemList,
      this.wmi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddPhantomItemList,
        this.bmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        this.Nmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemLock,
        this.Vmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.f0t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        this.k6e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.kJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$mi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BoughtItem,
        this.xmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PowerShopReady,
        this.Pmi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NotifyInvalidItem,
        this.ymi,
      );
  }
  Omi() {
    this.lmi.clear(),
      ModelManager_1.ModelManager.BuffItemModel.GetInCdBuffItemMap(this.lmi),
      this.lmi.size <= 0
        ? this.ldi()
        : (this.Emi(),
          TimerSystem_1.TimerSystem.Has(this.hmi) ||
            (this.hmi = TimerSystem_1.TimerSystem.Forever(
              this.Smi,
              ItemViewDefine_1.REFRESH_CD_INTERVAL,
            )),
          this.Fmi());
  }
  ldi() {
    TimerSystem_1.TimerSystem.Has(this.hmi) &&
      TimerSystem_1.TimerSystem.Remove(this.hmi),
      (this.hmi = void 0);
  }
  Emi() {
    var e = [];
    for (const s of this.lmi.values()) {
      var t,
        i = s.ItemConfigId;
      for (let e = 0; e < this.cmi.length; e++)
        this.cmi[e].GetConfigId() === i &&
          (t = this.XAt.UnsafeGetGridProxy(e)) &&
          t.RefreshCoolDown();
      s.GetBuffItemRemainCdTime() <= 0 && e.push(i);
    }
    for (const r of e)
      this.lmi.delete(r), r === this.Kui.GetConfigId() && this.kmi(0, !0);
  }
  hdi() {
    ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemCheckRequest();
  }
  udi() {
    var e = this.InvalidItemTempList.pop();
    e && this.Imi(e);
  }
  Imi(e) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(174);
    (t.IsMultipleView = !0),
      (t.ItemIdMap = e),
      t.SetCloseFunction(() => {
        (this.IsInvalidItemViewShow = !1), this.udi();
      }),
      (this.IsInvalidItemViewShow = !0),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  Bmi() {
    this.SetViewMode(this.gmi), this.adi();
  }
  Fmi() {
    var e;
    !TimerSystem_1.TimerSystem.Has(this.hmi) ||
      (e = Time_1.Time.TimeDilation) <= 0 ||
      TimerSystem_1.TimerSystem.ChangeDilation(this.hmi, e);
  }
  cdi(e) {
    var t = e.GetConfig(),
      i = e.GetConfigId(),
      t = t.ShowUseButton,
      s =
        (t && this.mdi([0]),
        ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(i));
    s &&
      t &&
      ((s =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(i)),
      this.kmi(0, s <= 0)),
      2 === e.GetRedDotDisableRule()
        ? this.Umi(0, e.HasRedDot())
        : this.Umi(0, !1);
  }
  ddi() {
    ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
      (this.mdi([1]), this.Ymi());
  }
  Cdi() {
    this.mdi([2]);
  }
  gdi() {
    this.mdi([3]);
  }
  Ymi() {
    if (this.Kui) {
      var t = this.Kui.GetConfigId(),
        i =
          ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
      let e = void 0;
      (e = t === i ? "UnEquip" : void 0 !== i ? "Instead" : "Equip"),
        this.fdi(1, e);
    }
  }
  sdi() {
    this.ami = new FilterSortEntrance_1.FilterSortEntrance(
      this.GetItem(12),
      this.kGt,
    );
  }
  pdi(e) {
    for (const i of this.dmi) {
      var t =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
            i.Id,
          ),
        t = 0 === e ? t.UseWayId : t.DestroyUseWayId;
      this.ami.ClearData(t);
    }
  }
  vdi(e) {
    var t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(e),
      i = void 0 !== t && t?.bFilterSortVisible;
    let s = 0;
    var r =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(e);
    switch (this.gmi) {
      case 0:
        (s = r.UseWayId), this.ami.SetUiActive(i);
        break;
      case 1:
        s = r.DestroyUseWayId;
        var n = 0 === this.zmi;
        this.ami.SetUiActive(i && n);
    }
    t = this.Mdi(e);
    this.Sdi(s, t), this.Edi(e, t);
  }
  Sdi(e, t) {
    this.ami.UpdateData(e, t);
  }
  Hmi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex(),
      e = this.Cmi[e];
    return this.cmi.length > e
      ? this.cmi[e]
      : 0 < this.cmi.length
        ? this.cmi[0]
        : void 0;
  }
  HGt(e) {
    var t;
    this.XAt &&
      ((t = e.length),
      this.XAt.RefreshByData(
        e,
        void 0,
        () => {
          this.ydi(e.length <= 0);
        },
        !0,
      ),
      t <= 0) &&
      ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(
        void 0,
      );
  }
  ndi() {
    var e = this.GetItem(7),
      t = e.GetOwner();
    e.SetUIActive(!0),
      (this.XAt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        t,
        this.z9e,
      )),
      e.SetUIActive(!1);
  }
  rdi() {
    this._mi.RefreshTemp(InventoryDefine_1.COMMON_COIN),
      this._mi.SetToPayShopFunction(),
      this._mi.SetPayShopButtonActive(),
      this.umi.RefreshTemp(InventoryDefine_1.ADVANCED_COIN),
      this.umi.SetToPayShopFunction(),
      this.umi.SetPayShopButtonActive();
  }
  async odi(e) {
    var t;
    (this.dmi =
      ModelManager_1.ModelManager.InventoryModel.GetOpenIdMainTypeConfig()),
      this.dmi.length <= 0 ||
        (this.dmi.sort((e, t) => e.SequenceId - t.SequenceId),
        (t = new CommonTabComponentData_1.CommonTabComponentData(
          this.jmi,
          this.Wmi,
          this.yqe,
        )),
        (this.cpt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(1),
            t,
            this.ACt,
          )),
        (t = this.Idi(this.dmi)),
        await this.cpt.RefreshTabItemAsync(t),
        this.cpt.SelectToggleByIndex(e, !0),
        this.cpt.GetTabItemByIndex(1));
  }
  Idi(e) {
    var t = e.length,
      i = this.cpt.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      var s = this.dmi[e];
      s && (i[e].RedDotName = this.Tdi(s.Id));
    }
    return i;
  }
  Tdi(e) {
    let t = void 0;
    switch (e) {
      case 0:
        t = "InventoryVirtual";
        break;
      case 1:
        t = "InventoryCommon";
        break;
      case 2:
        t = "InventoryWeapon";
        break;
      case 3:
        t = "InventoryPhantom";
        break;
      case 4:
        t = "InventoryCollection";
        break;
      case 5:
        t = "InventoryMaterial";
        break;
      case 6:
        t = "InventoryMission";
        break;
      case 7:
        t = "InventorySpecial";
        break;
      case 8:
        t = "InventoryCard";
    }
    return t;
  }
  Ldi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Qmi(e);
  }
  Qmi(e) {
    this.pmi = !0;
    e = this.dmi[e].Id;
    this.vdi(e), this.Omi();
  }
  Mdi(e) {
    this._di();
    var t,
      i,
      s = ModelManager_1.ModelManager.InventoryModel;
    for (const h of s.GetItemDataBaseByMainType(e))
      if (0 !== h.GetType()) {
        if (h instanceof CommonItemData_1.CommonItemData) {
          var r = h.GetMaxStackCount();
          if (r <= 0) continue;
          var n = h.GetConfig();
          if (!n) continue;
          var o = h.GetConfigId();
          this.Ddi(
            n.Id,
            h.GetCount(),
            r,
            n.QualityId,
            !1,
            s.IsNewCommonItem(o),
            s.IsCommonItemHasRedDot(o),
            h,
          );
        }
        h instanceof WeaponItemData_1.WeaponItemData
          ? (r = h.GetConfig()) &&
            ((n = h.GetUniqueId()),
            (o = {
              ConfigId: r.ItemId,
              Count: 1,
              QualityId: r.QualityId,
              IsLock: h.GetIsLock(),
              IsNewItem: s.IsNewAttributeItem(n),
              ItemDataType: 2,
              ItemDataBase: h,
              HasRedDot: s.IsAttributeItemHasRedDot(n),
              ItemOperationMode: this.gmi,
              IsSelectOn: !1,
              SelectOnNum: 0,
              StackId: 0,
            }),
            this.Rdi(o))
          : h instanceof PhantomItemData_1.PhantomItemData &&
            (i = h.GetConfig()) &&
            ((t = h.GetUniqueId()),
            (i = {
              ConfigId: i.ItemId,
              Count: 1,
              QualityId: i.QualityId,
              IsLock: h.GetIsLock(),
              IsNewItem: s.IsNewAttributeItem(t),
              ItemDataType: 3,
              ItemDataBase: h,
              HasRedDot: s.IsAttributeItemHasRedDot(t),
              ItemOperationMode: this.gmi,
              IsSelectOn: !1,
              SelectOnNum: 0,
              StackId: 0,
            }),
            this.Rdi(i));
      }
    return this.cmi;
  }
  _di() {
    (this.cmi.length = 0), this.mmi.clear();
  }
  adi() {
    if (this.dmi) {
      var e = [];
      for (const h of this.dmi) {
        var t =
            ModelManager_1.ModelManager.InventoryModel.GetInventoryItemGridCountByMainType(
              h.Id,
            ),
          i =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
              h.Id,
            ),
          s = i.PackageId;
        ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(s)
          .PackageCapacity <= t &&
          ((s = i.Name),
          (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s) + " "),
          e.push(t));
      }
      var r = 0 < e.length;
      if (!this.vmi && r) {
        var n = new StringBuilder_1.StringBuilder();
        for (const a of e) n.Append(a);
        var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(173);
        o.SetTextArgs(n.ToString()),
          (this.vmi = !0),
          o.FunctionMap.set(1, () => {
            this.vmi = !1;
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            o,
          );
      }
      this.Mmi !== r && this.Udi(r), (this.Mmi = r);
    }
  }
  Udi(e) {
    e
      ? this.UiViewSequence.PlaySequence("Notice")
      : this.UiViewSequence.StopSequenceByKey("Notice", void 0, !0);
  }
  Rdi(e) {
    var t = new ItemViewData_1.ItemViewData(e);
    for (const s of Array.from(this.Zmi.values()))
      if (s.IsEqual(t, !0)) {
        t.SetSelectOn(s.GetSelectOn()), t.SetSelectNum(s.GetSelectNum());
        break;
      }
    this.cmi.push(t);
    e = e.ConfigId;
    let i = this.mmi.get(e);
    return i || ((i = new Set()), this.mmi.set(e, i)), i.add(t), t;
  }
  Adi(e) {
    return this.mmi.get(e);
  }
  Ddi(i, s, r, n, o, h, a, _) {
    if (!(r <= 0)) {
      let e = s,
        t = 0;
      const m = {
        ConfigId: i,
        Count: r,
        QualityId: n,
        IsLock: o,
        IsNewItem: h,
        ItemDataType: 0,
        ItemDataBase: _,
        HasRedDot: a,
        ItemOperationMode: this.gmi,
        IsSelectOn: !1,
        SelectOnNum: 0,
        StackId: 0,
      };
      for (; 0 < e - r; ) {
        const m = {
          ConfigId: i,
          Count: r,
          QualityId: n,
          IsLock: o,
          IsNewItem: h,
          ItemDataType: 0,
          ItemDataBase: _,
          HasRedDot: a,
          ItemOperationMode: this.gmi,
          IsSelectOn: !1,
          SelectOnNum: 0,
          StackId: 0,
        };
        (m.Count = r), (m.StackId = t), this.Rdi(m), (e -= r), t++;
      }
      (m.Count = e), (m.StackId = t), this.Rdi(m);
    }
  }
  qft(e) {
    var t, i;
    e
      ? ((t = e.GetRedDotDisableRule()),
        (i = ModelManager_1.ModelManager.InventoryModel),
        this.Dmi(e),
        1 === t && this.Rmi(e),
        0 === e.GetItemDataType()
          ? (i.SaveNewCommonItemConfigIdList(),
            i.SaveRedDotCommonItemConfigIdList())
          : (i.SaveNewAttributeItemUniqueIdList(),
            i.SaveRedDotAttributeItemUniqueIdList()),
        this.Pdi(e),
        this.Ami(e),
        this.RefreshItemDescription(e),
        this.Kmi(),
        1 === this.gmi &&
          (this.xdi(e, this.fmi), this.fmi || this.Xmi(!e.GetSelectOn(), e)))
      : this.wdi();
  }
  Edi(e, t) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig,
      e = i.GetItemMainTypeConfig(e),
      s = e.Name,
      e = e.PackageId,
      i = i.GetPackageConfig(e),
      e = this.GetText(5),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(e, s), t.length),
      s = i.PackageCapacity,
      t = this.GetText(2);
    s <= e
      ? (t.SetText(`<color=red>${e}</color>/` + s),
        AudioSystem_1.AudioSystem.PostEvent("ui_inventory_capacity_full"))
      : t.SetText(e + "/" + s);
  }
  ydi(e) {
    var t = this.GetItem(4),
      i = this.GetLoopScrollViewComponent(6);
    t.SetUIActive(e),
      i.RootUIComp.SetUIActive(!e),
      this.Bdi(),
      e && 1 === this.gmi && this.SetDestroyViewMode(0);
  }
  Kmi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Cmi[e] = this.XAt.GetSelectedGridIndex();
  }
  Pdi(e) {
    this.Kui && this.XAt.DeselectCurrentGridProxy();
    var t = this.cmi.indexOf(e);
    this.XAt.IsGridDisplaying(t) || this.XAt.ScrollToGridIndex(t),
      (this.Kui = e),
      (this.smi = t),
      ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(e),
      this.XAt.SelectGridProxy(t, !0),
      this.XAt.RefreshGridProxy(t),
      this.RefreshItemTipsFunction(e);
  }
  Dmi(e) {
    if ((e.RemoveNewItem(), !(0 < e.GetUniqueId()))) {
      var t = this.Adi(e.GetConfigId());
      if (t) for (const i of t) i !== e && i.RemoveNewItem();
    }
  }
  Rmi(e) {
    if ((e.RemoveRedDotItem(), !(0 < e.GetUniqueId()))) {
      var t = this.Adi(e.GetConfigId());
      if (t) for (const i of t) i !== e && i.RemoveRedDotItem();
    }
  }
  Ami(e) {
    if (!(0 < e.GetUniqueId())) {
      var t,
        i = this.Adi(e.GetConfigId());
      if (i)
        for (const s of i)
          s !== e && ((t = this.cmi.indexOf(s)), this.XAt.RefreshGridProxy(t));
    }
  }
  RefreshItemTipsFunction(e) {
    var t = this.Kui.GetItemType(),
      i = e.GetItemDataBase();
    switch ((this.gPt.ClearButtonList(), t)) {
      case 13:
        this.ddi();
        break;
      case 9:
        this.gdi();
        break;
      case 2:
        this.Cdi();
        break;
      default:
        this.cdi(i);
    }
  }
  RefreshItemDescription(e) {
    var e = e.GetItemDataBase(),
      t = e.GetConfigId(),
      e = e.GetUniqueId();
    const i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
      t,
      e,
    );
    switch (this.gmi) {
      case 1:
        var s = i.GetWayData ?? [];
        for (const i of s) i.Function = this.Jmi;
        (i.GetWayData = s),
          this.gPt.RefreshTips(i),
          this.gPt.SetVisible(!0),
          this.gPt.SetTipsComponentLockButton(!1);
        break;
      case 0:
        this.gPt.RefreshTips(i), this.gPt.SetVisible(!0);
    }
    this.EPe.StopCurrentSequence();
  }
  wdi() {
    this.gPt.SetVisible(!1);
  }
  kmi(e, t) {
    e = this.TipsButtonIndexMap.get(e);
    e && this.gPt.SetButtonEnableByIndex(e, t);
  }
  fdi(e, t, i) {
    this.TipsButtonIndexMap.has(e) &&
      ((e = this.TipsButtonIndexMap.get(e)),
      this.gPt.SetButtonTextByIndex(e, t, i));
  }
  Umi(e, t) {
    e = this.TipsButtonIndexMap.get(e);
    void 0 !== e && this.gPt.SetButtonRedDotVisible(e, t);
  }
  mdi(e) {
    let t = 0;
    var i = [];
    for (const r of e) {
      var s = this.TipsButtonRelationMap.get(r);
      if (!s)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Inventory", 38, "背包Tips按钮功能设置错误")
        );
      (s.Index = t), this.TipsButtonIndexMap.set(r, t), i.push(s), t++;
    }
    this.gPt.RefreshButton(i);
  }
  tdi() {
    return this.Zmi.size === ItemViewDefine_1.MAX_DESTROY_MODE_COUNT;
  }
  SetViewMode(e) {
    var t = this.gmi,
      i = ((this.gmi = e), this.Zmi.clear(), this.GetButton(14)),
      s = this.GetButton(20),
      r = this.GetExtendToggle(18),
      n = this.GetItem(15),
      o = this.GetText(16),
      h = this.GetText(17),
      e =
        (t !== this.gmi && this.pdi(t),
        (this.cpt.NeedCaptionSwitchWithToggle = 0 === this.gmi),
        ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex());
    switch (
      (this.cpt.SelectToggleByIndex(e, !0), this.Ldi(), this.Bdi(), this.gmi)
    ) {
      case 0:
        this.cpt.SetCloseBtnShowState(!0),
          i.RootUIComp.SetUIActive(!1),
          this.gPt.SetButtonPanelVisible(!0),
          r.RootUIComp.SetUIActive(!1),
          s.RootUIComp.SetUIActive(!1),
          this.WGe.SetUiActive(!1),
          n.SetUIActive(!1),
          o.SetUIActive(!1),
          h.SetUIActive(!1);
        break;
      case 1:
        this.cpt.SetTitle(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ItemRecycle_text",
          ),
        );
        var a =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_DestroyModeIcon",
          );
        this.cpt.SetTitleIcon(a),
          this.cpt.SetCloseBtnShowState(!1),
          i.RootUIComp.SetUIActive(!0),
          this.gPt.SetButtonPanelVisible(!1),
          s.RootUIComp.SetUIActive(!0),
          n.SetUIActive(!0),
          this.bdi(),
          h.SetUIActive(!0);
    }
    t !== this.gmi &&
      this.UiViewSequence.PlaySequence(
        0 === t ? "DestroyShow" : "DestroyHide",
        !0,
      );
  }
  SetDestroyViewMode(e) {
    this.zmi = e;
    var t = this.GetText(16);
    switch (this.zmi) {
      case 0:
        var i =
            ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex(),
          i = this.dmi[i].Id,
          i =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
              i,
            ),
          i = void 0 !== i && i?.bFilterSortVisible;
        i || t.ShowTextNew("Text_ItemRecycleChooseTip_text"),
          t.SetUIActive(!i),
          this.ami.SetUiActive(i),
          this.SetDestroyAllSelectedState(i),
          this.WGe.SetUiActive(!1);
        break;
      case 1:
        t.SetUIActive(!0),
          t.ShowTextNew("Text_ItemRecycleLimited_text"),
          this.WGe.SetUiActive(!1),
          this.ami.SetUiActive(!1),
          this.SetDestroyAllSelectedState(!1);
        break;
      case 2:
        t.SetUIActive(!1),
          this.WGe.SetUiActive(!0),
          this.ami.SetUiActive(!1),
          this.SetDestroyAllSelectedState(!1);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 38, "切换摧毁模式表现", [
        "Mode",
        this.zmi.toString(),
      ]);
  }
  xdi(e, t) {
    var i = !e.IsItemCanDestroy();
    if (i) this.SetDestroyViewMode(t ? 0 : 1);
    else
      switch (e.GetItemDataType()) {
        case 0:
          this.SetDestroyViewMode(t ? 0 : 2), t || this.qdi(e);
          break;
        case 2:
        case 3:
          this.SetDestroyViewMode(0);
      }
  }
  Xmi(e, t) {
    if (t)
      if (this.tdi() && e)
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ItemDestroyCountLimit",
        );
      else if (t.IsItemCanDestroy()) {
        var i = this.cmi.indexOf(t);
        if (!(i < 0)) {
          for (const s of Array.from(this.Zmi.values()))
            if (s.IsEqual(t, !0)) {
              this.Zmi.delete(s);
              break;
            }
          e ? (this.Zmi.add(t), t.SetSelectNum(1)) : t.SetSelectNum(0),
            t.SetSelectOn(e),
            this.XAt.RefreshGridProxy(i),
            this.Gdi(e, t);
        }
      } else 1 !== this.zmi && this.SetDestroyViewMode(1);
  }
  Gdi(e, t) {
    switch ((this.bdi(), this.zmi)) {
      case 0:
        e && this.xdi(t, !1);
        break;
      case 2:
        e ? this.qdi(this.Kui) : this.SetDestroyViewMode(0);
    }
  }
  SetDestroyAllSelectedState(e, t) {
    var i = this.GetExtendToggle(18);
    void 0 !== e && i.RootUIComp.SetUIActive(e),
      void 0 !== t && i.SetToggleState(t ? 1 : 0, !1);
  }
  bdi() {
    var e = this.Zmi.size,
      t = this.GetText(17);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      t,
      "Text_ItemRecycleChosenTotal_text",
      e.toString(),
      ItemViewDefine_1.MAX_DESTROY_MODE_COUNT.toString(),
    );
  }
  Bdi() {
    var e = this.GetButton(13),
      t = 1 === this.gmi,
      i = 0 <= this.XAt.Ndi;
    e.RootUIComp.SetUIActive(!t && i);
  }
  qdi(e) {
    e &&
      ((e = {
        MaxNumber: e.GetCount(),
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe,
      }),
      this.WGe.Init(e));
  }
}
exports.InventoryView = InventoryView;
//# sourceMappingURL=InventoryView.js.map
