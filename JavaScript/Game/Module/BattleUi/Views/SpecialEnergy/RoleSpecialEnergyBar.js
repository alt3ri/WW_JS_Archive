"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSpecialEnergyBar = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  SpecialEnergyBarChiXia_1 = require("./Role/SpecialEnergyBarChiXia"),
  SpecialEnergyBarJianXin_1 = require("./Role/SpecialEnergyBarJianXin"),
  SpecialEnergyBarJinXi_1 = require("./Role/SpecialEnergyBarJinXi"),
  SpecialEnergyBarSanHua_1 = require("./Role/SpecialEnergyBarSanHua"),
  SpecialEnergyBarMorph_1 = require("./SpecialEnergyBarMorph"),
  SpecialEnergyBarMorphCountDown_1 = require("./SpecialEnergyBarMorphCountDown"),
  SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint"),
  SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate"),
  SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot"),
  specialEnergyBarClassList = [
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
    var a = this.Zct(r);
    if (a) {
      var i = [];
      if ((i.push(this.emt(e, r, 0, a)), a.TagEnergyBarIdMap))
        for (var [n, t] of a.TagEnergyBarIdMap) {
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
        if (0 !== e)
          return ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
            e,
          );
      }
    }
  }
  async emt(e, r, a, i) {
    var n = new specialEnergyBarClassList[i.PrefabType]();
    n.InitData(r, i),
      this.Yct.set(a, n),
      await n.InitByPathAsync(e, i.PrefabPath);
  }
  zct(r = !1) {
    if (this.Yct.size <= 1) this.Yct.get(0)?.SetVisible(!0, 1);
    else {
      var a,
        i,
        n = this.wnt?.GameplayTagComponent;
      let e = 0;
      for (const o of this.Yct.keys())
        if (0 !== o && n?.HasTag(o)) {
          e = o;
          break;
        }
      for ([a, i] of this.Yct) {
        var t = a === e;
        i.SetVisible(t, 1), r && i.OnChangeVisibleByTagChange(t);
      }
    }
  }
  tmt(e, r) {
    var a = this.wnt?.GameplayTagComponent;
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
//# sourceMappingURL=RoleSpecialEnergyBar.js.map
