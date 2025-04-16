"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FollowShooterInputLayer = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  InputEnums_1 = require("../../../../../../Input/InputEnums"),
  InputLayer_1 = require("../../../../../../Input/InputLayer"),
  blockInputTagToActionMap = new Map([
    [-542518289, InputEnums_1.EInputAction.攻击],
    [-541178966, InputEnums_1.EInputAction.技能1],
    [-732810197, InputEnums_1.EInputAction.大招],
    [-1802431900, InputEnums_1.EInputAction.幻象1],
    [-1752099043, InputEnums_1.EInputAction.幻象2],
  ]);
class FollowShooterInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments),
      (this.orl = void 0),
      (this.Aia = void 0),
      (this.nrl = new Set()),
      (this.YY_ = new Array()),
      (this.zY_ = new Set()),
      (this.JY_ = (t, s) => {
        t = blockInputTagToActionMap.get(t);
        t && (s ? this.zY_.add(t) : this.zY_.delete(t));
      });
  }
  Start(t) {
    t = (this.orl = t).Entity;
    const s = t.GetComponent(3)?.Actor;
    s &&
      s.InputComponentClass &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        s.InputComponentClass.AssetPathName?.toString(),
        UE.Class,
        (t) => {
          (this.Aia = s.AddComponentByClass(
            t,
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
          )),
            (this.Aia.OwnerActor = s);
        },
      );
    var e = t.GetComponent(203);
    if (e)
      for (var [n, u] of blockInputTagToActionMap) {
        e.HasTag(n) && this.zY_.add(u);
        u = e.ListenForTagAddOrRemove(n, this.JY_);
        u && this.YY_.push(u);
      }
  }
  RegisterInputAction(t) {
    this.nrl.add(t);
  }
  Clear() {
    (this.orl = void 0), (this.Aia = void 0), this.nrl.clear();
  }
  GetLayerType() {
    return 3;
  }
  HandlePress(s, e) {
    if (this.srl(s, 1)) {
      let t = void 0;
      switch (s) {
        case InputEnums_1.EInputAction.攻击:
          t = this.Aia.攻击按下(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          t = this.Aia.技能1按下(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          t = this.Aia.幻象1按下(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          t = this.Aia.幻象2按下(e);
          break;
        case InputEnums_1.EInputAction.大招:
          t = this.Aia.大招按下(e);
      }
      return (
        this.orl.ExecuteCommand(t), FollowShooterInputLayer.GetSwallowCommand()
      );
    }
  }
  HandleHold(s, e) {
    if (this.srl(s, 3)) {
      let t = void 0;
      switch (s) {
        case InputEnums_1.EInputAction.攻击:
          t = this.Aia.攻击长按(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          t = this.Aia.技能1长按(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          t = this.Aia.幻象1长按(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          t = this.Aia.幻象2长按(e);
          break;
        case InputEnums_1.EInputAction.大招:
          t = this.Aia.大招长按(e);
      }
      return (
        this.orl.ExecuteCommand(t), FollowShooterInputLayer.GetSwallowCommand()
      );
    }
  }
  HandleRelease(s, e) {
    if (this.srl(s, 2)) {
      let t = void 0;
      switch (s) {
        case InputEnums_1.EInputAction.攻击:
          t = this.Aia.攻击抬起(e);
          break;
        case InputEnums_1.EInputAction.技能1:
          t = this.Aia.技能1抬起(e);
          break;
        case InputEnums_1.EInputAction.幻象1:
          t = this.Aia.幻象1抬起(e);
          break;
        case InputEnums_1.EInputAction.幻象2:
          t = this.Aia.幻象2抬起(e);
          break;
        case InputEnums_1.EInputAction.大招:
          t = this.Aia.大招抬起(e);
      }
      return (
        this.orl.ExecuteCommand(t), FollowShooterInputLayer.GetSwallowCommand()
      );
    }
  }
  srl(t, s) {
    if (this.Aia && this.orl?.Active && !this.zY_.has(t))
      for (var [e, n] of this.nrl) if (e === t && n === s) return !0;
    return !1;
  }
}
exports.FollowShooterInputLayer = FollowShooterInputLayer;
//# sourceMappingURL=FollowShooterInputLayer.js.map
