import "@/style/headerInfiniteAnimation.scss";

import { HeaderInfiniteAnimationProps } from "@/ts/interfaces/HeaderInfiniteAnimationProps.ts";


const HeaderInfiniteAnimation = ({textFirst, textSecond}: HeaderInfiniteAnimationProps) => {
    return (
        <div className="header_infinite_animation">
            <h2>{textFirst}</h2>
            <h3>{textSecond}</h3>
        </div>
    );
};

export default HeaderInfiniteAnimation;