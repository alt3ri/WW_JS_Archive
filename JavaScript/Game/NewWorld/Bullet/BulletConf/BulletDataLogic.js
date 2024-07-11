"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataLogic = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  CombatLog_1 = require("../../../Utils/CombatLog");
class BulletDataLogic {
  constructor(t) {
    (this.Data = void 0),
      (this._8o = void 0),
      (this.u8o = !1),
      (this.c8o = void 0),
      (this.m8o = void 0),
      (this.d8o = void 0),
      (this.C8o = void 0),
      (this.g8o = !1),
      (this.f8o = void 0),
      (this.p8o = void 0),
      (this.v8o = void 0),
      (this.M8o = void 0),
      (this.E8o = void 0),
      (this.S8o = void 0),
      (this.y8o = void 0),
      (this.I8o = void 0),
      (this.T8o = !1),
      (this.L8o = void 0),
      (this.D8o = void 0),
      !Info_1.Info.IsBuildDevelopmentOrDebug ||
      (t && UE.KismetSystemLibrary.IsValidSoftObjectReference(t))
        ? ((this.Data = ResourceSystem_1.ResourceSystem.Load(
            t.ToAssetPathName(),
            UE.BulletLogicType_C,
          )),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            !this.ProfileName.toString().toLowerCase().startsWith("bullet_") &&
            CombatLog_1.CombatLog.Error(
              "Bullet",
              void 0,
              "子弹配置出错，逻辑设置.预设.子弹碰撞预设 填写的值不对",
              ["配置路径:", t.ToAssetPathName()],
            ))
        : CombatLog_1.CombatLog.Error(
            "Bullet",
            void 0,
            "子弹配置出错，没有配置逻辑设置.预设",
            ["配置路径:", t.ToAssetPathName()],
          );
  }
  get ComponentName() {
    return (
      this.u8o || ((this.u8o = !0), (this._8o = this.Data.只碰撞胶囊体)),
      this._8o
    );
  }
  get HitDirectionType() {
    return (
      void 0 === this.c8o && (this.c8o = this.Data.子弹受击类型角度判断),
      this.c8o
    );
  }
  get DestroyOnHitCharacter() {
    return (
      void 0 === this.m8o && (this.m8o = this.Data.子弹碰撞单位销毁), this.m8o
    );
  }
  get DestroyOnHitObstacle() {
    return (
      void 0 === this.d8o && (this.d8o = this.Data.子弹碰撞障碍销毁), this.d8o
    );
  }
  get ProfileName() {
    return (
      this.g8o || ((this.g8o = !0), (this.C8o = this.Data.子弹碰撞预设)),
      this.C8o
    );
  }
  get Type() {
    return void 0 === this.f8o && (this.f8o = this.Data.子弹类型), this.f8o;
  }
  get InteractWithWater() {
    return void 0 === this.p8o && (this.p8o = this.Data.开启水面交互), this.p8o;
  }
  get ReboundChannel() {
    return void 0 === this.v8o && (this.v8o = this.Data.弹反通道), this.v8o;
  }
  get CanCounterAttack() {
    return (
      void 0 === this.M8o && (this.M8o = this.Data.是否可以触发拼刀), this.M8o
    );
  }
  get CanVisionCounterAttack() {
    return (
      void 0 === this.E8o && (this.E8o = this.Data.是否可以触发对策), this.E8o
    );
  }
  get CanDodge() {
    return (
      void 0 === this.S8o && (this.S8o = this.Data.是否可以触发极限闪避),
      this.S8o
    );
  }
  get DestroyOnCountZero() {
    return (
      void 0 === this.y8o && (this.y8o = this.Data.次数为0时销毁), this.y8o
    );
  }
  get PresentTagIds() {
    return this.R8o(), this.I8o;
  }
  R8o() {
    if (!this.T8o) {
      (this.T8o = !0), (this.I8o = []);
      var i,
        s = this.Data.预设标签.GameplayTags,
        e = s.Num();
      for (let t = 0; t < e; t++)
        s.IsValidIndex(t) &&
          (i = s.Get(t)).TagName !== StringUtils_1.NONE_STRING &&
          this.I8o.push(i.TagId);
    }
  }
  get IgnoreWater() {
    return void 0 === this.L8o && (this.L8o = this.Data.忽略水体), this.L8o;
  }
  get DestroyOnFrozen() {
    return void 0 === this.D8o && (this.D8o = this.Data.冰冻时销毁), this.D8o;
  }
  Preload() {
    this.R8o();
  }
}
exports.BulletDataLogic = BulletDataLogic;
//# sourceMappingURL=BulletDataLogic.js.map
