import { FC } from "react";

export interface Props {
  number: number;
}

const TileStar: FC<Props> = ({ number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width="35"
      height="35"
      data-testid="tile-star"
    >
      <rect width="200" height="200" fill="none" />
      <polygon
        points="100,20 120,70 170,75 130,110 145,160 100,135 55,160 70,110 30,75 80,70"
        fill="#f4a261"
        stroke="#e76f51"
        strokeWidth="5"
      />
      <text
        x="100"
        y="103"
        fontSize="3rem"
        fontWeight="bold"
        fill="#264653"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        { number }
      </text>
    </svg>
  );
};

export default TileStar;
