"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueMaterial = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  GameplayCueMagnitude_1 = require("./GameplayCueMagnitude");
class GameplayCueMaterial extends GameplayCueMagnitude_1.GameplayCueMagnitude {
  constructor() {
    super(...arguments),
      (this.rKt = 0),
      (this.aYo = 0),
      (this.hYo = (e) => {
        if (e === this.rKt) {
          switch (this.aYo) {
            case 1:
              EventSystem_1.EventSystem.RemoveWithTarget(
                this.ActorInternal.CharRenderingComponent,
                EventDefine_1.EEventName.OnRemoveMaterialController,
                this.hYo,
              );
              break;
            case 2:
              EventSystem_1.EventSystem.RemoveWithTarget(
                this.ActorInternal.CharRenderingComponent,
                EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
                this.hYo,
              );
          }
          this.EndCallback?.();
        }
      });
  }
  OnInit() {
    super.OnInit();
  }
  OnTick(e) {
    super.OnTick(e);
  }
  OnCreate() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      this.CueConfig.Path,
      UE.Object,
      (e) => {
        if (
          (this.BeginCallback?.(),
          this.ActorInternal?.IsValid() && this.IsActive)
        ) {
          switch (this.lYo(e)) {
            case 1:
              (this.aYo = 1),
                (this.rKt =
                  this.ActorInternal.CharRenderingComponent.AddMaterialControllerData(
                    e,
                  ));
              break;
            case 2:
              (this.aYo = 2),
                (this.rKt =
                  this.ActorInternal.CharRenderingComponent.AddMaterialControllerDataGroup(
                    e,
                  ));
              break;
            case 0:
              (this.aYo = 0),
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Battle",
                    29,
                    "附加材质类型错误:",
                    ["Buff特效Id", this.CueConfig.Id],
                    ["材质路径", this.CueConfig.Path],
                  );
          }
          this.I$o(), super.OnCreate();
        }
      },
    );
  }
  OnDestroy() {
    switch ((super.OnDestroy(), this.aYo)) {
      case 1:
        this.ActorInternal.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(
          this.rKt,
        );
        break;
      case 2:
        this.ActorInternal.CharRenderingComponent.RemoveMaterialControllerDataGroupWithEnding(
          this.rKt,
        );
    }
  }
  OnSetMagnitude(e) {
    this.ActorInternal.CharRenderingComponent.SetEffectProgress(e, this.rKt);
  }
  lYo(e) {
    return e instanceof UE.PD_CharacterControllerData_C
      ? 1
      : e instanceof UE.PD_CharacterControllerDataGroup_C
        ? 2
        : 0;
  }
  I$o() {
    if (this.EndCallback)
      switch (this.aYo) {
        case 1:
          EventSystem_1.EventSystem.AddWithTarget(
            this.ActorInternal.CharRenderingComponent,
            EventDefine_1.EEventName.OnRemoveMaterialController,
            this.hYo,
          );
          break;
        case 2:
          EventSystem_1.EventSystem.AddWithTarget(
            this.ActorInternal.CharRenderingComponent,
            EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
            this.hYo,
          );
      }
  }
}
exports.GameplayCueMaterial = GameplayCueMaterial;
//# sourceMappingURL=GameplayCueMaterial.js.map
