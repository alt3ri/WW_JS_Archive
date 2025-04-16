"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPostAkEvent =
    exports.unionToUnionPostAkEvent =
    exports.UnionPostAkEvent =
      void 0);
const post_ak_event_global_js_1 = require("../fb-action/post-ak-event-global.js"),
  post_ak_event_targeted_js_1 = require("../fb-action/post-ak-event-targeted.js");
var UnionPostAkEvent;
function unionToUnionPostAkEvent(t, e) {
  switch (UnionPostAkEvent[t]) {
    case "NONE":
      return;
    case "PostAkEventGlobal":
      return e(new post_ak_event_global_js_1.PostAkEventGlobal());
    case "PostAkEventTargeted":
      return e(new post_ak_event_targeted_js_1.PostAkEventTargeted());
    default:
      return;
  }
}
function unionListToUnionPostAkEvent(t, e, n) {
  switch (UnionPostAkEvent[t]) {
    case "NONE":
      return;
    case "PostAkEventGlobal":
      return e(n, new post_ak_event_global_js_1.PostAkEventGlobal());
    case "PostAkEventTargeted":
      return e(n, new post_ak_event_targeted_js_1.PostAkEventTargeted());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.PostAkEventGlobal = 1)] = "PostAkEventGlobal"),
    (t[(t.PostAkEventTargeted = 2)] = "PostAkEventTargeted");
})(
  (UnionPostAkEvent =
    exports.UnionPostAkEvent || (exports.UnionPostAkEvent = {})),
),
  (exports.unionToUnionPostAkEvent = unionToUnionPostAkEvent),
  (exports.unionListToUnionPostAkEvent = unionListToUnionPostAkEvent);
//# sourceMappingURL=union-post-ak-event.js.map
