"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServerGmController = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData");
class ServerGmController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Net_1.Net.Register(27449, ServerGmController.OnServerCommandNotify), !0
    );
  }
  static OnClear() {
    return Net_1.Net.UnRegister(27449), !0;
  }
}
((exports.ServerGmController = ServerGmController).AnimalDebug = !1),
  (ServerGmController.OnServerCommandNotify = (e) => {
    e.oia.startsWith("GM ")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RunGm,
          e.oia.substring(3),
        )
      : (e.oia.startsWith("AnimalDebug")
          ? (ServerGmController.AnimalDebug = !0)
          : e.oia.startsWith("AnimErrorCheck") &&
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
        "InputDebugOpen" === e.oia &&
          Global_1.Global.CharacterController?.SetIsPrintInputDebugLog(!0),
        "InputKeyStateMapDebugOpen" === e.oia &&
          Global_1.Global.CharacterController?.SetIsPrintInputDebugKeyStateMapLog(
            !0,
          ),
        "InputDebugClose" === e.oia &&
          Global_1.Global.CharacterController?.SetIsPrintInputDebugLog(!1),
        "InputKeyStateMapDebugClose" === e.oia &&
          Global_1.Global.CharacterController?.SetIsPrintInputDebugKeyStateMapLog(
            !1,
          ));
  });
//# sourceMappingURL=ServerGmController.js.map
