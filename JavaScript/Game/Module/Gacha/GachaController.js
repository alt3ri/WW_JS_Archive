"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaController = void 0);
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager");
const GachaDefine_1 = require("./GachaDefine");
const GachaModel_1 = require("./GachaModel");
const HULU_BASE_ID = 2e7;
const HULU_PARTY_ID = 1e5;
class GachaController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "GachaMainView",
        GachaController.Y7t,
      ),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFunctionOpenSet,
      this.J7t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.J7t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.z7t,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterCloseGachaScene,
        this.OnAfterCloseGachaScent,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFunctionOpenSet,
      this.J7t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.J7t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.z7t,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterCloseGachaScene,
        this.OnAfterCloseGachaScent,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(10183, GachaController.OnGachaResultNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(10183);
  }
  static CanCloseView() {
    return (
      !!ModelManager_1.ModelManager.GachaModel.CanCloseView ||
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CloseGachaSceneView,
      ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Gacha", 28, "GachaController关闭GachaScene"),
      !1)
    );
  }
  static GachaHistoryRequest(e) {}
  static IsNewRole(e) {
    const a = !GachaController.Z7t.has(e);
    return a && GachaController.Z7t.add(e), a;
  }
  static async GachaRequest(e, a) {
    var r = Protocol_1.Aki.Protocol.YZn.create();
    (r.c5n = e), (r.m5n = a);
    ModelManager_1.ModelManager.RoleModel.GetRoleList().forEach((e) => {
      e && GachaController.Z7t.add(e.GetDataId());
    });
    let n;
    var r = await Net_1.Net.CallAsync(8315, r);
    r &&
      (r.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrGachaIsNotInOpenTime
        ? ((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(67)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            n,
          ),
          this.z7t())
        : r.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              r.lkn,
              15058,
            )
          : (ModelManager_1.ModelManager.GachaModel.UpdateCount(e, a),
            (ModelManager_1.ModelManager.GachaModel.CurGachaResult = r.ARs),
            UiManager_1.UiManager.OpenView("DrawMainView")));
  }
  static GachaInfoRequest(a, e = 0) {
    let r = TimeUtil_1.TimeUtil.GetServerTime() - this.eHt;
    (this.eHt = TimeUtil_1.TimeUtil.GetServerTime()),
      r < this.tHt
        ? a &&
          !UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
          UiManager_1.UiManager.OpenView("GachaMainView")
        : (((r = Protocol_1.Aki.Protocol.QZn.create()).d5n =
            LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
              LanguageSystem_1.LanguageSystem.PackageLanguage,
            ).LanguageType),
          Net_1.Net.Call(12776, r, (e) => {
            e
              ? e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
                ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.lkn,
                    20889,
                  )
                : ModelManager_1.ModelManager.LoadingModel?.IsLoading
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Gacha",
                      35,
                      "[GachaController.GachaInfoRequest] 在Loading中,打开抽卡界面取消",
                    )
                  : (Log_1.Log.CheckDebug() &&
                      Log_1.Log.Debug("Gacha", 35, "抽卡服务端数据:", [
                        "Result",
                        JSON.stringify(e),
                      ]),
                    ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(
                      e.LRs,
                    ),
                    (ModelManager_1.ModelManager.GachaModel.TodayResultCount =
                      e.RRs),
                    (ModelManager_1.ModelManager.GachaModel.RecordId = e.DRs),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.RefreshGachaMainView,
                    ),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.OnOpenGachaChanged,
                    ),
                    a &&
                      !UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
                      UiManager_1.UiManager.OpenView("GachaMainView"))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Gacha", 9, "请求抽奖数据失败");
          }));
  }
  static GachaUsePoolRequest(a, r) {
    const e = Protocol_1.Aki.Protocol.ZZn.create();
    (e.c5n = a),
      (e.C5n = r),
      Net_1.Net.Call(8527, e, (e) => {
        e
          ? e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                11845,
              )
            : (e = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(a))
              ? ((e.UsePoolId = r),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.GachaPoolSelectResponse,
                  a,
                  r,
                ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Gacha", 44, "卡池设置失败")
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Gacha", 44, "选择卡池失败");
      });
  }
  static PreloadGachaResultResource(e) {
    const i = [];
    const _ = new Map();
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, a) => {
      const r = e.u5n.G3n;
      let n;
      switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(r)) {
        case 1:
          var o = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(r);
          var t =
            (_.get(r) ||
              (_.set(r, !0),
              i.push(
                ...UiModelResourcesManager_1.UiModelResourcesManager.GetRoleResourcesPath(
                  o.Id,
                ),
              )),
            ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(
              o.Id,
            ));
          var t =
            ((n =
              UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
                t,
              )),
            _.get(r) || (_.set(r, !0), i.push(...n)),
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o.Id));
          i.push(
            ...UiModelResourcesManager_1.UiModelResourcesManager.GetHuluResourcesPath(
              t.PartyId * HULU_PARTY_ID + HULU_BASE_ID + 1,
            ),
          );
          break;
        case 2:
          (n =
            UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
              r,
            )),
            _.get(r) || (_.set(r, !0), i.push(...n));
      }
    }),
      UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
        i,
        e,
      );
  }
  static CommonShowRoleResult(e, a, r) {
    let n, o, t;
    ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
      e,
    ) === 1 &&
      ((n = new Array()),
      (o = new GachaModel_1.GachaResult()),
      ((t = new Protocol_1.Aki.Protocol.u5n()).G3n = e),
      (t.g5n = 1),
      (o.u5n = t),
      n.push(o),
      (e = {
        SkipOnLoadResourceFinish: a,
        ResultViewHideExtraReward: r,
        IsOnlyShowGold: !1,
      }),
      UiManager_1.UiManager.IsViewOpen("DrawMainView")
        ? ModelManager_1.ModelManager.GachaModel.CacheGachaInfo({
            ResultViewData: e,
            GachaResult: n,
          })
        : ((ModelManager_1.ModelManager.GachaModel.CurGachaResult = n),
          e.SkipOnLoadResourceFinish
            ? UiManager_1.UiManager.OpenView("GachaScanView", e)
            : UiManager_1.UiManager.OpenView("DrawMainView", e)));
  }
}
((exports.GachaController = GachaController).Z7t = new Set()),
  (GachaController.Y7t = () => {
    GachaController.OpenGachaMainView(!0);
  }),
  (GachaController.OnGachaResultNotify = (e) => {
    (ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.ARs),
      UiManager_1.UiManager.OpenView("DrawMainView");
  }),
  (GachaController.J7t = (e, a) => {
    e === 10009 &&
      a &&
      (ModelManager_1.ModelManager.GachaModel.InitGachaPoolOpenRecord(),
      GachaController.GachaInfoRequest(!1));
  }),
  (GachaController.z7t = () => {
    UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
      GachaController.GachaInfoRequest(!1);
  }),
  (GachaController.OpenGachaMainView = (e = !1) => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10009)
      ? GachaController.GachaInfoRequest(!0, e)
      : Log_1.Log.CheckError() && Log_1.Log.Error("Gacha", 9, "抽奖未开启");
  }),
  (GachaController.eHt = 0),
  (GachaController.tHt = 1),
  (GachaController.OnAfterCloseGachaScent = () => {
    const e = ModelManager_1.ModelManager.GachaModel.GetCachedGachaInfo();
    e &&
      ((ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.GachaResult),
      UiManager_1.UiManager.OpenView("DrawMainView", e.ResultViewData));
  }),
  (GachaController.OpenGachaSelectionView = (e) => {
    let a;
    UiManager_1.UiManager.IsViewOpen("GachaSelectionView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GachaSelectionViewRefresh,
          e,
        )
      : (((a = new GachaDefine_1.GachaSelectionViewData()).GachaInfo = e),
        UiManager_1.UiManager.OpenView("GachaSelectionView", a));
  });
// # sourceMappingURL=GachaController.js.map
