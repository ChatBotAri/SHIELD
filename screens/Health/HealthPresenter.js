import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
const HealthPresenter = ({
  isPedometerAvailable,
  pastStepCount,
  currentStepCount,
}) => (
  <>
    <View style={styles.container}>
      <Text>
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </View>
    
  </>
);
export default withNavigation(HealthPresenter);