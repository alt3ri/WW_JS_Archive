"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookingIngredientsVerticalView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid"),
  NumberSelectComponent_1 = require("../Common/NumberSelect/NumberSelectComponent"),
  ManufactureMaterialItem_1 = require("../Manufacture/Common/Item/ManufactureMaterialItem"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew"),
  CookController_1 = require("./CookController"),
  CookItemView_1 = require("./View/CookItemView"),
  CookProficiencyView_1 = require("./View/CookProficiencyView");
class MaterialSelectionCacheData {
  static SetMaterialSelectIndex(e) {
    MaterialSelectionCacheData.cGt = e;
  }
  static GetMaterialSelectIndex() {
    return MaterialSelectionCacheData.cGt;
  }
  static SetMaterialUseNum(e) {
    MaterialSelectionCacheData.mGt = e;
  }
  static GetMaterialUseNum() {
    return MaterialSelectionCacheData.mGt;
  }
  static CheckCanSelected(e) {
    return (
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) >=
      MaterialSelectionCacheData.GetMaterialUseNum()
    );
  }
}
(MaterialSelectionCacheData.TmpSelectedMaterialData = void 0),
  (MaterialSelectionCacheData.MaterialTypeNum = 0),
  (MaterialSelectionCacheData.cGt = 0),
  (MaterialSelectionCacheData.mGt = 0);
class SvInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.CGt = void 0),
      (this.fGt = void 0),
      (this.pGt = (e, t, i) => {
        t = new CookItemView_1.MachiningClueItem(t);
        return t.Update(e.IsUnlock, e.ContentText), { Key: i, Value: t };
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIVerticalLayout],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    (this.CGt = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(6),
      this.pGt,
    )),
      this.GetText(3).SetUIActive(!1),
      this.dde(),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    (this.CGt = void 0), (this.fGt = void 0), this.Cde();
  }
  dde() {}
  Cde() {}
  SetTypeName(e = void 0) {
    var t = this.GetText(0);
    e ? (t.SetUIActive(!0), t.SetText(e)) : t.SetUIActive(!1);
  }
  RefreshCooking(e, t) {
    var i;
    this.vGt(e) &&
      (this.fGt &&
        this.fGt.ItemId !== e.ItemId &&
        (ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = void 0),
      (this.fGt = e),
      (i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
        e.ItemId,
      )),
      (e = ConfigManager_1.ConfigManager.ItemConfig.GetItemAttributeDesc(
        e.DataId,
      )),
      (i = StringUtils_1.StringUtils.IsEmpty(i.FoodBackground)
        ? ""
        : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
            i.FoodBackground,
          )),
      this.CGt.SetActive(!1),
      this.GetText(3).SetUIActive(!0),
      this.GetText(3).SetText(e),
      this.GetText(5).SetText(i));
  }
  vGt(e) {
    return (
      !!e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Cook", 50, "缺少itemData数据"),
      !1)
    );
  }
  RefreshMachining(e) {
    if (this.vGt(e)) {
      (this.fGt = e), this.CGt.SetActive(!0);
      var t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
          e.ItemId,
        ),
        i = ItemInfoById_1.configItemInfoById.GetConfig(t.FinalItemId),
        i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
          i.BgDescription,
        ),
        r =
          (this.GetText(3).SetUIActive(!1),
          this.GetText(5).SetText(i),
          new Array());
      for (const a of t.InterationId) {
        var s,
          o = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(a);
        e.InteractiveList.includes(a)
          ? ((s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
              o.Introduce,
            )),
            r.push({ IsUnlock: !0, ContentText: s }))
          : ((s = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
              o.Description,
            )),
            r.push({ IsUnlock: !1, ContentText: s }));
      }
      this.CGt.RebuildLayoutByDataNew(r);
    }
  }
}
class CookingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.MGt = void 0),
      (this.ItemData = void 0),
      (this.WGe = void 0),
      (this.t6 = 1),
      (this.ShowMaterialItemRemoveControl = !1),
      (this.EGt = void 0),
      (this.gGt = void 0),
      (this.SGt = !1),
      (this.yGt = 0),
      (this.IGt = void 0),
      (this.OnChangeMaterialSelectionDelegate = void 0),
      (this.TGt = () => {
        var e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
        return (
          e.BindOnCanExecuteChange(() => !1),
          e.BindOnExtendToggleClicked((e) => {
            e = e.Data;
            e.K6n
              ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                  e.L8n,
                )
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "ItemSelectCookUnlockTip",
                );
          }),
          e
        );
      }),
      (this.I7e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenCookRole,
          this.ItemData.ItemId,
        );
      }),
      (this.LGt = (e) => {
        var t;
        (this.t6 = e),
          this.DGt(),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "Text_ItemSelectCookQuantityTip_text",
            this.t6,
          ),
          this.ItemData &&
            0 === this.ItemData.MainType &&
            this.RefreshProficiency(this.ItemData, this.t6),
          this.ItemData &&
            ((t = CookController_1.CookController.GetMaxCreateCount(
              this.ItemData.ItemId,
              this.ItemData.MainType,
            )),
            this.WGe.SetAddButtonInteractive(e < t),
            this.WGe.SetReduceButtonInteractive(1 < e));
      });
  }
  get CurrentSetCount() {
    return this.t6;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [19, UE.UIScrollViewWithScrollbarComponent],
      [17, UE.UIText],
      [18, UE.UIItem],
      [20, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [21, UE.UIItem],
      [8, UE.UIItem],
      [16, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIText],
      [24, UE.UIItem],
      [25, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIText],
      [13, UE.UITexture],
      [26, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  async OnBeforeStartAsync() {
    (this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(19),
      this.TGt,
    )),
      (this.MGt = new SvInfo()),
      await this.MGt.CreateByActorAsync(this.GetItem(0).GetOwner()),
      this.MGt.SetActive(!0),
      (this.gGt = new CookProficiencyView_1.ProficiencyView()),
      await this.gGt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
      this.gGt.BindChangeRoleClick(this.I7e);
  }
  OnStart() {
    this.GetItem(18).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(16).SetUIActive(!0),
      this.GetItem(18).SetUIActive(!0),
      this.GetItem(22).SetUIActive(!1),
      this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
      this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text");
    var e = this.GetItem(8),
      e =
        ((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(e)),
        { MaxNumber: 0, ValueChangeFunction: this.LGt });
    this.WGe.Init(e),
      this.WGe.SetUiActive(!0),
      this.WGe.SetNumberSelectTipsVisible(!1),
      this.WGe.SetAddReduceButtonActive(!0),
      this.GetText(12).SetUIActive(!1),
      (this.IGt = new MediumItemGrid_1.MediumItemGrid()),
      this.IGt.Initialize(this.GetItem(21).GetOwner()),
      this.IGt.BindOnCanExecuteChange(() => !1),
      this.IGt.BindOnExtendToggleClicked((e) => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      });
  }
  OnBeforeDestroy() {
    (this.MGt = void 0),
      (this.EGt = void 0),
      (this.OnChangeMaterialSelectionDelegate = void 0);
  }
  vGt(e) {
    return (
      !!e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Cook", 50, "缺少itemData数据"),
      !1)
    );
  }
  STi(t) {
    if (this.vGt(t)) {
      let e = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId;
      e ||
        ((e = ModelManager_1.ModelManager.CookModel.GetCookRoleId(t.ItemId)),
        (ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = e)),
        this.gGt.SetRoleTexture(e, t.ItemId);
    }
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var e = this.EGt?.GetScrollItemList();
    if (e) for (const t of e) t.SetTimes(this.t6);
  }
  UGt(e, t) {
    var i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    switch (t) {
      case 0:
        this.MGt.SetTypeName(), this.gGt.SetTypeContent(i);
        break;
      case 1:
        this.MGt.SetTypeName(i), this.gGt.SetTypeContent();
        break;
      default:
        this.MGt.SetTypeName(), this.gGt.SetTypeContent();
    }
  }
  AGt(e) {
    e.ExistEndTime <= 0
      ? (this.GetItem(24).SetUIActive(!1), this.WGe.ResetLimitMaxValue())
      : (this.GetItem(24).SetUIActive(!0),
        (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          e.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        this.GetText(25).SetText(e.CountDownText));
  }
  PGt(t) {
    if (void 0 === t || t.LimitTotalCount <= 0)
      this.GetItem(3).SetUIActive(!1), this.WGe.ResetLimitMaxValue();
    else {
      var i = t.LimitTotalCount - t.CookCount;
      this.WGe.SetLimitMaxValue(Math.max(1, i));
      let e = i.toString();
      0 === i &&
        (e = StringUtils_1.StringUtils.Format(
          "<color=#c25757>{0}</color>",
          i.toString(),
        )),
        this.GetItem(3).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "MakeLimit",
          e,
          t.LimitTotalCount,
        );
    }
  }
  RGt(e, t) {
    var i;
    this.GetText(12).GetParentAsUIItem().SetUIActive(e),
      e &&
        ((e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          CookController_1.CookController.CookCoinId,
        )),
        (i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
          CookController_1.CookController.CookCoinId,
        )),
        e < t
          ? this.GetText(11).SetText(
              StringUtils_1.StringUtils.Format(
                "<color=#c25757>{0}</color>",
                t.toString(),
              ),
            )
          : this.GetText(11).SetText(t.toString()),
        this.SetTextureByPath(i.IconSmall, this.GetTexture(13)));
  }
  RefreshProficiency(e, t) {
    var i = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
        e.ItemId,
      ),
      r = i.Proficiency,
      i = i.MaxProficiencyCount;
    this.gGt.SetExpNum(e.CookCount, r, i, t), this.STi(e);
  }
  xGt(e) {
    let t = !1,
      i = 0;
    e = e.filter(
      (e) =>
        e.L8n !== CookController_1.CookController.CookCoinId ||
        ((t = !0), (i = e.UVn), !1),
    );
    return [t, i, e];
  }
  OnSecondTimerRefresh() {
    this.ItemData && 0 === this.ItemData.MainType && this.AGt(this.ItemData);
  }
  RefreshCooking(e) {
    var t;
    e &&
      ((this.ItemData = e),
      (this.t6 = 1),
      this.WGe.SetUiActive((t = e).IsUnLock),
      this.GetItem(9).SetUIActive(e.IsUnLock),
      this.MGt.RefreshCooking(t, this.t6),
      this.GetItem(26).SetUIActive(!0),
      this.RefreshProficiency(t, this.t6),
      this.UGt("Dishes", 0),
      e.IsUnLock
        ? (this.GetItem(20).SetUIActive(!1),
          this.GetItem(18).SetUIActive(!0),
          (t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(
            this.ItemData.ItemId,
            0,
          )),
          ([this.SGt, this.yGt, t] = this.xGt(t)),
          this.EGt.RefreshByData(t, () => {
            this.DGt();
          }),
          this.WGe.SetUiActive(!0),
          this.GetItem(9).SetUIActive(!0),
          this.AGt(e),
          this.PGt(e),
          (t = CookController_1.CookController.GetMaxCreateCount(
            this.ItemData.ItemId,
            ModelManager_1.ModelManager.CookModel.CurrentCookListType,
          )),
          this.WGe.Refresh(t),
          this.WGe.SetAddReduceButtonActive(!0),
          this.WGe.SetReduceButtonInteractive(!1))
        : (this.PGt(),
          this.GetItem(20).SetUIActive(!0),
          this.GetItem(18).SetUIActive(!1),
          (e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
            this.ItemData.ItemId,
          )),
          (t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
            e.FormulaItemId,
          )) &&
            ((e = {
              Type: 4,
              Data: e.FormulaItemId,
              ItemConfigId: e.FormulaItemId,
              BottomTextId: t.Name,
              IsProhibit: !0,
              IsOmitBottomText: !0,
            }),
            this.IGt.Apply(e))));
  }
  RefreshMachining(t) {
    if (t) {
      this.GetItem(20).SetUIActive(!1),
        this.GetItem(18).SetUIActive(!0),
        (this.ItemData = t),
        this.UGt("Accessory", 1),
        this.MGt.RefreshMachining(t),
        this.GetItem(26).SetUIActive(!1),
        (MaterialSelectionCacheData.TmpSelectedMaterialData = []),
        (this.ShowMaterialItemRemoveControl = !1);
      var t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(
        this.ItemData.ItemId,
        this.ItemData.MainType,
      );
      ModelManager_1.ModelManager.CookModel.CreateTmpMachiningItemList(t),
        this.EGt.RefreshByData(t, () => {
          this.DGt();
        });
      let e = !0;
      for (const i of t)
        if (!i.K6n) {
          e = !1;
          break;
        }
      this.WGe.SetUiActive(e),
        this.GetItem(9).SetUIActive(e),
        e &&
          ((t = CookController_1.CookController.GetMaxCreateCount(
            this.ItemData.ItemId,
            ModelManager_1.ModelManager.CookModel.CurrentCookListType,
          )),
          this.WGe.ResetLimitMaxValue(),
          this.WGe.Refresh(t),
          this.WGe.SetAddReduceButtonActive(!0),
          this.WGe.SetReduceButtonInteractive(!1),
          this.GetItem(24).SetUIActive(!1),
          this.GetItem(3).SetUIActive(!1));
    }
  }
}
exports.CookingIngredientsVerticalView = CookingIngredientsVerticalView;
//# sourceMappingURL=CookingIngredientsVerticalView.js.map
