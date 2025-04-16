"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillRouletteItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
class BattleSkillRouletteItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Qtt = void 0),
      (this._Ze = void 0),
      (this.Aah = () => {
        this.RefreshKeyItem(), this.RefreshVisible();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(0);
    (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem()),
      await this.Qtt.CreateThenShowByActorAsync(e.GetOwner()),
      (this._Ze = ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData),
      this.RefreshKeyItem(),
      this.RefreshVisible(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiRouletteKeyChanged,
        this.Aah,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiRouletteKeyChanged,
      this.Aah,
    );
  }
  RefreshKeyItem() {
    var e = this._Ze;
    "Gamepad_LeftShoulder" === e.RouletteKey
      ? this.Qtt.RefreshByKeyList({ KeyName: "Gamepad_Right2D" })
      : e.RouletteKey ||
        (e.RouletteSecondKey &&
          ((e = { KeyName: e.RouletteSecondKey }),
          this.Qtt.RefreshByKeyList(e)));
  }
  RefreshVisible() {
    var e = this._Ze;
    e.GetIsPressCombineButton()
      ? ((e =
          "Gamepad_LeftShoulder" === e.RouletteKey ||
          (void 0 === e.RouletteKey && void 0 !== e.RouletteSecondKey)),
        this.SetActive(e))
      : this.SetActive(!1);
  }
}
exports.BattleSkillRouletteItem = BattleSkillRouletteItem;
//# sourceMappingURL=BattleSkillRouletteItem.js.map
