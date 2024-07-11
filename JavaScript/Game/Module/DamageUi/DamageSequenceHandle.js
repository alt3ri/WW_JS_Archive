"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageSequenceHandle = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils");
class DamageSequenceHandle {
  constructor() {
    (this.b2t = void 0),
      (this.$pt = void 0),
      (this.n8 = ""),
      (this.GPe = UE.NewArray(UE.Actor));
  }
  Initialize(t) {
    this.n8 = t;
  }
  Destroy() {
    if (this.b2t) {
      const t = this.b2t;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put(t);
      }),
        (this.b2t = void 0),
        (this.$pt = void 0);
    }
  }
  Reset() {
    this.Stop(), this.ResetSequenceBinding(), this.$pt.OnFinished.Clear();
  }
  Play() {
    this.$pt?.IsValid() && this.$pt.Play();
  }
  Stop() {
    this.$pt?.IsValid() && this.$pt.IsPlaying() && this.$pt.Stop();
  }
  SetSequenceBindingByTag(t, e) {
    this.b2t?.IsValid() &&
      e &&
      (this.GPe.Empty(),
      this.GPe.Add(e),
      (e = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
      this.b2t.SetBindingByTag(e, this.GPe, !1));
  }
  AddSequenceBindingByTag(t, e) {
    this.b2t?.IsValid() &&
      e &&
      ((t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
      this.b2t.AddBindingByTag(t, e));
  }
  ResetSequenceBinding() {
    this.b2t?.IsValid() && this.b2t.ResetBindings();
  }
  AddOnFinished(t) {
    this.$pt?.IsValid() && this.$pt.OnFinished.Add(t);
  }
  SpawnSequence(e = void 0) {
    StringUtils_1.StringUtils.IsEmpty(this.n8) ||
      ResourceSystem_1.ResourceSystem.LoadAsync(
        this.n8,
        UE.LevelSequence,
        (t) => {
          ObjectUtils_1.ObjectUtils.IsValid(t) &&
            ((this.b2t = ActorSystem_1.ActorSystem.Get(
              UE.LevelSequenceActor.StaticClass(),
              MathUtils_1.MathUtils.DefaultTransform,
              void 0,
              !1,
            )),
            this.b2t.SetSequence(t),
            (this.$pt = this.b2t.SequencePlayer),
            e) &&
            e(this);
        },
      );
  }
  GetPath() {
    return this.n8;
  }
}
exports.DamageSequenceHandle = DamageSequenceHandle;
//# sourceMappingURL=DamageSequenceHandle.js.map
