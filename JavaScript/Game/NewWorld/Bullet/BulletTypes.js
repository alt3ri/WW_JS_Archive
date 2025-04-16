"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroHitResultCache = exports.HitInformation = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  BulletDataMain_1 = require("./BulletConf/BulletDataMain");
class HitInformation {
  constructor(t, i, r, s, e, o, h, a, l, n, u, c = 0, C, _ = -1, H = -1) {
    (this.HitPosition = Vector_1.Vector.Create()),
      (this.HitEffectRotation = Rotator_1.Rotator.Create()),
      (this.BulletId = 0),
      (this.IsShaking = !1),
      (this.BulletEntityId = 0),
      (this.CalculateType = -1),
      (this.DamageId = 0),
      a ? this.HitPosition.FromUeVector(a) : this.HitPosition.Reset(),
      e
        ? this.HitEffectRotation.FromUeRotator(e)
        : this.HitEffectRotation.Reset(),
      (this.Target = i),
      (this.HitPart = h),
      (this.BulletId = s),
      (this.SkillLevel = l),
      (this.Attacker = t),
      (this.IsShaking = o),
      (this.HitEffect = r),
      (this.ReBulletData = n),
      (this.BulletDataPreset = C),
      (this.BulletEntityId = _),
      (this.BulletRowName = u),
      (this.CalculateType = H),
      (this.DamageId = c);
  }
  static FromUeHitInformation(t) {
    return new HitInformation(
      ControllerHolder_1.ControllerHolder.CharacterController.GetEntityByUeTsBaseCharacter(
        t.攻击者,
      ),
      ControllerHolder_1.ControllerHolder.CharacterController.GetEntityByUeTsBaseCharacter(
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
      Number(t.伤害ID),
      t.子弹逻辑预设,
      void 0,
      t.伤害类型,
    );
  }
  ToUeHitInformation() {
    return new UE.SHitInformation(
      ControllerHolder_1.ControllerHolder.CharacterController.GetUeTsBaseCharacterByEntity(
        this.Attacker,
      ),
      ControllerHolder_1.ControllerHolder.CharacterController.GetUeTsBaseCharacterByEntity(
        this.Target,
      ),
      this.HitEffect,
      this.BulletId,
      this.HitPosition.ToUeVectorOld(),
      this.HitEffectRotation.ToUeRotator(),
      this.IsShaking,
      this.HitPart,
      this.HitPosition.ToUeVectorOld(),
      this.SkillLevel,
      this.ReBulletData.Data,
      this.BulletDataPreset,
      this.BulletRowName,
      this.CalculateType,
      BigInt(this.DamageId),
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
    var i = t.GetHitCount(),
      r = ((this.HitCount += i), t.Actors),
      s = t.BoneNameArray,
      e = t.Components,
      o = t.ImpactPointX_Array,
      h = t.ImpactPointY_Array,
      a = t.ImpactPointZ_Array;
    for (let t = 0; t < i; t++)
      this.Actors.push(r.Get(t)),
        this.BoneNameArray.push(
          FNameUtil_1.FNameUtil.GetDynamicFName(s.Get(t)),
        ),
        this.Components.push(e.Get(t)),
        this.ImpactPointX.push(o.Get(t)),
        this.ImpactPointY.push(h.Get(t)),
        this.ImpactPointZ.push(a.Get(t));
    KuroHitResultCache.MHo.Stop();
  }
}
(exports.KuroHitResultCache = KuroHitResultCache).MHo =
  Stats_1.Stat.Create("KuroHitResultCache");
//# sourceMappingURL=BulletTypes.js.map
