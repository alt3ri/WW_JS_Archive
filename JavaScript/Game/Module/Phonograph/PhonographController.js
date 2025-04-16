"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographController = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class PhonographController extends UiControllerBase_1.UiControllerBase {
  static async UnlockMusicRequest(e) {
    var r = new Protocol_1.Aki.Protocol._p_(),
      e = ((r.bMs = e), await Net_1.Net.CallAsync(16104, r));
    if (!e) return !1;
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      const o = await UiManager_1.UiManager.OpenViewAsync(
        "PhonographNewMusicView",
        [],
      );
      return void 0 !== o;
    }
    ModelManager_1.ModelManager.PhonographModel.NewMusicIds = e.eL_;
    const o = await UiManager_1.UiManager.OpenViewAsync(
      "PhonographNewMusicView",
      e.eL_,
    );
    return void 0 !== o;
  }
  static SwitchMusicRequest(r, o) {
    var e = new Protocol_1.Aki.Protocol.mp_();
    (e.SPl = r),
      Net_1.Net.Call(28752, e, (e) => {
        e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "PhonographSwitchMusicSuccess",
          ),
          (ModelManager_1.ModelManager.PhonographModel.RecordMusicId = r),
          o());
      });
  }
  static async GetMusicInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.up_(),
      e = await Net_1.Net.CallAsync(17551, e);
    if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)
      return (
        (ModelManager_1.ModelManager.PhonographModel.UnlockMusicIds = e.tL_), e
      );
    ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
      e.Q4n,
      17551,
    );
  }
  static PlayMusic(e, r = !0) {
    var o = ModelManager_1.ModelManager.PhonographModel?.EntityActor,
      n =
        (PhonographController.PlayMusicTimer &&
          (TimerSystem_1.TimerSystem.Remove(
            PhonographController.PlayMusicTimer,
          ),
          (PhonographController.PlayMusicTimer = void 0),
          o?.IsValid()) &&
          AudioSystem_1.AudioSystem.StopAll(o),
        ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e));
    if (!n) return 0;
    if (!o?.IsValid()) return 0;
    this.StopMusic(!1);
    o = AudioSystem_1.AudioSystem.PostEvent(n.MusicEvent, o);
    return (
      r &&
        ((ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime =
          n.Duration),
        (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0),
        (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = e),
        (PhonographController.PlayMusicTimer =
          TimerSystem_1.TimerSystem.Forever(() => {
            (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime += 1),
              ModelManager_1.ModelManager.PhonographModel
                .CurrentPlayMusicTime >=
                ModelManager_1.ModelManager.PhonographModel
                  .CurrentPlayMusicTotalTime &&
                PhonographController.StopMusic(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnPhonographPlayTick,
              );
          }, CommonDefine_1.MILLIONSECOND_PER_SECOND))),
      o
    );
  }
  static StopMusic(e = !0) {
    var r = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    r?.IsValid() && AudioSystem_1.AudioSystem.StopAll(r),
      PhonographController.PlayMusicTimer &&
        (TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer),
        (PhonographController.PlayMusicTimer = void 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPhonographPlayStop,
      ),
      (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = 0),
      (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0),
      (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = 0),
      e &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPhonographSwitchMusic,
        );
  }
  static ClearTimer() {
    PhonographController.PlayMusicTimer &&
      (TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer),
      (PhonographController.PlayMusicTimer = void 0));
  }
  static PlayMusicByEntityId(e) {
    var r,
      o,
      n = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e),
      n =
        (0 !== n && AudioSystem_1.AudioSystem.ExecuteAction(n, 0),
        ModelManager_1.ModelManager.PhonographModel.GetRecordMusicId(e));
    0 !== n &&
      (n = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(n)) &&
      (o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e)) &&
      (r = o.Entity?.CheckGetComponent(1)) &&
      ((o = AudioSystem_1.AudioSystem.PostEvent(n.MusicEvent, r.Owner)),
      ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(e, o));
  }
  static StopMusicByEntityId(e) {
    var r = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e);
    0 !== r &&
      (AudioSystem_1.AudioSystem.ExecuteAction(r, 0),
      ModelManager_1.ModelManager.PhonographModel.RemovePlayIdRecord(e));
  }
}
(exports.PhonographController = PhonographController).PlayMusicTimer = void 0;
//# sourceMappingURL=PhonographController.js.map
