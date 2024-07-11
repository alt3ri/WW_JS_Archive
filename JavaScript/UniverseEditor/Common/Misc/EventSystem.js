"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.editorEventDispatcher =
    exports.clientEventDispatcher =
    exports.ClientEventDispatcher =
    exports.TabEventDispatcher =
    exports.EditorEventDispatcher =
    exports.EventDispatcher =
      void 0);
const Log_1 = require("./Log");
class EventDispatcher {
  constructor() {
    this.me = new Map();
  }
  Reg(e, t) {
    let s = this.me.get(e);
    s || ((s = new Set()), this.me.set(e, s)), s.add(t);
  }
  UnReg(e, t) {
    const s = this.me.get(e);
    s && s.has(t) ? s.delete(t) : (0, Log_1.error)(`UnReg for type ${e} error`);
  }
  SetReg(e, t, s) {
    s ? this.Reg(e, t) : this.UnReg(e, t);
  }
  HasReg(e, t) {
    return !!this.me.get(e)?.has(t);
  }
  Dispatch(e, ...t) {
    e = this.me.get(e);
    e &&
      e.forEach((e) => {
        e(...t);
      });
  }
}
exports.EventDispatcher = EventDispatcher;
const editorEventDefine = {
  RestartEditor: () => {},
  SaveCsvEditor: (e) => {},
  ResetTestEditor: () => {},
  NavToEntity: (e, t, s = 0) => {},
  AsyncCheckResult: (e) => {},
  SelectEntityDatas: (e, t) => {},
  ClearEntityAddRecords: () => {},
  RefreshActorPreviewTag: () => {},
  DelaySelectionChanged: () => {},
  ClearSelectableGridFocus: (e) => {},
  LoadUseCase: (e, t) => {},
  EditorPortAllInUse: () => {},
};
class EditorEventDispatcher extends EventDispatcher {}
exports.EditorEventDispatcher = EditorEventDispatcher;
const tabEventDefine = {
  NavToBtReferenceEntity: (e, t, s) => {},
  SearchEntity: (e, t) => {},
  SaveEditor: (e, t) => {},
};
class TabEventDispatcher extends EventDispatcher {}
exports.TabEventDispatcher = TabEventDispatcher;
const clientEventDefine = {
  GameLoginCompleted: () => {},
  ClientReady: () => {},
};
class ClientEventDispatcher extends EventDispatcher {}
(exports.ClientEventDispatcher = ClientEventDispatcher),
  (exports.clientEventDispatcher = new ClientEventDispatcher()),
  (exports.editorEventDispatcher = new EditorEventDispatcher());
// # sourceMappingURL=EventSystem.js.map
