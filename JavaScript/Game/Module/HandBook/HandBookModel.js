"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  HandBookController_1 = require("./HandBookController"),
  HandBookDefine_1 = require("./HandBookDefine");
class HandBookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.kei = new Map()),
      (this.Fei = []),
      (this.Vei = new Map()),
      (this.Hei = new Map());
  }
  UpdateHandBookActiveStateMap(e, t) {
    var e = this.GetClientHandBookType(e, t.hws),
      o = t.s5n,
      r = TimeUtil_1.TimeUtil.DateFormat4(
        new Date(t.aws * TimeUtil_1.TimeUtil.InverseMillisecond),
      ),
      a = t.qSs,
      n = t.D8n,
      i = new HandBookDefine_1.HandBookEntry(o, r, n, a),
      s = this.kei.get(e);
    if (s) {
      var l = s.length;
      let o = !1;
      for (let e = 0; e < l; e++) {
        const t = s[e];
        if (t.Id === i.Id) {
          (t.CreateTime = i.CreateTime),
            (t.IsRead = i.IsRead),
            (t.Num = i.Num),
            (o = !0);
          break;
        }
      }
      o || s.push(i);
    } else {
      o = [];
      o.push(i), this.kei.set(e, o);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookDataUpdate,
      e,
      t.s5n,
    );
  }
  ClearHandBookActiveStateMap() {
    this.kei.clear();
  }
  InitHandBookActiveStateMap(o, t) {
    var r = this.GetClientHandBookEntryList(t),
      a = [],
      n = r.length;
    if (o !== Protocol_1.Aki.Protocol.N6s.Proto_Photograph) {
      var i = this.GetClientHandBookType(o);
      for (let e = 0; e < n; e++) {
        var s = r[e];
        HandBookController_1.HandBookController.CheckConfigIsLegal(i, s.Id) &&
          a.push(s);
      }
      this.kei.set(i, a);
    } else {
      this.zGn();
      for (let e = 0; e < n; e++) {
        var l = r[e],
          _ = this.GetClientHandBookType(o, t[e].hws);
        HandBookController_1.HandBookController.CheckConfigIsLegal(_, l.Id) &&
          this.kei.get(_).push(l);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataInit);
  }
  zGn() {
    this.kei.set(9, []), this.kei.set(8, []), this.kei.set(7, []);
  }
  InitHandBookRedDotList(o) {
    this.Fei = [];
    var t = o.length;
    for (let e = 0; e < t; e++) {
      var r = this.GetClientHandBookType(o[e]);
      if (5 === r) {
        var a =
            ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookTypeConfigList(),
          n = a.length;
        for (let e = 0; e < n; e++) {
          var i = a[e];
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnItemReadRedDotUpdate,
            i.Id,
          );
        }
      }
      this.Fei.push(r);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookRedDotUpdate,
    );
  }
  UpdateRedDot(o, t) {
    var r = this.kei.get(o);
    if (r) {
      var a = r.length;
      for (let e = 0; e < a; e++) {
        var n = r[e];
        if (n.Id === t) {
          (n.IsRead = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnHandBookRead,
              o,
              n.Id,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPhantomReadRedDotUpdate,
            ),
            5 === o &&
              ((n =
                ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
                  t,
                )),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnItemReadRedDotUpdate,
                n.Type,
              ));
          break;
        }
      }
    }
  }
  IsShowRedDot(o) {
    var t = this.Fei.length;
    for (let e = 0; e < t; e++) if (o === this.Fei[e]) return !0;
    return !1;
  }
  GetCollectCount(e) {
    e = this.kei.get(e);
    return e ? e.length : 0;
  }
  GetClientHandBookEntryList(o) {
    var t = [],
      r = o.length;
    for (let e = 0; e < r; e++) {
      var a = o[e],
        n = a.s5n,
        i = TimeUtil_1.TimeUtil.DateFormat4(
          new Date(a.aws * TimeUtil_1.TimeUtil.InverseMillisecond),
        ),
        s = a.qSs,
        a = a.D8n,
        n = new HandBookDefine_1.HandBookEntry(n, i, a, s);
      t.push(n);
    }
    return t;
  }
  GetHandBookInfo(e, o) {
    var t = this.kei.get(e);
    if (t) {
      var r = t.length;
      for (let e = 0; e < r; e++) {
        var a = t[e];
        if (a.Id === o) return a;
      }
    }
  }
  GetHandBookInfoList(e) {
    e = this.kei.get(e);
    if (e) return e;
  }
  GetClientHandBookType(e, o) {
    let t = void 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.N6s.Proto_Monster:
        t = 0;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_VocalCorpse:
        t = 1;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_ViewPoint:
        t = 2;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Weapon:
        t = 3;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Animal:
        t = 4;
        break;
      case Protocol_1.Aki.Protocol.N6s.mOs:
        t = 5;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Chip:
        t = 6;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Photograph:
        if (o)
          switch (o) {
            case Protocol_1.Aki.Protocol.hws.Proto_PhotographSub:
              t = 7;
              break;
            case Protocol_1.Aki.Protocol.hws.aTs:
              t = 9;
              break;
            case Protocol_1.Aki.Protocol.hws.RUs:
              t = 8;
              break;
            default:
              t = 7;
          }
        else t = 7;
        break;
      case Protocol_1.Aki.Protocol.N6s.Proto_Noun:
        t = 11;
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "HandBook",
            5,
            "GetClientHandBookType 错误，不在目标类型内",
            ["type", e],
          ),
          (t = 0);
    }
    return t;
  }
  GetServerHandBookType(e) {
    let o = void 0;
    switch (e) {
      case 0:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Monster;
        break;
      case 1:
        o = Protocol_1.Aki.Protocol.N6s.Proto_VocalCorpse;
        break;
      case 2:
        o = Protocol_1.Aki.Protocol.N6s.Proto_ViewPoint;
        break;
      case 3:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Weapon;
        break;
      case 4:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Animal;
        break;
      case 5:
        o = Protocol_1.Aki.Protocol.N6s.mOs;
        break;
      case 6:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Chip;
        break;
      case 7:
      case 9:
      case 8:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Photograph;
        break;
      case 11:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Noun;
        break;
      default:
        o = Protocol_1.Aki.Protocol.N6s.Proto_Photograph;
    }
    return o;
  }
  GetServerHandBookTypeList(o) {
    var t = o.length,
      r = [];
    for (let e = 0; e < t; e++) {
      var a = this.GetServerHandBookType(o[e]);
      r.push(a);
    }
    return r;
  }
  GetConfigListIdByType(e) {
    var o = this.Vei.get(e);
    if (o) return o;
    let t = void 0;
    switch (e) {
      case 0:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList();
        break;
      case 1:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
        break;
      case 2:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig();
        break;
      case 3:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
        break;
      case 4:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
        break;
      case 5:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList();
        break;
      case 6:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig();
        break;
      case 7:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
        break;
      case 11:
        t = ConfigManager_1.ConfigManager.HandBookConfig.GetNounTypeConfigAll();
        break;
      default:
        t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
    }
    var r = t.length,
      a = [];
    for (let e = 0; e < r; e++) {
      var n = t[e];
      a.push(n.Id);
    }
    return this.Vei.set(e, a), a;
  }
  GetAnimalConfigByMeshId(e) {
    if (0 === this.Hei.size) {
      var o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList(),
        t = o.length;
      for (let e = 0; e < t; e++) {
        var r = o[e];
        this.Hei.set(r.MeshId, r);
      }
    }
    return this.Hei.get(e);
  }
}
exports.HandBookModel = HandBookModel;
//# sourceMappingURL=HandBookModel.js.map
