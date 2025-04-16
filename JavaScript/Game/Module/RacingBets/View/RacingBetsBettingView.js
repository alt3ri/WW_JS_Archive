"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsBettingView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem"),
  RacingBetsDangoOddsItem_1 = require("./Item/RacingBetsDangoOddsItem"),
  RacingBetsGearItem_1 = require("./Item/RacingBetsGearItem");
class RacingBetsBettingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Hg1 = !0),
      (this.YPc = void 0),
      (this.zPc = void 0),
      (this.JPc = void 0),
      (this.ZPc = void 0),
      (this.FPc = []),
      (this.exc = []),
      (this.txc = []),
      (this.ixc = void 0),
      (this.rxc = void 0),
      (this.oxc = void 0),
      (this.nxc = void 0),
      (this.A3o = void 0),
      (this.sxc = void 0),
      (this.axc = void 0),
      (this.hxc = () => {
        var i = new RacingBetsGearItem_1.RacingBetsGearItem();
        return i.BindClickGearItemCallBack(this.lxc), i;
      }),
      (this._xc = () => {
        var i = new RacingBetsDangoOddsItem_1.RacingBetsDangoOddsItem();
        return i.BindClickGearItemCallBack(this.cxc), i;
      }),
      (this.lxc = (t) => {
        this.zPc = t;
        var i = this.txc.findIndex((i) => t === i);
        this.sxc.SelectGridProxy(i), this.uxc(this.ZPc, this.YPc, this.zPc);
      }),
      (this.cxc = (i) => {
        this.YPc = i;
        var t = this.FPc.findIndex((i) => i === this.YPc);
        this.axc.SelectGridProxy(t),
          this.Hqe(this.ZPc, i, this.zPc),
          this.dxc(this.exc[t]),
          UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
            this.YPc.DangoCamera,
          );
      }),
      (this.lyt = () => {
        this.CloseMe();
      }),
      (this.mxc = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(297);
        i.FunctionMap.set(2, () => {
          var i =
              ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(),
            t = i.GetBetCostCount(this.zPc);
          RacingBetsController_1.RacingBetsController.RacingBetsGearRequest(
            i.Id,
            this.ZPc,
            this.YPc.DangoId,
            this.zPc.Id,
            t,
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.fxc = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(298);
        i.FunctionMap.set(2, () => {
          var i =
            ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
          RacingBetsController_1.RacingBetsController.RacingBetsGearRefundRequest(
            i.Id,
            this.ZPc,
            this.ZPc.BetDangoId,
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.gxc = () => {
        this.Hqe(this.ZPc, this.YPc, this.zPc);
      }),
      (this.YC1 = (i, t) => {
        this.Hqe(this.ZPc, this.YPc, this.zPc);
        var e = DangoManager_1.DangoManager.GetDangoData(this.YPc.DangoId);
        t
          ? (this.JPc?.SetState(1, 1),
            AudioSystem_1.AudioSystem.PostEvent(e.DangoConfig.CheerAudio))
          : i === this.YPc.DangoId &&
            (this.JPc?.SetState(1, 4),
            AudioSystem_1.AudioSystem.PostEvent(e.DangoConfig.DeathAudio));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIHorizontalLayout],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [12, UE.UITexture],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIText],
      [18, UE.UIButtonComponent],
      [19, UE.UIText],
      [20, UE.UIText],
      [21, UE.UIText],
      [22, UE.UIText],
      [23, UE.UIText],
      [24, UE.UIText],
      [25, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [7, this.lyt],
        [11, this.mxc],
        [18, this.fxc],
      ]);
  }
  async OnBeforeStartAsync() {
    const t = this.OpenParam;
    var i;
    t
      ? ((this.ZPc = t.LegMatchData),
        (this.FPc = this.ZPc.GetDangoActorDataList()),
        (i = this.FPc.findIndex((i) => t.SelectDangoId === i.DangoId)),
        (this.YPc = this.FPc[i]),
        (this.exc = t.DangoActorList),
        await this.eQt())
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          58,
          "RacingBetsBettingView Invalid Param",
        );
  }
  async eQt() {
    (this.ixc = new RacingBetsCostItem_1.RacingBetsCostItem()),
      await this.ixc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()),
      (this.rxc = new RacingBetsCostItem_1.RacingBetsCostItem()),
      await this.rxc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()),
      (this.oxc = new RacingBetsCostItem_1.RacingBetsCostItem()),
      await this.oxc.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()),
      (this.nxc = new RacingBetsCostItem_1.RacingBetsCostItem()),
      await this.nxc.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()),
      (this.A3o = new CommonCurrencyItem_1.CommonCurrencyItem()),
      await this.A3o.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      (this.sxc = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(8),
        this.hxc,
      )),
      (this.txc =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGearList()),
      await this.sxc.RefreshByDataAsync(this.txc),
      (this.zPc = this.txc[0]),
      this.sxc.SelectGridProxy(0),
      (this.axc = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(2),
        this._xc,
      )),
      await this.axc.RefreshByDataAsync(this.FPc);
  }
  PushCameraHandle(i, t, e) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(
      this.YPc.DangoCamera,
      t,
      e,
    );
  }
  OnBeforeShow() {
    var i = this.FPc.findIndex((i) => i === this.YPc),
      i =
        (this.axc.SelectGridProxy(i),
        (this.JPc = this.exc[i]),
        this.Cxc(this.exc, i, !0),
        this.Hqe(this.ZPc, this.YPc, this.zPc),
        this.tBa(),
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData());
    RacingBetsController_1.RacingBetsController.TryRegisterNextDangoOddsUpdateRequest(
      i,
    ),
      RacingBetsController_1.RacingBetsController.RacingBetsUpdateOddsRequest();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      this.gxc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate,
        this.YC1,
      );
  }
  OnTick(i) {
    this.Hg1 &&
      (1 === this.ZPc.GetLegMatchState()
        ? (this.Go1(this.ZPc), this.cS1())
        : ((this.Hg1 = !1), this.$g1()));
  }
  Hqe(i, t, e) {
    i.HasBetting
      ? (this.GetItem(5).SetUIActive(!0),
        this.GetItem(4).SetUIActive(!1),
        this.pxc(i, t))
      : (this.GetItem(5).SetUIActive(!1),
        this.GetItem(4).SetUIActive(!0),
        this.uxc(i, t, e));
    (e = DangoManager_1.DangoManager.GetDangoData(t.DangoId)),
      this.GetText(0).ShowTextNew(e.NameKey),
      this.GetText(1).ShowTextNew(
        e.GetSkillConfig()?.Desc ?? StringUtils_1.EMPTY_STRING,
      ),
      this.GetText(3).ShowTextNew(i.Name),
      this.GetItem(16).SetUIActive(!1),
      this.Go1(i),
      (t = this.axc.GetLayoutItemList());
    for (const s of t) s.RefreshOddsDango(i.BetDangoId);
    this.GetText(22).ShowTextNew("Dango_MainPage_StatusTime_Bet"), this.cS1();
  }
  uxc(i, t, e) {
    var s =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(),
      r = s.GetCurrencyItemId(),
      s = s.GetBetCostCount(e),
      e = (this.ixc.RefreshUi(r, s), Math.ceil((s * t.Odds) / 100));
    this.rxc.RefreshUi(r, e), this.GetText(24).SetText("×" + t.Odds / 100);
  }
  pxc(i, t) {
    var e =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().GetCurrencyItemId(),
      s = DangoManager_1.DangoManager.GetDangoData(i.BetDangoId);
    this.SetTextureShowUntilLoaded(s.Icon, this.GetTexture(12)),
      this.GetText(13).ShowTextNew(s.NameKey),
      this.oxc.RefreshUi(e, i.BetGearCash),
      this.nxc.RefreshUi(e, i.GetOddsRewardCount()),
      this.GetText(17).SetText(i.LeaveCancelNum.toString()),
      this.GetButton(18).RootUIComp.SetUIActive(0 < i.LeaveCancelNum),
      this.GetText(23).SetText("×" + i.Odds / 100);
  }
  Go1(i) {
    i.IsFinalOddsRefresh
      ? this.GetItem(25).SetUIActive(!1)
      : (this.GetItem(25).SetUIActive(!0),
        this.GetText(19).ShowTextNew("Dango_BetPage_Function_NextBetRate"),
        (i = TimeUtil_1.TimeUtil.DateFormat7String(
          this.ZPc.NextOddsRateRefreshTime,
        )),
        this.GetText(20).SetText(i));
  }
  cS1() {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    (i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
      this.ZPc.BetsEndTime * TimeUtil_1.TimeUtil.Millisecond - i,
    )) &&
      i.CountDownText &&
      this.GetText(21).SetText(i.CountDownText);
  }
  tBa() {
    var i =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    this.A3o.RefreshTemp(
      i.GetCurrencyItemId(),
      i.GetCurrencyCount().toString(),
    ),
      this.A3o.SetButtonActive(!1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      this.gxc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate,
        this.YC1,
      );
  }
  OnBeforeHide() {
    var i = this.FPc.findIndex((i) => i === this.YPc);
    this.Cxc(this.exc, i, !1);
  }
  PopCameraHandle(i, t, e, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(
      this.YPc.DangoCamera,
      t,
      e,
      s,
    );
  }
  dxc(i) {
    if (this.JPc !== i) {
      if (this.JPc) {
        const t = this.JPc;
        UiModelUtil_1.UiModelUtil.DangoFadeIn(
          this.JPc,
          "RoleFadeInCurve",
          () => {
            UiModelUtil_1.UiModelUtil.SetVisible(t.Model, !1);
          },
        );
      }
      (this.JPc = i),
        UiModelUtil_1.UiModelUtil.SetVisible(this.JPc.Model, !0),
        UiModelUtil_1.UiModelUtil.DangoFadeOut(this.JPc);
    }
  }
  Cxc(t, e, s) {
    for (let i = 0; i < t.length; i++)
      i !== e &&
        (s
          ? UiModelUtil_1.UiModelUtil.DangoFadeIn(
              t[i],
              "RoleFadeInCurve",
              () => {
                UiModelUtil_1.UiModelUtil.SetVisible(t[i].Model, !1);
              },
            )
          : (UiModelUtil_1.UiModelUtil.SetVisible(t[i].Model, !0),
            UiModelUtil_1.UiModelUtil.DangoFadeOut(t[i])));
  }
  $g1() {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(299);
    i.FunctionMap.set(2, () => {
      this.CloseMe();
    }),
      i.FunctionMap.set(1, () => {
        this.CloseMe();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        i,
      );
  }
}
exports.RacingBetsBettingView = RacingBetsBettingView;
//# sourceMappingURL=RacingBetsBettingView.js.map
