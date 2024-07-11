"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridConsumeComponent = void 0);
const UE = require("ue");
const QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ButtonItem_1 = require("../Button/ButtonItem");
const CommonDropDown_1 = require("../DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../DropDown/Item/OneText/OneTextTitleItem");
const ConsumeMediumItemGrid_1 = require("./ConsumeMediumItemGrid");
class ItemGridConsumeComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i = void 0) {
    super(),
      (this.ConsumeFunction = e),
      (this.BelongView = i),
      (this.StrengthItem = void 0),
      (this.ScrollView = void 0),
      (this.ConsumeList = []),
      (this.ZIt = 3),
      (this.MaxCount = 0),
      (this.EnoughMoney = !0),
      (this.XVe = void 0),
      (this.e6e = void 0),
      (this.eTt = void 0),
      (this.wqe = void 0),
      (this.ZVe = (t) => new OneTextDropDownItem_1.OneTextDropDownItem(t)),
      (this.zVe = (t) => new OneTextTitleItem_1.OneTextTitleItem(t)),
      (this.i6e = (t) => {
        return new LguiUtil_1.TableTextArgNew(t.ConsumeFilterText);
      }),
      (this.YIt = () => {
        this.HasSelect()
          ? this.ConsumeFunction.DeleteSelectFunction?.()
          : this.ConsumeFunction.AutoFunction &&
            this.ConsumeFunction.AutoFunction(this.ZIt);
      }),
      (this.t6e = (t) => {
        this.ZIt = t;
        const e =
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
          ) ?? new Map();
        e.set(this.eTt, t),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
            e,
          ),
          this.e6e?.(t);
      }),
      (this.sGe = () => {
        const t = new ConsumeMediumItemGrid_1.ConsumeMediumItemGrid();
        return this.tTt(t), t;
      }),
      (this.wqe = t);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [7, UE.UITexture],
      [1, UE.UIItem],
      [8, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIButtonComponent],
      [0, UE.UIText],
      [2, UE.UIItem],
      [9, UE.UIText],
      [6, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.YIt]]);
  }
  async OnBeforeStartAsync() {
    (this.XVe = new CommonDropDown_1.CommonDropDown(
      this.GetItem(2),
      this.ZVe,
      this.zVe,
    )),
      await this.XVe.Init();
  }
  InitFilter(t, e) {
    (this.e6e = e), (this.eTt = t);
    (e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
      ) ?? new Map()),
      e.has(t) && (this.ZIt = e.get(t)),
      (e = QualityInfoAll_1.configQualityInfoAll.GetConfigList());
    this.XVe.SetOnSelectCall(this.t6e),
      this.XVe.SetShowType(1),
      this.XVe.InitScroll(e, this.i6e, this.ZIt),
      this.e6e(this.ZIt),
      this.GetItem(2).SetUIActive(!0);
  }
  HasSelect() {
    return this.GetSelectedGridCount() > 0;
  }
  GetSelectedGridCount() {
    let t = 0;
    if (this.ConsumeList && this.ConsumeList.length !== 0)
      for (const e of this.ConsumeList) {
        if (e[0].ItemId === 0) break;
        t++;
      }
    return t;
  }
  iTt() {
    this.HasSelect()
      ? LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "DeleteSelect")
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), "AutoSelect");
  }
  OnStart() {
    (this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      this.StrengthItem.SetFunction(this.ConsumeFunction.StrengthFunction);
    const t = this.GetScrollViewWithScrollbar(5);
    (this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
      t,
      this.sGe,
    )),
      this.GetItem(2).SetUIActive(!1),
      (this.MaxCount =
        ConfigManager_1.ConfigManager.WeaponConfig.GetMaterialItemMaxCount());
  }
  GetCurrentDropDownSelectIndex() {
    return this.ZIt;
  }
  tTt(t) {
    t.BindReduceLongPress((t, e, i) => {
      void 0 !== i &&
        this.ConsumeFunction.ReduceItemFunction(i[0].IncId, i[0].ItemId);
    }),
      t.BindOnExtendToggleClicked((t) => {
        t = t.Data;
        this.ConsumeFunction.MaterialItemFunction(t[0].IncId, t[0].ItemId);
      }),
      t.BindEmptySlotButtonCallback((t) => {
        this.ConsumeFunction.ItemClickFunction();
      }),
      t.BindOnCanExecuteChange(() => !1);
  }
  OnBeforeDestroy() {
    this.StrengthItem &&
      (this.StrengthItem.Destroy(), (this.StrengthItem = void 0)),
      this.XVe?.Destroy();
  }
  UpdateComponent(t, e, i) {
    (this.ConsumeList = i), this.ScrollView.RefreshByData(this.ConsumeList);
    (i = this.GetSelectedGridCount()),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(0),
        "WeaponMaterialLengthText",
        i,
        this.MaxCount,
      ),
      (i = this.GetText(8)),
      (t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(t));
    i.SetText(e.toString()),
      (this.EnoughMoney = e <= t),
      i.SetChangeColor(!(e <= t), i.changeColor),
      this.iTt();
  }
  SetMaxState(t) {
    this.GetItem(6).SetUIActive(!t),
      this.SetStrengthItemEnable(!t),
      this.SetMaxItemEnable(t);
  }
  SetStrengthItemText(t) {
    this.StrengthItem.SetLocalText(t);
  }
  SetStrengthItemEnable(t) {
    this.StrengthItem.SetEnableClick(t);
  }
  SetMaxItemEnable(t) {
    this.GetItem(12).SetUIActive(t),
      this.GetItem(10).SetUIActive(!t),
      this.StrengthItem.SetActive(!t);
  }
  GetEnoughMoney() {
    return this.EnoughMoney;
  }
  SetMaxCount(t) {
    this.MaxCount = t;
  }
  GetMaxCount() {
    return this.MaxCount;
  }
  RefreshConditionText(t) {
    this.GetText(9).ShowTextNew(t);
  }
  SetConsumeTexture(t) {
    this.SetItemIcon(this.GetTexture(7), t);
  }
}
exports.ItemGridConsumeComponent = ItemGridConsumeComponent;
// # sourceMappingURL=ItemGridConsumeComponent.js.map
