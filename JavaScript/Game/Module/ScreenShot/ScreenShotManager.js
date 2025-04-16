"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScreenShotManager = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  GlobalData_1 = require("../../GlobalData");
class ScreenShotManager {
  static Clear() {
    this.ResetScreenShot();
  }
  static PrepareTakeScreenshot(t, e, r, s, a, o) {
    this.ResetScreenShot();
    (e = Vector2D_1.Vector2D.Create(e, r)),
      (r = Vector2D_1.Vector2D.Create(s, a)),
      (s = GlobalData_1.GlobalData.World);
    return (
      (this.nvo = UE.KuroGameScreenshotBPLibrary.PrepareTakeScreenshot(
        s,
        t,
        e.ToUeVector2D(),
        r.ToUeVector2D(),
        0,
        0,
        o,
      )),
      this.nvo
    );
  }
  static ResetScreenShot() {
    this.nvo && this.nvo.IsValid() && this.nvo.Reset(), (this.nvo = void 0);
  }
  static RequestIOSPhotoLibraryAuthorization() {
    this.nvo?.RequestIOSPhotoLibraryAuthorization();
  }
  static async TakeFullScreenShotToTextureAsync() {
    var t = UE.WidgetLayoutLibrary.GetViewportSize(
      GlobalData_1.GlobalData.World,
    );
    return await this.TakeScreenShotToTextureAsync(0, 0, t.X, t.Y);
  }
  static async TakeScreenShotToTextureAsync(t, e, r, s) {
    t = this.PrepareTakeScreenshot("", t, e, r, s, !1);
    const a = new CustomPromise_1.CustomPromise();
    return (
      t.OnTakeScreenshotCapturedDelegate.Add((t, e, r) => {
        t = UE.LGUIBPLibrary.CreateTexture2DFromColors(t, e, r);
        a.SetResult(t);
      }),
      t?.TakeScreenshot(),
      await a.Promise
    );
  }
}
(exports.ScreenShotManager = ScreenShotManager).nvo = void 0;
//# sourceMappingURL=ScreenShotManager.js.map
