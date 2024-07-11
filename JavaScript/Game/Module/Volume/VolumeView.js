"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VolumeView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController"),
  Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../Global"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  Vocal_Audio_Bus_Volume = new UE.FName("Vocal_Audio_Bus_Volume"),
  Music_Audio_Bus_Volume = new UE.FName("Music_Audio_Bus_Volume"),
  SFX_Audio_Bus_Volume = new UE.FName("SFX_Audio_Bus_Volume");
class VolumeView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.zNo = 100),
      (this.ZNo = 0),
      (this.eOo = 0),
      (this.tOo = 0),
      (this.iOo = 0),
      (this.oOo = (i) => {
        (this.ZNo = i), this.rOo(i);
      }),
      (this.nOo = (i) => {
        (this.eOo = i),
          this.eOo > this.ZNo && (this.eOo = this.ZNo),
          UE.AkGameplayStatics.SetRTPCValue(
            void 0,
            this.eOo,
            0,
            void 0,
            Vocal_Audio_Bus_Volume,
          );
      }),
      (this.sOo = (i) => {
        (this.tOo = i),
          this.tOo > this.ZNo && (this.tOo = this.ZNo),
          UE.AkGameplayStatics.SetRTPCValue(
            void 0,
            this.tOo,
            0,
            void 0,
            Music_Audio_Bus_Volume,
          );
      }),
      (this.aOo = (i) => {
        (this.iOo = i),
          this.iOo > this.ZNo && (this.iOo = this.ZNo),
          UE.AkGameplayStatics.SetRTPCValue(
            void 0,
            this.iOo,
            0,
            void 0,
            SFX_Audio_Bus_Volume,
          );
      }),
      (this.$Ge = () => {
        UiManager_1.UiManager.CloseView("VolumeView");
      }),
      (this.hOo = () => {
        this.XZi(
          "/Game/Aki/WwiseAudio/Events/Default_Work_Unit/Music_Event/Music_Play_Event/Test_Music.Test_Music",
        );
      }),
      (this.lOo = () => {
        this.XZi(
          "/Game/Aki/WwiseAudio/Events/Default_Work_Unit/Vocal_Event/Play_Role_Atk_Vo_Test.Play_Role_Atk_Vo_Test",
        );
      }),
      (this._Oo = () => {
        this.XZi(
          "/Game/Aki/WwiseAudio/Events/Default_Work_Unit/SFX_Event/SFX_Play_Event/Play_Swim_Stand.Play_Swim_Stand",
        );
      }),
      (this.uOo = 0),
      (this.cOo = 0),
      (this.mOo = () => {
        this.dOo("/Game/Aki/WwiseAudio/Events"),
          (this.uOo = 0),
          (this.cOo = 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 22, "开始进行音频播放检测!!!"),
          this.COo();
      }),
      (this.gOo = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISliderComponent],
      [1, UE.UISliderComponent],
      [2, UE.UISliderComponent],
      [3, UE.UISliderComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.oOo],
        [1, this.sOo],
        [2, this.nOo],
        [3, this.aOo],
        [4, this.$Ge],
        [5, this.hOo],
        [6, this.lOo],
        [7, this._Oo],
        [8, this.mOo],
      ]);
  }
  OnStart() {
    this.fOo();
  }
  rOo(i) {
    this.sOo(i), this.nOo(i), this.aOo(i);
  }
  fOo() {
    this.GetSlider(0).SetValue(this.zNo),
      this.GetSlider(1).SetValue(this.zNo),
      this.GetSlider(2).SetValue(this.zNo),
      this.GetSlider(3).SetValue(this.zNo);
  }
  COo() {
    var i;
    this.uOo < this.gOo.Num()
      ? ((i = this.gOo.Get(this.uOo)),
        (i = this.pOo(i)),
        this.uOo++,
        this.XZi(i))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Audio",
          22,
          "音频播放检测完毕!!!",
          ["总数", this.gOo.Num().toString()],
          ["实际检测总数", this.uOo.toString()],
          ["失败总数", this.cOo.toString()],
        );
  }
  XZi(i) {
    const t = Global_1.Global.BaseCharacter;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Audio", 22, "当前播放音频路径", ["name", i]),
      AudioController_1.AudioController.GetAudioEvent(i, !1)
        ? (0 === AudioController_1.AudioController.PlayAudioByEventPath(i, t) &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Audio", 22, "音频播放失败!!!", ["name", i]),
            this.cOo++),
          AudioController_1.AudioController.StopAudio(t),
          this.COo())
        : AudioController_1.AudioController.LoadAndAddCallback(i, () => {
            0 ===
              AudioController_1.AudioController.PlayAudioByEventPath(i, t) &&
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Audio", 22, "音频播放失败!!!", ["name", i]),
              this.cOo++),
              AudioController_1.AudioController.StopAudio(t),
              this.COo();
          });
  }
  OnBeforeDestroy() {
    UE.AkGameplayStatics.StopActor(this.GetRootActor());
  }
  dOo(i) {
    var t = (0, puerts_1.$ref)(void 0),
      s =
        (UE.KuroRenderingEditorBPPluginBPLibrary.FindFiles(t, i),
        (this.gOo = (0, puerts_1.$unref)(t)),
        new Array());
    for (let i = 0; i < this.gOo.Num(); i++)
      this.gOo.Get(i).includes("FOLDER") && s.push(i);
    for (const e of s.reverse()) this.gOo.RemoveAt(e);
  }
  pOo(i) {
    var t = i.indexOf(".");
    if (-1 !== t) {
      var s = i.lastIndexOf("/");
      if (-1 !== s) {
        var t = i.substr(s + 1, t - s - 1),
          s = i.replace("uasset", t),
          i = s.indexOf("/Aki");
        if (-1 !== i) return (t = s.substr(0, i)), s.replace(t, "/Game");
      }
    }
  }
}
exports.VolumeView = VolumeView;
//# sourceMappingURL=VolumeView.js.map
