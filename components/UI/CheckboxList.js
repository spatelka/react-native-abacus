import { View } from "react-native";

import Checkbox from "./Checkbox";
import Card from "./Card";

function CheckboxList({ dataSet, isCheckedSet, onUpdate }) {

  function checkHandler(id) {
    onUpdate(id);
  }

  return (
    <Card width={200}>
      <View>
        {dataSet.map((item, index) => (
          <View key={index}>
            <Checkbox
              label={item.label}
              isChecked={isCheckedSet[index]}
              onChange={() => checkHandler(index)}
            />
          </View>
        ))}
      </View>
    </Card>
  );
}

export default CheckboxList;
