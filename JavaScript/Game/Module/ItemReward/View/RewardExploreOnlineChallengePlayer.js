"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardExploreOnlineChallengePlayer = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RewardExploreOnlineChallengePlayerItem_1 = require("./RewardExploreOnlineChallengePlayerItem");
class RewardExploreOnlineChallengePlayer extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Layout = void 0),
      (this.DataList = []),
      (this.sGe = () => {
        return new RewardExploreOnlineChallengePlayerItem_1.RewardExploreOnlineChallengePlayerItem();
      }),
      (this.SWs = () => {
        this.RefreshPlayerData();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      this.SWs,
    ),
      (this.Layout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.sGe,
      )),
      this.RefreshPlayerData();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      this.SWs,
    );
  }
  RefreshPlayerData() {
    var e = [];
    for (const t of ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers())
      0 ===
        ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
          t.GetPlayerId(),
        ) && e.push(t.GetPlayerId());
    0 < e?.length
      ? (this.Layout?.SetActive(!0),
        this.GetItem(1)?.SetUIActive(!0),
        this.Layout?.RefreshByData(e))
      : (this.GetItem(1)?.SetUIActive(!1), this.Layout?.SetActive(!1));
  }
}
exports.RewardExploreOnlineChallengePlayer = RewardExploreOnlineChallengePlayer;
//# sourceMappingURL=RewardExploreOnlineChallengePlayer.js.map
