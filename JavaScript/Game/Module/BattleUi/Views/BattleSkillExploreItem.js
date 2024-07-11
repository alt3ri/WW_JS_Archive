"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillExploreItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiManager_1 = require("../../../Ui/UiManager");
const BattleSkillItem_1 = require("./BattleSkillItem");
class BattleSkillExploreItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments),
      (this.qet = void 0),
      (this.Oet = void 0),
      (this.ket = (e, t) => {
        this.IsLongPress || (this.qet.GetOwner() === t && (this.Oet = e));
      }),
      (this.OnTouch = (e, t) => {
        let i;
        this.IsLongPress ||
          ((e = Number(e)),
          (i =
            TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
              e,
            )?.GetPointerEventData()?.pressComponent) &&
            i.GetOwner() === this.qet.GetOwner() &&
            (this.Oet = e));
      });
  }
  GetPointEventButton() {
    return this.qet;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([12, UE.UIButtonComponent]);
  }
  Initialize(e) {
    (this.qet = this.GetButton(12)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GuideTouchIdInject,
        this.ket,
      ),
      super.Initialize(e);
  }
  Reset() {
    (this.qet = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GuideTouchIdInject,
        this.ket,
      ),
      super.Reset();
  }
  IsNeedLongPress() {
    return !0;
  }
  OnSkillButtonPressed() {
    (ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton = !1),
      super.OnSkillButtonPressed();
  }
  OnSkillButtonReleased() {
    this.IsLongPress && UiManager_1.UiManager.CloseView("PhantomExploreView"),
      super.OnSkillButtonReleased();
  }
  OnSkillButtonCancel() {
    this.OnSkillButtonReleased();
  }
  OnLongPressButton() {
    super.OnLongPressButton(),
      (ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton = !0),
      void 0 !== this.Oet &&
        (UiManager_1.UiManager.OpenView("PhantomExploreView", this.Oet),
        (this.Oet = void 0));
  }
}
exports.BattleSkillExploreItem = BattleSkillExploreItem;
// # sourceMappingURL=BattleSkillExploreItem.js.map
