"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreOnlineChallengePlayer = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  RewardExploreOnlineChallengePlayerItem_1 = require("./RewardExploreOnlineChallengePlayerItem"),
  MAX_PLAYER_COUNT = 3,
  playerItemIndicesUsedBySeq = [
    [0, 1, 2],
    [1, 2, 0],
    [0, 1, 2],
  ],
  SEQ_NAME_PLAYER_01 = "Start01",
  SEQ_NAME_PLAYER_02 = "Start02",
  SEQ_NAME_PLAYER_03 = "Start03",
  SEQ_NAME_TEX = "Start_T",
  playerItemChildTypes = [2, 1, 3],
  playerItemSeqNames = [
    SEQ_NAME_PLAYER_01,
    SEQ_NAME_PLAYER_02,
    SEQ_NAME_PLAYER_03,
  ];
class RewardExploreOnlineChallengePlayer extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.c9_ = !1),
      (this.u9_ = []),
      (this.d9_ = []),
      (this.m9_ = []),
      (this.SPe = void 0),
      (this.SWs = () => {
        this.FullRefresh();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      await this.g9_();
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      this.SWs,
    );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      this.SWs,
    );
  }
  async g9_() {
    await this.SHe();
  }
  FullRefresh() {
    this.bNe(), this.Og();
  }
  async SHe() {
    this.GetText(0).SetUIActive(!1), (this.u9_ = []);
    var t = [];
    for (let e = 0; e < MAX_PLAYER_COUNT; e++) {
      var i =
        new RewardExploreOnlineChallengePlayerItem_1.RewardExploreOnlineChallengePlayerItem();
      this.u9_.push(i),
        t.push(
          i.CreateByActorAsync(
            this.GetItem(playerItemChildTypes[e]).GetOwner(),
          ),
        );
    }
    await Promise.all(t);
  }
  bNe() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    (this.d9_ = this.m9_), (this.m9_ = []);
    for (const t of e)
      0 ===
        ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
          t.GetPlayerId(),
        ) && this.m9_.push(t.GetPlayerId());
  }
  Og() {
    this.C9_(), this.p9_();
  }
  C9_() {
    if (0 === this.m9_.length) this.SetUiActive(!1);
    else {
      this.SetUiActive(!0);
      var t = playerItemIndicesUsedBySeq[this.m9_.length - 1];
      for (let e = 0; e < MAX_PLAYER_COUNT; e++)
        e < this.m9_.length
          ? (this.u9_[t[e]].SetUiActive(!0),
            this.u9_[t[e]].Refresh(this.m9_[e]))
          : this.u9_[t[e]].SetUiActive(!1);
    }
  }
  p9_() {
    this.m9_.length <= this.d9_.length ||
      (this.SPe?.PlayLevelSequenceByName(
        playerItemSeqNames[this.m9_.length - 1],
      ),
      this.c9_) ||
      (this.GetText(0).SetUIActive(!0),
      this.SPe?.PlayLevelSequenceByName(SEQ_NAME_TEX),
      (this.c9_ = !0));
  }
}
exports.RewardExploreOnlineChallengePlayer = RewardExploreOnlineChallengePlayer;
//# sourceMappingURL=RewardExploreOnlineChallengePlayer.js.map
