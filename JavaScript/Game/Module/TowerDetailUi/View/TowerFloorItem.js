"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerFloorItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  TowerData_1 = require("../TowerData"),
  TowerModel_1 = require("../TowerModel"),
  TowerRoleSimpleItem_1 = require("./TowerRoleSimpleItem"),
  TowerStarsSimpleItem_1 = require("./TowerStarsSimpleItem");
class TowerFloorItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.IDo = void 0),
      (this.TDo = -1),
      (this.Rjt = !1),
      (this.BDo = -1),
      (this.$be = void 0),
      (this.tFe = void 0),
      (this.kqe = (e) => {
        this.IDo && 1 === e && this.IDo(this.TDo, this.Rjt);
      }),
      (this.vke = () => {
        return new TowerStarsSimpleItem_1.TowerStarsSimpleItem();
      }),
      (this.nFe = () => {
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
      this.vke,
    )),
      (this.tFe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(4),
        this.nFe,
      )),
      this.SetToggleState(0);
  }
  Refresh(e, t, i) {
    (this.TDo = e),
      (this.Rjt = !ModelManager_1.ModelManager.TowerModel.GetFloorIsUnlock(
        this.TDo,
      ));
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e),
      o =
        (this.GetText(2).SetText("" + r.Floor),
        ModelManager_1.ModelManager.TowerModel.GetFloorData(this.TDo)),
      s = ((this.BDo = o?.Star ?? 0), []);
    for (let e = 1; e <= TowerModel_1.FLOOR_STAR; e++) s.push(this.BDo >= e);
    this.$be.RefreshByData(s);
    var h = [];
    if (o) for (const a of o.Formation) h.push(a.O6n);
    for (; h.length < TowerData_1.TOWER_TEAM_MAX_NUMBER; ) h.push(0);
    this.tFe.RefreshByData(h),
      this.SetTextureByPath(r.ItemBgPath, this.GetTexture(1)),
      this.Rjt
        ? this.GetExtendToggle(5).SetToggleState(2)
        : this.GetExtendToggle(5).SetToggleState(0),
      ModelManager_1.ModelManager.TowerModel.DefaultFloor === e &&
        this.SetToggleState(1);
  }
  BindOnClickToggle(e) {
    this.IDo = e;
  }
  OnBeforeDestroy() {
    (this.IDo = void 0), (this.$be = void 0), (this.tFe = void 0);
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e);
  }
}
exports.TowerFloorItem = TowerFloorItem;
//# sourceMappingURL=TowerFloorItem.js.map
