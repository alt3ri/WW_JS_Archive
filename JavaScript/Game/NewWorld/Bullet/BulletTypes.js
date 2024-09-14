"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroHitResultCache = exports.HitInformation = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  CharacterController_1 = require("../Character/CharacterController"),
  BulletDataMain_1 = require("./BulletConf/BulletDataMain");
class HitInformation {
  constructor(t, r, i, e, s, h, o, a, l, n, u, c, C = -1, _ = -1) {
    (this.HitPosition = Vector_1.Vector.Create()),
      (this.HitEffectRotation = Rotator_1.Rotator.Create()),
      (this.CalculateType = -1),
      a ? this.HitPosition.FromUeVector(a) : this.HitPosition.Reset(),
      s
        ? this.HitEffectRotation.FromUeRotator(s)
        : this.HitEffectRotation.Reset(),
      (this.Target = r),
      (this.HitPart = o),
      (this.BulletId = e),
      (this.SkillLevel = l),
      (this.Attacker = t),
      (this.IsShaking = h),
      (this.HitEffect = i),
      (this.ReBulletData = n),
      (this.BulletDataPreset = c),
      (this.BulletEntityId = C),
      (this.BulletRowName = u),
      (this.CalculateType = _);
  }
  static FromUeHitInformation(t) {
    return new HitInformation(
      CharacterController_1.CharacterController.GetEntityByUeTsBaseCharacter(
        t.攻击者,
      ),
      CharacterController_1.CharacterController.GetEntityByUeTsBaseCharacter(
        t.受击者,
      ),
      t.被击效果,
      t.子弹ID,
      t.受击特效旋转,
      t.是否震动,
      t.受击部位,
      t.受击位置,
      t.技能等级,
      new BulletDataMain_1.BulletDataMain(t.重构子弹数据, ""),
      t.子弹表ID,
      t.子弹逻辑预设,
      void 0,
      t.伤害类型,
    );
  }
  ToUeHitInformation() {
    return new UE.SHitInformation(
      CharacterController_1.CharacterController.GetUeTsBaseCharacterByEntity(
        this.Attacker,
      ),
      CharacterController_1.CharacterController.GetUeTsBaseCharacterByEntity(
        this.Target,
      ),
      this.HitEffect,
      this.BulletId,
      this.HitPosition.ToUeVector(),
      this.HitEffectRotation.ToUeRotator(),
      this.IsShaking,
      this.HitPart,
      this.HitPosition.ToUeVector(),
      this.SkillLevel,
      this.ReBulletData.Data,
      this.BulletDataPreset,
      this.BulletRowName,
      this.CalculateType,
    );
  }
}
exports.HitInformation = HitInformation;
class KuroHitResultCache {
  constructor() {
    (this.HitCount = 0),
      (this.Actors = new Array()),
      (this.BoneNameArray = new Array()),
      (this.Components = new Array()),
      (this.ImpactPointX = new Array()),
      (this.ImpactPointY = new Array()),
      (this.ImpactPointZ = new Array());
  }
  Append(t) {
    KuroHitResultCache.MHo.Start();
    var r = t.GetHitCount(),
      i = ((this.HitCount += r), t.Actors),
      e = t.BoneNameArray,
      s = t.Components,
      h = t.ImpactPointX_Array,
      o = t.ImpactPointY_Array,
      a = t.ImpactPointZ_Array;
    for (let t = 0; t < r; t++)
      this.Actors.push(i.Get(t)),
        this.BoneNameArray.push(
          FNameUtil_1.FNameUtil.GetDynamicFName(e.Get(t)),
        ),
        this.Components.push(s.Get(t)),
        this.ImpactPointX.push(h.Get(t)),
        this.ImpactPointY.push(o.Get(t)),
        this.ImpactPointZ.push(a.Get(t));
    KuroHitResultCache.MHo.Stop();
  }
}
(exports.KuroHitResultCache = KuroHitResultCache).MHo =
  Stats_1.Stat.Create("KuroHitResultCache");
//# sourceMappingURL=BulletTypes.js.map
