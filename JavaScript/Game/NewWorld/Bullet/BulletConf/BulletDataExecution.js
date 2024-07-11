"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataExecution = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
class BulletDataExecution {
  constructor(t) {
    (this.Pe = void 0),
      (this.Y6o = !1),
      (this.J6o = void 0),
      (this.MovementReplaced = !1),
      (this.ReboundBitMask = 0),
      (this.SupportCamp = void 0),
      (this.z6o = void 0),
      (this.Z6o = void 0),
      (this.e8o = void 0),
      (this.t8o = void 0),
      (this.i8o = void 0),
      (this.o8o = void 0),
      (this.r8o = void 0),
      (this.n8o = void 0),
      (this.s8o = void 0),
      (this.Pe = t);
  }
  get GbDataList() {
    return this.a8o(), this.J6o;
  }
  a8o() {
    if (!this.Y6o) {
      this.Y6o = !0;
      var t = this.Pe.GB组.ToAssetPathName();
      if (t && 0 < t.length && "None" !== t) {
        var i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            t,
            UE.KuroBpDataAssetGroup,
          )?.Data,
          e = i?.Num() ?? 0;
        if (0 < e) {
          (this.J6o = new Array()), (this.SupportCamp = new Array());
          for (let t = (this.ReboundBitMask = 0); t < e; t++) {
            var s = i.Get(t);
            this.J6o.push(s);
          }
        }
      }
    }
  }
  get GeIdApplyToVictim() {
    if (!this.z6o) {
      this.z6o = new Array();
      var i = this.Pe.受击对象进入应用的GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.z6o.push(i.Get(t));
    }
    return this.z6o;
  }
  get SendGameplayEventTagToVictim() {
    return (
      void 0 === this.Z6o &&
        (this.Z6o = this.Pe.命中后对受击者发射GameplayEvent标签),
      this.Z6o
    );
  }
  get SendGeIdToVictim() {
    if (!this.e8o) {
      this.e8o = new Array();
      var i = this.Pe.命中后对受击者应用GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.e8o.push(i.Get(t));
    }
    return this.e8o;
  }
  get SendGeIdToRoleInGame() {
    if (!this.t8o) {
      this.t8o = new Array();
      var i = this.Pe.命中后对在场上角色应用的GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.t8o.push(i.Get(t));
    }
    return this.t8o;
  }
  get SendGameplayEventTagToAttacker() {
    return (
      void 0 === this.i8o &&
        (this.i8o = this.Pe.命中后对攻击者发射GameplayEvent标签),
      this.i8o
    );
  }
  get SendGeIdToAttacker() {
    if (!this.o8o) {
      this.o8o = new Array();
      var i = this.Pe.命中后对攻击者应用GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.o8o.push(i.Get(t));
    }
    return this.o8o;
  }
  get SendGameplayEventTagToAttackerOnEnd() {
    return (
      void 0 === this.r8o &&
        (this.r8o = this.Pe.结束时对攻击者发射GameplayEvent标签),
      this.r8o
    );
  }
  get EnergyRecoverGeIds() {
    if (!this.n8o) {
      this.n8o = new Array();
      var i = this.Pe.能量恢复类GE数组的Id;
      for (let t = 0; t < i.Num(); ++t) this.n8o.push(i.Get(t));
    }
    return this.n8o;
  }
  get SendGameplayEventTagToAttackerOnStart() {
    return (
      void 0 === this.s8o &&
        (this.s8o = this.Pe.生成时对攻击者发射GameplayEvent标签),
      this.s8o
    );
  }
  Preload() {
    return this.a8o(), !0;
  }
}
exports.BulletDataExecution = BulletDataExecution;
//# sourceMappingURL=BulletDataExecution.js.map
