"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleConfig =
    exports.PARAGLIDING_DELAY_MILISECONDS =
    exports.DEFAULT_BOUNCE_CURVE =
    exports.DEFAULT_BOUNCE_TIME =
    exports.DEFAULT_BOUNCE_HEIGHT =
      void 0);
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
(exports.DEFAULT_BOUNCE_HEIGHT = 800),
  (exports.DEFAULT_BOUNCE_TIME = 1e3),
  (exports.DEFAULT_BOUNCE_CURVE =
    "/Game/Aki/Data/Fight/Curves/CV_Bounce_Motion.CV_Bounce_Motion"),
  (exports.PARAGLIDING_DELAY_MILISECONDS = 500);
class VehicleConfig {
  constructor(t, e) {
    (this.VehicleEntity = void 0),
      (this.BornTagList = new Array()),
      (this.VehicleEnterTags = new Array()),
      (this.PassengerEnterTags = new Array()),
      (this.BounceTime = exports.DEFAULT_BOUNCE_TIME),
      (this.BounceHeight = exports.DEFAULT_BOUNCE_HEIGHT),
      (this.BounceCurve = exports.DEFAULT_BOUNCE_CURVE),
      (this.ParaglidingDelayTime = exports.PARAGLIDING_DELAY_MILISECONDS),
      (this.VehicleEntity = t);
    t = this.VehicleEntity.GetComponent(0)?.GetPbEntityInitData();
    if (t?.ComponentsData) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "VehicleComponent");
      if (t) {
        if (e?.IsValid()) {
          var s = e.载具出生Tag.GameplayTags,
            i = s.Num();
          for (let t = 0; t < i; t++) this.BornTagList.push(s.Get(t).TagId);
          var o = e.载具乘坐期间Tag.GameplayTags,
            r = o.Num();
          for (let t = 0; t < r; t++)
            this.VehicleEnterTags.push(o.Get(t).TagId);
          var h = e.角色乘坐期间Tag.GameplayTags,
            n = h.Num();
          for (let t = 0; t < n; t++)
            this.PassengerEnterTags.push(h.Get(t).TagId);
          (this.BounceHeight = e.弹射高度),
            (this.BounceTime = e.弹射时间),
            (this.BounceCurve = e.弹射时间路径曲线.ToAssetPathName()),
            ("" !== this.BounceCurve && "None" !== this.BounceCurve) ||
              (this.BounceCurve = exports.DEFAULT_BOUNCE_CURVE),
            (this.ParaglidingDelayTime = e.打开滑翔伞延迟时间);
        }
        t.VehicleBornTag &&
          ((this.BornTagList.length = 0),
          this.BornTagList.push(...t.VehicleBornTag)),
          t.VehicleRiddenTag &&
            ((this.VehicleEnterTags.length = 0),
            this.VehicleEnterTags.push(...t.VehicleRiddenTag)),
          t.RoleRiddingTag &&
            ((this.PassengerEnterTags.length = 0),
            this.PassengerEnterTags.push(...t.RoleRiddingTag));
      }
    }
  }
  DeepCopy() {
    var t = new VehicleConfig(this.VehicleEntity, void 0);
    return this.DeepCopyInternal(t), t;
  }
  DeepCopyInternal(t) {
    Object.assign(t, this),
      (t.BornTagList = this.BornTagList.slice(0)),
      (t.VehicleEnterTags = this.VehicleEnterTags.slice(0)),
      (t.PassengerEnterTags = this.PassengerEnterTags.slice(0));
  }
  Init() {
    return (
      !!this.VehicleEntity &&
      (this.SetVehicleBornTags(this.VehicleEntity, !0), !0)
    );
  }
  SetVehicleBornTags(t, e) {
    this.AddOrRemoveTags(t, this.BornTagList, e);
  }
  AddOrRemoveTags(t, e, s) {
    var i = t.GetComponent(203);
    if (i)
      if (s) for (const o of e) i.AddTag(o);
      else for (const r of e) i.RemoveTag(r);
  }
}
exports.VehicleConfig = VehicleConfig;
//# sourceMappingURL=VehicleConfig.js.map
