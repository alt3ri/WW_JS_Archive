"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDecodeViewV2 = void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  FailedFinishPanel_1 = require("./FailedFinishPanel"),
  PausePanel_1 = require("./PausePanel"),
  SignalMovePanel_1 = require("./SignalMovePanel"),
  SuccessFinishPanel_1 = require("./SuccessFinishPanel"),
  COUNTDOWN_SEQUENCENAME = "Counter",
  NIAGARA_ORANGE_COLOR = "FF400FFF",
  COUNTDOWN_AUDIO_EVENTNAME = "SignalDecodeGame_count_down",
  COUNTDOWNEND_AUDIO_EVENTNAME = "SignalDecodeGame_count_down_End",
  BG_NOISE_AUDIO_EVENTNAME = "SignalDecodeGame_play_base_noise",
  BG_NOISE_STOP_AUDIO_EVENTNAME = "SignalDecodeGame_stop_base_noise",
  BG_BGM_AUDIO_EVENTNAME = "SignalDecodeGame_music_play_BGM",
  BG_BGM_AUDIO_PAUSE_EVENTNAME = "SignalDecodeGame_music_pause_BGM",
  BG_BGM_AUDIO_RESUME_EVENTNAME = "SignalDecodeGame_music_resume_BGM",
  BG_BGM_STOP_AUDIO_EVENTNAME = "SignalDecodeGame_music_stop_BGM",
  PLAYER_CATCHDOWN_AUDIO_EVENTNAME = "SignalDecodeGame_play_press_loop",
  PLAYER_CATCHUP_AUDIO_EVENTNAME = "SignalDecodeGame_stop_press_loop",
  PLAYER_CATCHSUCCESS_AUDIO_EVENTNAME = "SignalDecodeGame_release_correct",
  PLAYER_CATCHFAILED_AUDIO_EVENTNAME = "SignalDecodeGame_release_error",
  PLAYER_CATCHFAILED2_AUDIO_EVENTNAME =
    "SignalDecodeGame_music_play_presserror";
