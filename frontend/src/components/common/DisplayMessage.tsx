import React from "react";

interface DisplayMessageProps {
  message: string;
  isMiddle: boolean;
}

const DisplayMessage: React.FC<DisplayMessageProps> = ({
  message,
  isMiddle,
}) => {
  let css;
  if (isMiddle) {
    css = "text-4xl m-auto text-center";
  } else {
    css = "text-xl mx-auto text-center";
  }
  return (
    <div className="flex bg-gray-100 text-gray-500 text-xl min-h-screen">
      <p className={css}>{message}</p>
    </div>
  );
};

export default DisplayMessage;
