"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaMainView = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonTextItem_1 = require("../../Common/Button/CommonTextItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  CdnServerDebugConfig_1 = require("../../Debug/CdnServerDebugConfig"),
  CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData"),
  RoleController_1 = require("../../RoleUi/RoleController"),
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
class GachaMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lHt = new Map()),
      (this._Ht = void 0),
      (this.uHt = void 0),
      (this.cHt = void 0),
      (this.mHt = void 0),
      (this.lqe = void 0),
      (this.dHt = void 0),
      (this.CHt = void 0),
      (this.gHt = void 0),
      (this.Cpt = !1),
      (this.TDe = void 0),
      (this.fHt = new Queue_1.Queue()),
      (this.pHt = !1),
      (this.ift = () => {
        var e = this.vHt;
        if (e) {
          var i =
              ModelManager_1.ModelManager.GachaModel.GetGachaPoolUrlPrefix(),
            t = ModelManager_1.ModelManager.GachaModel.GetServerArea(),
            a = new StringBuilder_1.StringBuilder(),
            r = this.MHt.UrlList;
          if (r && 0 !== r.length) {
            for (let e = 0; e < r.length; e++)
              a.Append(r[e]), e < r.length - 1 && a.Append(",");
            (t =
              `{0}/aki/gacha/index.html#/detail?svr_id={1}&player_id=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()}&lang=${LanguageSystem_1.LanguageSystem.PackageLanguage}&svr_area=${t}&gacha_id=${e?.Id}&resources_id=${e?.ResourcesId}&gacha_pool_id=${this.SHt}&path=` +
              encodeURIComponent(a.ToString())),
              (e =
                CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetGachaDetailDebugUrl(
                  t,
                  i,
                  ModelManager_1.ModelManager.LoginModel.GetServerId(),
                ));
            ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
              ? ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView(
                  "",
                  e,
                  !0,
                  !0,
                )
              : ModelManager_1.ModelManager.MailModel.OpenWebBrowser(e);
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Gacha",
                44,
                "GachaMainView: 卡池详情链接为空",
                ["GachaId", this.vHt.Id],
                ["GachaPoolId", this.SHt],
                ["Language", LanguageSystem_1.LanguageSystem.PackageLanguage],
              );
        }
      }),
      (this.EHt = () => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(
          4,
          1,
        );
      }),
      (this.yHt = () => {
        var e, i, t;
        this.vHt &&
          ((i = this.vHt.GroupId),
          (e =
            ModelManager_1.ModelManager.GachaModel.GetGachaRecordUrlPrefix()),
          (t = ModelManager_1.ModelManager.GachaModel.GetServerArea()),
          (i =
            "{0}/aki/gacha/index.html#/record?" +
            `svr_id={1}&player_id=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()}&lang=${LanguageSystem_1.LanguageSystem.PackageLanguage}&gacha_id=${this.vHt?.Id}&gacha_type=${i.toString()}&svr_area=${t}&record_id=` +
            ModelManager_1.ModelManager.GachaModel.RecordId +
            "&resources_id=" +
            this.vHt?.ResourcesId),
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
      (this.MVe = () => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      (this.IHt = () => {
        var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(
          this.SHt,
        );
        if (e) {
          var i = e.Type,
            t = e.PreviewIdList;
          switch (i) {
            case 1:
            case 2:
            case 4:
            case 6:
              var a = [];
              for (const _ of t) {
                var r =
                  ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(
                    _,
                  );
                a.push(r.TrialId);
              }
              RoleController_1.RoleController.OpenRoleMainView(1, 0, a);
              break;
            case 5:
            case 3:
              var s = [];
              for (const l of t) {
                var o =
                    ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(
                      l,
                    ),
                  h = new WeaponTrialData_1.WeaponTrialData();
                h.SetTrialId(o.TrialId), s.push(h);
              }
              var n = { WeaponDataList: s, SelectedIndex: 0 };
              UiManager_1.UiManager.OpenView("WeaponPreviewView", n);
          }
        }
      }),
      (this.THt = () => {
        var e = this.vHt;
        e && GachaController_1.GachaController.OpenGachaSelectionView(e);
      }),
      (this.RefreshLeftTime = () => {
        var e = this.vHt;
        e &&
          0 !== (e = e.GetPoolEndTimeByPoolInfo(this.MHt)) &&
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
      (this.z7t = () => {
        this.LHt();
      }),
      (this.DHt = () => {
        var e;
        this.RHt
          ? ((e = new OperationParam(1)), this.fHt.Push(e))
          : (this.UHt(),
            this.AHt().finally(() => {
              this.O0t();
            }));
      }),
      (this.PHt = () => {
        var e,
          i,
          t,
          a,
          r = this._Ht.GetGenericLayout().GetSelectedGridIndex();
        !this.uHt ||
          r < 0 ||
          r >= this.uHt.length ||
          ((e = this.uHt[r]),
          (i = this._Ht?.GetScrollItemByIndex(r)),
          e &&
            i &&
            (t = (a = e.GachaInfo).UsePoolId) !== e.PoolInfo.Id &&
            (a = a.GetPoolInfo(t)) &&
            ((e.PoolInfo = a), i.Refresh(e, !0, r), this.DHt(), this.xHt()));
      }),
      (this.wHt = () => {
        var e = new GachaTagItem_1.GachaTagItem();
        return (
          (e.SelectCallback = this.BHt), (e.CanExecuteChange = this.Eft), e
        );
      }),
      (this.bHt = () => {
        return new CommonTextItem_1.CommonTextItem();
      }),
      (this.qHt = () => {
        return new GachaSmallItemGrid_1.GachaSmallItemGrid();
      }),
      (this.BHt = (e) => {
        var i;
        this.RHt
          ? ((i = new OperationParam(2, e)), this.fHt.Push(i))
          : (this.UHt(),
            this.GHt(e).finally(() => {
              this.O0t();
            }));
      }),
      (this.GHt = async (e) => {
        var i = this._Ht.GetGenericLayout().GetSelectedGridIndex(),
          t =
            (this._Ht.GetGenericLayout().SelectGridProxy(e),
            ModelManager_1.ModelManager.GachaModel.RecordGachaInfo(this.vHt)),
          t =
            (t && this._Ht.GetScrollItemByIndex(e)?.RefreshRedDot(),
            await this.AHt(),
            this.vHt);
        t &&
          0 === t.UsePoolId &&
          GachaController_1.GachaController.OpenGachaSelectionView(t),
          0 <= i && this.xHt();
      }),
      (this.Eft = (e) =>
        e !== this._Ht?.GetGenericLayout()?.GetSelectedGridIndex()),
      (this.NHt = () => {
        var e = this.vHt;
        ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByItemId(
          e.ItemId,
        );
      }),
      (this.OHt = () => {
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
  static async kHt(e, i) {
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
  get vHt() {
    return this.FHt.GachaInfo;
  }
  get SHt() {
    return this.FHt.PoolInfo.Id;
  }
  get MHt() {
    return this.FHt.PoolInfo;
  }
  get FHt() {
    var e = this._Ht.GetGenericLayout().GetSelectedGridIndex();
    if (!(!this.uHt || e < 0 || e >= this.uHt.length)) return this.uHt[e];
  }
  get RHt() {
    return this.pHt;
  }
  UHt() {
    this.pHt = !0;
  }
  O0t() {
    if (((this.pHt = !1), 0 !== this.fHt.Size)) {
      var e = this.fHt.Pop();
      if (e)
        switch (e.OperationType) {
          case 0:
            this.LHt();
            break;
          case 1:
            this.DHt();
            break;
          case 2:
            this.BHt(e?.Param);
        }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ItemExChangeResponse,
      this.DHt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshGachaMainView,
        this.z7t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GachaPoolSelectResponse,
        this.PHt,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ItemExChangeResponse,
      this.DHt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshGachaMainView,
        this.z7t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GachaPoolSelectResponse,
        this.PHt,
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
    ]),
      (this.BtnBindInfo = [
        [3, this.ift],
        [1, this.EHt],
        [4, this.yHt],
        [2, this.IHt],
        [18, this.THt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Cpt = !0),
      (this.mHt = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(17),
        this.qHt,
      )),
      (this.dHt = new GachaButton_1.GachaButton(GachaDefine_1.GACHA_ONE)),
      (this.CHt = new GachaButton_1.GachaButton(GachaDefine_1.GACHA_TEN)),
      await Promise.all([
        this.dHt.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
        this.CHt.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      ]),
      (this.cHt = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(14),
        this.bHt,
      )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.MVe),
      (this._Ht = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(8),
        this.wHt,
      )),
      await this.VHt();
  }
  async OnPlayingStartSequenceAsync() {
    await this.gHt?.PlayStartSeqAsync();
  }
  OnBeforeShow() {
    this.Cpt || GachaController_1.GachaController.GachaInfoRequest(!1),
      (this.Cpt = !1);
  }
  async AHt() {
    UiLayer_1.UiLayer.SetShowMaskLayer("GachaMainViewRefresh", !0),
      await this.vIt(),
      await this.HHt(),
      this.jHt(),
      this.WHt(),
      this.KHt(),
      UiLayer_1.UiLayer.SetShowMaskLayer("GachaMainViewRefresh", !1);
  }
  async vIt() {
    var e;
    this.vHt &&
      (await this.lqe.SetCurrencyItemList([
        ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency(),
        this.vHt.ItemId,
      ]),
      (e = this.lqe.GetCurrencyItemList())) &&
      (e[0]?.SetButtonFunction(this.OHt),
      (e = e[1]).SetButtonFunction(this.NHt),
      e.SetButtonActive(!1));
  }
  jHt() {
    if (this.FHt) {
      let e = !1;
      for (const t of this.vHt.GachaConsumes)
        if (t.fRs === this.dHt.Times) {
          this.dHt.Refresh(this.FHt, t.vRs), (e = !0);
          break;
        }
      let i = !1;
      for (const a of this.vHt.GachaConsumes)
        if (a.fRs === this.CHt.Times) {
          this.CHt.Refresh(this.FHt, a.vRs), (i = !0);
          break;
        }
      this.dHt.GetRootItem().SetUIActive(e),
        this.CHt.GetRootItem().SetUIActive(i);
    }
  }
  KHt() {
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
      0 < this.vHt.DailyLimitTimes &&
        ((e = this.vHt.DailyLimitTimes),
        (t = this.vHt.TodayTimes),
        (t = new LguiUtil_1.TableTextArgNew(
          GachaDefine_1.POOL_TODAY_REST_COUNT,
          e - t,
          e,
        )),
        i.push(t)),
      0 < this.vHt.TotalLimitTimes &&
        ((e = this.vHt.TotalLimitTimes),
        (t = this.vHt.TotalTimes),
        (t = new LguiUtil_1.TableTextArgNew(
          GachaDefine_1.POOL_TOTAL_REST_COUNT,
          e - t,
          e,
        )),
        i.push(t)),
      this.cHt.RefreshByData(i);
  }
  async HHt() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(
      this.SHt,
    );
    let i = this.lHt.get(e);
    if (!i) {
      if (!(i = await GachaMainView.kHt(this.GetItem(7), e))) return;
      this.lHt.set(e, i);
    }
    this.gHt !== i && (this.gHt?.SetActive(!1), (this.gHt = i).SetActive(!0)),
      i.Update(this.FHt);
  }
  xHt() {
    this.gHt?.SetActive(!0),
      this.UiViewSequence.HasSequenceNameInPlaying("Switch")
        ? this.UiViewSequence.ReplaySequence("Switch")
        : this.UiViewSequence.PlaySequence("Switch"),
      this.gHt?.PlaySwitchSeq();
  }
  WHt() {
    var e,
      i,
      t,
      a = this.vHt;
    a &&
      (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(
        this.SHt,
      )) &&
      (i = e.Type) &&
      (t =
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i)) &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.TypeText),
      (t = a.GetPoolEndTimeByPoolInfo(this.MHt)),
      this.GetItem(11).SetUIActive(0 < t),
      0 < t
        ? this.RefreshLeftTime()
        : this.TDe &&
          (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe),
          (this.TDe = void 0)),
      (t = e.UpList),
      (i = ModelManager_1.ModelManager.GachaModel.IsRolePool(i)),
      t && 0 < t.length
        ? (this.GetItem(15)?.SetUIActive(!0),
          this.mHt?.RefreshByData(t),
          (t = i ? "Text_GachaUpList1_Text" : "Text_GachaUpList2_Text"),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), t))
        : this.GetItem(15)?.SetUIActive(!1),
      (t = a.GetValidPoolList()) && 1 < t.length
        ? this.GetButton(18)?.RootUIComp.SetUIActive(!0)
        : this.GetButton(18)?.RootUIComp.SetUIActive(!1),
      this.SetTextureByPath(e.UnderBgTexturePath, this.GetTexture(19)),
      (a = UE.Color.FromHex(e.ThemeColor)),
      this.GetTexture(20)?.SetColor(a),
      (t = this.GetTexture(21)).SetUIActive(i),
      i && t.SetColor(a),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.SummaryTitle),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), e.SummaryDescribe));
  }
  LHt() {
    var e;
    this.RHt
      ? ((e = new OperationParam(0)), this.fHt.Push(e))
      : (this.UHt(),
        this.VHt().finally(() => {
          this.O0t();
        }));
  }
  async VHt() {
    let e = 0,
      i = 0;
    var t = this.FHt;
    t && (i = t.GachaInfo.Id),
      (this.uHt = ModelManager_1.ModelManager.GachaModel.GetValidGachaList()),
      this.uHt &&
        0 !== this.uHt.length &&
        (0 <= (t = this.uHt.findIndex((e) => e.GachaInfo.Id === i)) &&
          t < this.uHt.length &&
          (e = t),
        await this._Ht.RefreshByDataAsync(this.uHt),
        await this.GHt(e));
  }
  OnAfterHide() {
    this.TDe &&
      (TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  OnBeforeDestroy() {
    this.lqe?.Destroy();
  }
  SelectGachaTagById(i) {
    var e = this.uHt.findIndex((e) => e.GachaInfo.Id === i);
    return 0 <= e && e < this.uHt.length && (this.BHt(e), !0);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = Number(e[0]);
    if (0 !== i) {
      var t = this.SelectGachaTagById(i);
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Guide", 17, "抽卡聚焦引导", ["配置Id", i]),
        t && this.dHt)
      )
        return [(i = this.dHt.GetRootItem()), i];
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
