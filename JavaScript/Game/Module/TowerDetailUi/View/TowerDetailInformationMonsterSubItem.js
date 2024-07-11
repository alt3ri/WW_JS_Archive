"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailInformationMonsterSubItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailInformationMonsterSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.TLo = 0),
      (this.LLo = 0),
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
    (this.TLo = e), (this.LLo = t), this.Og();
  }
  Og() {
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(
      this.TLo,
    );
    var e = (this.GetText(0).SetText(e), this.LLo.toString());
    var e =
      (this.GetText(1).SetText(e),
      ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(this.TLo));
    this.SetTextureByPath(e, this.GetTexture(2));
  }
}
exports.TowerDetailInformationMonsterSubItem =
  TowerDetailInformationMonsterSubItem;
// # sourceMappingURL=TowerDetailInformationMonsterSubItem.js.map
