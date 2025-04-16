"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsRankView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  RacingBetsRankItem_1 = require("./Item/RacingBetsRankItem");
class RacingBetsRankView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.d8c = void 0),
      (this.m8c = void 0),
      (this.Qo1 = () => {
        return new RacingBetsRankItem_1.RacingBetsRankItem();
      }),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIArtText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIText],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [[9, this.Jvt]]);
  }
  async OnBeforeStartAsync() {
    (this.m8c = this.GetLoopScrollViewComponent(0).RootUIComp),
      (this.d8c = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.Qo1,
      ));
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRankData(),
      i = e.length;
    this.GetItem(10).SetUIActive(0 === i),
      this.m8c?.SetUIActive(0 < i),
      0 < i && (await this.d8c.RefreshByDataAsync(e));
  }
  OnStart() {
    this.GetLoopScrollViewComponent(0)
      .Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())
      ?.Play(),
      this.C8c();
  }
  OnTick(e) {
    var i =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(),
      t = TimeUtil_1.TimeUtil.GetServerTime(),
      i = i.GetNextRankUpdateTime();
    0 < i &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(12),
        "Dango_RankPage_Countdown",
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i - t)?.CountDownText ??
          "",
      );
  }
  C8c() {
    var e =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(),
      i = e.GetHitNum(),
      e = e.GetTotalBetCount(),
      i =
        (this.GetText(6).SetText(
          ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName() ?? "",
        ),
        this.GetText(7).SetText("" + i),
        this.GetText(8).SetText("" + e),
        ModelManager_1.ModelManager.PlayerInfoModel?.GetHeadIconId()),
      e = this.GetTexture(5),
      i = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(i),
      i =
        (void 0 !== i &&
          this.SetTextureShowUntilLoaded(i.GetRoleHeadIconCircle(), e),
        ModelManager_1.ModelManager.RacingBetsModel.GetSelfRank()),
      e = i?.RankStatus;
    i
      ? (this.GetItem(2)?.SetUIActive(e === Protocol_1.Aki.Protocol.P6c.cJ_),
        this.GetItem(3)?.SetUIActive(
          e === Protocol_1.Aki.Protocol.P6c.Proto_UnRank,
        ),
        this.GetText(11)?.SetUIActive(!1),
        e === Protocol_1.Aki.Protocol.P6c.Proto_Top1
          ? (this.GetText(11)?.SetUIActive(!0),
            this.GetText(11)?.ShowTextNew("Dango_RankPage_Top1Percent"))
          : e === Protocol_1.Aki.Protocol.P6c.Proto_Top50
            ? (this.GetText(11)?.SetUIActive(!0),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(11),
                "Dango_RankPage_Top50Percent",
                new LguiUtil_1.TableTextArgNew(i.RankNum.toString()),
              ))
            : e === Protocol_1.Aki.Protocol.P6c.cJ_ &&
              (this.GetText(11)?.SetUIActive(!1),
              this.GetArtText(4)?.SetText(i.RankNum.toString())))
      : (this.GetItem(2)?.SetUIActive(!1),
        this.GetItem(3)?.SetUIActive(!0),
        this.GetText(11)?.SetUIActive(!1));
  }
}
exports.RacingBetsRankView = RacingBetsRankView;
//# sourceMappingURL=RacingBetsRankView.js.map
