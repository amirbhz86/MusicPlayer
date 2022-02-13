import {
  CircleAddSVG,
  CirclePause,
  LightAddSVG,
  PinkHeartSVG,
  SmallPlay,
  LightPauseSVG,
  LightPlaySVG,
} from 'assets'
import { BasicColors, MainColors } from 'common'
import { PressableRadius, Text } from 'components'
import { useRedux } from 'hooks'
import React, { memo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { scale } from '../../helper'
import useComponent from './hooks'
import { PropsType } from './models'

const MusicItem = (props: PropsType) => {
  const {
    name,
    summary,
    style,
    image_image,
    navigation,
    musics,
    url,
    artwork,
    id,
    songIndex,
    onAdd,
    duration,
    selected,
    hasAddButton = true,
    onRemoveFav,
  } = props
  const {
    containerView,
    titleContainer,
    innerView,
    itemContentView,
    leftPartView,
    plusAndHeartView,
    lineView,
  } = styles({})
  const { musicItemOnPress, togglePlayback } = useComponent({
    navigation,
    musics,
    ...props,
  })
  const { Save, Get } = useRedux()
  const { playedMusicId, isLighttheme } = Get().app

  const pauseImage = isLighttheme ? <LightPauseSVG /> : <CirclePause />

  const playImage = isLighttheme ? <LightPlaySVG /> : <SmallPlay />

  const musicSelectedColor = isLighttheme
    ? MainColors.selected
    : BasicColors.brown

  return (
    <>
      <PressableRadius
        innerStyle={innerView}
        onPress={() => musicItemOnPress()}
        wrapperStyle={[
          containerView,
          style,
          { backgroundColor: selected ? musicSelectedColor : undefined },
        ]}
      >
        <View style={itemContentView}>
          <View style={leftPartView}>
            <Image
              source={{ uri: artwork }}
              style={{
                width: 40,
                borderRadius: 10,
                height: 40,
                resizeMode: 'contain',
              }}
            />
            <View style={titleContainer}>
              <Text
                size="medium"
                type="bold"
                numberOfLines={1}
                style={{ maxWidth: '100%' }}
                color={isLighttheme ? BasicColors.black : BasicColors.white}
              >
                {name}
              </Text>
              <Text
                numberOfLines={1}
                style={{ maxWidth: '100%' }}
                size="small"
                color={isLighttheme ? MainColors.summary : BasicColors.white}
              >
                {summary}
              </Text>
            </View>
          </View>
          <View style={plusAndHeartView}>
            {hasAddButton && (
              <PressableRadius
                wrapperStyle={{ borderRadius: 23, marginRight: 5 }}
                rippleBackgroundColor={BasicColors.pink}
                onPress={onAdd}
              >
                {isLighttheme ? (
                  <LightAddSVG />
                ) : (
                  <CircleAddSVG width={25} height={21} />
                )}
              </PressableRadius>
            )}
            {onRemoveFav && (
              <PressableRadius
                wrapperStyle={{ borderRadius: 23, marginRight: 5 }}
                rippleBackgroundColor={BasicColors.pink}
                onPress={onRemoveFav}
              >
                <PinkHeartSVG width={18} height={158} />
              </PressableRadius>
            )}

            <PressableRadius
              wrapperStyle={{ borderRadius: 23 }}
              rippleBackgroundColor={BasicColors.pink}
              onPress={() =>
                togglePlayback({
                  musics,
                  id,
                  duration,
                  name,
                  artwork,
                  type: 'musicItem',
                })
              }
            >
              {playedMusicId == id ? pauseImage : playImage}
            </PressableRadius>
          </View>
        </View>
      </PressableRadius>
      {isLighttheme && <View style={lineView}></View>}
    </>
  )
}

const styles = (props: any) => {
  return StyleSheet.create({
    lineView: {
      height: 0.6,
      width: '100%',
      backgroundColor: MainColors.secondry,
    },
    containerView: {
      width: '100%',
      alignSelf: 'center',
      borderRadius: 12,
      height: 55,
    },
    leftPartView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    plusAndHeartView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    innerView: {
      flexDirection: 'row',
      width: '100%',
    },
    titleContainer: {
      alignItems: 'flex-start',
      marginLeft: 15,
      maxWidth: scale(150),
    },
    itemContentView: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
}

export default memo(MusicItem)
