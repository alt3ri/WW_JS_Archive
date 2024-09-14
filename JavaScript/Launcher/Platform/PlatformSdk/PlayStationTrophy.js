"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayStationTrophy = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  DEFAULTLABEL = 0,
  PROGRESSTYPEPROGRESS = 1,
  PROGRESSTYPEUNLOCK = 0;
class PlayStationTrophy {
  constructor() {
    (this.Lwa = void 0),
      (this.KBa = void 0),
      (this.$Ba = 0),
      (this.XBa = 0),
      (this.YBa = void 0),
      (this.zBa = new Map()),
      (this.NFa = []),
      (this.FFa = !1);
  }
  async Init(t, e) {
    (this.Lwa = t), (this.KBa = e), await this.JBa();
  }
  async JBa() {
    var t = UE.KuroStaticPS5Library.GetCacheMapElement("TrophyContextId"),
      t =
        ("" !== t && 0 !== (t = Number(t)) && (await this.ZBa(t)),
        UE.KuroStaticPS5Library.GetCacheMapElement("TrophyHandleId")),
      t =
        ("" !== t && 0 !== (t = Number(t)) && (await this.eba(t)),
        (this.$Ba = await this.tba()),
        UE.KuroStaticPS5Library.AddCacheMapElement(
          "TrophyContextId",
          this.$Ba.toString(),
        ),
        (this.XBa = await this.iba()),
        UE.KuroStaticPS5Library.AddCacheMapElement(
          "TrophyHandleId",
          this.XBa.toString(),
        ),
        await this.rba(this.$Ba, this.XBa));
    0 !== t &&
      LauncherLog_1.LauncherLog.Error("InitTrophy failed", ["registResult", t]);
  }
  async GetSdkTrophyInfo(e = 0, r = 0) {
    return (
      this.YBa ||
      (0 === this.$Ba || 0 === this.XBa
        ? []
        : ((this.YBa = []),
          this.zBa.clear(),
          new Promise((t) => {
            const h = (e) => {
              (0, puerts_1.releaseManualReleaseDelegate)(h);
              var r = [],
                s = e;
              if (s && s.trophyDetail)
                for (let t = 0; t < s.trophyDetail.Num(); t++) {
                  var o = s.trophyDetail.Get(t),
                    i = s.trophyData.Get(t);
                  const e = {
                    TrophyId: o.trophyId.toString(),
                    Progress: o.progress,
                    Unlocked: i.unlocked,
                    ProgressType: i.progressType,
                    DataProgress: i.progress,
                  };
                  r.push(e),
                    this.zBa.set(o.trophyId, e),
                    LauncherLog_1.LauncherLog.Debug("GetSdkTrophyInfo", [
                      "trophy.name",
                      o.name,
                    ]);
                }
              (this.YBa = r),
                LauncherLog_1.LauncherLog.Debug(
                  "GetSdkTrophyInfo",
                  ["result", r],
                  ["trophyList", s],
                  ["count", s.count],
                  ["offset", s.offset],
                ),
                t(r);
            };
            UE.KuroStaticPS5Library.GetTrophyListWithContextIdAndHandleIdAsync(
              (0, puerts_1.$ref)(e),
              r,
              this.$Ba,
              this.XBa,
              (0, puerts_1.toManualReleaseDelegate)(h),
            );
          })))
    );
  }
  async UnlockSdkTrophy(e) {
    var t = this.zBa.get(e);
    return (
      !(!t || !t.Unlocked) ||
      new Promise((t) => {
        this.NFa.push({ TrophyId: e, Task: t }), this.FFa || this.VFa();
      })
    );
  }
  VFa() {
    if (0 === this.NFa.length) this.FFa = !1;
    else {
      this.FFa = !0;
      const e = this.NFa.shift(),
        r = (t) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r),
            LauncherLog_1.LauncherLog.Debug(
              "UnlockSdkTrophy",
              ["result", t],
              ["trophyId", e.TrophyId],
            ),
            e.Task(0 === t),
            this.VFa();
        };
      UE.KuroStaticPS5Library.UnlockTrophyWithContextIdAndHandleIdAsync(
        this.Lwa.GetContext(),
        this.Lwa.GetHandle(),
        e.TrophyId,
        (0, puerts_1.toManualReleaseDelegate)(r),
      );
    }
  }
  async UpdateSdkTrophyProgress(t, s) {
    var e = this.zBa.get(t);
    return (
      !(!e || e.ProgressType !== PROGRESSTYPEUNLOCK) ||
      !(
        !e ||
        e.ProgressType !== PROGRESSTYPEPROGRESS ||
        Number(e.Progress) !== s
      ) ||
      new Promise((e) => {
        const r = (t) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r),
            LauncherLog_1.LauncherLog.Debug("UpdateSdkTrophyProgress", [
              "result",
              t,
            ]),
            e(0 === t);
        };
        UE.KuroStaticPS5Library.UpdateTrophyProgressWithContextIdAndHandleIdAsync(
          this.Lwa.GetContext(),
          this.Lwa.GetHandle(),
          t,
          s,
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
      })
    );
  }
  async rba(t, s) {
    return new Promise((e) => {
      const r = (t) => {
        (0, puerts_1.releaseManualReleaseDelegate)(r),
          0 === t
            ? e(t)
            : (LauncherLog_1.LauncherLog.Error(
                "RegistTrophyContextAsync failed",
                ["ret", t],
              ),
              e(-1));
      };
      LauncherLog_1.LauncherLog.Debug(
        "RegistTrophyContextAsync",
        ["contextId", t],
        ["handleId", s],
      ),
        UE.KuroStaticPS5Library.RegisterTrophyContextAsync(
          (0, puerts_1.$ref)(t),
          (0, puerts_1.$ref)(s),
          "0",
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
    });
  }
  async tba() {
    return new Promise((r) => {
      const s = (t, e) => {
        (0, puerts_1.releaseManualReleaseDelegate)(s),
          0 === t
            ? r(e)
            : (LauncherLog_1.LauncherLog.Error(
                "CreateTrophyContextAsync failed",
                ["ret", t],
                ["result", e],
              ),
              r(-1));
      };
      UE.KuroStaticPS5Library.CreateTrophyContextAsync(
        this.KBa.GetUserId(),
        DEFAULTLABEL,
        "0",
        (0, puerts_1.toManualReleaseDelegate)(s),
      );
    });
  }
  async iba() {
    return new Promise((r) => {
      const s = (t, e) => {
        (0, puerts_1.releaseManualReleaseDelegate)(s),
          0 === t
            ? r(e)
            : (LauncherLog_1.LauncherLog.Error(
                "CreateTrophyHandleAsync failed",
                ["ret", t],
                ["result", e],
              ),
              r(-1));
      };
      UE.KuroStaticPS5Library.CreateTrophyHandleAsync(
        (0, puerts_1.toManualReleaseDelegate)(s),
      );
    });
  }
  async eba(t) {
    return (
      0 === t ||
      new Promise((e) => {
        const r = (t) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r),
            0 === t
              ? e(!0)
              : (LauncherLog_1.LauncherLog.Error(
                  "DestroyTrophyHandleAsync failed",
                  ["ret", t],
                ),
                e(!1));
        };
        UE.KuroStaticPS5Library.DestroyTrophyHandleAsync(
          (0, puerts_1.$ref)(t),
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
      })
    );
  }
  async ZBa(t) {
    return (
      0 === t ||
      new Promise((e) => {
        const r = (t) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r),
            LauncherLog_1.LauncherLog.Debug("DestroyCurrentContext", [
              "data",
              t,
            ]),
            e(!0);
        };
        UE.KuroStaticPS5Library.DestroyTrophyContextAsync(
          (0, puerts_1.$ref)(t),
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
      })
    );
  }
  Clear() {
    this.eba(this.XBa), this.ZBa(this.$Ba);
  }
}
exports.PlayStationTrophy = PlayStationTrophy;
//# sourceMappingURL=PlayStationTrophy.js.map
