"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillLeftRouletteItem = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
class BattleSkillLeftRouletteItem extends UiPanelBase_1.UiPanelBase {
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
    "Gamepad_LeftShoulder" !== e.RouletteKey &&
      e.RouletteKey &&
      ((e = { KeyName: e.RouletteKey }), this.Qtt.RefreshByKeyList(e));
  }
  RefreshVisible() {
    var e;
    this.IsDestroyOrDestroying ||
      (!Info_1.Info.IsInGamepad() || (e = this._Ze).GetIsPressCombineButton()
        ? this.SetActive(!1)
        : ((e =
            "Gamepad_LeftShoulder" !== e.RouletteKey &&
            void 0 !== e.RouletteKey),
          this.SetActive(e)));
  }
}
exports.BattleSkillLeftRouletteItem = BattleSkillLeftRouletteItem;
//# sourceMappingURL=BattleSkillLeftRouletteItem.js.map
