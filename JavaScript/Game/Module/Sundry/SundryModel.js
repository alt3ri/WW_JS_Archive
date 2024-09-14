"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsActorData = exports.SundryModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TestModuleBridge_1 = require("../../Bridge/TestModuleBridge"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
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
      (this.ModuleDebugLevelMap = new Map()),
      (this.TipsActorDataMap = void 0);
  }
  set BlockTpDungeonCount(e) {
    this.eIn = e < 0 ? 0 : e;
  }
  get BlockTpDungeonCount() {
    return this.eIn;
  }
  IsBlockTpDungeon() {
    return 0 < this.BlockTpDungeonCount;
  }
  ChangeModuleDebugLevel(e, t) {
    0 < t
      ? this.ModuleDebugLevelMap.set(e, t)
      : this.ModuleDebugLevelMap.delete(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChangeModuleDebugLevel,
        e,
        t,
      );
  }
  GetModuleDebugLevel(e) {
    return this.ModuleDebugLevelMap.get(e) ?? 0;
  }
  OnInit() {
    return (
      Info_1.Info.IsBuildShipping ||
        (TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
          (e) => {
            e &&
              e.GmBlueprintFunctionLib &&
              (this.RIo = e.GmBlueprintFunctionLib);
          },
        ),
        TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(
          (e) => {
            e &&
              e.GmUniverseEditorFunctionLib &&
              (this.UIo = e.GmUniverseEditorFunctionLib);
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
  constructor(e, t, s) {
    (this.Id = e),
      (this.InitTransform = t),
      (this.InitParam = s),
      (this.Actor = void 0);
  }
}
exports.TipsActorData = TipsActorData;
//# sourceMappingURL=SundryModel.js.map
