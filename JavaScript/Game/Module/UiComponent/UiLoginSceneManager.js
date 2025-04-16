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
  UiModelResourcesManager_1 = require("./UiModelResourcesManager"),
  UiSceneRoleActorManager_1 = require("./UiSceneRoleActorManager"),
  SEQUENCE_CAMERA_TAG = new UE.FName("SequenceCamera"),
  CINEMATIC_TICK_TAG = new UE.FName("CinematicTick"),
  SPOT_LIGHT1_TAG = new UE.FName("SpotLight1"),
  SPOT_LIGHT2_TAG = new UE.FName("SpotLight2");
class UiLoginSceneManager {
  static GetRoleObserver(e) {
    let n = UiLoginSceneManager.ZPo.get(e);
    return (
      !n &&
        GlobalData_1.GlobalData.World &&
        ((n =
          UiSceneRoleActorManager_1.UiSceneRoleActorManager.CreateUiSceneRoleActor(
            0,
          )),
        UiLoginSceneManager.ZPo.set(e, n)),
      n
    );
  }
  static exo() {
    for (const n of this.bwa)
      UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
        n,
      );
    for (var [, e] of UiLoginSceneManager.ZPo) {
      e = e.GetRoleActorIndex();
      UiSceneRoleActorManager_1.UiSceneRoleActorManager.DestroyUiSceneRoleActor(
        e,
      );
    }
    (UiLoginSceneManager.txo = []), UiLoginSceneManager.ZPo.clear();
  }
  static InitCinematicTick() {
    (UiLoginSceneManager.ixo = ActorSystem_1.ActorSystem.Get(
      UE.BP_Cinematics_Tick_C.StaticClass(),
      new UE.TransformDouble(),
    )),
      (UiLoginSceneManager.oxo = ActorSystem_1.ActorSystem.Get(
        UE.SpotLight.StaticClass(),
        new UE.TransformDouble(),
      )),
      (UiLoginSceneManager.rxo = ActorSystem_1.ActorSystem.Get(
        UE.SpotLight.StaticClass(),
        new UE.TransformDouble(),
      ));
  }
  static nxo() {
    var e =
        ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles(),
      n = e[LoginDefine_1.ELoginSex.Girl],
      e = e[LoginDefine_1.ELoginSex.Boy];
    (UiLoginSceneManager.ixo.UISceneRole_2 = this.sxo(e)),
      (UiLoginSceneManager.ixo.UISceneRole = this.sxo(n)),
      (UiLoginSceneManager.ixo.Is_Tick = 1);
  }
  static sxo(e) {
    return UiLoginSceneManager.ZPo.get(e).Model?.CheckGetComponent(1)
      ?.MainMeshComponent;
  }
  static axo() {
    UiLoginSceneManager.ixo &&
      (ActorSystem_1.ActorSystem.Put(
        "UiLoginSceneManager.DestroyCinematicTick1",
        UiLoginSceneManager.ixo,
      ),
      (UiLoginSceneManager.ixo = void 0)),
      UiLoginSceneManager.oxo &&
        (ActorSystem_1.ActorSystem.Put(
          "UiLoginSceneManager.DestroyCinematicTick2",
          UiLoginSceneManager.oxo,
        ),
        (UiLoginSceneManager.oxo = void 0)),
      UiLoginSceneManager.rxo &&
        (ActorSystem_1.ActorSystem.Put(
          "UiLoginSceneManager.DestroyCinematicTick3",
          UiLoginSceneManager.rxo,
        ),
        (UiLoginSceneManager.rxo = void 0));
  }
  static InitRoleObservers(e) {
    (UiLoginSceneManager.VO_ = e), UiLoginSceneManager.exo();
    var e =
        ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles(),
      n = e[LoginDefine_1.ELoginSex.Girl],
      n =
        (UiLoginSceneManager.hxo(n, "GirlCase"),
        e[LoginDefine_1.ELoginSex.Boy]);
    UiLoginSceneManager.hxo(n, "BoyCase");
  }
  static hxo(n, i) {
    const a = UiLoginSceneManager.GetRoleObserver(n),
      r = a.Model;
    var e = r.CheckGetComponent(13);
    const o = () => {
      r.CheckGetComponent(16).SetActive(!0);
    };
    e?.LoadModelByRoleConfigId(n, -1, !1, () => {
      var e = r
          .CheckGetComponent(16)
          .GetHuluHandle()
          .Model.CheckGetComponent(2)
          .GetModelAllMesh(),
        e =
          UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
            e,
            void 0,
            o,
          );
      this.bwa.push(e), UiModelUtil_1.UiModelUtil.SetVisible(r, !0);
      r.CheckGetComponent(14)?.SetState(11);
      e = a.Model?.CheckGetComponent(1);
      e?.SetTransformByTag(i),
        (e.MainMeshComponent.KuroLodMask = 1),
        (e.MainMeshComponent.KuroAnimInstanceLod = 1),
        UiLoginSceneManager.txo.push(n),
        2 <= UiLoginSceneManager.txo.length &&
          (UiLoginSceneManager.nxo(),
          UiLoginSceneManager.VO_?.(),
          (UiLoginSceneManager.VO_ = void 0));
    });
  }
  static PlayRoleMontage(e, n) {
    UiLoginSceneManager.GetRoleObserver(e)
      .Model?.CheckGetComponent(14)
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
      .Model.CheckGetComponent(16)
      .GetHuluHandle();
    return UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e.Model, n);
  }
  static RemoveHuluRenderingMaterialWithEnding(e, n) {
    UiLoginSceneManager.GetRoleObserver(e)
      .Model.CheckGetComponent(16)
      .GetHuluHandle()
      .Model.CheckGetComponent(5)
      .RemoveRenderingMaterialWithEnding(n);
  }
  static SetBurstEyeMaterialId(e) {
    this.lxo = e;
  }
  static GetBurstEyeMaterialId() {
    return this.lxo;
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
          UiLoginSceneManager.ixo &&
            n.HasBindingTag(CINEMATIC_TICK_TAG, !0) &&
            e.AddBindingByTag(CINEMATIC_TICK_TAG, UiLoginSceneManager.ixo),
          UiLoginSceneManager.oxo &&
            n.HasBindingTag(SPOT_LIGHT1_TAG, !0) &&
            e.AddBindingByTag(SPOT_LIGHT1_TAG, UiLoginSceneManager.oxo),
          UiLoginSceneManager.rxo &&
            n.HasBindingTag(SPOT_LIGHT2_TAG, !0) &&
            e.AddBindingByTag(SPOT_LIGHT2_TAG, UiLoginSceneManager.rxo),
          a && e.SequencePlayer.OnFinished.Add(a),
          r ? e.SequencePlayer.PlayReverse() : e.SequencePlayer.Play(),
          this._xo && (this._xo.SequencePlayer.StopAtCurrentTime(), this.uxo()))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiLoginSceneManager",
              10,
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
          (UiLoginSceneManager._xo = (0, puerts_1.$unref)(n)),
          UiLoginSceneManager._xo.ResetBindings(),
          (e =
            CameraController_1.CameraController.WidgetCamera.GetComponent(
              12,
            ).CineCamera),
          UiLoginSceneManager._xo.AddBindingByTag(SEQUENCE_CAMERA_TAG, e),
          UiLoginSceneManager._xo.SequencePlayer.PlayLooping(),
          CameraController_1.CameraController.EnterCameraMode(2),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("UiLoginSceneManager", 10, "播放进入循环缓动镜头"))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiLoginSceneManager",
            10,
            "登录场景Sequence异步加载失败",
            ["path", i],
          );
    });
  }
  static uxo() {
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
          10,
          "[BlendCameraSequence]混合相机动画失败",
        );
  }
  static Destroy() {
    UiLoginSceneManager.exo(),
      UiLoginSceneManager.axo(),
      UiLoginSceneManager._xo &&
        (UiLoginSceneManager._xo.K2_DestroyActor(),
        (UiLoginSceneManager._xo = void 0));
  }
}
((exports.UiLoginSceneManager = UiLoginSceneManager).ZPo = new Map()),
  (UiLoginSceneManager.ixo = void 0),
  (UiLoginSceneManager.oxo = void 0),
  (UiLoginSceneManager.rxo = void 0),
  (UiLoginSceneManager.lxo = 0),
  (UiLoginSceneManager.txo = []),
  (UiLoginSceneManager.bwa = []),
  (UiLoginSceneManager.VO_ = void 0),
  (UiLoginSceneManager._xo = void 0);
//# sourceMappingURL=UiLoginSceneManager.js.map
