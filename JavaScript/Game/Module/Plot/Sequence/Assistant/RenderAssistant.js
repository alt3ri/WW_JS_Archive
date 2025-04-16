"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderAssistant = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  PerfSightController_1 = require("../../../../../Game/PerfSight/PerfSightController"),
  GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender"),
  GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager"),
  GameSettingsUtils_1 = require("../../../../GameSettings/GameSettingsUtils"),
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
      (this.dio = 0),
      (this.LSl = !1);
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
      );
    var e = this.Model.GetCurrentSequence(),
      e =
        (UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(e),
        PerfSightController_1.PerfSightController.IsEnable &&
          UE.PerfSightHelper.PostEvent(
            819,
            UE.KuroSequencePerformanceManager.GetPerformanceMode().toString(),
          ),
        RenderUtil_1.RenderUtil.BeginPSOSyncMode(),
        (this.cio = !0),
        GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.METALFX,
        ));
    0 === this.Model.GetType() &&
      GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsMetalFxDevice() &&
      void 0 !== e &&
      0 < e &&
      ((this.LSl = !0),
      GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(0));
  }
  PreEachPlay() {
    this.uio = !0;
  }
  EachStop() {
    this.uio = !1;
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
      PerfSightController_1.PerfSightController.IsEnable &&
        UE.PerfSightHelper.PostEvent(
          819,
          UE.KuroSequencePerformanceManager.GetPerformanceMode().toString(),
        ),
      this.ReleaseSeqStreamingData(),
      RenderUtil_1.RenderUtil.EndPSOSyncMode(),
      this.LSl &&
        ((this.LSl = !1),
        GameSettingsUtils_1.GameSettingsUtils.ApplyMetalFxEnable(1)),
      (this.cio = !1);
  }
  End() {
    this.uio && this.EachStop(), this.cio && this.AllStop();
  }
  CheckSeqStreamingData() {
    let t = !0;
    var i = this.Model.SequenceData;
    for (let e = 0; e < i.剧情资源.Num(); e++) {
      var a = i.剧情资源.Get(e);
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(a, !0) ||
        (t = !1);
    }
    return (
      this.Model.SequenceData.NeedSwitchMainCharacter &&
        this.Model.MainSeqCharacterMesh &&
        (UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(
          this.Model.MainSeqCharacterMesh,
        ) ||
          (t = !1)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 38, "检查手动流送", ["是否流送完成", t]),
      t
    );
  }
  ReleaseSeqStreamingData() {
    var t = this.Model.SequenceData;
    for (let e = 0; e < t.剧情资源.Num(); e++) {
      var i = t.剧情资源.Get(e);
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(i, !1);
    }
    this.Model.SequenceData.NeedSwitchMainCharacter &&
      this.Model.MainSeqCharacterMesh &&
      UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(
        this.Model.MainSeqCharacterMesh,
        !1,
      ),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 38, "关闭手动流送");
  }
  SetMotionBlurState(e) {
    e
      ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 38, "打开动态模糊"),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlurQuality 4",
        ))
      : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 38, "关闭动态模糊"),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "r.MotionBlurQuality 0",
        ));
  }
}
exports.RenderAssistant = RenderAssistant;
//# sourceMappingURL=RenderAssistant.js.map
