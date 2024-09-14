"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingIngredientsVerticalView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  AttributeItem_1 = require("../../../Common/AttributeItem"),
  MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
  NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  CommonManager_1 = require("../../Common/CommonManager"),
  ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem"),
  ComposeController_1 = require("../../Compose/ComposeController"),
  ForgingController_1 = require("../ForgingController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.dGt = void 0),
      (this.OnChangeRoleClick = () => {
        this.dGt && this.dGt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.OnChangeRoleClick]]);
  }
  BindChangeRoleClick(t) {
    this.dGt = t;
  }
  SetExpNumVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetExpNum(t, e, i, s) {
    var i = e * i,
      t = t * e;
    t !== i
      ? ((e = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "+" + e * s,
        )),
        (s = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "CumulativeProficiency",
          ),
          t.toString(),
          i.toString(),
        )),
        (t = e.concat(" ", "(", s, ")")),
        this.GetText(0).SetText(t))
      : LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "Proficiency");
  }
  SetRoleTexture(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    this.SetRoleIcon(
      e.GetRoleConfig().RoleHeadIconLarge,
      this.GetTexture(1),
      t,
    );
  }
}
class StarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(t, e, i) {
    0 === t
      ? (this.GetSprite(0).SetUIActive(!0), this.GetSprite(1).SetUIActive(!1))
      : (this.GetSprite(0).SetUIActive(!1), this.GetSprite(1).SetUIActive(!0));
  }
  Clear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return t;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    this.GetSprite(2).SetUIActive(!1);
  }
  SetState(t) {}
}
class AttributeItemInternal extends AttributeItem_1.AttributeItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
    ];
  }
  SetBgActive() {}
}
class WeaponAttributeView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this._Li = void 0),
      (this.uLi = void 0),
      (this.cLi = void 0),
      (this.mLi = void 0),
      (this.dLi = void 0),
      (this.vke = () => {
        return new StarItem();
      }),
      (this.Wft = 1),
      (this.CLi = 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [4, UE.UIItem],
      [3, UE.UIHorizontalLayout],
      [5, UE.UIItem],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    this.mLi ||
      ((this.mLi = new AttributeItemInternal()),
      this.mLi.CreateThenShowByActor(this.GetItem(5).GetOwner())),
      this.dLi ||
        ((this.dLi = new AttributeItemInternal()),
        this.dLi.CreateThenShowByActor(this.GetItem(6).GetOwner())),
      (this.cLi = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.vke,
      ));
    var e = this.cLi.GetRootUiItem().GetAttachUIChildren();
    for (let t = 0; t < e.Num(); t++) e.Get(t).SetUIActive(!1);
  }
  gLi() {
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
      this._Li.ResonId,
      1,
    );
    t && this.GetText(1).ShowTextNew(t.Name);
  }
  aqe() {
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(
        this._Li.BreachId,
      ),
      t = new Array(t);
    this.cLi.RefreshByData(t);
  }
  fLi() {
    var t = this.uLi.LevelLimit;
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(2),
      "ForgingWeaponLevel",
      1,
      t,
    );
  }
  pLi() {
    this.mLi.UpdateParam(this._Li.FirstPropId.Id, this._Li.FirstPropId.IsRatio);
    var t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        this._Li.FirstCurve,
        this._Li.FirstPropId.Value,
        this.Wft,
        this.CLi,
      ),
      t =
        (this.mLi.SetCurrentValue(t),
        this.dLi.UpdateParam(
          this._Li.SecondPropId.Id,
          this._Li.SecondPropId.IsRatio,
        ),
        ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
          this._Li.SecondCurve,
          this._Li.SecondPropId.Value,
          this.Wft,
          this.CLi,
        ));
    this.dLi.SetCurrentValue(t),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(0),
        "WeaponResonanceItemLevelText",
        "1",
      );
  }
  RefreshTips(t) {
    t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      t.ItemId,
    );
    (this._Li =
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        t.ItemId,
      )),
      (this.uLi = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
        this._Li.BreachId,
        1,
      )),
      this.gLi(),
      this.fLi(),
      this.aqe(),
      this.pLi();
  }
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.vLi = void 0),
      (this.ChangeRoleClickDelegate = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [1, UE.UIItem],
      [6, UE.UIVerticalLayout],
    ]),
      (this.BtnBindInfo = []);
  }
  async OnBeforeStartAsync() {
    (this.vLi = new WeaponAttributeView()),
      await this.vLi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.vLi.SetActive(!0);
  }
  SetTypeName(t = void 0) {
    var e = this.GetText(0);
    t ? (e.SetUIActive(!0), e.SetText(t)) : e.SetUIActive(!1);
  }
  SetTypeNameVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetDescVisible(t) {
    this.GetText(3).SetUIActive(t);
  }
  SetDescBgVisible(t) {
    this.GetText(5).SetUIActive(t);
  }
  SetDesc(t) {
    this.GetText(3).SetText(t);
  }
  SetDescBg(t) {
    this.GetText(5).SetText(t);
  }
  SetWeaponAttribute(t) {
    this.vLi.RefreshTips(t);
  }
}
class ForgingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.t6 = 1),
      (this.MGt = void 0),
      (this.WGe = void 0),
      (this.fGt = void 0),
      (this.IGt = void 0),
      (this.vTi = void 0),
      (this.EGt = void 0),
      (this.gGt = void 0),
      (this.SGt = !1),
      (this.yGt = 0),
      (this.I7e = () => {
        this.vTi && this.vTi();
      }),
      (this.TGt = () => {
        var t = new ManufactureMaterialItem_1.ManufactureMaterialItem();
        return (
          t.BindOnCanExecuteChange(() => !1),
          t.BindOnExtendToggleClicked((t) => {
            t = t.Data;
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t.L8n,
            );
          }),
          t
        );
      }),
      (this.LGt = (t) => {
        var e;
        (this.t6 = t),
          this.fGt &&
            ((e = ForgingController_1.ForgingController.GetMaxCreateCount(
              this.fGt.ItemId,
            )),
            this.WGe.SetAddButtonInteractive(t < e),
            this.WGe.SetReduceButtonInteractive(1 < t)),
          this.DGt(),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "Text_ItemSelectForgeQuantityTip_text",
            this.t6,
          );
      });
  }
  GetManufactureCount() {
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
      (this.gGt = new ProficiencyView()),
      await this.gGt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
      this.gGt.BindChangeRoleClick(this.I7e);
  }
  OnStart() {
    this.GetItem(1).SetUIActive(!1),
      this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text"),
      this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
      (this.IGt = new MediumItemGrid_1.MediumItemGrid()),
      this.IGt.Initialize(this.GetItem(21).GetOwner()),
      this.IGt.BindOnCanExecuteChange(() => !1),
      this.IGt.BindOnExtendToggleClicked((t) => {
        t = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t,
        );
      });
    var t = this.GetItem(8),
      t =
        ((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(t)),
        { MaxNumber: 0, ValueChangeFunction: this.LGt });
    this.WGe.Init(t),
      this.WGe.SetNumberSelectTipsVisible(!1),
      this.WGe.SetAddReduceButtonActive(!0),
      (this.MGt.ChangeRoleClickDelegate = this.I7e),
      this.MGt.SetTypeNameVisible(!1),
      this.GetText(12).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.MGt.Destroy();
  }
  BindChangeClickCall(t) {
    this.vTi = t;
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var t = this.EGt?.GetScrollItemList();
    if (t) for (const e of t) e.SetTimes(this.t6);
  }
  tkt(t) {
    (this.fGt = t), (this.t6 = 1);
    var e = CommonManager_1.CommonManager.GetMaxCreateCount(this.fGt.ItemId),
      e =
        (this.WGe.Refresh(e),
        this.WGe.SetAddReduceButtonActive(!0),
        this.WGe.SetReduceButtonInteractive(!1),
        this.MGt.SetDescVisible(!0),
        this.MGt.SetDescBgVisible(!1),
        ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
          t.ItemId,
        )),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
        e.ItemId,
      ),
      i = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        t,
        1,
      ),
      t = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc),
        ...i,
      ),
      i = StringUtils_1.StringUtils.IsEmpty(e.Background)
        ? ""
        : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Background);
    this.MGt.SetDesc(t), this.MGt.SetDescBg(i), this.gGt.SetExpNumVisible(!1);
  }
  xGt(t) {
    let e = !1,
      i = 0;
    t = t.filter(
      (t) =>
        t.L8n !== ComposeController_1.ComposeController.ComposeCoinId ||
        ((e = !0), (i = t.UVn), !1),
    );
    return [e, i, t];
  }
  MLi() {
    var t, e;
    this.fGt.IsUnlock
      ? (this.GetItem(20).SetUIActive(!1),
        this.GetItem(18).SetUIActive(!0),
        (e = ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(
          this.fGt.ItemId,
        )),
        ([this.SGt, this.yGt, e] = this.xGt(e)),
        this.EGt.RefreshByData(e, () => {
          this.DGt();
        }))
      : (this.GetItem(20).SetUIActive(!0),
        this.GetItem(18).SetUIActive(!1),
        (e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
          this.fGt.ItemId,
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
          this.IGt.Apply(e)));
  }
  vGt(t) {
    return (
      !!t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Compose", 50, "缺少itemData数据"),
      !1)
    );
  }
  Z2n() {
    var t = CommonManager_1.CommonManager.GetCurrentRoleId();
    t && this.gGt.SetRoleTexture(t);
  }
  STi(t) {
    if (this.vGt(t)) {
      let t = CommonManager_1.CommonManager.GetCurrentRoleId();
      t ||
        ((t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()),
        CommonManager_1.CommonManager.SetCurrentRoleId(t)),
        t && this.gGt.SetRoleTexture(t);
    }
  }
  RefreshHelpRole() {
    this.Z2n();
  }
  OnSecondTimerRefresh() {
    this.fGt && this.AGt(this.fGt);
  }
  AGt(t) {
    t.ExistEndTime <= 0
      ? (this.GetItem(24).SetUIActive(!1), this.WGe.ResetLimitMaxValue())
      : (this.GetItem(24).SetUIActive(!0),
        (t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          t.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        this.GetText(25).SetText(t.CountDownText));
  }
  PGt(e) {
    if (e.TotalMakeCountInLimitTime <= 0)
      this.GetItem(3).SetUIActive(!1), this.WGe.ResetLimitMaxValue();
    else {
      var i = e.TotalMakeCountInLimitTime - e.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, i));
      let t = i.toString();
      0 === i &&
        (t = StringUtils_1.StringUtils.Format(
          "<color=#c25757>{0}</color>",
          i.toString(),
        )),
        this.GetItem(3).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "MakeLimit",
          t,
          e.TotalMakeCountInLimitTime,
        );
    }
  }
  RGt(t, e) {
    var i;
    this.GetText(12).GetParentAsUIItem().SetUIActive(t),
      t &&
        ((t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        (i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        t < e
          ? this.GetText(11).SetText(
              StringUtils_1.StringUtils.Format(
                "<color=#c25757>{0}</color>",
                e.toString(),
              ),
            )
          : this.GetText(11).SetText(e.toString()),
        this.SetTextureByPath(i.IconSmall, this.GetTexture(13)));
  }
  RefreshForging(t) {
    this.AGt(t),
      this.PGt(t),
      this.tkt(t),
      this.MLi(),
      this.MGt.SetWeaponAttribute(t),
      t.IsUnlock
        ? (this.gGt.SetActive(!1),
          this.STi(this.fGt),
          this.WGe.SetActive(!0),
          this.GetItem(22).SetUIActive(!1),
          this.GetItem(16).SetUIActive(!0),
          this.GetItem(9).SetUIActive(!0))
        : (this.gGt.SetActive(!1),
          this.WGe.SetActive(!1),
          this.GetItem(22).SetUIActive(!0),
          this.GetItem(16).SetUIActive(!1),
          this.GetItem(9).SetUIActive(!1));
  }
}
exports.ForgingIngredientsVerticalView = ForgingIngredientsVerticalView;
//# sourceMappingURL=ForgingIngredientsVerticalView.js.map
