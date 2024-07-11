"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerMonsterItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TowerMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
    ];
  }
  Refresh(e, r, t) {
    var n = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
    var n =
      (this.SetTextureByPath(n, this.GetTexture(2)),
      ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e)
        .ElementId);
    var n = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(n);
    var n =
      (this.SetTextureByPath(n.Icon, this.GetTexture(3)),
      this.GetItem(4)?.SetColor(UE.Color.FromHex(n.ElementColor)),
      ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(e));
    var e =
      (this.GetText(0).SetText(n),
      ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
        ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
      ));
    var n = e.InstanceId;
    var e =
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        n,
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "Text_InstanceDungeonRecommendLevel_Text",
      e,
    );
  }
  SetLevelText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "Text_InstanceDungeonRecommendLevel_Text",
      e,
    );
  }
}
exports.TowerMonsterItem = TowerMonsterItem;
// # sourceMappingURL=TowerMonsterItem.js.map
