"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographMusicPlayItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class PhonographMusicPlayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickMusicItem = void 0),
      (this.MusicId = 0),
      (this.TotalTime = 0),
      (this.CurrentTime = 0),
      (this.UpdateTimeHandle = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.yY_ = (e) => {
        this.GetItem(7).SetUIActive(e === this.MusicId);
      }),
      (this.fr_ = (e) => {
        this.MusicId !== e && this.GetSprite(6).SetAlpha(0);
      }),
      (this.vr_ = () => {
        this.OnClickMusicItem &&
          this.OnClickMusicItem(this.MusicId, this.GridIndex),
          this.GetSprite(6).SetAlpha(1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPhonographSelectDisable,
            this.MusicId,
          );
      }),
      (this.eTt = () => {
        ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId ===
          this.MusicId && this.GetExtendToggle(0).SetToggleState(1, !1),
          this.OnClickMusicItem &&
            this.OnClickMusicItem(this.MusicId, this.GridIndex),
          ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(
            this.MusicId,
          ) &&
            (this.RefreshTime(),
            this.GetItem(4).SetUIActive(!1),
            this.LevelSequencePlayer.PlaySequencePurely("Play"));
      }),
      (this.OnPlayTick = () => {
        this.MusicId ===
          ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId &&
          this.RefreshTime();
      }),
      (this.OnPlayStop = () => {
        this.MusicId ===
          ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId &&
          (this.GetText(3).SetText(
            TimeUtil_1.TimeUtil.GetTimeString(this.TotalTime),
          ),
          this.GetSprite(2).SetFillAmount(0),
          this.GetExtendToggle(0).SetToggleState(0, !1),
          this.LevelSequencePlayer?.PlaySequencePurely("Stop"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPhonographPlayTick,
      this.OnPlayTick,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhonographPlayStop,
        this.OnPlayStop,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhonographSelectDisable,
        this.fr_,
      ),
      (this.GetExtendToggle(0).bCanClickWhenDisable = !0),
      this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.vr_),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhonographSetBgm,
        this.yY_,
      );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPhonographPlayTick,
      this.OnPlayTick,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhonographPlayStop,
        this.OnPlayStop,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhonographSelectDisable,
        this.fr_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhonographSetBgm,
        this.yY_,
      );
  }
  RefreshTime() {
    this.GetText(3).SetText(
      TimeUtil_1.TimeUtil.GetTimeString(
        ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime,
      ) +
        "/" +
        TimeUtil_1.TimeUtil.GetTimeString(this.TotalTime),
    ),
      this.GetSprite(2).SetFillAmount(
        ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime /
          this.TotalTime,
      );
  }
  Refresh(e, t, i) {
    this.MusicId = e;
    var s,
      h = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e);
    h &&
      (this.GetItem(7).SetUIActive(
        ModelManager_1.ModelManager.PhonographModel.RecordMusicId === e,
      ),
      (this.TotalTime = Math.floor(h.Duration)),
      (s = ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId === e)
        ? this.RefreshTime()
        : (this.GetSprite(2).SetFillAmount(0),
          this.GetText(3).SetText(
            TimeUtil_1.TimeUtil.GetTimeString(this.TotalTime),
          )),
      ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e)
        ? this.LevelSequencePlayer.PlaySequencePurely("Unlock")
        : this.LevelSequencePlayer.PlaySequencePurely("Lock"),
      s
        ? this.LevelSequencePlayer.PlaySequencePurely("Play")
        : this.LevelSequencePlayer.PlaySequencePurely("Stop"),
      (s = s ? 1 : 0),
      this.GetSprite(6).SetAlpha(t ? 1 : 0),
      this.GetExtendToggle(0).CanExecuteChange.Unbind(),
      this.GetExtendToggle(0).SetToggleState(s, !1),
      this.GetExtendToggle(0).CanExecuteChange.Bind(
        () =>
          (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId ===
            this.MusicId &&
            ModelManager_1.ModelManager.PhonographModel
              ?.CurrentSelectMusicId !== this.MusicId) ||
          (ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId !==
            this.MusicId &&
          ModelManager_1.ModelManager.PhonographModel?.CurrentSelectMusicId ===
            this.MusicId
            ? (this.eTt(), !1)
            : ModelManager_1.ModelManager.PhonographModel
                .CurrentSelectMusicId !== this.MusicId),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), h.Title),
      this.GetItem(4).SetUIActive(
        ModelManager_1.ModelManager.PhonographModel.IsNewMusic(e),
      ));
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1, !1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0, !1);
  }
  OnBeforeDestroy() {
    this.UpdateTimeHandle &&
      (TimerSystem_1.TimerSystem.Remove(this.UpdateTimeHandle),
      (this.UpdateTimeHandle = void 0));
  }
}
exports.PhonographMusicPlayItem = PhonographMusicPlayItem;
//# sourceMappingURL=PhonographMusicPlayItem.js.map
