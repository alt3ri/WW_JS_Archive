"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapPlayPointItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine"),
  MapExplorePlayProgressPanel_1 = require("../ExploreProgress/View/MapExplorePlayProgressPanel");
class WorldMapPlayPointItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.tNl = void 0),
      (this.ExploreData = void 0),
      (this.Cxo = void 0),
      (this.lQl = new CustomPromise_1.CustomPromise()),
      (this.eTt = () => {
        this.ExploreData && this.ExploreData.TrackPlayPoint();
      }),
      (this.I8l = (e) => {
        "Close" === e &&
          (this.ExploreData?.SequenceData
            ? ((e = this.ExploreData.SequenceData),
              this.ExploreData.SetSequenceData(),
              this._Ql(e))
            : (this.SetUiActive(!1),
              this.Cxo?.PlayLevelSequenceByName("Refresh")),
          this.lQl.SetResult());
      });
  }
  async Init(e, s) {
    (this.ExploreData = s), await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {
    (this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Cxo?.BindSequenceCloseEvent(this.I8l);
  }
  async OnBeforeStartAsync() {
    (this.tNl =
      new MapExplorePlayProgressPanel_1.MapExplorePlayProgressPanel()),
      await this.tNl.Init(this.GetHorizontalLayout(3).RootUIComp);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIHorizontalLayout],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  OnBeforeShow() {
    this.Slo(this.ExploreData);
  }
  UpdateAreaItemData(e) {
    this.IsShow ? (this.SetUiActive(!0), this.Slo(e)) : (this.ExploreData = e);
  }
  Slo(e) {
    this._Ql(e), this.PlayStartToPause();
  }
  _Ql(e) {
    (this.ExploreData = e),
      this.tNl.UpdateData(e.GetPlayProgressDataIgnoreHiddenList());
    var s = e.GetNameId(),
      s = (this.GetText(1).ShowTextNew(s), this.GetSprite(2));
    this.SetSpriteByPath(e.Icon, s, !1),
      this.lQl.IsFulfilled() &&
        (this.lQl = new CustomPromise_1.CustomPromise());
  }
  OnBeforeDestroy() {
    this.Cxo?.Clear(), (this.Cxo = void 0);
  }
  PlayStartToPause() {
    this.ExploreData?.IsNewRecommendPlay &&
      (this.Cxo?.PlayLevelSequenceByName("Start"),
      this.Cxo?.PauseSequence(),
      this.SetUiActive(!1));
  }
  async ResumeSequence(e) {
    this.ExploreData?.IsNewRecommendPlay &&
      (this.ExploreData?.FinishNewRecommendPlay(),
      await TimerSystem_1.TimerSystem.Wait(
        ExploreProgressDefine_1.RECOMMEND_PLAY_DELAY_TIME * e,
      ),
      this.ExploreData) &&
      (this.SetUiActive(!0),
      this.Cxo?.IsPlayingSequence("Start")
        ? this.Cxo?.ResumeSequence()
        : this.Cxo?.PlayLevelSequenceByName("Start"));
  }
  async CheckFinish() {
    this.ExploreData?.IsFinishedPlayPoint &&
      (this.Cxo?.PlayLevelSequenceByName("Close"), await this.lQl.Promise);
  }
  CheckPlayPointStateSequence() {
    this.tNl.CheckPlayStateChanged();
  }
  HideMe() {
    this.SetUiActive(!1),
      this.ExploreData?.SetSequenceData(),
      (this.ExploreData = void 0),
      this.lQl.SetResult();
  }
}
exports.WorldMapPlayPointItem = WorldMapPlayPointItem;
//# sourceMappingURL=WorldMapPlayPointItem.js.map
