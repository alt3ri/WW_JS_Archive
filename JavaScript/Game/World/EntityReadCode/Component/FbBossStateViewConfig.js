"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBossStateViewConfig = void 0);
class FbBossStateViewConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.o8h = !1),
      (this.n8h = void 0),
      (this.s8h = !1),
      (this.a8h = void 0),
      (this.h8h = !1),
      (this.l8h = void 0),
      (this._8h = !1),
      (this.c8h = void 0),
      (this.u8h = !1),
      (this.d8h = !1),
      (this.m8h = !1),
      (this.C8h = 0);
  }
  static Create(t) {
    if (t) return new FbBossStateViewConfig(t);
  }
  get BossStateViewType() {
    return (
      this.o8h ||
        ((this.o8h = !0), (this.n8h = this.FbDataInternal.bossStateViewType())),
      this.n8h
    );
  }
  get TidBossSubTitle() {
    return (
      this.s8h ||
        ((this.s8h = !0), (this.a8h = this.FbDataInternal.tidBossSubTitle())),
      this.a8h
    );
  }
  get BossStateInfoShowType() {
    return (
      this.h8h ||
        ((this.h8h = !0),
        (this.l8h = this.FbDataInternal.bossStateInfoShowType())),
      this.l8h
    );
  }
  get TidLevelText() {
    return (
      this._8h ||
        ((this._8h = !0), (this.c8h = this.FbDataInternal.tidLevelText())),
      this.c8h
    );
  }
  get OnlyShowInBattleState() {
    return (
      this.u8h ||
        ((this.u8h = !0),
        (this.d8h = this.FbDataInternal.onlyShowInBattleState())),
      this.d8h
    );
  }
  get ShowDistance() {
    return (
      this.m8h ||
        ((this.m8h = !0), (this.C8h = this.FbDataInternal.showDistance())),
      this.C8h
    );
  }
}
exports.FbBossStateViewConfig = FbBossStateViewConfig;
//# sourceMappingURL=FbBossStateViewConfig.js.map
