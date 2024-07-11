"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationMonsterSubItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailInformationMonsterSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.SDo = 0),
      (this.yDo = 0),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ];
  }
  OnStart() {}
  Update(e, t) {
    (this.SDo = e), (this.yDo = t), this.Og();
  }
  Og() {
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(
        this.SDo,
      ),
      e = (this.GetText(0).SetText(e), this.yDo.toString()),
      e =
        (this.GetText(1).SetText(e),
        ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(
          this.SDo,
        ));
    this.SetTextureByPath(e, this.GetTexture(2));
  }
}
exports.TowerDetailInformationMonsterSubItem =
  TowerDetailInformationMonsterSubItem;
//# sourceMappingURL=TowerDetailInformationMonsterSubItem.js.map
