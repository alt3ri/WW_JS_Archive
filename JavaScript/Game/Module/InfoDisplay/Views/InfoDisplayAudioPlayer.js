"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayAudioPlayer = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  AudioDefine_1 = require("../../../../Core/Audio/AudioDefine"),
  AudioModel_1 = require("../../../../Core/Audio/AudioModel"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InfoDisplayModel_1 = require("../Data/InfoDisplayModel");
class InfoDisplayAudioPlayer extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uqe = 0),
      (this.jsi = void 0),
      (this.YZt = void 0),
      (this.$Zt = 1),
      (this.Td = !1),
      (this.Y6 = void 0),
      (this.Wsi = -0),
      (this.Ksi = ""),
      (this.Qsi = ""),
      (this.mQe = !1),
      (this.Xsi = void 0),
      (this.$si = () => {
        var i, t;
        this.Td
          ? this.mQe
            ? this.Ysi()
            : this.Jsi()
          : ((i = this.Qsi),
            (t = AudioController_1.AudioController.GetAudioEvent(i, !1)),
            this.YZt ||
              (this.YZt = (0, puerts_1.toManualReleaseDelegate)(this.zsi)),
            t
              ? (this.Zsi(i), (this.Td = !0), (this.mQe = !1))
              : AudioController_1.AudioController.LoadAndAddCallback(i, () => {
                  this.eai();
                }));
      }),
      (this.tai = 0),
      (this.iai = (i) => {
        (this.tai += i),
          1e3 <= this.tai &&
            (this.Uqe++,
            this.Uqe >= this.Wsi && (this.Uqe = this.Wsi),
            (this.tai = 0)),
          this.Y6 &&
            this.Y6.OutputArray &&
            0 < this.Y6.OutputArray.Num() &&
            void 0 !== this.Xsi &&
            this.Xsi(this.Y6.OutputArray, i),
          this.sSt();
      }),
      (this.zsi = (i, t) => {
        0 === i &&
          this.Td &&
          (Log_1.Log.CheckDebug() && Log_1.Log.Debug("InfoDisplay", 28, "End"),
          AudioController_1.AudioController.StopAudio(this.RootActor),
          (i = this.Qsi),
          AudioController_1.AudioController.GetAudioEvent(i, !1) && this.Zsi(i),
          (this.Uqe = 0));
      });
  }
  Initialize(i) {
    this.CreateThenShowByActor(i);
  }
  SetShowTextComponent(i) {
    this.jsi = i;
  }
  SetSpectrumCallBack(i) {
    this.Xsi = i;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]]),
      (this.BtnBindInfo = [[0, this.$si]]);
  }
  eai() {
    "" !== this.Qsi && this.$si();
    var i = this.GetExtendToggle(0);
    this.mQe ? i.SetToggleState(0) : i.SetToggleState(1);
  }
  Jsi() {
    this.mQe = !0;
    var i = AudioController_1.AudioController.GetAudioEvent(this.Qsi, !1);
    AudioController_1.AudioController.ExecuteActionOnEvent(
      i,
      1,
      this.RootActor,
    );
  }
  Ysi() {
    this.mQe = !1;
    var i = AudioController_1.AudioController.GetAudioEvent(this.Qsi, !1);
    AudioController_1.AudioController.ExecuteActionOnEvent(
      i,
      2,
      this.RootActor,
    );
  }
  oai() {
    AudioController_1.AudioController.StopAudio(this.RootActor),
      AudioModel_1.AudioModel.DestroySpectrumActor(),
      (this.Y6 = void 0),
      (this.Uqe = 0),
      (this.tai = 0),
      this.sSt(),
      (this.Td = !1);
  }
  Zsi(i) {
    AudioController_1.AudioController.PlayAudioByEventPath(
      i,
      this.GetRootActor(),
      this.$Zt,
      this.YZt,
    ),
      (this.Y6 = AudioModel_1.AudioModel.GetSpectrumActor());
    var t = this.RootActor.GetComponentByClass(UE.AkComponent.StaticClass());
    (this.Y6.Ak = t),
      this.Y6.AkCall(
        this.Y6.Ak,
        AudioController_1.AudioController.GetAudioEvent(i, !1),
      ),
      (this.Wsi = AudioController_1.AudioController.GetAudioEvent(
        i,
        !1,
      ).MaximumDuration),
      (this.Ksi = InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(
        this.Wsi,
      ));
  }
  OnTick(i) {
    this.Td && !this.mQe && this.iai(i);
  }
  sSt() {
    var i = InfoDisplayModel_1.InfoDisplayModel.ConvertToHourMinuteString(
      this.Uqe,
    );
    this.jsi.SetText(i + "/" + this.Ksi);
  }
  Refresh(i) {
    (this.Qsi = i),
      this.eai(),
      AudioController_1.AudioController.SetState(
        AudioDefine_1.STATEGROUP,
        AudioDefine_1.STATEBACKGROUND,
      );
  }
  OnBeforeDestroy() {
    this.oai(),
      this.YZt &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.zsi),
        (this.YZt = void 0)),
      AudioController_1.AudioController.SetState(
        AudioDefine_1.STATEGROUP,
        AudioDefine_1.STATENORMAL,
      );
  }
}
exports.InfoDisplayAudioPlayer = InfoDisplayAudioPlayer;
//# sourceMappingURL=InfoDisplayAudioPlayer.js.map
