"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsFinalMatchInfo =
    exports.RacingBetsFourDangoMatchInfo =
    exports.RacingBetsSixDangoMatchInfo =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class RacingBetsSixDangoMatchInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.tFe = void 0),
      (this._8c = [2, 3, 4, 5, 6, 7]),
      (this.ifa = () => {
        return new RacingBetsDangoItemWithName();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIVerticalLayout],
      [9, UE.UIItem],
    ];
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(8),
      this.ifa,
    );
  }
  SetData(e) {
    var t =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(
          e,
        ),
      s = [];
    if (t) {
      var i = t?.GetPromoteDangoList(),
        a = new Set(i),
        r = t.IsGroupMatchFinished();
      for (const n of t.GetInGameDangoList()) {
        var o = {
          GroupMatchId: e,
          DangoId: n,
          IsMatchFinished: r,
          IsPromote: a.has(n),
          IsBasicGroupMatch: t.IsBasicGroupMatch(),
        };
        s.push(o);
      }
    }
    var h = this._8c.length;
    for (let t = s.length; t < h; ++t)
      s.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: !1,
        IsPromote: !1,
        IsBasicGroupMatch: !1,
      });
    this.RefreshRoleLayout(s), this.RefreshLine(s);
    i = t.IsGroupMatchFinished() ?? !1;
    this.GetSprite(0).SetUIActive(!i), this.GetTexture(1).SetUIActive(i);
  }
  RefreshRoleLayout(t) {
    this.tFe?.RefreshByData(t);
  }
  RefreshLine(e) {
    for (let t = 0; t < this._8c.length; ++t) {
      var s = e[t],
        i = this._8c[t];
      this.GetItem(i).SetUIActive(s.IsMatchFinished && s.IsPromote);
    }
  }
}
exports.RacingBetsSixDangoMatchInfo = RacingBetsSixDangoMatchInfo;
class RacingBetsFourDangoMatchInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.tFe = void 0),
      (this._8c = [2, 3, 4, 5]),
      (this.ifa = () => {
        return new RacingBetsDangoItemWithName();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIVerticalLayout],
      [7, UE.UIItem],
    ];
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(6),
      this.ifa,
    );
  }
  SetData(e) {
    var t =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(
          e,
        ),
      s = [];
    if (t) {
      var i = t?.GetPromoteDangoList(),
        a = new Set(i),
        r = t.IsGroupMatchFinished();
      for (const n of t.GetInGameDangoList()) {
        var o = {
          GroupMatchId: e,
          DangoId: n,
          IsMatchFinished: r,
          IsPromote: a.has(n),
          IsBasicGroupMatch: t.IsBasicGroupMatch(),
        };
        s.push(o);
      }
    }
    var h = this._8c.length;
    for (let t = s.length; t < h; ++t)
      s.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: !1,
        IsPromote: !1,
        IsBasicGroupMatch: !1,
      });
    this.RefreshRoleLayout(s), this.RefreshLine(s);
    i = t.IsGroupMatchFinished() ?? !1;
    this.GetSprite(0).SetUIActive(!i), this.GetTexture(1).SetUIActive(i);
  }
  RefreshRoleLayout(t) {
    this.tFe?.RefreshByData(t);
  }
  RefreshLine(e) {
    for (let t = 0; t < this._8c.length; ++t) {
      var s = e[t],
        i = this._8c[t];
      this.GetItem(i).SetUIActive(s.IsMatchFinished && s.IsPromote);
    }
  }
}
exports.RacingBetsFourDangoMatchInfo = RacingBetsFourDangoMatchInfo;
class RacingBetsFinalMatchInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.II1 = void 0),
      (this.TI1 = void 0),
      (this.cR1 = 2),
      (this.bI1 = [5, 6]),
      (this.RI1 = [11, 12]),
      (this.ifa = () => {
        return new RacingBetsDangoItemWithName();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UITexture],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIVerticalLayout],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UITexture],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIVerticalLayout],
      [14, UE.UIItem],
    ];
  }
  OnStart() {
    (this.II1 = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(7),
      this.ifa,
    )),
      (this.TI1 = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(13),
        this.ifa,
      ));
  }
  SetData(e) {
    var s =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(
          e,
        ),
      i = [],
      a = [],
      r = s?.IsGroupMatchFinished() ?? !1;
    if (s) {
      var o = this.GetTexture(1);
      let t = 0;
      r &&
        ((t = s.GetPromoteDangoList()[0]),
        (c =
          ConfigManager_1.ConfigManager.DangoConfig?.GetDangoById(t)?.Icon ??
          ""),
        this.SetTextureShowUntilLoaded(c, o));
      var h = [];
      for (const U of s.GetInGameDangoList()) {
        var n = {
          GroupMatchId: e,
          DangoId: U,
          IsMatchFinished: r,
          IsPromote: U === t,
          IsBasicGroupMatch: s.IsBasicGroupMatch(),
        };
        h.push(n);
      }
      var c = h.length;
      c <= this.cR1
        ? i.push(...h)
        : ((o = Math.floor(c / this.cR1)),
          i.push(...h.slice(0, o)),
          a.push(...h.slice(o, c)));
    }
    var g = this.bI1.length,
      u = this.RI1.length;
    for (let t = i.length; t < g; ++t)
      i.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: !1,
        IsPromote: !1,
        IsBasicGroupMatch: !1,
      });
    for (let t = a.length; t < u; ++t)
      a.push({
        GroupMatchId: e,
        DangoId: 0,
        IsMatchFinished: !1,
        IsPromote: !1,
        IsBasicGroupMatch: !1,
      });
    this.RefreshRoleLayout(i, this.II1),
      this.RefreshRoleLayout(a, this.TI1),
      this.RefreshLine(i, this.bI1),
      this.RefreshLine(a, this.RI1),
      this.GetItem(0).SetUIActive(r),
      this.GetSprite(2).SetUIActive(!r),
      this.GetTexture(4).SetUIActive(r),
      this.GetTexture(10).SetUIActive(r);
  }
  RefreshRoleLayout(t, e) {
    e?.RefreshByData(t);
  }
  RefreshLine(e, s) {
    for (let t = 0; t < s.length; ++t) {
      var i = e[t],
        a = s[t];
      this.GetItem(a).SetUIActive(i.IsMatchFinished && i.IsPromote);
    }
  }
}
exports.RacingBetsFinalMatchInfo = RacingBetsFinalMatchInfo;
class RacingBetsDangoItemWithName extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.SequencePlayer = void 0);
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  Refresh(t, e, s) {
    this.RefreshItem(t);
  }
  RefreshItem(e) {
    var t = e.DangoId,
      s = 0 !== t,
      i =
        (this.GetSprite(2).SetUIActive(!s),
        this.GetText(1).SetUIActive(s && e.IsBasicGroupMatch),
        e.IsMatchFinished && !e.IsPromote);
    if (
      (this.GetItem(7).SetUIActive(s && i),
      this.GetItem(6).SetUIActive(s && !i),
      s)
    ) {
      i = ConfigManager_1.ConfigManager.DangoConfig.GetDangoById(t);
      if (i) {
        var s = this.GetTexture(0),
          a = this.GetTexture(5),
          s =
            (this.SetTextureShowUntilLoaded(i.IconDamage, s),
            this.SetTextureShowUntilLoaded(i.IconDamage, a),
            this.GetTexture(3)),
          a = (this.SetTextureShowUntilLoaded(i.IconAttack, s), i.Name);
        this.GetText(1).ShowTextNew(a);
        let t = !1;
        s =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().GetCurLegMatchData();
        (t =
          s &&
          ((i = s.GetLegMatchState()),
          s.ParentGroupMatchData.Id === e.GroupMatchId) &&
          4 !== i &&
          0 !== i
            ? !0
            : t)
          ? this.SequencePlayer.PlayLevelSequenceByName("Hold")
          : this.SequencePlayer.PlayLevelSequenceByName("Reset");
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RacingBets",
            78,
            "RacingBetsDangoItemWithName RefreshItem dangoConfig is null ",
            ["dangoId", t],
          );
    } else this.SequencePlayer.StopPlayingSequence();
  }
}
//# sourceMappingURL=RacingBetsMatchInfoItem.js.map
