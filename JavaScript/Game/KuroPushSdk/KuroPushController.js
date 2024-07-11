"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroPushController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Application_1 = require("../../Core/Application/Application");
const Info_1 = require("../../Core/Common/Info");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const HotPatchPushSdk_1 = require("../../Launcher/HotPatchPushSdk/HotPatchPushSdk");
const LauncherStorageLib_1 = require("../../Launcher/Util/LauncherStorageLib");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine");
const MenuController_1 = require("../Module/Menu/MenuController");
const SELFDEFINESN = "push";
class KuroPushController extends ControllerBase_1.ControllerBase {
  static IfCanUsePush() {
    const t = Info_1.Info.IsMobile();
    return !(!UE.KuroStaticLibrary.IsModuleLoaded("KuroPushSdk") || !t);
  }
  static OnInit() {
    return (
      UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
        (this.oEe(), this.BindCurrentLanguageTag(), this._5s()),
      this.BindCurrentLanguageTag(),
      this.nEe(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Push", 28, "current push clientId", [
          "clientId",
          this.GetClientId(),
        ]),
      !0
    );
  }
  static async _5s() {
    await this.u5s(), await this.rEe();
  }
  static async u5s() {
    let t;
    LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey
        .AndroidNotFirstTimeOpenPush,
      !1,
    ) ||
      (LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey
          .AndroidNotFirstTimeOpenPush,
        !0,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Push", 28, "KuroPush:检查安卓初次权限"),
      UE.AndroidPermissionFunctionLibrary.CheckPermission(
        "android.permission.POST_NOTIFICATIONS",
      )) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Push", 28, "KuroPush:安卓没有推送权限，尝试获取"),
      (t = UE.NewArray(UE.BuiltinString)).Add(
        "android.permission.POST_NOTIFICATIONS",
      ),
      (await this.KSr(t)).length > 0
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Push", 28, "KuroPush:安卓推送权限获取失败"),
          this.TurnOffPush())
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Push", 28, "KuroPush:安卓推送权限获取成功"),
          await this.TurnOnPush(!1)));
  }
  static async KSr(e) {
    return new Promise((t) => {
      const n = UE.AndroidPermissionFunctionLibrary.AcquirePermissions(e);
      const u = (e, r) => {
        n.OnPermissionsGrantedDynamicDelegate.Remove(u);
        const o = new Array();
        const s = e.Num();
        for (let t = 0; t < s; t++) {
          const i = e.Get(t);
          r.Get(t) || o.push(i);
        }
        t(o);
      };
      n.OnPermissionsGrantedDynamicDelegate.Add(u);
    });
  }
  static BindCurrentLanguageTag() {
    const t = LanguageSystem_1.LanguageSystem.PackageLanguage;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Push", 28, "current push Language Tag", ["Tag", t]),
      UE.KuroPushSdkStaticLibrary.SetTag(t, SELFDEFINESN);
  }
  static nEe() {
    const t = this.GetPushState() ? 1 : 0;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 8, "刷新推送状态", ["result", t]),
      MenuController_1.MenuController.SetTargetConfig(121, t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMenuSetting,
        121,
      );
  }
  static async rEe() {
    this.IfCanUsePush() &&
      ((await this.GetPushNotiPermissionEnableState())
        ? this.TurnOnPush()
        : this.TurnOffPush());
  }
  static oEe() {
    this.sEe ||
      ((KuroPushController.PushFunctionDelegate = (0,
      puerts_1.toManualReleaseDelegate)(KuroPushController.aEe)),
      UE.KuroPushSdkStaticLibrary.GetPushObject()?.PushSdkMessageBluePrintDelegate.Add(
        KuroPushController.aEe,
      ),
      Application_1.Application.AddApplicationHandler(
        4,
        KuroPushController.hEe,
      )),
      (this.sEe = !0);
  }
  static RemovePushDelegate() {
    KuroPushController.PushFunctionDelegate &&
      (UE.KuroPushSdkStaticLibrary.GetPushObject()?.IsValid() &&
        UE.KuroPushSdkStaticLibrary.GetPushObject()?.PushSdkMessageBluePrintDelegate.Remove(
          KuroPushController.aEe,
        ),
      (0, puerts_1.releaseManualReleaseDelegate)(KuroPushController.aEe),
      (KuroPushController.PushFunctionDelegate = void 0),
      (this.sEe = !1));
  }
  static SetPushNotifyCall(t) {
    this.lEe = t;
  }
  static SendLocalPush(t, e, r) {
    HotPatchPushSdk_1.HotPatchPushSdk.SendLocalPush(t, e, r);
  }
  static OpenNotification() {
    this.IfCanUsePush()
      ? UE.KuroPushSdkStaticLibrary.OpenNotification()
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Push", 28, " Not OpenNotification");
  }
  static async GetPushNotiPermissionEnableState() {
    return (
      !!this.IfCanUsePush() &&
      new Promise((e) => {
        const r = (t) => {
          UE.KuroPushSdkStaticLibrary.GetPushObject()?.AllowedNotificationsDelegate.Remove(
            r,
          ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Push", 28, "当前推送权限状态", ["state", t]),
            e(t);
        };
        UE.KuroPushSdkStaticLibrary.GetPushObject()?.AllowedNotificationsDelegate.Add(
          r,
        ),
          UE.KuroPushSdkStaticLibrary.AreNotificationEnable();
      })
    );
  }
  static GetClientId() {
    return this.IfCanUsePush() ? UE.KuroPushSdkStaticLibrary.GetClientId() : "";
  }
  static async TurnOnPush(t = !0) {
    HotPatchPushSdk_1.HotPatchPushSdk.TurnOnPush(),
      this.nEe(),
      t &&
        !(await this.GetPushNotiPermissionEnableState()) &&
        ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(171)).FunctionMap.set(
          1,
          () => {
            this.OpenNotification();
          },
        ),
        (t.IsEscViewTriggerCallBack = !1),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        ));
  }
  static TurnOffPush() {
    HotPatchPushSdk_1.HotPatchPushSdk.TurnOffPush(), this.nEe();
  }
  static GetPushState() {
    const t = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
      LauncherStorageLib_1.ELauncherStorageGlobalKey.CachePushOpenState,
      !1,
    );
    return void 0 !== t && t;
  }
}
(exports.KuroPushController = KuroPushController),
  ((_a = KuroPushController).sEe = !1),
  (KuroPushController.lEe = void 0),
  (KuroPushController.PushFunctionDelegate = void 0),
  (KuroPushController.hEe = () => {
    _a.RemovePushDelegate();
  }),
  (KuroPushController.aEe = (t, e) => {
    _a.lEe?.(t, e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Push",
          28,
          "接收到push回调信息",
          ["functionName", t],
          ["result", e],
        );
  });
// # sourceMappingURL=KuroPushController.js.map
