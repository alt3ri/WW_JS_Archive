"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotSpring25Enter =
    exports.RedDotSpring25Invite =
    exports.RedDotSpring25Reward =
    exports.RedDotSpring25AllLetter =
      void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotSpring25AllLetter extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.Spring25InviteDone,
      EventDefine_1.EEventName.Spring25ActivityParseDone,
      EventDefine_1.EEventName.Spring25CloseLetterList,
    ];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.Spring25Model.HasNewLetter;
  }
}
exports.RedDotSpring25AllLetter = RedDotSpring25AllLetter;
class RedDotSpring25Reward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.Spring25DrawRewardDone,
      EventDefine_1.EEventName.Spring25SkinRewardDone,
      EventDefine_1.EEventName.Spring25InviteDone,
      EventDefine_1.EEventName.Spring25ActivityParseDone,
    ];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.Spring25Model.HasAnyRewardExternal;
  }
}
exports.RedDotSpring25Reward = RedDotSpring25Reward;
class RedDotSpring25Invite extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.Spring25InviteDone,
      EventDefine_1.EEventName.Spring25ActivityParseDone,
    ];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.Spring25Model.IsInviteAvailableExternal;
  }
}
exports.RedDotSpring25Invite = RedDotSpring25Invite;
class RedDotSpring25Enter extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.Spring25DrawRewardDone,
      EventDefine_1.EEventName.Spring25SkinRewardDone,
      EventDefine_1.EEventName.Spring25InviteDone,
      EventDefine_1.EEventName.Spring25ActivityParseDone,
    ];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.Spring25Model.HasRedDot;
  }
}
exports.RedDotSpring25Enter = RedDotSpring25Enter;
//# sourceMappingURL=RedDotSpring25.js.map
