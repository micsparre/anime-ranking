import React from "react";

interface DisplayMessageProps {
  message: string;
}

const DisplayMessage: React.FC<DisplayMessageProps> = ({ message }) => {
  return (
    <div className="text-gray-500 text-xl text-center">
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default DisplayMessage;
