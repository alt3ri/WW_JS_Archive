"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerFloorItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TowerData_1 = require("../TowerData");
const TowerModel_1 = require("../TowerModel");
const TowerRoleSimpleItem_1 = require("./TowerRoleSimpleItem");
const TowerStarsSimpleItem_1 = require("./TowerStarsSimpleItem");
class TowerFloorItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.DLo = void 0),
      (this.RLo = -1),
      (this.RHt = !1),
      (this.GLo = -1),
      (this.$be = void 0),
      (this.Nke = void 0),
      (this.kqe = (e) => {
        this.DLo && e === 1 && this.DLo(this.RLo, this.RHt);
      }),
      (this.sAt = () => {
        return new TowerStarsSimpleItem_1.TowerStarsSimpleItem();
      }),
      (this.Hke = () => {
        return new TowerRoleSimpleItem_1.TowerRoleSimpleItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    (this.$be = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.sAt,
    )),
      (this.Nke = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.Hke,
      )),
      this.SetToggleState(0);
  }
  Refresh(e, t, i) {
    (this.RLo = e),
      (this.RHt = !ModelManager_1.ModelManager.TowerModel.GetFloorIsUnlock(
        this.RLo,
      ));
    const r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    const o =
      (this.GetText(2).SetText("" + r.Floor),
      ModelManager_1.ModelManager.TowerModel.GetFloorData(this.RLo));
    const s = ((this.GLo = o?.Star ?? 0), []);
    for (let e = 1; e <= TowerModel_1.FLOOR_STAR; e++) s.push(this.GLo >= e);
    this.$be.RefreshByData(s);
    const h = [];
    if (o) for (const a of o.Formation) h.push(a.l3n);
    for (; h.length < TowerData_1.TOWER_TEAM_MAX_NUMBER; ) h.push(0);
    this.Nke.RefreshByData(h),
      this.SetTextureByPath(r.ItemBgPath, this.GetTexture(1)),
      this.RHt
        ? this.GetExtendToggle(5).SetToggleState(2)
        : this.GetExtendToggle(5).SetToggleState(0),
      ModelManager_1.ModelManager.TowerModel.DefaultFloor === e &&
        this.SetToggleState(1);
  }
  BindOnClickToggle(e) {
    this.DLo = e;
  }
  OnBeforeDestroy() {
    (this.DLo = void 0), (this.$be = void 0), (this.Nke = void 0);
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e);
  }
}
exports.TowerFloorItem = TowerFloorItem;
// # sourceMappingURL=TowerFloorItem.js.map
