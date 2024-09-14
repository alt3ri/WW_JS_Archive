"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeIngredientsVerticalView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
  NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  CommonManager_1 = require("../../Common/CommonManager"),
  ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem"),
  ComposeController_1 = require("../ComposeController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.dGt = void 0),
      (this.$pt = void 0),
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
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetButton(2).RootUIComp,
    );
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  BindChangeRoleClick(e) {
    this.dGt = e;
  }
  SetExpNum(e, i, t, s) {
    var t = i * t,
      e = e * i,
      r = t - e,
      e = StringUtils_1.StringUtils.Format(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "CumulativeProficiency",
        ),
        e.toString(),
        t.toString(),
      );
    0 < r
      ? ((t = Math.min(r, i * s)),
        (i = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "+" + Math.min(t, r),
        ).concat(" ", "(", e, ")")),
        this.GetText(0).SetText(i))
      : ((s = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "",
        ).concat(" ", "(", e, ")")),
        this.GetText(0).SetText(s));
  }
  SetExpVisible(e) {
    this.GetText(0).SetUIActive(e);
  }
  SetRoleTexture(e, i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.SetRoleIcon(
      t.GetRoleConfig().RoleHeadIconLarge,
      this.GetTexture(1),
      e,
    ),
      CommonManager_1.CommonManager.CheckIsBuffEx(e, i)
        ? this.$pt.GetCurrentSequence()
          ? this.$pt.ReplaySequenceByKey("Show")
          : this.$pt.PlayLevelSequenceByName("Show")
        : this.$pt?.StopCurrentSequence(!1, !0);
  }
  SetTypeContent(e = void 0) {
    var i = this.GetText(3);
    e ? (i.SetUIActive(!0), i.SetText(e)) : i.SetUIActive(!1);
  }
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
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
    this.GetItem(1).SetUIActive(!1);
  }
  SetTypeName(e = void 0) {
    var i = this.GetText(0);
    e ? (i.SetUIActive(!0), i.SetText(e)) : i.SetUIActive(!1);
  }
  SetDescVisible(e) {
    this.GetText(3).SetUIActive(e);
  }
  SetDescBgVisible(e) {
    this.GetText(5).SetUIActive(e);
  }
  SetDesc(e) {
    this.GetText(3).SetText(e);
  }
  SetDescBg(e) {
    this.GetText(5).SetText(e);
  }
}
class ComposeIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.MGt = void 0),
      (this.fGt = void 0),
      (this.t6 = 1),
      (this.WGe = void 0),
      (this.vTi = void 0),
      (this.EGt = void 0),
      (this.SGt = !1),
      (this.yGt = 0),
      (this.IGt = void 0),
      (this.gGt = void 0),
      (this.LGt = (e) => {
        var i;
        (this.t6 = e),
          this.DGt(),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(10),
            "Text_ItemSelectSynthesisQuantityTip_text",
            this.t6,
          ),
          this.fGt &&
            this.fGt &&
            ((i = ComposeController_1.ComposeController.GetMaxCreateCount(
              this.fGt.ItemId,
            )),
            this.WGe.SetAddButtonInteractive(e < i),
            this.WGe.SetReduceButtonInteractive(1 < e),
            this.MTi(this.fGt));
      }),
      (this.I7e = () => {
        this.vTi && this.vTi();
      }),
      (this.TGt = () => {
        var e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
        return (
          e.BindOnCanExecuteChange(() => !1),
          e.BindOnExtendToggleClicked((e) => {
            e = e.Data;
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e.L8n,
            );
          }),
          e
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
      (this.gGt = new ProficiencyView()),
      await this.gGt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner()),
      this.gGt.BindChangeRoleClick(this.I7e);
  }
  OnStart() {
    this.MGt.SetActive(!0),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(9).SetUIActive(!0),
      this.GetItem(22).SetUIActive(!1),
      this.GetItem(16).SetUIActive(!0),
      this.GetText(23).ShowTextNew("NeedMaterialTitleText"),
      this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text"),
      this.GetItem(18).SetUIActive(!0);
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
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var e = this.EGt?.GetScrollItemList();
    if (e) for (const i of e) i.SetTimes(this.t6);
  }
  OnBeforeDestroy() {
    this.MGt = void 0;
  }
  UGt(e) {
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    this.MGt.SetTypeName(), this.gGt.SetTypeContent(e);
  }
  ETi(e, i, t, s) {
    this.gGt.SetExpNum(e, i, t, s);
  }
  vGt(e) {
    return (
      !!e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Compose", 50, "缺少itemData数据"),
      !1)
    );
  }
  Z2n(e) {
    var i = CommonManager_1.CommonManager.GetCurrentRoleId();
    i && this.gGt.SetRoleTexture(i, e);
  }
  STi(i) {
    if (this.vGt(i)) {
      let e = CommonManager_1.CommonManager.GetCurrentRoleId();
      e ||
        ((e = CommonManager_1.CommonManager.GetManufactureRoleId(i.ItemId)),
        CommonManager_1.CommonManager.SetCurrentRoleId(e)),
        e ||
          ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId()),
          CommonManager_1.CommonManager.SetCurrentRoleId(e)),
        e && this.gGt.SetRoleTexture(e, i.ItemId);
    }
  }
  xGt(e) {
    let i = !1,
      t = 0;
    e = e.filter(
      (e) =>
        e.L8n !== ComposeController_1.ComposeController.ComposeCoinId ||
        ((i = !0), (t = e.UVn), !1),
    );
    return [i, t, e];
  }
  tkt(e) {
    this.fGt &&
      this.fGt.ItemId !== e.ItemId &&
      (ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = 0),
      (this.fGt = e),
      (this.t6 = 1);
    var i = ComposeController_1.ComposeController.GetMaxCreateCount(
        this.fGt.ItemId,
      ),
      i =
        (this.WGe.Refresh(i),
        this.WGe.SetAddReduceButtonActive(!0),
        this.WGe.SetReduceButtonInteractive(!1),
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          e.ItemId,
        )),
      t =
        (this.MGt.SetDescVisible(!0),
        this.MGt.SetDescBgVisible(!1),
        ConfigManager_1.ConfigManager.ItemConfig?.GetItemAttributeDesc(
          i.ItemId,
        )),
      i = StringUtils_1.StringUtils.IsEmpty(i.ComposeBackground)
        ? ""
        : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
            i.ComposeBackground,
          );
    this.MGt.SetDesc(t),
      this.MGt.SetDescBg(i),
      this.WGe.SetUiActive(0 < e.IsUnlock),
      this.GetItem(9).SetUIActive(0 < e.IsUnlock),
      e.IsUnlock
        ? (this.GetItem(20).SetUIActive(!1),
          this.GetItem(18).SetUIActive(!0),
          (t = ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(
            e.ItemId,
          )),
          ([this.SGt, this.yGt, t] = this.xGt(t)),
          this.EGt.RefreshByData(t, () => {
            this.DGt();
          }))
        : (this.GetItem(20).SetUIActive(!0),
          this.GetItem(18).SetUIActive(!1),
          (i =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              this.fGt.ItemId,
            )),
          (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
            i.FormulaItemId,
          )) &&
            ((t = {
              Type: 4,
              Data: i.FormulaItemId,
              ItemConfigId: i.FormulaItemId,
              BottomTextId: e.Name,
              IsProhibit: !0,
              IsOmitBottomText: !0,
            }),
            this.IGt.Apply(t)));
  }
  BindChangeClickCall(e) {
    this.vTi = e;
  }
  MTi(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        e.ItemId,
      ),
      t = i.Proficiency,
      i = i.MaxProficiencyCount;
    this.ETi(e.ComposeCount, t, i, this.t6);
  }
  OnSecondTimerRefresh() {
    this.fGt && this.AGt(this.fGt);
  }
  RefreshProficiencyAndHelpRole(e) {
    this.MTi(e), this.Z2n(e.ItemId);
  }
  RefreshHelpRole() {
    this.Z2n(this.fGt.ItemId);
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
  PGt(i) {
    if (i.TotalMakeCountInLimitTime <= 0)
      this.GetItem(3).SetUIActive(!1), this.WGe.ResetLimitMaxValue();
    else {
      var t = i.TotalMakeCountInLimitTime - i.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, t));
      let e = t.toString();
      0 === t &&
        (e = StringUtils_1.StringUtils.Format(
          "<color=#c25757>{0}</color>",
          t.toString(),
        )),
        this.GetItem(3).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          "MakeLimit",
          e,
          i.TotalMakeCountInLimitTime,
        );
    }
  }
  RGt(e, i) {
    var t;
    this.GetText(12).GetParentAsUIItem().SetUIActive(e),
      e &&
        ((e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        (t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        e < i
          ? this.GetText(11).SetText(
              StringUtils_1.StringUtils.Format(
                "<color=#c25757>{0}</color>",
                i.toString(),
              ),
            )
          : this.GetText(11).SetText(i.toString()),
        this.SetTextureByPath(t.IconSmall, this.GetTexture(13)));
  }
  eNn(e, i = !1) {
    i ? this.gGt.SetExpVisible(e) : this.gGt.SetActive(e);
  }
  RefreshReagentProduction(e) {
    this.AGt(e),
      this.PGt(e),
      this.tkt(e),
      this.eNn(!0, !0),
      this.UGt("Material"),
      this.MTi(e),
      this.STi(e);
  }
  RefreshStructure(e) {
    this.AGt(e),
      this.PGt(e),
      this.tkt(e),
      this.UGt("Prop"),
      this.eNn(!1, !0),
      this.STi(e);
  }
  RefreshPurification(e) {
    this.AGt(e),
      this.PGt(e),
      this.tkt(e),
      this.UGt("Material"),
      this.eNn(!1, !0),
      this.STi(e),
      e.IsUnlock <= 0 && this.WGe.Refresh(0);
  }
}
exports.ComposeIngredientsVerticalView = ComposeIngredientsVerticalView;
//# sourceMappingURL=ComposeIngerdientsVerticalView.js.map
