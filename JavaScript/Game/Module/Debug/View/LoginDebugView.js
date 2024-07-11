"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginDebugView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Json_1 = require("../../../../Core/Common/Json"),
  Log_1 = require("../../../../Core/Common/Log"),
  GmAccountAll_1 = require("../../../../Core/Define/ConfigQuery/GmAccountAll"),
  Http_1 = require("../../../../Core/Http/Http"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LoginDefine_1 = require("../../Login/Data/LoginDefine"),
  LoginController_1 = require("../../Login/LoginController"),
  ReconnectDefine_1 = require("../../ReConnect/ReconnectDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager");
class LoginDebugView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IRe = void 0),
      (this.lFt = -1),
      (this._Ft = void 0),
      (this.uFt = void 0),
      (this.cFt = void 0),
      (this.mFt = () => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
          ReconnectDefine_1.ELogoutReason.LoginViewQuit,
        );
      }),
      (this.dFt = () => {
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? "" === this.GetInputText(2).Text
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LoginFailEmptyAccount",
              )
            : (this.CFt(),
              "Windows" !== UE.GameplayStatics.GetPlatformName() &&
                UE.KismetSystemLibrary.ExecuteConsoleCommand(
                  GlobalData_1.GlobalData.World,
                  "r.DepthOfFieldQuality 1",
                ),
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
            Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！");
      }),
      (this.gFt = () => {
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? "" === this.GetInputText(2).Text
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LoginFailEmptyAccount",
              )
            : (this.CFt(),
              ModelManager_1.ModelManager.LoginModel.SetPlayerName(
                "一键登录账号",
              ),
              this.fFt())
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！");
      }),
      (this.pFt = () => {
        var e;
        ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
          ? (this.CFt(),
            (e = this.vFt()),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 9, "生成账号", ["ip", e]),
            this.GetInputText(2).SetText(e),
            ModelManager_1.ModelManager.LoginModel.SetAccount(e),
            ModelManager_1.ModelManager.LoginModel.SetPlayerName(
              "一键登录账号",
            ),
            this.fFt())
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！");
      }),
      (this.MFt = (e) => {
        this.GetSprite(8).SetUIActive(1 === e);
      }),
      (this.SFt = (e) => {
        this.GetSprite(10).SetUIActive(1 === e);
      }),
      (this.EFt = (e) => {
        var i;
        -1 !== e &&
          (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          )
            ? ((i =
                ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList()),
              this.GetInputText(2).SetText(i[e]),
              "" === this.GetInputText(2).Text
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "LoginFailEmptyAccount",
                  )
                : (this.CFt(), this.fFt()))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！"));
      }),
      (this.yFt = (e) => {
        -1 !== (this.lFt = e) &&
          (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          ) ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 9, "正在登录中, 请勿重复操作！")),
          UiManager_1.UiManager.OpenView("LoginDebugPlayerNameView", this.IFt));
      }),
      (this.IFt = () => {
        var e,
          i,
          o,
          r,
          t = this.lFt;
        t < 0 ||
          ((e = ModelManager_1.ModelManager.LoginModel.GetPlayerName()),
          (o = (i = GmAccountAll_1.configGmAccountAll.GetConfigList())[t]
            .FirstName),
          (r = this.vFt()),
          this.GetInputText(2).SetText("" + e + o + "-" + r),
          (ModelManager_1.ModelManager.SundryModel.AccountGmId =
            i[t].GmOrderListId),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              9,
              "创建新的GM账号",
              ["index", "" + t],
              ["配置id", "" + i[t].Id],
            ),
          "" === this.GetInputText(2).Text
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "LoginFailEmptyAccount",
              )
            : (this.CFt(), this.fFt()));
      }),
      (this.TFt = () => {
        var i = this.GetInputText(11).GetText(),
          e = this.GetDropdown(4);
        if (StringUtils_1.StringUtils.IsEmpty(i)) e.SetOptions(this._Ft);
        else {
          this.uFt.Empty();
          for (let e = 0; e < this._Ft.Num(); e++) {
            var o = this._Ft.Get(e);
            o.TextOrConfigTableName.includes(i) && this.uFt.Add(o);
          }
          0 !== this.uFt.Num() && (e.Options.Empty(), e.SetOptions(this.uFt));
        }
      }),
      (this.LFt = (e, i, o) => {
        var r;
        if (0 === o)
          return (r =
            BaseConfigController_1.BaseConfigController.GetPrivateServers())
            ? ((r = r.serverUrl),
              Http_1.Http.Get(r, void 0, this.DFt),
              void (this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
                (this.IRe = void 0), this.DFt(!1, void 0, void 0, !0);
              }, 5 * TimeUtil_1.TimeUtil.InverseMillisecond)))
            : void 0;
        3 === o
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
              `私服列表域名解析失败[${e}], 可能是本地开了VPN, 请关闭后重试`,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
              `私服列表获取失败[${e}], EIcmpResponseStatus:` + o,
            );
      }),
      (this.DFt = (e = 0, i, o = void 0, r = !0) => {
        var t;
        void 0 !== this.IRe &&
          (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
          ModelManager_1.ModelManager.LoginModel.AddExtraServer(),
          o &&
            ((t = Json_1.Json.Parse(o))
              ? ModelManager_1.ModelManager.LoginModel.AddServerInfos(t)
              : Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Login", 42, "序列化ServerInfo失败", [
                  "JsonData",
                  o,
                ])),
          r && ModelManager_1.ModelManager.LoginModel.AddDataTableServers(),
          this.RFt();
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
        [0, this.mFt],
        [1, this.dFt],
        [5, this.pFt],
        [6, this.gFt],
        [7, this.MFt],
        [9, this.SFt],
      ]);
  }
  OnStart() {
    (this.cFt = (0, puerts_1.toManualReleaseDelegate)(this.LFt)),
      ModelManager_1.ModelManager.LoginModel.InitConfig(),
      ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
      (this._Ft = UE.NewArray(UE.UIDropdownOptionData)),
      (this.uFt = UE.NewArray(UE.UIDropdownOptionData)),
      this.GetInputText(11).OnTextChange.Bind(this.TFt),
      this.GetInputText(2).SetText(
        ModelManager_1.ModelManager.LoginModel.GetAccount(),
      ),
      this.UFt();
  }
  RFt() {
    this.AFt(),
      this.PFt(),
      this.xFt(),
      this.wFt(),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        !UiManager_1.UiManager.IsViewShow("LoginStatusView") &&
        UiManager_1.UiManager.OpenView("LoginStatusView"),
      this.BFt(),
      this.bFt(),
      (ModelManager_1.ModelManager.LoginModel.SmokeTestReady = !0);
  }
  AFt() {
    var o = this.GetDropdown(3);
    if (o) {
      var e,
        r = o.GetOption(0).Sprite,
        t =
          (o.Options.Empty(),
          ModelManager_1.ModelManager.LoginModel.GetServerInfoList()),
        n = ModelManager_1.ModelManager.LoginModel.GetServerIp();
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          9,
          "debug 登录信息",
          ["serverIp", n],
          ["serverInfoList", t],
        );
      let i = !1;
      if (t)
        for (let e = 0; e < t.length; ++e) {
          var a = t[e];
          o.Options.Add(new UE.UIDropdownOptionData(a.Name, r, 0, "")),
            a.Ip === n &&
              ((o.Value = e), o.CaptionText.UIText.SetText(a.Name), (i = !0));
        }
      i ||
        (t &&
          0 < t.length &&
          ((e = t[(o.Value = 0)]), o.CaptionText.UIText.SetText(e.Name)));
    }
  }
  PFt() {
    var r = this.GetDropdown(4);
    if (r) {
      var e,
        t = r.GetOption(0).Sprite,
        n =
          (r.Options.Empty(),
          ModelManager_1.ModelManager.LoginModel.GetSingleMapList()),
        a = ModelManager_1.ModelManager.LoginModel.GetSingleMapId(),
        g = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId();
      let i = void 0,
        o = !1;
      if (n)
        for (let e = 0; e < n.length; ++e) {
          var _ = n[e],
            l = _.MapId + "-" + _.MapName,
            s = new UE.UIDropdownOptionData(l, t, 0, "");
          this._Ft.Add(s),
            r.Options.Add(s),
            _.MapId === a &&
              ((r.Value = e), r.CaptionText.UIText.SetText(l), (o = !0)),
            _.MapId === g && (i = e);
        }
      o ||
        ((e = i || 0),
        n &&
          n.length > e &&
          ((e = (e = n[(r.Value = e)]).MapId + "-" + e.MapName),
          r.CaptionText.UIText.SetText(e)));
    }
  }
  xFt() {
    var e;
    this.GetExtendToggle(7) &&
      ((e = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex,
        !0,
      )
        ? 1
        : 0),
      this.GetExtendToggle(7).SetToggleState(e),
      this.MFt(e));
  }
  wFt() {
    var e,
      i = this.GetExtendToggle(9);
    i &&
      ((e = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot,
        !1,
      )
        ? 1
        : 0),
      i.SetToggleState(e),
      this.SFt(e),
      i.GetRootComponent().SetUIActive(!1));
  }
  OnBeforeDestroy() {
    this.cFt &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.LFt),
      (this.cFt = void 0)),
      this.GetDropdown(13).OnSelectChange.Unbind(),
      ModelManager_1.ModelManager.LoginModel.SaveRecentlyAccountList(),
      ModelManager_1.ModelManager.LoginModel.CleanConfig();
  }
  bFt() {
    var e = this.GetDropdown(14);
    if (e) {
      e.CaptionText.UIText.text = "选择最近登录账号";
      var i = e.GetOption(0).Sprite,
        o =
          (e.Options.Empty(),
          ModelManager_1.ModelManager.LoginModel.GetRecentlyAccountList());
      if (o)
        for (const r of o)
          e.Options.Add(new UE.UIDropdownOptionData(r, i, 0, ""));
      e.OnSelectChange.Bind(this.EFt);
    }
  }
  BFt() {
    var e = this.GetDropdown(13);
    if (e) {
      var i = e.GetOption(0).Sprite,
        o =
          (e.Options.Empty(),
          GmAccountAll_1.configGmAccountAll.GetConfigList());
      for (const r of o)
        e.Options.Add(new UE.UIDropdownOptionData(r.GmName, i, 0, ""));
      e.CaptionText.UIText.SetText("创建指定GM账号"),
        e.OnSelectChange.Bind(this.yFt);
    }
  }
  fFt() {
    PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(
      () => {
        UE.KuroPakKeyLibrary.HasPendingEncryptedPaks()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 22, "存在未成功挂载的Pak包！"),
            LoginController_1.LoginController.GetAndShowStopServerNotice())
          : LoginController_1.LoginController.GetHttp(!0);
      },
      void 0,
    ).catch((e) => {});
  }
  vFt() {
    return `${PublicUtil_1.PublicUtil.GetLocalHost()}[${TimeUtil_1.TimeUtil.DateFormat(new Date())}]`;
  }
  UBn(e) {
    e = /(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(?<port>\d{1,5}))?/.exec(
      e,
    );
    if (e && e.groups) return { Ip: e.groups.ip, Port: e.groups.port };
  }
  CFt() {
    var e = this.GetDropdown(4);
    let i = e?.Value;
    -1 === i && (i = 0);
    var o = e.GetOption(i);
    let r = -1;
    for (let e = 0; e < this._Ft.Num(); e++)
      if (this._Ft.Get(e).TextOrConfigTableName === o.TextOrConfigTableName) {
        r = e;
        break;
      }
    -1 === r &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Login",
          11,
          "当前选择的地图 在初始地图数据集合里 不存在",
          ["地图名称", o.TextOrConfigTableName],
        ),
      (r = 0)),
      void 0 !== r &&
        0 <= r &&
        (e = ModelManager_1.ModelManager.LoginModel.GetSingleMapIp(r)) &&
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(e);
    var e = this.GetDropdown(3),
      e =
        (e
          ? ((e = e.Value),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 11, "获取服务器下拉列表当前设置值", [
                "serverValue",
                e,
              ]),
            void 0 !== e &&
              0 <= e &&
              ((e = ModelManager_1.ModelManager.LoginModel.GetServerInfo(e))
                ? (ModelManager_1.ModelManager.LoginModel.SetServerName(e.Name),
                  ModelManager_1.ModelManager.LoginModel.SetServerIp(e.Ip, 1))
                : ((e =
                    ModelManager_1.ModelManager.LoginModel.GetServerInfoList()),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Login", 11, "获取服务器数据为空", [
                      "serverInfoList",
                      e,
                    ]))))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 11, "服务器下拉列表节点获取不到"),
        this.GetInputText(12).GetText()),
      e =
        (StringUtils_1.StringUtils.IsEmpty(e) ||
          ((e = this.UBn(e)) &&
            (ModelManager_1.ModelManager.LoginModel.SetServerName(
              "手动输入IP地址服务器",
            ),
            ModelManager_1.ModelManager.LoginModel.SetServerIp(e.Ip, 2),
            ModelManager_1.ModelManager.LoginModel.TrySetCustomServerPort(
              e.Port,
              2,
            ))),
        1 === this.GetExtendToggle(7).ToggleState
          ? LoginDefine_1.ELoginSex.Girl
          : LoginDefine_1.ELoginSex.Boy),
      t =
        (LocalStorage_1.LocalStorage.SetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.LoginSex,
          e === LoginDefine_1.ELoginSex.Girl,
        ),
        ModelManager_1.ModelManager.LoginModel.SetPlayerSex(e),
        ModelManager_1.ModelManager.LoginModel.SetAccount(
          this.GetInputText(2).Text,
        ),
        1 === this.GetExtendToggle(9).ToggleState);
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SkipPlot,
      t,
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          9,
          "已保存登录数据",
          ["ServerIp", ModelManager_1.ModelManager.LoginModel.GetServerIp()],
          [
            "CustomServerPort",
            ModelManager_1.ModelManager.LoginModel.GetCustomServerPort(),
          ],
          ["SingleId", ModelManager_1.ModelManager.LoginModel.GetSingleMapId()],
          [
            "MultiMapId",
            ModelManager_1.ModelManager.LoginModel.GetMultiMapId(),
          ],
          ["Account", ModelManager_1.ModelManager.LoginModel.GetAccount()],
          ["LoginSex", LoginDefine_1.ELoginSex[e]],
        );
  }
  UFt() {
    var e, i;
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ||
      ((e = BaseConfigController_1.BaseConfigController.GetPrivateServers()) &&
        (ModelManager_1.ModelManager.LoginModel.AddServerInfoByCdn(),
        e.enable
          ? 0 <= (i = e.serverUrl.match(/:\/\/.*?\//g)).length
            ? ((i = i[0]),
              UE.KuroStaticLibrary.IcmpPing(
                i.substring(3, i.length - 1),
                5,
                this.cFt,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(
                `私服域名截取失败[${e.serverUrl}]`,
              )
          : this.DFt(!1, void 0, void 0, !1)));
  }
}
exports.LoginDebugView = LoginDebugView;
//# sourceMappingURL=LoginDebugView.js.map
