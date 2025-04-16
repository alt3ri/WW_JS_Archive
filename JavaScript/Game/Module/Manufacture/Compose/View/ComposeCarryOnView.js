"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeCarryOnView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
  NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  UiNavigationNewController_1 = require("../../../UiNavigation/New/UiNavigationNewController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  CommonManager_1 = require("../../Common/CommonManager"),
  ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem"),
  StarLevelComponent_1 = require("../../Common/StarLevelComponent"),
  ComposeController_1 = require("../ComposeController"),
  ComposeDefine_1 = require("../ComposeDefine"),
  ComposeMediumItemGrid_1 = require("../Item/ComposeMediumItemGrid"),
  ComposeCircleItem_1 = require("./ComposeCircleItem"),
  ComposeExchangeItem_1 = require("./ComposeExchangeItem"),
  GAP = 112,
  TIMERGAP = 1e3;
class ComposeCarryOnView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Ivt = void 0),
      (this.WGe = void 0),
      (this.vNt = void 0),
      (this.MNt = void 0),
      (this.EGt = void 0),
      (this.BTi = void 0),
      (this.SNt = void 0),
      (this.IGt = void 0),
      (this.ovt = void 0),
      (this.bjl = void 0),
      (this.Ljl = void 0),
      (this.SPe = void 0),
      (this.fGt = void 0),
      (this.SGt = !1),
      (this.yGt = 0),
      (this.t6 = 1),
      (this.xuo = 0),
      (this.aTi = []),
      (this.hTi = []),
      (this.lTi = []),
      (this.Tjl = []),
      (this.mFi = []),
      (this.xjl = !1),
      (this.hvt = void 0),
      (this.Rjl = !1),
      (this.wjl = 0),
      (this.GOe = void 0),
      (this.v5l = void 0),
      (this.Kti = 0),
      (this.L6e = 0),
      (this.D8l = []),
      (this.LGt = (t) => {
        var i;
        (this.t6 = t),
          this.DGt(),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(30),
            "Text_ItemSelectSynthesisQuantityTip_text",
            this.t6,
          ),
          this.fGt &&
            1 === this.fGt.MainType &&
            ((i = ComposeController_1.ComposeController.GetMaxCreateCount(
              this.fGt.ConfigId,
              this.fGt,
            )),
            this.WGe.SetAddButtonInteractive(t < i),
            this.WGe.SetReduceButtonInteractive(1 < t),
            this.MTi(!0));
      }),
      (this.CanToggleChange = () => {
        var t;
        return (
          !this.ovt.MovingState() &&
          (!!Info_1.Info.IsInGamepad() ||
            ((t = CommonParamById_1.configCommonParamById.GetIntConfig(
              "panel_interval_time",
            )),
            !this.L6e) ||
            Time_1.Time.Now - this.L6e >= t)
        );
      }),
      (this.TGt = () => {
        var t = new ManufactureMaterialItem_1.ManufactureMaterialItem();
        return (
          t.BindOnCanExecuteChange(() => !1),
          t.BindOnExtendToggleClicked((t) => {
            t = t.Data;
            4 === this.fGt.MainType
              ? this.Pjl()
              : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                  t.L8n,
                );
          }),
          t.BindEmptySlotButtonCallback(() => {
            this.Pjl();
          }),
          t
        );
      }),
      (this.Ujl = () => {
        var t = new ComposeExchangeItem_1.ComposeExchangeItem();
        return (
          t.BindOnExtendToggleClicked((t) => {
            var i = t.Data;
            this.Ljl?.SetToggleState(0),
              (this.Ljl = t.MediumItemGrid.GetItemGridExtendToggle()),
              i.UVn <= 1
                ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                    i.L8n,
                  )
                : ((this.wjl = i.L8n), this.Djl());
          }),
          t
        );
      }),
      (this.FNt = (t) => {
        var i = t.filter((t) => {
          return (
            t.ExistStartTime <= 0 ||
            TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)
          );
        });
        switch (
          ((this.xuo = 0),
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType)
        ) {
          case 1:
            this.aTi = i;
            break;
          case 2:
            this.hTi = i;
            break;
          case 3:
            this.lTi = i;
            break;
          case 4:
            this.Tjl = i;
        }
        this.BTi.DeselectCurrentGridProxy(),
          this.jNt(),
          0 !== i.length && this.jTi(!0);
      }),
      (this.cHe = () => {
        var t = new ComposeMediumItemGrid_1.ComposeMediumItemGrid();
        return t.BindOnExtendToggleStateChanged(this.HTi), t;
      }),
      (this.jNt = () => {
        switch (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
        ) {
          case 1:
            this.BTi.RefreshByData(this.aTi);
            break;
          case 2:
            this.BTi.RefreshByData(this.hTi);
            break;
          case 3:
            this.BTi.RefreshByData(this.lTi);
            break;
          case 4:
            this.BTi.RefreshByData(this.Tjl);
        }
      }),
      (this.qTi = (t = 0) => {
        0 === t &&
          (this.MNt.SetResultDataDirty(),
          this.MNt.UpdateData(23, this.LNt()),
          this.vNt.SetActive(!0),
          this.vNt.UpdateData(23, this.LNt())),
          this.Ivt?.SelectToggleByIndex(t, !0),
          this.YGt(),
          this.GTi();
      }),
      (this.GTi = () => {
        this.GetButton(4)
          .GetOwner()
          .GetUIItem()
          .SetUIActive(
            1 ===
              ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType,
          );
        var t = CommonManager_1.CommonManager.GetComposeMaxLevel(),
          i = CommonManager_1.CommonManager.GetCurrentRewardLevel();
        this.SNt.ShowLevel(i, t), this.QTi();
      }),
      (this.qdi = () => {
        this.MLi();
      }),
      (this.HTi = (t) => {
        var i = t.Data;
        if (i !== this.fGt) {
          this.Rjl = !0;
          let t = 0;
          switch ((this.BTi.DeselectCurrentGridProxy(), i.MainType)) {
            case 1:
              (this.xuo =
                ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                  i.ConfigId,
                ).ItemId),
                (t = this.aTi.indexOf(i));
              break;
            case 2:
              (this.xuo =
                ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                  i.ConfigId,
                ).ItemId),
                (t = this.hTi.indexOf(i));
              break;
            case 3:
              (this.xuo =
                ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                  i.ConfigId,
                ).ItemId),
                (t = this.lTi.indexOf(i));
              break;
            case 4:
              (this.xuo = i.ConfigId), (t = this.Tjl.indexOf(i));
          }
          this.BTi.IsGridDisplaying(t)
            ? (i.IsNew &&
                (ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
                  LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
                  i.ConfigId,
                ),
                (i.IsNew = !1)),
              this.BTi.SelectGridProxy(t),
              this.BTi.RefreshGridProxy(t),
              this.RefreshTips(i))
            : (this.Rjl = !1);
        }
      }),
      (this.W7t = () => {
        this.CloseMe();
      }),
      (this.fqe = (t, i) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.pqe = (t) => {
        this.L6e = Time_1.Time.Now;
        t = this.mFi[t];
        ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== t &&
          ((ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType =
            t),
          this.GTi(),
          this.OTi(),
          this.SPe?.PlayLevelSequenceByName("Switch"),
          4 !== t) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.FinishGuideStepByEvent,
            "ComposeCarryOnView",
          );
      }),
      (this.OTi = () => {
        switch (
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType
        ) {
          case 1:
            this.vNt.UpdateData(20, this.LNt()),
              this.MNt.SetResultDataDirty(),
              this.MNt.UpdateData(20, this.LNt());
            break;
          case 2:
            this.vNt.UpdateData(22, this.LNt()),
              this.MNt.SetResultDataDirty(),
              this.MNt.UpdateData(22, this.LNt());
            break;
          case 3:
            this.MNt.SetResultDataDirty(), this.MNt.UpdateData(23, this.LNt());
            break;
          case 4:
            this.MNt.SetResultDataDirty(), this.MNt.UpdateData(35, this.LNt());
        }
      }),
      (this.qjl = (t, i, e) => {
        t &&
          this.fGt !== t &&
          !this.Rjl &&
          ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType ===
            i &&
          ((ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = 0),
          (this.fGt = t),
          (this.xjl = !1),
          3 === this.fGt.MainType &&
            ((this.xuo =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                t.ConfigId,
              )?.ItemId ?? 0),
            this.RefreshPurification(!1)),
          4 === this.fGt.MainType &&
            ((this.xuo = t.ConfigId), this.RefreshExchange(!1), this.kjl()),
          this.ekt(),
          this.AGt(),
          this.PGt(),
          this.Gjl(),
          this.dal(),
          this.B8l(),
          e) &&
          this.CQl();
      }),
      (this.BNt = () => {
        this.Fjl(),
          this.bNt()
            ? ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(
                () => {
                  this.NTi();
                },
              )
            : this.NNt() &&
              ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(
                () => {
                  this.OTi();
                },
              );
      }),
      (this.NTi = () => {
        (this.Kti = this.xuo), this.OTi(), this.kjl(), (this.Kti = 0);
      }),
      (this.$Ge = (t) => {
        "CompositeRewardView" === t &&
          (this.ChildPopView?.PopItem.SetActive(!0),
          this.ChildPopView?.PlayLevelSequenceByName("Start"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.HangPlotViewHud,
            !1,
          ));
      }),
      (this.Njl = (t, i) => {
        ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== t &&
          ((ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType =
            t),
          (this.Kti = i),
          this.GTi(),
          this.OTi(),
          (i = this.mFi.indexOf(t)),
          this.Ivt?.SelectToggleByIndex(i, !0),
          (this.xuo = this.Kti),
          (this.Kti = 0),
          this.jjl());
      }),
      (this.yqe = (t) => {
        var i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
          ComposeDefine_1.composeTypeSprite[this.mFi[t]],
        );
        return new CommonTabData_1.CommonTabData(
          i,
          new CommonTabTitleData_1.CommonTabTitleData(
            ComposeDefine_1.composeTypeName[this.mFi[t]],
          ),
        );
      }),
      (this.Uye = (t, i, e) => {
        var s = new ComposeCircleItem_1.ComposeCircleItem();
        return (
          s.CreateByActorAsync(t),
          (s.ButtonFunction = this.qjl),
          (s.CheckToggleCanClick = this.RHl),
          (s.ItemCurve = this.hvt),
          s
        );
      }),
      (this.RHl = () => !this.ovt.MovingState()),
      (this.Vjl = () => {
        (ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2),
          UiManager_1.UiManager.OpenView("ComposeLevelView");
      }),
      (this.L3e = () => {
        if (this.GetButton(24).IsSelfInteractive) {
          if (((this.Rjl = !0), 4 === this.fGt.MainType))
            return this.wjl
              ? void ComposeController_1.ComposeController.SendExchangeRequest(
                  this.fGt.ConfigId,
                  this.wjl,
                  this.t6 * ComposeDefine_1.EXCHANGE_COUNT,
                ).finally(() => {
                  this.Rjl = !1;
                })
              : ((this.Rjl = !1),
                void ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                  "ComposeExchangeNotFindItemTips",
                ));
          ComposeController_1.ComposeController.SendManufacture(
            this.fGt.ConfigId,
            this.t6,
          ).finally(() => {
            this.Rjl = !1;
          });
        } else
          ComposeController_1.ComposeController.PlayCompositeFailDisplay(() => {
            ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
          });
      }),
      (this.jjl = () => {
        this.GetItem(26)?.SetUIActive(!1),
          this.Ivt?.SetCloseBtnShowState(!0),
          this.wjl &&
            this.EGt?.GetScrollItemByIndex(0)?.SetComposeChangeAble(!0),
          this.SPe?.PlayLevelSequenceByName("PopupHide");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UISprite],
      [11, UE.UITexture],
      [12, UE.UIText],
      [13, UE.UIText],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UIItem],
      [17, UE.UIScrollViewWithScrollbarComponent],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIText],
      [21, UE.UIText],
      [22, UE.UIText],
      [23, UE.UIText],
      [24, UE.UIButtonComponent],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIButtonComponent],
      [28, UE.UILoopScrollViewComponent],
      [29, UE.UIItem],
      [30, UE.UIText],
      [31, UE.UIText],
      [32, UE.UITexture],
      [33, UE.UIItem],
      [34, UE.UIItem],
      [35, UE.UISprite],
      [36, UE.UIHorizontalLayout],
      [37, UE.UIItem],
      [38, UE.UIText],
      [39, UE.UIItem],
      [40, UE.UIItem],
      [41, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.Vjl],
        [24, this.L3e],
        [27, this.jjl],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ComposeSuccess,
      this.NTi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeFail,
        this.NTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ComposeSwitchType,
        this.Njl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpgradeComposeLevel,
        this.GTi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      ),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP));
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ComposeSuccess,
      this.NTi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeFail,
        this.NTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ComposeSwitchType,
        this.Njl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpgradeComposeLevel,
        this.GTi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      ),
      this.GOe &&
        TimerSystem_1.TimerSystem.Has(this.GOe) &&
        (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  async OnBeforeStartAsync() {
    await ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync(),
      (this.mFi = [3, 1, 2, 4]);
    var t = new CommonTabComponentData_1.CommonTabComponentData(
        this.fqe,
        this.pqe,
        this.yqe,
      ),
      t =
        ((this.Ivt =
          new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
            this.GetItem(0),
            t,
            this.W7t,
          )),
        this.Ivt.SetHelpButtonShowState(!1),
        this.Ivt.SetCanChange(this.CanToggleChange),
        await this.Ivt.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
        await this.Ivt.RefreshTabItemByLengthAsync(this.mFi.length),
        (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
          this.GetItem(19),
        )),
        { MaxNumber: 0, ValueChangeFunction: this.LGt }),
      t =
        (this.WGe.Init(t),
        this.WGe.SetUiActive(!0),
        this.WGe.SetNumberSelectTipsVisible(!1),
        this.WGe.SetAddReduceButtonActive(!0),
        (this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(
          this.GetScrollViewWithScrollbar(17),
          this.TGt,
        )),
        (this.BTi = new LoopScrollView_1.LoopScrollView(
          this.GetLoopScrollViewComponent(1),
          this.GetItem(2).GetOwner(),
          this.cHe,
        )),
        (this.vNt = new FilterEntrance_1.FilterEntrance(
          this.GetItem(33),
          this.FNt,
        )),
        this.vNt.SetActive(!1),
        (this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(3), this.FNt)),
        this.MNt.SetSortToggleState(!0),
        (this.SNt = new StarLevelComponent_1.StarLevelComponent(
          this.GetHorizontalLayout(36),
        )),
        (this.IGt = new MediumItemGrid_1.MediumItemGrid()),
        this.IGt.Initialize(this.GetItem(16).GetOwner()),
        this.IGt.BindOnCanExecuteChange(() => !1),
        this.IGt.BindOnExtendToggleClicked((t) => {
          t = t.Data;
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            t,
          );
        }),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "ComposeCurve",
        )),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat),
      t =
        ((this.hvt = await t.Promise),
        (this.ovt = new NoCircleAttachView_1.NoCircleAttachView(
          this.GetItem(7)?.GetOwner(),
        )),
        this.GetItem(8));
    t.SetUIActive(!1),
      this.ovt.CreateItems(t.GetOwner(), GAP, this.Uye, 0),
      this.ovt.SetControllerItem(this.GetItem(41)),
      (this.bjl = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(28),
        this.GetItem(29).GetOwner(),
        this.Ujl,
      )),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {
    CommonManager_1.CommonManager.SetCurrentSystem(1);
  }
  OnBeforeShow() {
    var t = this.OpenParam;
    (this.v5l = t?.SelectData),
      (this.Kti = this.v5l?.ItemId ?? 0),
      this.qTi(t ? this.mFi.indexOf(t.Type) : 0),
      (this.Kti = 0);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 3;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      (t = Number(t[0])), (t = this.mFi.indexOf(t));
      if (!(t < 0)) {
        t = this.Ivt?.GetTabItemByIndex(t)?.GetRootItem();
        if (void 0 !== t) return [t, t];
      }
    }
  }
  MTi(t) {
    var i, e;
    t
      ? (this.GetText(14).SetUIActive(!0),
        (t = this.fGt),
        (i = (e =
          ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
            t.ConfigId,
          )).Proficiency),
        (e = e.MaxProficiencyCount),
        this.ETi(t.ComposeCount, i, e, this.t6))
      : this.GetText(14).SetUIActive(!1);
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var t = this.EGt?.GetScrollItemList();
    if (t) for (const i of t) i.SetTimes(this.t6);
  }
  RGt(t, i) {
    var e;
    t
      ? (this.GetTexture(32)?.SetUIActive(!0),
        this.GetText(31).SetUIActive(!0),
        (t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        (e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
          ComposeController_1.ComposeController.ComposeCoinId,
        )),
        t < i
          ? this.GetText(31).SetText(
              StringUtils_1.StringUtils.Format(
                "<color=#c25757>{0}</color>",
                i.toString(),
              ),
            )
          : this.GetText(31).SetText(i.toString()),
        this.SetTextureByPath(e.IconSmall, this.GetTexture(32)))
      : (this.GetTexture(32)?.SetUIActive(!1),
        this.GetText(31).SetUIActive(!1));
  }
  ETi(t, i, e, s) {
    var e = i * e,
      t = t * i,
      h = e - t,
      t = StringUtils_1.StringUtils.Format(
        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "CumulativeProficiency",
        ),
        t.toString(),
        e.toString(),
      );
    0 < h
      ? ((e = Math.min(h, i * s)),
        (i = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "+" + Math.min(e, h),
        ).concat(" ", "(", t, ")")),
        this.GetText(14).SetText(i))
      : ((s = StringUtils_1.StringUtils.Format(
          ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "AddProficiency",
          ),
          "",
        ).concat(" ", "(", t, ")")),
        this.GetText(14).SetText(s));
  }
  LNt() {
    return this.zNt(
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType,
    );
  }
  zNt(t) {
    let i = void 0;
    switch (t) {
      case 1:
        i =
          ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataList();
        break;
      case 2:
        i = ModelManager_1.ModelManager.ComposeModel.GetStructureDataList();
        break;
      case 3:
        i = ModelManager_1.ModelManager.ComposeModel.GetPurificationDataList();
        break;
      case 4:
        i = ModelManager_1.ModelManager.ComposeModel.GetExchangeDataList();
        break;
      default:
        return;
    }
    return i;
  }
  QTi() {
    var t;
    1 === ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType &&
      ((t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_ReagentProductionLevel",
      )),
      this.SetSpriteByPath(t, this.GetSprite(35), !1));
  }
  YGt() {
    RedDotController_1.RedDotController.BindRedDot(
      "ComposeReagentProduction",
      this.GetItem(34),
    );
  }
  AGt() {
    var t;
    this.fGt.ExistEndTime <= 0 && this.fGt.TotalMakeCountInLimitTime <= 0
      ? this.GetText(23)?.SetUIActive(!1)
      : ((this.xjl = !0),
        this.GetText(23)?.SetUIActive(!0),
        this.fGt.IsLimitForever
          ? ((t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(
              this.fGt.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime(),
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(23),
              "RemainingTime",
              t,
            ))
          : ((t =
              ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime()),
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(23),
              "RefreshTime",
              t,
            )));
  }
  MLi() {
    this.t6 = 1;
    var t,
      i = ComposeController_1.ComposeController.GetMaxCreateCount(
        this.fGt.ConfigId,
        this.fGt,
      );
    this.WGe.ResetLimitMaxValue(),
      this.WGe.Refresh(i),
      this.WGe.SetMaxBtnShowState(1 < i),
      this.v5l &&
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          this.fGt.ConfigId,
        )?.ItemId === this.v5l.ItemId &&
        0 < (t = this.v5l.Count - this.v5l.SelectedCount) &&
        (t <= i ? this.WGe.ChangeValue(t) : 1 <= i && this.WGe.ChangeValue(i)),
      this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetReduceButtonInteractive(1 < this.t6),
      this.WGe.SetUiActive(0 < this.fGt.IsUnlock),
      this.GetText(30).SetUIActive(0 < this.fGt.IsUnlock),
      this.fGt.IsUnlock
        ? (this.IGt.SetUiActive(!1),
          this.EGt.SetActive(!0),
          (t = ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(
            this.fGt.ConfigId,
          )),
          ([this.SGt, this.yGt, t] = this.xGt(t)),
          this.EGt.RefreshByData(t, () => {
            this.DGt();
          }))
        : (this.IGt.SetUiActive(!0),
          this.EGt.SetActive(!1),
          (i =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              this.fGt.ConfigId,
            )),
          (t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
            i.FormulaItemId,
          )) &&
            ((i = {
              Type: 4,
              Data: i.FormulaItemId,
              ItemConfigId: i.FormulaItemId,
              BottomTextId: t.Name,
              IsProhibit: !0,
              IsOmitBottomText: !0,
            }),
            this.IGt.Apply(i)));
  }
  Hjl() {
    (this.t6 = 1),
      this.WGe.SetAddReduceButtonActive(!0),
      this.WGe.SetReduceButtonInteractive(!0),
      this.WGe.SetUiActive(!1),
      this.WGe.SetMaxBtnShowState(!0),
      this.GetText(30).SetUIActive(!0),
      (this.wjl = 0),
      this.IGt.SetUiActive(!1),
      this.EGt.SetActive(!0),
      (this.SGt = !1),
      (this.yGt = 0),
      this.EGt?.RefreshByData([{ L8n: 0, UVn: 0, K6n: !0, IsEmpty: !0 }]),
      this.WGe.Refresh(0);
  }
  Djl() {
    this.EGt?.RefreshByData([
      { L8n: this.wjl, UVn: ComposeDefine_1.EXCHANGE_COUNT, K6n: !0 },
    ]),
      this.WGe?.SetUiActive(!0);
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.wjl,
    );
    this.WGe?.Refresh(
      MathUtils_1.MathUtils.GetFloatPointFloor(
        t / ComposeDefine_1.EXCHANGE_COUNT,
      ),
    );
  }
  xGt(t) {
    let i = !1,
      e = 0;
    t = t.filter(
      (t) =>
        t.L8n !== ComposeController_1.ComposeController.ComposeCoinId ||
        ((i = !0), (e = t.UVn), !1),
    );
    return [i, e, t];
  }
  jTi(t = !1) {
    let i = 0;
    switch (
      (this.Kti && (this.Rjl = !0),
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType)
    ) {
      case 1:
        i = this.Kti ? this.wHl(this.aTi) : this.PHl(this.aTi);
        var e = this.aTi[i];
        this.RefreshTips(e),
          (this.xuo =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              e.ConfigId,
            ).ItemId);
        break;
      case 2:
        i = this.Kti ? this.wHl(this.hTi) : this.PHl(this.hTi);
        e = this.hTi[i];
        this.RefreshTips(e),
          (this.xuo =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              e.ConfigId,
            ).ItemId);
        break;
      case 3:
        i = this.Kti ? this.wHl(this.lTi) : this.PHl(this.lTi);
        e = this.lTi[i];
        this.RefreshTips(e),
          (this.xuo =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              e.ConfigId,
            ).ItemId);
        break;
      case 4:
        i =
          0 <=
          (i = this.Kti
            ? this.Tjl.findIndex((t) => t.ConfigId === this.Kti)
            : this.Tjl.findIndex((t) => t.ConfigId === this.xuo))
            ? i
            : 0;
        e = this.Tjl[i];
        this.RefreshTips(e), (this.xuo = e.ConfigId);
    }
    this.BTi.DeselectCurrentGridProxy(),
      t && this.BTi.ScrollToGridIndex(i),
      this.BTi.SelectGridProxy(i);
  }
  wHl(t) {
    t = t.findIndex(
      (t) =>
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          t.ConfigId,
        )?.ItemId === this.Kti,
    );
    return 0 <= t ? t : 0;
  }
  PHl(t) {
    t = t.findIndex(
      (t) =>
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          t.ConfigId,
        )?.ItemId === this.xuo,
    );
    return 0 <= t ? t : 0;
  }
  RefreshTips(t, i = !0) {
    switch (
      (this.fGt &&
        this.fGt.ConfigId !== t.ConfigId &&
        (ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = 0),
      (this.fGt = t),
      (this.xjl = !1),
      this.fGt.MainType)
    ) {
      case 1:
        this.RefreshReagentProduction();
        break;
      case 2:
        this.RefreshStructure();
        break;
      case 3:
        this.RefreshPurification(i);
        break;
      case 4:
        this.RefreshExchange(i);
    }
    this.ekt(), this.AGt(), this.PGt(), this.Gjl(), this.dal(), (this.Rjl = !1);
  }
  ekt() {
    var t = ModelManager_1.ModelManager.ComposeModel;
    let i = !0,
      e = !0,
      s = !0,
      h = !0;
    4 !== this.fGt.MainType &&
      ((i = t.CheckComposeMaterialEnough(this.fGt.ConfigId)),
      (e = t.CheckUnlock(this.fGt)),
      (s = t.CheckCoinEnough(this.fGt.ConfigId)),
      (h = t.CheckLimitCount(this.fGt))),
      this.GetText(38).SetText(this.ikt(e, i, s, h)),
      this.GetItem(25).SetUIActive(!(e && i && h)),
      this.GetButton(24).RootUIComp.SetUIActive(e && i && h);
  }
  RefreshReagentProduction() {
    this.Wjl(), this.MTi(!0), this.MLi();
  }
  RefreshStructure() {
    this.Wjl(), this.MTi(!1), this.MLi();
  }
  RefreshPurification(t = !0) {
    this.Qjl(t),
      this.fGt.IsUnlock <= 0 && this.WGe.Refresh(0),
      this.MLi(),
      this.Ojl();
  }
  RefreshExchange(t = !0) {
    this.Qjl(t),
      this.fGt.IsUnlock <= 0 && this.WGe.Refresh(0),
      this.Hjl(),
      this.Ojl();
  }
  Qjl(t = !0) {
    this.GetItem(5)?.SetUIActive(!0), this.GetItem(9)?.SetUIActive(!1);
    var i =
        4 === this.fGt.MainType
          ? this.fGt.ConfigId
          : ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              this.fGt.ConfigId,
            )?.ItemId,
      i = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i);
    if ((this.GetText(6).SetText(i), t)) {
      var e = ModelManager_1.ModelManager.ComposeModel.GetSameGroupItem(
        this.fGt,
      );
      let i = 0;
      for (let t = 0; t < e.length; t++)
        if (this.fGt === e[t]) {
          i = t;
          break;
        }
      this.ovt?.ReloadView(e.length, e, i), (this.D8l = e);
    }
  }
  Wjl() {
    this.GetItem(9)?.SetUIActive(!0), this.GetItem(5)?.SetUIActive(!1);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        this.fGt.ConfigId,
      ),
      i = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(t.ItemId),
      i =
        (this.GetText(13).SetText(i),
        ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          t.ItemId,
        )),
      i =
        (LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(12),
          "ItemTipsHaveNum",
          i,
        ),
        ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId));
    i &&
      (this.SetTextureByPath(i.Icon, this.GetTexture(11)),
      (t = ConfigManager_1.ConfigManager.ItemConfig?.GetItemAttributeDesc(
        t.ItemId,
      )),
      this.GetText(15)?.SetText(t ?? ""),
      (t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        i.QualityId,
      ))) &&
      this.SetSpriteByPath(t.ComposeQualityBg, this.GetSprite(10), !1);
  }
  ikt(t, i, e, s) {
    return t
      ? i
        ? s
          ? ""
          : void 0 ===
              (t =
                ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime())
            ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                "LackMakeCountWithoutTime",
              )
            : StringUtils_1.StringUtils.Format(
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "LackMakeCount",
                ),
                t,
              )
        : ((i =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "LackMakeMaterial",
            )),
          e
            ? StringUtils_1.StringUtils.Format(
                i,
                MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                  "Material_Text",
                ),
              )
            : StringUtils_1.StringUtils.Format(
                i,
                ConfigManager_1.ConfigManager.ItemConfig.GetItemName(
                  ComposeController_1.ComposeController.ComposeCoinId,
                ),
              ))
      : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "GenericPrompt_Unlocked_TipsText",
        );
  }
  PGt() {
    var i = this.fGt;
    if (i.TotalMakeCountInLimitTime <= 0)
      this.WGe.ResetLimitMaxValue(), this.GetText(21).SetUIActive(!1);
    else {
      this.xjl = !0;
      var e = i.TotalMakeCountInLimitTime - i.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, e)),
        this.GetText(21).SetUIActive(!0);
      let t = e.toString();
      0 === e &&
        (t = StringUtils_1.StringUtils.Format(
          "<color=#c25757>{0}</color>",
          e.toString(),
        )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(21),
          "MakeLimit",
          t,
          i.TotalMakeCountInLimitTime,
        );
    }
  }
  Gjl() {
    if (4 === this.fGt.MainType)
      (this.xjl = !0),
        this.GetText(22)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(22),
          "ComposeExchangeTips",
        );
    else if (
      this.v5l &&
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
        this.fGt.ConfigId,
      )?.ItemId === this.v5l.ItemId
    ) {
      (this.xjl = !0), this.GetText(22)?.SetUIActive(!0);
      var i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          this.v5l.ItemId,
        ),
        e = this.v5l.Count;
      let t = "";
      (t =
        i < e
          ? StringUtils_1.StringUtils.Format(
              ComposeDefine_1.EXCHANGE_MATERIAL_NOT_ENOUGHT_TEXT_PATTERN_B,
              i.toString(),
            )
          : StringUtils_1.StringUtils.Format(
              ComposeDefine_1.EXCHANGE_MATERIAL_ENOUGHT_TEXT_PATTERN_B,
              i.toString(),
            )),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(22),
          "ComposeNeedTips",
          t,
          "" + e,
        );
    } else this.GetText(22)?.SetUIActive(!1);
  }
  dal() {
    this.GetItem(37).SetUIActive(this.xjl);
  }
  Ojl() {
    this.GetItem(39)?.SetUIActive(!0),
      this.GetItem(40)?.SetUIActive(!0),
      this.fGt?.ConfigId === this.D8l[0].ConfigId &&
        this.GetItem(39)?.SetUIActive(!1),
      this.fGt?.ConfigId === this.D8l[this.D8l.length - 1].ConfigId &&
        this.GetItem(40)?.SetUIActive(!1);
  }
  CQl() {
    let i = 0;
    for (let t = 0; t < this.D8l.length; t++)
      if (this.fGt === this.D8l[t]) {
        i = t;
        break;
      }
    this.ovt?.AttachToIndex(i);
  }
  B8l() {
    let t = 0;
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        t = this.G8l(this.aTi);
        break;
      case 3:
        t = this.G8l(this.lTi);
        break;
      case 2:
        t = this.G8l(this.hTi);
        break;
      case 4:
        t = this.G8l(this.Tjl);
    }
    this.BTi?.ScrollToGridIndex(t), this.BTi?.SelectGridProxy(t, !1);
    var i = this.BTi.UnsafeGetGridProxy(t).GetItemGridExtendToggle();
    UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForViewSameGroup(
      i.RootUIComp,
    );
  }
  G8l(i) {
    var t = i.indexOf(this.fGt);
    if (t < 0)
      for (let t = 0; t < i.length; t++)
        if (i[t].ConfigId === this.fGt.ConfigId) return t;
    return t;
  }
  Pjl() {
    this.GetItem(26)?.SetUIActive(!0),
      this.Ivt?.SetCloseBtnShowState(!1),
      this.EGt?.GetScrollItemByIndex(0)?.SetComposeChangeAble(!1),
      this.kjl(),
      this.SPe?.PlayLevelSequenceByName("PopupShow"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FinishGuideStepByEvent,
        "ComposeCarryOnView",
      );
  }
  kjl() {
    var t;
    this.GetItem(26).bIsUIActive &&
      ((t =
        ModelManager_1.ModelManager.ComposeModel.GetExchangeMaterialListByGroupId(
          this.fGt.ExchangeGroupId,
        ).filter((t) => t.L8n !== this.fGt.ConfigId)).sort((t, i) =>
        t.UVn !== i.UVn ? i.UVn - t.UVn : t.L8n - i.UVn,
      ),
      this.bjl?.RefreshByData(t));
  }
  NNt() {
    var t = this.LNt();
    if (t)
      for (const i of t)
        if (
          0 < i.ExistEndTime &&
          !TimeUtil_1.TimeUtil.IsInTimeSpan(i.ExistStartTime, i.ExistEndTime)
        )
          return !0;
    return !1;
  }
  bNt() {
    return (
      ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTimeValue() <= 0
    );
  }
  Fjl() {
    0 < this.fGt.ExistEndTime && (this.AGt(), this.dal());
  }
}
exports.ComposeCarryOnView = ComposeCarryOnView;
//# sourceMappingURL=ComposeCarryOnView.js.map
