"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemDropGrid = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const SmallItemGrid_1 = require("./SmallItemGrid/SmallItemGrid");
class CommonItemDropGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.RIt = 0),
      (this.Mne = 0),
      (this.Count = 0),
      (this.$0t = void 0),
      (this.Wgt = void 0),
      (this.Xgt = void 0),
      (this.UIt = () => {
        this.Wgt && this.Wgt(this);
      });
  }
  Initialize(t) {
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UINiagara],
    ]),
      (this.BtnBindInfo = [[0, this.UIt]]);
  }
  Refresh(t, i, e) {
    let s;
    t && (s = t[0]) && this.RefreshByItemInfo(s.ItemId, t[1], s.IncId);
  }
  RefreshByItemInfo(t, i, e) {
    (this.RIt = e),
      (this.Mne = t),
      (this.Count = i),
      (this.$0t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.Mne,
        )),
      this.$0t &&
        ((t = {
          Type: 4,
          Data: [t, e],
          ItemConfigId: this.Mne,
          BottomText: i > 0 ? "" + i : "",
        }),
        this.Xgt.Apply(t),
        this.AIt(this.$0t.QualityId));
  }
  async AsyncRefreshByItemInfo(t, i, e) {
    if (
      ((this.RIt = e),
      (this.Mne = t),
      (this.Count = i),
      (this.$0t =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.Mne,
        )),
      this.$0t)
    ) {
      const s = new CustomPromise_1.CustomPromise();
      t = {
        Type: 4,
        Data: [t, e],
        ItemConfigId: this.Mne,
        BottomText: i > 0 ? "" + i : "",
      };
      this.Xgt.Apply(t),
        this.AIt(this.$0t.QualityId, () => {
          s.SetResult();
        }),
        await s.Promise;
    }
  }
  AIt(t, i) {
    var t =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(t);
    t &&
      ((t = t.DropItemQualityNiagaraPath),
      StringUtils_1.StringUtils.IsEmpty(t) ||
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, (t) => {
          this.GetUiNiagara(2).SetNiagaraSystem(t), i && i();
        }));
  }
  Clear() {
    (this.$0t = void 0), (this.Wgt = void 0);
  }
  OnStart() {
    (this.Xgt = new SmallItemGrid_1.SmallItemGrid()),
      this.Xgt.Initialize(this.GetItem(1).GetOwner());
  }
  GetUniqueId() {
    return this.RIt;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetItemConfig() {
    return this.$0t;
  }
  BindOnClicked(t) {
    this.Wgt = t;
  }
}
exports.CommonItemDropGrid = CommonItemDropGrid;
// # sourceMappingURL=CommonItemDropGrid.js.map
