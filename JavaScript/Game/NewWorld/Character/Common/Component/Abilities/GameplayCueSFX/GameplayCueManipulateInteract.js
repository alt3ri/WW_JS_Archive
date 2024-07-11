"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueManipulateInteract = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../../../GlobalData");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueManipulateInteract extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.olt = void 0),
      (this.l$o = []),
      (this.CXo = void 0);
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    (this.olt = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket)),
      (this.l$o = this.CueConfig.Resources),
      (this.CXo = ActorSystem_1.ActorSystem.Get(
        UE.Actor.StaticClass(),
        this.ActorInternal.GetTransform(),
      )),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        this.CXo.SetActorLabel(
          this.ActorInternal.GetActorLabel() +
            ":" +
            GameplayCueManipulateInteract.name,
        ),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.l$o[0],
        UE.NiagaraSystem,
        (e) => {
          const t = this.CXo.AddComponentByClass(
            UE.NiagaraComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          );
          t.SetAsset(e),
            t.SetNiagaraVariableVec3("End", this.GetTargetPosition()),
            this.CXo.K2_AttachToComponent(
              this.ActorInternal.Mesh,
              this.olt,
              2,
              2,
              2,
              !1,
            );
        },
      );
  }
  OnDestroy() {
    ActorSystem_1.ActorSystem.Put(this.CXo);
  }
  GetTargetPosition() {
    return this.Entity.GetComponent(56).GetTargetLocation().ToUeVector();
  }
}
exports.GameplayCueManipulateInteract = GameplayCueManipulateInteract;
// # sourceMappingURL=GameplayCueManipulateInteract.js.map
