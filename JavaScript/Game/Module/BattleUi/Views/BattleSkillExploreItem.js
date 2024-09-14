"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleSkillExploreItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  BattleSkillItem_1 = require("./BattleSkillItem");
class BattleSkillExploreItem extends BattleSkillItem_1.BattleSkillItem {
  constructor() {
    super(...arguments),
      (this.Jtt = void 0),
      (this.ztt = void 0),
      (this.Ztt = (e, t) => {
        this.IsLongPress || (this.Jtt.GetOwner() === t && (this.ztt = e));
      }),
      (this.OnTouch = (e, t) => {
        var i;
        this.IsLongPress ||
          ((e = Number(e)),
          (i =
            TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(
              e,
            )?.GetPointerEventData()?.pressComponent) &&
            i.GetOwner() === this.Jtt.GetOwner() &&
            (this.ztt = e));
      });
  }
  GetPointEventButton() {
    return this.Jtt;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(),
      this.ComponentRegisterInfos.push([12, UE.UIButtonComponent]);
  }
  Initialize(e) {
    (this.Jtt = this.GetButton(12)),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GuideTouchIdInject,
        this.Ztt,
      ),
      super.Initialize(e);
  }
  Reset() {
    (this.Jtt = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GuideTouchIdInject,
        this.Ztt,
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
    super.OnSkillButtonReleased();
  }
  OnSkillButtonCancel() {
    this.OnSkillButtonReleased();
  }
  OnLongPressButton() {
    super.OnLongPressButton(),
      (ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton = !0),
      void 0 !== this.ztt &&
        (UiManager_1.UiManager.OpenView("PhantomExploreView", [1, this.ztt]),
        (this.ztt = void 0));
  }
}
exports.BattleSkillExploreItem = BattleSkillExploreItem;
//# sourceMappingURL=BattleSkillExploreItem.js.map
