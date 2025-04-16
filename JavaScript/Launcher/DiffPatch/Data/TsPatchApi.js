"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsPatchApi = exports.EKuroPatchResult = void 0);
const UE = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  LauncherSerialize_1 = require("../../Util/LauncherSerialize");
var EKuroPatchResult;
!(function (R) {
  (R[(R.HPATCH_SUCCESS = 0)] = "HPATCH_SUCCESS"),
    (R[(R.HPATCH_OPTIONS_ERROR = 1)] = "HPATCH_OPTIONS_ERROR"),
    (R[(R.HPATCH_OPENREAD_ERROR = 2)] = "HPATCH_OPENREAD_ERROR"),
    (R[(R.HPATCH_OPENWRITE_ERROR = 3)] = "HPATCH_OPENWRITE_ERROR"),
    (R[(R.HPATCH_FILEREAD_ERROR = 4)] = "HPATCH_FILEREAD_ERROR"),
    (R[(R.HPATCH_FILEWRITE_ERROR = 5)] = "HPATCH_FILEWRITE_ERROR"),
    (R[(R.HPATCH_FILEDATA_ERROR = 6)] = "HPATCH_FILEDATA_ERROR"),
    (R[(R.HPATCH_FILECLOSE_ERROR = 7)] = "HPATCH_FILECLOSE_ERROR"),
    (R[(R.HPATCH_MEM_ERROR = 8)] = "HPATCH_MEM_ERROR"),
    (R[(R.HPATCH_HDIFFINFO_ERROR = 9)] = "HPATCH_HDIFFINFO_ERROR"),
    (R[(R.HPATCH_COMPRESSTYPE_ERROR = 10)] = "HPATCH_COMPRESSTYPE_ERROR"),
    (R[(R.HPATCH_HPATCH_ERROR = 11)] = "HPATCH_HPATCH_ERROR"),
    (R[(R.HPATCH_PATHTYPE_ERROR = 12)] = "HPATCH_PATHTYPE_ERROR"),
    (R[(R.HPATCH_TEMPPATH_ERROR = 13)] = "HPATCH_TEMPPATH_ERROR"),
    (R[(R.HPATCH_DELETEPATH_ERROR = 14)] = "HPATCH_DELETEPATH_ERROR"),
    (R[(R.HPATCH_RENAMEPATH_ERROR = 15)] = "HPATCH_RENAMEPATH_ERROR"),
    (R[(R.HPATCH_SPATCH_ERROR = 16)] = "HPATCH_SPATCH_ERROR"),
    (R[(R.HPATCH_BSPATCH_ERROR = 17)] = "HPATCH_BSPATCH_ERROR"),
    (R[(R.HPATCH_VCPATCH_ERROR = 18)] = "HPATCH_VCPATCH_ERROR"),
    (R[(R.HPATCH_DECOMPRESSER_OPEN_ERROR = 20)] =
      "HPATCH_DECOMPRESSER_OPEN_ERROR"),
    (R[(R.HPATCH_DECOMPRESSER_CLOSE_ERROR = 21)] =
      "HPATCH_DECOMPRESSER_CLOSE_ERROR"),
    (R[(R.HPATCH_DECOMPRESSER_MEM_ERROR = 22)] =
      "HPATCH_DECOMPRESSER_MEM_ERROR"),
    (R[(R.HPATCH_DECOMPRESSER_DECOMPRESS_ERROR = 23)] =
      "HPATCH_DECOMPRESSER_DECOMPRESS_ERROR"),
    (R[(R.HPATCH_FILEWRITE_NO_SPACE_ERROR = 24)] =
      "HPATCH_FILEWRITE_NO_SPACE_ERROR"),
    (R[(R.DIRPATCH_DIRDIFFINFO_ERROR = 101)] = "DIRPATCH_DIRDIFFINFO_ERROR"),
    (R[(R.DIRPATCH_CHECKSUMTYPE_ERROR = 102)] = "DIRPATCH_CHECKSUMTYPE_ERROR"),
    (R[(R.DIRPATCH_CHECKSUMSET_ERROR = 103)] = "DIRPATCH_CHECKSUMSET_ERROR"),
    (R[(R.DIRPATCH_CHECKSUM_DIFFDATA_ERROR = 104)] =
      "DIRPATCH_CHECKSUM_DIFFDATA_ERROR"),
    (R[(R.DIRPATCH_CHECKSUM_OLDDATA_ERROR = 105)] =
      "DIRPATCH_CHECKSUM_OLDDATA_ERROR"),
    (R[(R.DIRPATCH_CHECKSUM_NEWDATA_ERROR = 106)] =
      "DIRPATCH_CHECKSUM_NEWDATA_ERROR"),
    (R[(R.DIRPATCH_CHECKSUM_COPYDATA_ERROR = 107)] =
      "DIRPATCH_CHECKSUM_COPYDATA_ERROR"),
    (R[(R.DIRPATCH_PATCH_ERROR = 108)] = "DIRPATCH_PATCH_ERROR"),
    (R[(R.DIRPATCH_LAOD_DIRDIFFDATA_ERROR = 109)] =
      "DIRPATCH_LAOD_DIRDIFFDATA_ERROR"),
    (R[(R.DIRPATCH_OPEN_OLDPATH_ERROR = 110)] = "DIRPATCH_OPEN_OLDPATH_ERROR"),
    (R[(R.DIRPATCH_OPEN_NEWPATH_ERROR = 111)] = "DIRPATCH_OPEN_NEWPATH_ERROR"),
    (R[(R.DIRPATCH_CLOSE_OLDPATH_ERROR = 112)] =
      "DIRPATCH_CLOSE_OLDPATH_ERROR"),
    (R[(R.DIRPATCH_CLOSE_NEWPATH_ERROR = 113)] =
      "DIRPATCH_CLOSE_NEWPATH_ERROR"),
    (R[(R.DIRPATCH_PATCHBEGIN_ERROR = 114)] = "DIRPATCH_PATCHBEGIN_ERROR"),
    (R[(R.DIRPATCH_PATCHFINISH_ERROR = 115)] = "DIRPATCH_PATCHFINISH_ERROR"),
    (R[(R.DIRPATCH_PATCH_FILE_ERROR = 116)] = "DIRPATCH_PATCH_FILE_ERROR");
})(
  (EKuroPatchResult =
    exports.EKuroPatchResult || (exports.EKuroPatchResult = {})),
);
class TsPatchApi {
  constructor() {
    (this.bIc = void 0), (this.bIc = new UE.KuroBinPatch());
  }
  async Patch(C, T, O, R) {
    return (
      LauncherLog_1.LauncherLog.Info(
        "will execute patch.",
        ["old", T],
        ["new", O],
        ["diff", C],
      ),
      UE.BlueprintPathsLibrary.DirectoryExists(O) ||
        UE.KuroLauncherLibrary.MakeDirectory(O),
      new Promise((A) => {
        this.bIc.ProgressDelegate.Add(R),
          this.bIc.CompleteDelegate.Add((R, E) => {
            var _ = new Set(),
              H = E ? E.Num() : 0;
            for (let R = 0; R < H; R++) {
              var P = E.Get(R);
              _.add(P);
            }
            R === EKuroPatchResult.HPATCH_SUCCESS
              ? LauncherLog_1.LauncherLog.Info(
                  "patch success.",
                  ["old", T],
                  ["new", O],
                  ["diff", C],
                )
              : LauncherLog_1.LauncherLog.Error(
                  "patch failed.",
                  ["old", T],
                  ["new", O],
                  ["diff", C],
                  ["code", R],
                  [
                    "successFiles",
                    LauncherSerialize_1.LauncherJson.Stringify(_),
                  ],
                ),
              A([R, _]);
          }),
          this.bIc.BeginPatch(C, T, O);
      })
    );
  }
}
exports.TsPatchApi = TsPatchApi;
//# sourceMappingURL=TsPatchApi.js.map
