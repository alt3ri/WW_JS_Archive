"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AntiCheatModel = void 0);
const UE = require("ue");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const AntiCheatData_1 = require("./AntiCheatData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const BUNDLE_DATA_EVENT_ID = "8";
const HEARTBEAT_DATA_EVENT_ID = "9";
class AntiCheatModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Qre = ""), (this.IHe = ""), (this.THe = 0);
  }
  GetVersion() {
    return this.Qre;
  }
  GetBundleId() {
    return this.IHe;
  }
  OnInit() {
    const e = UE.KuroLauncherLibrary.GetAppVersion();
    return (
      (this.Qre = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
        e,
      )),
      (this.IHe = UE.KismetSystemLibrary.GetGameBundleId()),
      !0
    );
  }
  static GetBundleData() {
    const e = new AntiCheatData_1.AntiCheatBundleData();
    e.event_id = BUNDLE_DATA_EVENT_ID;
    let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
    return (
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid),
      (e.unique_id = t),
      (e.s_bundle_id =
        ModelManager_1.ModelManager.AntiCheatModel.GetBundleId()),
      (e.s_version = ModelManager_1.ModelManager.AntiCheatModel.GetVersion()),
      e
    );
  }
  ResetHeartbeatException() {
    this.THe = 0;
  }
  HitHeartbeatException() {
    this.THe += 1;
  }
  GetHeartbeatException() {
    return this.THe;
  }
  HasHeartbeatException() {
    return this.THe > 0;
  }
  GetHeartbeatData() {
    const e = new AntiCheatData_1.AntiCheatHeartbeatData();
    e.event_id = HEARTBEAT_DATA_EVENT_ID;
    let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
    return (
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid),
      (e.unique_id = t),
      (e.i_exception_count = this.THe),
      e
    );
  }
}
exports.AntiCheatModel = AntiCheatModel;
// # sourceMappingURL=AntiCheatModel.js.map
