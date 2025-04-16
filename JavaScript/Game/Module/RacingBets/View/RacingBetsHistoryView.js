"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsHistoryItem = exports.RacingBetsHistoryView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RacingBetsController_1 = require("../RacingBetsController");
class RacingBetsHistoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.gt1 = void 0),
      (this.Og = () => {
        this.D2t();
      }),
      (this.Ct1 = () => {
        return new RacingBetsHistoryItem();
      }),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.Jvt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      this.Og,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate,
      this.Og,
    );
  }
  async OnBeforeStartAsync() {
    this.gt1 = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.Ct1,
    );
    var e =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsHistoryData();
    this.GS1(e), e && 0 < e.length && (await this.gt1.RefreshByDataAsync(e));
  }
  OnStart() {
    this.GetScrollViewWithScrollbar(0)
      .Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
      ?.Play();
  }
  D2t() {
    var e =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsHistoryData();
    this.GS1(e), e && 0 < e.length && this.gt1.RefreshByData(e);
  }
  GS1(e) {
    e
      ? ((e = e.length),
        this.GetItem(3).SetUIActive(0 === e),
        this.GetItem(0)?.SetUIActive(0 < e))
      : this.GetItem(0)?.SetUIActive(!1);
  }
}
exports.RacingBetsHistoryView = RacingBetsHistoryView;
class RacingBetsHistoryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ZPc = void 0),
      (this.vt1 = () => {
        var e;
        this.ZPc
          ? (e =
              ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData()) &&
            RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(
              e.Id,
              this.ZPc.Id,
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RacingBets",
              78,
              "投注历史界面 item LegMatchData undefined",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[6, this.vt1]]);
  }
  Refresh(e, t, i) {
    (this.ZPc = e), this.Xqe();
  }
  Xqe() {
    var e, t, i;
    this.ZPc &&
      ((e = this.ZPc.IsLegMatchFinished()),
      (t = this.ZPc.BetDangoId),
      (i =
        (t = ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(t))
          ?.Icon ?? ""),
      this.SetTextureByPath(i, this.GetTexture(2)),
      this.GetText(3).ShowTextNew("" + t?.Name),
      this.GetText(0).SetText(
        TimeUtil_1.TimeUtil.DateFormat6String(this.ZPc.MatchStartTime),
      ),
      this.GetText(1).ShowTextNew(this.ZPc.Name),
      e
        ? (this.GetText(4).SetText("" + this.ZPc.GetBetDangoRank()),
          this.GetText(5).SetText("" + this.ZPc.OddsReward))
        : (this.GetText(4).SetText("-"), this.GetText(5).SetText("-")),
      this.GetButton(6).RootUIComp.SetUIActive(e));
  }
}
exports.RacingBetsHistoryItem = RacingBetsHistoryItem;
//# sourceMappingURL=RacingBetsHistoryView.js.map
