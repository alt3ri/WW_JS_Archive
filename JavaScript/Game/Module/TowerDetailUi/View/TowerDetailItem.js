"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDetailItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class TowerDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.IDo = void 0),
      (this.TDo = -1),
      (this.kqe = () => {
        this.IDo && this.IDo(this.TDo);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  Refresh(e, t, i) {
    this.TDo = e;
    var r = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "Text_TowerOnlyFloor_Text",
      r.Floor,
    ),
      e === ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor
        ? this.SetToggleState(1)
        : this.SetToggleState(0);
  }
  BindOnClickToggle(e) {
    this.IDo = e;
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e), 1 === e && this.kqe();
  }
  OnBeforeDestroy() {
    this.IDo = void 0;
  }
}
exports.TowerDetailItem = TowerDetailItem;
//# sourceMappingURL=TowerDetailItem.js.map
