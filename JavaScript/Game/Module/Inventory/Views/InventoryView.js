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
      (this.Kci = void 0),
      (this.sdi = 0),
      (this.xmi = []),
      (this.JPt = void 0),
      (this.adi = void 0),
      (this.hdi = void 0),
      (this.ldi = new Map()),
      (this._di = void 0),
      (this.udi = void 0),
      (this.cdi = []),
      (this.mdi = new Map()),
      (this.Ivt = void 0),
      (this.ddi = void 0),
      (this.SPe = void 0),
      (this.vxt = void 0),
      (this.TipsButtonRelationMap = void 0),
      (this.TipsButtonIndexMap = void 0),
      (this.Cdi = void 0),
      (this.gdi = 0),
      (this.WGe = void 0),
      (this.fdi = !1),
      (this.pdi = !1),
      (this.vdi = !1),
      (this.Mdi = !1),
      (this.InvalidItemTempList = []),
      (this.IsInvalidItemViewShow = !1),
      (this.Edi = () => {
        this.Sdi();
      }),
      (this.ydi = (t) => {
        this.IsInvalidItemViewShow
          ? this.InvalidItemTempList.push(t)
          : this.Idi(t);
      }),
      (this.Tdi = () => {
        1 === this.gdi && this.SetViewMode(0);
      }),
      (this.Ldi = () => {
        0 === this.gdi && this.SetViewMode(1);
      }),
      (this.OnClickedUseItemButton = () => {
        var t = ModelManager_1.ModelManager.InventoryModel,
          e = t.GetSelectedItemData();
        e &&
          (this.Ddi(e),
          2 === e.GetRedDotDisableRule() && this.Rdi(e),
          0 === e.GetItemDataType()
            ? (t.SaveNewCommonItemConfigIdList(),
              t.SaveRedDotCommonItemConfigIdList())
            : (t.SaveNewAttributeItemUniqueIdList(),
              t.SaveRedDotAttributeItemUniqueIdList()),
          0 <= (t = this.cdi.indexOf(e)) && this.JPt.RefreshGridProxy(t),
          this.Udi(0, !1),
          this.Adi(e),
          ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(
            e.GetConfigId(),
            1,
          ));
      }),
      (this.OnClickedSpecialItemFuncUseButton = () => {
        var t = ModelManager_1.ModelManager.InventoryModel,
          e = t.GetSelectedItemData();
        e &&
          (this.Ddi(e),
          2 === e.GetRedDotDisableRule() && this.Rdi(e),
          0 === e.GetItemDataType()
            ? (t.SaveNewCommonItemConfigIdList(),
              t.SaveRedDotCommonItemConfigIdList())
            : (t.SaveNewAttributeItemUniqueIdList(),
              t.SaveRedDotAttributeItemUniqueIdList()),
          this.Adi(e),
          ControllerHolder_1.ControllerHolder.SpecialItemController.AutoEquipOrUnEquipSpecialItem(
            e.GetConfigId(),
          )) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ResetToBattleView,
          );
      }),
      (this.OnClickedWeaponCultivateButton = () => {
        var t =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
        t && SkipTaskManager_1.SkipTaskManager.Run(4, t.GetUniqueId());
      }),
      (this.OnClickedVisionCultivateButton = () => {
        var t =
          ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
        t && SkipTaskManager_1.SkipTaskManager.Run(5, t.GetUniqueId());
      }),
      (this.o4a = () => {
        ControllerHolder_1.ControllerHolder.FragmentMemoryController.OpenFragmentMemoryView();
      }),
      (this.Vgt = () => {
        UiManager_1.UiManager.CloseView("InventoryView"),
          UiManager_1.UiManager.IsViewShow("PowerView") &&
            UiManager_1.UiManager.CloseView("PowerView");
      }),
      (this.wdi = () => {
        this.Bdi();
      }),
      (this.bdi = () => {
        this.Bdi();
      }),
      (this.qdi = () => {
        this.Bdi();
      }),
      (this.Gdi = (t) => {
        this.Bdi();
      }),
      (this.Ndi = (t) => {
        this.Bdi();
      }),
      (this.Uft = (t, e, i) => {
        this.Odi(),
          ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(t) &&
            ((t =
              ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
                t,
              )),
            this.kdi(0, t <= 0));
      }),
      (this.e9e = (t, e) => {}),
      (this.$Ge = (t) => {
        "UseBuffItemView" === t &&
          (this.SPe.StopSequenceByKey("Tc"),
          this.SPe.PlaySequencePurely("Tc", !1, !0),
          (t = this.cdi[this.sdi])) &&
          this.Xpt(t);
      }),
      (this.zze = () => {
        this.Fdi();
      }),
      (this.SNa = (e) => {
        var i =
          ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
        if (i)
          for (let t = 0; t < this.cdi.length; t++) {
            var s = this.cdi[t];
            if (s.GetUniqueId() === e) {
              s.SetIsLock(i.GetIsLock()),
                s.SetIsDeprecate(i.GetIsDeprecated()),
                s.RemoveNewItem(),
                this.JPt.RefreshGridProxy(t);
              break;
            }
          }
      }),
      (this.FNt = (e, t, i) => {
        this.fdi = !0;
        if (
          (1 === this.gdi &&
            (e.sort(this.SortViewDataSelectOn),
            this.SetDestroyAllSelectedState(void 0, !1)),
          (this.cdi = e),
          this.jNt(e),
          this.pdi)
        )
          this.Xpt(this.Hdi());
        else if (1 === i) this.Xpt(e[0]);
        else {
          let t = void 0;
          this.Kci && this.cdi.includes(this.Kci) && (t = this.Kci),
            this.Xpt(t ?? e[0]);
        }
        (this.fdi = !1), (this.pdi = !1);
      }),
      (this.cHe = () => {
        var t = new InventoryMediumItemGrid_1.InventoryMediumItemGrid();
        return t.BindOnItemButtonClickedCallback(this.BTt), t;
      }),
      (this.jdi = (t, e) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.Wdi = (t) => {
        var e = ModelManager_1.ModelManager.InventoryModel;
        e.GetSelectedTypeIndex() !== t &&
          (this.Kdi(), e.SetSelectedTypeIndex(t), this.Qdi(t));
      }),
      (this.yqe = (t) => {
        t = this.ddi[t];
        return new CommonTabData_1.CommonTabData(
          t.Icon,
          new CommonTabTitleData_1.CommonTabTitleData(t.Name),
        );
      }),
      (this.BTt = (t) => {
        var e;
        this.Kci === t
          ? ((e = this.cdi.indexOf(t)),
            this.JPt.DeselectCurrentGridProxy(!1),
            this.JPt.SelectGridProxy(e),
            1 === this.gdi && this.Xdi(!t.GetSelectOn(), t))
          : this.Xpt(t);
      }),
      (this.$di = () => {
        this.Ydi();
      }),
      (this.Jdi = () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ItemDestroyNotJump",
        );
      }),
      (this.zdi = 0),
      (this.Zdi = new Set()),
      (this.OnClickedDestroyExecuteButton = () => {
        if (1 === this.gdi)
          if (0 === this.Zdi.size)
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "ItemDestroyNotChoose",
            );
          else {
            let i = !1;
            const h = [];
            var s = Array.from(this.Zdi.values()),
              r = (s.sort(this.SortViewDataConfigId), s.length);
            for (let e = 0; e < r; e++) {
              let t = 0;
              for (
                ;
                e + 1 < r &&
                s[e].GetConfigId() === s[e + 1].GetConfigId() &&
                0 === s[e].GetUniqueId() &&
                0 === s[e + 1].GetUniqueId();

              )
                (t += s[e].GetSelectNum()), e++;
              var n = {
                L8n: s[e].GetConfigId(),
                b9n: s[e].GetUniqueId(),
                m9n: t + s[e].GetSelectNum(),
              };
              h.push(n), !i && 4 <= s[e].GetQuality() && (i = !0);
            }
            var t,
              e = () => {
                ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructPreviewRequest(
                  h,
                );
              };
            ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction ||
            !i
              ? e()
              : (((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  167,
                )).HasToggle = !0),
                (t.ToggleText =
                  MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                    "Text_ItemRecycleConfirmToggle_text",
                  )),
                t.SetToggleFunction(this.RMt),
                t.FunctionMap.set(2, e),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  t,
                ));
          }
      }),
      (this.RMt = (t) => {
        ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction = t;
      }),
      (this.eCi = (t) => {
        if (1 === this.gdi) {
          var e = t;
          if (!this.tCi() || !e)
            for (const i of this.cdi)
              if (
                (i.IsItemCanDestroy() &&
                  0 !== i.GetUniqueId() &&
                  this.Xdi(e, i),
                this.tCi() && e)
              )
                break;
        }
      }),
      (this.SortViewDataSelectOn = (t, e) => {
        t = t.GetSelectOn() ? 1 : 0;
        return (e.GetSelectOn() ? 1 : 0) - t;
      }),
      (this.SortViewDataConfigId = (t, e) => t.GetConfigId() - e.GetConfigId()),
      (this.KGe = (t) => {
        var e =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ItemRecycleCount",
          );
        return new LguiUtil_1.TableTextArgNew(e, t);
      }),
      (this.QGe = (t) => {
        var e;
        !this.Kci ||
          (e = this.cdi.indexOf(this.Kci)) < 0 ||
          (this.Kci.SetSelectNum(t), this.JPt.RefreshGridProxy(e));
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
        [13, this.Ldi],
        [14, this.Tdi],
        [20, this.OnClickedDestroyExecuteButton],
        [18, this.eCi],
      ]);
  }
  iCi() {
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
      }),
      this.TipsButtonRelationMap.set(4, {
        Function: this.o4a,
        Text: "Text_FragmentMemoryButton_Text",
        Index: 0,
      });
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(9),
      e = this.GetItem(10),
      i =
        ((this._di = new CommonCurrencyItem_1.CommonCurrencyItem()),
        (this.udi = new CommonCurrencyItem_1.CommonCurrencyItem()),
        this.GetItem(11)),
      t =
        ((this.vxt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent()),
        await this._di.CreateThenShowByActorAsync(t.GetOwner()),
        await this.udi.CreateThenShowByActorAsync(e.GetOwner()),
        await this.vxt.CreateByActorAsync(i.GetOwner()),
        ModelManager_1.ModelManager.InventoryModel),
      e = t.GetSelectedTypeIndex(),
      i =
        ((this.Kci = t.GetSelectedItemData()),
        (this.sdi = 0),
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )),
        this.GetItem(19)),
      t =
        ((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(i)),
        this.WGe.SetMinValue(1),
        this.WGe.SetUiActive(!1),
        this.iCi(),
        await this.oCi(e),
        this.rCi(),
        this.nCi(),
        this.sCi(),
        this.Fdi(),
        (this.Cdi = new Array(this.ddi.length).fill(0)),
        this.GetItem(8)),
      i = t.GetWidth(),
      e = t.GetHeight();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "背包物品滚动框ViewPort尺寸：",
        ["宽度", i],
        ["高度", e],
      );
  }
  OnAfterPlayStartSequence() {
    var t = this.Ivt.GetSelectedIndex();
    this.Ivt.ScrollToToggleByIndex(t);
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Ivt.SelectToggleByIndex(t, !0), this.Qdi(t);
  }
  OnAfterShow() {
    this.aCi(), this.hCi();
  }
  OnBeforeDestroy() {
    for (const e of this.xmi) e.Destroy();
    this.lCi(),
      this._Ci(),
      (this.xmi.length = 0),
      (this.sdi = 0),
      (this.Kci = void 0),
      (this.JPt = void 0),
      this.adi.Destroy(),
      this._di.Destroy(),
      (this._di = void 0),
      this.udi.Destroy(),
      (this.udi = void 0),
      this.vxt.Destroy(),
      (this.vxt = void 0),
      (this.Cdi = void 0),
      this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0));
    var t = ModelManager_1.ModelManager.InventoryModel;
    t.SaveNewCommonItemConfigIdList(),
      t.SaveNewAttributeItemUniqueIdList(),
      t.SaveRedDotCommonItemConfigIdList(),
      t.SaveRedDotAttributeItemUniqueIdList();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddWeaponItemList,
      this.wdi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddPhantomItemList,
        this.bdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        this.Ndi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.SNa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.Uft,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        this.e9e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.zze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$di,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.NotifyInvalidItem,
        this.ydi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddWeaponItemList,
      this.wdi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddPhantomItemList,
        this.bdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        this.Ndi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.SNa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.Uft,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        this.e9e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.zze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemUpdate,
        this.$di,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.NotifyInvalidItem,
        this.ydi,
      );
  }
  Odi() {
    this.ldi.clear(),
      ModelManager_1.ModelManager.BuffItemModel.GetInCdBuffItemMap(this.ldi),
      this.ldi.size <= 0
        ? this.lCi()
        : (this.Sdi(),
          TimerSystem_1.TimerSystem.Has(this.hdi) ||
            (this.hdi = TimerSystem_1.TimerSystem.Forever(
              this.Edi,
              ItemViewDefine_1.REFRESH_CD_INTERVAL,
            )),
          this.Fdi());
  }
  lCi() {
    TimerSystem_1.TimerSystem.Has(this.hdi) &&
      TimerSystem_1.TimerSystem.Remove(this.hdi),
      (this.hdi = void 0);
  }
  Sdi() {
    var t = [];
    for (const s of this.ldi.values()) {
      var e,
        i = s.ItemConfigId;
      for (let t = 0; t < this.cdi.length; t++)
        this.cdi[t].GetConfigId() === i &&
          (e = this.JPt.UnsafeGetGridProxy(t)) &&
          e.RefreshCoolDown();
      s.GetBuffItemRemainCdTime() <= 0 && t.push(i);
    }
    for (const r of t)
      this.ldi.delete(r), r === this.Kci.GetConfigId() && this.kdi(0, !0);
  }
  hCi() {
    ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemCheckRequest();
  }
  uCi() {
    var t = this.InvalidItemTempList.pop();
    t && this.Idi(t);
  }
  Idi(t) {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(174);
    (e.IsMultipleView = !0),
      (e.ItemIdMap = t),
      e.SetCloseFunction(() => {
        (this.IsInvalidItemViewShow = !1), this.uCi();
      }),
      (this.IsInvalidItemViewShow = !0),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  Bdi() {
    this.SetViewMode(this.gdi), this.aCi();
  }
  Fdi() {
    var t;
    !TimerSystem_1.TimerSystem.Has(this.hdi) ||
      (t = Time_1.Time.TimeDilation) <= 0 ||
      TimerSystem_1.TimerSystem.ChangeDilation(this.hdi, t);
  }
  cCi(t) {
    var e = t.GetConfig(),
      i = t.GetConfigId(),
      e = e.ShowUseButton,
      s =
        (e && this.mCi([0]),
        ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(i));
    s &&
      e &&
      ((s =
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(i)),
      this.kdi(0, s <= 0)),
      2 === t.GetRedDotDisableRule()
        ? this.Udi(0, t.HasRedDot())
        : this.Udi(0, !1);
  }
  n4a(t) {
    var e = new Array();
    if (this.Kci)
      switch (this.Kci.GetItemType()) {
        case 13:
          var i = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
            t.GetConfigId(),
          );
          if (0 < i.UseButtonAdditionParam.length)
            for (const s of i.UseButtonAdditionParam)
              (1 === s &&
                !ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen()) ||
                e.push(s);
          else
            ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
              0 === i.SpecialItemType &&
              e.push(1);
          break;
        case 2:
          e.push(2);
          break;
        case 9:
          e.push(3);
          break;
        default:
          t.GetConfig().ShowUseButton && e.push(0);
      }
    return e;
  }
  Ydi() {
    if (this.Kci) {
      var e = this.Kci.GetConfigId(),
        i =
          ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
      let t = void 0;
      (t = e === i ? "UnEquip" : void 0 !== i ? "Instead" : "Equip"),
        this.fCi(1, t);
    }
  }
  sCi() {
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(
      this.GetItem(12),
      this.FNt,
    );
  }
  pCi(t) {
    for (const i of this.ddi) {
      var e =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
            i.Id,
          ),
        e = 0 === t ? e.UseWayId : e.DestroyUseWayId;
      this.adi.ClearData(e);
    }
  }
  vCi(t) {
    var e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(t),
      i = void 0 !== e && e?.bFilterSortVisible;
    let s = 0;
    var r =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(t);
    switch (this.gdi) {
      case 0:
        (s = r.UseWayId), this.adi.SetUiActive(i);
        break;
      case 1:
        s = r.DestroyUseWayId;
        var n = 0 === this.zdi;
        this.adi.SetUiActive(i && n);
    }
    e = this.MCi(t);
    this.ECi(s, e), this.SCi(t, e);
  }
  ECi(t, e) {
    var i = 0 === this.gdi ? 1 : 2;
    this.adi.UpdateDataWithConfig(t, i, e);
  }
  Hdi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex(),
      t = this.Cdi[t];
    return this.cdi.length > t
      ? this.cdi[t]
      : 0 < this.cdi.length
        ? this.cdi[0]
        : void 0;
  }
  jNt(t) {
    var e;
    this.JPt &&
      ((e = t.length),
      this.JPt.RefreshByData(
        t,
        void 0,
        () => {
          this.yCi(t.length <= 0);
        },
        !0,
      ),
      e <= 0) &&
      ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(
        void 0,
      );
  }
  nCi() {
    var t = this.GetItem(7),
      e = t.GetOwner();
    t.SetUIActive(!0),
      (this.JPt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(6),
        e,
        this.cHe,
      )),
      t.SetUIActive(!1);
  }
  rCi() {
    this._di.RefreshTemp(InventoryDefine_1.COMMON_COIN),
      this._di.SetToPayShopFunction(),
      this._di.RefreshAddButtonActive(),
      this.udi.RefreshTemp(InventoryDefine_1.ADVANCED_COIN),
      this.udi.SetToPayShopFunction(),
      this.udi.RefreshAddButtonActive();
  }
  async oCi(t) {
    var e;
    (this.ddi =
      ModelManager_1.ModelManager.InventoryModel.GetOpenIdMainTypeConfig()),
      this.ddi.length <= 0 ||
        (this.ddi.sort((t, e) => t.SequenceId - e.SequenceId),
        (e = new CommonTabComponentData_1.CommonTabComponentData(
          this.jdi,
          this.Wdi,
          this.yqe,
        )),
        (this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(1),
            e,
            this.Vgt,
          )),
        (e = this.ICi(this.ddi)),
        await this.Ivt.RefreshTabItemAsync(e),
        this.Ivt.SelectToggleByIndex(t, !0),
        this.Ivt.GetTabItemByIndex(1));
  }
  ICi(t) {
    var e = t.length,
      i = this.Ivt.CreateTabItemDataByLength(e);
    for (let t = 0; t < e; t++) {
      var s = this.ddi[t];
      s && (i[t].RedDotName = this.TCi(s.Id));
    }
    return i;
  }
  TCi(t) {
    let e = void 0;
    switch (t) {
      case 0:
        e = "InventoryVirtual";
        break;
      case 1:
        e = "InventoryCommon";
        break;
      case 2:
        e = "InventoryWeapon";
        break;
      case 3:
        e = "InventoryPhantom";
        break;
      case 4:
        e = "InventoryCollection";
        break;
      case 5:
        e = "InventoryMaterial";
        break;
      case 6:
        e = "InventoryMission";
        break;
      case 7:
        e = "InventorySpecial";
        break;
      case 8:
        e = "InventoryCard";
    }
    return e;
  }
  LCi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Qdi(t);
  }
  Qdi(t) {
    this.pdi = !0;
    t = this.ddi[t].Id;
    this.vCi(t), this.Odi();
  }
  MCi(t) {
    this._Ci();
    var e,
      i,
      s = ModelManager_1.ModelManager.InventoryModel;
    for (const a of s.GetItemDataBaseByMainType(t))
      if (0 !== a.GetType()) {
        if (a instanceof CommonItemData_1.CommonItemData) {
          var r = a.GetMaxStackCount();
          if (r <= 0) continue;
          var n = a.GetConfig();
          if (!n) continue;
          var h = a.GetConfigId();
          this.DCi(
            n.Id,
            a.GetCount(),
            r,
            n.QualityId,
            !1,
            !1,
            s.IsNewCommonItem(h),
            s.IsCommonItemHasRedDot(h),
            a,
          );
        }
        a instanceof WeaponItemData_1.WeaponItemData
          ? (r = a.GetConfig()) &&
            ((n = a.GetUniqueId()),
            (h = {
              ConfigId: r.ItemId,
              Count: 1,
              QualityId: r.QualityId,
              IsLock: a.GetIsLock(),
              IsDeprecate: a.GetIsDeprecated(),
              IsNewItem: s.IsNewAttributeItem(n),
              ItemDataType: 2,
              ItemDataBase: a,
              HasRedDot: s.IsAttributeItemHasRedDot(n),
              ItemOperationMode: this.gdi,
              IsSelectOn: !1,
              SelectOnNum: 0,
              StackId: 0,
            }),
            this.RCi(h))
          : a instanceof PhantomItemData_1.PhantomItemData &&
            (i = a.GetConfig()) &&
            ((e = a.GetUniqueId()),
            (i = {
              ConfigId: i.ItemId,
              Count: 1,
              QualityId: i.QualityId,
              IsLock: a.GetIsLock(),
              IsDeprecate: a.GetIsDeprecated(),
              IsNewItem: s.IsNewAttributeItem(e),
              ItemDataType: 3,
              ItemDataBase: a,
              HasRedDot: s.IsAttributeItemHasRedDot(e),
              ItemOperationMode: this.gdi,
              IsSelectOn: !1,
              SelectOnNum: 0,
              StackId: 0,
            }),
            this.RCi(i));
      }
    return this.cdi;
  }
  _Ci() {
    (this.cdi.length = 0), this.mdi.clear();
  }
  aCi() {
    if (this.ddi) {
      var t = [];
      for (const a of this.ddi) {
        var e =
            ModelManager_1.ModelManager.InventoryModel.GetInventoryItemGridCountByMainType(
              a.Id,
            ),
          i =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
              a.Id,
            ),
          s = i.PackageId;
        ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(s)
          .PackageCapacity <= e &&
          ((s = i.Name),
          (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s) + " "),
          t.push(e));
      }
      var r = 0 < t.length;
      if (!this.vdi && r) {
        var n = new StringBuilder_1.StringBuilder();
        for (const o of t) n.Append(o);
        var h = new ConfirmBoxDefine_1.ConfirmBoxDataNew(173);
        h.SetTextArgs(n.ToString()),
          (this.vdi = !0),
          h.FunctionMap.set(1, () => {
            this.vdi = !1;
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            h,
          );
      }
      this.Mdi !== r && this.UCi(r), (this.Mdi = r);
    }
  }
  UCi(t) {
    t
      ? this.UiViewSequence.PlaySequence("Notice")
      : this.UiViewSequence.StopSequenceByKey("Notice", void 0, !0);
  }
  RCi(t) {
    var e = new ItemViewData_1.ItemViewData(t);
    for (const s of Array.from(this.Zdi.values()))
      if (s.IsEqual(e, !0)) {
        e.SetSelectOn(s.GetSelectOn()), e.SetSelectNum(s.GetSelectNum());
        break;
      }
    this.cdi.push(e);
    t = t.ConfigId;
    let i = this.mdi.get(t);
    return i || ((i = new Set()), this.mdi.set(t, i)), i.add(e), e;
  }
  ACi(t) {
    return this.mdi.get(t);
  }
  DCi(i, s, r, n, h, a, o, _, m) {
    if (!(r <= 0)) {
      let t = s,
        e = 0;
      const v = {
        ConfigId: i,
        Count: r,
        QualityId: n,
        IsLock: h,
        IsDeprecate: a,
        IsNewItem: o,
        ItemDataType: 0,
        ItemDataBase: m,
        HasRedDot: _,
        ItemOperationMode: this.gdi,
        IsSelectOn: !1,
        SelectOnNum: 0,
        StackId: 0,
      };
      for (; 0 < t - r; ) {
        const v = {
          ConfigId: i,
          Count: r,
          QualityId: n,
          IsLock: h,
          IsDeprecate: a,
          IsNewItem: o,
          ItemDataType: 0,
          ItemDataBase: m,
          HasRedDot: _,
          ItemOperationMode: this.gdi,
          IsSelectOn: !1,
          SelectOnNum: 0,
          StackId: 0,
        };
        (v.Count = r), (v.StackId = e), this.RCi(v), (t -= r), e++;
      }
      (v.Count = t), (v.StackId = e), this.RCi(v);
    }
  }
  Xpt(t) {
    var e, i;
    t
      ? ((e = t.GetRedDotDisableRule()),
        (i = ModelManager_1.ModelManager.InventoryModel),
        this.Ddi(t),
        1 === e && this.Rdi(t),
        0 === t.GetItemDataType()
          ? (i.SaveNewCommonItemConfigIdList(),
            i.SaveRedDotCommonItemConfigIdList())
          : (i.SaveNewAttributeItemUniqueIdList(),
            i.SaveRedDotAttributeItemUniqueIdList()),
        this.PCi(t),
        this.Adi(t),
        this.RefreshItemDescription(t),
        this.Kdi(),
        1 === this.gdi &&
          (this.xCi(t, this.fdi), this.fdi || this.Xdi(!t.GetSelectOn(), t)))
      : this.wCi();
  }
  SCi(t, e) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig,
      t = i.GetItemMainTypeConfig(t),
      s = t.Name,
      t = t.PackageId,
      i = i.GetPackageConfig(t),
      t = this.GetText(5),
      t = (LguiUtil_1.LguiUtil.SetLocalTextNew(t, s), e.length),
      s = i.PackageCapacity,
      e = this.GetText(2);
    s <= t
      ? (e.SetText(`<color=red>${t}</color>/` + s),
        AudioSystem_1.AudioSystem.PostEvent("ui_inventory_capacity_full"))
      : e.SetText(t + "/" + s);
  }
  yCi(t) {
    var e = this.GetItem(4),
      i = this.GetLoopScrollViewComponent(6);
    e.SetUIActive(t),
      i.RootUIComp.SetUIActive(!t),
      this.BCi(),
      t && 1 === this.gdi && this.SetDestroyViewMode(0);
  }
  Kdi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Cdi[t] = this.JPt.GetSelectedGridIndex();
  }
  PCi(t) {
    this.Kci && this.JPt.DeselectCurrentGridProxy();
    var e = this.cdi.indexOf(t);
    this.JPt.IsGridDisplaying(e) || this.JPt.ScrollToGridIndex(e),
      (this.Kci = t),
      (this.sdi = e),
      ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(t),
      this.JPt.SelectGridProxy(e, !0),
      this.JPt.RefreshGridProxy(e),
      this.RefreshItemTipsFunction(t);
  }
  Ddi(t) {
    if ((t.RemoveNewItem(), !(0 < t.GetUniqueId()))) {
      var e = this.ACi(t.GetConfigId());
      if (e) for (const i of e) i !== t && i.RemoveNewItem();
    }
  }
  Rdi(t) {
    if ((t.RemoveRedDotItem(), !(0 < t.GetUniqueId()))) {
      var e = this.ACi(t.GetConfigId());
      if (e) for (const i of e) i !== t && i.RemoveRedDotItem();
    }
  }
  Adi(t) {
    if (!(0 < t.GetUniqueId())) {
      var e,
        i = this.ACi(t.GetConfigId());
      if (i)
        for (const s of i)
          s !== t && ((e = this.cdi.indexOf(s)), this.JPt.RefreshGridProxy(e));
    }
  }
  RefreshItemTipsFunction(t) {
    var e = this.Kci.GetItemType(),
      t = t.GetItemDataBase(),
      i = (this.vxt.ClearButtonList(), this.n4a(t));
    this.mCi(i),
      13 === e
        ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() &&
          this.Ydi()
        : 9 !== e && 2 !== e && this.cCi(t);
  }
  RefreshItemDescription(t) {
    var t = t.GetItemDataBase(),
      e = t.GetConfigId(),
      t = t.GetUniqueId();
    const i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(
      e,
      t,
    );
    switch (this.gdi) {
      case 1:
        var s = i.GetWayData ?? [];
        for (const i of s) i.Function = this.Jdi;
        (i.GetWayData = s),
          this.vxt.RefreshTips(i),
          this.vxt.SetVisible(!0),
          this.vxt.SetTipsComponentLockButton(!1);
        break;
      case 0:
        this.vxt.RefreshTips(i), this.vxt.SetVisible(!0);
    }
    this.SPe.StopCurrentSequence();
  }
  wCi() {
    this.vxt.SetVisible(!1);
  }
  kdi(t, e) {
    t = this.TipsButtonIndexMap.get(t);
    t && this.vxt.SetButtonEnableByIndex(t, e);
  }
  fCi(t, e, i) {
    this.TipsButtonIndexMap.has(t) &&
      ((t = this.TipsButtonIndexMap.get(t)),
      this.vxt.SetButtonTextByIndex(t, e, i));
  }
  Udi(t, e) {
    t = this.TipsButtonIndexMap.get(t);
    void 0 !== t && this.vxt.SetButtonRedDotVisible(t, e);
  }
  mCi(t) {
    let e = 0;
    var i = [];
    for (const r of t) {
      var s = this.TipsButtonRelationMap.get(r);
      if (!s)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Inventory", 38, "背包Tips按钮功能设置错误")
        );
      (s.Index = e), this.TipsButtonIndexMap.set(r, e), i.push(s), e++;
    }
    this.vxt.RefreshButton(i);
  }
  tCi() {
    return this.Zdi.size === ItemViewDefine_1.MAX_DESTROY_MODE_COUNT;
  }
  SetViewMode(t) {
    var e = this.gdi,
      i = ((this.gdi = t), this.Zdi.clear(), this.GetButton(14)),
      s = this.GetButton(20),
      r = this.GetExtendToggle(18),
      n = this.GetItem(15),
      h = this.GetText(16),
      a = this.GetText(17),
      t =
        (e !== this.gdi && this.pCi(e),
        (this.Ivt.NeedCaptionSwitchWithToggle = 0 === this.gdi),
        ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex());
    switch (
      (this.Ivt.SelectToggleByIndex(t, !0), this.LCi(), this.BCi(), this.gdi)
    ) {
      case 0:
        this.Ivt.SetCloseBtnShowState(!0),
          i.RootUIComp.SetUIActive(!1),
          this.vxt.SetButtonPanelVisible(!0),
          r.RootUIComp.SetUIActive(!1),
          s.RootUIComp.SetUIActive(!1),
          this.WGe.SetUiActive(!1),
          n.SetUIActive(!1),
          h.SetUIActive(!1),
          a.SetUIActive(!1);
        break;
      case 1:
        this.Ivt.SetTitle(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ItemRecycle_text",
          ),
        );
        var o =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_DestroyModeIcon",
          );
        this.Ivt.SetTitleIcon(o),
          this.Ivt.SetCloseBtnShowState(!1),
          i.RootUIComp.SetUIActive(!0),
          this.vxt.SetButtonPanelVisible(!1),
          s.RootUIComp.SetUIActive(!0),
          n.SetUIActive(!0),
          this.bCi(),
          a.SetUIActive(!0);
    }
    e !== this.gdi &&
      this.UiViewSequence.PlaySequence(
        0 === e ? "DestroyShow" : "DestroyHide",
        !0,
      );
  }
  SetDestroyViewMode(t) {
    this.zdi = t;
    var e = this.GetText(16);
    switch (this.zdi) {
      case 0:
        var i =
            ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex(),
          i = this.ddi[i].Id,
          i =
            ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(
              i,
            ),
          i = void 0 !== i && i?.bFilterSortVisible;
        i || e.ShowTextNew("Text_ItemRecycleChooseTip_text"),
          e.SetUIActive(!i),
          this.adi.SetUiActive(i),
          this.SetDestroyAllSelectedState(i),
          this.WGe.SetUiActive(!1);
        break;
      case 1:
        e.SetUIActive(!0),
          e.ShowTextNew("Text_ItemRecycleLimited_text"),
          this.WGe.SetUiActive(!1),
          this.adi.SetUiActive(!1),
          this.SetDestroyAllSelectedState(!1);
        break;
      case 2:
        e.SetUIActive(!1),
          this.WGe.SetUiActive(!0),
          this.adi.SetUiActive(!1),
          this.SetDestroyAllSelectedState(!1);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 38, "切换摧毁模式表现", [
        "Mode",
        this.zdi.toString(),
      ]);
  }
  xCi(t, e) {
    var i = !t.IsItemCanDestroy();
    if (i) this.SetDestroyViewMode(e ? 0 : 1);
    else
      switch (t.GetItemDataType()) {
        case 0:
          this.SetDestroyViewMode(e ? 0 : 2), e || this.qCi(t);
          break;
        case 2:
        case 3:
          this.SetDestroyViewMode(0);
      }
  }
  Xdi(t, e) {
    if (e)
      if (this.tCi() && t)
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ItemDestroyCountLimit",
        );
      else if (e.IsItemCanDestroy()) {
        var i = this.cdi.indexOf(e);
        if (!(i < 0)) {
          for (const s of Array.from(this.Zdi.values()))
            if (s.IsEqual(e, !0)) {
              this.Zdi.delete(s);
              break;
            }
          t ? (this.Zdi.add(e), e.SetSelectNum(1)) : e.SetSelectNum(0),
            e.SetSelectOn(t),
            this.JPt.RefreshGridProxy(i),
            this.GCi(t, e);
        }
      } else 1 !== this.zdi && this.SetDestroyViewMode(1);
  }
  GCi(t, e) {
    switch ((this.bCi(), this.zdi)) {
      case 0:
        t && this.xCi(e, !1);
        break;
      case 2:
        t ? this.qCi(this.Kci) : this.SetDestroyViewMode(0);
    }
  }
  SetDestroyAllSelectedState(t, e) {
    var i = this.GetExtendToggle(18);
    void 0 !== t && i.RootUIComp.SetUIActive(t),
      void 0 !== e && i.SetToggleState(e ? 1 : 0, !1);
  }
  bCi() {
    var t = this.Zdi.size,
      e = this.GetText(17);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      e,
      "Text_ItemRecycleChosenTotal_text",
      t.toString(),
      ItemViewDefine_1.MAX_DESTROY_MODE_COUNT.toString(),
    );
  }
  BCi() {
    var t = this.GetButton(13),
      e = 1 === this.gdi,
      i = 0 <= this.JPt.NCi;
    t.RootUIComp.SetUIActive(!e && i);
  }
  qCi(t) {
    t &&
      ((t = {
        MaxNumber: t.GetCount(),
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe,
      }),
      this.WGe.Init(t));
  }
}
exports.InventoryView = InventoryView;
//# sourceMappingURL=InventoryView.js.map
