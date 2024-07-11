"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaModel =
    exports.GachaContentInfo =
    exports.GachaResult =
      void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager"),
  GachaController_1 = require("./GachaController"),
  GachaDefine_1 = require("./GachaDefine"),
  ProtoGachaInfo_1 = require("./ProtoGachaInfo");
class GachaResult {
  constructor() {
    (this.WVn = void 0),
      (this.zVn = []),
      (this.IsNew = !0),
      (this.ZVn = []),
      (this.e9n = void 0);
  }
}
exports.GachaResult = GachaResult;
class GachaContentInfo {
  constructor() {
    (this.title = ""), (this.explain = ""), (this.detail = "");
  }
}
exports.GachaContentInfo = GachaContentInfo;
class GachaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.MWt = void 0),
      (this.EWt = 0),
      (this.SWt = void 0),
      (this.yWt = void 0),
      (this.IWt = void 0),
      (this.TWt = !0),
      (this.LWt = ""),
      (this.DWt = void 0),
      (this.RWt = []),
      (this.UWt = new Map()),
      (this.AWt = []);
  }
  static IsLimit(e) {
    return 0 !== e.BeginTime || 0 !== e.EndTime;
  }
  static IsValid(e) {
    var o;
    return (
      !GachaModel.IsLimit(e) ||
      ((o = TimeUtil_1.TimeUtil.GetServerTime()) >= e.BeginTime &&
        (o < e.EndTime || 0 === e.EndTime))
    );
  }
  GetCachedGachaInfo() {
    return this.DWt.shift();
  }
  CacheGachaInfo(e) {
    this.DWt.push(e);
  }
  set RecordId(e) {
    this.LWt = e;
  }
  get RecordId() {
    return this.LWt;
  }
  get CanCloseView() {
    return this.TWt;
  }
  set CanCloseView(e) {
    this.TWt = e;
  }
  get TodayResultCount() {
    return this.EWt;
  }
  set TodayResultCount(e) {
    this.EWt = e;
  }
  get GachaInfoArray() {
    return this.MWt;
  }
  get CurGachaResult() {
    return this.SWt;
  }
  set CurGachaResult(e) {
    this.SWt = e;
    var o = new Map();
    for (const s of this.SWt) {
      var r = s?.WVn?.f8n,
        t = s?.WVn?.YVn;
      o.set(r, (o.get(r) ?? 0) + t);
    }
    for (const n of this.SWt) {
      var a = n?.WVn?.f8n,
        i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(a);
      i
        ? (n.IsNew = GachaController_1.GachaController.IsNewRole(i.Id))
        : (i =
              LocalStorage_1.LocalStorage.GetPlayer(
                LocalStorageDefine_1.ELocalStoragePlayerKey.GachaWeaponRecord,
              ) ?? []).includes(a)
          ? (n.IsNew = !1)
          : ((n.IsNew = !0),
            i.push(a),
            LocalStorage_1.LocalStorage.SetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.GachaWeaponRecord,
              i,
            ));
    }
  }
  GetGachaInfoByResourceId(e) {
    for (const o of this.MWt) if (o.ResourcesId === e) return o;
  }
  OnInit() {
    return (this.DWt = []), !0;
  }
  OnClear() {
    return (
      (this.CanCloseView = !0),
      (this.MWt = void 0),
      (this.SWt = void 0),
      (this.yWt = void 0),
      (this.IWt = void 0),
      (this.DWt.length = 0),
      !(this.DWt = void 0)
    );
  }
  InitGachaInfoMap(e) {
    this.MWt = [];
    for (const o of e) this.MWt.push(new ProtoGachaInfo_1.ProtoGachaInfo(o));
    this.MWt.sort((e, o) => e.Sort - o.Sort);
  }
  CheckGachaValid(e) {
    return GachaModel.IsValid(e);
  }
  GetValidGachaList() {
    var e,
      o = [];
    for (const r of ModelManager_1.ModelManager.GachaModel.GachaInfoArray)
      ModelManager_1.ModelManager.GachaModel.CheckGachaValid(r) &&
        (e =
          0 < (e = r.UsePoolId) ? r.GetPoolInfo(e) : r.GetFirstValidPool()) &&
        o.push(new GachaDefine_1.GachaPoolData(r, e));
    return o;
  }
  CheckCountIsEnough(e, o) {
    return 0 < e.DailyLimitTimes && e.TodayTimes + o > e.DailyLimitTimes
      ? [!1, 69]
      : 0 < e.TotalLimitTimes && e.TotalTimes + o > e.TotalLimitTimes
        ? [!1, 129]
        : 0 <= this.EWt && o > this.EWt
          ? [!1, 130]
          : [!0, void 0];
  }
  IsTotalTimesZero(e) {
    return 0 < e.TotalLimitTimes && e.TotalTimes >= e.TotalLimitTimes;
  }
  GetGachaInfo(e) {
    for (const o of this.GachaInfoArray) if (o.Id === e) return o;
  }
  RecordGachaInfo(e) {
    return (
      !this.IWt.has(e.Id) &&
      (this.IWt.add(e.Id),
      this.yWt.push(e.Id),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord,
        this.yWt,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnOpenGachaChanged,
      ),
      !0)
    );
  }
  InitGachaPoolOpenRecord() {
    (this.yWt =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord,
      ) ?? []),
      (this.IWt = new Set());
    for (const e of this.yWt) this.IWt.add(e);
  }
  UpdateCount(e, o) {
    this.EWt -= o;
    for (const r of this.GachaInfoArray)
      if (r.Id === e) {
        (r.TodayTimes += o), (r.TotalTimes += o);
        break;
      }
  }
  CheckNewGachaPool() {
    if (
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Gacha", 9, "当前打开过的卡池", [
          "GachaPoolOpenRecord",
          this.yWt,
        ]),
      this.GachaInfoArray)
    )
      for (const e of this.GachaInfoArray) if (!this.IWt.has(e.Id)) return !0;
    return !1;
  }
  CheckNewGachaPoolById(e) {
    return !this.IWt.has(e);
  }
  async PreloadGachaSequence(e) {
    var o = [];
    for (const r of e) o.push(this.PreloadGachaSequenceOne(r));
    await Promise.all(o);
  }
  GetLoadedSequence(e) {
    return this.UWt.get(e);
  }
  async PreloadGachaSequenceOne(e) {
    var o = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
    const r =
        ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
          o.ShowSequence,
        ),
      t = new CustomPromise_1.CustomPromise();
    (o = ResourceSystem_1.ResourceSystem.LoadAsync(
      r.SequencePath,
      UE.LevelSequence,
      (e) => {
        this.UWt.set(r.SequencePath, e),
          UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0),
          t.SetResult(!0);
      },
      102,
    )),
      this.RWt.push(o),
      await t.Promise,
      (o = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e));
    const a = new CustomPromise_1.CustomPromise();
    2 === o &&
      ((o =
        UiModelResourcesManager_1.UiModelResourcesManager.GetWeaponResourcesPath(
          e,
        )),
      (e =
        UiModelResourcesManager_1.UiModelResourcesManager.LoadUiModelResources(
          o,
          () => {
            a.SetResult(!0);
          },
        )),
      this.AWt.push(e),
      await a.Promise);
  }
  ReleaseLoadGachaSequence() {
    for (const e of this.RWt)
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
    for (const o of this.AWt)
      UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(
        o,
      );
    this.UWt.forEach((e) => {
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0);
    }),
      this.UWt.clear();
  }
  IsRolePool(e) {
    return 1 === e || 4 === e || 2 === e || 6 === e;
  }
  GetGachaQuality(e) {
    let o = 0;
    switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
      case 1:
        o =
          ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(
            e,
          ).QualityId;
        break;
      case 2:
        o =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
            e,
          ).QualityId;
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Gacha",
            44,
            "抽卡获得物品的类型错误，必须是角色或武器",
            ["itemId", e],
          );
    }
    return o;
  }
  GetGachaRecordUrlPrefix() {
    var e =
        ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
      o = BaseConfigController_1.BaseConfigController.GetGachaUrl();
    return e && void 0 !== o.GachaGlobalRecord
      ? o.GachaGlobalRecord
      : o.GachaRecord;
  }
  GetGachaPoolUrlPrefix() {
    var e =
        ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
      o = BaseConfigController_1.BaseConfigController.GetGachaUrl();
    return e && void 0 !== o.GachaPoolGlobalDetail
      ? o.GachaPoolGlobalDetail
      : o.GachaPoolDetail;
  }
  GetServerArea() {
    return ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
      ? "global"
      : "cn";
  }
}
exports.GachaModel = GachaModel;
//# sourceMappingURL=GachaModel.js.map
