"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataExecution = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
class BulletDataExecution {
  constructor(t) {
    (this.Pe = void 0),
      (this.ZVo = !1),
      (this.e6o = void 0),
      (this.MovementReplaced = !1),
      (this.ReboundBitMask = 0),
      (this.SupportCamp = void 0),
      (this.t6o = void 0),
      (this.i6o = void 0),
      (this.o6o = void 0),
      (this.r6o = void 0),
      (this.n6o = void 0),
      (this.s6o = void 0),
      (this.a6o = void 0),
      (this.h6o = void 0),
      (this.l6o = void 0),
      (this.Pe = t);
  }
  get GbDataList() {
    return this._6o(), this.e6o;
  }
  _6o() {
    if (!this.ZVo) {
      this.ZVo = !0;
      var t = this.Pe.GB组.ToAssetPathName();
      if (t && 0 < t.length && "None" !== t) {
        var i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            t,
            UE.KuroBpDataAssetGroup,
          )?.Data,
          e = i?.Num() ?? 0;
        if (0 < e) {
          (this.e6o = new Array()), (this.SupportCamp = new Array());
          for (let t = (this.ReboundBitMask = 0); t < e; t++) {
            var s = i.Get(t);
            this.e6o.push(s);
          }
        }
      }
    }
  }
  get GeIdApplyToVictim() {
    if (!this.t6o) {
      this.t6o = new Array();
      var i = this.Pe.受击对象进入应用的GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.t6o.push(i.Get(t));
    }
    return this.t6o;
  }
  get SendGameplayEventTagToVictim() {
    return (
      void 0 === this.i6o &&
        (this.i6o = this.Pe.命中后对受击者发射GameplayEvent标签),
      this.i6o
    );
  }
  get SendGeIdToVictim() {
    if (!this.o6o) {
      this.o6o = new Array();
      var i = this.Pe.命中后对受击者应用GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.o6o.push(i.Get(t));
    }
    return this.o6o;
  }
  get SendGeIdToRoleInGame() {
    if (!this.r6o) {
      this.r6o = new Array();
      var i = this.Pe.命中后对在场上角色应用的GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.r6o.push(i.Get(t));
    }
    return this.r6o;
  }
  get SendGameplayEventTagToAttacker() {
    return (
      void 0 === this.n6o &&
        (this.n6o = this.Pe.命中后对攻击者发射GameplayEvent标签),
      this.n6o
    );
  }
  get SendGeIdToAttacker() {
    if (!this.s6o) {
      this.s6o = new Array();
      var i = this.Pe.命中后对攻击者应用GE的Id;
      for (let t = 0; t < i.Num(); ++t) this.s6o.push(i.Get(t));
    }
    return this.s6o;
  }
  get SendGameplayEventTagToAttackerOnEnd() {
    return (
      void 0 === this.a6o &&
        (this.a6o = this.Pe.结束时对攻击者发射GameplayEvent标签),
      this.a6o
    );
  }
  get EnergyRecoverGeIds() {
    if (!this.h6o) {
      this.h6o = new Array();
      var i = this.Pe.能量恢复类GE数组的Id;
      for (let t = 0; t < i.Num(); ++t) this.h6o.push(i.Get(t));
    }
    return this.h6o;
  }
  get SendGameplayEventTagToAttackerOnStart() {
    return (
      void 0 === this.l6o &&
        (this.l6o = this.Pe.生成时对攻击者发射GameplayEvent标签),
      this.l6o
    );
  }
  Preload() {
    return this._6o(), !0;
  }
}
exports.BulletDataExecution = BulletDataExecution;
//# sourceMappingURL=BulletDataExecution.js.map
