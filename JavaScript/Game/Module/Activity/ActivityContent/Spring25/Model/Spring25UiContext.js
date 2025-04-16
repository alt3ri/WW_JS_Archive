"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25UiContext = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem");
class Spring25UiContext {
  constructor(e) {
    (this.i5l = void 0),
      (this.$Gl = void 0),
      (this.XGl = void 0),
      (this.i5l = e);
  }
  get CurrentSignId() {
    return this.$Gl;
  }
  set CurrentSignId(e) {
    this.$Gl = e;
  }
  get CurrentLetterSignId() {
    return (
      void 0 === this.XGl &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Spring25",
          64,
          "打开面板之前，未能获得TaskId，请确认Letter TaskId 是否已赋值",
        ),
      this.XGl
    );
  }
  set CurrentLetterSignId(e) {
    void 0 !== (this.XGl = e) &&
      (this.i5l.SetLetterClickedBySignId(e, !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.Spring25SelectLetter,
        e,
      ));
  }
  Dispose() {
    this.$Gl = void 0;
  }
}
exports.Spring25UiContext = Spring25UiContext;
//# sourceMappingURL=Spring25UiContext.js.map
