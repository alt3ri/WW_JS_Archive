"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobileDiffPatchProcedure = void 0);
const HotFixManager_1 = require("../../Ui/HotFix/HotFixManager"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../../Util/LauncherStorageLib"),
  VideoResUpdate_1 = require("../Update/VideoResUpdate"),
  BaseDiffPatchProcedure_1 = require("./BaseDiffPatchProcedure");
class MobileDiffPatchProcedure extends BaseDiffPatchProcedure_1.BaseDiffPatchProcedure {
  constructor(e, a) {
    super(e, a);
  }
  async PromptDownload(e, a) {
    return await a.PromptNetwork(e);
  }
  async UpdateResource(t, i, o) {
    if (!t) return super.UpdateResource(t, i, o);
    let c = !0;
    try {
      var n = await i.HasContentOnRemote();
      (c = await i.DownloadManifests(n)), (c = await i.ResolveManifests());
      let a = [],
        r = [];
      if (o)
        if (await VideoResUpdate_1.VideoResUpdate.UpdateVideoSource()) {
          var [s, u, d, _] = VideoResUpdate_1.VideoResUpdate.GetRequireFiles(),
            [L] = i.CalcNeedSizeInfo(),
            h = L + d - _,
            f =
              (VideoResUpdate_1.VideoResUpdate.SetVideoResSize(1, h),
              VideoResUpdate_1.VideoResUpdate.SetVideoResSize(2, L),
              LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
                LauncherStorageLib_1.ELauncherStorageDeviceKey
                  .UserSelectedVideoUpdate,
                0,
              ));
          let e = f;
          VideoResUpdate_1.VideoResUpdate.GetIsGrayBoxHit()
            ? VideoResUpdate_1.VideoResUpdate.GetIsNewUser()
              ? ((HotFixManager_1.HotFixManager.DownLoadViewChosePromise =
                  new Promise((e) => {
                    HotFixManager_1.HotFixManager.DownLoadViewChoseDoneCallBack =
                      e;
                  })),
                this.ViewMgr.SetDownLoadActive(!0),
                await HotFixManager_1.HotFixManager.DownLoadViewChosePromise,
                (e = HotFixManager_1.HotFixManager.DownLoadType),
                LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
                  LauncherStorageLib_1.ELauncherStorageDeviceKey
                    .IsNewUserSelected,
                  1,
                ))
              : 0 === f && (e = 1)
            : (e = 1),
            e !== f &&
              LauncherStorageLib_1.LauncherStorageLib.SetDeviceSaved(
                LauncherStorageLib_1.ELauncherStorageDeviceKey
                  .UserSelectedVideoUpdate,
                e,
              ),
            1 === e && ((a = s), (r = u));
        }
      var [, g, p] = await i.AnalyzeRequireFiles(a, r);
      let e = 0n;
      for (const P of g) e += P.Size;
      if (!(c = await this.PromptDownload(e, i))) return !1;
      await i.DownloadFiles(g, p, t);
      var [w, U, l] = await i.ExecutePatch();
      e = 0n;
      for (const b of U) e += b.Size;
      if (!(c = await this.PromptDownload(e, i))) return !1;
      await i.DownloadMissFiles(U, l, w, t),
        await i.MoveSameFiles(),
        i.ProcessRecord();
    } catch (e) {
      (c = !1),
        e instanceof Error
          ? LauncherLog_1.LauncherLog.ErrorWithStack("下载资源出异常", e)
          : LauncherLog_1.LauncherLog.Error("下载资源出异常", ["error", e]);
    }
    return c;
  }
}
exports.MobileDiffPatchProcedure = MobileDiffPatchProcedure;
//# sourceMappingURL=MobileDiffPatchProcedure.js.map
