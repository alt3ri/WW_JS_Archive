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
  Constructor() {
    this.EffectHandleMap = void 0;
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
    var i = t.GetOwner(),
      f = new EffectRuntimeGhostEffectContext_1.EffectRuntimeGhostEffectContext(
        void 0,
      );
    let r = this.EffectDataAssetRef.ToAssetPathName();
    i instanceof TsBaseCharacter_1.default &&
      i.CharacterActorComponent?.Entity &&
      ((f.EntityId = i.CharacterActorComponent?.Entity.Id),
      (r = i.CharacterActorComponent?.GetReplaceEffect(r) ?? r)),
      (f.SkeletalMeshComp = t),
      (f.SpawnRate = this.SpawnRate),
      (f.UseSpawnRate = this.UseSpawnRate),
      (f.SpawnInterval = this.SpawnInterval),
      (f.GhostLifeTime = this.GhostLifeTime),
      (f.SourceObject = i);
    return (
      (i = EffectSystem_1.EffectSystem.SpawnEffect(
        i,
        new UE.TransformDouble(
          new UE.Rotator(),
          i.D_K2_GetActorLocation(),
          new UE.VectorDouble(1, 1, 1),
        ),
        r,
        "[AnimNotifyStateGhost.K2_NotifyBegin]",
        f,
        0,
      )) &&
        EffectSystem_1.EffectSystem.IsValid(i) &&
        (EffectSystem_1.EffectSystem.SetEffectNotRecord(i, !0),
        this.EffectHandleMap.set(t, i)),
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
