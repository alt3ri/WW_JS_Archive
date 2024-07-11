"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalUtil = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView"),
  UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager");
class PersonalUtil {
  static async PreloadRoleSequence(e, o, a) {
    if (!o.has(e)) {
      var s = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
      if (s) {
        s =
          ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
            s.ShowSequence,
          );
        if (s) {
          const m = new CustomPromise_1.CustomPromise();
          let r = void 0;
          ResourceSystem_1.ResourceSystem.LoadAsync(
            s.SequencePath,
            UE.LevelSequence,
            (e) => {
              UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(
                e,
                !0,
              ),
                (r = e),
                m.SetResult(!0);
            },
            102,
          ),
            await m.Promise;
          var s = ActorSystem_1.ActorSystem.Get(
              UE.LevelSequenceActor.StaticClass(),
              new UE.Transform(),
              void 0,
              !1,
            ),
            o =
              (s.SetSequence(r),
              o.set(e, s),
              new UE.MovieSceneSequencePlaybackSettings()),
            i =
              ((o.bRestoreState = !0),
              (o.bPauseAtEnd = !0),
              (s.PlaybackSettings = o),
              UE.NewArray(UE.SkeletalMesh));
          const l = new CustomPromise_1.CustomPromise();
          var t = s.GetBindingByTagInTemplate(
            GachaScanView_1.SCENE_ROLE_TAG,
            !0,
          );
          for (let e = 0; e < t.Num(); e++) {
            var n = t.Get(e);
            if (n) {
              var c = n.K2_GetComponentsByClass(
                UE.SkeletalMeshComponent.StaticClass(),
              );
              for (let e = 0; e < c.Num(); e++) {
                var u = c.Get(e);
                u.SetTickableWhenPaused(!0), i.Add(u.SkeletalMesh);
              }
            }
          }
          i.Num() <= 0 ||
            ((o =
              UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(
                i,
                void 0,
                () => {
                  l.SetResult();
                },
              )),
            a.set(e, o),
            await l.Promise);
        }
      }
    }
  }
}
exports.PersonalUtil = PersonalUtil;
//# sourceMappingURL=PersonalUtil.js.map
