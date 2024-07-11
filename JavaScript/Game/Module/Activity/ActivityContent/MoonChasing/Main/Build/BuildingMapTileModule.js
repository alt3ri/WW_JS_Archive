"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingMapTileModule = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  BuildingItem_1 = require("./BuildingItem"),
  BuildingMapShowRoleModule_1 = require("./BuildingMapShowRoleModule"),
  BuildingMapTileMgr_1 = require("./BuildingMapTileMgr"),
  BuildingRoleItem_1 = require("./BuildingRoleItem");
class TileItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super(), (this.TileMgr = i), (this.n8 = "");
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(i, t, e) {
    this.n8 = i;
  }
  async RefreshAsync() {
    await this.SetTextureAsync(this.n8, this.GetTexture(0));
  }
}
class BuildingMapTileModule extends UiPanelBase_1.UiPanelBase {
  constructor(i, t) {
    super(),
      (this.NeedLoadingFixRole = i),
      (this.NeedLoadingShowRoleItem = t),
      (this.lRn = new BuildingMapTileMgr_1.BuildingMapTileMgr()),
      (this.MapLayout = void 0),
      (this._Rn = new Map()),
      (this.GWs = []),
      (this.TSa = void 0),
      (this.uRn = () => new TileItem(this.lRn));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
    ];
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (!(i.length < 2)) {
      var t = parseInt(i[1]),
        t = this._Rn.get(t);
      if (void 0 !== t) return t.GetGuideUiItemAndUiItemForShowEx(i);
    }
  }
  async cRn() {
    this.MapLayout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(0),
      this.uRn,
      this.GetItem(1).GetOwner(),
    );
    var i = this.lRn.CreateTilesPathList();
    await this.MapLayout.RefreshByDataAsync(i), await this.Hca();
  }
  async Hca() {
    var i = [];
    for (const t of this.MapLayout.GetLayoutItemList())
      i.push(t.RefreshAsync());
    await Promise.all(i);
  }
  Pda() {
    var i = [];
    return (
      i.push(this.GetItem(3)),
      i.push(this.GetItem(4)),
      i.push(this.GetItem(5)),
      i.push(this.GetItem(6)),
      i.push(this.GetItem(7)),
      i.push(this.GetItem(8)),
      i.push(this.GetItem(9)),
      i.push(this.GetItem(10)),
      i.push(this.GetItem(11)),
      i.push(this.GetItem(12)),
      i
    );
  }
  async mRn() {
    var e = this.Pda(),
      s = [],
      r =
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingConfigListBySort();
    for (let i = 0, t = r.length; i < t; i++) {
      var a = e[i],
        h = r[i].Id,
        o = new BuildingItem_1.BuildingItem(h);
      this._Rn.set(h, o),
        s.push(o.CreateThenShowByResourceIdAsync("UiItem_BuildItem", a));
    }
    await Promise.all(s);
  }
  async uyi(i, t) {
    var e = new BuildingRoleItem_1.BuildingRoleItem();
    this.GWs.push(e),
      await e.CreateThenShowByResourceIdAsync("UiItem_RoleTalk", i),
      await e.RefreshSpine(t);
  }
  OWs(t, e) {
    var s = new Set(),
      r = [];
    for (let i = 1; i <= t; i++) {
      let i = Math.floor(Math.random() * e);
      for (; s.has(i); ) i = Math.floor(Math.random() * e);
      s.add(i), r.push(i);
    }
    return r;
  }
  async NWs() {
    if (this.NeedLoadingFixRole) {
      var i =
        ModelManager_1.ModelManager.MoonChasingBusinessModel.GetLastPopularityConfig();
      if (i && 0 !== i.NpcCount) {
        var t = this.GetItem(2);
        t.SetUIActive(!1);
        for (const c of this.GWs) c.Destroy();
        this.GWs.length = 0;
        var e = t.AttachChildren,
          s = e.Num(),
          r = [],
          a =
            ModelManager_1.ModelManager.MoonChasingBusinessModel.GetUnlockHelpEditTeamDataList(
              !0,
            ),
          h = Math.min(i.NpcCount, a.length);
        if (s <= h) {
          var o = this.OWs(s, a.length);
          for (let i = 0; i < s; i++) {
            var n = e.Get(i),
              l = a[o[i]].Id;
            r.push(this.uyi(n, l));
          }
        } else {
          var u = this.OWs(h, s),
            d = this.OWs(h, a.length);
          for (let i = 0; i < u.length; ++i) {
            var _ = e.Get(u[i]),
              M = a[d[i]].Id;
            r.push(this.uyi(_, M));
          }
        }
        await Promise.all(r), t.SetUIActive(!0);
        h = this.OWs(1, this.GWs.length);
        this.GWs[h[0]].ShowDialog(i.NpcDialog);
      }
    }
  }
  async LSa() {
    var i = this.GetItem(13);
    i.SetUIActive(!1),
      this.NeedLoadingShowRoleItem &&
        ((this.TSa =
          new BuildingMapShowRoleModule_1.BuildingMapShowRoleModule()),
        await this.TSa.CreateByActorAsync(i.GetOwner()),
        this.TSa.SetActive(!0));
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.cRn(), this.mRn(), this.LSa()]);
  }
  RefreshRole() {
    this.NWs();
  }
  SetAllBuildingExhibitionMode(i) {
    for (const t of this._Rn.values())
      t.SetExhibitionMode(i), t.SetInteractive(!i);
  }
  SetBuildingItemActive(i) {
    for (const t of this._Rn.values()) t.SetBuildingItemActive(i);
  }
  RefreshBuildingItem(i) {
    this._Rn.get(i).Refresh();
  }
}
exports.BuildingMapTileModule = BuildingMapTileModule;
//# sourceMappingURL=BuildingMapTileModule.js.map
