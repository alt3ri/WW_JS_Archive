"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsDangoRankItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Time_1 = require("../../../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  RacingBetsDefine_1 = require("../../RacingBetsDefine");
class RacingBetsDangoRankItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.UiLevelSequence = void 0),
      (this.bv1 = void 0),
      (this.Rv1 = 0),
      (this.LerpTime =
        RacingBetsDefine_1.RACING_BETS_DANGO_RANK_ITEM_LERP_INTERVAL),
      (this.Lv1 = 0),
      (this.wv1 = 0),
      (this.Av1 = 0),
      (this.Pv1 = void 0),
      (this.TDe = void 0),
      (this.xv1 = void 0),
      (this.J_ = (i) => {
        this.Lv1 += i;
        var i = this.LerpTime / Time_1.Time.TimeDilation;
        this.Lv1 >= i
          ? (this.RootItem.SetAnchorOffsetY(this.Av1),
            this.Uv1(),
            this.ReleaseHandle())
          : ((i =
              this.xv1.GetFloatValue(this.Lv1 / i) * (this.Av1 - this.wv1) +
              this.wv1),
            this.RootItem.SetAnchorOffsetY(i));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIItem],
    ];
  }
  OnBeforeCreateImplement() {
    (this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiLevelSequence);
  }
  Init(i, e, s) {
    (this.bv1 = i),
      (this.xv1 = e),
      (this.Rv1 = s),
      this.GetText(0).SetText(i.Rank.toString());
    (e = DangoManager_1.DangoManager.GetDangoData(i.DangoId)),
      this.GetText(2).ShowTextNew(e.NameKey),
      this.RootItem.SetAnchorOffsetY(this.Dv1(i.Rank)),
      this.SetTextureShowUntilLoaded(
        e.DangoConfig.IconSmall,
        this.GetTexture(1),
      ),
      (s = i.GetDiceConfig()),
      this.SetTextureShowUntilLoaded(
        s.RollDiceBackgroundIcon,
        this.GetTexture(3),
      ),
      (e = ModelManager_1.ModelManager.RacingBetsModel.IsDungeonBettingDango(
        i.DangoId,
      ));
    this.GetItem(4).SetUIActive(e);
  }
  async RefreshAsync() {
    var i, e, s;
    this.bv1.LastRank !== this.bv1.Rank &&
      (this.ReleaseHandle(),
      this.Uv1(),
      (s = (i = this.bv1.Rank < this.bv1.LastRank) ? "RiseIn" : "DownIn"),
      (i = i ? "RiseOut" : "DownOut"),
      (e = new CustomPromise_1.CustomPromise()),
      await this.UiLevelSequence.PlaySequenceAsync(
        s,
        e,
        !1,
        !1,
        Time_1.Time.TimeDilation,
      ),
      await this.LerpRankTargetPosition(),
      this.RootItem.SetHierarchyIndex(this.bv1.Rank),
      this.GetText(0).SetText(this.bv1.Rank.toString()),
      (s = new CustomPromise_1.CustomPromise()),
      await this.UiLevelSequence.PlaySequenceAsync(
        i,
        s,
        !1,
        !1,
        Time_1.Time.TimeDilation,
      ));
  }
  async LerpRankTargetPosition() {
    (this.Pv1 = new CustomPromise_1.CustomPromise()),
      (this.wv1 = this.Dv1(this.bv1.LastRank)),
      (this.Av1 = this.Dv1(this.bv1.Rank)),
      (this.Lv1 = 0),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(
        this.J_,
        TimerSystem_1.MIN_TIME,
      )),
      await this.Pv1.Promise;
  }
  OnBeforeDestroy() {
    this.ReleaseHandle(), this.Uv1();
  }
  Dv1(i) {
    return -(i - 1) * (this.RootItem.GetHeight() + this.Rv1);
  }
  ReleaseHandle() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  Uv1() {
    this.Pv1 && (this.Pv1.SetResult(void 0), (this.Pv1 = void 0));
  }
}
exports.RacingBetsDangoRankItem = RacingBetsDangoRankItem;
//# sourceMappingURL=RacingBetsDangoRankItem.js.map
