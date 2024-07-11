"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSpineLoadModule = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../GlobalData"),
  UiResourceLoadModule_1 = require("./UiResourceLoadModule");
class UiSpineAtlasLoadModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  async LoadAtlasAssetAsync(e, o) {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      const t = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.SpineAtlasAsset,
        (e, s) => {
          t.SetResult(),
            this.DeleteResourceHandle(o),
            o.IsValid() && (o.Atlas = e);
        },
      );
      this.SetResourceId(o, e), await t.Promise;
    }
  }
}
class UiSpineSkeletonLoadModule extends UiResourceLoadModule_1.UiResourceLoadModule {
  async LoadAtlasAssetAsync(e, o) {
    if (GlobalData_1.GlobalData.World && o && o.IsValid()) {
      this.CancelResource(o);
      const t = new CustomPromise_1.CustomPromise();
      e = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.SpineSkeletonDataAsset,
        (e, s) => {
          t.SetResult(),
            this.DeleteResourceHandle(o),
            o.IsValid() && (o.SkeletonData = e);
        },
      );
      this.SetResourceId(o, e), await t.Promise;
    }
  }
}
class UiSpineLoadModule {
  constructor() {
    (this.BAr = new UiSpineAtlasLoadModule()),
      (this.bAr = new UiSpineSkeletonLoadModule());
  }
  async LoadSpineAssetAsync(e, s, o) {
    await Promise.all([
      this.BAr.LoadAtlasAssetAsync(e, o),
      this.bAr.LoadAtlasAssetAsync(s, o),
    ]);
  }
  Clear() {
    this.BAr.Clear(), this.bAr.Clear();
  }
}
exports.UiSpineLoadModule = UiSpineLoadModule;
//# sourceMappingURL=UiSpineLoadModule.js.map
