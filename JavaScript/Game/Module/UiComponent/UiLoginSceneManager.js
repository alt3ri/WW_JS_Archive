"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiLoginSceneManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  CameraController_1 = require("../../Camera/CameraController"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  LoginDefine_1 = require("../Login/Data/LoginDefine"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil"),
  UiSceneRoleActorManager_1 = require("./UiSceneRoleActorManager"),
  SEQUENCE_CAMERA_TAG = new UE.FName("SequenceCamera"),
  CINEMATIC_TICK_TAG = new UE.FName("CinematicTick"),
  SPOT_LIGHT1_TAG = new UE.FName("SpotLight1"),
  SPOT_LIGHT2_TAG = new UE.FName("SpotLight2");
class UiLoginSceneManager {
  static GetRoleObserver(e) {
    let n = UiLoginSceneManager.iPo.get(e);
    return (
      !n &&
        GlobalData_1.GlobalData.World &&
        ((n =
          UiSceneRoleActorManager_1.UiSceneRoleActorManager.CreateUiSceneRoleActor(
            0,
          )),
        UiLoginSceneManager.iPo.set(e, n)),
      n
    );
  }
  static oPo() {
    for (var [, e] of UiLoginSceneManager.iPo) {
      e = e.GetRoleActorIndex();
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
        e,
      );
    }
    (UiLoginSceneManager.rPo = []), UiLoginSceneManager.iPo.clear();
  }
  static InitCinematicTick() {
    (UiLoginSceneManager.nPo = ActorSystem_1.ActorSystem.Get(
      UE.BP_Cinematics_Tick_C.StaticClass(),
      new UE.Transform(),
    )),
      (UiLoginSceneManager.sPo = ActorSystem_1.ActorSystem.Get(
        UE.SpotLight.StaticClass(),
        new UE.Transform(),
      )),
      (UiLoginSceneManager.aPo = ActorSystem_1.ActorSystem.Get(
        UE.SpotLight.StaticClass(),
        new UE.Transform(),
      ));
  }
  static hPo() {
    var e =
        ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles(),
      n = e[LoginDefine_1.ELoginSex.Girl],
      e = e[LoginDefine_1.ELoginSex.Boy];
    (UiLoginSceneManager.nPo.UISceneRole_2 = this.lPo(e)),
      (UiLoginSceneManager.nPo.UISceneRole = this.lPo(n)),
      (UiLoginSceneManager.nPo.Is_Tick = 1);
  }
  static lPo(e) {
    return UiLoginSceneManager.iPo.get(e).Model?.CheckGetComponent(1)
      ?.MainMeshComponent;
  }
  static _Po() {
    UiLoginSceneManager.nPo &&
      (ActorSystem_1.ActorSystem.Put(UiLoginSceneManager.nPo),
      (UiLoginSceneManager.nPo = void 0)),
      UiLoginSceneManager.sPo &&
        (ActorSystem_1.ActorSystem.Put(UiLoginSceneManager.sPo),
        (UiLoginSceneManager.sPo = void 0)),
      UiLoginSceneManager.aPo &&
        (ActorSystem_1.ActorSystem.Put(UiLoginSceneManager.aPo),
        (UiLoginSceneManager.aPo = void 0));
  }
  static InitRoleObservers() {
    UiLoginSceneManager.oPo();
    var e =
        ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles(),
      n = e[LoginDefine_1.ELoginSex.Girl],
      n =
        (UiLoginSceneManager.uPo(n, "GirlCase"),
        e[LoginDefine_1.ELoginSex.Boy]);
    UiLoginSceneManager.uPo(n, "BoyCase");
  }
  static uPo(e, n) {
    const i = UiLoginSceneManager.GetRoleObserver(e),
      a = i.Model;
    a.CheckGetComponent(12)?.LoadModelByRoleConfigId(e, !1, () => {
      UiModelUtil_1.UiModelUtil.SetVisible(a, !0),
        a.CheckGetComponent(15).SetActive(!0),
        a.CheckGetComponent(13)?.SetState(11),
        i.Model?.CheckGetComponent(1)?.SetTransformByTag(n),
        UiLoginSceneManager.rPo.push(e),
        2 <= UiLoginSceneManager.rPo.length && UiLoginSceneManager.hPo();
    });
  }
  static PlayRoleMontage(e, n) {
    UiLoginSceneManager.GetRoleObserver(e)
      .Model?.CheckGetComponent(13)
      ?.SetState(n);
  }
  static SetRoleRenderingMaterial(e, n) {
    e = UiLoginSceneManager.GetRoleObserver(e);
    return UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e.Model, n) ?? 0;
  }
  static RemoveRoleRenderingMaterial(e, n) {
    e = UiLoginSceneManager.GetRoleObserver(e);
    UiModelUtil_1.UiModelUtil.RemoveRenderingMaterial(e.Model, n);
  }
  static RemoveRoleRenderingMaterialWithEnding(e, n) {
    UiLoginSceneManager.GetRoleObserver(e)
      .Model?.CheckGetComponent(5)
      ?.RemoveRenderingMaterialWithEnding(n);
  }
  static SetHuluRenderingMaterial(e, n) {
    e = UiLoginSceneManager.GetRoleObserver(e)
      .Model.CheckGetComponent(15)
      .GetHuluHandle();
    return UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e.Model, n);
  }
  static RemoveHuluRenderingMaterialWithEnding(e, n) {
    UiLoginSceneManager.GetRoleObserver(e)
      .Model.CheckGetComponent(15)
      .GetHuluHandle()
      .Model.CheckGetComponent(5)
      .RemoveRenderingMaterialWithEnding(n);
  }
  static SetBurstEyeMaterialId(e) {
    this.cPo = e;
  }
  static GetBurstEyeMaterialId() {
    return this.cPo;
  }
  static LoadSequenceAsync(e, a = void 0, r = !1, o = void 0) {
    const g = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    ResourceSystem_1.ResourceSystem.LoadAsync(g, UE.LevelSequence, (e) => {
      var n, i;
      e?.IsValid()
        ? (o && o?.(),
          (n = (0, puerts_1.$ref)(void 0)),
          UE.LevelSequencePlayer.CreateLevelSequencePlayer(
            GlobalData_1.GlobalData.World,
            e,
            new UE.MovieSceneSequencePlaybackSettings(),
            n,
          ),
          (e = (0, puerts_1.$unref)(n)).ResetBindings(),
          (n = e.GetSequence()).HasBindingTag(SEQUENCE_CAMERA_TAG, !0) &&
            ((i =
              CameraController_1.CameraController.WidgetCamera.GetComponent(
                12,
              ).CineCamera),
            e.AddBindingByTag(SEQUENCE_CAMERA_TAG, i)),
          UiLoginSceneManager.nPo &&
            n.HasBindingTag(CINEMATIC_TICK_TAG, !0) &&
            e.AddBindingByTag(CINEMATIC_TICK_TAG, UiLoginSceneManager.nPo),
          UiLoginSceneManager.sPo &&
            n.HasBindingTag(SPOT_LIGHT1_TAG, !0) &&
            e.AddBindingByTag(SPOT_LIGHT1_TAG, UiLoginSceneManager.sPo),
          UiLoginSceneManager.aPo &&
            n.HasBindingTag(SPOT_LIGHT2_TAG, !0) &&
            e.AddBindingByTag(SPOT_LIGHT2_TAG, UiLoginSceneManager.aPo),
          a && e.SequencePlayer.OnFinished.Add(a),
          r ? e.SequencePlayer.PlayReverse() : e.SequencePlayer.Play(),
          this.mPo && (this.mPo.SequencePlayer.StopAtCurrentTime(), this.dPo()))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiLoginSceneManager",
              11,
              "登录场景Sequence异步加载失败",
              ["path", g],
            ),
          o && o?.(),
          a?.());
    });
  }
  static PlayLoginLoopSequence() {
    const i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "LevelSequence_Login",
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, (e) => {
      var n;
      e?.IsValid()
        ? ((n = (0, puerts_1.$ref)(void 0)),
          UE.LevelSequencePlayer.CreateLevelSequencePlayer(
            GlobalData_1.GlobalData.World,
            e,
            new UE.MovieSceneSequencePlaybackSettings(),
            n,
          ),
          (UiLoginSceneManager.mPo = (0, puerts_1.$unref)(n)),
          UiLoginSceneManager.mPo.ResetBindings(),
          (e =
            CameraController_1.CameraController.WidgetCamera.GetComponent(
              12,
            ).CineCamera),
          UiLoginSceneManager.mPo.AddBindingByTag(SEQUENCE_CAMERA_TAG, e),
          UiLoginSceneManager.mPo.SequencePlayer.PlayLooping(),
          CameraController_1.CameraController.EnterCameraMode(2),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiLoginSceneManager", 11, "播放进入循环缓动镜头"))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiLoginSceneManager",
            11,
            "登录场景Sequence异步加载失败",
            ["path", i],
          );
    });
  }
  static dPo() {
    var e,
      n = UE.GameplayStatics.GetPlayerController(
        GlobalData_1.GlobalData.World,
        0,
      );
    n
      ? ((e =
          CameraController_1.CameraController.WidgetCamera.GetComponent(
            12,
          ).CineCamera),
        n.SetViewTargetWithBlend(e, 0.5, 0, 0, !0, !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiLoginSceneManager",
          11,
          "[BlendCameraSequence]混合相机动画失败",
        );
  }
  static Destroy() {
    UiLoginSceneManager.oPo(),
      UiLoginSceneManager._Po(),
      UiLoginSceneManager.mPo &&
        (UiLoginSceneManager.mPo.K2_DestroyActor(),
        (UiLoginSceneManager.mPo = void 0));
  }
}
((exports.UiLoginSceneManager = UiLoginSceneManager).iPo = new Map()),
  (UiLoginSceneManager.nPo = void 0),
  (UiLoginSceneManager.sPo = void 0),
  (UiLoginSceneManager.aPo = void 0),
  (UiLoginSceneManager.cPo = 0),
  (UiLoginSceneManager.rPo = []),
  (UiLoginSceneManager.mPo = void 0);
//# sourceMappingURL=UiLoginSceneManager.js.map
