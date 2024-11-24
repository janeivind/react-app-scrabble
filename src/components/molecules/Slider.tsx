import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import { SliderProps as RadixSliderProps } from "@radix-ui/themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface SliderProps extends RadixSliderProps {
  showTooltip?: boolean;
}

const Slider = React.forwardRef<HTMLElement, SliderProps>(
  ({ className, showTooltip = false, ...props }, ref) => {
    const [value, setValue] = React.useState<number[]>(
      (props.defaultValue as number[]) ?? [0]
    );
    const [showTooltipState, setShowTooltipState] = React.useState(false);

    const handlePointerDown = () => {
      setShowTooltipState(true);
    };

    const handlePointerUp = () => {
      setShowTooltipState(false);
    };

    React.useEffect(() => {
      document.addEventListener("pointerup", handlePointerUp);
      return () => {
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }, []);

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={clsx(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={setValue}
        onPointerDown={handlePointerDown}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <TooltipProvider>
          <Tooltip open={showTooltip && showTooltipState}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onMouseEnter={() => setShowTooltipState(true)}
                onMouseLeave={() => setShowTooltipState(false)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{value[0]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName as string;

export default Slider;
