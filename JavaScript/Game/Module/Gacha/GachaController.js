"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager"),
  GachaDefine_1 = require("./GachaDefine"),
  GachaModel_1 = require("./GachaModel"),
  HULU_BASE_ID = 2e7,
  HULU_PARTY_ID = 1e5;
class GachaController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "GachaMainView",
        GachaController.YHt,
      ),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFunctionOpenSet,
      this.JHt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.JHt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.zHt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterCloseGachaScene,
        this.OnAfterCloseGachaScent,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFunctionOpenSet,
      this.JHt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.JHt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.zHt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterCloseGachaScene,
        this.OnAfterCloseGachaScent,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(7832, GachaController.OnGachaResultNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(7832);
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
    var a = !GachaController.ZHt.has(e);
    return a && GachaController.ZHt.add(e), a;
  }
  static async GachaRequest(e, a) {
    var r = Protocol_1.Aki.Protocol.Hrs.create();
    (r.KVn = e), (r.QVn = a);
    ModelManager_1.ModelManager.RoleModel.GetRoleList().forEach((e) => {
      e && GachaController.ZHt.add(e.GetDataId());
    });
    var o,
      r = await Net_1.Net.CallAsync(16605, r);
    r &&
      (r.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrGachaIsNotInOpenTime
        ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(67)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            o,
          ),
          this.zHt())
        : r.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              r.O4n,
              16172,
            )
          : (ModelManager_1.ModelManager.GachaModel.UpdateCount(e, a),
            (ModelManager_1.ModelManager.GachaModel.CurGachaResult = r.QUs),
            UiManager_1.UiManager.OpenView("DrawMainView")));
  }
  static async GachaPoolDetailRequestAsync(e) {
    var a = Protocol_1.Aki.Protocol.tLa.create(),
      e = ((a.$Vn = e), await Net_1.Net.CallAsync(13147, a));
    return (
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          1889,
        ),
      e
    );
  }
  static GachaInfoRequest(a, e = 0) {
    var r = TimeUtil_1.TimeUtil.GetServerTime() - this.ejt;
    (this.ejt = TimeUtil_1.TimeUtil.GetServerTime()),
      r < this.tjt
        ? a &&
          !UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
          UiManager_1.UiManager.OpenView("GachaMainView")
        : ((r = Protocol_1.Aki.Protocol.Vrs.create()),
          Net_1.Net.Call(12155, r, (e) => {
            e
              ? e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
                ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.O4n,
                    16631,
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
                      e.jUs,
                    ),
                    (ModelManager_1.ModelManager.GachaModel.TodayResultCount =
                      e.WUs),
                    (ModelManager_1.ModelManager.GachaModel.RecordId = e.KUs),
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
    var e = Protocol_1.Aki.Protocol.Krs.create();
    (e.KVn = a),
      (e.$Vn = r),
      Net_1.Net.Call(4321, e, (e) => {
        e
          ? e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                28954,
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
    const i = [],
      l = new Map();
    ModelManager_1.ModelManager.GachaModel.CurGachaResult.forEach((e, a) => {
      var r = e.WVn.f8n;
      let o;
      switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(r)) {
        case 1:
          var n = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(r),
            t =
              (l.get(r) ||
                (l.set(r, !0),
                i.push(
                  ...UiModelResourcesManager_1.UiModelResourcesManager.GetRoleResourcesPath(
                    n.Id,
                  ),
                )),
              ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(
                n.Id,
              )),
            t =
              ((o =
                UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
                  t,
                )),
              l.get(r) || (l.set(r, !0), i.push(...o)),
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n.Id));
          i.push(
            ...UiModelResourcesManager_1.UiModelResourcesManager.GetHuluResourcesPath(
              t.PartyId * HULU_PARTY_ID + HULU_BASE_ID + 1,
            ),
          );
          break;
        case 2:
          (o =
            UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
              r,
            )),
            l.get(r) || (l.set(r, !0), i.push(...o));
      }
    }),
      UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
        i,
        e,
      );
  }
  static CommonShowRoleResult(e, a, r) {
    var o, n, t;
    1 ===
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
        e,
      ) &&
      ((o = new Array()),
      (n = new GachaModel_1.GachaResult()),
      ((t = new Protocol_1.Aki.Protocol.WVn()).f8n = e),
      (t.YVn = 1),
      (n.WVn = t),
      o.push(n),
      (e = {
        SkipOnLoadResourceFinish: a,
        ResultViewHideExtraReward: r,
        IsOnlyShowGold: !1,
      }),
      UiManager_1.UiManager.IsViewOpen("DrawMainView")
        ? ModelManager_1.ModelManager.GachaModel.CacheGachaInfo({
            ResultViewData: e,
            GachaResult: o,
          })
        : ((ModelManager_1.ModelManager.GachaModel.CurGachaResult = o),
          e.SkipOnLoadResourceFinish
            ? UiManager_1.UiManager.OpenView("GachaScanView", e)
            : UiManager_1.UiManager.OpenView("DrawMainView", e)));
  }
}
((exports.GachaController = GachaController).ZHt = new Set()),
  (GachaController.YHt = () => {
    GachaController.OpenGachaMainView(!0);
  }),
  (GachaController.OnGachaResultNotify = (e) => {
    (ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.QUs),
      UiManager_1.UiManager.OpenView("DrawMainView");
  }),
  (GachaController.JHt = (e, a) => {
    10009 === e &&
      a &&
      (ModelManager_1.ModelManager.GachaModel.InitGachaPoolOpenRecord(),
      GachaController.GachaInfoRequest(!1));
  }),
  (GachaController.zHt = () => {
    UiManager_1.UiManager.IsViewOpen("GachaMainView") &&
      GachaController.GachaInfoRequest(!1);
  }),
  (GachaController.OpenGachaMainView = (e = !1) => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10009)
      ? GachaController.GachaInfoRequest(!0, e)
      : Log_1.Log.CheckError() && Log_1.Log.Error("Gacha", 9, "抽奖未开启");
  }),
  (GachaController.ejt = 0),
  (GachaController.tjt = 1),
  (GachaController.OnAfterCloseGachaScent = () => {
    var e = ModelManager_1.ModelManager.GachaModel.GetCachedGachaInfo();
    e &&
      ((ModelManager_1.ModelManager.GachaModel.CurGachaResult = e.GachaResult),
      UiManager_1.UiManager.OpenView("DrawMainView", e.ResultViewData));
  }),
  (GachaController.OpenGachaSelectionView = (e) => {
    var a;
    UiManager_1.UiManager.IsViewOpen("GachaSelectionView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.GachaSelectionViewRefresh,
          e,
        )
      : (((a = new GachaDefine_1.GachaSelectionViewData()).GachaInfo = e),
        UiManager_1.UiManager.OpenView("GachaSelectionView", a));
  });
//# sourceMappingURL=GachaController.js.map
