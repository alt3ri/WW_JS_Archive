"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalUtil = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  CameraController_1 = require("../../../Camera/CameraController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
  GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView"),
  UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager");
class PersonalUtil {
  static async PreloadRoleSequence(e, a, o) {
    if (!a.has(e)) {
      var n = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
      if (n) {
        n =
          ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
            n.ShowSequence,
          );
        if (n) {
          const u = new CustomPromise_1.CustomPromise();
          let r = void 0;
          ResourceSystem_1.ResourceSystem.LoadAsync(
            n.SequencePath,
            UE.LevelSequence,
            (e) => {
              UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(
                e,
                !0,
              ),
                (r = e),
                u.SetResult(!0);
            },
            102,
          ),
            await u.Promise;
          var n = ActorSystem_1.ActorSystem.Spawn(
              UE.LevelSequenceActor.StaticClass(),
              new UE.TransformDouble(),
              void 0,
            ),
            a =
              (n.SetSequence(r),
              UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(r, !0),
              a.set(e, n),
              new UE.MovieSceneSequencePlaybackSettings()),
            i =
              ((a.bRestoreState = !0),
              (a.bPauseAtEnd = !0),
              (n.PlaybackSettings = a),
              UE.NewArray(UE.SkeletalMesh));
          const U = new CustomPromise_1.CustomPromise();
          var t = n.GetBindingByTagInTemplate(
            GachaScanView_1.SCENE_ROLE_TAG,
            !0,
          );
          for (let e = 0; e < t.Num(); e++) {
            var s = t.Get(e);
            if (s) {
              var l = s.K2_GetComponentsByClass(
                UE.SkeletalMeshComponent.StaticClass(),
              );
              for (let e = 0; e < l.Num(); e++) {
                var c = l.Get(e);
                c.SetTickableWhenPaused(!0), i.Add(c.SkeletalMesh);
              }
              s instanceof UE.BP_BaseRole_Seq_V2_C &&
                s.SetTickableWhenPaused(!0);
            }
          }
          i.Num() <= 0 ||
            ((a =
              UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
                i,
                void 0,
                () => {
                  U.SetResult();
                },
              )),
            o.set(e, a),
            await U.Promise);
        }
      }
    }
  }
  static PlayRoleGachaSequence(e) {
    var r = e.SceneSequenceCamera,
      a = e.UpdateInteractBp,
      o = e.RoleConfigId,
      e = e.SequenceActor,
      n = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(o);
    if (n) {
      var i = e.GetSequence(),
        i =
          (UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(i),
          CameraController_1.CameraController.SetViewTarget(
            r,
            "RoleNewJoinView.SceneSequenceCamera",
          ),
          (e.bOverrideInstanceData = !0),
          e.SetTickableWhenPaused(
            !ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ),
          e.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, r, !1, !0),
          e.DefaultInstanceData);
      const t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
        RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform(),
      );
      if (((i.TransformOrigin = t), 0 < n.BindPoint?.length))
        i.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName(n.BindPoint),
          1,
        );
      else {
        r = UE.KuroCollectActorComponent.GetActorWithTag(
          FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"),
          1,
        );
        const t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(
          r.D_GetTransform(),
        );
        i.TransformOrigin = t;
      }
      (n = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(o)),
        (r = (a.UpdateGachaShowItem(o, n.QualityId), e.SequencePlayer)),
        (i = r.GetStartTime().Time);
      r.SetPlaybackPosition(
        new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 1),
      ),
        r.PlayTo(new UE.MovieSceneSequencePlaybackParams(i, 0, "A", 2, 0));
    }
  }
}
exports.PersonalUtil = PersonalUtil;
//# sourceMappingURL=PersonalUtil.js.map
