"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonMonsterGrid = void 0);
const ue_1 = require("ue"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonMonsterGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(), (this.Vli = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIText],
      [2, ue_1.UITexture],
      [3, ue_1.UITexture],
    ];
  }
  Refresh(e, r, a) {
    this.Vli = e;
    var i,
      n = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(
        this.Vli,
      );
    this.GetText(0).SetText(n);
    let t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId,
    ).EntityLevel;
    t ||
      ((n =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel
          .SelectInstanceId),
      (i = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel),
      ([o, s] =
        ModelManager_1.ModelManager.ActivityModel.CheckActivityLevelBelongToType(
          n,
        )),
      (t = o
        ? ModelManager_1.ModelManager.ActivityModel.GetActivityLevelRecommendLevel(
            n,
            i,
            s,
          )
        : ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
            n,
            i,
          ))),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "LevelText", t);
    var o = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
        this.Vli,
      ),
      s =
        (this.SetTextureByPath(o, this.GetTexture(2)),
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e)
          .ElementId),
      n = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(s);
    this.SetTextureByPath(n.Icon, this.GetTexture(3));
  }
}
exports.InstanceDungeonMonsterGrid = InstanceDungeonMonsterGrid;
//# sourceMappingURL=InstanceDungeonMonsterGrid.js.map
