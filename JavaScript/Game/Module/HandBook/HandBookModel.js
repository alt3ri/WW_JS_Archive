"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookModel = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
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
      (this.kZt = new Map()),
      (this.FZt = []),
      (this.VZt = new Map()),
      (this.HZt = new Map());
  }
  UpdateHandBookActiveStateMap(e, o) {
    var e = this.GetClientHandBookType(e, o.qRs),
      t = o.Ekn,
      r = TimeUtil_1.TimeUtil.DateFormat4(
        new Date(o.BRs * TimeUtil_1.TimeUtil.InverseMillisecond),
      ),
      a = o.cfs,
      n = o.O3n,
      i = new HandBookDefine_1.HandBookEntry(t, r, n, a),
      s = this.kZt.get(e);
    if (s) {
      var l = s.length;
      let t = !1;
      for (let e = 0; e < l; e++) {
        const o = s[e];
        if (o.Id === i.Id) {
          (o.CreateTime = i.CreateTime),
            (o.IsRead = i.IsRead),
            (o.Num = i.Num),
            (t = !0);
          break;
        }
      }
      t || s.push(i);
    } else {
      t = [];
      t.push(i), this.kZt.set(e, t);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookDataUpdate,
      e,
      o.Ekn,
    );
  }
  ClearHandBookActiveStateMap() {
    this.kZt.clear();
  }
  InitHandBookActiveStateMap(t, o) {
    var r = this.GetClientHandBookEntryList(o),
      a = [],
      n = r.length;
    if (t !== Protocol_1.Aki.Protocol.Hks.Proto_Photograph) {
      var i = this.GetClientHandBookType(t);
      for (let e = 0; e < n; e++) {
        var s = r[e];
        HandBookController_1.HandBookController.CheckConfigIsLegal(i, s.Id) &&
          a.push(s);
      }
      this.kZt.set(i, a);
    } else {
      this.ZBn();
      for (let e = 0; e < n; e++) {
        var l = r[e],
          _ = this.GetClientHandBookType(t, o[e].qRs);
        HandBookController_1.HandBookController.CheckConfigIsLegal(_, l.Id) &&
          this.kZt.get(_).push(l);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnHandBookDataInit);
  }
  ZBn() {
    this.kZt.set(9, []), this.kZt.set(8, []), this.kZt.set(7, []);
  }
  InitHandBookRedDotList(t) {
    this.FZt = [];
    var o = t.length;
    for (let e = 0; e < o; e++) {
      var r = this.GetClientHandBookType(t[e]);
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
      this.FZt.push(r);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnHandBookRedDotUpdate,
    );
  }
  UpdateRedDot(t, o) {
    var r = this.kZt.get(t);
    if (r) {
      var a = r.length;
      for (let e = 0; e < a; e++) {
        var n = r[e];
        if (n.Id === o) {
          (n.IsRead = !0),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnHandBookRead,
              t,
              n.Id,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPhantomReadRedDotUpdate,
            ),
            5 === t &&
              ((n =
                ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigById(
                  o,
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
  IsShowRedDot(t) {
    var o = this.FZt.length;
    for (let e = 0; e < o; e++) if (t === this.FZt[e]) return !0;
    return !1;
  }
  GetCollectCount(e) {
    e = this.kZt.get(e);
    return e ? e.length : 0;
  }
  GetClientHandBookEntryList(t) {
    var o = [],
      r = t.length;
    for (let e = 0; e < r; e++) {
      var a = t[e],
        n = a.Ekn,
        i = TimeUtil_1.TimeUtil.DateFormat4(
          new Date(a.BRs * TimeUtil_1.TimeUtil.InverseMillisecond),
        ),
        s = a.cfs,
        a = a.O3n,
        n = new HandBookDefine_1.HandBookEntry(n, i, a, s);
      o.push(n);
    }
    return o;
  }
  GetHandBookInfo(e, t) {
    var o = this.kZt.get(e);
    if (o) {
      var r = o.length;
      for (let e = 0; e < r; e++) {
        var a = o[e];
        if (a.Id === t) return a;
      }
    }
  }
  GetHandBookInfoList(e) {
    e = this.kZt.get(e);
    if (e) return e;
  }
  GetClientHandBookType(e, t) {
    let o = void 0;
    switch (e) {
      case Protocol_1.Aki.Protocol.Hks.Proto_Monster:
        o = 0;
        break;
      case Protocol_1.Aki.Protocol.Hks.Proto_VocalCorpse:
        o = 1;
        break;
      case Protocol_1.Aki.Protocol.Hks.Proto_ViewPoint:
        o = 2;
        break;
      case Protocol_1.Aki.Protocol.Hks.Proto_Weapon:
        o = 3;
        break;
      case Protocol_1.Aki.Protocol.Hks.Proto_Animal:
        o = 4;
        break;
      case Protocol_1.Aki.Protocol.Hks.pbs:
        o = 5;
        break;
      case Protocol_1.Aki.Protocol.Hks.Proto_Chip:
        o = 6;
        break;
      case Protocol_1.Aki.Protocol.Hks.Proto_Photograph:
        if (t)
          switch (t) {
            case Protocol_1.Aki.Protocol.qRs.Proto_PhotographSub:
              o = 7;
              break;
            case Protocol_1.Aki.Protocol.qRs.OMs:
              o = 9;
              break;
            case Protocol_1.Aki.Protocol.qRs.tRs:
              o = 8;
              break;
            default:
              o = 7;
          }
        else o = 7;
    }
    return o;
  }
  GetServerHandBookType(e) {
    let t = void 0;
    switch (e) {
      case 0:
        t = Protocol_1.Aki.Protocol.Hks.Proto_Monster;
        break;
      case 1:
        t = Protocol_1.Aki.Protocol.Hks.Proto_VocalCorpse;
        break;
      case 2:
        t = Protocol_1.Aki.Protocol.Hks.Proto_ViewPoint;
        break;
      case 3:
        t = Protocol_1.Aki.Protocol.Hks.Proto_Weapon;
        break;
      case 4:
        t = Protocol_1.Aki.Protocol.Hks.Proto_Animal;
        break;
      case 5:
        t = Protocol_1.Aki.Protocol.Hks.pbs;
        break;
      case 6:
        t = Protocol_1.Aki.Protocol.Hks.Proto_Chip;
        break;
      default:
        t = Protocol_1.Aki.Protocol.Hks.Proto_Photograph;
    }
    return t;
  }
  GetServerHandBookTypeList(t) {
    var o = t.length,
      r = [];
    for (let e = 0; e < o; e++) {
      var a = this.GetServerHandBookType(t[e]);
      r.push(a);
    }
    return r;
  }
  GetConfigListIdByType(e) {
    var t = this.VZt.get(e);
    if (t) return t;
    let o = void 0;
    switch (e) {
      case 0:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList();
        break;
      case 1:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig();
        break;
      case 2:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig();
        break;
      case 3:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList();
        break;
      case 4:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList();
        break;
      case 5:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList();
        break;
      case 6:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig();
        break;
      default:
        o =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig();
    }
    var r = o.length,
      a = [];
    for (let e = 0; e < r; e++) {
      var n = o[e];
      a.push(n.Id);
    }
    return this.VZt.set(e, a), a;
  }
  GetAnimalConfigByMeshId(e) {
    if (0 === this.HZt.size) {
      var t =
          ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList(),
        o = t.length;
      for (let e = 0; e < o; e++) {
        var r = t[e];
        this.HZt.set(r.MeshId, r);
      }
    }
    return this.HZt.get(e);
  }
}
exports.HandBookModel = HandBookModel;
//# sourceMappingURL=HandBookModel.js.map
