"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemConfrimBox = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemConfrimBox extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    if (!e) return !0;
    const r = new CustomPromise_1.CustomPromise();
    (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e.BoardId)),
      (e.FinishOpenFunction = (e) => {
        r.SetResult(e);
      }),
      (e =
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ));
    return !!e && r.Promise;
  }
  GetViewName(e, o) {
    return ControllerHolder_1.ControllerHolder.ConfirmBoxController.GetUiViewName(
      e.BoardId,
    );
  }
}
exports.OpenSystemConfrimBox = OpenSystemConfrimBox;
//# sourceMappingURL=OpenSystemConfrimBox.js.map
