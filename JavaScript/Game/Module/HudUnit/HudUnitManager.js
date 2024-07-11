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
    t = typeof t;
    this.Hni.delete(t);
  }
  static ShowHud() {
    if (this.Hni.size <= 0)
      for (const t of this.HudUnitHandleClassArray) this.New(t);
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
    this.Hni.clear();
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
  (HudUnitManager.Hni = new Map()),
  (HudUnitManager.TickCount = 0);
//# sourceMappingURL=HudUnitManager.js.map
