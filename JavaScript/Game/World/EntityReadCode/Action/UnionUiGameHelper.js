"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionUiGameHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbBrokenRock_1 = require("./FbBrokenRock"),
  FbCipherGameplay_1 = require("./FbCipherGameplay"),
  FbDaolingAuthentication_1 = require("./FbDaolingAuthentication"),
  FbFishingRoulette_1 = require("./FbFishingRoulette"),
  FbLifePoint_1 = require("./FbLifePoint"),
  FbMorseCode_1 = require("./FbMorseCode"),
  FbRenjuChess_1 = require("./FbRenjuChess"),
  FbSignalBreakGameplay_1 = require("./FbSignalBreakGameplay"),
  FbSignalDevice_1 = require("./FbSignalDevice"),
  FbSignalDevice2_1 = require("./FbSignalDevice2"),
  FbSundialPuzzleGameplay_1 = require("./FbSundialPuzzleGameplay");
class UnionUiGameHelper {
  static GetUnionUiGameObject(e) {
    switch (e) {
      case fb_action_1.UnionUiGame.BrokenRock:
        return new fb_action_1.BrokenRock();
      case fb_action_1.UnionUiGame.CipherGameplay:
        return new fb_action_1.CipherGameplay();
      case fb_action_1.UnionUiGame.DaolingAuthentication:
        return new fb_action_1.DaolingAuthentication();
      case fb_action_1.UnionUiGame.FishingRoulette:
        return new fb_action_1.FishingRoulette();
      case fb_action_1.UnionUiGame.LifePoint:
        return new fb_action_1.LifePoint();
      case fb_action_1.UnionUiGame.MorseCode:
        return new fb_action_1.MorseCode();
      case fb_action_1.UnionUiGame.RenjuChess:
        return new fb_action_1.RenjuChess();
      case fb_action_1.UnionUiGame.SignalBreakGameplay:
        return new fb_action_1.SignalBreakGameplay();
      case fb_action_1.UnionUiGame.SignalDevice:
        return new fb_action_1.SignalDevice();
      case fb_action_1.UnionUiGame.SignalDevice2:
        return new fb_action_1.SignalDevice2();
      case fb_action_1.UnionUiGame.SundialPuzzleGameplay:
        return new fb_action_1.SundialPuzzleGameplay();
      default:
        return;
    }
  }
  static ReadUnionUiGame(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_action_1.UnionUiGame.BrokenRock:
          return FbBrokenRock_1.FbBrokenRock.Create(n);
        case fb_action_1.UnionUiGame.CipherGameplay:
          return FbCipherGameplay_1.FbCipherGameplay.Create(n);
        case fb_action_1.UnionUiGame.DaolingAuthentication:
          return FbDaolingAuthentication_1.FbDaolingAuthentication.Create(n);
        case fb_action_1.UnionUiGame.FishingRoulette:
          return FbFishingRoulette_1.FbFishingRoulette.Create(n);
        case fb_action_1.UnionUiGame.LifePoint:
          return FbLifePoint_1.FbLifePoint.Create(n);
        case fb_action_1.UnionUiGame.MorseCode:
          return FbMorseCode_1.FbMorseCode.Create(n);
        case fb_action_1.UnionUiGame.RenjuChess:
          return FbRenjuChess_1.FbRenjuChess.Create(n);
        case fb_action_1.UnionUiGame.SignalBreakGameplay:
          return FbSignalBreakGameplay_1.FbSignalBreakGameplay.Create(n);
        case fb_action_1.UnionUiGame.SignalDevice:
          return FbSignalDevice_1.FbSignalDevice.Create(n);
        case fb_action_1.UnionUiGame.SignalDevice2:
          return FbSignalDevice2_1.FbSignalDevice2.Create(n);
        case fb_action_1.UnionUiGame.SundialPuzzleGameplay:
          return FbSundialPuzzleGameplay_1.FbSundialPuzzleGameplay.Create(n);
        default:
          return;
      }
  }
}
exports.UnionUiGameHelper = UnionUiGameHelper;
//# sourceMappingURL=UnionUiGameHelper.js.map
