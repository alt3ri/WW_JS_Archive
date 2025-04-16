"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemGridConsumeComponent = void 0);
const UE = require("ue"),
  QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ButtonItem_1 = require("../Button/ButtonItem"),
  CommonDropDown_1 = require("../DropDown/CommonDropDown"),
  OneTextDropDownItem_1 = require("../DropDown/Item/OneText/OneTextDropDownItem"),
  OneTextTitleItem_1 = require("../DropDown/Item/OneText/OneTextTitleItem"),
  ConsumeMediumItemGrid_1 = require("./ConsumeMediumItemGrid");
class ItemGridConsumeComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i = void 0, s = !1) {
    super(),
      (this.ConsumeFunction = e),
      (this.BelongView = i),
      (this.NeedSettingComponent = s),
      (this.StrengthItem = void 0),
      (this.ScrollView = void 0),
      (this.ConsumeList = []),
      (this.rLt = 3),
      (this.MaxCount = 0),
      (this.EnoughMoney = !0),
      (this.SelectTextId = "AutoSelect"),
      (this.SettingRedDotName = void 0),
      (this.h8e = void 0),
      (this.d8e = void 0),
      (this.nLt = void 0),
      (this.wqe = void 0),
      (this.l1l = void 0),
      (this.m8e = (t) => new OneTextDropDownItem_1.OneTextDropDownItem(t)),
      (this.c8e = (t) => new OneTextTitleItem_1.OneTextTitleItem(t)),
      (this.g8e = (t) => {
        return new LguiUtil_1.TableTextArgNew(t.ConsumeFilterText);
      }),
      (this.tLt = () => {
        this.HasSelect()
          ? this.ConsumeFunction.DeleteSelectFunction?.()
          : this.ConsumeFunction.AutoFunction &&
            this.ConsumeFunction.AutoFunction(this.rLt);
      }),
      (this.h1l = () => {
        this.l1l?.();
      }),
      (this.C8e = (t) => {
        this.rLt = t;
        var e =
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
          ) ?? new Map();
        e.set(this.nLt, t),
          LocalStorage_1.LocalStorage.SetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
            e,
          ),
          this.d8e?.(t);
      }),
      (this.sGe = () => {
        var t = new ConsumeMediumItemGrid_1.ConsumeMediumItemGrid();
        return this.sLt(t), t;
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
      (this.BtnBindInfo = [[3, this.tLt]]),
      this.NeedSettingComponent &&
        (this.ComponentRegisterInfos.push([18, UE.UIButtonComponent]),
        this.ComponentRegisterInfos.push([19, UE.UIItem]),
        this.BtnBindInfo.push([18, this.h1l]));
  }
  async OnBeforeStartAsync() {
    (this.h8e = new CommonDropDown_1.CommonDropDown(
      this.GetItem(2),
      this.m8e,
      this.c8e,
    )),
      await this.h8e.Init();
  }
  InitFilter(t, e) {
    (this.d8e = e), (this.nLt = t);
    (e =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown,
      ) ?? new Map()),
      e.has(t) && (this.rLt = e.get(t)),
      (e = QualityInfoAll_1.configQualityInfoAll.GetConfigList());
    this.h8e.SetOnSelectCall(this.C8e),
      this.h8e.SetShowType(1),
      this.h8e.InitScroll(e, this.g8e, this.rLt),
      this.d8e(this.rLt),
      this.GetItem(2).SetUIActive(!0);
  }
  HasSelect() {
    return 0 < this.GetSelectedGridCount();
  }
  GetSelectedGridCount() {
    let t = 0;
    if (this.ConsumeList && 0 !== this.ConsumeList.length)
      for (const e of this.ConsumeList) {
        if (0 === e[0].ItemId) break;
        t++;
      }
    return t;
  }
  aLt() {
    this.HasSelect()
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "DeleteSelect")
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(15),
          this.SelectTextId,
        );
  }
  UpdateAutoSelectTextByTextId(t) {
    (this.SelectTextId = t), this.aLt();
  }
  OnStart() {
    (this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(11))),
      this.StrengthItem.SetFunction(this.ConsumeFunction.StrengthFunction);
    var t = this.GetScrollViewWithScrollbar(5);
    (this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
      t,
      this.sGe,
    )),
      this.GetItem(2).SetUIActive(!1),
      (this.MaxCount =
        ConfigManager_1.ConfigManager.WeaponConfig.GetMaterialItemMaxCount()),
      this.SetSettingButtonVisible(!1);
  }
  GetCurrentDropDownSelectIndex() {
    return this.rLt;
  }
  sLt(t) {
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
      this.h8e?.Destroy(),
      this.SettingRedDotName &&
        RedDotController_1.RedDotController.UnBindGivenUi(
          this.SettingRedDotName,
          this.GetItem(19),
        );
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
      this.aLt();
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
  SetSettingButtonVisible(t) {
    this.NeedSettingComponent && this.GetButton(18)?.RootUIComp.SetUIActive(t);
  }
  SetSettingButtonClickCallBack(t) {
    this.l1l = t;
  }
  BindSettingButtonRedDot(t) {
    this.NeedSettingComponent &&
      ((this.SettingRedDotName = t),
      RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(19)));
  }
}
exports.ItemGridConsumeComponent = ItemGridConsumeComponent;
//# sourceMappingURL=ItemGridConsumeComponent.js.map
