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

    if (value > 10000 || !value) return;

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
        onValueChange={handleSliderChange}
      />

      <div className="flex items-center gap-1">
        <Input
          type="number"
          name="minValue"
          max={10000}
          value={minPrice}
          onChange={handleMinValueChange}
        />
        -
        <Input
          type="number"
          name="maxValue"
          value={maxPrice}
          max={10000}
          onChange={handleMaxValueChange}
        />
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
