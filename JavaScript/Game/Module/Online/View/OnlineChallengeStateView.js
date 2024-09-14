"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineChallengeStateView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  OnlineChallengePlayerStateItem_1 = require("./OnlineChallengePlayerStateItem");
class OnlineChallengeStateView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.SNi = -1),
      (this.bMa = void 0),
      (this.pNi = void 0),
      (this.qMa = []),
      (this.GMa = () => {
        var e =
          new OnlineChallengePlayerStateItem_1.OnlineChallengePlayerStateItem();
        return this.qMa.push(e), e;
      }),
      (this.$1i = (e, i) => {
        if (1 === i) this.CloseMe();
        else for (const t of this.qMa) t.SetTeamPlayerSprite(e, i);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIText],
      [3, UE.UISprite],
    ];
  }
  OnStart() {
    (this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd),
      (this.pNi = this.GetSprite(3)),
      (this.bMa = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(1),
        this.GMa,
      )),
      this.RefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$1i,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlayerChallengeStateChange,
      this.$1i,
    );
  }
  OnBeforeDestroy() {
    (this.pNi = void 0), (this.SNi = -1), (this.qMa = []);
  }
  OnTick(e) {
    (this.SNi -= e * TimeUtil_1.TimeUtil.Millisecond),
      this.SNi <= 0
        ? this.CloseMe()
        : this.pNi.SetFillAmount(
            this.SNi / ModelManager_1.ModelManager.OnlineModel.ApplyCd,
          );
  }
  RefreshView() {
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
        ModelManager_1.ModelManager.OnlineModel.OwnerId,
      )?.Name,
      e =
        (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()
          ? (LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(0),
              "ChallengeAgain",
            ),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(2),
              "HasInviteChallengeAgain",
              e,
            ))
          : (LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(0),
              "ContinueChallenge",
            ),
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(2),
              "HasInviteContinueChallenge",
              e,
            )),
        ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers()),
      i = [];
    for (const t of e) i.push(t.GetPlayerId());
    this.bMa.RefreshByData(i);
  }
}
exports.OnlineChallengeStateView = OnlineChallengeStateView;
//# sourceMappingURL=OnlineChallengeStateView.js.map
