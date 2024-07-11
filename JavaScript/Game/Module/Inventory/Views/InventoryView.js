"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PowerController_1 = require("../../Power/PowerController");
const PowerDefines_1 = require("../../Power/PowerDefines");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const InventoryDefine_1 = require("../InventoryDefine");
const CommonItemData_1 = require("../ItemData/CommonItemData");
const PhantomItemData_1 = require("../ItemData/PhantomItemData");
const WeaponItemData_1 = require("../ItemData/WeaponItemData");
const ItemViewData_1 = require("../ItemViewData");
const InventoryMediumItemGrid_1 = require("./InventoryMediumItemGrid");
const ItemViewDefine_1 = require("./ItemViewDefine");
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
        this.gmi === 1 && this.SetViewMode(0);
      }),
      (this.Lmi = () => {
        this.gmi === 0 && this.SetViewMode(1);
      }),
      (this.OnClickedUseItemButton = () => {
        let e = ModelManager_1.ModelManager.InventoryModel;
        const t = e.GetSelectedItemData();
        t &&
          (this.Dmi(t),
          t.GetRedDotDisableRule() === 2 && this.Rmi(t),
          t.GetItemDataType() === 0
            ? (e.SaveNewCommonItemConfigIdList(),
              e.SaveRedDotCommonItemConfigIdList())
            : (e.SaveNewAttributeItemUniqueIdList(),
              e.SaveRedDotAttributeItemUniqueIdList()),
          (e = this.cmi.indexOf(t)) >= 0 && this.XAt.RefreshGridProxy(e),
          this.Umi(0, !1),
          this.Ami(t),
          ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(
            t.GetConfigId(),
            1,
          ));
      }),
      (this.OnClickedSpecialItemFuncUseButton = () => {
        const e = ModelManager_1.ModelManager.InventoryModel;
        const t = e.GetSelectedItemData();
        t &&
          (this.Dmi(t),
          t.GetRedDotDisableRule() === 2 && this.Rmi(t),
          t.GetItemDataType() === 0
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
        const e =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
        e && SkipTaskManager_1.SkipTaskManager.Run(4, e.GetUniqueId());
      }),
      (this.OnClickedVisionCultivateButton = () => {
        const e =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
        e && SkipTaskManager_1.SkipTaskManager.Run(5, e.GetUniqueId());
      }),
      (this.Pmi = () => {
        ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenBuy(),
          ModelManager_1.ModelManager.PowerModel.UpdatePowerItemWhenGoodUnlock();
        const e = ConfigManager_1.ConfigManager.PowerConfig.GetPowerItemInfos(
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
        const i = ConfigManager_1.ConfigManager.PowerConfig.GetPowerItemInfos(
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
        e === "UseBuffItemView" &&
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
            const s = this.cmi[e];
            if (s.GetUniqueId() === t) {
              s.SetIsLock(i), s.RemoveNewItem(), this.XAt.RefreshGridProxy(e);
              break;
            }
          }
      }),
      (this.kGt = (t, e, i) => {
        this.fmi = !0;
        if (
          (this.gmi === 1 &&
            (t.sort(this.SortViewDataSelectOn),
            this.SetDestroyAllSelectedState(void 0, !1)),
          (this.cmi = t),
          this.HGt(t),
          this.pmi)
        )
          this.qft(this.Hmi());
        else if (i === 1) this.qft(t[0]);
        else {
          let e = void 0;
          this.Kui && this.cmi.includes(this.Kui) && (e = this.Kui),
            this.qft(e ?? t[0]);
        }
        (this.fmi = !1), (this.pmi = !1);
      }),
      (this.z9e = () => {
        const e = new InventoryMediumItemGrid_1.InventoryMediumItemGrid();
        return e.BindOnItemButtonClickedCallback(this.UIt), e;
      }),
      (this.jmi = (e, t) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Wmi = (e) => {
        const t = ModelManager_1.ModelManager.InventoryModel;
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
        let t;
        this.Kui === e
          ? ((t = this.cmi.indexOf(e)),
            this.XAt.DeselectCurrentGridProxy(!1),
            this.XAt.SelectGridProxy(t),
            this.gmi === 1 && this.Xmi(!e.GetSelectOn(), e))
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
        if (this.gmi === 1)
          if (this.Zmi.size === 0)
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ItemDestroyNotChoose",
            );
          else {
            let i = !1;
            const o = [];
            const s = Array.from(this.Zmi.values());
            const r = (s.sort(this.SortViewDataConfigId), s.length);
            for (let t = 0; t < r; t++) {
              let e = 0;
              for (
                ;
                t + 1 < r &&
                s[t].GetConfigId() === s[t + 1].GetConfigId() &&
                s[t].GetUniqueId() === 0 &&
                s[t + 1].GetUniqueId() === 0;

              )
                (e += s[t].GetSelectNum()), t++;
              const n = {
                G3n: s[t].GetConfigId(),
                Q5n: s[t].GetUniqueId(),
                I5n: e + s[t].GetSelectNum(),
              };
              o.push(n), !i && s[t].GetQuality() >= 4 && (i = !0);
            }
            let e;
            const t = () => {
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
        if (this.gmi === 1) {
          const t = e;
          if (!this.tdi() || !t)
            for (const i of this.cmi)
              if (
                (i.IsItemCanDestroy() &&
                  i.GetUniqueId() !== 0 &&
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
        const t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ItemRecycleCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        let t;
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
    var e = this.GetItem(9);
    var t = this.GetItem(10);
    var i =
      ((this._mi = new CommonCurrencyItem_1.CommonCurrencyItem()),
      (this.umi = new CommonCurrencyItem_1.CommonCurrencyItem()),
      this.GetItem(11));
    var e =
      ((this.gPt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent()),
      await this._mi.CreateThenShowByActorAsync(e.GetOwner()),
      await this.umi.CreateThenShowByActorAsync(t.GetOwner()),
      await this.gPt.CreateByActorAsync(i.GetOwner()),
      ModelManager_1.ModelManager.InventoryModel);
    var t = e.GetSelectedTypeIndex();
    var i =
      ((this.Kui = e.GetSelectedItemData()),
      (this.smi = 0),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetItem(19));
    var e =
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
      this.GetItem(8));
    var i = e.GetWidth();
    var t = e.GetHeight();
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
    const e = this.cpt.GetSelectedIndex();
    this.cpt.ScrollToToggleByIndex(e);
  }
  OnBeforeShow() {
    const e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
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
    const e = ModelManager_1.ModelManager.InventoryModel;
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
    const e = [];
    for (const s of this.lmi.values()) {
      var t;
      const i = s.ItemConfigId;
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
    const e = this.InvalidItemTempList.pop();
    e && this.Imi(e);
  }
  Imi(e) {
    const t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(174);
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
    let e;
    !TimerSystem_1.TimerSystem.Has(this.hmi) ||
      (e = Time_1.Time.TimeDilation) <= 0 ||
      TimerSystem_1.TimerSystem.ChangeDilation(this.hmi, e);
  }
  cdi(e) {
    var t = e.GetConfig();
    const i = e.GetConfigId();
    var t = t.ShowUseButton;
    let s =
      (t && this.mdi([0]),
      ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(i));
    s &&
      t &&
      ((s =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(i)),
      this.kmi(0, s <= 0)),
      e.GetRedDotDisableRule() === 2
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
      const t = this.Kui.GetConfigId();
      const i =
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
        );
      var t = e === 0 ? t.UseWayId : t.DestroyUseWayId;
      this.ami.ClearData(t);
    }
  }
  vdi(e) {
    let t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(e);
    const i = void 0 !== t && t?.bFilterSortVisible;
    let s = 0;
    const r =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(e);
    switch (this.gmi) {
      case 0:
        (s = r.UseWayId), this.ami.SetUiActive(i);
        break;
      case 1:
        s = r.DestroyUseWayId;
        var n = this.zmi === 0;
        this.ami.SetUiActive(i && n);
    }
    t = this.Mdi(e);
    this.Sdi(s, t), this.Edi(e, t);
  }
  Sdi(e, t) {
    this.ami.UpdateData(e, t);
  }
  Hmi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    var e = this.Cmi[e];
    return this.cmi.length > e
      ? this.cmi[e]
      : this.cmi.length > 0
        ? this.cmi[0]
        : void 0;
  }
  HGt(e) {
    let t;
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
    const e = this.GetItem(7);
    const t = e.GetOwner();
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
    let t;
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
    const t = e.length;
    const i = this.cpt.CreateTabItemDataByLength(t);
    for (let e = 0; e < t; e++) {
      const s = this.dmi[e];
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
    const e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Qmi(e);
  }
  Qmi(e) {
    this.pmi = !0;
    e = this.dmi[e].Id;
    this.vdi(e), this.Omi();
  }
  Mdi(e) {
    this._di();
    let t;
    let i;
    const s = ModelManager_1.ModelManager.InventoryModel;
    for (const h of s.GetItemDataBaseByMainType(e))
      if (h.GetType() !== 0) {
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
      const e = [];
      for (const h of this.dmi) {
        let t =
          ModelManager_1.ModelManager.InventoryModel.GetInventoryItemGridCountByMainType(
            h.Id,
          );
        const i =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
            h.Id,
          );
        let s = i.PackageId;
        ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(s)
          .PackageCapacity <= t &&
          ((s = i.Name),
          (t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s) + " "),
          e.push(t));
      }
      const r = e.length > 0;
      if (!this.vmi && r) {
        const n = new StringBuilder_1.StringBuilder();
        for (const a of e) n.Append(a);
        const o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(173);
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
    const t = new ItemViewData_1.ItemViewData(e);
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
      let e = s;
      let t = 0;
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
      for (; e - r > 0; ) {
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
    let t, i;
    e
      ? ((t = e.GetRedDotDisableRule()),
        (i = ModelManager_1.ModelManager.InventoryModel),
        this.Dmi(e),
        t === 1 && this.Rmi(e),
        e.GetItemDataType() === 0
          ? (i.SaveNewCommonItemConfigIdList(),
            i.SaveRedDotCommonItemConfigIdList())
          : (i.SaveNewAttributeItemUniqueIdList(),
            i.SaveRedDotAttributeItemUniqueIdList()),
        this.Pdi(e),
        this.Ami(e),
        this.RefreshItemDescription(e),
        this.Kmi(),
        this.gmi === 1 &&
          (this.xdi(e, this.fmi), this.fmi || this.Xmi(!e.GetSelectOn(), e)))
      : this.wdi();
  }
  Edi(e, t) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig;
    var e = i.GetItemMainTypeConfig(e);
    var s = e.Name;
    var e = e.PackageId;
    var i = i.GetPackageConfig(e);
    var e = this.GetText(5);
    var e = (LguiUtil_1.LguiUtil.SetLocalTextNew(e, s), t.length);
    var s = i.PackageCapacity;
    var t = this.GetText(2);
    s <= e
      ? (t.SetText(`<color=red>${e}</color>/` + s),
        AudioSystem_1.AudioSystem.PostEvent("ui_inventory_capacity_full"))
      : t.SetText(e + "/" + s);
  }
  ydi(e) {
    const t = this.GetItem(4);
    const i = this.GetLoopScrollViewComponent(6);
    t.SetUIActive(e),
      i.RootUIComp.SetUIActive(!e),
      this.Bdi(),
      e && this.gmi === 1 && this.SetDestroyViewMode(0);
  }
  Kmi() {
    const e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Cmi[e] = this.XAt.GetSelectedGridIndex();
  }
  Pdi(e) {
    this.Kui && this.XAt.DeselectCurrentGridProxy();
    const t = this.cmi.indexOf(e);
    this.XAt.IsGridDisplaying(t) || this.XAt.ScrollToGridIndex(t),
      (this.Kui = e),
      (this.smi = t),
      ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(e),
      this.XAt.SelectGridProxy(t, !0),
      this.XAt.RefreshGridProxy(t),
      this.RefreshItemTipsFunction(e);
  }
  Dmi(e) {
    if ((e.RemoveNewItem(), !(e.GetUniqueId() > 0))) {
      const t = this.Adi(e.GetConfigId());
      if (t) for (const i of t) i !== e && i.RemoveNewItem();
    }
  }
  Rmi(e) {
    if ((e.RemoveRedDotItem(), !(e.GetUniqueId() > 0))) {
      const t = this.Adi(e.GetConfigId());
      if (t) for (const i of t) i !== e && i.RemoveRedDotItem();
    }
  }
  Ami(e) {
    if (!(e.GetUniqueId() > 0)) {
      let t;
      const i = this.Adi(e.GetConfigId());
      if (i)
        for (const s of i)
          s !== e && ((t = this.cmi.indexOf(s)), this.XAt.RefreshGridProxy(t));
    }
  }
  RefreshItemTipsFunction(e) {
    const t = this.Kui.GetItemType();
    const i = e.GetItemDataBase();
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
    var e = e.GetItemDataBase();
    const t = e.GetConfigId();
    var e = e.GetUniqueId();
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
    const i = [];
    for (const r of e) {
      const s = this.TipsButtonRelationMap.get(r);
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
    const t = this.gmi;
    const i = ((this.gmi = e), this.Zmi.clear(), this.GetButton(14));
    const s = this.GetButton(20);
    const r = this.GetExtendToggle(18);
    const n = this.GetItem(15);
    const o = this.GetText(16);
    const h = this.GetText(17);
    var e =
      (t !== this.gmi && this.pdi(t),
      (this.cpt.NeedCaptionSwitchWithToggle = this.gmi === 0),
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
        t === 0 ? "DestroyShow" : "DestroyHide",
        !0,
      );
  }
  SetDestroyViewMode(e) {
    this.zmi = e;
    const t = this.GetText(16);
    switch (this.zmi) {
      case 0:
        var i =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
        var i = this.dmi[i].Id;
        var i =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
            i,
          );
        var i = void 0 !== i && i?.bFilterSortVisible;
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
    const i = !e.IsItemCanDestroy();
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
        const i = this.cmi.indexOf(t);
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
      } else this.zmi !== 1 && this.SetDestroyViewMode(1);
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
    const i = this.GetExtendToggle(18);
    void 0 !== e && i.RootUIComp.SetUIActive(e),
      void 0 !== t && i.SetToggleState(t ? 1 : 0, !1);
  }
  bdi() {
    const e = this.Zmi.size;
    const t = this.GetText(17);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      t,
      "Text_ItemRecycleChosenTotal_text",
      e.toString(),
      ItemViewDefine_1.MAX_DESTROY_MODE_COUNT.toString(),
    );
  }
  Bdi() {
    const e = this.GetButton(13);
    const t = this.gmi === 1;
    const i = this.XAt.Ndi >= 0;
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
// # sourceMappingURL=InventoryView.js.map
