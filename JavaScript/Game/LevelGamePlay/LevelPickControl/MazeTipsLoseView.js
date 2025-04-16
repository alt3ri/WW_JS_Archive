"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MazeTipsLoseView = void 0);
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class MazeTipsLoseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.cZt = () => {
        this.UiViewSequence.RemoveSequenceFinishEvent(
          this.UiViewSequence.StartSequenceName,
          this.cZt,
        ),
          this.CloseMe();
      });
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent(
      this.UiViewSequence.StartSequenceName,
      this.cZt,
    );
  }
}
exports.MazeTipsLoseView = MazeTipsLoseView;
//# sourceMappingURL=MazeTipsLoseView.js.map
