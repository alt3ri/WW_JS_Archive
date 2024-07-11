"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSpecialEnergyBar = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SpecialEnergyBarChiXia_1 = require("./Role/SpecialEnergyBarChiXia");
const SpecialEnergyBarJianXin_1 = require("./Role/SpecialEnergyBarJianXin");
const SpecialEnergyBarJinXi_1 = require("./Role/SpecialEnergyBarJinXi");
const SpecialEnergyBarSanHua_1 = require("./Role/SpecialEnergyBarSanHua");
const SpecialEnergyBarMorph_1 = require("./SpecialEnergyBarMorph");
const SpecialEnergyBarMorphCountDown_1 = require("./SpecialEnergyBarMorphCountDown");
const SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint");
const SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate");
const SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot");
const specialEnergyBarClassList = [
  SpecialEnergyBarPoint_1.SpecialEnergyBarPoint,
  SpecialEnergyBarSlot_1.SpecialEnergyBarSlot,
  SpecialEnergyBarPointGraduate_1.SpecialEnergyBarPointGraduate,
  SpecialEnergyBarMorph_1.SpecialEnergyBarMorph,
  SpecialEnergyBarMorph_1.SpecialEnergyBarMorph,
  SpecialEnergyBarMorphCountDown_1.SpecialEnergyBarMorphCountDown,
  SpecialEnergyBarJianXin_1.SpecialEnergyBarJianXin,
  SpecialEnergyBarSanHua_1.SpecialEnergyBarSanHua,
  SpecialEnergyBarChiXia_1.SpecialEnergyBarChiXia,
  SpecialEnergyBarMorphCountDown_1.SpecialEnergyBarMorphCountDown,
  SpecialEnergyBarJinXi_1.SpecialEnergyBarMorphJinXi,
];
class RoleSpecialEnergyBar {
  constructor() {
    (this.wnt = void 0),
      (this.Yct = new Map()),
      (this.Jct = []),
      (this.lne = (e, r) => {
        this.zct(!0);
      });
  }
  async InitAsync(e, r) {
    this.wnt = r;
    const a = this.Zct(r);
    if (a) {
      const i = [];
      if ((i.push(this.emt(e, r, 0, a)), a.TagEnergyBarIdMap))
        for (let [n, t] of a.TagEnergyBarIdMap) {
          this.tmt(n, this.lne);
          t =
            ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
              t,
            );
          t && i.push(this.emt(e, r, n, t));
        }
      this.zct(), await Promise.all(i);
    }
  }
  SetVisible(e) {
    for (const r of this.Yct.values()) r.SetVisible(e, 0);
  }
  Destroy() {
    this.U$e();
    for (const e of this.Yct.values()) e.Destroy();
    this.Yct.clear();
  }
  Tick(e) {
    for (const r of this.Yct.values()) r.Tick(e);
  }
  Zct(e) {
    if (e?.EntityHandle?.Valid) {
      e = e.RoleConfig;
      if (e) {
        e = e.SpecialEnergyBarId;
        if (e !== 0)
          return ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
            e,
          );
      }
    }
  }
  async emt(e, r, a, i) {
    const n = new specialEnergyBarClassList[i.PrefabType]();
    n.InitData(r, i),
      this.Yct.set(a, n),
      await n.InitByPathAsync(e, i.PrefabPath);
  }
  zct(r = !1) {
    if (this.Yct.size <= 1) this.Yct.get(0)?.SetVisible(!0, 1);
    else {
      let a;
      let i;
      const n = this.wnt?.GameplayTagComponent;
      let e = 0;
      for (const o of this.Yct.keys())
        if (o !== 0 && n?.HasTag(o)) {
          e = o;
          break;
        }
      for ([a, i] of this.Yct) {
        const t = a === e;
        i.SetVisible(t, 1), r && i.OnChangeVisibleByTagChange(t);
      }
    }
  }
  tmt(e, r) {
    let a = this.wnt?.GameplayTagComponent;
    a && ((a = a.ListenForTagAddOrRemove(e, r)), this.Jct.push(a));
  }
  U$e() {
    if (this.Jct) {
      for (const e of this.Jct) e.EndTask();
      this.Jct.length = 0;
    }
  }
}
exports.RoleSpecialEnergyBar = RoleSpecialEnergyBar;
// # sourceMappingURL=RoleSpecialEnergyBar.js.map
