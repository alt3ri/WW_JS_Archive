"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ManipulateInputLayer = void 0);
const Info_1 = require("../../../../../../../Core/Common/Info"),
  InputEnums_1 = require("../../../../../../Input/InputEnums"),
  InputLayer_1 = require("../../../../../../Input/InputLayer"),
  MANIPULATE_THROW_SKILL = 210005,
  MANIPULATE_RELEASE_SKILL = 210006,
  MANIPULATE_ROTATE_SKILL = 210009,
  MANIPULATE_PARABOLA_SKILL = 240001,
  actionsForbid = [
    InputEnums_1.EInputAction.攻击,
    InputEnums_1.EInputAction.幻象1,
    InputEnums_1.EInputAction.幻象2,
    InputEnums_1.EInputAction.技能1,
    InputEnums_1.EInputAction.瞄准,
    InputEnums_1.EInputAction.大招,
  ];
class ManipulateInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments), (this.Lie = void 0), (this.cBe = void 0);
  }
  Init(t) {
    t = t.Entity;
    (this.Lie = t.GetComponent(191)), (this.cBe = t.GetComponent(39));
  }
  Clear() {
    (this.Lie = void 0), (this.cBe = void 0);
  }
  GetLayerType() {
    return 4;
  }
  HandlePress(t, e) {
    switch (t) {
      case InputEnums_1.EInputAction.攻击:
        return (
          this.Lie.HasTag(-972568039) ||
            this.cBe.BeginSkill(MANIPULATE_THROW_SKILL, {
              Reason: "Manipulate InputLayer, Item Throw",
            }),
          ManipulateInputLayer.GetSwallowCommand()
        );
      case InputEnums_1.EInputAction.幻象1:
        if (Info_1.Info.IsInTouch()) break;
        return (
          this.Lie.HasTag(1278503102) ||
            this.cBe.BeginSkill(MANIPULATE_RELEASE_SKILL, {
              Reason: "Manipulate InputLayer, Item Release",
            }),
          ManipulateInputLayer.GetSwallowCommand()
        );
      case InputEnums_1.EInputAction.技能1:
        if (this.Lie.HasTag(-1070569477))
          return (
            this.cBe.BeginSkill(MANIPULATE_ROTATE_SKILL, {
              Reason: "Manipulate InputLayer, Item Rotate",
            }),
            ManipulateInputLayer.GetSwallowCommand()
          );
        break;
      case InputEnums_1.EInputAction.瞄准:
        return (
          this.cBe.BeginSkill(MANIPULATE_PARABOLA_SKILL, {
            Reason: "Manipulate InputLayer, Item Rotate",
          }),
          ManipulateInputLayer.GetSwallowCommand()
        );
    }
    if (actionsForbid.includes(t) && this.Q0l())
      return ManipulateInputLayer.GetSwallowCommand();
  }
  HandleRelease(t, e) {
    if (t === InputEnums_1.EInputAction.幻象1)
      if (Info_1.Info.IsInTouch())
        return (
          this.Lie.HasTag(1278503102) ||
            this.cBe.BeginSkill(MANIPULATE_RELEASE_SKILL, {
              Reason: "Manipulate InputLayer, Item Release",
            }),
          ManipulateInputLayer.GetSwallowCommand()
        );
    if (this.Q0l()) return ManipulateInputLayer.GetSwallowCommand();
  }
  HandleHold(t, e) {
    if (this.Q0l()) return ManipulateInputLayer.GetSwallowCommand();
  }
  Q0l() {
    return (
      !!this.Lie.HasAnyTag([1491611589, 20810141, 1173061094]) &&
      !this.Lie.HasTag(-611290244)
    );
  }
}
exports.ManipulateInputLayer = ManipulateInputLayer;
//# sourceMappingURL=ManipulateInputLayer.js.map
