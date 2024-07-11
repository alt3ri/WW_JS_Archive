"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingIngredientsVerticalView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const AttributeItem_1 = require("../../../Common/AttributeItem");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CommonManager_1 = require("../../Common/CommonManager");
const ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem");
const ComposeController_1 = require("../../Compose/ComposeController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uqt = void 0),
      (this.OnChangeRoleClick = () => {
        this.uqt && this.uqt();
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
    this.uqt = t;
  }
  SetExpNumVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetExpNum(t, e, i, s) {
    var i = e * i;
    var t = t * e;
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
    const e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
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
    t === 0
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
      (this._Ti = void 0),
      (this.uTi = void 0),
      (this.cTi = void 0),
      (this.mTi = void 0),
      (this.dTi = void 0),
      (this.sAt = () => {
        return new StarItem();
      }),
      (this.w0t = 1),
      (this.CTi = 0);
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
    this.mTi ||
      ((this.mTi = new AttributeItemInternal()),
      this.mTi.CreateThenShowByActor(this.GetItem(5).GetOwner())),
      this.dTi ||
        ((this.dTi = new AttributeItemInternal()),
        this.dTi.CreateThenShowByActor(this.GetItem(6).GetOwner())),
      (this.cTi = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.sAt,
      ));
    const e = this.cTi.GetRootUiItem().GetAttachUIChildren();
    for (let t = 0; t < e.Num(); t++) e.Get(t).SetUIActive(!1);
  }
  gTi() {
    const t =
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        this._Ti.ResonId,
        1,
      );
    t && this.GetText(1).ShowTextNew(t.Name);
  }
  aqe() {
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(
      this._Ti.BreachId,
    );
    var t = new Array(t);
    this.cTi.RefreshByData(t);
  }
  fTi() {
    const t = this.uTi.LevelLimit;
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(2),
      "ForgingWeaponLevel",
      1,
      t,
    );
  }
  pTi() {
    this.mTi.UpdateParam(this._Ti.FirstPropId.Id, this._Ti.FirstPropId.IsRatio);
    var t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
      this._Ti.FirstCurve,
      this._Ti.FirstPropId.Value,
      this.w0t,
      this.CTi,
    );
    var t =
      (this.mTi.SetCurrentValue(t),
      this.dTi.UpdateParam(
        this._Ti.SecondPropId.Id,
        this._Ti.SecondPropId.IsRatio,
      ),
      ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        this._Ti.SecondCurve,
        this._Ti.SecondPropId.Value,
        this.w0t,
        this.CTi,
      ));
    this.dTi.SetCurrentValue(t),
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
    (this._Ti =
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        t.ItemId,
      )),
      (this.uTi = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
        this._Ti.BreachId,
        1,
      )),
      this.gTi(),
      this.fTi(),
      this.aqe(),
      this.pTi();
  }
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.vTi = void 0),
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
    (this.vTi = new WeaponAttributeView()),
      await this.vTi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.vTi.SetActive(!0);
  }
  SetTypeName(t = void 0) {
    const e = this.GetText(0);
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
    this.vTi.RefreshTips(t);
  }
}
class ForgingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.t6 = 1),
      (this.fqt = void 0),
      (this.WGe = void 0),
      (this.dqt = void 0),
      (this.Sqt = void 0),
      (this.vIi = void 0),
      (this.pqt = void 0),
      (this.mqt = void 0),
      (this.vqt = !1),
      (this.Mqt = 0),
      (this._9e = () => {
        this.vIi && this.vIi();
      }),
      (this.Eqt = () => {
        const t = new ManufactureMaterialItem_1.ManufactureMaterialItem();
        return (
          t.BindOnCanExecuteChange(() => !1),
          t.BindOnExtendToggleClicked((t) => {
            t = t.Data;
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              t.G3n,
            );
          }),
          t
        );
      }),
      (this.yqt = (t) => {
        (this.t6 = t),
          this.Iqt(),
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
    (this.pqt = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(19),
      this.Eqt,
    )),
      (this.fqt = new SvInfo()),
      await this.fqt.CreateByActorAsync(this.GetItem(0).GetOwner()),
      this.fqt.SetActive(!0),
      (this.mqt = new ProficiencyView()),
      await this.mqt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
      this.mqt.BindChangeRoleClick(this._9e);
  }
  OnStart() {
    this.GetItem(1).SetUIActive(!1),
      this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text"),
      this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
      (this.Sqt = new MediumItemGrid_1.MediumItemGrid()),
      this.Sqt.Initialize(this.GetItem(21).GetOwner()),
      this.Sqt.BindOnCanExecuteChange(() => !1),
      this.Sqt.BindOnExtendToggleClicked((t) => {
        t = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          t,
        );
      });
    var t = this.GetItem(8);
    var t =
      ((this.WGe = new NumberSelectComponent_1.NumberSelectComponent(t)),
      { MaxNumber: 0, ValueChangeFunction: this.yqt });
    this.WGe.Init(t),
      this.WGe.SetNumberSelectTipsVisible(!1),
      (this.fqt.ChangeRoleClickDelegate = this._9e),
      this.fqt.SetTypeNameVisible(!1),
      this.GetText(12).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.fqt.Destroy();
  }
  BindChangeClickCall(t) {
    this.vIi = t;
  }
  Iqt() {
    this.Tqt(this.vqt, this.Mqt * this.t6);
    const t = this.pqt?.GetScrollItemList();
    if (t) for (const e of t) e.SetTimes(this.t6);
  }
  eOt(t) {
    (this.dqt = t), (this.t6 = 1);
    var e = CommonManager_1.CommonManager.GetMaxCreateCount(this.dqt.ItemId);
    var e =
      (this.WGe.Refresh(e),
      this.fqt.SetDescVisible(!0),
      this.fqt.SetDescBgVisible(!1),
      ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
        t.ItemId,
      ));
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
      e.ItemId,
    );
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
      t,
      1,
    );
    var t = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc),
      ...i,
    );
    var i = StringUtils_1.StringUtils.IsEmpty(e.Background)
      ? ""
      : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Background);
    this.fqt.SetDesc(t), this.fqt.SetDescBg(i), this.mqt.SetExpNumVisible(!1);
  }
  Uqt(t) {
    let e = !1;
    let i = 0;
    t = t.filter(
      (t) =>
        t.G3n !== ComposeController_1.ComposeController.ComposeCoinId ||
        ((e = !0), (i = t.k4n), !1),
    );
    return [e, i, t];
  }
  MTi() {
    let t, e;
    this.dqt.IsUnlock
      ? (this.GetItem(20).SetUIActive(!1),
        this.GetItem(18).SetUIActive(!0),
        (e = ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(
          this.dqt.ItemId,
        )),
        ([this.vqt, this.Mqt, e] = this.Uqt(e)),
        this.pqt.RefreshByData(e, () => {
          this.Iqt();
        }))
      : (this.GetItem(20).SetUIActive(!0),
        this.GetItem(18).SetUIActive(!1),
        (e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
          this.dqt.ItemId,
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
          this.Sqt.Apply(e)));
  }
  gqt(t) {
    return (
      !!t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Compose", 50, "缺少itemData数据"),
      !1)
    );
  }
  kqn() {
    const t = CommonManager_1.CommonManager.GetCurrentRoleId();
    t && this.mqt.SetRoleTexture(t);
  }
  EIi(e) {
    if (this.gqt(e)) {
      let t = CommonManager_1.CommonManager.GetManufactureRoleId(e.ItemId);
      (t = t || ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()),
        CommonManager_1.CommonManager.SetCurrentRoleId(t),
        this.mqt.SetRoleTexture(t);
    }
  }
  RefreshHelpRole() {
    this.kqn();
  }
  OnSecondTimerRefresh() {
    this.dqt && this.Dqt(this.dqt);
  }
  Dqt(t) {
    t.ExistEndTime <= 0
      ? (this.GetItem(24).SetUIActive(!1), this.WGe.ResetLimitMaxValue())
      : (this.GetItem(24).SetUIActive(!0),
        (t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
          t.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime(),
        )),
        this.GetText(25).SetText(t.CountDownText));
  }
  Rqt(e) {
    if (e.TotalMakeCountInLimitTime <= 0)
      this.GetItem(3).SetUIActive(!1), this.WGe.ResetLimitMaxValue();
    else {
      const i = e.TotalMakeCountInLimitTime - e.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, i));
      let t = i.toString();
      i === 0 &&
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
  Tqt(t, e) {
    let i;
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
    this.Dqt(t),
      this.Rqt(t),
      this.eOt(t),
      this.MTi(),
      this.fqt.SetWeaponAttribute(t),
      t.IsUnlock
        ? (this.mqt.SetActive(!1),
          this.EIi(this.dqt),
          this.WGe.SetActive(!0),
          this.GetItem(22).SetUIActive(!1),
          this.GetItem(16).SetUIActive(!0),
          this.GetItem(9).SetUIActive(!0))
        : (this.mqt.SetActive(!1),
          this.WGe.SetActive(!1),
          this.GetItem(22).SetUIActive(!0),
          this.GetItem(16).SetUIActive(!1),
          this.GetItem(9).SetUIActive(!1));
  }
}
exports.ForgingIngredientsVerticalView = ForgingIngredientsVerticalView;
// # sourceMappingURL=ForgingIngredientsVerticalView.js.map
