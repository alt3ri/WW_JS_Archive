"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RenderUtil = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  GlobalData_1 = require("../../GlobalData"),
  CharBodyEffect_1 = require("../Character/Components/Components/CharBodyEffect"),
  CharDecalShadow_1 = require("../Character/Components/Components/CharDecalShadow"),
  CharDitherEffect_1 = require("../Character/Components/Components/CharDitherEffect"),
  CharEnviInteractionEffect_1 = require("../Character/Components/Components/CharEnviInteractionEffect"),
  CharGrassInteraction_1 = require("../Character/Components/Components/CharGrassInteraction"),
  CharMaterialContainerV2_1 = require("../Character/Components/Components/CharMaterialContainerV2"),
  CharMaterialControllerV2_1 = require("../Character/Components/Components/CharMaterialControllerV2"),
  CharPropertyModifier_1 = require("../Character/Components/Components/CharPropertyModifier"),
  CharSceneInteraction_1 = require("../Character/Components/Components/CharSceneInteraction"),
  CharMaterialContainer_1 = require("../Character/Components/MaterialContainer/CharMaterialContainer"),
  CharMaterialController_1 = require("../Character/Components/MaterialController/CharMaterialController");
class RenderUtil {
  static GetRenderComps(e, r) {
    var a = new Array();
    switch (
      (r
        ? (a.push(new CharMaterialControllerV2_1.CharMaterialControllerV2()),
          a.push(new CharMaterialContainerV2_1.CharMaterialContainerV2()))
        : (a.push(new CharMaterialController_1.CharMaterialController()),
          a.push(new CharMaterialContainer_1.CharMaterialContainer())),
      e)
    ) {
      case 0:
      case 1:
        a.push(new CharDitherEffect_1.CharDitherEffect()),
          a.push(new CharSceneInteraction_1.CharSceneInteraction()),
          a.push(new CharPropertyModifier_1.CharPropertyModifier()),
          a.push(new CharBodyEffect_1.CharBodyEffect()),
          a.push(new CharDecalShadow_1.CharDecalShadow()),
          a.push(new CharGrassInteraction_1.CharGrassInteraction()),
          a.push(new CharEnviInteractionEffect_1.CharEnviInteractionEffect());
        break;
      case 3:
        a.push(new CharDitherEffect_1.CharDitherEffect()),
          a.push(new CharDecalShadow_1.CharDecalShadow()),
          a.push(new CharGrassInteraction_1.CharGrassInteraction());
        break;
      case 2:
        a.push(new CharDitherEffect_1.CharDitherEffect()),
          a.push(new CharSceneInteraction_1.CharSceneInteraction()),
          a.push(new CharPropertyModifier_1.CharPropertyModifier()),
          a.push(new CharDecalShadow_1.CharDecalShadow()),
          a.push(new CharGrassInteraction_1.CharGrassInteraction());
        break;
      case 4:
        a.push(new CharDitherEffect_1.CharDitherEffect()),
          a.push(new CharSceneInteraction_1.CharSceneInteraction()),
          a.push(new CharDecalShadow_1.CharDecalShadow());
        break;
      case 5:
        a.push(new CharDitherEffect_1.CharDitherEffect());
        break;
      case 6:
        break;
      case 8:
      case 7:
        a.push(new CharDitherEffect_1.CharDitherEffect());
    }
    return a;
  }
  static GetFloat(e, r) {
    return UE.KuroCurveLibrary.GetValue_Float(e, r);
  }
  static GetColor(e, r) {
    return UE.KuroCurveLibrary.GetValue_LinearColor(e, r);
  }
  static GetFloatFromGroup(e, r) {
    switch (r.Type) {
      case 0:
        return void 0 !== e.StartConstant
          ? e.StartConstant
          : UE.KuroCurveLibrary.GetValue_Float(e.Start, r.Factor);
      case 1:
        return void 0 !== e.LoopConstant
          ? e.LoopConstant
          : UE.KuroCurveLibrary.GetValue_Float(e.Loop, r.Factor);
      case 2:
        return void 0 !== e.EndConstant
          ? e.EndConstant
          : UE.KuroCurveLibrary.GetValue_Float(e.End, r.Factor);
      default:
        return e.Loop.Constant;
    }
  }
  static GetColorFromGroup(e, r) {
    switch (r.Type) {
      case 0:
        var a = e.StartConstant;
        return void 0 !== a
          ? a
          : UE.KuroCurveLibrary.GetValue_LinearColor(e.Start, r.Factor);
      case 1:
        a = e.LoopConstant;
        return void 0 !== a
          ? a
          : UE.KuroCurveLibrary.GetValue_LinearColor(e.Loop, r.Factor);
      case 2:
        a = e.EndConstant;
        return void 0 !== a
          ? a
          : UE.KuroCurveLibrary.GetValue_LinearColor(e.End, r.Factor);
      default:
        return e.Loop.Constant;
    }
  }
  static GetTextureFromGroup(e, r) {
    switch (r.Type) {
      case 0:
        return e.Start;
      case 1:
        return e.Loop;
      case 2:
        return e.End;
      default:
        return;
    }
  }
  static Lerp(e, r, a) {
    return e + a * (r - e);
  }
  static Max(e, r) {
    return r < e ? e : r;
  }
  static Min(e, r) {
    return e < r ? e : r;
  }
  static Clamp(e, r, a) {
    let t = a <= e ? a : e <= r ? r : e;
    return t;
  }
  static LerpVector(e, r, a, t) {
    a = this.Clamp(a, 0, 1);
    (t[0] = this.Lerp(e.X, r.X, a)),
      (t[1] = this.Lerp(e.Y, r.Y, a)),
      (t[2] = this.Lerp(e.Z, r.Z, a));
  }
  static StringIsNullOrEmpty(e) {
    return 0 === e.length;
  }
  static GetSelectedChannel(e) {
    switch (e) {
      case 0:
        return new UE.LinearColor(-1, 0, 0, 0);
      case 1:
        return new UE.LinearColor(1, 0, 0, 0);
      case 2:
        return new UE.LinearColor(0, 1, 0, 0);
      case 3:
        return new UE.LinearColor(0, 0, 1, 0);
      case 4:
        return new UE.LinearColor(0, 0, 0, 1);
      default:
        return new UE.LinearColor(0, 0, 0, 0);
    }
  }
  static OpenToonSceneShadow() {
    GlobalData_1.GlobalData.World &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.ToonSceneShadowIntensity 1",
      );
  }
  static CloseToonSceneShadow() {
    GlobalData_1.GlobalData.World &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Shadow.ToonSceneShadowIntensity 0",
      );
  }
  static OpenMobileSpotLightShadow() {
    GlobalData_1.GlobalData.World &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Mobile.EnableKuroSpotlightsShadow 1",
      );
  }
  static CloseMobileSpotLightShadow() {
    GlobalData_1.GlobalData.World &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.Mobile.EnableKuroSpotlightsShadow 0",
      );
  }
  static CloseVelocityScreenSizeCull() {
    GlobalData_1.GlobalData.World &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.VelocityScreenSizeCull 0",
      );
  }
  static EnableVelocityScreenSizeCull() {
    GlobalData_1.GlobalData.World &&
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.VelocityScreenSizeCull 0.01",
      );
  }
  static BeginPSOSyncMode() {
    GlobalData_1.GlobalData.World &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderUtil", 46, "Begin pso sync mode"),
      (RenderUtil.Sel = UE.KismetSystemLibrary.GetConsoleVariableIntValue(
        "r.PSO.CompilationMode",
      )),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.PSO.CompilationMode 1",
      ),
      2 === Info_1.Info.PlatformType
        ? ((RenderUtil.qVc = UE.KismetSystemLibrary.GetConsoleVariableIntValue(
            "r.OpenGL.ProgramBinarySyncCreate",
          )),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.OpenGL.ProgramBinarySyncCreate 1",
          ))
        : 3 === Info_1.Info.PlatformType &&
          ((RenderUtil.yh_ = UE.KismetSystemLibrary.GetConsoleVariableIntValue(
            "r.DX11AsyncCompileShader",
          )),
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.DX11AsyncCompileShader 1",
          )));
  }
  static EndPSOSyncMode() {
    GlobalData_1.GlobalData.World &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderUtil", 46, "End pso sync mode"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "r.PSO.CompilationMode " + RenderUtil.Sel,
      ),
      2 === Info_1.Info.PlatformType
        ? UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.OpenGL.ProgramBinarySyncCreate " + RenderUtil.qVc,
          )
        : 3 === Info_1.Info.PlatformType &&
          UE.KismetSystemLibrary.ExecuteConsoleCommand(
            GlobalData_1.GlobalData.World,
            "r.DX11AsyncCompileShader " + RenderUtil.yh_,
          ));
  }
}
((exports.RenderUtil = RenderUtil).Sel = 0),
  (RenderUtil.qVc = 0),
  (RenderUtil.yh_ = 0);
//# sourceMappingURL=RenderUtil.js.map
