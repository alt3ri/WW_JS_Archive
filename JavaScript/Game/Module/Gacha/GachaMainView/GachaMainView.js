"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaMainView = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonTextItem_1 = require("../../Common/Button/CommonTextItem"),
  ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  CdnServerDebugConfig_1 = require("../../Debug/CdnServerDebugConfig"),
  CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
  GachaController_1 = require("../GachaController"),
  GachaDefine_1 = require("../GachaDefine"),
  CommonRoleGachaPoolItem_1 = require("./CommonRoleGachaPoolItem"),
  GachaButton_1 = require("./GachaButton"),
  GachaSmallItemGrid_1 = require("./GachaSmallItemGrid"),
  GachaTagItem_1 = require("./GachaTagItem"),
  UpRoleGachaPoolItem_1 = require("./UpRoleGachaPoolItem"),
  UpWeaponGachaPoolItem_1 = require("./UpWeaponGachaPoolItem");
class OperationParam {
  constructor(e, i) {
    (this.OperationType = e), (this.Param = i);
  }
}
class GachaMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.ljt = new Map()),
      (this._jt = void 0),
      (this.ujt = void 0),
      (this.cjt = void 0),
      (this.mjt = void 0),
      (this.lqe = void 0),
      (this.djt = void 0),
      (this.Cjt = void 0),
      (this.gjt = void 0),
      (this.Dvt = !1),
      (this.MMa = 0),
      (this.TDe = void 0),
      (this.fjt = new Queue_1.Queue()),
      (this.pjt = !1),
      (this._Mo = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(68);
        e.FunctionMap.set(0, () => {
          GachaController_1.GachaController.GachaInfoRequest(!1);
        }),
          ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
      }),
      (this.dpt = () => {
        this.vjt
          ? 0 === this.vjt.UsePoolId
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "SelfGacha_NoDetail_Tips",
              )
            : UiManager_1.UiManager.OpenView(
                "GachaPoolDetailView",
                this.vjt.GetPoolInfo(this.vjt.UsePoolId),
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Gacha", 35, "OnHelpBtnClick CurGachaInfo is null");
      }),
      (this.Sjt = () => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
          4,
          1,
        );
      }),
      (this.yjt = () => {
        var e, i, t;
        this.vjt &&
          ((i = this.vjt.GroupId),
          (e =
            ModelManager_1.ModelManager.GachaModel.GetGachaRecordUrlPrefix()),
          (t = ModelManager_1.ModelManager.GachaModel.GetServerArea()),
          (i =
            "{0}/aki/gacha/index.html#/record?" +
            `svr_id={1}&player_id=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()}&lang=${LanguageSystem_1.LanguageSystem.PackageLanguage}&gacha_id=${this.vjt?.Id}&gacha_type=${i.toString()}&svr_area=${t}&record_id=` +
            ModelManager_1.ModelManager.GachaModel.RecordId +
            "&resources_id=" +
            this.vjt?.ResourcesId),
          (t =
            CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetGachaRecordDebugUrl(
              i,
              e,
              ModelManager_1.ModelManager.LoginModel.GetServerId(),
            )),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
            ? ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView(
                "",
                t,
                !0,
                !0,
              )
            : ModelManager_1.ModelManager.MailModel.OpenWebBrowser(t));
      }),
      (this.B6e = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.Ijt = () => {
        var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(
          this.Ejt,
        );
        if (e) {
          var e = e.Type,
            i = this.Mjt.PreviewIdList;
          switch (e) {
            case 1:
            case 2:
            case 4:
            case 6:
              var t = [];
              for (const n of i) {
                var a =
                  ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(
                    n,
                  );
                t.push(a.TrialId);
              }
              RoleController_1.RoleController.OpenRoleMainView(1, 0, t);
              break;
            case 5:
            case 3:
              var r = [];
              for (const _ of i) {
                var s =
                    ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(
                      _,
                    ),
                  o = new WeaponTrialData_1.WeaponTrialData();
                o.SetTrialId(s.TrialId), r.push(o);
              }
              var h = { WeaponDataList: r, SelectedIndex: 0 };
              UiManager_1.UiManager.OpenView("WeaponPreviewView", h);
          }
        }
      }),
      (this.Tjt = () => {
        var e = this.vjt;
        e && GachaController_1.GachaController.OpenGachaSelectionView(e);
      }),
      (this.RefreshLeftTime = () => {
        var e = this.vjt;
        e &&
          0 !== (e = e.GetPoolEndTimeByPoolInfo(this.Mjt)) &&
          ((e = e - TimeUtil_1.TimeUtil.GetServerTime()) <= 0
            ? GachaController_1.GachaController.GachaInfoRequest(!1)
            : ((e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e)),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(12),
                "Text_GachaRemainingTime_Text",
                e.CountDownText,
              ),
              0 < (e = e.RemainingTime) &&
                ((e = e),
                (this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(
                  this.RefreshLeftTime,
                  1e3 * e,
                )))));
      }),
      (this.zHt = () => {
        this.Ljt();
      }),
      (this.Djt = () => {
        var e;
        this.Rjt
          ? ((e = new OperationParam(1)), this.fjt.Push(e))
          : (this.Ujt(),
            this.Ajt().finally(() => {
              this.Jft();
            }));
      }),
      (this.Pjt = () => {
        var e,
          i,
          t,
          a,
          r = this._jt.GetGenericLayout().GetSelectedGridIndex();
        !this.ujt ||
          r < 0 ||
          r >= this.ujt.length ||
          ((e = this.ujt[r]),
          (i = this._jt?.GetScrollItemByIndex(r)),
          e &&
            i &&
            ((t = (a = e.GachaInfo).UsePoolId), (a = a.GetPoolInfo(t))) &&
            ((e.PoolInfo = a), i.Refresh(e, !0, r), this.Djt(), this.xjt()));
      }),
      (this.wjt = () => {
        var e = new GachaTagItem_1.GachaTagItem();
        return (
          (e.SelectCallback = this.Bjt), (e.CanExecuteChange = this.Bpt), e
        );
      }),
      (this.bjt = () => {
        return new CommonTextItem_1.CommonTextItem();
      }),
      (this.qjt = () => {
        return new GachaSmallItemGrid_1.GachaSmallItemGrid();
      }),
      (this.Bjt = (e) => {
        var i;
        this.Rjt
          ? ((i = new OperationParam(2, e)), this.fjt.Push(i))
          : (this.Ujt(),
            this.Gjt(e).finally(() => {
              this.Jft();
            }));
      }),
      (this.Gjt = async (e) => {
        var i = this._jt.GetGenericLayout().GetSelectedGridIndex(),
          t =
            (this._jt.GetGenericLayout().SelectGridProxy(e),
            ModelManager_1.ModelManager.GachaModel.RecordGachaInfo(this.vjt));
        t && this._jt.GetScrollItemByIndex(e)?.RefreshRedDot(),
          await this.Ajt(),
          0 <= i && this.xjt();
      }),
      (this.Bpt = (e) =>
        e !== this._jt?.GetGenericLayout()?.GetSelectedGridIndex()),
      (this.Njt = () => {
        var e = this.vjt;
        ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByItemId(
          e.ItemId,
        );
      }),
      (this.Ojt = () => {
        var e = ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency();
        const r = new CommonExchangeData_1.CommonExchangeData();
        r.InitByItemId(e),
          (r.ConfirmNoClose = !0),
          (r.ConfirmCallBack = (e, i) => {
            var t,
              a =
                ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(
                  e,
                  0,
                  i,
                );
            a && i
              ? ((t =
                  ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                    r.GetSrcItemId(),
                  )),
                (a = a.ConsumeCount - t) <= 0
                  ? (ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(
                      e,
                      i,
                    ),
                    UiManager_1.UiManager.CloseView("CommonExchangeView"))
                  : ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                      60,
                    )).SetTextArgs(a.toString(), r.GetSrcName()),
                    t.FunctionMap.set(2, () => {
                      UiManager_1.UiManager.CloseView("CommonExchangeView"),
                        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge();
                    }),
                    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                      t,
                    )))
              : UiManager_1.UiManager.CloseView("CommonExchangeView");
          }),
          ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByData(
            r,
          );
      });
  }
  static async kjt(e, i) {
    let t = void 0;
    switch (i) {
      case 1:
        await (t = new CommonRoleGachaPoolItem_1.CommonRoleGachaPoolItem(
          i,
        )).CreateThenShowByResourceIdAsync("UiItem_NewPlayerGachaPool", e);
        break;
      case 4:
        await (t = new CommonRoleGachaPoolItem_1.CommonRoleGachaPoolItem(
          i,
        )).CreateThenShowByResourceIdAsync("UiItem_BaseGachaPool", e);
        break;
      case 2:
        await (t = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(
          i,
        )).CreateThenShowByResourceIdAsync("UiItem_RoleUpGachaPool", e);
        break;
      case 5:
      case 3:
        await (t = new UpWeaponGachaPoolItem_1.UpWeaponGachaPoolItem(
          i,
        )).CreateThenShowByResourceIdAsync("UiItem_WeaponGachaPool", e);
        break;
      case 6:
        await (t = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(
          i,
        )).CreateThenShowByResourceIdAsync("UiItem_LuckdrawPixF", e);
    }
    return t;
  }
  get vjt() {
    return this.Fjt.GachaInfo;
  }
  get Ejt() {
    return this.Fjt.PoolInfo.Id;
  }
  get Mjt() {
    return this.Fjt.PoolInfo;
  }
  get Fjt() {
    var e = this._jt.GetGenericLayout().GetSelectedGridIndex();
    if (!(!this.ujt || e < 0 || e >= this.ujt.length)) return this.ujt[e];
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = !0;
  }
  Jft() {
    if (((this.pjt = !1), 0 !== this.fjt.Size)) {
      var e = this.fjt.Pop();
      if (e)
        switch (e.OperationType) {
          case 0:
            this.Ljt();
            break;
          case 1:
            this.Djt();
            break;
          case 2:
            this.Bjt(e?.Param);
        }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ItemExChangeResponse,
      this.Djt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshGachaMainView,
        this.zHt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GachaPoolSelectResponse,
        this.Pjt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ItemExChangeResponse,
      this.Djt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshGachaMainView,
        this.zHt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GachaPoolSelectResponse,
        this.Pjt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIText],
      [14, UE.UIVerticalLayout],
      [15, UE.UIItem],
      [16, UE.UIText],
      [17, UE.UIHorizontalLayout],
      [18, UE.UIButtonComponent],
      [19, UE.UITexture],
      [20, UE.UITexture],
      [21, UE.UITexture],
      [22, UE.UIItem],
      [23, UE.UIButtonComponent],
      [24, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.dpt],
        [1, this.Sjt],
        [4, this.yjt],
        [2, this.Ijt],
        [18, this.Tjt],
        [23, this.Tjt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Dvt = !0),
      (this.mjt = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(17),
        this.qjt,
      )),
      (this.djt = new GachaButton_1.GachaButton(GachaDefine_1.GACHA_ONE)),
      (this.Cjt = new GachaButton_1.GachaButton(GachaDefine_1.GACHA_TEN)),
      await Promise.all([
        this.djt.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
        this.Cjt.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      ]),
      (this.cjt = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(14),
        this.bjt,
      )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.B6e),
      (this._jt = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(8),
        this.wjt,
      )),
      await this.Vjt(),
      (this.MMa = Time_1.Time.ServerTimeStamp);
  }
  async OnPlayingStartSequenceAsync() {
    await this.gjt?.PlayStartSeqAsync();
  }
  OnBeforeShow() {
    this.Dvt || GachaController_1.GachaController.GachaInfoRequest(!1),
      (this.Dvt = !1);
  }
  OnTick(e) {
    Time_1.Time.ServerTimeStamp - this.MMa >=
      5 *
        CommonDefine_1.SECOND_PER_MINUTE *
        CommonDefine_1.MILLIONSECOND_PER_SECOND &&
      ((this.MMa = Time_1.Time.ServerTimeStamp),
      GachaController_1.GachaController.GachaInfoRequest(!1));
  }
  async Ajt() {
    UiLayer_1.UiLayer.SetShowMaskLayer("GachaMainViewRefresh", !0),
      await this.ITt(),
      await this.Hjt(),
      this.jjt(),
      this.Wjt(),
      this.Kjt(),
      UiLayer_1.UiLayer.SetShowMaskLayer("GachaMainViewRefresh", !1);
  }
  async ITt() {
    var e;
    this.vjt &&
      (await this.lqe.SetCurrencyItemList([
        ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency(),
        this.vjt.ItemId,
      ]),
      (e = this.lqe.GetCurrencyItemList())) &&
      (e[0]?.SetButtonFunction(this.Ojt),
      (e = e[1]).SetButtonFunction(this.Njt),
      e.SetButtonActive(!1));
  }
  jjt() {
    if (this.Fjt) {
      let e = !1;
      for (const a of this.vjt.GachaConsumes)
        if (a.$Us === this.djt.Times) {
          this.djt.Refresh(this.Fjt, a.HUs), (e = !0);
          break;
        }
      let i = !1;
      for (const r of this.vjt.GachaConsumes)
        if (r.$Us === this.Cjt.Times) {
          this.Cjt.Refresh(this.Fjt, r.HUs), (i = !0);
          break;
        }
      this.djt.GetRootItem().SetUIActive(e && 0 !== this.vjt.UsePoolId),
        this.Cjt.GetRootItem().SetUIActive(i && 0 !== this.vjt.UsePoolId),
        this.GetButton(23)?.RootUIComp.SetUIActive(0 === this.vjt.UsePoolId),
        this.GetItem(22)?.SetUIActive(0 === this.vjt.UsePoolId);
      var t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(
        this.Ejt,
      );
      t &&
        (t = t.Type) &&
        (t =
          ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(
            t,
          )) &&
        !StringUtils_1.StringUtils.IsBlank(t.GachaButtonTip) &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(24), t.GachaButtonTip);
    }
  }
  Kjt() {
    var e,
      i = [],
      t = ModelManager_1.ModelManager.GachaModel.TodayResultCount;
    0 <= t &&
      ((e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "gacha_daily_total_limit_times",
      )),
      (t = new LguiUtil_1.TableTextArgNew(
        GachaDefine_1.TOTAL_REST_COUNT,
        t,
        e,
      )),
      i.push(t)),
      0 < this.vjt.DailyLimitTimes &&
        ((e = this.vjt.DailyLimitTimes),
        (t = this.vjt.TodayTimes),
        (t = new LguiUtil_1.TableTextArgNew(
          GachaDefine_1.POOL_TODAY_REST_COUNT,
          e - t,
          e,
        )),
        i.push(t)),
      0 < this.vjt.TotalLimitTimes &&
        ((e = this.vjt.TotalLimitTimes),
        (t = this.vjt.TotalTimes),
        (t = new LguiUtil_1.TableTextArgNew(
          GachaDefine_1.POOL_TOTAL_REST_COUNT,
          e - t,
          e,
        )),
        i.push(t)),
      this.cjt.RefreshByData(i);
  }
  async Hjt() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(
      this.Ejt,
    );
    let i = this.ljt.get(e);
    if (!i) {
      if (!(i = await GachaMainView.kjt(this.GetItem(7), e))) return;
      this.ljt.set(e, i);
    }
    this.gjt !== i && (this.gjt?.SetActive(!1), (this.gjt = i).SetActive(!0)),
      i.Update(this.Fjt);
  }
  xjt() {
    this.gjt?.SetActive(!0),
      this.UiViewSequence.HasSequenceNameInPlaying("Switch")
        ? this.UiViewSequence.ReplaySequence("Switch")
        : this.UiViewSequence.PlaySequence("Switch"),
      this.gjt?.PlaySwitchSeq();
  }
  Wjt() {
    var e,
      i,
      t,
      a = this.vjt;
    a &&
      this.Mjt &&
      (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(
        this.Ejt,
      )) &&
      (i = this.Mjt.UiType) &&
      (t =
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i)) &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.TypeText),
      (t = a.GetPoolEndTimeByPoolInfo(this.Mjt)),
      this.GetItem(11).SetUIActive(0 < t),
      0 < t
        ? this.RefreshLeftTime()
        : this.TDe &&
          (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe),
          (this.TDe = void 0)),
      (t = this.Mjt.UpList),
      (i = ModelManager_1.ModelManager.GachaModel.IsRolePool(i)),
      t && 0 < t.length
        ? (this.GetItem(15)?.SetUIActive(!0),
          this.mjt?.RefreshByData(t),
          (t = i ? "Text_GachaUpList1_Text" : "Text_GachaUpList2_Text"),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), t))
        : this.GetItem(15)?.SetUIActive(!1),
      (t = a.GetValidPoolList()) && 1 < t.length && 0 !== a.UsePoolId
        ? this.GetButton(18)?.RootUIComp.SetUIActive(!0)
        : this.GetButton(18)?.RootUIComp.SetUIActive(!1),
      this.SetTextureByPath(e.UnderBgTexturePath, this.GetTexture(19)),
      (t = UE.Color.FromHex(this.Mjt.ThemeColor)),
      this.GetTexture(20)?.SetColor(t),
      (a = this.GetTexture(21)).SetUIActive(i),
      i && a.SetColor(t),
      this.GetText(10).SetText(this.Mjt.Title),
      this.GetText(13).SetText(this.Mjt.Description));
  }
  Ljt() {
    var e;
    this.Rjt
      ? ((e = new OperationParam(0)), this.fjt.Push(e))
      : (this.Ujt(),
        this.Vjt().finally(() => {
          this.Jft();
        }));
  }
  async Vjt() {
    let e = 0,
      i = 0;
    var t = this.Fjt;
    t ? (i = t.GachaInfo.Id) : this.Dvt && (i = this.OpenParam),
      (this.ujt = ModelManager_1.ModelManager.GachaModel.GetValidGachaList()),
      this.ujt &&
        0 !== this.ujt.length &&
        (0 <= (t = this.ujt.findIndex((e) => e.GachaInfo.Id === i)) &&
          t < this.ujt.length &&
          (e = t),
        await this._jt.RefreshByDataAsync(this.ujt),
        await this.Gjt(e));
  }
  OnAfterHide() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  OnBeforeDestroy() {
    this.lqe?.Destroy();
  }
  SelectGachaTagById(i) {
    var e = this.ujt.findIndex((e) => e.GachaInfo.Id === i);
    return 0 <= e && e < this.ujt.length && (this.Bjt(e), !0);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = Number(e[0]);
    if (0 !== i) {
      var t = this.SelectGachaTagById(i);
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Guide", 17, "抽卡聚焦引导", ["配置Id", i]),
        t && this.djt)
      )
        return [(i = this.djt.GetRootItem()), i];
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.GachaMainView = GachaMainView;
//# sourceMappingURL=GachaMainView.js.map
