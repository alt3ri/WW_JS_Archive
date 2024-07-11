"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuildingMapShowRoleModule = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class BuildingMapShowRoleModule extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UITexture],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UITexture],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UITexture],
      [12, UE.UITexture],
    ];
  }
  GetRoleTextureList() {
    var e = [];
    return (
      e.push(this.GetTexture(0)),
      e.push(this.GetTexture(1)),
      e.push(this.GetTexture(2)),
      e.push(this.GetTexture(3)),
      e.push(this.GetTexture(4)),
      e.push(this.GetTexture(5)),
      e.push(this.GetTexture(6)),
      e.push(this.GetTexture(7)),
      e.push(this.GetTexture(8)),
      e.push(this.GetTexture(9)),
      e.push(this.GetTexture(10)),
      e.push(this.GetTexture(11)),
      e.push(this.GetTexture(12)),
      e
    );
  }
  async OnBeforeStartAsync() {
    var e = this.GetRoleTextureList(),
      i = [];
    for (const t of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList(
      !0,
    )) {
      var s = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(
          t.Id,
        ),
        a = e[s.MapSortId - 1];
      a.SetUIActive(t.IsOwn),
        t.IsOwn && ((s = this.SetTextureAsync(s.Portrait, a)), i.push(s));
    }
    await Promise.all(i);
  }
}
exports.BuildingMapShowRoleModule = BuildingMapShowRoleModule;
//# sourceMappingURL=BuildingMapShowRoleModule.js.map
