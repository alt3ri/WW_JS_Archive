"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRoguePanelLv = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LEVEL_CHANGE_SEQ_EVENT = "LevelChange";
class MapRoguePanelLv extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.DM1 = 0),
      (this.LevelSequencePlayer = void 0),
      (this.$An = (e) => {
        e === LEVEL_CHANGE_SEQ_EVENT && this.UM1();
      }),
      (this.d2c = () => {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueMenuView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[1, this.d2c]]);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  UM1() {
    this.GetArtText(0).SetText(
      10 <= this.DM1 ? this.DM1.toString() : "0" + this.DM1,
    );
  }
  SetLv(e, t = !1) {
    this.DM1 !== e &&
      ((this.DM1 = e),
      t
        ? ((e = "LevelUp"),
          this.LevelSequencePlayer.GetCurrentSequence() === e
            ? this.LevelSequencePlayer.ReplaySequenceByKey(e)
            : this.LevelSequencePlayer.PlayLevelSequenceByName(e))
        : this.UM1());
  }
  SetButtonActive(e) {
    this.GetButton(1).SetSelfInteractive(e);
  }
}
exports.MapRoguePanelLv = MapRoguePanelLv;
//# sourceMappingURL=MapRoguePanelLv.js.map
