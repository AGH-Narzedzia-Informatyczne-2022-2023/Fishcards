import { useEffect, useRef } from "react";

export default function useOuterClick<T extends HTMLElement>(
  callback: Function
) {
  const callbackRef = useRef<Function>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<T>(null); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", _onClick);
    return () => document.removeEventListener("click", _onClick);
    function _onClick(e: any): void {
      const clickedOutside = !innerRef.current?.contains(e.target);
      if (clickedOutside) callbackRef.current?.(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
