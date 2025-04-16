"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPostAkEventHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbPostAkEventGlobal_1 = require("./FbPostAkEventGlobal"),
  FbPostAkEventTargeted_1 = require("./FbPostAkEventTargeted");
class UnionPostAkEventHelper {
  static GetUnionPostAkEventObject(t) {
    switch (t) {
      case fb_action_1.UnionPostAkEvent.PostAkEventGlobal:
        return new fb_action_1.PostAkEventGlobal();
      case fb_action_1.UnionPostAkEvent.PostAkEventTargeted:
        return new fb_action_1.PostAkEventTargeted();
      default:
        return;
    }
  }
  static ReadUnionPostAkEvent(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_action_1.UnionPostAkEvent.PostAkEventGlobal:
          return FbPostAkEventGlobal_1.FbPostAkEventGlobal.Create(e);
        case fb_action_1.UnionPostAkEvent.PostAkEventTargeted:
          return FbPostAkEventTargeted_1.FbPostAkEventTargeted.Create(e);
        default:
          return;
      }
  }
}
exports.UnionPostAkEventHelper = UnionPostAkEventHelper;
//# sourceMappingURL=UnionPostAkEventHelper.js.map
