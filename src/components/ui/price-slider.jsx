import PropTypes from "prop-types";
import { Slider } from "./slider";
import { Input } from "./input";

export default function PriceSlider({
  minPrice,
  maxPrice,
  onChange,
  onMinValueChange,
  onMaxValueChange,
}) {
  const handleMinValueChange = (e) => {
    const value = parseInt(e.target.value);

    onMinValueChange(value);
  };

  const handleMaxValueChange = (e) => {
    const value = parseInt(e.target.value);

    if (value > 10000 || value < 0) return;
    if (!value) {
      onMaxValueChange(0);
      return;
    }

    onMaxValueChange(value);
  };

  const handleSliderChange = (values) => {
    onChange(values);
  };
  return (
    <div className="grid gap-4">
      <Slider
        value={[minPrice, maxPrice]}
        max={10000}
        step={1}
        maxValue={toString(maxPrice)}
        onValueChange={handleSliderChange}
      />

      <div className="flex items-center gap-1">
        <div className="relative  w-full after:absolute after:left-3 after:top-1/2 after:-translate-y-1/2 after:content-['Kr']">
          <Input
            type="number"
            name="minValue"
            className="px-8"
            max={10000}
            value={minPrice}
            onChange={handleMinValueChange}
          />
        </div>
        -
        <div className="relative  w-full after:absolute after:left-3 after:top-1/2 after:-translate-y-1/2 after:content-['Kr']">
          <Input
            type="number"
            name="maxValue"
            className="px-8"
            value={maxPrice}
            max={10000}
            onChange={handleMaxValueChange}
          />
        </div>
      </div>
    </div>
  );
}

PriceSlider.propTypes = {
  minPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  onChange: PropTypes.func,
  onMinValueChange: PropTypes.func,
  onMaxValueChange: PropTypes.func,
};
