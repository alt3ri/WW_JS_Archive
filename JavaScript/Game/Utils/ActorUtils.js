"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorUtils = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Log_1 = require("../../Core/Common/Log"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  ModelManager_1 = require("../Manager/ModelManager");
class ActorUtils {
  static LoadActorByModelConfig(e, o) {
    var t = e.蓝图?.ToAssetPathName();
    if (t && t.length && "None" !== t) {
      t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        e.蓝图.ToAssetPathName(),
        UE.Class,
      );
      if (t?.IsValid()) {
        let e = void 0;
        return (
          (e = t.IsChildOf(UE.TsBaseItem_C.StaticClass())
            ? ActorSystem_1.ActorSystem.Get(t, o, void 0)
            : ActorSystem_1.ActorSystem.Spawn(t, o, void 0))?.IsValid() &&
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
  static LoadActorByPath(e, o, t) {
    if (e && e.length && "None" !== e) {
      var r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e, UE.Class);
      if (r?.IsValid()) {
        let e = void 0;
        return (
          (e = r.IsChildOf(UE.TsBaseItem_C.StaticClass())
            ? ActorSystem_1.ActorSystem.Get(r, o, void 0)
            : ActorSystem_1.ActorSystem.Spawn(r, o, void 0))?.IsValid() &&
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
          ["EntityConfigId", t],
        );
  }
  static LoadAndChangeMeshAnim(e, o, t) {
    var o = o.ToAssetPathName(),
      o =
        (o?.length &&
          "None" !== o &&
          (o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            o,
            UE.SkeletalMesh,
          )) &&
          e.SkeletalMesh !== o &&
          e.SetSkeletalMesh(o),
        t.ToAssetPathName());
    o?.length &&
      "None" !== o &&
      (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.Class)) &&
      e.AnimClass !== t &&
      e.SetAnimClass(t);
  }
  static GetEntityByActor(e, o = !0) {
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
    o &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        4,
        "[WorldBridge.GetEntityByActor] Actor未实现接口CreatureInterface",
      );
  }
}
exports.ActorUtils = ActorUtils;
//# sourceMappingURL=ActorUtils.js.map
