"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginDebugView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Json_1 = require("../../../../Core/Common/Json");
const Log_1 = require("../../../../Core/Common/Log");
const GmAccountAll_1 = require("../../../../Core/Define/ConfigQuery/GmAccountAll");
const Http_1 = require("../../../../Core/Http/Http");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController");
const PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const KuroSdkController_1 = require("../../../KuroSdk/KuroSdkController");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ErrorCodeController_1 = require("../../ErrorCode/ErrorCodeController");
const LoginDefine_1 = require("../../Login/Data/LoginDefine");
const LoginController_1 = require("../../Login/LoginController");
const ReConnectController_1 = require("../../ReConnect/ReConnectController");
const ReconnectDefine_1 = require("../../ReConnect/ReconnectDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager");
class LoginDebugView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Bb = void 0),
      (this.T6e = -1),
      (this.L6e = void 0),
      (this.D6e = void 0),
      (this.R6e = void 0),
      (this.w6e = () => {
        ReConnectController_1.ReConnectController.Logout(
          ReconnectDefine_1.ELogoutReason.LoginViewQuit,
        );
      }),
      (this.A6e = () => {
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? this.GetInputText(2).Text === ""
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LoginFailEmptyAccount",
              )
            : (this.U6e(),
              UE.GameplayStatics.GetPlatformName() !== "Windows" &&
                (UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.Mobile.CustomDepthForToonRim 1",
                ),
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.DepthOfFieldQuality 1",
                )),
              this.CloseMe((e) => {
                e &&
                  UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
                    "LevelSequence_LoginAccount",
                    () => {
                      UiManager_1.UiManager.OpenView("LoginView");
                    },
                  );
              }))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
      }),
      (this.x6e = () => {
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? this.GetInputText(2).Text === ""
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LoginFailEmptyAccount",
              )
            : (this.U6e(),
              ModelManager_1.ModelManager.LoginModel.SetPlayerName(
                "一键登录账号",
              ),
              this.P6e())
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
      }),
      (this.b6e = () => {
        let e;
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? (this.U6e(),
            (e = this.B6e()),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Login", 8, "生成账号", ["ip", e]),
            this.GetInputText(2).SetText(e),
            ModelManager_1.ModelManager.LoginModel.SetAccount(e),
            ModelManager_1.ModelManager.LoginModel.SetPlayerName(
              "一键登录账号",
            ),
            this.P6e())
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！");
      }),
      (this.q6e = (e) => {
        this.GetSprite(8).SetUIActive(e === 1);
      }),
      (this.G6e = (e) => {
        this.GetSprite(10).SetUIActive(e === 1);
      }),
      (this.N6e = (e) => {
        let i;
        e !== -1 &&
          (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          )
            ? ((i =
                ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList()),
              this.GetInputText(2).SetText(i[e]),
              this.GetInputText(2).Text === ""
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "LoginFailEmptyAccount",
                  )
                : (this.U6e(), this.P6e()))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！"));
      }),
      (this.O6e = (e) => {
        (this.T6e = e) !== -1 &&
          (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          ) ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 8, "正在登录中, 请勿重复操作！")),
          UiManager_1.UiManager.OpenView("LoginDebugPlayerNameView", this.k6e));
      }),
      (this.k6e = () => {
        let e;
        let i;
        let o;
        let r;
        const t = this.T6e;
        t < 0 ||
          ((e = ModelManager_1.ModelManager.LoginModel.GetPlayerName()),
          (o = (i = GmAccountAll_1.configGmAccountAll.GetConfigList())[t]
            .FirstName),
          (r = this.B6e()),
          this.GetInputText(2).SetText("" + e + o + "-" + r),
          (ModelManager_1.ModelManager.SundryModel.AccountGmId =
            i[t].GmOrderListId),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Login",
              8,
              "创建新的GM账号",
              ["index", "" + t],
              ["配置id", "" + i[t].Id],
            ),
          this.GetInputText(2).Text === ""
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LoginFailEmptyAccount",
              )
            : (this.U6e(), this.P6e()));
      }),
      (this.F6e = () => {
        const i = this.GetInputText(11).GetText();
        const e = this.GetDropdown(4);
        if (StringUtils_1.StringUtils.IsEmpty(i)) e.SetOptions(this.L6e);
        else {
          this.D6e.Empty();
          for (let e = 0; e < this.L6e.Num(); e++) {
            const o = this.L6e.Get(e);
            o.TextOrConfigTableName.includes(i) && this.D6e.Add(o);
          }
          this.D6e.Num() !== 0 && (e.Options.Empty(), e.SetOptions(this.D6e));
        }
      }),
      (this.V6e = (e, i, o) => {
        let r;
        if (o === 0) {
          return (r =
            BaseConfigController_1.BaseConfigController.GetPrivateServers())
            ? ((r = r.serverUrl),
              Http_1.Http.Get(r, void 0, this.$6e),
              void (this.Bb = TimerSystem_1.TimerSystem.Delay(() => {
                (this.Bb = void 0), this.$6e(!1, void 0, void 0, !0);
              }, 5 * TimeUtil_1.TimeUtil.InverseMillisecond)))
            : void 0;
        }
        o === 3
          ? ErrorCodeController_1.ErrorCodeController.OpenConfirmBoxByText(
              `私服列表域名解析失败[${e}], 可能是本地开了VPN, 请关闭后重试`,
            )
          : ErrorCodeController_1.ErrorCodeController.OpenConfirmBoxByText(
              `私服列表获取失败[${e}], EIcmpResponseStatus:` + o,
            );
      }),
      (this.$6e = (e = 0, i, o = void 0, r = !0) => {
        let t;
        void 0 !== this.Bb &&
          (TimerSystem_1.TimerSystem.Remove(this.Bb), (this.Bb = void 0)),
          ModelManager_1.ModelManager.LoginModel.AddExtraServer(),
          o &&
            ((t = Json_1.Json.Decode(o))
              ? ModelManager_1.ModelManager.LoginModel.AddServerInfos(t)
              : Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Login", 43, "序列化ServerInfo失败", [
                  "JsonData",
                  o,
                ])),
          r && ModelManager_1.ModelManager.LoginModel.AddDataTableServers(),
          this.j6e();
      });
  }

  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UITextInputComponent],
      [3, UE.UIDropdownComponent],
      [4, UE.UIDropdownComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIExtendToggle],
      [8, UE.UISprite],
      [9, UE.UIExtendToggle],
      [10, UE.UISprite],
      [11, UE.UITextInputComponent],
      [12, UE.UITextInputComponent],
      [13, UE.UIDropdownComponent],
      [14, UE.UIDropdownComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.w6e],
        [1, this.A6e],
        [5, this.b6e],
        [6, this.x6e],
        [7, this.q6e],
        [9, this.G6e],
      ]);
  }

  OnStart() {
    (this.R6e = (0, puerts_1.toManualReleaseDelegate)(this.V6e)),
      ModelManager_1.ModelManager.LoginModel.InitConfig(),
      ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
      (this.L6e = UE.NewArray(UE.UIDropdownOptionData)),
      (this.D6e = UE.NewArray(UE.UIDropdownOptionData)),
      this.GetInputText(11).OnTextChange.Bind(this.F6e),
      this.GetInputText(2).SetText(
        ModelManager_1.ModelManager.LoginModel.GetAccount(),
      ),
      this.W6e();
  }

  j6e() {
    this.H6e(),
      this.K6e(),
      this.Q6e(),
      this.Y6e(),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        !UiManager_1.UiManager.IsViewShow("LoginStatusView") &&
        UiManager_1.UiManager.OpenView("LoginStatusView"),
      this.X6e(),
      this.J6e(),
      (ModelManager_1.ModelManager.LoginModel.SmokeTestReady = !0);
  }

  H6e() {
    const o = this.GetDropdown(3);
    if (o) {
      let e;
      const r = o.GetOption(0).Sprite;
      const t =
        (o.Options.Empty(),
        ModelManager_1.ModelManager.LoginModel.GetServerInfoList());
      const n = ModelManager_1.ModelManager.LoginModel.GetServerIp();
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          8,
          "debug 登录信息",
          ["serverIp", n],
          ["serverInfoList", t],
        );
      let i = !1;
      if (t) {
        for (let e = 0; e < t.length; ++e) {
          const a = t[e];
          o.Options.Add(new UE.UIDropdownOptionData(a.Name, r, 0, "")),
            a.Ip === n &&
              ((o.Value = e), o.CaptionText.UIText.SetText(a.Name), (i = !0));
        }
      }
      i ||
        (t &&
          t.length > 0 &&
          ((e = t[(o.Value = 0)]), o.CaptionText.UIText.SetText(e.Name)));
    }
  }

  K6e() {
    const r = this.GetDropdown(4);
    if (r) {
      let e;
      const t = r.GetOption(0).Sprite;
      const n =
        (r.Options.Empty(),
        ModelManager_1.ModelManager.LoginModel.GetSingleMapList());
      const a = ModelManager_1.ModelManager.LoginModel.GetSingleMapId();
      const l =
        ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId();
      let i = void 0;
      let o = !1;
      if (n) {
        for (let e = 0; e < n.length; ++e) {
          const _ = n[e];
          const g = _.MapId + "-" + _.MapName;
          const s = new UE.UIDropdownOptionData(g, t, 0, "");
          this.L6e.Add(s),
            r.Options.Add(s),
            _.MapId === a &&
              ((r.Value = e), r.CaptionText.UIText.SetText(g), (o = !0)),
            _.MapId === l && (i = e);
        }
      }
      o ||
        ((e = i || 0),
        n &&
          n.length > e &&
          ((e = (e = n[(r.Value = e)]).MapId + "-" + e.MapName),
          r.CaptionText.UIText.SetText(e)));
    }
  }

  Q6e() {
    let e;
    this.GetExtendToggle(7) &&
      ((e = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex,
        !0,
      )
        ? 1
        : 0),
      this.GetExtendToggle(7).SetToggleState(e),
      this.q6e(e));
  }

  Y6e() {
    let e;
    const i = this.GetExtendToggle(9);
    i &&
      ((e = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot,
        !1,
      )
        ? 1
        : 0),
      i.SetToggleState(e),
      this.G6e(e),
      i.GetRootComponent().SetUIActive(!1));
  }

  OnBeforeDestroy() {
    this.R6e &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.V6e),
      (this.R6e = void 0)),
      this.GetDropdown(13).OnSelectChange.Unbind(),
      ModelManager_1.ModelManager.LoginModel.SaveRecentlyAccountList(),
      ModelManager_1.ModelManager.LoginModel.CleanConfig();
  }

  J6e() {
    const e = this.GetDropdown(14);
    if (e) {
      e.CaptionText.UIText.text = "选择最近登录账号";
      const i = e.GetOption(0).Sprite;
      const o =
        (e.Options.Empty(),
        ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList());
      if (o) {
        for (const r of o) {
          e.Options.Add(new UE.UIDropdownOptionData(r, i, 0, ""));
        }
      }
      e.OnSelectChange.Bind(this.N6e);
    }
  }

  X6e() {
    const e = this.GetDropdown(13);
    if (e) {
      const i = e.GetOption(0).Sprite;
      const o =
        (e.Options.Empty(), GmAccountAll_1.configGmAccountAll.GetConfigList());
      for (const r of o) {
        e.Options.Add(new UE.UIDropdownOptionData(r.GmName, i, 0, ""));
      }
      e.CaptionText.UIText.SetText("创建指定GM账号"),
        e.OnSelectChange.Bind(this.O6e);
    }
  }

  P6e() {
    LoginController_1.LoginController.GetHttp(!0);
  }

  B6e() {
    return `${PublicUtil_1.PublicUtil.GetLocalHost()}[${TimeUtil_1.TimeUtil.DateFormat(
      new Date(),
    )}]`;
  }

  U6e() {
    var e = this.GetDropdown(4);
    let i = e?.Value;
    i === -1 && (i = 0);
    const o = e.GetOption(i);
    let r = -1;
    for (let e = 0; e < this.L6e.Num(); e++) {
      if (this.L6e.Get(e).TextOrConfigTableName === o.TextOrConfigTableName) {
        r = e;
        break;
      }
    }
    r === -1 &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Login",
          10,
          "当前选择的地图 在初始地图数据集合里 不存在",
          ["地图名称", o.TextOrConfigTableName],
        ),
      (r = 0)),
      void 0 !== r &&
        r >= 0 &&
        (e = ModelManager_1.ModelManager.LoginModel.GetSingleMapIp(r)) &&
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(e);
    var e = this.GetDropdown(3)?.Value;
    var e =
      (void 0 !== e &&
        e >= 0 &&
        (e = ModelManager_1.ModelManager.LoginModel.GetServerInfo(e)) &&
        (ModelManager_1.ModelManager.LoginModel.SetServerName(e.Name),
        ModelManager_1.ModelManager.LoginModel.SetServerIp(e.Ip, 1)),
      this.GetInputText(12).GetText());
    var e =
      (StringUtils_1.StringUtils.IsEmpty(e) ||
        (ModelManager_1.ModelManager.LoginModel.SetServerName(
          "手动输入IP地址服务器",
        ),
        ModelManager_1.ModelManager.LoginModel.SetServerIp(e, 2)),
      this.GetExtendToggle(7).ToggleState === 1
        ? LoginDefine_1.ELoginSex.Girl
        : LoginDefine_1.ELoginSex.Boy);
    const t =
      (LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex,
        e === LoginDefine_1.ELoginSex.Girl,
      ),
      ModelManager_1.ModelManager.LoginModel.SetPlayerSex(e),
      ModelManager_1.ModelManager.LoginModel.SetAccount(
        this.GetInputText(2).Text,
      ),
      this.GetExtendToggle(9).ToggleState === 1);
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot,
      t,
    ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          8,
          "已保存登录数据",
          ["ServerIp", ModelManager_1.ModelManager.LoginModel.GetServerIp()],
          ["SingleId", ModelManager_1.ModelManager.LoginModel.GetSingleMapId()],
          [
            "MultiMapId",
            ModelManager_1.ModelManager.LoginModel.GetMultiMapId(),
          ],
          ["Account", ModelManager_1.ModelManager.LoginModel.GetAccount()],
          ["LoginSex", LoginDefine_1.ELoginSex[e]],
        );
  }

  W6e() {
    let e, i;
    KuroSdkController_1.KuroSdkController.CanUseSdk() ||
      ((e = BaseConfigController_1.BaseConfigController.GetPrivateServers()) &&
        (ModelManager_1.ModelManager.LoginModel.AddServerInfoByCdn(),
        e.enable
          ? (i = e.serverUrl.match(/:\/\/.*?\//g)).length >= 0
            ? ((i = i[0]),
              UE.KuroStaticLibrary.IcmpPing(
                i.substring(3, i.length - 1),
                5,
                this.R6e,
              ))
            : ErrorCodeController_1.ErrorCodeController.OpenConfirmBoxByText(
                `私服域名截取失败[${e.serverUrl}]`,
              )
          : this.$6e(!1, void 0, void 0, !1)));
  }
}
exports.LoginDebugView = LoginDebugView;
