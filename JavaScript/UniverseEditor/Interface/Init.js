"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getWorkspaceBranchDefine = exports.isUe5 = void 0);
const EditorDefine_1 = require("../../Core/Define/EditorDefine");
function isUe5() {
  return "ue5" === EditorDefine_1.RUNTIME;
}
function getWorkspaceBranchDefine() {
  return EditorDefine_1.WORKSPACE_BRANCH;
}
(exports.isUe5 = isUe5),
  (exports.getWorkspaceBranchDefine = getWorkspaceBranchDefine);
//# sourceMappingURL=Init.js.map
