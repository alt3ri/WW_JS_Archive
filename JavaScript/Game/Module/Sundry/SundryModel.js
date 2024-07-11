"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsActorData = exports.SundryModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TestModuleBridge_1 = require("../../Bridge/TestModuleBridge"),
  Info_1 = require("../../../Core/Common/Info");
class SundryModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.AccountGmId = 0),
      (this.SceneCheckOn = !1),
      (this.RoleMoveDebugLogOn = !1),
      (this.GuideTriggerName = ""),
      (this.GmBlueprintGmIsOpen = !1),
      (this.GmBlueprintGmWinDebugIsOpen = !1),
      (this.CurrentGmRunState = !1),
      (this.RunningGmName = ""),
      (this.CanOpenGmView = !1),
      (this.IsBlockTips = !1),
      (this.eIn = 0),
      (this.EnableDebugDetailSet = new Set()),
      (this.TipsActorDataMap = void 0);
  }
  set BlockTpDungeonCount(t) {
    this.eIn = t < 0 ? 0 : t;
  }
  get BlockTpDungeonCount() {
    return this.eIn;
  }
  IsBlockTpDungeon() {
    return 0 < this.BlockTpDungeonCount;
  }
  ToggleDebugDetail(t, e) {
    e ? this.EnableDebugDetailSet.add(t) : this.EnableDebugDetailSet.delete(t);
  }
  IsEnableDebugDetail(t) {
    return this.EnableDebugDetailSet.has(t);
  }
  OnInit() {
    return (
      Info_1.Info.IsBuildShipping ||
        (TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
          (t) => {
            t &&
              t.GmBlueprintFunctionLib &&
              (this.RIo = t.GmBlueprintFunctionLib);
          },
        ),
        TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
          (t) => {
            t &&
              t.GmUniverseEditorFunctionLib &&
              (this.UIo = t.GmUniverseEditorFunctionLib);
          },
        )),
      !0
    );
  }
  GetGmBlueprintFunctionLib() {
    return this.RIo;
  }
  GetGmUniverseEditorFunctionLib() {
    return this.UIo;
  }
}
exports.SundryModel = SundryModel;
class TipsActorData {
  constructor(t, e, s) {
    (this.Id = t),
      (this.InitTransform = e),
      (this.InitParam = s),
      (this.Actor = void 0);
  }
}
exports.TipsActorData = TipsActorData;
//# sourceMappingURL=SundryModel.js.map
