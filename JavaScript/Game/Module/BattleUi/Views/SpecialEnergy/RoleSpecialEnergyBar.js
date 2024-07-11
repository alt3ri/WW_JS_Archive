"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSpecialEnergyBar = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  SpecialEnergyBarChiXia_1 = require("./Role/SpecialEnergyBarChiXia"),
  SpecialEnergyBarJianXin_1 = require("./Role/SpecialEnergyBarJianXin"),
  SpecialEnergyBarJinXi_1 = require("./Role/SpecialEnergyBarJinXi"),
  SpecialEnergyBarSanHua_1 = require("./Role/SpecialEnergyBarSanHua"),
  SpecialEnergyBarXiangLiYao_1 = require("./Role/SpecialEnergyBarXiangLiYao"),
  SpecialEnergyBarZheZhi_1 = require("./Role/SpecialEnergyBarZheZhi"),
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
    SpecialEnergyBarXiangLiYao_1.SpecialEnergyBarXiangLiYao,
    SpecialEnergyBarZheZhi_1.SpecialEnergyBarZheZhi,
  ];
class RoleSpecialEnergyBar {
  constructor() {
    (this.Wst = void 0),
      (this.hdt = new Map()),
      (this.ldt = []),
      (this.lne = (e, r) => {
        this._dt(!0);
      });
  }
  async InitAsync(e, r) {
    this.Wst = r;
    var a = this.udt(r);
    if (a) {
      var i = [];
      if ((i.push(this.cdt(e, r, 0, a)), a.TagEnergyBarIdMap))
        for (var [n, o] of a.TagEnergyBarIdMap) {
          this.mdt(n, this.lne);
          o =
            ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
              o,
            );
          o && i.push(this.cdt(e, r, n, o));
        }
      this._dt(), await Promise.all(i);
    }
  }
  SetVisible(e) {
    for (const r of this.hdt.values()) r.SetVisible(e, 0);
  }
  Destroy() {
    this.FYe();
    for (const e of this.hdt.values()) e.Destroy();
    this.hdt.clear();
  }
  Tick(e) {
    for (const r of this.hdt.values()) r.Tick(e);
  }
  udt(e) {
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
  async cdt(e, r, a, i) {
    var n = new specialEnergyBarClassList[i.PrefabType]();
    n.InitData(r, i),
      this.hdt.set(a, n),
      await n.InitByPathAsync(e, i.PrefabPath);
  }
  _dt(r = !1) {
    if (this.hdt.size <= 1) this.hdt.get(0)?.SetVisible(!0, 1);
    else {
      var a,
        i,
        n = this.Wst?.GameplayTagComponent;
      let e = 0;
      for (const t of this.hdt.keys())
        if (0 !== t && n?.HasTag(t)) {
          e = t;
          break;
        }
      for ([a, i] of this.hdt) {
        var o = a === e;
        i.SetVisible(o, 1), r && i.OnChangeVisibleByTagChange(o);
      }
    }
  }
  mdt(e, r) {
    var a = this.Wst?.GameplayTagComponent;
    a && ((a = a.ListenForTagAddOrRemove(e, r)), this.ldt.push(a));
  }
  FYe() {
    if (this.ldt) {
      for (const e of this.ldt) e.EndTask();
      this.ldt.length = 0;
    }
  }
}
exports.RoleSpecialEnergyBar = RoleSpecialEnergyBar;
//# sourceMappingURL=RoleSpecialEnergyBar.js.map
