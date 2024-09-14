"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueManipulateInteract = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueManipulateInteract extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.g1t = void 0),
      (this.sYo = []),
      (this.c$o = void 0);
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    (this.g1t = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket)),
      (this.sYo = this.CueConfig.Resources),
      (this.c$o = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        this.ActorInternal.GetTransform(),
      )),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        this.c$o.SetActorLabel(
          this.ActorInternal.GetActorLabel() +
            ":" +
            GameplayCueManipulateInteract.name,
        ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.sYo[0],
        UE.NiagaraSystem,
        (e) => {
          var t = this.c$o.AddComponentByClass(
            UE.NiagaraComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          );
          t.SetAsset(e),
            t.SetNiagaraVariableVec3("End", this.GetTargetPosition()),
            this.c$o.K2_AttachToComponent(
              this.ActorInternal.Mesh,
              this.g1t,
              2,
              2,
              2,
              !1,
            );
        },
      );
  }
  OnDestroy() {
    ActorSystem_1.ActorSystem.Put(this.c$o);
  }
  GetTargetPosition() {
    return this.EntityHandle.Entity.GetComponent(58)
      .GetTargetLocation()
      .ToUeVector();
  }
}
exports.GameplayCueManipulateInteract = GameplayCueManipulateInteract;
//# sourceMappingURL=GameplayCueManipulateInteract.js.map
