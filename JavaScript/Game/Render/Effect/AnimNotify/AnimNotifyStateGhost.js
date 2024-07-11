"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EffectRuntimeGhostEffectContext_1 = require("../../../Effect/EffectContext/EffectRuntimeGhostEffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem");
class AnimNotifyStateGhost extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.EffectDataAssetRef = void 0),
      (this.SpawnRate = -0),
      (this.UseSpawnRate = !0),
      (this.SpawnInterval = -0),
      (this.GhostLifeTime = -0),
      (this.EffectHandleMap = void 0);
  }
  GetNotifyName() {
    return "角色残影";
  }
  K2_ValidateAssets() {
    return !0;
  }
  K2_NotifyBegin(t, e, s) {
    this.EffectHandleMap || (this.EffectHandleMap = new Map()),
      EffectSystem_1.EffectSystem.InitializeWithPreview(!1);
    var f = t.GetOwner(),
      i = new EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext(
        void 0,
      );
    f instanceof TsBaseCharacter_1.default &&
      f.CharacterActorComponent?.Entity &&
      (i.EntityId = f.CharacterActorComponent?.Entity.Id),
      (i.SkeletalMeshComp = t),
      (i.SpawnRate = this.SpawnRate),
      (i.UseSpawnRate = this.UseSpawnRate),
      (i.SpawnInterval = this.SpawnInterval),
      (i.GhostLifeTime = this.GhostLifeTime),
      (i.SourceObject = f);
    return (
      (f = EffectSystem_1.EffectSystem.SpawnEffect(
        f,
        new UE.Transform(
          new UE.Rotator(),
          f.K2_GetActorLocation(),
          new UE.Vector(1, 1, 1),
        ),
        this.EffectDataAssetRef.ToAssetPathName(),
        "[AnimNotifyStateGhost.K2_NotifyBegin]",
        i,
        0,
      )) &&
        EffectSystem_1.EffectSystem.IsValid(f) &&
        (EffectSystem_1.EffectSystem.SetEffectNotRecord(f, !0),
        this.EffectHandleMap.set(t, f)),
      !1
    );
  }
  K2_NotifyEnd(t, e) {
    var s = this.EffectHandleMap.get(t);
    return (
      s &&
        EffectSystem_1.EffectSystem.IsValid(s) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          s,
          "[AnimNotifyStateGhost.K2_NotifyEnd]",
          !1,
        ),
      this.EffectHandleMap.delete(t),
      !0
    );
  }
}
exports.default = AnimNotifyStateGhost;
//# sourceMappingURL=AnimNotifyStateGhost.js.map
