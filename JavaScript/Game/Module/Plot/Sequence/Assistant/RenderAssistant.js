"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderAssistant = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender"),
  GlobalData_1 = require("../../../../GlobalData"),
  RenderDataManager_1 = require("../../../../Render/Data/RenderDataManager"),
  RenderUtil_1 = require("../../../../Render/Utils/RenderUtil"),
  SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class RenderAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
  constructor() {
    super(...arguments),
      (this.uio = !1),
      (this.cio = !1),
      (this.mio = new UE.FName("LightDisableSwitch")),
      (this.dio = 0);
  }
  PreAllPlay() {
    (this.dio = UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
      "r.Mobile.EnableKuroSpotlightsShadow",
    )),
      RenderUtil_1.RenderUtil.CloseToonSceneShadow(),
      RenderUtil_1.RenderUtil.OpenMobileSpotLightShadow(),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.SetSequenceFrameRateLimit(),
      Info_1.Info.IsPcOrGamepadPlatform() &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Kuro.AutoExposure 0",
        ),
      0 === this.Model.GetType() &&
        ((this.Model.PreviousMotionBlur =
          UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
            "r.MotionBlur.Amount",
          )),
        0 !== this.Model.PreviousMotionBlur) &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount 0",
        ),
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        RenderDataManager_1.RenderDataManager.Get().GetEyesParameterMaterialParameterCollection(),
        this.mio,
        0,
      ),
      UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(),
      RenderUtil_1.RenderUtil.BeginPSOSyncMode(),
      (this.cio = !0);
  }
  PreEachPlay() {
    var t = this.Model.GetCurrentSequence();
    UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(t, !0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "关闭纹理流送", ["Seq", t.GetName()]),
      (this.uio = !0);
  }
  EachStop() {
    var t = this.Model.GetCurrentSequence();
    UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(t, !1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "开启纹理流送", ["Seq", t.GetName()]),
      (this.uio = !1);
  }
  AllStop() {
    RenderUtil_1.RenderUtil.OpenToonSceneShadow(),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Mobile.EnableKuroSpotlightsShadow " + this.dio,
      ),
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancleSequenceFrameRateLimit(),
      Info_1.Info.IsPcOrGamepadPlatform() &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.Kuro.AutoExposure 1",
        ),
      0 === this.Model.GetType() &&
        0 !== this.Model.PreviousMotionBlur &&
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlur.Amount " + this.Model.PreviousMotionBlur,
        ),
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.World,
        RenderDataManager_1.RenderDataManager.Get().GetEyesParameterMaterialParameterCollection(),
        this.mio,
        1,
      ),
      UE.KuroSequencePerformanceManager.CloseKuroPerformanceMode(),
      this.ReleaseSeqStreamingData(),
      RenderUtil_1.RenderUtil.EndPSOSyncMode(),
      (this.cio = !1);
  }
  End() {
    this.uio && this.EachStop(), this.cio && this.AllStop();
  }
  CheckSeqStreamingData() {
    let e = !0;
    var a = this.Model.SequenceData;
    for (let t = 0; t < a.剧情资源.Num(); t++) {
      var i = a.剧情资源.Get(t);
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(i, !0) ||
        (e = !1);
    }
    return (
      this.Model.SequenceData.NeedSwitchMainCharacter &&
        this.Model.MainSeqCharacterMesh &&
        (UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
          this.Model.MainSeqCharacterMesh,
        ) ||
          (e = !1)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "检查手动流送", ["是否流送完成", e]),
      e
    );
  }
  ReleaseSeqStreamingData() {
    if (this.uio) {
      var e = this.Model.SequenceData;
      for (let t = 0; t < e.剧情资源.Num(); t++) {
        var a = e.剧情资源.Get(t);
        UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(a, !1);
      }
      this.Model.SequenceData.NeedSwitchMainCharacter &&
        this.Model.MainSeqCharacterMesh &&
        UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
          this.Model.MainSeqCharacterMesh,
          !1,
        ),
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 39, "关闭手动流送");
    }
  }
  SetMotionBlurState(t) {
    t
      ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 39, "打开动态模糊"),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlurQuality 4",
        ))
      : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 39, "关闭动态模糊"),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlurQuality 0",
        ));
  }
}
exports.RenderAssistant = RenderAssistant;
//# sourceMappingURL=RenderAssistant.js.map
