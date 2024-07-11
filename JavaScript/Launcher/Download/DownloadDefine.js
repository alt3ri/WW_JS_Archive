"use strict";
var EDownloadState;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EDownloadState = void 0),
  (function (e) {
    (e[(e.None = 0)] = "None"),
      (e[(e.HttpError = 1)] = "HttpError"),
      (e[(e.FileRenameError = 2)] = "FileRenameError"),
      (e[(e.ValidateError = 3)] = "ValidateError"),
      (e[(e.OpenToWriteError = 4)] = "OpenToWriteError"),
      (e[(e.NotEnoughSpace = 5)] = "NotEnoughSpace"),
      (e[(e.DownloadCanceled = 6)] = "DownloadCanceled"),
      (e[(e.Success = 7)] = "Success");
  })(
    (EDownloadState = exports.EDownloadState || (exports.EDownloadState = {})),
  );
//# sourceMappingURL=DownloadDefine.js.map
