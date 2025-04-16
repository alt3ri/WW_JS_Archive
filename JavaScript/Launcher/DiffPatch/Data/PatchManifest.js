"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PatchManifestJson =
    exports.PatchManifest =
    exports.DiffFileInfo =
    exports.PatchFileInfo =
      void 0);
class PatchFileInfo {
  constructor() {
    (this.Name = ""), (this.Size = 0n), (this.Hash = ""), (this.Version = "");
  }
}
exports.PatchFileInfo = PatchFileInfo;
class DiffFileInfo {
  constructor() {
    (this.DiffFile = void 0),
      (this.NewRefSize = 0n),
      (this.NewFiles = new Set()),
      (this.DelFiles = new Set()),
      (this.ModFiles = new Set()),
      (this.SameFiles = new Set());
  }
}
exports.DiffFileInfo = DiffFileInfo;
class PatchManifest {
  constructor() {
    (this.BaseFiles = new Array()),
      (this.PatchFiles = new Array()),
      (this.BaseDiffMap = new Map()),
      (this.CurDiffMap = new Map()),
      (this.RevertMap = new Map());
  }
}
exports.PatchManifest = PatchManifest;
class PatchManifestJson {
  constructor() {
    this.DiffPatch = void 0;
  }
}
exports.PatchManifestJson = PatchManifestJson;
//# sourceMappingURL=PatchManifest.js.map
