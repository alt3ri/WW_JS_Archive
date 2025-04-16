"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingRootView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
  NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CommonManager_1 = require("../../Common/CommonManager"),
  ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem"),
  ComposeController_1 = require("../../Compose/ComposeController"),
  ForgingController_1 = require("../ForgingController"),
  ForgingMediumItemGrid_1 = require("./ForgingMediumItemGrid"),
  TIMERGAP = 1e3;
class ForgingRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.yLi = 0),
      (this.ILi = void 0),
      (this.TLi = new Array()),
      (this.LLi = void 0),
      (this.vNt = void 0),
      (this.MNt = void 0),
      (this.GOe = void 0),
      (this.WGe = void 0),
      (this.i8l = !1),
      (this.t6 = 1),
      (this.fGt = void 0),
      (this.SGt = !1),
      (this.yGt = 0),
      (this.IGt = void 0),
      (this.EGt = void 0),
      (this._Li = void 0),
      (this.uLi = void 0),
      (this.cLi = void 0),
      (this.BNt = () => {
        this.dal(),
          (this.bNt() || this.NNt()) &&
            ForgingController_1.ForgingController.SendForgeInfoRequestAsync().then(
              () => {
                this.RLi();
              },
            );
      }),
      (this.nWs = () => {
        this.MNt.UpdateData(24, this.LNt());
      }),
      (this.jwe = (e) => {
        "OnBlackScreen" === e &&
          ForgingController_1.ForgingController.PlayForgingEnterDisplay();
      }),
      (this.cHe = () => {
        var e = new ForgingMediumItemGrid_1.ForgingMediumItemGrid();
        return e.BindOnExtendToggleStateChanged(this.HTi), e;
      }),
      (this.HTi = (e) => {
        e = e.Data;
        this.ILi.DeselectCurrentGridProxy(),
          (this.yLi = this.TLi.indexOf(e)),
          (this.LLi = e),
          this.ILi.IsGridDisplaying(this.yLi) &&
            (e.IsNew &&
              ((e.IsNew = !1),
              ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
                e.ItemId,
              )),
            this.ILi.SelectGridProxy(this.yLi),
            this.ILi.RefreshGridProxy(this.yLi),
            this.r8l(e),
            this.ekt(e),
            this.o8l(e));
      }),
      (this.RLi = () => {
        this.MNt.UpdateData(24, this.LNt());
      }),
      (this.jNt = () => {
        this.ILi.ReloadData(this.TLi);
      }),
      (this.Q9t = () => {
        UiManager_1.UiManager.OpenView(
          "ManufactureHelpRoleView",
          this.LLi.ItemId,
        );
      }),
      (this.FNt = (e) => {
        (this.TLi = e),
          (this.TLi = this.TLi.filter(
            (e) =>
              e.ExistStartTime <= 0 ||
              TimeUtil_1.TimeUtil.IsInTimeSpan(
                e.ExistStartTime,
                e.ExistEndTime,
              ),
          )),
          this.jNt(),
          0 !== this.TLi.length && this.wLi(!0);
      }),
      (this.LGt = (e) => {
        (this.t6 = e),
          this.fGt &&
            ((t = ForgingController_1.ForgingController.GetMaxCreateCount(
              this.fGt.ItemId,
            )),
            this.WGe.SetAddButtonInteractive(e < t),
            this.WGe.SetReduceButtonInteractive(1 < e));
        var t = StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_ItemSelectForgeQuantityTip_text",
          ),
          "" + this.t6,
        );
        this.WGe.SetNumberSelectTipsText(t), this.DGt();
      }),
      (this.xLi = () => {
        this.MNt.UpdateData(24, this.LNt());
      }),
      (this.OnClickBackBtn = () => {
        this.CloseMe();
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
      }),
      (this.vke = () => {
        return new StarItem();
      }),
      (this.Wft = 1),
      (this.CLi = 0),
      (this.sOt = () => {
        this.GetButton(27).IsSelfInteractive
          ? this.fGt.IsUnlock
            ? CommonManager_1.CommonManager.SendManufacture(
                this.fGt.ItemId,
                this.t6,
              )
            : ForgingController_1.ForgingController.SendForgeFormulaUnlockRequest(
                this.fGt.ItemId,
              )
          : ForgingController_1.ForgingController.PlayForgingFailDisplay(() => {
              ForgingController_1.ForgingController.PlayForgingLoopDisplay();
            });
      });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GetForgingData,
      this.nWs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenHelpRole,
        this.Q9t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingSuccess,
        this.RLi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ForgingFail,
        this.RLi,
      ),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GetForgingData,
      this.nWs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenHelpRole,
        this.Q9t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingSuccess,
        this.jNt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ForgingFail,
        this.jNt,
      ),
      this.GOe &&
        TimerSystem_1.TimerSystem.Has(this.GOe) &&
        (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  dal() {
    (this.i8l = !1),
      this.n8l(),
      this.PGt(),
      this.GetItem(29)?.SetUIActive(this.i8l);
  }
  n8l() {
    var e = ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime();
    e
      ? ((this.i8l = !0),
        this.GetText(26)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(26), "RefreshTime", e))
      : this.GetText(26)?.SetUIActive(!1);
  }
  bNt() {
    return (
      ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTimeValue() <= 0
    );
  }
  NNt() {
    var e = this.LNt();
    if (e)
      for (const t of e)
        if (
          0 < t.ExistEndTime &&
          !TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)
        )
          return !0;
    return !1;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UITexture],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIItem],
      [12, UE.UITexture],
      [13, UE.UIText],
      [14, UE.UIText],
      [15, UE.UITexture],
      [16, UE.UIText],
      [17, UE.UIText],
      [18, UE.UIText],
      [19, UE.UIText],
      [20, UE.UIText],
      [21, UE.UIItem],
      [22, UE.UIScrollViewWithScrollbarComponent],
      [23, UE.UIItem],
      [24, UE.UIItem],
      [25, UE.UIText],
      [26, UE.UIText],
      [27, UE.UIButtonComponent],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIText],
      [31, UE.UIText],
      [32, UE.UIItem],
      [34, UE.UITexture],
      [33, UE.UIText],
    ]),
      (this.BtnBindInfo = [[27, this.sOt]]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.OnClickBackBtn),
      this.lqe.SetTitleIcon(
        "/Game/Aki/UI/UIResources/Common/Atlas/TabIcon/SP_IconForge.SP_IconForge",
      ),
      this.lqe.SetTitleByTextIdAndArgNew("NpcSystemBackground_1008_Title"),
      await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
      this.lqe.SetCurrencyItemVisible(!0),
      (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
        this.GetItem(24),
      ));
    var e = { MaxNumber: 0, ValueChangeFunction: this.LGt };
    this.WGe.Init(e),
      this.WGe.SetNumberSelectTipsVisible(!1),
      this.WGe.SetAddReduceButtonActive(!0),
      (this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(22),
        this.TGt,
      )),
      (this.IGt = new MediumItemGrid_1.MediumItemGrid()),
      this.IGt.Initialize(this.GetItem(21).GetOwner()),
      this.IGt.BindOnCanExecuteChange(() => !1),
      this.IGt.BindOnExtendToggleClicked((e) => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e,
        );
      }),
      (this.cLi = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(10),
        this.vke,
      )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
        this.jwe,
      );
  }
  OnStart() {
    (this.vNt = new FilterEntrance_1.FilterEntrance(this.GetItem(3), this.FNt)),
      (this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(4), this.FNt)),
      this.vNt.SetActive(!1),
      (this.ILi = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetLoopScrollViewComponent(1).TemplateGrid,
        this.cHe,
      )),
      ForgingController_1.ForgingController.RegisterCurrentInteractionEntity(),
      CommonManager_1.CommonManager.SetCurrentSystem(2),
      (ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 0),
      (ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId =
        ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId),
      void 0 ===
        ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Forging",
            64,
            "[LevelEventOpenSystem] 打开合成界面时找不到交互对象，直接关闭界面",
          ),
        this.CloseMe());
  }
  OnBeforeShow() {
    this.xLi(), this.nWs();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent,
      this.jwe,
    ),
      this.vNt.Destroy(),
      this.MNt.Destroy(),
      ForgingController_1.ForgingController.PlayLeaveForgingAudio(),
      ForgingController_1.ForgingController.ClearCurrentInteractionEntityDisplay(),
      (ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId = 0);
  }
  r8l(e) {
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
        e.ItemId,
      ),
      t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        e.ItemId,
      ),
      t =
        (this.GetText(8).ShowTextNew(t?.WeaponName ?? ""),
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          e.ItemId,
        ));
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "Have", t);
  }
  ekt(e) {
    let t = !0;
    var i = ModelManager_1.ModelManager.ForgingModel,
      r = i.CheckUnlock(e),
      s = i.CheckCoinEnough(e.ItemId),
      n = i.CheckLimitCount(e);
    let o = "";
    r
      ? ((o =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponMaking")),
        (t = i.CheckMaterialEnough(e.ItemId)))
      : (o =
          ConfigManager_1.ConfigManager.TextConfig.GetTextById("UnlockWeapon")),
      this.GetText(30).SetText(o),
      this.GetText(31).SetText(this.ikt(r, t, s, n)),
      this.GetItem(28).SetUIActive(!(r && t && n)),
      this.GetButton(27).RootUIComp.SetUIActive(r && t && n);
  }
  ikt(e, t, i, r) {
    return e
      ? t
        ? r
          ? ""
          : void 0 ===
              (e =
                ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime())
            ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "LackMakeCountWithoutTime",
              )
            : StringUtils_1.StringUtils.Format(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "LackMakeCount",
                ),
                e,
              )
        : ((t =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "LackMakeMaterial",
            )),
          i
            ? StringUtils_1.StringUtils.Format(
                t,
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "Material_Text",
                ),
              )
            : StringUtils_1.StringUtils.Format(
                t,
                ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
                  ForgingController_1.ForgingController.ForgingCostId,
                ),
              ))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "GenericPrompt_Unlocked_TipsText",
        );
  }
  wLi(e = !1) {
    this.ILi.DeselectCurrentGridProxy(),
      e && this.ILi.ScrollToGridIndex(this.yLi),
      this.ILi.SelectGridProxy(this.yLi);
    e = this.TLi[this.yLi];
    this.r8l(e), this.ekt(e), this.o8l(e);
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var e = this.EGt?.GetScrollItemList();
    if (e) for (const t of e) t.SetTimes(this.t6);
  }
  RGt(e, t) {
    var i;
    this.GetItem(32).GetParentAsUIItem().SetUIActive(e),
      e &&
        ((e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        (i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        e < t
          ? this.GetText(33).SetText(
              StringUtils_1.StringUtils.Format(
                "<color=#c25757>{0}</color>",
                t.toString(),
              ),
            )
          : this.GetText(33).SetText(t.toString()),
        this.SetTextureByPath(i.IconSmall, this.GetTexture(34)));
  }
  o8l(e) {
    this.tkt(e),
      this.MLi(),
      this.dal(),
      this.s8l(),
      e.IsUnlock ? this.WGe.SetActive(!0) : this.WGe.SetActive(!1);
  }
  PGt() {
    if ((this.fGt?.TotalMakeCountInLimitTime ?? 0) <= 0)
      this.WGe.ResetLimitMaxValue(), this.GetText(25)?.SetUIActive(!1);
    else {
      (this.i8l = !0), this.GetText(25)?.SetUIActive(!0);
      var t =
        this.fGt.TotalMakeCountInLimitTime - this.fGt.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, t));
      let e = t.toString();
      0 === t &&
        (e = StringUtils_1.StringUtils.Format(
          "<color=#c25757>{0}</color>",
          t.toString(),
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(25),
          "MakeLimit",
          e,
          this.fGt.TotalMakeCountInLimitTime,
        );
    }
  }
  tkt(e) {
    (this.fGt = e), (this.t6 = 1);
    var t = CommonManager_1.CommonManager.GetMaxCreateCount(this.fGt.ItemId),
      t =
        (this.WGe.Refresh(t),
        this.WGe.SetAddReduceButtonActive(!0),
        this.WGe.SetReduceButtonInteractive(!1),
        ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
          e.ItemId,
        )),
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(
        t.ItemId,
      ),
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
        e,
        1,
      ),
      e = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc),
        ...t,
      );
    this.GetText(20).SetText(e);
  }
  MLi() {
    var e, t;
    this.fGt.IsUnlock
      ? (this.IGt.SetUiActive(!1),
        this.EGt.SetActive(!0),
        (t = ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(
          this.fGt.ItemId,
        )),
        ([this.SGt, this.yGt, t] = this.xGt(t)),
        this.EGt.RefreshByData(t, () => {
          this.DGt();
        }))
      : (this.IGt.SetUiActive(!0),
        this.EGt.SetActive(!1),
        (t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
          this.fGt.ItemId,
        )),
        (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
          t.FormulaItemId,
        )) &&
          ((t = {
            Type: 4,
            Data: t.FormulaItemId,
            ItemConfigId: t.FormulaItemId,
            BottomTextId: e.Name,
            IsProhibit: !0,
            IsOmitBottomText: !0,
          }),
          this.IGt.Apply(t)));
  }
  xGt(e) {
    let t = !1,
      i = 0;
    e = e.filter(
      (e) =>
        e.L8n !== ComposeController_1.ComposeController.ComposeCoinId ||
        ((t = !0), (i = e.UVn), !1),
    );
    return [t, i, e];
  }
  s8l() {
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      this.fGt.ItemId,
    );
    (this._Li =
      ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
        e.ItemId,
      )),
      (this.uLi = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(
        this._Li.BreachId,
        1,
      )),
      this.gLi(),
      this.fLi(),
      this.aqe(),
      this.pLi(),
      this.a8l();
  }
  gLi() {
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
      this._Li.ResonId,
      1,
    );
    e && this.GetText(19).ShowTextNew(e.Name);
  }
  fLi() {
    var e = this.uLi.LevelLimit;
    LguiUtil_1.LguiUtil.SetLocalText(
      this.GetText(9),
      "ForgingWeaponLevel",
      1,
      e,
    );
  }
  aqe() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(
        this._Li.BreachId,
      ),
      e = new Array(e);
    this.cLi.RefreshByData(e);
  }
  LNt(e = !0) {
    let t = ModelManager_1.ModelManager.ForgingModel.GetForgingDataList();
    return (t =
      t && e ? t.filter((e) => 0 < e.IsUnlock || 0 < e.FormulaItemId) : t);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (this.ILi?.DataInited)
      return (
        (t = Number(e[0])),
        (t = this.ILi.GetGridByDisplayIndex(t))
          ? [t, t]
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Guide",
                53,
                "印造界面聚焦引导的额外参数配置错误",
                ["configParams", e],
              )
            )
      );
  }
  pLi() {
    var e =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          this._Li.FirstPropId.Id,
        ),
      t =
        (this.GetText(13)?.ShowTextNew(e.Name),
        this.SetTextureByPath(e.Icon, this.GetTexture(12)),
        ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
          this._Li.FirstCurve,
          this._Li.FirstPropId.Value,
          this.Wft,
          this.CLi,
        )),
      t =
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          this._Li.FirstPropId.Id,
          t,
          this._Li.FirstPropId.IsRatio,
        ),
      t =
        (this.GetText(14)?.SetText(t),
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          this._Li.SecondPropId.Id,
        )),
      t =
        (this.GetText(16)?.ShowTextNew(t.Name),
        this.SetTextureByPath(e.Icon, this.GetTexture(15)),
        ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
          this._Li.SecondCurve,
          this._Li.SecondPropId.Value,
          this.Wft,
          this.CLi,
        )),
      e =
        ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(
          this._Li.SecondPropId.Id,
          t,
          this._Li.SecondPropId.IsRatio,
        );
    this.GetText(17)?.SetText(e),
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(18),
        "WeaponResonanceItemLevelText",
        "1",
      );
  }
  a8l() {
    this.SetTextureByPath(this._Li.Icon, this.GetTexture(6));
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
      this._Li.QualityId,
    );
    e && this.SetSpriteByPath(e.ComposeQualityBg, this.GetSprite(5), !1);
  }
}
exports.ForgingRootView = ForgingRootView;
class StarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e, t, i) {
    0 === e
      ? (this.GetSprite(0).SetUIActive(!0), this.GetSprite(1).SetUIActive(!1))
      : (this.GetSprite(0).SetUIActive(!1), this.GetSprite(1).SetUIActive(!0));
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return e;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
    ]),
      (this.BtnBindInfo = []);
  }
  SetState(e) {}
}
//# sourceMappingURL=ForgingRootView.js.map
