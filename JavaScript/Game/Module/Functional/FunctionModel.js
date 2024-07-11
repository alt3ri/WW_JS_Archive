"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const FunctionConditionByFunctionId_1 = require("../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ChannelController_1 = require("../Channel/ChannelController");
const FunctionInstance_1 = require("./View/FunctionInstance");
class FunctionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.PlayerAttributeNum = new Map()),
      (this.PlayerAttributeString = new Map()),
      (this.PlayerId = 0),
      (this.I9t = new Map()),
      (this.T9t = []),
      (this.L9t = new Map()),
      (this.D9t = () =>
        ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity()),
      (this.R9t = () =>
        ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()),
      (this.U9t = () =>
        ChannelController_1.ChannelController.CheckKuroStreetOpen());
  }
  OnInit() {
    return (
      this.L9t.set(10053, this.D9t),
      this.L9t.set(10028, this.R9t),
      this.L9t.set(10058, this.U9t),
      !0
    );
  }
  SetFunctionOpenInfo(e) {
    for (const t of e.gRs) {
      var n = new FunctionInstance_1.FunctionInstance(t.Mkn, t.Ekn);
      var n =
        (this.I9t.set(
          t.Ekn,
          new FunctionInstance_1.FunctionInstance(t.Mkn, t.Ekn),
        ),
        n.GetIsOpen());
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        t.Ekn,
        n,
      ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Functional",
            11,
            "功能数据添加",
            ["Id", t.Ekn],
            ["IsOpen", n],
          );
    }
  }
  UpdateFunctionOpenInfo(e) {
    for (const o of e.gRs) {
      var n;
      let t = this.I9t.get(o.Ekn);
      t
        ? (t.SetFlag(o.Mkn),
          (n =
            ((t = t.GetIsOpen()) &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Functional", 11, "功能数据更新", ["Id", o.Ekn]),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnFunctionOpenUpdate,
              o.Ekn,
              t,
            ),
            FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(
              o.Ekn,
            ))),
          t &&
            n.ShowUIType === 1 &&
            !ModelManager_1.ModelManager.SundryModel.IsBlockTips &&
            this.T9t.push(n),
          ModelManager_1.ModelManager.SundryModel.IsBlockTips &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Functional",
              11,
              "[UpdateFunctionOpenInfo]用了GM屏蔽功能开启界面显示",
            ))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Functional", 11, "当前刷新的功能id不在功能列表中", [
            "功能Id",
            o.Ekn,
          ]);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnFunctionOpenUpdateNotify,
    );
  }
  RefreshInfoManualState(e) {
    for (const o of e) {
      var n;
      const t = this.I9t.get(o);
      t
        ? ((n =
            FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(
              o,
            )),
          t.GetIsOpen() &&
            !ModelManager_1.ModelManager.SundryModel.IsBlockTips &&
            this.T9t.push(n),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Functional", 11, "手动开启功能开启界面成功", [
              "FunctionId",
              o,
            ]),
          ModelManager_1.ModelManager.SundryModel.IsBlockTips &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Functional",
              11,
              "[RefreshInfoManualState]用了GM屏蔽功能开启界面显示",
            ))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Functional", 11, "当前刷新的功能id不在功能列表中", [
            "功能Id",
            o,
          ]);
    }
  }
  PopNewOpenFunctionList() {
    let e;
    if (this.IsExistNewOpenFunction())
      return (e = this.T9t[0]), this.T9t.splice(0, 1), e;
  }
  IsExistNewOpenFunction() {
    return this.T9t.length > 0;
  }
  ClearNewOpenFunctionList() {
    this.T9t = [];
  }
  GetNewOpenFunctionIdList() {
    const e = [];
    for (const n of this.T9t) e.push(n.FunctionId);
    return e;
  }
  UpdatePlayerAttributeNumberInfo(e) {
    let n = 0;
    let t = void 0;
    e.has(Protocol_1.Aki.Protocol.U2s.r3n) && (n = this.GetPlayerLevel()),
      e.has(Protocol_1.Aki.Protocol.U2s.k3n) && (t = this.GetPlayerExp()),
      e.forEach((e, n) => {
        this.PlayerAttributeNum.set(n, e);
      });
    let o;
    let r;
    let i;
    var e = this.GetPlayerExp();
    const a = this.GetPlayerLevel();
    const s = ConfigManager_1.ConfigManager.FunctionConfig;
    n > 0 && n < a && void 0 !== t
      ? !(i = s.GetRangePlayerExpConfig(n, a)) ||
        i.length < 1 ||
        ((o = i[0]),
        (r = i[i.length - 1]),
        (o = o.PlayerExp),
        (i = this.A9t(i, t, e)),
        (r = r.PlayerExp),
        ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
          4,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerLevelChanged,
          n,
          a,
          e,
          t,
          i,
          r,
          o,
        ))
      : void 0 !== t &&
        t < e &&
        ((i = s.GetPlayerLevelConfig(a).PlayerExp),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerExpChanged,
          e,
          t,
          i,
        ));
  }
  A9t(e, n, t) {
    let o = 0;
    for (const r of e) o += r.PlayerExp;
    return o - n + t;
  }
  SetPlayerId(e) {
    this.PlayerId = e;
  }
  GetPlayerName() {
    return this.PlayerAttributeString.get(Protocol_1.Aki.Protocol.U2s.e4n);
  }
  SetPlayerName(e) {
    this.PlayerAttributeString.set(Protocol_1.Aki.Protocol.U2s.e4n, e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNameChange);
  }
  GetPlayerLevel() {
    return this.PlayerAttributeNum.get(Protocol_1.Aki.Protocol.U2s.r3n);
  }
  GetPlayerExp() {
    return this.PlayerAttributeNum.get(Protocol_1.Aki.Protocol.U2s.k3n);
  }
  GetPlayerCashCoin() {
    const e = this.PlayerAttributeString.get(
      Protocol_1.Aki.Protocol.U2s.Proto_CashCoin,
    );
    return e || "0";
  }
  GetWorldPermission() {
    return this.PlayerAttributeNum.get(
      Protocol_1.Aki.Protocol.U2s.Proto_WorldPermission,
    );
  }
  UpdatePlayerAttributeStringInfo(e) {
    e.forEach((e, n) => {
      this.PlayerAttributeString.set(n, e);
    });
  }
  IsOpen(e) {
    return e === 0 || (!!(e = this.I9t.get(e)) && e.GetIsOpen());
  }
  IsShow(e) {
    e = this.I9t.get(e);
    return !!e && e.GetIsShow();
  }
  GetFunctionInstance(e) {
    return this.I9t.get(e);
  }
  GetShowFunctionIdList() {
    const e = new Array();
    const n = ConfigCommon_1.ConfigCommon.ToList(
      ConfigManager_1.ConfigManager.FunctionConfig.GetAllFunctionList(),
    );
    n.sort((e, n) => e.SortIndex - n.SortIndex);
    for (const r of n) {
      var t;
      const o = this.I9t.get(r.FunctionId);
      o &&
        ((t = !(t = this.L9t.get(r.FunctionId)) || t()), o.GetIsOpen()) &&
        t &&
        e.push(r.FunctionId);
    }
    return e;
  }
  GetFunctionItemRedDotName(e) {
    switch (e) {
      case 10001:
        return "FunctionRole";
      case 10003:
        return "FunctionCalabash";
      case 10011:
        return "FunctionFriend";
      case 10009:
        return "FunctionGacha";
      case 10022:
        return "FunctionTutorial";
      case 10023:
        return "FunctionAdventure";
      case 10029:
        return "InfluenceReputation";
      case 10041:
        return "RoleHandBook";
      case 10013:
        return "Achievement";
      case 10040:
        return "BattlePass";
      case 10002:
        return "FunctionInventory";
      case 10053:
        return "ActivityEntrance";
      case 10010:
        return "FunctionPayShop";
      case 10004:
        return "FunctionViewQuestBtn";
      case 10028:
        return "CustomerService";
    }
  }
  RedDotFunctionPhantomCondition() {
    return !1;
  }
}
exports.FunctionModel = FunctionModel;
// # sourceMappingURL=FunctionModel.js.map
