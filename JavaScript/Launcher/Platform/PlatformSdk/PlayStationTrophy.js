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
    (this.Vwa = void 0),
      (this.lba = void 0),
      (this._ba = 0),
      (this.uba = 0),
      (this.cba = void 0),
      (this.mba = new Map()),
      (this.i5a = []),
      (this.r5a = !1);
  }
  async Init(t, e) {
    (this.Vwa = t), (this.lba = e), await this.dba();
  }
  async dba() {
    var t = UE.KuroStaticPS5Library.GetCacheMapElement("TrophyContextId"),
      t =
        ("" !== t && 0 !== (t = Number(t)) && (await this.Cba(t)),
        UE.KuroStaticPS5Library.GetCacheMapElement("TrophyHandleId")),
      t =
        ("" !== t && 0 !== (t = Number(t)) && (await this.gba(t)),
        (this._ba = await this.fba()),
        UE.KuroStaticPS5Library.AddCacheMapElement(
          "TrophyContextId",
          this._ba.toString(),
        ),
        (this.uba = await this.pba()),
        UE.KuroStaticPS5Library.AddCacheMapElement(
          "TrophyHandleId",
          this.uba.toString(),
        ),
        await this.vba(this._ba, this.uba));
    0 !== t &&
      LauncherLog_1.LauncherLog.Error("InitTrophy failed", ["registResult", t]);
  }
  async GetSdkTrophyInfo(e = 0, r = 0) {
    return (
      this.cba ||
      (0 === this._ba || 0 === this.uba
        ? []
        : ((this.cba = []),
          this.mba.clear(),
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
                    this.mba.set(o.trophyId, e),
                    LauncherLog_1.LauncherLog.Debug("GetSdkTrophyInfo", [
                      "trophy.name",
                      o.name,
                    ]);
                }
              (this.cba = r),
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
              this._ba,
              this.uba,
              (0, puerts_1.toManualReleaseDelegate)(h),
            );
          })))
    );
  }
  async UnlockSdkTrophy(e) {
    var t = this.mba.get(e);
    return (
      !(!t || !t.Unlocked) ||
      new Promise((t) => {
        this.i5a.push({ TrophyId: e, Task: t }), this.r5a || this.o5a();
      })
    );
  }
  o5a() {
    if (0 === this.i5a.length) this.r5a = !1;
    else {
      this.r5a = !0;
      const e = this.i5a.shift(),
        r = (t) => {
          (0, puerts_1.releaseManualReleaseDelegate)(r),
            LauncherLog_1.LauncherLog.Debug(
              "UnlockSdkTrophy",
              ["result", t],
              ["trophyId", e.TrophyId],
            ),
            e.Task(0 === t),
            this.o5a();
        };
      UE.KuroStaticPS5Library.UnlockTrophyWithContextIdAndHandleIdAsync(
        this.Vwa.GetContext(),
        this.Vwa.GetHandle(),
        e.TrophyId,
        (0, puerts_1.toManualReleaseDelegate)(r),
      );
    }
  }
  async UpdateSdkTrophyProgress(t, s) {
    var e = this.mba.get(t);
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
          this.Vwa.GetContext(),
          this.Vwa.GetHandle(),
          t,
          s,
          (0, puerts_1.toManualReleaseDelegate)(r),
        );
      })
    );
  }
  async vba(t, s) {
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
  async fba() {
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
        this.lba.GetUserId(),
        DEFAULTLABEL,
        "0",
        (0, puerts_1.toManualReleaseDelegate)(s),
      );
    });
  }
  async pba() {
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
  async gba(t) {
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
  async Cba(t) {
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
    this.gba(this.uba), this.Cba(this._ba);
  }
}
exports.PlayStationTrophy = PlayStationTrophy;
//# sourceMappingURL=PlayStationTrophy.js.map
