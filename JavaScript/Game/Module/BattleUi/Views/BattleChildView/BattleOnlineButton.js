"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleOnlineButton = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleEntranceButton_1 = require("./BattleEntranceButton"),
  onlinePlayerIconList = ["Online1PIcon", "Online2PIcon", "Online3PIcon"];
class BattleOnlineButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.QYe = void 0),
      (this.XYe = ""),
      (this.$Ye = () => {
        0 ===
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() &&
          (this.GetItem(2).SetUIActive(!1), this.SPe?.StopCurrentSequence());
      }),
      (this.YYe = () => {
        this.GetItem(2).SetUIActive(!0),
          this.SPe?.StopCurrentSequence(),
          this.SPe?.PlayLevelSequenceByName("AutoLoop");
      }),
      (this.JYe = () => {
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          this.RefreshButtonState();
      }),
      (this.zYe = () => {
        this.RefreshButtonState();
      }),
      (this.ZYe = () => {
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
        ((this.QYe = this.GetSprite(3)),
        this.AddEvents(),
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem.GetParentAsUIItem(),
        )));
  }
  OnShowBattleChildView() {
    super.OnShowBattleChildView(),
      1 ===
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
        ? (this.GetItem(2).SetUIActive(!0),
          "AutoLoop" === this.SPe.GetCurrentSequence()
            ? this.SPe.ReplaySequenceByKey("AutoLoop")
            : this.SPe.PlayLevelSequenceByName("AutoLoop"))
        : (this.GetItem(2).SetUIActive(!1), this.SPe?.StopCurrentSequence()),
      this.RefreshButtonState();
  }
  Reset() {
    this.SPe?.Clear(), (this.SPe = void 0), this.RemoveEvents(), super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMatchingChange,
      this.$Ye,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.JYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.zYe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnlineDisableStateChange,
        this.ZYe,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMatchingChange,
      this.$Ye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMatchingBegin,
        this.YYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.JYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeModeFinish,
        this.zYe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnlineDisableStateChange,
        this.ZYe,
      );
  }
  SetGamepadHide(e) {
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? super.SetGamepadHide(!1)
      : super.SetGamepadHide(e);
  }
  eJe() {
    let e = void 0;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
        t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
      if (!t) return;
      e = onlinePlayerIconList[t.PlayerNumber - 1];
    } else
      e = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled()
        ? "OnlineLimitIcon"
        : "OnlineNoLimitIcon";
    this.XYe === e ||
      ((this.XYe = e),
      (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
      StringUtils_1.StringUtils.IsEmpty(t)) ||
      this.SetSpriteByPath(t, this.QYe, !0);
  }
  RefreshButtonState() {
    this.QYe &&
      (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ? this.SetOtherHide(!0)
        : (this.SetOtherHide(!1), this.eJe()));
  }
}
exports.BattleOnlineButton = BattleOnlineButton;
//# sourceMappingURL=BattleOnlineButton.js.map
