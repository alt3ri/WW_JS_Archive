"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GlobalData = void 0);
const UE = require("ue");
class GlobalData {
  constructor() {}
  static Init(t) {
    (this.f8 = t),
      (this.IMe = UE.KuroStaticLibrary.IsEditor(t.GetWorld())),
      (this.TMe = UE.NewObject(UE.BP_EventManager_C.StaticClass())),
      (this.LMe = UE.NewObject(UE.BP_FightManager_C.StaticClass()));
  }
  static SetUiState(t) {
    this.DMe = t;
  }
  static get IsUiSceneLoading() {
    return this.DMe === 1;
  }
  static get IsUiSceneOpen() {
    return this.DMe === 2;
  }
  static get IsPlayInEditor() {
    return this.IMe;
  }
  static get GameInstance() {
    return this.f8;
  }
  static get World() {
    return this.f8?.GetWorld();
  }
  static get BpEventManager() {
    return this.TMe;
  }
  static get BpFightManager() {
    return this.LMe;
  }
  static get IsEs3() {
    return (
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
        this.World,
      ) === 0
    );
  }
  static get IsSm5() {
    return (
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
        this.World,
      ) === 1
    );
  }
  static Networking() {
    return (
      void 0 === this.RMe && (this.RMe = UE.Actor.GetKuroNetMode() === 1),
      this.RMe
    );
  }
  static IsRunWithEditorStartConfig() {
    let t;
    return (
      void 0 === this.UMe &&
        (this.IsPlayInEditor ||
        UE.KuroStaticLibrary.IsBuildShipping() ||
        UE.GameplayStatics.GetPlatformName() !== "Windows"
          ? (this.UMe = !1)
          : ((t =
              UE.BlueprintPathsLibrary.ProjectDir() +
              "../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json"),
            (this.UMe =
              UE.KismetSystemLibrary.GetCommandLine().search(
                "-StartWithEditorConfig",
              ) >= 0 && UE.BlueprintPathsLibrary.FileExists(t)))),
      this.UMe
    );
  }
  static get IsSceneClearing() {
    return void 0 !== GlobalData.ClearSceneDone;
  }
}
((exports.GlobalData = GlobalData).RMe = void 0),
  (GlobalData.UMe = void 0),
  (GlobalData.ClearSceneDone = void 0);
// # sourceMappingURL=GlobalData.js.map
