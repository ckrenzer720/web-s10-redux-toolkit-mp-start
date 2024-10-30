import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuote,
  toggleVisibility,
  editQuoteAuthenticity,
  setHighlightedQuote,
} from "../state/quotesSlice";

export default function Quotes() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotesState.quotes);
  // console.log(quotes)
  const displayAllQuotes = useSelector(
    (state) => state.quotesState.displayAllQuotes
  );
  const highlightedQuote = useSelector(
    (state) => state.quotesState.highlightedQuote
  );

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {quotes
          ?.filter((qt) => {
            return displayAllQuotes || !qt.apocryphal;
          })
          .map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? " fake" : ""}${
                highlightedQuote === qt.id ? " highlight" : ""
              }`}
            >
              <div>{qt.quoteText}</div>
              <div>{qt.authorName}</div>
              <div className="quote-buttons">
                <button
                  onClick={() => {
                    const actionToDispatch = deleteQuote(qt.id);
                    dispatch(actionToDispatch);
                  }}
                >
                  DELETE
                </button>
                <button
                  onClick={() => {
                    dispatch(setHighlightedQuote(qt.id))
                  }}
                >
                  HIGHLIGHT
                </button>
                <button
                  onClick={() => {
                    dispatch(editQuoteAuthenticity(qt.id));
                  }}
                >
                  FAKE
                </button>
              </div>
            </div>
          ))}
        {!quotes?.length && "No quotes here! Go write some."}
      </div>
      {!!quotes?.length && (
        <button onClick={() => dispatch(toggleVisibility())}>
          {displayAllQuotes ? "HIDE" : "SHOW"} FAKE QUOTES
        </button>
      )}
    </div>
  );
}
