"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSpecialEnergyBar = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  SpecialEnergyBarBuLanTe_1 = require("./Role/SpecialEnergyBarBuLanTe"),
  SpecialEnergyBarChiXia_1 = require("./Role/SpecialEnergyBarChiXia"),
  SpecialEnergyBarChun_1 = require("./Role/SpecialEnergyBarChun"),
  SpecialEnergyBarDengDeng_1 = require("./Role/SpecialEnergyBarDengDeng"),
  SpecialEnergyBarFeibi_1 = require("./Role/SpecialEnergyBarFeibi"),
  SpecialEnergyBarJianXin_1 = require("./Role/SpecialEnergyBarJianXin"),
  SpecialEnergyBarJinXi_1 = require("./Role/SpecialEnergyBarJinXi"),
  SpecialEnergyBarKanTeLeiLa_1 = require("./Role/SpecialEnergyBarKanTeLeiLa"),
  SpecialEnergyBarKeLaiTa_1 = require("./Role/SpecialEnergyBarKeLaiTa"),
  SpecialEnergyBarKeLaiTaUltra_1 = require("./Role/SpecialEnergyBarKeLaiTaUltra"),
  SpecialEnergyBarLuoKeKe_1 = require("./Role/SpecialEnergyBarLuoKeKe"),
  SpecialEnergyBarSanHua_1 = require("./Role/SpecialEnergyBarSanHua"),
  SpecialEnergyBarWind_1 = require("./Role/SpecialEnergyBarWind"),
  SpecialEnergyBarXiaKong_1 = require("./Role/SpecialEnergyBarXiaKong"),
  SpecialEnergyBarXiangLiYao_1 = require("./Role/SpecialEnergyBarXiangLiYao"),
  SpecialEnergyBarZanni_1 = require("./Role/SpecialEnergyBarZanni"),
  SpecialEnergyBarZheZhi_1 = require("./Role/SpecialEnergyBarZheZhi"),
  SpecialEnergyBarMorph_1 = require("./SpecialEnergyBarMorph"),
  SpecialEnergyBarMorphCountDown_1 = require("./SpecialEnergyBarMorphCountDown"),
  SpecialEnergyBarPoint_1 = require("./SpecialEnergyBarPoint"),
  SpecialEnergyBarPointGraduate_1 = require("./SpecialEnergyBarPointGraduate"),
  SpecialEnergyBarSlot_1 = require("./SpecialEnergyBarSlot"),
  specialEnergyBarClassMap = new Map([
    [11, SpecialEnergyBarChun_1.SpecialEnergyBarChun],
    [150402, SpecialEnergyBarDengDeng_1.SpecialEnergyBarDengDeng],
    [110701, SpecialEnergyBarKeLaiTa_1.SpecialEnergyBarKeLaiTa],
    [110702, SpecialEnergyBarKeLaiTaUltra_1.SpecialEnergyBarKeLaiTaUltra],
    [160600, SpecialEnergyBarLuoKeKe_1.SpecialEnergyBarLuoKeKe],
    [120600, SpecialEnergyBarBuLanTe_1.SpecialEnergyBarBuLanTe],
    [150601, SpecialEnergyBarFeibi_1.SpecialEnergyBarFeibi],
    [160700, SpecialEnergyBarKanTeLeiLa_1.SpecialEnergyBarKanTeLeiLa],
    [140600, SpecialEnergyBarWind_1.SpecialEnergyBarWind],
    [140700, SpecialEnergyBarXiaKong_1.SpecialEnergyBarXiaKong],
    [150700, SpecialEnergyBarZanni_1.SpecialEnergyBarZanni],
  ]),
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
      (this.lne = (e, a) => {
        this._dt(!0);
      });
  }
  async InitAsync(e, a) {
    this.Wst = a;
    var r = this.udt(a);
    if (r) {
      var i = [];
      if ((i.push(this.cdt(e, a, 0, r)), r.TagEnergyBarIdMap))
        for (var [n, l] of r.TagEnergyBarIdMap) {
          this.mdt(n, this.lne);
          l =
            ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(
              l,
            );
          l && i.push(this.cdt(e, a, n, l));
        }
      this._dt(), await Promise.all(i);
    }
  }
  SetVisible(e) {
    for (const a of this.hdt.values()) a.SetVisible(e, 0);
  }
  Destroy() {
    this.FYe();
    for (const e of this.hdt.values()) e.Destroy();
    this.hdt.clear();
  }
  Tick(e) {
    for (const a of this.hdt.values()) a.Tick(e);
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
  async cdt(e, a, r, i) {
    let n = specialEnergyBarClassMap.get(i.ExtraType);
    var l = new (n = n || specialEnergyBarClassList[i.PrefabType])();
    l.InitData(a, i),
      this.hdt.set(r, l),
      await l.InitByPathAsync(e, i.PrefabPath);
  }
  _dt(a = !1) {
    if (this.hdt.size <= 1) this.hdt.get(0)?.SetVisible(!0, 1);
    else {
      var r,
        i,
        n = this.Wst?.GameplayTagComponent;
      let e = 0;
      for (const g of this.hdt.keys())
        if (0 !== g && n?.HasTag(g)) {
          e = g;
          break;
        }
      for ([r, i] of this.hdt) {
        var l = r === e;
        i.SetVisible(l, 1), a && i.OnChangeVisibleByTagChange(l);
      }
    }
  }
  mdt(e, a) {
    var r = this.Wst?.GameplayTagComponent;
    r && ((r = r.ListenForTagAddOrRemove(e, a)), this.ldt.push(r));
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
