import preInit from "./preInit";
import init from "./init";
import start from "./start";
import { removeEvents } from "../controllers/eventController";
import { openList, goTo, next, previous, select, closeList } from "../controllers/listController";
import search from "../controllers/searchController";

export default function (autoComplete) {
  const { prototype } = autoComplete;

  // Pre-Initialization stage
  prototype.preInit = () => preInit(this);
  // Initialization stage
  prototype.init = () => init(this);
  // Start autoComplete.js engine
  prototype.start = () => start(this);
  // Un-Initialize autoComplete.js engine
  prototype.unInit = () => removeEvents(this);
  // Open result list
  prototype.open = () => openList(this);
  // Close result list
  prototype.close = () => closeList(this);
  // Go to result by index
  prototype.goTo = (index) => goTo(index, this);
  // Go to next result
  prototype.next = () => next(this);
  // Go to previous result
  prototype.previous = () => previous(this);
  // Select result by index
  prototype.select = (index) => select(this, null, index);
  // autoComplete.js Search Engine
  autoComplete.search = prototype.search = (query, record, options) => search(query, record, options);
}
