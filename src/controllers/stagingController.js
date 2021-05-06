import preInit from "../services/preInit";
import init from "../services/init";
import start from "../services/start";
import { removeEventListeners } from "../controllers/eventController";
import { openList, closeList, selectItem } from "./listController";
import { goTo, next, previous } from "../controllers/navigationController";

export default (ctx, autoComplete) => {
  // Pre-Initialization stage
  autoComplete.prototype.preInit = () => preInit(ctx);

  // Initialization stage
  autoComplete.prototype.init = () => init(ctx);

  // Start autoComplete.js engine
  autoComplete.prototype.start = () => start(ctx);

  // Un-Initialize autoComplete.js engine
  autoComplete.prototype.unInit = () => removeEventListeners(ctx);

  // Open result list
  autoComplete.prototype.open = () => openList(ctx);

  // Close result list
  autoComplete.prototype.close = () => closeList(ctx);

  // Go to result by index
  autoComplete.prototype.goTo = (index) => goTo(index, ctx);

  // Go to next result
  autoComplete.prototype.next = () => next(ctx);

  // Go to previous result
  autoComplete.prototype.previous = () => previous(ctx);

  // Select result by index
  autoComplete.prototype.select = (index) => selectItem(ctx, null, index);
};
