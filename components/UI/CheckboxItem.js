import Checkbox from "./Checkbox";
import Card from "./Card";

function CheckboxItem({ label, isChecked, onUpdate }) {
  return (
    <Card width={250}>
      <Checkbox label={label} isChecked={isChecked} onChange={() => onUpdate(!isChecked)} />
    </Card>
  );
}

export default CheckboxItem;
