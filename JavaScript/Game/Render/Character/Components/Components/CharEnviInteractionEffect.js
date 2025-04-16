"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharEnviInteractionEffect = void 0);
const UE = require("ue"),
  RenderConfig_1 = require("../../../Config/RenderConfig"),
  CharRenderBase_1 = require("../../Manager/CharRenderBase");
class CharEnviInteractionEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments), (this.EnviInteractionComponent = void 0);
  }
  Start() {
    var e;
    this.EnviInteractionComponent ||
      ((e = this.GetRenderingComponent().GetOwner()),
      (this.EnviInteractionComponent = e.AddComponentByClass(
        UE.KuroEnviInteractionComponent.StaticClass(),
        !1,
        new UE.Transform(),
        !1,
      ))),
      this.EnviInteractionComponent &&
        ((this.EnviInteractionComponent.bCalEnviInteractionData = !0),
        this.EnviInteractionComponent.RegisterComponentToSystem()),
      this.OnInitSuccess();
  }
  Destroy() {
    this.EnviInteractionComponent &&
      this.EnviInteractionComponent.GetOwner()?.K2_DestroyComponent(
        this.EnviInteractionComponent,
      );
  }
  GetStatName() {
    return "CharEnviInteractionEffect";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdEnviInteractionEffect;
  }
}
exports.CharEnviInteractionEffect = CharEnviInteractionEffect;
//# sourceMappingURL=CharEnviInteractionEffect.js.map
