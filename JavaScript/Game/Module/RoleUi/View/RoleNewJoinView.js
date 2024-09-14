"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleNewJoinView = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  CameraController_1 = require("../../../Camera/CameraController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  BlackScreenController_1 = require("../../BlackScreen/BlackScreenController"),
  GachaDefine_1 = require("../../Gacha/GachaDefine"),
  GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager"),
  SimpleGenericLayout_1 = require("../../Util/Layout/SimpleGenericLayout"),
  RoleController_1 = require("../RoleController");
class RoleNewJoinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.SPe = void 0),
      (this.UiCameraHandleData = void 0),
      (this.b2t = void 0),
      (this.eKt = void 0),
      (this.tKt = void 0),
      (this.iKt = void 0),
      (this.oKt = void 0),
      (this.exe = void 0),
      (this.hKt = void 0),
      (this.$be = void 0),
      (this.ENn =
        UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue),
      (this.lKt = 0),
      (this.l0o = !1),
      (this.OnSequenceEventByStringParam = (e) => {
        switch (e) {
          case "Flash1":
            this.eKt.NiagaraComponent.ReinitializeSystem();
            break;
          case "Flash2":
            5 === this.lKt
              ? (this.tKt.SetActorHiddenInGame(!1),
                this.tKt?.NiagaraComponent.ReinitializeSystem())
              : 4 === this.lKt
                ? (this.iKt.SetActorHiddenInGame(!1),
                  this.iKt?.NiagaraComponent.ReinitializeSystem())
                : 3 === this.lKt &&
                  (this.oKt.SetActorHiddenInGame(!1),
                  this.oKt?.NiagaraComponent.ReinitializeSystem());
        }
      }),
      (this.CloseViewEvent = () => {
        this.wKt();
      }),
      (this.wKt = () => {
        this.BKt(!0);
      }),
      (this.BKt = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Gacha", 28, "GachaScene被关闭"),
          e &&
            (UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.AfterCloseGachaScene,
            ));
      }),
      (this._0o = () => {
        this.$ne();
      }),
      (this.Cho = () => {
        this.l0o || ((this.l0o = !0), this.u0o());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [6, this.Cho],
        [7, this._0o],
      ]);
  }
  OnBeforeCreate() {
    (this.dFe = this.OpenParam),
      (this.lKt = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
        this.dFe,
      ).QualityId);
  }
  async OnCreateAsync() {
    await Promise.all([
      ModelManager_1.ModelManager.GachaModel.PreloadGachaSequence([this.dFe]),
      BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
        "Start",
        "RoleNewJoinView",
      ),
    ]);
  }
  async OnBeforeStartAsync() {
    await this.yNn();
  }
  async yNn() {
    var e = this.dFe,
      e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e),
      e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
        e.ShowSequence,
      ),
      e = ModelManager_1.ModelManager.GachaModel.GetLoadedSequence(
        e.SequencePath,
      ),
      i =
        ((this.b2t = ActorSystem_1.ActorSystem.Get(
          UE.LevelSequenceActor.StaticClass(),
          new UE.Transform(),
          void 0,
          !1,
        )),
        this.b2t.SetSequence(e),
        UE.NewArray(UE.SkeletalMesh));
    const t = new CustomPromise_1.CustomPromise();
    var s = this.b2t.GetBindingByTagInTemplate(
      GachaScanView_1.SCENE_ROLE_TAG,
      !0,
    );
    for (let e = 0; e < s.Num(); e++) {
      var r = s.Get(e);
      if (r) {
        var a = r.K2_GetComponentsByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        );
        for (let e = 0; e < a.Num(); e++) {
          var o = a.Get(e);
          i.Add(o.SkeletalMesh);
        }
      }
    }
    i.Num() <= 0 ||
      ((this.ENn =
        UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
          i,
          void 0,
          () => {
            t.SetResult();
          },
        )),
      await t.Promise);
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(
      this.GetHorizontalLayout(4),
    );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.OnSequenceEventByStringParam,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseGachaSceneView,
        this.CloseViewEvent,
      );
  }
  OnAfterShow() {
    (this.l0o = !1), this.bl();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlaySequenceEventByStringParam,
      this.OnSequenceEventByStringParam,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseGachaSceneView,
        this.CloseViewEvent,
      );
  }
  OnBeforeDestroy() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(
      this.UiCameraHandleData,
      GachaDefine_1.GACHA_BLEND_CAMERA,
    ),
      this.ENn ===
        UiModelResourcesManager_1.UiModelResourcesManager
          .StreamingInvalidValue &&
        (UiModelResourcesManager_1.UiModelResourcesManager.ReleaseMeshesComponentsBundleStreaming(
          this.ENn,
        ),
        (this.ENn =
          UiModelResourcesManager_1.UiModelResourcesManager.StreamingInvalidValue)),
      this.DKt(),
      this.hKt?.EndGachaScene(),
      ModelManager_1.ModelManager.GachaModel.ReleaseLoadGachaSequence();
  }
  OnHandleLoadScene() {
    (this.exe = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"),
      0,
    )),
      (this.eKt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("Flash1"),
        0,
      )),
      (this.tKt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstGold"),
        0,
      )),
      (this.iKt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstPurple"),
        0,
      )),
      (this.oKt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("BurstWhite"),
        0,
      )),
      (this.hKt = UE.KuroCollectActorComponent.GetActorWithTag(
        FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"),
        0,
      )),
      this.hKt.SetTickableWhenPaused(!0),
      this.eKt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.tKt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.iKt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1),
      this.oKt.K2_AttachToActor(this.exe, void 0, 2, 2, 2, !1);
    var e = new UE.Vector(200, 0, 0),
      i = new UE.Vector(60, 0, 0),
      t = new UE.Rotator(0, 90, 0);
    this.eKt.K2_SetActorRelativeLocation(i, !1, void 0, !1),
      this.tKt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.iKt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.oKt.K2_SetActorRelativeLocation(e, !1, void 0, !1),
      this.eKt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.tKt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.iKt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      this.oKt.K2_SetActorRelativeRotation(t, !1, void 0, !1),
      (this.UiCameraHandleData =
        UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(
          GachaDefine_1.GACHA_WEAPON_CAMERA,
          !0,
          !0,
          GachaDefine_1.GACHA_BLEND_CAMERA,
        ));
  }
  bl() {
    this.yKt(),
      this.Og(),
      this.RefreshModel(),
      this.UiViewSequence.StopPrevSequence(!1),
      this.UiViewSequence.PlaySequence("Show", !0);
  }
  Og() {
    var e,
      i = this.dFe,
      i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(i),
      t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(
        i.ElementId,
      );
    t &&
      (this.GetTexture(3).SetColor(UE.Color.FromHex(t.ElementColor)),
      (e = this.GetTexture(2)),
      this.SetTextureByPath(t.Icon, e),
      (t = UE.Color.FromHex(t.ElementColor)),
      e.SetColor(t)),
      this.GetText(0).ShowTextNew(i.Name),
      this.GetText(5).ShowTextNew(i.Introduction),
      this.$be.RebuildLayout(this.lKt),
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "Close",
        "RoleNewJoinView",
      );
  }
  RefreshModel() {
    var e,
      i = this.dFe,
      i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(i),
      t =
        (CameraController_1.CameraController.SetViewTarget(
          this.exe,
          "RoleNewJoinView.RefreshModel",
        ),
        new UE.MovieSceneSequencePlaybackSettings());
    (t.bRestoreState = !0),
      (t.bPauseAtEnd = !0),
      (this.b2t.PlaybackSettings = t),
      this.b2t.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, this.exe),
      (this.SPe = this.b2t.SequencePlayer),
      RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow
        ? 0 < i.BindPoint?.length
          ? ((this.b2t.bOverrideInstanceData = !0),
            (this.b2t.DefaultInstanceData.TransformOriginActor =
              UE.KuroCollectActorComponent.GetActorWithTag(
                FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
                1,
              )))
          : ((this.b2t.bOverrideInstanceData = !0),
            (t = this.b2t.DefaultInstanceData),
            (e = UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
              1,
            )),
            (t.TransformOrigin = e.GetTransform()))
        : 0 < i.BindPoint?.length &&
          ((this.b2t.bOverrideInstanceData = !0),
          (this.b2t.DefaultInstanceData.TransformOriginActor =
            UE.KuroCollectActorComponent.GetActorWithTag(
              FNameUtil_1.FNameUtil.GetDynamicFName(i.BindPoint),
              1,
            ))),
      this.SPe.PlayTo(
        new UE.MovieSceneSequencePlaybackParams(
          new UE.FrameTime(),
          0,
          "A",
          2,
          0,
        ),
      ),
      this.RKt();
  }
  RKt() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(this.dFe);
    1302 === e.Id
      ? this.hKt?.Yinlin()
      : 1404 === e.Id
        ? this.hKt?.Jiyan()
        : 1203 === e.Id
          ? this.hKt?.Anke()
          : 1503 === e.Id
            ? this.hKt?.Jueyuan()
            : 1301 === e.Id
              ? this.hKt?.Kakaluo()
              : 1603 === e.Id
                ? this.hKt?.Chun()
                : 1104 === e.Id
                  ? this.hKt?.Awu()
                  : 5 === e.QualityId
                    ? this.hKt?.CharacterGolden()
                    : 4 === e.QualityId && this.hKt?.CharacterPurple();
  }
  yKt() {
    this.tKt.SetActorHiddenInGame(!0),
      this.iKt.SetActorHiddenInGame(!0),
      this.oKt.SetActorHiddenInGame(!0),
      this.tKt.NiagaraComponent?.Deactivate(),
      this.iKt.NiagaraComponent?.Deactivate(),
      this.oKt.NiagaraComponent?.Deactivate();
  }
  DKt() {
    if (
      (this.SPe &&
        (this.SPe.OnStop.Clear(), this.SPe.Stop(), (this.SPe = void 0)),
      this.b2t?.IsValid())
    ) {
      const e = this.b2t;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(e);
      }),
        (this.b2t = void 0);
    }
  }
  $ne() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.CloseGachaSceneView,
    );
  }
  async u0o() {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
      "Start",
      "RoleNewJoinView",
    );
    var e = [this.dFe];
    RoleController_1.RoleController.CloseAndOpenRoleMainView(
      this.Info.Name,
      0,
      this.dFe,
      e,
      void 0,
      () => {
        BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
          "Close",
          "RoleNewJoinView",
        ),
          this.$ne();
      },
    );
  }
}
exports.RoleNewJoinView = RoleNewJoinView;
//# sourceMappingURL=RoleNewJoinView.js.map
