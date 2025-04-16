"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (Error.stackTraceLimit = 500);
const UE = require("ue"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  tmpVector = Vector_1.Vector.Create();
class TsAnimNotifyStateRotateBonesToTarget extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.BoneNames = new UE.TArray()),
      (this.StartLerpTime = 0.5),
      (this.EndLerpTime = 0.5),
      (this.DefaultOffset = new UE.Vector()),
      (this.LerpSpeed = 1e3),
      (this.TargetUpdateThreshold = 100),
      (this.HandleMap = new Map());
  }
  Constructor() {
    this.HandleMap = new Map();
  }
  Init() {
    this.HandleMap || (this.HandleMap = new Map());
  }
  K2_NotifyBegin(t, e, s) {
    this.Init();
    var i,
      r,
      t = t.GetOwner();
    return (
      !!t.CharacterActorComponent &&
      !!(i = t
        .GetEntityNoBlueprint()
        ?.GetComponent(175)?.RotateBonesToTargetMgr) &&
      ((r = this.HandleMap.get(t)) && i.StopBoneToTarget(r, 0.1),
      tmpVector.FromUeVector(this.DefaultOffset),
      (tmpVector.Z += t.CharacterActorComponent.DefaultHalfHeight),
      i.SetDefaultTarget(tmpVector, this.LerpSpeed, this.TargetUpdateThreshold),
      this.HandleMap.set(
        t,
        i.SetBoneToTarget(this.BoneNames, this.StartLerpTime),
      ),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    var s,
      i,
      t = t.GetOwner();
    return (
      !!t.CharacterActorComponent &&
      !!(s = t
        .GetEntityNoBlueprint()
        ?.GetComponent(175)?.RotateBonesToTargetMgr) &&
      ((i = this.HandleMap.get(t)) &&
        (s.StopBoneToTarget(i, this.EndLerpTime), this.HandleMap.delete(t)),
      !0)
    );
  }
  GetNotifyName() {
    return "控制多根骨骼朝向目标";
  }
}
exports.default = TsAnimNotifyStateRotateBonesToTarget;
//# sourceMappingURL=TsAnimNotifyStateRotateBonesToTarget.js.map
