"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapOperationQueue = void 0);
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiAsyncTaskManager_1 = require("../../../../Ui/Base/UiAsyncTaskManager");
class MapOperationQueue {
  static Run(a) {
    var s = new UiAsyncTask_1.UiAsyncTask(
      "MapOperationQueue." + a.OpName,
      async () => {
        a.IsValidate() && (await a.Execute());
      },
    );
    this.rn1.RunTask(s);
  }
  static RunMapMark(a) {
    (a.OpName = a.OpName ?? a.MarkId + "." + a.MarkType), this.Run(a);
  }
  static Clear() {
    this.rn1.CancelAllTask();
  }
}
(exports.MapOperationQueue = MapOperationQueue).rn1 =
  new UiAsyncTaskManager_1.UiAsyncTaskManager();
//# sourceMappingURL=MapOperationQueue.js.map
