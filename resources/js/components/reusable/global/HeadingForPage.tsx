import React from "react";

type Props = {
    text: string;
};

const HeadingForPage = ({ text }: Props) => {
    return (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {text}
        </h2>
    );
};

export default HeadingForPage;
