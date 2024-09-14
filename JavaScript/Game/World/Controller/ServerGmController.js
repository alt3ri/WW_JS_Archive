"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerGmController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData");
class ServerGmController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(15759, ServerGmController.OnServerCommandNotify), !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(15759), !0;
  }
}
((exports.ServerGmController = ServerGmController).AnimalDebug = !1),
  (ServerGmController.OnServerCommandNotify = (e) => {
    e.wra.startsWith("GM ")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RunGm,
          e.wra.substring(3),
        )
      : (e.wra.startsWith("AnimalDebug")
          ? (ServerGmController.AnimalDebug = !0)
          : e.wra.startsWith("AnimErrorCheck") &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Test", 6, "AnimErrorCheck Begin"),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "a.CheckBoneNan true",
            ),
            UE.KismetSystemLibrary.ExecuteConsoleCommand(
              GlobalData_1.GlobalData.World,
              "a.PrintSkeletalMeshText true",
            ),
            TimerSystem_1.TimerSystem.Delay(() => {
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "a.CheckBoneNan false",
              ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "a.PrintSkeletalMeshText false",
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Test", 6, "AnimErrorCheck End");
            }, 3e3)),
        "DumpLoadingAssets" === e.wra &&
          ResourceSystem_1.ResourceSystem.DebugDumpLoadingAssets());
  });
//# sourceMappingURL=ServerGmController.js.map
