/**
 * onSelection function
 *
 * @param event
 * @param feedback
 * @param resultsValues
 * @param selection
 *
 * @return void
 */
export default (event, query, results, feedback) => {
  // Data feedback function
  // invoked on user selection
  // TODO Revision for the feedback function
  feedback({
    event,
    query,
    results,
    // selection,
  });
};
