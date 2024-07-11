"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookingIngredientsVerticalView = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../Common/NumberSelect/NumberSelectComponent");
const ManufactureMaterialItem_1 = require("../Manufacture/Common/Item/ManufactureMaterialItem");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const CookController_1 = require("./CookController");
const CookItemView_1 = require("./View/CookItemView");
const CookProficiencyView_1 = require("./View/CookProficiencyView");
class MaterialSelectionCacheData {
  static SetMaterialSelectIndex(e) {
    MaterialSelectionCacheData.lqt = e;
  }
  static GetMaterialSelectIndex() {
    return MaterialSelectionCacheData.lqt;
  }
  static SetMaterialUseNum(e) {
    MaterialSelectionCacheData._qt = e;
  }
  static GetMaterialUseNum() {
    return MaterialSelectionCacheData._qt;
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
  (MaterialSelectionCacheData.lqt = 0),
  (MaterialSelectionCacheData._qt = 0);
class SvInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.cqt = void 0),
      (this.dqt = void 0),
      (this.Cqt = (e, t, i) => {
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
    (this.cqt = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetVerticalLayout(6),
      this.Cqt,
    )),
      this.GetText(3).SetUIActive(!1),
      this.dde(),
      this.GetItem(1).SetUIActive(!1),
      this.GetText(3).SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.cqt.ClearChildren(),
      (this.cqt = void 0),
      (this.dqt = void 0),
      this.Cde();
  }
  dde() {}
  Cde() {}
  SetTypeName(e = void 0) {
    const t = this.GetText(0);
    e ? (t.SetUIActive(!0), t.SetText(e)) : t.SetUIActive(!1);
  }
  RefreshCooking(e, t) {
    let i;
    this.gqt(e) &&
      (this.dqt &&
        this.dqt.ItemId !== e.ItemId &&
        (ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = void 0),
      (this.dqt = e),
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
      this.cqt.SetActive(!1),
      this.GetText(3).SetUIActive(!0),
      this.GetText(3).SetText(e),
      this.GetText(5).SetText(i));
  }
  gqt(e) {
    return (
      !!e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Cook", 50, "缺少itemData数据"),
      !1)
    );
  }
  RefreshMachining(e) {
    if (this.gqt(e)) {
      (this.dqt = e), this.cqt.SetActive(!0);
      const t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
        e.ItemId,
      );
      var i = ItemInfoById_1.configItemInfoById.GetConfig(t.FinalItemId);
      var i = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
        i.BgDescription,
      );
      const r =
        (this.GetText(3).SetUIActive(!1),
        this.GetText(5).SetText(i),
        new Array());
      for (const a of t.InterationId) {
        var s;
        const o =
          ConfigManager_1.ConfigManager.CookConfig.GetCookProcessMsgById(a);
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
      this.cqt.RebuildLayoutByDataNew(r);
    }
  }
}
class CookingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fqt = void 0),
      (this.ItemData = void 0),
      (this.WGe = void 0),
      (this.t6 = 1),
      (this.ShowMaterialItemRemoveControl = !1),
      (this.pqt = void 0),
      (this.mqt = void 0),
      (this.vqt = !1),
      (this.Mqt = 0),
      (this.Sqt = void 0),
      (this.OnChangeMaterialSelectionDelegate = void 0),
      (this.Eqt = () => {
        const e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
        return (
          e.BindOnCanExecuteChange(() => !1),
          e.BindOnExtendToggleClicked((e) => {
            e = e.Data;
            e.m3n
              ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                  e.G3n,
                )
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "ItemSelectCookUnlockTip",
                );
          }),
          e
        );
      }),
      (this._9e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenCookRole,
          this.ItemData.ItemId,
        );
      }),
      (this.yqt = (e) => {
        (this.t6 = e),
          this.Iqt(),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "Text_ItemSelectCookQuantityTip_text",
            this.t6,
          ),
          this.ItemData &&
            this.ItemData.MainType === 0 &&
            this.RefreshProficiency(this.ItemData, this.t6);
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
    (this.pqt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(19),
      this.Eqt,
    )),
      (this.fqt = new SvInfo()),
      await this.fqt.CreateByActorAsync(this.GetItem(0).GetOwner()),
      this.fqt.SetActive(!0),
      (this.mqt = new CookProficiencyView_1.ProficiencyView()),
      await this.mqt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
      this.mqt.BindChangeRoleClick(this._9e);
  }
  OnStart() {
    this.GetItem(18).SetUIActive(!1),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(16).SetUIActive(!0),
      this.GetItem(18).SetUIActive(!0),
      this.GetItem(22).SetUIActive(!1),
      this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
      this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text");
    var e = this.GetItem(8);
    var e =
      ((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(e)),
      { MaxNumber: 0, ValueChangeFunction: this.yqt });
    this.WGe.Init(e),
      this.WGe.SetUiActive(!0),
      this.WGe.SetNumberSelectTipsVisible(!1),
      this.GetText(12).SetUIActive(!1),
      (this.Sqt = new MediumItemGrid_1.MediumItemGrid()),
      this.Sqt.Initialize(this.GetItem(21).GetOwner()),
      this.Sqt.BindOnCanExecuteChange(() => !1),
      this.Sqt.BindOnExtendToggleClicked((e) => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      });
  }
  OnBeforeDestroy() {
    (this.fqt = void 0),
      (this.pqt = void 0),
      (this.OnChangeMaterialSelectionDelegate = void 0);
  }
  gqt(e) {
    return (
      !!e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Cook", 50, "缺少itemData数据"),
      !1)
    );
  }
  EIi(t) {
    if (this.gqt(t)) {
      let e = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId;
      e ||
        ((e = ModelManager_1.ModelManager.CookModel.GetCookRoleId(t.ItemId)),
        (ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = e)),
        this.mqt.SetRoleTexture(e, t.ItemId);
    }
  }
  Iqt() {
    this.Tqt(this.vqt, this.Mqt * this.t6);
    const e = this.pqt?.GetScrollItemList();
    if (e) for (const t of e) t.SetTimes(this.t6);
  }
  Lqt(e, t) {
    const i = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    switch (t) {
      case 0:
        this.fqt.SetTypeName(), this.mqt.SetTypeContent(i);
        break;
      case 1:
        this.fqt.SetTypeName(i), this.mqt.SetTypeContent();
        break;
      default:
        this.fqt.SetTypeName(), this.mqt.SetTypeContent();
    }
  }
  Dqt(e) {
    e.ExistEndTime <= 0
      ? (this.GetItem(24).SetUIActive(!1), this.WGe.ResetLimitMaxValue())
      : (this.GetItem(24).SetUIActive(!0),
        (e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          e.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        this.GetText(25).SetText(e.CountDownText));
  }
  Rqt(t) {
    if (void 0 === t || t.LimitTotalCount <= 0)
      this.GetItem(3).SetUIActive(!1), this.WGe.ResetLimitMaxValue();
    else {
      const i = t.LimitTotalCount - t.CookCount;
      this.WGe.SetLimitMaxValue(Math.max(1, i));
      let e = i.toString();
      i === 0 &&
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
  Tqt(e, t) {
    let i;
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
    );
    const r = i.Proficiency;
    var i = i.MaxProficiencyCount;
    this.mqt.SetExpNum(e.CookCount, r, i, t), this.EIi(e);
  }
  Uqt(e) {
    let t = !1;
    let i = 0;
    e = e.filter(
      (e) =>
        e.G3n !== CookController_1.CookController.CookCoinId ||
        ((t = !0), (i = e.k4n), !1),
    );
    return [t, i, e];
  }
  OnSecondTimerRefresh() {
    this.ItemData && this.ItemData.MainType === 0 && this.Dqt(this.ItemData);
  }
  RefreshCooking(e) {
    let t;
    e &&
      ((this.ItemData = e),
      (this.t6 = 1),
      this.WGe.SetUiActive(e.IsUnLock),
      this.GetItem(9).SetUIActive(e.IsUnLock),
      this.fqt.RefreshCooking(e, this.t6),
      this.GetItem(26).SetUIActive(!0),
      this.RefreshProficiency(e, this.t6),
      this.Lqt("Dishes", 0),
      e.IsUnLock
        ? (this.GetItem(20).SetUIActive(!1),
          this.GetItem(18).SetUIActive(!0),
          (t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(
            this.ItemData.ItemId,
            0,
          )),
          ([this.vqt, this.Mqt, t] = this.Uqt(t)),
          this.pqt.RefreshByData(t, () => {
            this.Iqt();
          }),
          this.WGe.SetUiActive(!0),
          this.GetItem(9).SetUIActive(!0),
          this.Dqt(e),
          this.Rqt(e),
          (t = CookController_1.CookController.GetMaxCreateCount(
            this.ItemData.ItemId,
            ModelManager_1.ModelManager.CookModel.CurrentCookListType,
          )),
          this.WGe.Refresh(t))
        : (this.Rqt(),
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
            this.Sqt.Apply(e))));
  }
  RefreshMachining(t) {
    if (t) {
      this.GetItem(20).SetUIActive(!1),
        this.GetItem(18).SetUIActive(!0),
        (this.ItemData = t),
        this.Lqt("Accessory", 1),
        this.fqt.RefreshMachining(t),
        this.GetItem(26).SetUIActive(!1),
        (MaterialSelectionCacheData.TmpSelectedMaterialData = []),
        (this.ShowMaterialItemRemoveControl = !1);
      var t = ModelManager_1.ModelManager.CookModel.GetCookMaterialList(
        this.ItemData.ItemId,
        this.ItemData.MainType,
      );
      ModelManager_1.ModelManager.CookModel.CreateTmpMachiningItemList(t),
        this.pqt.RefreshByData(t, () => {
          this.Iqt();
        });
      let e = !0;
      for (const i of t)
        if (!i.m3n) {
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
          this.GetItem(24).SetUIActive(!1),
          this.GetItem(3).SetUIActive(!1));
    }
  }
}
exports.CookingIngredientsVerticalView = CookingIngredientsVerticalView;
// # sourceMappingURL=CookingIngredientsVerticalView.js.map
