import preInit from "../services/preInit";
import init from "../services/init";
import start from "../services/start";
import { removeEventListeners } from "./eventController";
import { openList, closeList, selectItem } from "./listController";
import { goTo, next, previous } from "./navigationController";

export default (ctx, autoComplete) => {
  const { prototype } = autoComplete;

  // Pre-Initialization stage
  prototype.preInit = () => preInit(ctx);
  // Initialization stage
  prototype.init = () => init(ctx);
  // Start autoComplete.js engine
  prototype.start = () => start(ctx);
  // Un-Initialize autoComplete.js engine
  prototype.unInit = () => removeEventListeners(ctx);
  // Open result list
  prototype.open = () => openList(ctx);
  // Close result list
  prototype.close = () => closeList(ctx);
  // Go to result by index
  prototype.goTo = (index) => goTo(index, ctx);
  // Go to next result
  prototype.next = () => next(ctx);
  // Go to previous result
  prototype.previous = () => previous(ctx);
  // Select result by index
  prototype.select = (index) => selectItem(ctx, null, index);
};
