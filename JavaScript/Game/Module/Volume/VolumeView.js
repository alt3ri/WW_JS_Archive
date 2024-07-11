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
      (this.tNo = 100),
      (this.iNo = 0),
      (this.oNo = 0),
      (this.rNo = 0),
      (this.nNo = 0),
      (this.sNo = (i) => {
        (this.iNo = i), this.aNo(i);
      }),
      (this.hNo = (i) => {
        (this.oNo = i),
          this.oNo > this.iNo && (this.oNo = this.iNo),
          UE.AkGameplayStatics.SetRTPCValue(
            void 0,
            this.oNo,
            0,
            void 0,
            Vocal_Audio_Bus_Volume,
          );
      }),
      (this.lNo = (i) => {
        (this.rNo = i),
          this.rNo > this.iNo && (this.rNo = this.iNo),
          UE.AkGameplayStatics.SetRTPCValue(
            void 0,
            this.rNo,
            0,
            void 0,
            Music_Audio_Bus_Volume,
          );
      }),
      (this._No = (i) => {
        (this.nNo = i),
          this.nNo > this.iNo && (this.nNo = this.iNo),
          UE.AkGameplayStatics.SetRTPCValue(
            void 0,
            this.nNo,
            0,
            void 0,
            SFX_Audio_Bus_Volume,
          );
      }),
      (this.$Ge = () => {
        UiManager_1.UiManager.CloseView("VolumeView");
      }),
      (this.uNo = () => {
        this.Jzi(
          "/Game/Aki/WwiseAudio/Events/Default_Work_Unit/Music_Event/Music_Play_Event/Test_Music.Test_Music",
        );
      }),
      (this.cNo = () => {
        this.Jzi(
          "/Game/Aki/WwiseAudio/Events/Default_Work_Unit/Vocal_Event/Play_Role_Atk_Vo_Test.Play_Role_Atk_Vo_Test",
        );
      }),
      (this.mNo = () => {
        this.Jzi(
          "/Game/Aki/WwiseAudio/Events/Default_Work_Unit/SFX_Event/SFX_Play_Event/Play_Swim_Stand.Play_Swim_Stand",
        );
      }),
      (this.dNo = 0),
      (this.CNo = 0),
      (this.gNo = () => {
        this.fNo("/Game/Aki/WwiseAudio/Events"),
          (this.dNo = 0),
          (this.CNo = 0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Audio", 22, "开始进行音频播放检测!!!"),
          this.pNo();
      }),
      (this.vNo = void 0);
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
        [0, this.sNo],
        [1, this.lNo],
        [2, this.hNo],
        [3, this._No],
        [4, this.$Ge],
        [5, this.uNo],
        [6, this.cNo],
        [7, this.mNo],
        [8, this.gNo],
      ]);
  }
  OnStart() {
    this.MNo();
  }
  aNo(i) {
    this.lNo(i), this.hNo(i), this._No(i);
  }
  MNo() {
    this.GetSlider(0).SetValue(this.tNo),
      this.GetSlider(1).SetValue(this.tNo),
      this.GetSlider(2).SetValue(this.tNo),
      this.GetSlider(3).SetValue(this.tNo);
  }
  pNo() {
    var i;
    this.dNo < this.vNo.Num()
      ? ((i = this.vNo.Get(this.dNo)),
        (i = this.SNo(i)),
        this.dNo++,
        this.Jzi(i))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Audio",
          22,
          "音频播放检测完毕!!!",
          ["总数", this.vNo.Num().toString()],
          ["实际检测总数", this.dNo.toString()],
          ["失败总数", this.CNo.toString()],
        );
  }
  Jzi(i) {
    const t = Global_1.Global.BaseCharacter;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Audio", 22, "当前播放音频路径", ["name", i]),
      AudioController_1.AudioController.GetAudioEvent(i, !1)
        ? (0 === AudioController_1.AudioController.PlayAudioByEventPath(i, t) &&
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Audio", 22, "音频播放失败!!!", ["name", i]),
            this.CNo++),
          AudioController_1.AudioController.StopAudio(t),
          this.pNo())
        : AudioController_1.AudioController.LoadAndAddCallback(i, () => {
            0 ===
              AudioController_1.AudioController.PlayAudioByEventPath(i, t) &&
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Audio", 22, "音频播放失败!!!", ["name", i]),
              this.CNo++),
              AudioController_1.AudioController.StopAudio(t),
              this.pNo();
          });
  }
  OnBeforeDestroy() {
    UE.AkGameplayStatics.StopActor(this.GetRootActor());
  }
  fNo(i) {
    var t = (0, puerts_1.$ref)(void 0),
      s =
        (UE.KuroRenderingEditorBPPluginBPLibrary.FindFiles(t, i),
        (this.vNo = (0, puerts_1.$unref)(t)),
        new Array());
    for (let i = 0; i < this.vNo.Num(); i++)
      this.vNo.Get(i).includes("FOLDER") && s.push(i);
    for (const e of s.reverse()) this.vNo.RemoveAt(e);
  }
  SNo(i) {
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