class SignalDecodeViewV2 extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.wMo = void 0),
      (this.BMo = void 0),
      (this.bMo = void 0),
      (this.qMo = void 0),
      (this.GMo = void 0),
      (this.NMo = void 0),
      (this.OMo = void 0),
      (this.kMo = void 0),
      (this.FMo = new AudioController_1.PlayResult()),
      (this.VMo = new AudioController_1.PlayResult()),
      (this.HMo = new AudioController_1.PlayResult()),
      (this.jMo = new AudioController_1.PlayResult()),
      (this.WMo = new AudioController_1.PlayResult()),
      (this.KMo = new AudioController_1.PlayResult()),
      (this.QMo = new AudioController_1.PlayResult()),
      (this.XMo = new AudioController_1.PlayResult()),
      (this.LevelSequencePlayer = void 0),
      (this.Dai = 0),
      (this.$Mo = !1),
      (this.YMo = !1),
      (this.JMo = () => {
        var e = this.GetUiNiagara(12);
        e.SetNiagaraSystem(this.NMo),
          e.SetNiagaraUIActive(!0, !1),
          e.ActivateSystem(!0);
      }),
      (this.zMo = () => {
        this.ZMo();
        var e = this.GetUiNiagara(12),
          e =
            (e.SetNiagaraSystem(this.NMo),
            e.SetNiagaraUIActive(!1, !1),
            e.DeactivateSystem(),
            this.GetUiNiagara(11));
        e.SetNiagaraSystem(this.GMo),
          e.SetNiagaraUIActive(!0, !1),
          e.ActivateSystem(!0),
          this.XZi(PLAYER_CATCHSUCCESS_AUDIO_EVENTNAME, this.QMo);
      }),
      (this.eEo = () => {
        this.tEo(), (this.$Mo = !0);
        var e = this.GetUiNiagara(12),
          e =
            (e.SetNiagaraSystem(this.kMo),
            e.SetNiagaraUIActive(!1, !1),
            e.DeactivateSystem(),
            this.GetUiNiagara(11));
        e.SetNiagaraSystem(this.OMo),
          e.SetNiagaraUIActive(!0, !1),
          e.ActivateSystem(!0),
          TimerSystem_1.TimerSystem.Delay(() => {
            (this.$Mo = !1), this.ZMo();
          }, 1e3);
        let i = PLAYER_CATCHFAILED_AUDIO_EVENTNAME;
        3 ===
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
          (i = PLAYER_CATCHFAILED2_AUDIO_EVENTNAME),
          this.XZi(i, this.XMo);
      }),
      (this.iEo = () => {
        this.BMo.Hide(), this.oEo(2);
      }),
      (this.rEo = () => {
        this.BMo.Hide(), this.wMo.StartAgain(), this.oEo(2, !0);
      }),
      (this.yct = (e) => {
        e === COUNTDOWN_SEQUENCENAME && this.oEo(2, !0);
      }),
      (this.Tct = (e, i) => {
        var t;
        e === COUNTDOWN_SEQUENCENAME &&
          ((e = this.GetText(2)),
          "开始" === i
            ? ((t =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById("Start")),
              e.SetText(t),
              this.XZi(COUNTDOWNEND_AUDIO_EVENTNAME, this.VMo))
            : (e.SetText(i), this.XZi(COUNTDOWN_AUDIO_EVENTNAME, this.FMo)));
      }),
      (this.nEo = () => {
        this.wMo.OnCatchBtnDown();
        var e = this.GetUiNiagara(13);
        e?.SetNiagaraUIActive(!0, !1),
          e?.ActivateSystem(!0),
          this.sEo(),
          this.XZi(PLAYER_CATCHDOWN_AUDIO_EVENTNAME, this.WMo);
      }),
      (this.aEo = () => {
        this.wMo.OnCatchBtnUp(),
          this.ZMo(),
          this.XZi(PLAYER_CATCHUP_AUDIO_EVENTNAME, this.KMo);
      }),
      (this.hEo = () => {
        this.oEo(3);
      }),
      (this.dpt = () => {}),
      (this.ZMo = () => {
        this.lEo("SP_SignalPointerNor");
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
        [3, this.hEo],
        [4, this.dpt],
      ]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(1).SetUIActive(!1), this.GetItem(0).SetUIActive(!0);
    this.GetText(8).SetText("0%");
    var e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    const i = 2 === e ? "054522" : "6b5a25";
    if (
      (this.GetTexture(9)?.SetColor(UE.Color.FromHex(i)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct),
      this.GetText(2)?.GetOwner()?.OnSequencePlayEvent.Bind(this.Tct),
      this.GetUiNiagara(12)?.SetNiagaraUIActive(!1, !1),
      this.GetUiNiagara(11)?.SetNiagaraUIActive(!1, !1),
      3 === ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType)
    ) {
      const i = UE.Color.FromHex(NIAGARA_ORANGE_COLOR);
      var t = new UE.LinearColor(i);
      this.GetUiNiagara(16)?.SetNiagaraUIActive(!0, !1),
        this.GetUiNiagara(16)?.SetNiagaraVarLinearColor("Color", t),
        this.GetUiNiagara(17)?.SetNiagaraUIActive(!0, !1),
        this.GetUiNiagara(17)?.SetNiagaraVarLinearColor("Color", t);
    }
    (this.BMo = new PausePanel_1.PausePanel()),
      (this.bMo = new SuccessFinishPanel_1.SuccessFinishPanel()),
      (this.qMo = new FailedFinishPanel_1.FailedFinishPanel()),
      (this.wMo = new SignalMovePanel_1.SignalMovePanel()),
      await Promise.all([
        this.BMo.CreateByResourceIdAsync("UiView_ComPause", this.RootItem),
        this.BMo.HideAsync(),
        this.bMo.CreateByResourceIdAsync("UiView_SignalSuccess", this.RootItem),
        this.bMo.HideAsync(),
        this.qMo.CreateByResourceIdAsync("UiView_SignalFail", this.RootItem),
        this.qMo.HideAsync(),
        this.wMo.Init(this.GetItem(5), e),
      ]);
    t = 2 === ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    let s = t ? "NS_Fx_LGUI_Send_G_Loop" : "NS_Fx_LGUI_Send_Y_Loop",
      _ =
        (3 ===
          ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
          (s = "NS_Fx_LGUI_Send_O_Loop"),
        (this.NMo = await this._Eo(s)),
        t ? "NS_Fx_LGUI_Send_G_Burst" : "NS_Fx_LGUI_Send_Y_Burst");
    3 === ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
      (_ = "NS_Fx_LGUI_Send_O_Burst"),
      (this.GMo = await this._Eo(_));
    this.kMo = await this._Eo("NS_Fx_LGUI_Send_R_Loop");
    this.OMo = await this._Eo("NS_Fx_LGUI_Send_R_Burst");
    e = t ? "SignalSendProcess" : "SignalReceiveProcess";
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), e);
    let o = t ? "SignalSendTips" : "SignalReceiveTips";
    3 === ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
      (o = "SignalMusicTips"),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), o);
  }
  async _Eo(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    if (e && 0 !== e.length) {
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
    var e = this.GetButton(6);
    e.OnPointDownCallBack.Bind(this.nEo), e.OnPointUpCallBack.Bind(this.aEo);
  }
  OnAfterShow() {
    this.oEo(1);
  }
  OnBeforeDestroy() {
    this.Vfa(),
      (this.NMo = void 0),
      (this.GMo = void 0),
      (this.kMo = void 0),
      (this.OMo = void 0);
  }
  Vfa() {
    AudioController_1.AudioController.StopEvent(this.FMo),
      AudioController_1.AudioController.StopEvent(this.VMo),
      AudioController_1.AudioController.StopEvent(this.HMo),
      AudioController_1.AudioController.StopEvent(this.HMo),
      AudioController_1.AudioController.StopEvent(this.jMo),
      AudioController_1.AudioController.StopEvent(this.WMo),
      AudioController_1.AudioController.StopEvent(this.QMo),
      AudioController_1.AudioController.StopEvent(this.XMo);
  }
  Hfa() {
    this.GetUiNiagara(13)?.SetNiagaraUIActive(!1, !1),
      this.GetUiNiagara(12)?.SetNiagaraUIActive(!1, !1),
      this.GetUiNiagara(11)?.SetNiagaraUIActive(!1, !1);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSignalCatchStart,
      this.JMo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchSuccess,
        this.zMo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchFailed,
        this.eEo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchContinue,
        this.iEo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalCatchStartAgain,
        this.rEo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSignalCatchStart,
      this.JMo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchSuccess,
        this.zMo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchFailed,
        this.eEo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchContinue,
        this.iEo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSignalCatchStartAgain,
        this.rEo,
      );
  }
  OnTick(e) {
    2 === this.Dai && this.uEo(e);
  }
  uEo(e) {
    this.wMo.UpdateMove(e), this.cEo();
  }
  cEo() {
    var e = this.wMo.GetCompleteness(),
      e = Math.floor(100 * e),
      i = (this.GetText(8).SetText(e + "%"), this.wMo.GetProgress());
    this.GetSprite(10).SetFillAmount(i), 1 <= i && this.mEo(e);
  }
  mEo(i) {
    this.YMo ||
      ((this.YMo = !0),
      TimerSystem_1.TimerSystem.Delay(() => {
        var e =
          i >= ModelManager_1.ModelManager.SignalDecodeModel.TargetCompletion
            ? 4
            : 5;
        this.oEo(e), (this.YMo = !1);
      }, 1e3));
  }
  oEo(e, i) {
    if (this.Dai !== e) {
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
          this.Hfa(),
            this.GetItem(0).SetUIActive(!1),
            this.GetItem(1).SetUIActive(!0),
            i && this.dEo();
          let e = BG_NOISE_AUDIO_EVENTNAME;
          3 ===
            ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
            ((e = i ? BG_BGM_AUDIO_EVENTNAME : BG_BGM_AUDIO_RESUME_EVENTNAME),
            Log_1.Log.CheckError()) &&
            Log_1.Log.Error("Audio", 19, "BGM事件", ["eventName", e]),
            this.XZi(e, this.HMo);
          break;
        }
        case 3: {
          this.Vfa(), this.GetItem(1).SetUIActive(!1), this.BMo.Show();
          let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
          3 ===
            ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
            (e = BG_BGM_AUDIO_PAUSE_EVENTNAME),
            this.XZi(e, this.jMo);
          break;
        }
        case 4: {
          this.Vfa(), this.GetItem(1).SetUIActive(!1), this.bMo.Open();
          let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
          3 ===
            ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
            (e = BG_BGM_STOP_AUDIO_EVENTNAME),
            this.XZi(e, this.jMo);
          break;
        }
        case 5: {
          this.Vfa(), this.GetItem(1).SetUIActive(!1), this.qMo.Open();
          let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
          3 ===
            ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType &&
            (e = BG_BGM_STOP_AUDIO_EVENTNAME),
            this.XZi(e, this.jMo);
          break;
        }
      }
      this.Dai = e;
    }
  }
  dEo() {
    this.GetItem(5).SetAnchorOffsetX(-1280);
  }
  XZi(e, i) {
    var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    t && "" !== t.Path
      ? AudioController_1.AudioController.PostEventByUi(t.Path, i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Audio",
          19,
          "获取Audio配表信息错误！请检查Audio的配置是否存在！",
          ["name", e],
        );
  }
  sEo() {
    var e =
      2 === ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    this.lEo(e ? "SP_SignalPointerGreen" : "SP_SignalPointerYellow");
  }
  tEo() {
    this.lEo("SP_SignalPointerRed");
  }
  lEo(e) {
    var i;
    this.$Mo ||
      ((i = this.GetSprite(7)),
      (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
      this.SetSpriteByPath(e, i, !1));
  }
}
exports.SignalDecodeViewV2 = SignalDecodeViewV2;
//# sourceMappingURL=SignalDecodeViewV2.js.map
