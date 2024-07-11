"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemDropGrid = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  SmallItemGrid_1 = require("./SmallItemGrid/SmallItemGrid");
class CommonItemDropGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.wTt = 0),
      (this.Mne = 0),
      (this.Count = 0),
      (this.apt = void 0),
      (this.oft = void 0),
      (this.sft = void 0),
      (this.BTt = () => {
        this.oft && this.oft(this);
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
      (this.BtnBindInfo = [[0, this.BTt]]);
  }
  Refresh(t, i, e) {
    var s;
    t && (s = t[0]) && this.RefreshByItemInfo(s.ItemId, t[1], s.IncId);
  }
  RefreshByItemInfo(t, i, e) {
    (this.wTt = e),
      (this.Mne = t),
      (this.Count = i),
      (this.apt =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.Mne,
        )),
      this.apt &&
        ((t = {
          Type: 4,
          Data: [t, e],
          ItemConfigId: this.Mne,
          BottomText: 0 < i ? "" + i : "",
        }),
        this.sft.Apply(t),
        this.bTt(this.apt.QualityId));
  }
  async AsyncRefreshByItemInfo(t, i, e) {
    if (
      ((this.wTt = e),
      (this.Mne = t),
      (this.Count = i),
      (this.apt =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          this.Mne,
        )),
      this.apt)
    ) {
      const s = new CustomPromise_1.CustomPromise();
      t = {
        Type: 4,
        Data: [t, e],
        ItemConfigId: this.Mne,
        BottomText: 0 < i ? "" + i : "",
      };
      this.sft.Apply(t),
        this.bTt(this.apt.QualityId, () => {
          s.SetResult();
        }),
        await s.Promise;
    }
  }
  bTt(t, i) {
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
    (this.apt = void 0), (this.oft = void 0);
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(1).GetOwner());
  }
  GetUniqueId() {
    return this.wTt;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetItemConfig() {
    return this.apt;
  }
  BindOnClicked(t) {
    this.oft = t;
  }
}
exports.CommonItemDropGrid = CommonItemDropGrid;
//# sourceMappingURL=CommonItemDropGrid.js.map
