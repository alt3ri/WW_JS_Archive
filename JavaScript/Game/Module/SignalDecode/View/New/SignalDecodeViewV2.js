"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDecodeViewV2 = void 0);
const UE = require("ue");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FailedFinishPanel_1 = require("./FailedFinishPanel");
const PausePanel_1 = require("./PausePanel");
const SignalMovePanel_1 = require("./SignalMovePanel");
const SuccessFinishPanel_1 = require("./SuccessFinishPanel");
const COUNTDOWN_SEQUENCENAME = "Counter";
const NIAGARA_ORANGE_COLOR = "FF400FFF";
const COUNTDOWN_AUDIO_EVENTNAME = "SignalDecodeGame_count_down";
const COUNTDOWNEND_AUDIO_EVENTNAME = "SignalDecodeGame_count_down_End";
const BG_NOISE_AUDIO_EVENTNAME = "SignalDecodeGame_play_base_noise";
const BG_NOISE_STOP_AUDIO_EVENTNAME = "SignalDecodeGame_stop_base_noise";
const BG_BGM_AUDIO_EVENTNAME = "SignalDecodeGame_music_play_BGM";
const BG_BGM_AUDIO_PAUSE_EVENTNAME = "SignalDecodeGame_music_pause_BGM";
const BG_BGM_AUDIO_RESUME_EVENTNAME = "SignalDecodeGame_music_resume_BGM";
const BG_BGM_STOP_AUDIO_EVENTNAME = "SignalDecodeGame_music_stop_BGM";
const PLAYER_CATCHDOWN_AUDIO_EVENTNAME = "SignalDecodeGame_play_press_loop";
const PLAYER_CATCHUP_AUDIO_EVENTNAME = "SignalDecodeGame_stop_press_loop";
const PLAYER_CATCHSUCCESS_AUDIO_EVENTNAME = "SignalDecodeGame_release_correct";
const PLAYER_CATCHFAILED_AUDIO_EVENTNAME = "SignalDecodeGame_release_error";
const PLAYER_CATCHFAILED2_AUDIO_EVENTNAME =
  "SignalDecodeGame_music_play_presserror";
