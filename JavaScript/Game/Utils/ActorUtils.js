"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorUtils = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
class ActorUtils {
  static LoadActorByModelConfig(e, r) {
    let o = e.蓝图?.ToAssetPathName();
    if (o && o.length && o !== "None") {
      o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        e.蓝图.ToAssetPathName(),
        UE.Class,
      );
      if (o?.IsValid()) {
        let e = void 0;
        return (
          (e = o.IsChildOf(UE.TsBaseItem_C.StaticClass())
            ? ActorSystem_1.ActorSystem.Get(o, r, void 0)
            : ActorSystem_1.ActorSystem.Spawn(o, r, void 0)) instanceof
            TsBaseCharacter_1.default && e.CreateAttribute(),
          e?.IsValid() &&
            (e.SetActorHiddenInGame(!0),
            e.SetActorTickEnabled(!1),
            e.SetActorEnableCollision(!1)),
          e
        );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[ActorUtils.LoadActorByModelConfig] 加载Actor失败，因为模型的蓝图没有设置。",
          ["ModelId", e.ID],
        );
  }
  static LoadActorByPath(e, r, o) {
    if (e && e.length && e !== "None") {
      const t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.Class);
      if (t?.IsValid()) {
        let e = void 0;
        return (
          (e = t.IsChildOf(UE.TsBaseItem_C.StaticClass())
            ? ActorSystem_1.ActorSystem.Get(t, r, void 0)
            : ActorSystem_1.ActorSystem.Spawn(t, r, void 0)) instanceof
            TsBaseCharacter_1.default && e.CreateAttribute(),
          e?.IsValid() &&
            (e.SetActorHiddenInGame(!0),
            e.SetActorTickEnabled(!1),
            e.SetActorEnableCollision(!1)),
          e
        );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          7,
          "[ActorUtils.LoadActorByPath] 加载Actor失败，因为模型的蓝图没有设置。",
          ["Path", e],
          ["EntityConfigId", o],
        );
  }
  static LoadAndChangeMeshAnim(e, r, o) {
    var r = r.ToAssetPathName();
    var r =
      (r?.length &&
        r !== "None" &&
        (r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          r,
          UE.SkeletalMesh,
        )) &&
        e.SkeletalMesh !== r &&
        e.SetSkeletalMesh(r),
      o.ToAssetPathName());
    r?.length &&
      r !== "None" &&
      (o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(r, UE.Class)) &&
      e.AnimClass !== o &&
      e.SetAnimClass(o);
  }
  static GetEntityByActor(e, r = !0) {
    if (
      UE.KuroStaticLibrary.IsImplementInterface(
        e?.GetClass(),
        UE.BPI_CreatureInterface_C.StaticClass(),
      )
    )
      return (
        (e = e),
        ModelManager_1.ModelManager.CreatureModel?.GetEntityById(
          e.GetEntityId(),
        )
      );
    r &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        4,
        "[WorldBridge.GetEntityByActor] Actor未实现接口CreatureInterface",
      );
  }
}
exports.ActorUtils = ActorUtils;
// # sourceMappingURL=ActorUtils.js.map
