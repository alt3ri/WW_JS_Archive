"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginOfficialView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  HotPatchLogReport_1 = require("../../../../Launcher/HotPatchLogReport"),
  PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  GlobalData_1 = require("../../../GlobalData"),
  KuroSdkController_1 = require("../../../KuroSdk/KuroSdkController"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ThirdPartySdkManager_1 = require("../../../Manager/ThirdPartySdkManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiSequenceDefine_1 = require("../../../Ui/Define/UiSequenceDefine"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GenericPromptController_1 = require("../../GenericPrompt/GenericPromptController"),
  UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoginDefine_1 = require("../Data/LoginDefine"),
  LoginController_1 = require("../LoginController"),
  LoginServerController_1 = require("../LoginServerController"),
  LoginAgeTipView_1 = require("./LoginAgeTipView");
class LoginOfficialView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.oLt = !1),
      (this.nLt = () => {
        this.oLt
          ? KuroSdkController_1.KuroSdkController.CanUseSdk() &&
            !ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()
            ? LoginController_1.LoginController.ReOpenSdkLoginView()
            : (HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
                "enter_game_start"
              ),
              LoginController_1.LoginController.GetHttp(!1, !1))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 10, "还未同意协议"),
            GenericPromptController_1.GenericPromptController.ShowPromptByCode(
              "AgreementTips"
            ));
      }),
      (this.sLt = () => {
        var e;
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init
        )
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(44)).FunctionMap.set(
              2,
              this.aLt
            ),
            ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 8, "正在登录中, 请勿无法退出！");
      }),
      (this.hLt = () => {
        UiManager_1.UiManager.OpenView("ToolWindowView");
      }),
      (this.lLt = () => {
        let r = !1;
        if (KuroSdkController_1.KuroSdkController.CanUseSdk()) {
          var i = KuroSdkController_1.KuroSdkController.GetAgreement();
          for (let e = 0; e < i.length; e++)
            if (i[e].link.includes("agreement_public")) {
              var o =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "UserTitle"
                  ),
                o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
              KuroSdkController_1.KuroSdkController.SdkOpenUrlWnd(
                o,
                i[e].link,
                !0,
                !1
              ),
                (r = !0);
              break;
            }
        }
        r ||
          (Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 10, "打开用户协议"),
          UiManager_1.UiManager.OpenView(
            "LoginAgeTipView",
            LoginAgeTipView_1.ELoginShowType.UserAgreement
          ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
      }),
      (this.uLt = () => {
        let r = !1;
        if (KuroSdkController_1.KuroSdkController.CanUseSdk()) {
          var i = KuroSdkController_1.KuroSdkController.GetAgreement();
          for (let e = 0; e < i.length; e++)
            if (i[e].link.includes("personal_privacy")) {
              var o =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "PrivacyTitle"
                  ),
                o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
              KuroSdkController_1.KuroSdkController.SdkOpenUrlWnd(
                o,
                i[e].link,
                !0,
                !1
              ),
                (r = !0);
              break;
            }
        }
        r ||
          (Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 10, "打开隐私政策"),
          UiManager_1.UiManager.OpenView(
            "LoginAgeTipView",
            LoginAgeTipView_1.ELoginShowType.PrivacyAgreement
          ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
      }),
      (this._Lt = () => {
        let r = !1;
        if (KuroSdkController_1.KuroSdkController.CanUseSdk()) {
          var i = KuroSdkController_1.KuroSdkController.GetAgreement();
          for (let e = 0; e < i.length; e++)
            if (i[e].link.includes("child_privacy")) {
              var o =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "ChildPrivacyTitle"
                  ),
                o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
              KuroSdkController_1.KuroSdkController.SdkOpenUrlWnd(
                o,
                i[e].link,
                !0,
                !1
              ),
                (r = !0);
              break;
            }
        }
        r ||
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 10, "打开儿童隐私政策"),
          UiManager_1.UiManager.OpenView(
            "LoginAgeTipView",
            LoginAgeTipView_1.ELoginShowType.ChildPrivacyAgreement
          ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
      }),
      (this.cLt = () => {
        KuroSdkController_1.KuroSdkController.OpenNotice();
      }),
      (this.mLt = () => {
        ConfirmBoxController_1.ConfirmBoxController.ShowExitGameConfirmBox();
      }),
      (this.dLt = () => {
        UiManager_1.UiManager.OpenView("LoginServerView");
      }),
      (this.CLt = () => {
        this.gLt();
      }),
      (this.mke = (e) => {
        const r = ModelManager_1.ModelManager.LoginModel.GetPlayerSex();
        void 0 === r
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Login",
                10,
                "性别获取为空,账号走的直接登录,性别设置异常"
              ),
            LoginController_1.LoginController.EnterGame((e) => {
              e && this.CloseMe();
            }))
          : LoginController_1.LoginController.EnterGame((e) => {
              e &&
                (ModelManager_1.ModelManager.LoginModel.CreateLoginPromise(),
                this.CloseMe(),
                (e =
                  ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()),
                UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(
                  e[r],
                  18
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Login", 10, "登录请求创角成功"),
                UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
                  this.GetLoginSequenceName(r),
                  () => {
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info("Login", 10, "登录请求创角成功,进入游戏"),
                      ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
                  }
                ));
            });
      }),
      (this.fLt = () => {
        ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()
          ? (this.pLt(!0),
            Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 8, "Sdk登录完成"),
            this.SetUiActive(!1),
            "Windows" !== UE.GameplayStatics.GetPlatformName() &&
              (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.Mobile.CustomDepthForToonRim 1"
              ),
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.DepthOfFieldQuality 1"
              )),
            UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
              "LevelSequence_LoginAccount",
              () => {
                this.UiViewSequence.PlaySequence(
                  UiSequenceDefine_1.EUiSequenceType.LoginStart
                ),
                  this.vLt();
              }
            ),
            this.MLt(),
            this.GetButton(14).RootUIComp.SetUIActive(!1))
          : (this.pLt(!1),
            Log_1.Log.CheckWarn() && Log_1.Log.Warn("Login", 8, "sdk登录失败!"),
            TimerSystem_1.TimerSystem.Delay(() => {
              LoginController_1.LoginController.OpenSdkLoginView();
            }, ConfigManager_1.ConfigManager.LoginConfig.GetSdkReloginTime()));
      }),
      (this.ELt = () => {
        this.yLt();
      }),
      (this.SLt = () => {}),
      (this.aLt = () => {
        this.SetUiActive(!1),
          UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
            "LevelSequence_LoginAccount",
            () => {
              KuroSdkController_1.KuroSdkController.CanUseSdk()
                ? (UiLoginSceneManager_1.UiLoginSceneManager.PlayLoginLoopSequence(),
                  this.pLt(!1),
                  this.UiViewSequence.PlaySequence(
                    UiSequenceDefine_1.EUiSequenceType.LoginStart
                  ),
                  this.SetUiActive(!0),
                  UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1),
                  KuroSdkController_1.KuroSdkController.PostKuroSdkEvent(6))
                : UiManager_1.UiManager.CloseView("LoginView", (e) => {
                    e && UiManager_1.UiManager.OpenView("LoginDebugView");
                  });
            },
            !0
          ),
          ThirdPartySdkManager_1.ThirdPartySdkManager.Logout();
      }),
      (this.ILt = (e) => {
        (this.oLt = 1 === e),
          LocalStorage_1.LocalStorage.SetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.AgreeAgreement,
            this.oLt
          );
      }),
      (this.TLt = () => {
        UiManager_1.UiManager.OpenView(
          "LoginAgeTipView",
          LoginAgeTipView_1.ELoginShowType.AgeTip
        ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIExtendToggle],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIText],
      [16, UE.UIItem],
      [17, UE.UITexture],
      [18, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.nLt],
        [1, this.sLt],
        [2, this.hLt],
        [3, this.nLt],
        [4, this.TLt],
        [5, this.ILt],
        [6, this.lLt],
        [7, this.uLt],
        [8, this._Lt],
        [11, this.cLt],
        [12, this.mLt],
        [14, this.dLt],
      ]);
  }
  OnStart() {
    (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
      UE.KismetGuidLibrary.NewGuid().ToString()),
      LoginController_1.LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.LoginViewOpen
      ),
      ModelManager_1.ModelManager.LoginModel.InitConfig(),
      ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
      this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.pLt(!1),
      this.LLt(),
      this.DLt(),
      KuroSdkController_1.KuroSdkController.CheckIfSdkLogin() &&
        KuroSdkController_1.KuroSdkController.PostKuroSdkEvent(6);
    var e = ModelManager_1.ModelManager.PlatformModel.IsPc();
    this.GetButton(12).RootUIComp.SetUIActive(e),
      this.GetItem(13).SetUIActive(!1),
      this.gLt(),
      this.RLt(),
      this.wLt(),
      this.ALt(),
      this.ULt(),
      this.xLt();
  }
  LLt() {
    (this.oLt = !0),
      this.GetExtendToggle(5).SetToggleState(this.oLt ? 1 : 0, !1);
  }
  DLt() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ClickEnterGame");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LoginRequestResult,
      this.mke
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
        this.CLt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkLoginResult,
        this.fLt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetLoginPlayerInfo,
        this.SLt
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConfirmServerItem,
        this.ELt
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LoginRequestResult,
      this.mke
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
        this.CLt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkLoginResult,
        this.fLt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetLoginPlayerInfo,
        this.SLt
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnConfirmServerItem,
        this.ELt
      );
  }
  OnAfterShow() {
    LoginServerController_1.LoginServerController.PingAllRegion(),
      KuroSdkController_1.KuroSdkController.CanUseSdk() &&
        (UE.KuroLauncherLibrary.IsFirstIntoLauncher()
          ? LoginController_1.LoginController.OpenSdkLoginView()
          : LoginController_1.LoginController.ReOpenSdkLoginView());
  }
  vLt() {
    this.SetUiActive(!0),
      KuroSdkController_1.KuroSdkController.CanUseSdk() &&
        KuroSdkController_1.KuroSdkController.GetIfGlobalSdk() &&
        (ModelManager_1.ModelManager.LoginServerModel.InitSuggestData(
          ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "",
          (e) => {
            ModelManager_1.ModelManager.LoginModel.SetServerName(e.name),
              ModelManager_1.ModelManager.LoginModel.SetServerId(e.id);
          }
        ),
        this.PLt() && UiManager_1.UiManager.OpenView("LoginServerView"),
        this.GetButton(14).RootUIComp.SetUIActive(!0),
        this.yLt());
  }
  PLt() {
    var e = ModelManager_1.ModelManager.LoginServerModel,
      r = ModelManager_1.ModelManager.LoginModel;
    return !(
      !KuroSdkController_1.KuroSdkController.GetIfGlobalSdk() ||
      !e.IsFirstLogin(r.GetSdkLoginConfig()?.Uid ?? "")
    );
  }
  MLt() {
    var e = ModelManager_1.ModelManager.LoginServerModel,
      r = ModelManager_1.ModelManager.LoginModel;
    KuroSdkController_1.KuroSdkController.GetIfGlobalSdk() &&
      LoginServerController_1.LoginServerController.GetLoginPlayerInfo(
        1,
        r.GetSdkLoginConfig()?.Uid ?? "",
        r.GetSdkLoginConfig()?.UserName ?? "",
        r.GetSdkLoginConfig()?.Token ?? "",
        e.GetCurrentArea()
      );
  }
  GetLoginSequenceName(e) {
    return e === LoginDefine_1.ELoginSex.Boy
      ? "LevelSequence_LoginMale"
      : "LevelSequence_LoginFemale";
  }
  wLt() {
    this.GetButton(8).RootUIComp.SetUIActive(
      !KuroSdkController_1.KuroSdkController.GetIfGlobalSdk()
    );
  }
  RLt() {
    this.GetButton(4).RootUIComp.SetUIActive(
      !KuroSdkController_1.KuroSdkController.GetIfGlobalSdk()
    );
  }
  ALt() {
    this.GetItem(16).SetUIActive(
      !KuroSdkController_1.KuroSdkController.GetIfGlobalSdk()
    );
  }
  ULt() {
    this.GetText(9).SetText(
      BaseConfigController_1.BaseConfigController.GetVersionString()
    );
  }
  xLt() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(
        "LoginLogo"
      );
    this.SetTextureByPath(e, this.GetTexture(17));
  }
  yLt() {
    var e =
      ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.name;
    this.GetText(15).SetText(e);
  }
  gLt() {}
  bLt() {
    this.GetButton(11).RootUIComp.SetUIActive(
      KuroSdkController_1.KuroSdkController.CanUseSdk() &&
        ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()
    );
  }
  pLt(e) {
    var r = this.GetButton(1),
      i = this.GetButton(2),
      o = this.GetButton(3);
    KuroSdkController_1.KuroSdkController.CanUseSdk()
      ? (r.RootUIComp.SetUIActive(e),
        i.RootUIComp.SetUIActive(e),
        o.RootUIComp.SetUIActive(!e),
        this.GetItem(18).SetUIActive(e))
      : (r.RootUIComp.SetUIActive(!0),
        i.RootUIComp.SetUIActive(!0),
        o.RootUIComp.SetUIActive(!1)),
      !e &&
        KuroSdkController_1.KuroSdkController.GetIfGlobalSdk() &&
        this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.bLt();
  }
}
exports.LoginOfficialView = LoginOfficialView;
