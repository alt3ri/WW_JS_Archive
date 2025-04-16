"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  UiModelSystem_1 = require("../UiModel/UiModel/UiModelSystem");
class TsUiSceneDangoActor extends UE.Actor {
  constructor() {
    super(...arguments), (this.Model = void 0), (this.ActorIndex = 0);
  }
  Constructor() {
    (this.Model = void 0), (this.ActorIndex = 0);
  }
  Init(t, e) {
    (this.ActorIndex = t),
      this.SetTickableWhenPaused(!0),
      this.SetActorTickEnabled(!0),
      UE.KuroRenderingRuntimeBPPluginBPLibrary.SetActorUISceneRendering(
        this,
        !0,
      ),
      (this.Model = UiModelSystem_1.UiModelSystem.CreateUiModelByUseWay(
        e,
        this,
      )),
      this.Model?.Init(),
      this.Model?.Start(),
      this.SetPrimitiveEntityType(1);
  }
  ReceiveTick(t) {
    this.Model?.Tick(t);
  }
  GetActorIndex() {
    return this.ActorIndex;
  }
  SetState(t, e = 0, s = 0) {
    this.GetStateMachine()?.SetState(t, e, s);
  }
  GetStateMachine() {
    return this.Model?.CheckGetComponent(25);
  }
  Destroy() {
    this.Model?.End(),
      this.Model?.Clear(),
      (this.Model = void 0),
      (this.ActorIndex = 0),
      ActorSystem_1.ActorSystem.Put("TsUiSceneDangoActor.Destroy", this);
  }
}
exports.default = TsUiSceneDangoActor;
//# sourceMappingURL=TsUiSceneDangoActor.js.map
