"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SundryModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TestModuleBridge_1 = require("../../Bridge/TestModuleBridge");
class SundryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.AccountGmId = 0),
      (this.SceneCheckOn = !1),
      (this.RoleMoveDebugLogOn = !1),
      (this.GuideTriggerName = ""),
      (this.GmBlueprintGmIsOpen = !0),
      (this.GmBlueprintGmWinDebugIsOpen = !0),
      (this.CurrentGmRunState = !1),
      (this.RunningGmName = ""),
      (this.CanOpenGmView = !1),
      (this.IsBlockTips = !1),
      (this.XEn = 0);
  }
  set BlockTpDungeonCount(e) {
    this.XEn = e < 0 ? 0 : e;
  }
  get BlockTpDungeonCount() {
    return this.XEn;
  }
  IsBlockTpDungeon() {
    return this.BlockTpDungeonCount > 0;
  }
  OnInit() {
    return (
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
        (e) => {
          e &&
            e.GmBlueprintFunctionLib &&
            (this.Pyo = e.GmBlueprintFunctionLib);
        },
      ),
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
        (e) => {
          e &&
            e.GmUniverseEditorFunctionLib &&
            (this.xyo = e.GmUniverseEditorFunctionLib);
        },
      ),
      !0
    );
  }
  GetGmBlueprintFunctionLib() {
    return this.Pyo;
  }
  GetGmUniverseEditorFunctionLib() {
    return this.xyo;
  }
}
exports.SundryModel = SundryModel;
// # sourceMappingURL=SundryModel.js.map
