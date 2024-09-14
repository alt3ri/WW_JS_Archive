"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitManager = void 0);
class HudUnitManager {
  static New(t) {
    var s = new t(),
      t = (s.Initialize(), t.name);
    this.Hni.set(t, s);
  }
  static TryNew(t) {
    this.Get(t) || this.New(t);
  }
  static Destroy(t) {
    this.Get(t)?.Destroy();
    t = t.name;
    this.Hni.delete(t);
  }
  static ShowHud() {
    if (!this.K2a) {
      for (const t of this.HudUnitHandleClassArray) this.New(t);
      this.K2a = !0;
    }
    for (const s of this.Hni.values()) s.OnShowHud();
  }
  static HideHud() {
    for (const t of this.Hni.values()) t.OnHideHud();
  }
  static Get(t) {
    t = t.name;
    return this.Hni.get(t);
  }
  static Clear() {
    for (const t of this.Hni.values()) t.Destroy();
    this.Hni.clear(), (this.K2a = !1);
  }
  static RefreshHudOnInputControllerChanged(t, s) {
    for (const i of this.Hni.values()) i.OnInputControllerChanged(t, s);
  }
  static Tick(t) {
    for (const s of this.Hni.values()) s.Tick(t);
    this.TickCount++;
  }
  static AfterTick(t) {
    for (const s of this.Hni.values()) s.AfterTick(t);
  }
}
((exports.HudUnitManager = HudUnitManager).HudUnitHandleClassArray =
  new Array()),
  (HudUnitManager.HudUnitHandleClassMap = new Map()),
  (HudUnitManager.Hni = new Map()),
  (HudUnitManager.K2a = !1),
  (HudUnitManager.TickCount = 0);
//# sourceMappingURL=HudUnitManager.js.map
