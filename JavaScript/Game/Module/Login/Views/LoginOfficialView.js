"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginOfficialView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  HotPatchLogReport_1 = require("../../../../Launcher/HotPatchLogReport"),
  CloudGameManagerLauncher_1 = require("../../../../Launcher/Platform/CloudGameManagerLauncher"),
  Platform_1 = require("../../../../Launcher/Platform/Platform"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  KuroSdkReport_1 = require("../../../KuroSdk/KuroSdkReport"),
  CloudGameManager_1 = require("../../../Manager/CloudGameManager"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ThirdPartySdkManager_1 = require("../../../Manager/ThirdPartySdkManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  PreDownloadButton_1 = require("../../MobilePredownload/PreDownloadButton"),
  UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoginDefine_1 = require("../Data/LoginDefine"),
  LoginServerController_1 = require("../LoginServerController"),
  LoginAgeTipView_1 = require("./LoginAgeTipView");
class LoginOfficialView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.VEi = !1),
      (this.Kn1 = void 0),
      (this.HEi = () => {
        if (this.VEi)
          if (ModelManager_1.ModelManager.LoginModel.IsSdkLoggingIn())
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                16,
                "LoginProcedure-点击登录按钮-重复点击SDK登录",
              );
          else {
            if (ModelManager_1.ModelManager.LoginModel.IsSdkLogout()) {
              if (
                ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
              )
                return (
                  ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(
                    LoginDefine_1.ELoginStatus.SDKLoginBefore,
                  ),
                  void ControllerHolder_1.ControllerHolder.LoginController.OpenSdkLoginView()
                );
              if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn)
                return (
                  ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(
                    LoginDefine_1.ELoginStatus.SDKLoginBefore,
                  ),
                  void ControllerHolder_1.ControllerHolder.LoginController.SdkLoginNew()
                );
            }
            ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
              LoginDefine_1.ELoginStatus.Init,
            )
              ? (Stats_1.Stat.CreateInstantStat(
                  "LoginProcedure.ClickLoginButton",
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Login", 16, "LoginProcedure-点击登录按钮"),
                PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
                  () => {
                    UE.KuroPakKeyLibrary.HasPendingEncryptedPaks()
                      ? (Log_1.Log.CheckWarn() &&
                          Log_1.Log.Warn(
                            "Login",
                            21,
                            "存在未成功挂载的Pak包！",
                          ),
                        ControllerHolder_1.ControllerHolder.LoginController.GetAndShowStopServerNotice())
                      : VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()
                        ? PakKeyUpdate_1.PakKeyUpdate.CheckVideoPakKey(
                            () => {
                              KuroSdkReport_1.KuroSdkReport.Report(
                                new KuroSdkReport_1.SdkReportClickEnterGame(
                                  void 0,
                                ),
                              ),
                                HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                                  HotPatchLogReport_1.LoginLogEventDefine
                                    .EnterGame,
                                  "enter_game_start",
                                ),
                                ControllerHolder_1.ControllerHolder.LoginController.GetHttp(
                                  !1,
                                  !1,
                                );
                            },
                            () => {
                              var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                                  33,
                                ),
                                r =
                                  ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                                    "NoNetwork",
                                  );
                              e.SetTextArgs(r),
                                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                                  e,
                                );
                            },
                          ).catch((e) => {})
                        : (KuroSdkReport_1.KuroSdkReport.Report(
                            new KuroSdkReport_1.SdkReportClickEnterGame(void 0),
                          ),
                          HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
                            HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
                            "enter_game_start",
                          ),
                          ControllerHolder_1.ControllerHolder.LoginController.GetHttp(
                            !1,
                            !1,
                          ));
                  },
                  () => {
                    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33),
                      r =
                        ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                          "NoNetwork",
                        );
                    e.SetTextArgs(r),
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                        e,
                      );
                  },
                ).catch((e) => {}))
              : Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Login",
                  16,
                  "LoginProcedure-点击登录按钮-重复点击",
                );
          }
        else
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "AgreementTips",
          );
      }),
      (this.jEi = () => {
        var e;
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(44)).FunctionMap.set(
              2,
              this.WEi,
            ),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ),
            KuroSdkReport_1.KuroSdkReport.Report(
              new KuroSdkReport_1.SdkReportChangeAccount(void 0),
            ))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 8, "正在登录中, 无法退出！");
      }),
      (this.KEi = () => {
        UiManager_1.UiManager.OpenView("ToolWindowView");
      }),
      (this.QEi = () => {
        let r = !1;
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          var o =
            ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
          for (let e = 0; e < o.length; e++)
            if (o[e].link.includes("agreement_public")) {
              var i =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "UserTitle",
                  ),
                i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
              ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
                i,
                o[e].link,
                !0,
                !1,
              ),
                (r = !0);
              break;
            }
        }
        r ||
          (Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 10, "打开用户协议"),
          UiManager_1.UiManager.OpenView(
            "LoginAgeTipView",
            LoginAgeTipView_1.ELoginShowType.UserAgreement,
          ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
      }),
      (this.XEi = () => {
        let r = !1;
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          var o =
            ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
          for (let e = 0; e < o.length; e++)
            if (o[e].link.includes("personal_privacy")) {
              var i =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "PrivacyTitle",
                  ),
                i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
              ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
                i,
                o[e].link,
                !0,
                !1,
              ),
                (r = !0);
              break;
            }
        }
        r ||
          (Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 10, "打开隐私政策"),
          UiManager_1.UiManager.OpenView(
            "LoginAgeTipView",
            LoginAgeTipView_1.ELoginShowType.PrivacyAgreement,
          ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
      }),
      (this.$Ei = () => {
        let r = !1;
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          var o =
            ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
          for (let e = 0; e < o.length; e++)
            if (o[e].link.includes("child_privacy")) {
              var i =
                  ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                    "ChildPrivacyTitle",
                  ),
                i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
              ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
                i,
                o[e].link,
                !0,
                !1,
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
            LoginAgeTipView_1.ELoginShowType.ChildPrivacyAgreement,
          ),
          UiLayer_1.UiLayer.SetShowNormalMaskLayer(!0));
      }),
      (this.YEi = () => {
        ControllerHolder_1.ControllerHolder.KuroSdkController.OpenNotice();
      }),
      (this.JEi = () => {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowExitGameConfirmBox();
      }),
      (this.zEi = () => {
        UiManager_1.UiManager.OpenView("LoginServerView");
      }),
      (this.ZEi = () => {
        this.eSi();
      }),
      (this.Ckt = (e) => {
        var r;
        e &&
          (this.CloseMe(),
          void 0 === (e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex())
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Login",
                10,
                "性别获取为空,账号走的直接登录,性别设置异常",
              )
            : (Stats_1.Stat.CreateInstantStat(
                "LoginProcedure.LoginPromise:Start",
              ),
              ModelManager_1.ModelManager.LoginModel.CreateLoginPromise(),
              (r =
                ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles()),
              UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(
                r[e],
                18,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Login", 10, "登录请求成功"),
              UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
                this.GetLoginSequenceName(e),
                () => {
                  Stats_1.Stat.CreateInstantStat(
                    "LoginProcedure.LoginPromise:End",
                  ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info("Login", 10, "登录请求成功,进入游戏"),
                    ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
                },
              )));
      }),
      (this.tSi = () => {
        ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()
          ? (this.iSi(!0),
            Stats_1.Stat.CreateInstantStat("LoginProcedure.SdkLogin:End"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-登录成功"),
            Platform_1.Platform.IsWindowsPlatform() ||
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "r.DepthOfFieldQuality 1",
              ),
            this.Krc())
          : (this.iSi(!1),
            (ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId =
              "-1"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                16,
                "LoginProcedure-SdkLogin-登录失败, 重新打开SDK登录界面",
              ));
      }),
      (this.nSi = () => {
        this.sSi();
      }),
      (this.V5a = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            5,
            "PS5 PlaySession 直接启动 - 模拟点击登录按钮 事件触发",
          ),
          this.HEi();
      }),
      (this.aSi = () => {}),
      (this.WEi = () => {
        ThirdPartySdkManager_1.ThirdPartySdkManager.Logout(),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
            ? (this.iSi(!1),
              this.UiViewSequence.PlaySequence("Show"),
              UiLayer_1.UiLayer.SetShowNormalMaskLayer(!1),
              ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
                6,
              ))
            : UiManager_1.UiManager.CloseView("LoginView", (e) => {
                e && UiManager_1.UiManager.OpenView("LoginDebugView");
              });
      }),
      (this.hSi = (e) => {
        this.VEi = 1 === e;
      }),
      (this.lSi = () => {
        UiManager_1.UiManager.OpenView(
          "LoginAgeTipView",
          LoginAgeTipView_1.ELoginShowType.AgeTip,
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
      [19, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.HEi],
        [1, this.jEi],
        [2, this.KEi],
        [3, this.HEi],
        [4, this.lSi],
        [5, this.hSi],
        [6, this.QEi],
        [7, this.XEi],
        [8, this.$Ei],
        [11, this.YEi],
        [12, this.JEi],
        [14, this.zEi],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.Kn1 = new PreDownloadButton_1.PreDownloadButtonItemA()),
      await this.Kn1.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
  }
  OnStart() {
    CloudGameManager_1.CloudGameManager.IsCloudGame
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("CloudGame", 58, "云游戏设置LoginTraceId", [
            "trace",
            CloudGameManager_1.CloudGameManager.CloudGameTraceId,
          ]),
        (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
          CloudGameManager_1.CloudGameManager.CloudGameTraceId))
      : (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
          UE.KismetGuidLibrary.NewGuid().ToString()),
      ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.LoginViewOpen,
      ),
      ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
      this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.iSi(!1),
      this._Si(),
      this.uSi();
    var e = Info_1.Info.IsPcOrGamepadPlatform();
    this.GetButton(12).RootUIComp.SetUIActive(e),
      this.GetItem(13).SetUIActive(!1),
      this.eSi(),
      this.cSi(),
      this.mSi(),
      this.dSi(),
      this.CSi(),
      this.gSi(),
      this.Pfa(),
      this.xfa(),
      this.Kn1?.Refresh(),
      UiManager_1.UiManager.IsViewShow("LoginOfficialStatusView") ||
        UiManager_1.UiManager.OpenView("LoginOfficialStatusView");
  }
  Pfa() {
    var e;
    CloudGameManager_1.CloudGameManager.IsCloudGame
      ? this.GetButton(12).RootUIComp.SetUIActive(!1)
      : ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()
        ? ((e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
            ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId()
            : UE.KuroSDKManager.GetPackageId()),
          (e =
            !ConfigManager_1.ConfigManager.LoginConfig.GetLoginViewNoExitButtonPackageIdList().includes(
              e,
            )),
          this.GetButton(12).RootUIComp.SetUIActive(e))
        : this.GetButton(12).RootUIComp.SetUIActive(!0);
  }
  xfa(e = !1) {
    var r, o;
    CloudGameManager_1.CloudGameManager.IsCloudGame
      ? this.GetButton(1).RootUIComp.SetUIActive(!1)
      : ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()
        ? ((r = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
            ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId()
            : UE.KuroSDKManager.GetPackageId()),
          (o =
            ConfigManager_1.ConfigManager.LoginConfig.GetLoginViewNoAccountButtonPackageIdList()),
          (e = e && !o.includes(r)),
          this.GetButton(1).RootUIComp.SetUIActive(e))
        : this.GetButton(1).RootUIComp.SetUIActive(!0);
  }
  _Si() {
    (this.VEi = !0),
      this.GetExtendToggle(5).SetToggleState(this.VEi ? 1 : 0, !1);
  }
  uSi() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ClickEnterGame");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LoginRequestResult,
      this.Ckt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
        this.ZEi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkLoginResult,
        this.tSi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetLoginPlayerInfo,
        this.aSi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnConfirmServerItem,
        this.nSi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlayStationJoinSessionEvent,
        this.V5a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LoginRequestResult,
      this.Ckt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
        this.ZEi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkLoginResult,
        this.tSi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetLoginPlayerInfo,
        this.aSi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnConfirmServerItem,
        this.nSi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlayStationJoinSessionEvent,
        this.V5a,
      );
  }
  OnAfterShow() {
    LoginServerController_1.LoginServerController.PingAllRegion(),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            16,
            "LoginProcedure-SdkLogin-界面打开检测sdk状态设置表现",
          ),
        this.tSi()),
      this.wml(),
      CloudGameManager_1.CloudGameManager.IsCloudGame &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLoginNew-云游戏登录"),
        CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) &&
        (ControllerHolder_1.ControllerHolder.LoginController.OnSdkLogin(
          CloudGameManager_1.CloudGameManager.GetCloudGameLoginInfo(),
        ),
        this.HEi()),
      this.Kn1?.RefreshDot();
  }
  async wml() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLoginNew-SDK登录"),
      "-1" === ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId
        ? await ControllerHolder_1.ControllerHolder.LoginController.SdkLoginNew()
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              5,
              "PS5 PlaySession 直接启动 - 模拟点击登录按钮1",
            ),
          0 ===
            (await ControllerHolder_1.ControllerHolder.LoginController.SdkLoginNew()) &&
            this.HEi()));
  }
  Krc() {
    this.UiViewSequence.PlaySequence("Show"),
      ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()
        ? (this.rSi(),
          ModelManager_1.ModelManager.LoginServerModel.InitSuggestData(
            ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ??
              "",
            (e) => {
              ModelManager_1.ModelManager.LoginModel.SetServerName(e.name),
                ModelManager_1.ModelManager.LoginModel.SetServerId(e.id);
            },
          ),
          this.fSi() &&
            (UiManager_1.UiManager.OpenView("LoginServerView"),
            (ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId =
              "-1")),
          this.GetButton(14).RootUIComp.SetUIActive(!0),
          this.sSi(),
          "-1" !==
            ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                5,
                "PS5 PlaySession 直接启动 - 模拟点击登录按钮2",
              ),
            this.HEi()))
        : this.GetButton(14).RootUIComp.SetUIActive(!1);
  }
  fSi() {
    var e = ModelManager_1.ModelManager.LoginServerModel,
      r = ModelManager_1.ModelManager.LoginModel;
    return !(
      !ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() ||
      !e.IsFirstLogin(r.GetSdkLoginConfig()?.Uid ?? "")
    );
  }
  rSi() {
    var e = ModelManager_1.ModelManager.LoginServerModel,
      r = ModelManager_1.ModelManager.LoginModel;
    ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() &&
      LoginServerController_1.LoginServerController.GetLoginPlayerInfo(
        1,
        r.GetSdkLoginConfig()?.Uid ?? "",
        r.GetSdkLoginConfig()?.UserName ?? "",
        r.GetSdkLoginConfig()?.Token ?? "",
        e.GetCurrentArea(),
      );
  }
  GetLoginSequenceName(e) {
    return e === LoginDefine_1.ELoginSex.Boy
      ? "LevelSequence_LoginMale"
      : "LevelSequence_LoginFemale";
  }
  mSi() {
    this.GetButton(8).RootUIComp.SetUIActive(
      !ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode(),
    );
  }
  cSi() {
    this.GetButton(4).RootUIComp.SetUIActive(
      !ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode(),
    );
  }
  dSi() {
    this.GetItem(16).SetUIActive(
      !ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode(),
    );
  }
  CSi() {
    this.GetText(9).SetText(
      BaseConfigController_1.BaseConfigController.GetVersionString(),
    );
  }
  gSi() {
    var e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(
        "LoginLogo",
      );
    this.SetTextureByPath(e, this.GetTexture(17));
  }
  sSi() {
    var e =
      ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerName();
    this.GetText(15).SetText(e);
  }
  eSi() {}
  pSi() {
    this.GetButton(11).RootUIComp.SetUIActive(
      ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode() &&
        ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn(),
    );
  }
  iSi(e) {
    var r = this.GetButton(2),
      o = this.GetButton(3);
    ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()
      ? (r.RootUIComp.SetUIActive(
          e && !CloudGameManager_1.CloudGameManager.IsCloudGame,
        ),
        o.RootUIComp.SetUIActive(!e),
        this.GetItem(18).SetUIActive(e))
      : (r.RootUIComp.SetUIActive(
          !CloudGameManager_1.CloudGameManager.IsCloudGame,
        ),
        o.RootUIComp.SetUIActive(!1)),
      !e &&
        ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() &&
        this.GetButton(14).RootUIComp.SetUIActive(!1),
      this.xfa(e),
      this.pSi(),
      this.Kn1?.Refresh(e);
  }
}
exports.LoginOfficialView = LoginOfficialView;
//# sourceMappingURL=LoginOfficialView.js.map
