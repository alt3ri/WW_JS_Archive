"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSceneRoleActorManager = void 0);
const ue_1 = require("ue"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
class UiSceneRoleActorManager {
  static CreateUiSceneRoleActor(e) {
    this.DKe++;
    var t = ActorSystem_1.ActorSystem.Get(
      UE.TsUiSceneRoleActor_C.StaticClass(),
      new ue_1.Transform(),
      void 0,
    );
    return t.Init(this.DKe, e), this.Dxo.set(this.DKe, t), t;
  }
  static DestroyUiSceneRoleActor(e) {
    var t = this.Dxo.get(e);
    return !t || (t.Destroy(), this.Dxo.delete(e));
  }
  static ClearAllUiSceneRoleActor() {
    for (const e of this.Dxo.values()) e.Destroy();
    this.Dxo.clear();
  }
}
((exports.UiSceneRoleActorManager = UiSceneRoleActorManager).DKe = 0),
  (UiSceneRoleActorManager.Dxo = new Map());
//# sourceMappingURL=UiSceneRoleActorManager.js.map
