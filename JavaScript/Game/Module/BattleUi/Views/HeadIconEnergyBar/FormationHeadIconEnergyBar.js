"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationHeadIconEnergyBar = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  HeadIconEnergyBarCommon_1 = require("./HeadIconEnergyBarCommon"),
  energyBarClassMap = new Map([
    [0, HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon],
  ]);
class FormationHeadIconEnergyBar {
  constructor() {
    (this.Jo1 = []), (this.hdt = new Map()), (this.Zo1 = new Set());
  }
  InitParentItem(e, t) {
    this.Jo1[e] = t;
  }
  RemoveEntity(e) {
    var t = this.hdt.get(e);
    t ? (this.hdt.delete(e), t.Destroy()) : this.Zo1.delete(e);
  }
  InitData(e, t, r, s) {
    var a,
      o = r?.EntityHandle?.Id;
    o &&
      !this.Zo1.has(o) &&
      (this.hdt.has(o)
        ? this.RefreshVisible(o, r.IsCurEntity, s)
        : (a = r.HeadIconEnergyBarConfig) &&
            ((t =
              t.PlayerId ===
              ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
            a.FormationVisible || t)
          ? ((t = 0 <= s ? this.Jo1[s] : this.Jo1[0]),
            this.cdt(t, r, o, a),
            this.RefreshVisible(o, r.IsCurEntity))
          : this.Zo1.add(o));
  }
  RefreshVisible(e, t, r = -1) {
    e &&
      (e = this.hdt.get(e)) &&
      (t
        ? e.SetVisible(!1, 1)
        : (e.SetVisible(!0, 1),
          0 <= r && (t = this.Jo1[r]) && e.ChangeParent(t)));
  }
  Destroy() {
    for (const e of this.hdt.values()) e.Destroy();
    this.hdt.clear(), this.Zo1.clear();
  }
  Tick(e) {
    for (const t of this.hdt.values()) t.Tick(e);
  }
  cdt(e, t, r, s) {
    var a = new (energyBarClassMap.get(s.Type) ??
      HeadIconEnergyBarCommon_1.HeadIconEnergyBarCommon)();
    a.InitData(t, s),
      this.hdt.set(r, a),
      a.InitByPath(e, s.PrefabPath),
      a.SetVisible(!0, 0);
  }
}
exports.FormationHeadIconEnergyBar = FormationHeadIconEnergyBar;
//# sourceMappingURL=FormationHeadIconEnergyBar.js.map
