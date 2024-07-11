"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleOnlineButton = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleEntranceButton_1 = require("./BattleEntranceButton");
const onlinePlayerIconList = ["Online1PIcon", "Online2PIcon", "Online3PIcon"];
class BattleOnlineButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments),
      (this.EPe = void 0),
      (this.b$e = void 0),
      (this.q$e = ""),
      (this.G$e = () => {
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() ===
          0 &&
          (this.GetItem(2).SetUIActive(!1), this.EPe?.StopCurrentSequence());
      }),
      (this.N$e = () => {
        this.GetItem(2).SetUIActive(!0),
          this.EPe?.StopCurrentSequence(),
          this.EPe?.PlayLevelSequenceByName("AutoLoop");
      }),
      (this.O$e = () => {
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          this.RefreshButtonState();
      }),
      (this.k$e = () => {
        this.RefreshButtonState();
      }),
      (this.F$e = () => {
        this.RefreshButtonState();
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([2, UE.UIItem], [3, UE.UISprite]);
  }
  Initialize(e) {
    super.Initialize(e),
      e &&
        ((this.b$e = this.GetSprite(3)),
        this.AddEvents(),
        (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem.GetParentAsUIItem(),
        )));
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView(),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() ===
      1
        ? (this.GetItem(2).SetUIActive(!0),
          this.EPe.GetCurrentSequence() === "AutoLoop"
            ? this.EPe.ReplaySequenceByKey("AutoLoop")
            : this.EPe.PlayLevelSequenceByName("AutoLoop"))
        : (this.GetItem(2).SetUIActive(!1), this.EPe?.StopCurrentSequence()),
      this.RefreshButtonState();
  }
  Reset() {
    this.EPe?.Clear(), (this.EPe = void 0), this.RemoveEvents(), super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMatchingChange,
      this.G$e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.N$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.O$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.k$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnlineDisableStateChange,
        this.F$e,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMatchingChange,
      this.G$e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.N$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.O$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.k$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnlineDisableStateChange,
        this.F$e,
      );
  }
  SetGamepadHide(e) {
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? super.SetGamepadHide(!1)
      : super.SetGamepadHide(e);
  }
  V$e() {
    let e = void 0;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      var t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
      if (!t) return;
      e = onlinePlayerIconList[t.PlayerNumber - 1];
    } else
      e = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled()
        ? "OnlineLimitIcon"
        : "OnlineNoLimitIcon";
    this.q$e === e ||
      ((this.q$e = e),
      (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
      StringUtils_1.StringUtils.IsEmpty(t)) ||
      this.SetSpriteByPath(t, this.b$e, !0);
  }
  RefreshButtonState() {
    this.b$e &&
      (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ? this.SetOtherHide(!0)
        : (this.SetOtherHide(!1), this.V$e()));
  }
}
exports.BattleOnlineButton = BattleOnlineButton;
// # sourceMappingURL=BattleOnlineButton.js.map
