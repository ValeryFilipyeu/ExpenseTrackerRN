import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string | undefined;
  onPress: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
