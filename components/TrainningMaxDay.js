import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SIZES, COLORS, FONTS } from '../constants';

const TrainningMaxDay = ({ typeDay, reps, setReps, weight, setWeight }) => {
  return (
      <View
          style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: COLORS.primary,
              padding: SIZES.font,
          }}
      >
          <Text
              style={{
                  color: COLORS.white,
                  fontSize: SIZES.medium
              }}>
              Overhead Press
          </Text>

          <View style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10
          }}>
              <TextInput
                  value={reps}
                  onChange={(value) => setReps(value)}
                  keyboardType="numeric"
                  style={{
                      height: 30,
                      width: 35,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.white,
                      textAlign: "center",
                      fontSize: SIZES.medium
                  }}
              />
              <Text
                  style={{
                      color: COLORS.white
                  }}>
                  rep x
              </Text>
              <TextInput
                  value={weight}
                  onChange={(value) => setWeight(value)}
                  keyboardType="numeric"
                  style={{
                      height: 30,
                      width: 60,
                      padding: 10,
                      borderRadius: 10,
                      backgroundColor: COLORS.white,
                      textAlign: "center",
                      fontSize: SIZES.medium
                  }}
              />
              <Text
                  style={{
                      color: COLORS.white
                  }}>
                  kg
              </Text>
          </View>
      </View>
  )
}

export default TrainningMaxDay