"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiComponentUtil = void 0);
const UE = require("ue"),
  AudioController_1 = require("../../../Core/Audio/AudioController");
class UiComponentUtil {
  static SetStarActiveNew(o, e, t = void 0, i = !0) {
    var r = o.length,
      n = t ?? r;
    let l = void 0;
    for (let t = 0; t < r; ++t) {
      var u = o[t];
      u.SetActive(t + 1 <= n),
        t + 1 > n ||
          (u.SetImgStarOnActive(t < e),
          i
            ? (u.SetImgStarNextActive(t === e),
              t === e && (l = u),
              u.SetImgStarOffActive(t > e))
            : (u.SetImgStarNextActive(!1),
              u.SetImgStarOffActive(t >= e),
              t === e - 1 && (l = u)));
    }
    return l;
  }
  static SetMoneyState(t, o, e, i) {
    t.SetText(e.toString());
    e = e <= i;
    return (
      o.SetText(i.toString()),
      o.SetChangeColor(e, o.changeColor),
      (t.useChangeColor = !e),
      e
    );
  }
  static BindAudioEvent(e) {
    e instanceof UE.UIButtonComponent
      ? e.OnPostAudioStateEvent.Bind((t, o) => {
          AudioController_1.AudioController.PostSelectableAudioEvent(
            o,
            e.GetOwner(),
          );
        })
      : e instanceof UE.UIExtendToggle &&
        e.OnPostAudioStateEvent.Bind((t, o) => {
          AudioController_1.AudioController.PostSelectableAudioEvent(
            o,
            e.GetOwner(),
          );
        });
  }
  static UnBindAudioEventByName(t) {
    AudioController_1.AudioController.StopSelectableAudioEventByName(t);
  }
  static UnBindAudioEvent(t) {
    AudioController_1.AudioController.StopSelectableAudioEvent(t.GetOwner());
  }
}
exports.UiComponentUtil = UiComponentUtil;
//# sourceMappingURL=UiComponentUtil.js.map
