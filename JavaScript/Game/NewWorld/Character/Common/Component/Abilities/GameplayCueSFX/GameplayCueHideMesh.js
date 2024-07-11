"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHideMesh = void 0);
const UE = require("ue");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHideMesh extends GameplayCueBase_1.GameplayCueBase {
  OnCreate() {
    this.JXo(!0);
  }
  OnDestroy() {
    this.JXo(!1);
  }
  JXo(s) {
    const a = this.ActorInternal.K2_GetComponentsByClass(
      UE.MeshComponent.StaticClass(),
    );
    for (let e = 0; e < a.Num(); e++) {
      const t = a.Get(e);
      if (
        t instanceof UE.MeshComponent &&
        t.GetName() === this.CueConfig.Parameters[0]
      ) {
        let e = (this.CueConfig.Parameters[1] ?? "1") === "1";
        s || (e = !e);
        const i = (this.CueConfig.Parameters[2] ?? "1") === "1";
        t.SetHiddenInGame(e, i);
      }
    }
  }
}
exports.GameplayCueHideMesh = GameplayCueHideMesh;
// # sourceMappingURL=GameplayCueHideMesh.js.map
