"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaModel =
    exports.GachaContentInfo =
    exports.GachaResult =
      void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiModelResourcesManager_1 = require("../UiComponent/UiModelResourcesManager");
const GachaController_1 = require("./GachaController");
const GachaDefine_1 = require("./GachaDefine");
const ProtoGachaInfo_1 = require("./ProtoGachaInfo");
class GachaResult {
  constructor() {
    (this.u5n = void 0),
      (this.p5n = []),
      (this.IsNew = !0),
      (this.v5n = []),
      (this.M5n = void 0);
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
      (this.Mjt = void 0),
      (this.Sjt = 0),
      (this.Ejt = void 0),
      (this.yjt = void 0),
      (this.Ijt = void 0),
      (this.Tjt = !0),
      (this.Ljt = ""),
      (this.Djt = void 0),
      (this.Rjt = []),
      (this.Ujt = new Map()),
      (this.Ajt = []);
  }
  static IsLimit(e) {
    return e.BeginTime !== 0 || e.EndTime !== 0;
  }
  static IsValid(e) {
    let o;
    return (
      !GachaModel.IsLimit(e) ||
      ((o = TimeUtil_1.TimeUtil.GetServerTime()) >= e.BeginTime &&
        (o < e.EndTime || e.EndTime === 0))
    );
  }
  GetCachedGachaInfo() {
    return this.Djt.shift();
  }
  CacheGachaInfo(e) {
    this.Djt.push(e);
  }
  set RecordId(e) {
    this.Ljt = e;
  }
  get RecordId() {
    return this.Ljt;
  }
  get CanCloseView() {
    return this.Tjt;
  }
  set CanCloseView(e) {
    this.Tjt = e;
  }
  get TodayResultCount() {
    return this.Sjt;
  }
  set TodayResultCount(e) {
    this.Sjt = e;
  }
  get GachaInfoArray() {
    return this.Mjt;
  }
  get CurGachaResult() {
    return this.Ejt;
  }
  set CurGachaResult(e) {
    this.Ejt = e;
    const o = new Map();
    for (const s of this.Ejt) {
      const r = s?.u5n?.G3n;
      const t = s?.u5n?.g5n;
      o.set(r, (o.get(r) ?? 0) + t);
    }
    for (const n of this.Ejt) {
      const a = n?.u5n?.G3n;
      let i = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(a);
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
    for (const o of this.Mjt) if (o.ResourcesId === e) return o;
  }
  OnInit() {
    return (this.Djt = []), !0;
  }
  OnClear() {
    return (
      (this.CanCloseView = !0),
      (this.Mjt = void 0),
      (this.Ejt = void 0),
      (this.yjt = void 0),
      (this.Ijt = void 0),
      (this.Djt.length = 0),
      !(this.Djt = void 0)
    );
  }
  InitGachaInfoMap(e) {
    this.Mjt = [];
    for (const o of e) this.Mjt.push(new ProtoGachaInfo_1.ProtoGachaInfo(o));
    this.Mjt.sort((e, o) => e.Sort - o.Sort);
  }
  CheckGachaValid(e) {
    return GachaModel.IsValid(e);
  }
  GetValidGachaList() {
    let e;
    const o = [];
    for (const r of ModelManager_1.ModelManager.GachaModel.GachaInfoArray)
      ModelManager_1.ModelManager.GachaModel.CheckGachaValid(r) &&
        (e =
          (e = r.UsePoolId) > 0 ? r.GetPoolInfo(e) : r.GetFirstValidPool()) &&
        o.push(new GachaDefine_1.GachaPoolData(r, e));
    return o;
  }
  CheckCountIsEnough(e, o) {
    return e.DailyLimitTimes > 0 && e.TodayTimes + o > e.DailyLimitTimes
      ? [!1, 69]
      : e.TotalLimitTimes > 0 && e.TotalTimes + o > e.TotalLimitTimes
        ? [!1, 129]
        : this.Sjt >= 0 && o > this.Sjt
          ? [!1, 130]
          : [!0, void 0];
  }
  IsTotalTimesZero(e) {
    return e.TotalLimitTimes > 0 && e.TotalTimes >= e.TotalLimitTimes;
  }
  GetGachaInfo(e) {
    for (const o of this.GachaInfoArray) if (o.Id === e) return o;
  }
  RecordGachaInfo(e) {
    return (
      !this.Ijt.has(e.Id) &&
      (this.Ijt.add(e.Id),
      this.yjt.push(e.Id),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord,
        this.yjt,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnOpenGachaChanged,
      ),
      !0)
    );
  }
  InitGachaPoolOpenRecord() {
    (this.yjt =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.GachaPoolOpenRecord,
      ) ?? []),
      (this.Ijt = new Set());
    for (const e of this.yjt) this.Ijt.add(e);
  }
  UpdateCount(e, o) {
    this.Sjt -= o;
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
          this.yjt,
        ]),
      this.GachaInfoArray)
    )
      for (const e of this.GachaInfoArray) if (!this.Ijt.has(e.Id)) return !0;
    return !1;
  }
  CheckNewGachaPoolById(e) {
    return !this.Ijt.has(e);
  }
  async PreloadGachaSequence(e) {
    const o = [];
    for (const r of e) o.push(this.PreloadGachaSequenceOne(r));
    await Promise.all(o);
  }
  GetLoadedSequence(e) {
    return this.Ujt.get(e);
  }
  async PreloadGachaSequenceOne(e) {
    let o = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
    const r =
      ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(
        o.ShowSequence,
      );
    const t = new CustomPromise_1.CustomPromise();
    (o = ResourceSystem_1.ResourceSystem.LoadAsync(
      r.SequencePath,
      UE.LevelSequence,
      (e) => {
        this.Ujt.set(r.SequencePath, e),
          UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0),
          t.SetResult(!0);
      },
      102,
    )),
      this.Rjt.push(o),
      await t.Promise,
      (o = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e));
    const a = new CustomPromise_1.CustomPromise();
    o === 2 &&
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
      this.Ajt.push(e),
      await a.Promise);
  }
  ReleaseLoadGachaSequence() {
    for (const e of this.Rjt)
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
    for (const o of this.Ajt)
      UiModelResourcesManager_1.UiModelResourcesManager.CancelUiModelResourceLoad(
        o,
      );
    this.Ujt.forEach((e) => {
      UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, !0);
    }),
      this.Ujt.clear();
  }
  IsRolePool(e) {
    return e === 1 || e === 4 || e === 2 || e === 6;
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
    const e =
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk();
    const o = BaseConfigController_1.BaseConfigController.GetGachaUrl();
    return e && void 0 !== o.GachaGlobalRecord
      ? o.GachaGlobalRecord
      : o.GachaRecord;
  }
  GetGachaPoolUrlPrefix() {
    const e =
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk();
    const o = BaseConfigController_1.BaseConfigController.GetGachaUrl();
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
// # sourceMappingURL=GachaModel.js.map
