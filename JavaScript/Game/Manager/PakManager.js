"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PakManager = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  AppUtil_1 = require("../../Launcher/Update/AppUtil"),
  PakKeyUpdate_1 = require("../../Launcher/Update/PakKeyUpdate"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  LoginDefine_1 = require("../Module/Login/Data/LoginDefine"),
  LoginController_1 = require("../Module/Login/LoginController"),
  ConfigManager_1 = require("./ConfigManager"),
  ControllerHolder_1 = require("./ControllerHolder");
class PakManager {
  static Init() {
    void 0 !== PakManager.xBe &&
      (TimerSystem_1.TimerSystem.Remove(PakManager.xBe),
      (PakManager.xBe = void 0)),
      PakManager.uza(),
      PakManager.cza();
  }
  static uza() {
    var e;
    PakKeyUpdate_1.PakKeyUpdate.NeedExtPakKeys &&
      0 < PakKeyUpdate_1.PakKeyUpdate.UpdateCheckInterval &&
      ((e = 1e3 * PakKeyUpdate_1.PakKeyUpdate.UpdateCheckInterval),
      (PakManager.xBe = TimerSystem_1.TimerSystem.Forever(
        () => {
          PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(void 0, void 0).catch(
            (e) => {},
          );
        },
        e,
        1,
        void 0,
        void 0,
        !1,
      )));
  }
  static cza() {
    void 0 !== PakManager.mza &&
      (TimerSystem_1.TimerSystem.Remove(PakManager.mza),
      (PakManager.mza = void 0)),
      0 < PakManager.dza &&
        (PakManager.mza = TimerSystem_1.TimerSystem.Forever(
          () => {
            PakManager.Cza();
          },
          PakManager.dza,
          1,
          void 0,
          void 0,
          !1,
        ));
  }
  static Cza() {
    var e, a;
    UE.KuroPakMountStatic.IsSha1CheckWorking() ||
      (0 < (e = UE.KuroPakMountStatic.GetSha1CheckFailedCount())
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("ErrorCode", 22, "文件Sha1校验失败", ["Count", e]),
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33)),
          (a = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "ResourceVerificationFailed_Text",
          )),
          e.SetTextArgs(a),
          e.FunctionMap.set(1, () => {
            PakManager.gza();
          }),
          (e.IsEscViewTriggerCallBack = !1),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ))
        : void 0 !== PakManager.mza &&
          (TimerSystem_1.TimerSystem.Remove(PakManager.mza),
          (PakManager.mza = void 0)));
  }
  static gza() {
    LoginController_1.LoginController.LogLoginProcessLink(
      LoginDefine_1.ELoginStatus.PatchVerifyFail,
    ),
      UE.KuroPakMountStatic.UnmountAllPaks(),
      UE.KuroPakMountStatic.DeleteSha1CheckFailedFiles(),
      AppUtil_1.AppUtil.QuitGame("Pak");
  }
}
((exports.PakManager = PakManager).xBe = void 0),
  (PakManager.mza = void 0),
  (PakManager.dza = 6e4);
//# sourceMappingURL=PakManager.js.map
