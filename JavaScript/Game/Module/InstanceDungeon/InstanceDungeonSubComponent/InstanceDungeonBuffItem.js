"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonBuffItem = void 0);
const ue_1 = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager");
class InstanceDungeonBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.Gli = () => {
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .SelectInstanceId,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.Gli]]);
  }
  OnStart() {
    this.Uth &&
      this.RefreshItem(this.Uth.BuffText, this.Uth.ShowMonsterPreview);
  }
  RefreshItem(e, s) {
    this.InAsyncLoading()
      ? (this.Uth = { BuffText: e, ShowMonsterPreview: s })
      : (this.GetButton(1).RootUIComp.SetUIActive(s),
        e
          ? (this.GetText(0).SetUIActive(!0), this.GetText(0).ShowTextNew(e))
          : this.GetText(0).SetUIActive(!1));
  }
}
exports.InstanceDungeonBuffItem = InstanceDungeonBuffItem;
//# sourceMappingURL=InstanceDungeonBuffItem.js.map