class SignalDecodeViewV2 extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.qvo = void 0),
      (this.Gvo = void 0),
      (this.Nvo = void 0),
      (this.Ovo = void 0),
      (this.kvo = void 0),
      (this.Fvo = void 0),
      (this.Vvo = void 0),
      (this.Hvo = void 0),
      (this.jvo = new AudioController_1.PlayResult()),
      (this.Wvo = new AudioController_1.PlayResult()),
      (this.Kvo = new AudioController_1.PlayResult()),
      (this.Qvo = new AudioController_1.PlayResult()),
      (this.Xvo = new AudioController_1.PlayResult()),
      (this.$vo = new AudioController_1.PlayResult()),
      (this.Yvo = new AudioController_1.PlayResult()),
      (this.Jvo = new AudioController_1.PlayResult()),
      (this.LevelSequencePlayer = void 0),
      (this.Dsi = 0),
      (this.zvo = !1),
      (this.Zvo = !1),
      (this.eMo = () => {
        const e = this.GetUiNiagara(12);
        e.SetNiagaraSystem(this.Fvo),
          e.SetNiagaraUIActive(!0, !1),
          e.ActivateSystem(!0);
      }),
      (this.tMo = () => {
        this.iMo();
        var e = this.GetUiNiagara(12);
        var e =
          (e.SetNiagaraSystem(this.Fvo),
          e.SetNiagaraUIActive(!1, !1),
          e.DeactivateSystem(),
          this.GetUiNiagara(11));
        e.SetNiagaraSystem(this.kvo),
          e.SetNiagaraUIActive(!0, !1),
          e.ActivateSystem(!0),
          this.Jzi(PLAYER_CATCHSUCCESS_AUDIO_EVENTNAME, this.Yvo);
      }),
      (this.oMo = () => {
        this.rMo(), (this.zvo = !0);
        var e = this.GetUiNiagara(12);
        var e =
          (e.SetNiagaraSystem(this.Hvo),
          e.SetNiagaraUIActive(!1, !1),
          e.DeactivateSystem(),
          this.GetUiNiagara(11));
        e.SetNiagaraSystem(this.Vvo),
          e.SetNiagaraUIActive(!0, !1),
          e.ActivateSystem(!0),
          TimerSystem_1.TimerSystem.Delay(() => {
            (this.zvo = !1), this.iMo();
          }, 1e3);
        let i = PLAYER_CATCHFAILED_AUDIO_EVENTNAME;
        ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
          3 && (i = PLAYER_CATCHFAILED2_AUDIO_EVENTNAME),
          this.Jzi(i, this.Jvo);
      }),
      (this.nMo = () => {
        this.Gvo.Hide(), this.sMo(2);
      }),
      (this.aMo = () => {
        this.Gvo.Hide(), this.qvo.StartAgain(), this.sMo(2, !0);
      }),
      (this.aut = (e) => {
        e === COUNTDOWN_SEQUENCENAME && this.sMo(2, !0);
      }),
      (this.lut = (e, i) => {
        let t;
        e === COUNTDOWN_SEQUENCENAME &&
          ((e = this.GetText(2)),
          i === "开始"
            ? ((t =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById("Start")),
              e.SetText(t),
              this.Jzi(COUNTDOWNEND_AUDIO_EVENTNAME, this.Wvo))
            : (e.SetText(i), this.Jzi(COUNTDOWN_AUDIO_EVENTNAME, this.jvo)));
      }),
      (this.hMo = () => {
        this.qvo.OnCatchBtnDown();
        const e = this.GetUiNiagara(13);
        e?.SetNiagaraUIActive(!0, !1),
          e?.ActivateSystem(!0),
          this.lMo(),
          this.Jzi(PLAYER_CATCHDOWN_AUDIO_EVENTNAME, this.Xvo);
      }),
      (this._Mo = () => {
        this.qvo.OnCatchBtnUp(),
          this.iMo(),
          this.Jzi(PLAYER_CATCHUP_AUDIO_EVENTNAME, this.$vo);
      }),
      (this.uMo = () => {
        this.sMo(3);
      }),
      (this.ift = () => {}),
      (this.iMo = () => {
        this.cMo("SP_SignalPointerNor");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UITexture],
      [10, UE.UISprite],
      [11, UE.UINiagara],
      [12, UE.UINiagara],
      [13, UE.UINiagara],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UINiagara],
      [17, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [
        [3, this.uMo],
        [4, this.ift],
      ]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(1).SetUIActive(!1), this.GetItem(0).SetUIActive(!0);
    let e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    const i = e === 2 ? "054522" : "6b5a25";
    if (
      (this.GetTexture(9)?.SetColor(UE.Color.FromHex(i)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.aut),
      this.GetText(2)?.GetOwner()?.OnSequencePlayEvent.Bind(this.lut),
      this.GetUiNiagara(12)?.SetNiagaraUIActive(!1, !1),
      this.GetUiNiagara(11)?.SetNiagaraUIActive(!1, !1),
      ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3)
    ) {
      const i = UE.Color.FromHex(NIAGARA_ORANGE_COLOR);
      var t = new UE.LinearColor(i);
      this.GetUiNiagara(16)?.SetNiagaraUIActive(!0, !1),
        this.GetUiNiagara(16)?.SetNiagaraVarLinearColor("Color", t),
        this.GetUiNiagara(17)?.SetNiagaraUIActive(!0, !1),
        this.GetUiNiagara(17)?.SetNiagaraVarLinearColor("Color", t);
    }
    (this.Gvo = new PausePanel_1.PausePanel()),
      (this.Nvo = new SuccessFinishPanel_1.SuccessFinishPanel()),
      (this.Ovo = new FailedFinishPanel_1.FailedFinishPanel()),
      (this.qvo = new SignalMovePanel_1.SignalMovePanel()),
      await Promise.all([
        this.Gvo.CreateByResourceIdAsync("UiView_ComPause", this.RootItem),
        this.Gvo.HideAsync(),
        this.Nvo.CreateByResourceIdAsync("UiView_SignalSuccess", this.RootItem),
        this.Nvo.HideAsync(),
        this.Ovo.CreateByResourceIdAsync("UiView_SignalFail", this.RootItem),
        this.Ovo.HideAsync(),
        this.qvo.Init(this.GetItem(5), e),
      ]);
    t = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 2;
    let s = t ? "NS_Fx_LGUI_Send_G_Loop" : "NS_Fx_LGUI_Send_Y_Loop";
    let _ =
      (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
        3 && (s = "NS_Fx_LGUI_Send_O_Loop"),
      (this.Fvo = await this.mMo(s)),
      t ? "NS_Fx_LGUI_Send_G_Burst" : "NS_Fx_LGUI_Send_Y_Burst");
    ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3 &&
      (_ = "NS_Fx_LGUI_Send_O_Burst"),
      (this.kvo = await this.mMo(_));
    this.Hvo = await this.mMo("NS_Fx_LGUI_Send_R_Loop");
    this.Vvo = await this.mMo("NS_Fx_LGUI_Send_R_Burst");
    e = t ? "SignalSendProcess" : "SignalReceiveProcess";
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), e);
    let o = t ? "SignalSendTips" : "SignalReceiveTips";
    ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3 &&
      (o = "SignalMusicTips"),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), o);
  }
  async mMo(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    if (e && e.length !== 0) {
      const i = new CustomPromise_1.CustomPromise();
      return (
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, (e) => {
          e && this.RootItem ? i.SetResult(e) : i.SetResult(void 0);
        }),
        await i.Promise
      );
    }
  }
  OnBeforeShow() {
    const e = this.GetButton(6);
    e.OnPointDownCallBack.Bind(this.hMo), e.OnPointUpCallBack.Bind(this._Mo);
  }
  OnAfterShow() {
    this.sMo(1);
  }
  OnBeforeDestroy() {
    AudioController_1.AudioController.StopEvent(this.jvo),
      AudioController_1.AudioController.StopEvent(this.Wvo),
      AudioController_1.AudioController.StopEvent(this.Kvo),
      AudioController_1.AudioController.StopEvent(this.Kvo),
      AudioController_1.AudioController.StopEvent(this.Qvo),
      AudioController_1.AudioController.StopEvent(this.Xvo),
      AudioController_1.AudioController.StopEvent(this.Yvo),
      AudioController_1.AudioController.StopEvent(this.Jvo),
      (this.Fvo = void 0),
      (this.kvo = void 0),
      (this.Hvo = void 0),
      (this.Vvo = void 0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSignalCatchStart,
      this.eMo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchSuccess,
        this.tMo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchFailed,
        this.oMo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchContinue,
        this.nMo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchStartAgain,
        this.aMo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSignalCatchStart,
      this.eMo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchSuccess,
        this.tMo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchFailed,
        this.oMo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchContinue,
        this.nMo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchStartAgain,
        this.aMo,
      );
  }
  OnTick(e) {
    this.Dsi === 2 && this.dMo(e);
  }
  dMo(e) {
    this.qvo.UpdateMove(e), this.CMo();
  }
  CMo() {
    var e = this.qvo.GetCompleteness();
    var e = Math.floor(100 * e);
    const i = (this.GetText(8).SetText(e + "%"), this.qvo.GetProgress());
    this.GetSprite(10).SetFillAmount(i), i >= 1 && this.gMo(e);
  }
  gMo(i) {
    this.Zvo ||
      ((this.Zvo = !0),
      TimerSystem_1.TimerSystem.Delay(() => {
        const e =
          i >= ModelManager_1.ModelManager.SignalDecodeModel.TargetCompletion
            ? 4
            : 5;
        this.sMo(e), (this.Zvo = !1);
      }, 1e3));
  }
  sMo(e, i) {
    if (this.Dsi !== e) {
      switch (e) {
        case 1:
          this.GetItem(1).SetUIActive(!1),
            this.GetItem(0).SetUIActive(!0),
            this.GetText(2)?.SetText("3"),
            this.LevelSequencePlayer?.PlayLevelSequenceByName(
              COUNTDOWN_SEQUENCENAME,
            );
          break;
        case 2: {
          this.GetItem(0).SetUIActive(!1),
            this.GetItem(1).SetUIActive(!0),
            i && this.fMo();
          let e = BG_NOISE_AUDIO_EVENTNAME;
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
            3 &&
            ((e = i ? BG_BGM_AUDIO_EVENTNAME : BG_BGM_AUDIO_RESUME_EVENTNAME),
            Log_1.Log.CheckError()) &&
            Log_1.Log.Error("Audio", 19, "BGM事件", ["eventName", e]),
            this.Jzi(e, this.Kvo);
          break;
        }
        case 3: {
          this.GetItem(1).SetUIActive(!1), this.Gvo.Show();
          let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
            3 && (e = BG_BGM_AUDIO_PAUSE_EVENTNAME),
            this.Jzi(e, this.Qvo);
          break;
        }
        case 4: {
          this.GetItem(1).SetUIActive(!1), this.Nvo.Open();
          let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
            3 && (e = BG_BGM_STOP_AUDIO_EVENTNAME),
            this.Jzi(e, this.Qvo);
          break;
        }
        case 5: {
          this.GetItem(1).SetUIActive(!1), this.Ovo.Open();
          let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType ===
            3 && (e = BG_BGM_STOP_AUDIO_EVENTNAME),
            this.Jzi(e, this.Qvo);
          break;
        }
      }
      this.Dsi = e;
    }
  }
  fMo() {
    const e = this.GetItem(5);
    const i = this.GetItem(1).Width / 2;
    e.SetAnchorOffsetX(-i);
  }
  Jzi(e, i) {
    const t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    t && t.Path !== ""
      ? AudioController_1.AudioController.PostEventByUi(t.Path, i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          19,
          "获取Audio配表信息错误！请检查Audio的配置是否存在！",
          ["name", e],
        );
  }
  lMo() {
    const e =
      ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 2;
    this.cMo(e ? "SP_SignalPointerGreen" : "SP_SignalPointerYellow");
  }
  rMo() {
    this.cMo("SP_SignalPointerRed");
  }
  cMo(e) {
    let i;
    this.zvo ||
      ((i = this.GetSprite(7)),
      (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
      this.SetSpriteByPath(e, i, !1));
  }
}
exports.SignalDecodeViewV2 = SignalDecodeViewV2;
// # sourceMappingURL=SignalDecodeViewV2.js.map
