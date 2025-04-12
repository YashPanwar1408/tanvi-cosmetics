
import React from "react";

// Add a global style to hide scrollbars for certain elements
const ScrollbarHide = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
  }} />
);

export default ScrollbarHide;
