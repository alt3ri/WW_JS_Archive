"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerMonsterItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  TowerElementItem_1 = require("./TowerElementItem");
class TowerMonsterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.Mli = void 0),
      (this.jli = () => {
        return new TowerElementItem_1.TowerElementItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {
    this.Mli = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.jli,
    );
  }
  Refresh(e, t, r) {
    var i = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e),
      i =
        (this.SetTextureByPath(i, this.GetTexture(2)),
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e)
          .ElementIdArray),
      i =
        (this.Mli?.RefreshByData(i),
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(e)),
      e =
        (this.GetText(0).SetText(i),
        ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        )),
      i = e.InstanceId,
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
        i,
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
//# sourceMappingURL=TowerMonsterItem.js.map
