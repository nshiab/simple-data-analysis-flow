import React from "react"

export default function Spinner({ show }: { show: boolean }) {
  return (
    show && (
      <div className="spinner">
        <style jsx>{`
          .spinner {
            display: inline;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-left-color: black;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    )
  )
}
